Mongo Buddy

Mongo Buddy is a gamified learning platform for MongoDB. Level up through checkpoints, quizzes, and hands‑on tasks instead of dry docs. Earn points, unlock stages, and learn by doing CRUD, query operators, indexes, and aggregation pipelines.

Live Demo

Try Mongo Buddy Live: https://mongobuddy.onrender.com

Features

1. Checkpoints: Unlock stages as concepts are completed.

2. Quizzes: Interactive questions to test understanding.

3. Tasks: Real‑world MongoDB queries and operations.

4. Gamified Progression: Points, milestones, leveling.

5. Learn by Doing: CRUD, operators, indexes, aggregation.

6. Learning Path Basics: Intro to MongoDB and CRUD operations.

7. Query Operators: Comparison, logical, array, element.

8. Indexes & Performance: Speed up queries with the right indexes.

9. Aggregation: match, group, project, sort, lookup.

10. Real‑World Challenges: Apply skills to practical scenarios.

Tech Stack - 

1. MongoDB for data (local or Atlas).

1. Node.js/Express backend for APIs and tasks.

3. Frontend with a modern JS stack for gamified UI.

Follow these steps to run the project locally.

1. Prerequisites Node.js 18+ and npm

2. MongoDB (local) or MongoDB Atlas connection string

Git - 

Check versions:

```
node -v
npm -v
git --version
```
Fork and Clone -  Fork the repository on GitHub (top-right “Fork” button).

Clone your fork:

```
git clone https://github.com/<your-username>/MongoBuddy.git
cd MongoBuddy
```
Add the upstream remote (optional but recommended):


```
git remote add upstream https://github.com/<upstream-owner>/MongoBuddy.git

git fetch upstream
```
Environment Variables - Copy the example file and fill in values:

```
cp .env.example .env
```
Edit `.env` with appropriate values:


```text
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If using Atlas:

1. Create a free cluster.

2. Whitelist current IP.

3. Replace MONGODB_URI with your connection string.

Install Dependencies
```
npm install
```

If the repo is a monorepo/workspaces project:

# Example workspace bootstrap (if applicable)
```
npm run bootstrap
```

Seed Sample Data (if available)

```
npm run seed
```

Run the App Development:

```
npm run dev
```

Production:

```
npm start
```

Open:


http://localhost:3000

How to Play Start at Checkpoint 

1. MongoDB Basics. 

2. Complete tasks and quizzes to move forward.

3. Earn points and unlock new stages as progress is made.

Contributing - 

1. Contributions are welcome, especially during Hacktoberfest.

2. Quick Contribution Flow

Create a feature branch:

```
git checkout -b feat/<short-feature-name>
```
Make changes, then commit:

```
git add .

git commit -m "feat: add Aggregation Checkpoint 3 with 5 quiz questions"
```
Push your branch:

```
git push -u origin feat/<short-feature-name>
```
Open a Pull Request to the main branch of the upstream repo.

What to Contribute

1. New Checkpoints: topics, objectives, unlock criteria.

2. Quizzes: multiple-choice with correct answers and explanations.

3. Tasks: CRUD and aggregation exercises with solutions/tests.

4. UI/UX: game elements, progress bars, badges, accessibility.

5. Docs: setup steps, troubleshooting, screenshots.