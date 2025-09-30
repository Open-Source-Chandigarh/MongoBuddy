-- Supabase Database Schema for MongoDB Learning Platform
-- Run this SQL in your Supabase SQL Editor

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  module_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent INTEGER DEFAULT 0, -- in seconds
  attempts INTEGER DEFAULT 1,
  passed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_score CHECK (score >= 0 AND score <= total_questions),
  CONSTRAINT valid_attempts CHECK (attempts > 0),
  CONSTRAINT valid_time_spent CHECK (time_spent >= 0)
);

-- Create user_checkpoints table to track learning path progress
CREATE TABLE IF NOT EXISTS user_checkpoints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_checkpoint INTEGER DEFAULT 1,
  total_modules_completed INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- in seconds
  achievements TEXT[] DEFAULT '{}',
  streak_days INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed_at ON user_progress(completed_at);
CREATE INDEX IF NOT EXISTS idx_user_checkpoints_user_id ON user_checkpoints(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_user_progress_updated_at 
  BEFORE UPDATE ON user_progress 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_checkpoints_updated_at 
  BEFORE UPDATE ON user_checkpoints 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_checkpoints ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own progress data
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress" ON user_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Policy: Users can only access their own checkpoint data
CREATE POLICY "Users can view own checkpoints" ON user_checkpoints
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checkpoints" ON user_checkpoints
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checkpoints" ON user_checkpoints
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own checkpoints" ON user_checkpoints
  FOR DELETE USING (auth.uid() = user_id);

-- Optional: Create a view for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  up.user_id,
  up.email,
  COUNT(DISTINCT up.module_id) as modules_completed,
  AVG(CASE WHEN up.passed THEN (up.score::float / up.total_questions::float * 100) ELSE 0 END) as avg_score_percentage,
  SUM(up.time_spent) as total_time_spent_seconds,
  MAX(up.completed_at) as last_completion_date,
  uc.current_checkpoint,
  uc.achievements,
  uc.streak_days
FROM user_progress up
LEFT JOIN user_checkpoints uc ON up.user_id = uc.user_id
WHERE up.passed = true  -- Only count passed attempts
GROUP BY up.user_id, up.email, uc.current_checkpoint, uc.achievements, uc.streak_days;

-- Grant necessary permissions
GRANT ALL ON user_progress TO authenticated;
GRANT ALL ON user_checkpoints TO authenticated;
GRANT SELECT ON user_stats TO authenticated;