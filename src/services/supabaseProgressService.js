import { supabase } from '../config/supabase';

export class SupabaseProgressService {
  
  // Save module completion progress
  static async saveModuleProgress({
    userId,
    email,
    moduleId,
    score,
    totalQuestions,
    timeSpent = 0,
    startTime = null
  }) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Calculate time spent if startTime is provided
      const actualTimeSpent = startTime 
        ? Math.floor((Date.now() - startTime) / 1000) 
        : timeSpent;

      const passed = score >= Math.ceil(totalQuestions * 0.7); // 70% passing grade

      // Check if user already has progress for this module
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .order('completed_at', { ascending: false })
        .limit(1);

      const attempts = existingProgress && existingProgress.length > 0 
        ? existingProgress[0].attempts + 1 
        : 1;

      // Insert new progress record
      const { data, error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          email: email,
          module_id: moduleId,
          score: score,
          total_questions: totalQuestions,
          time_spent: actualTimeSpent,
          attempts: attempts,
          passed: passed,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Update user checkpoint and overall progress
      await this.updateUserCheckpoint(userId, moduleId, passed, actualTimeSpent);

      return {
        success: true,
        data: data,
        message: 'Progress saved successfully'
      };

    } catch (error) {
      console.error('Error saving module progress:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to save progress'
      };
    }
  }

  // Update user checkpoint and overall progress
  static async updateUserCheckpoint(userId, moduleId, passed, timeSpent) {
    try {
      // Get current checkpoint data
      const { data: checkpoint, error: fetchError } = await supabase
        .from('user_checkpoints')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Calculate new checkpoint based on module completion
      const moduleNumber = parseInt(moduleId.replace('module', ''));
      const currentCheckpoint = checkpoint?.current_checkpoint || 1;
      const newCheckpoint = passed && moduleNumber >= currentCheckpoint 
        ? moduleNumber + 1 
        : currentCheckpoint;

      // Count total completed modules
      const { count: completedCount } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('passed', true);

      // Calculate achievements
      const achievements = checkpoint?.achievements || [];
      const newAchievements = [...achievements];

      // Add achievement for first module completion
      if (passed && completedCount === 1 && !newAchievements.includes('first_module')) {
        newAchievements.push('first_module');
      }

      // Add achievement for perfect score
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('score, total_questions')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .eq('passed', true)
        .order('completed_at', { ascending: false })
        .limit(1);

      if (progressData && progressData.length > 0) {
        const latestProgress = progressData[0];
        if (latestProgress.score === latestProgress.total_questions && 
            !newAchievements.includes('perfect_score')) {
          newAchievements.push('perfect_score');
        }
      }

      const updateData = {
        current_checkpoint: newCheckpoint,
        total_modules_completed: completedCount || 0,
        total_time_spent: (checkpoint?.total_time_spent || 0) + timeSpent,
        achievements: newAchievements,
        last_accessed: new Date().toISOString()
      };

      if (checkpoint) {
        // Update existing checkpoint
        const { error: updateError } = await supabase
          .from('user_checkpoints')
          .update(updateData)
          .eq('user_id', userId);

        if (updateError) throw updateError;
      } else {
        // Create new checkpoint record
        const { error: insertError } = await supabase
          .from('user_checkpoints')
          .insert({
            user_id: userId,
            ...updateData
          });

        if (insertError) throw insertError;
      }

      return { success: true };

    } catch (error) {
      console.error('Error updating user checkpoint:', error);
      throw error;
    }
  }

  // Get user progress for all modules
  static async getUserProgress(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        message: 'Progress retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching user progress:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch progress'
      };
    }
  }

  // Save checkpoint completion
  static async saveCheckpointCompletion({
    userId,
    email,
    checkpointId,
    score,
    totalQuestions
  }) {
    try {
      if (!userId || checkpointId === undefined) {
        throw new Error('User ID and Checkpoint ID are required');
      }

      const passed = score >= Math.ceil(totalQuestions * 0.7); // 70% passing grade

      // Get current checkpoint data
      const { data: currentCheckpoint, error: fetchError } = await supabase
        .from('user_checkpoints')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Calculate new values
      const completedModules = currentCheckpoint?.total_modules_completed || 0;
      const newCompletedModules = passed ? completedModules + 1 : completedModules;
      const newCurrentCheckpoint = passed ? checkpointId + 1 : (currentCheckpoint?.current_checkpoint || 0);

      const updateData = {
        user_id: userId,
        email: email,
        current_checkpoint: newCurrentCheckpoint,
        total_modules_completed: newCompletedModules,
        last_module_completed: passed ? `module${checkpointId}` : currentCheckpoint?.last_module_completed,
        last_activity: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (currentCheckpoint) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_checkpoints')
          .update(updateData)
          .eq('user_id', userId);

        if (updateError) throw updateError;
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('user_checkpoints')
          .insert(updateData);

        if (insertError) throw insertError;
      }

      return {
        success: true,
        message: 'Checkpoint completion saved successfully'
      };

    } catch (error) {
      console.error('Error saving checkpoint completion:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to save checkpoint completion'
      };
    }
  }

  // Get user checkpoint information
  static async getUserCheckpoint(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const { data, error } = await supabase
        .from('user_checkpoints')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return {
        success: true,
        data: data || {
          current_checkpoint: 1,
          total_modules_completed: 0,
          total_time_spent: 0,
          achievements: [],
          streak_days: 0
        },
        message: 'Checkpoint retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching user checkpoint:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch checkpoint'
      };
    }
  }

  // Get module-specific progress
  static async getModuleProgress(userId, moduleId) {
    try {
      if (!userId || !moduleId) {
        throw new Error('User ID and Module ID are required');
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        message: 'Module progress retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching module progress:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch module progress'
      };
    }
  }

  // Get leaderboard data
  static async getLeaderboard(limit = 10) {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .order('modules_completed', { ascending: false })
        .order('avg_score_percentage', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return {
        success: true,
        data: data || [],
        message: 'Leaderboard retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch leaderboard'
      };
    }
  }

  // Delete user progress (for admin or user account deletion)
  static async deleteUserProgress(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Delete progress records
      const { error: progressError } = await supabase
        .from('user_progress')
        .delete()
        .eq('user_id', userId);

      if (progressError) throw progressError;

      // Delete checkpoint record
      const { error: checkpointError } = await supabase
        .from('user_checkpoints')
        .delete()
        .eq('user_id', userId);

      if (checkpointError) throw checkpointError;

      return {
        success: true,
        message: 'User progress deleted successfully'
      };

    } catch (error) {
      console.error('Error deleting user progress:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete progress'
      };
    }
  }

  // Get user statistics
  static async getUserStats(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Get progress statistics
      const { data: progressStats, error: progressError } = await supabase
        .from('user_progress')
        .select('score, total_questions, time_spent, passed, completed_at')
        .eq('user_id', userId)
        .eq('passed', true);

      if (progressError) throw progressError;

      // Get checkpoint data
      const checkpointResult = await this.getUserCheckpoint(userId);
      const checkpoint = checkpointResult.data;

      // Calculate statistics
      const totalModules = progressStats?.length || 0;
      const totalScore = progressStats?.reduce((sum, p) => sum + p.score, 0) || 0;
      const totalPossible = progressStats?.reduce((sum, p) => sum + p.total_questions, 0) || 1;
      const avgPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
      const totalTimeSpent = checkpoint?.total_time_spent || 0;

      return {
        success: true,
        data: {
          totalModulesCompleted: totalModules,
          averageScore: avgPercentage,
          totalTimeSpent: totalTimeSpent,
          currentCheckpoint: checkpoint?.current_checkpoint || 1,
          achievements: checkpoint?.achievements || [],
          streakDays: checkpoint?.streak_days || 0,
          recentProgress: progressStats?.slice(0, 5) || []
        },
        message: 'User statistics retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching user statistics:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch statistics'
      };
    }
  }

  // Get complete user data including checkpoints and progress
  static async getUserCompleteData(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      // Fetch both progress and checkpoint data in parallel
      const [progressResult, checkpointResult] = await Promise.all([
        this.getUserProgress(userId),
        this.getUserCheckpoint(userId)
      ]);

      if (!progressResult.success) {
        throw new Error(progressResult.error || 'Failed to fetch progress');
      }

      if (!checkpointResult.success) {
        throw new Error(checkpointResult.error || 'Failed to fetch checkpoints');
      }

      // Process progress data to get completed modules
      const completedModules = progressResult.data
        .filter(p => p.passed)
        .map(p => {
          // Convert module_id to checkpoint number
          const moduleMap = {
            'module1': 0,
            'module2': 1,
            'task1': 2,
            'installation': 3,
            'module3': 4,
            'task2': 5,
            'module4': 6,
            'module5': 7,
            'module6': 8,
            'module7': 9,
            'module8': 10
          };
          return moduleMap[p.module_id] !== undefined ? moduleMap[p.module_id] : p.module_id;
        });

      return {
        success: true,
        data: {
          progress: progressResult.data,
          checkpoint: checkpointResult.data,
          completedModules: completedModules,
          currentCheckpoint: checkpointResult.data.current_checkpoint || 1,
          totalModulesCompleted: checkpointResult.data.total_modules_completed || 0,
          totalTimeSpent: checkpointResult.data.total_time_spent || 0,
          achievements: checkpointResult.data.achievements || [],
          streakDays: checkpointResult.data.streak_days || 0
        },
        message: 'User data retrieved successfully'
      };

    } catch (error) {
      console.error('Error fetching complete user data:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch complete user data'
      };
    }
  }
}

// Export default instance for easier usage
export default SupabaseProgressService;