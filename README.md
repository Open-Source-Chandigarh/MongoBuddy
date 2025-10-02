# 🎮 Mongo Buddy

**Mongo Buddy** is a gamified learning platform for MongoDB that makes database learning fun and interactive.

Level up through checkpoints, quizzes, and hands-on tasks instead of reading dry documentation. Earn points, unlock stages, and learn by doing—covering everything from CRUD operations to complex aggregation pipelines.

---

## 🌐 Live Demo

**Try it here:** [Mongo Buddy Live](https://mongobuddy.onrender.com)

---

## ✨ Features

- **📍 Checkpoints** – Unlock stages progressively as you complete concepts
- **❓ Interactive Quizzes** – Test your understanding with engaging questions
- **✅ Hands-On Tasks** – Practice real-world MongoDB queries and operations
- **🏆 Gamified Progression** – Earn points, hit milestones, and level up
- **💻 Learn by Doing** – Master CRUD, operators, indexes, and aggregation
- **📚 Structured Learning Path** – From MongoDB basics to advanced concepts
- **🔍 Query Operators** – Comparison, logical, array, and element operators
- **⚡ Indexes & Performance** – Optimize queries with proper indexing strategies
- **📊 Aggregation Pipelines** – `$match`, `$group`, `$project`, `$sort`, `$lookup`, and more
- **🌍 Real-World Challenges** – Apply your skills to practical scenarios

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **MongoDB** | Database (local or Atlas) |
| **Node.js / Express** | Backend APIs and task validation |
| **Modern JavaScript** | Interactive gamified frontend |

---

## ⚡ Getting Started (Run Locally)

### 1️⃣ Prerequisites

Ensure you have the following installed:

- **Node.js** `18+` and npm
- **MongoDB** (local installation or Atlas account)
- **Git**

**Check your versions:**
```bash
node -v
npm -v
git --version
```

### 2️⃣ Fork and Clone

1. **Fork the repository** on GitHub using the **Fork** button (top-right)
2. **Clone your fork** locally:

```bash
git clone https://github.com/<your-username>/MongoBuddy.git
cd MongoBuddy
```

3. **Add the upstream remote** (optional but recommended):

```bash
git remote add upstream https://github.com/<upstream-owner>/MongoBuddy.git
git fetch upstream
```

### 3️⃣ Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
MONGODB_URI="mongodb://localhost:27017/mongobuddy"   # or your MongoDB Atlas URI
PORT=3000
SESSION_SECRET="change-this-to-a-strong-secret"
```

**Using MongoDB Atlas?**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your current IP address
3. Replace `MONGODB_URI` with your connection string

### 4️⃣ Install Dependencies

```bash
npm install
```

*For monorepo/workspace projects (if applicable):*

```bash
npm run bootstrap
```

### 5️⃣ Seed Sample Data

Load initial data for learning checkpoints:

```bash
npm run seed
```

### 6️⃣ Run the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Access the app:**
```
http://localhost:3000
```

---

## 🎯 How to Play

1. **Start at Checkpoint 1** – MongoDB Basics
2. **Complete tasks and quizzes** to unlock the next stage
3. **Earn points** and progress through increasingly challenging content
4. **Master MongoDB** one checkpoint at a time!

---

## 🤝 Contributing

Contributions are welcome! This project is perfect for **Hacktoberfest** and open-source contributions.

### Quick Contribution Flow

1. **Create a feature branch:**
   ```bash
   git checkout -b feat/<short-feature-name>
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add Aggregation Checkpoint 3 with 5 quiz questions"
   ```

3. **Push your branch:**
   ```bash
   git push -u origin feat/<short-feature-name>
   ```

4. **Open a Pull Request** to the `main` branch of the upstream repository

### 💡 What to Contribute

| Category | Ideas |
|----------|-------|
| **New Checkpoints** | Topics, objectives, unlock criteria |
| **Quizzes** | Multiple-choice questions with explanations |
| **Tasks** | CRUD and aggregation exercises with test cases |
| **UI/UX** | Game elements, progress bars, badges, accessibility |
| **Documentation** | Setup guides, troubleshooting, screenshots |

---

**Happy Learning! 🚀**
