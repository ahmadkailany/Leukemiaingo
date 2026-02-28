# Leukemiaingo - Project Plan & Documentation

> A Duolingo-style gamified web app for leukemia awareness and education

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Design System](#design-system)
5. [Features & Modules](#features--modules)
6. [Database Schema](#database-schema)
7. [File Structure](#file-structure)
8. [Implementation Roadmap](#implementation-roadmap)
9. [API Routes](#api-routes)
10. [Deployment Strategy](#deployment-strategy)

---

## 🎯 Project Overview

### Mission
Spread leukemia awareness through an engaging, gamified learning experience that makes complex medical information accessible and actionable.

### Target Users
- **General Public**: People wanting to learn about leukemia prevention, symptoms, and support
- **At-Risk Individuals**: Those with family history or exposure to risk factors
- **Supporters**: Friends/family of leukemia patients
- **Educators**: Teachers and health advocates

### Core Value Proposition
- **Bite-sized lessons**: 5-10 minute daily learning sessions
- **Gamification**: Streaks, points, badges, and leaderboards for motivation
- **Progressive learning**: From basic awareness to actionable knowledge
- **Community-driven**: Leaderboards and social sharing features

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 (CSS-first configuration)
- **State Management**: Zustand + Context API
- **Icons**: React Icons (react-icons/md, react-icons/fi, react-icons/gi)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

### Backend
- **API**: Next.js API Routes (App Router)
- **Initial DB**: Local JSON files (mock database)
- **Future DB**: Supabase / PostgreSQL (via Drizzle ORM)
- **Authentication**: NextAuth.js v5 (future)
- **File Storage**: Local (MVP) → Cloudinary/S3 (production)

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library (future)
- **Version Control**: Git + GitHub
- **Deployment**: Vercel

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  User App    │  │ Leaderboard  │  │   Profile    │     │
│  │  /lessons    │  │ /leaderboard │  │   /profile   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────────────────────────────────────────┐     │
│  │         Admin Dashboard (/dashboard)              │     │
│  │  Manage: Lessons | Users | Leaderboard | Stats  │     │
│  └──────────────────────────────────────────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │ API Calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                Next.js API Routes (App Router)              │
│  /api/lessons  |  /api/users  |  /api/leaderboard          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Data Layer (lib/data.ts)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ lessons.json│  │  users.json │  │ badges.json │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow
1. **User Action** → Component triggers state change
2. **Zustand Store** → Updates local state + calls API
3. **API Route** → Validates request, updates JSON
4. **Response** → Updates UI with new data

---

## 🎨 Design System

### Color Palette
**Primary Colors** (Leukemia Awareness - Orange & Peach)
```css
--color-primary: #FF6600;        /* Vibrant Orange */
--color-primary-light: #FF9944;  /* Light Orange */
--color-primary-dark: #CC5500;   /* Dark Orange */
--color-secondary: #FFE5CC;      /* Soft Peach */
--color-accent: #FFCC99;         /* Warm Accent */
```

**Neutral Colors**
```css
--color-background: #FFFFFF;     /* White */
--color-surface: #F9FAFB;        /* Light Gray */
--color-border: #E5E7EB;         /* Border Gray */
--color-text-primary: #111827;   /* Dark Gray */
--color-text-secondary: #6B7280; /* Medium Gray */
```

**Status Colors**
```css
--color-success: #10B981;        /* Green */
--color-warning: #F59E0B;        /* Amber */
--color-error: #EF4444;          /* Red */
--color-info: #3B82F6;           /* Blue */
```

**Dark Mode** (Future)
```css
--color-background-dark: #111827;
--color-surface-dark: #1F2937;
--color-text-primary-dark: #F9FAFB;
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 700-800 weight, tight line-height
- **Body**: 400-500 weight, relaxed line-height
- **Code/Numbers**: JetBrains Mono (monospace)

```css
/* tailwind.config.ts */
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### Component Guidelines
- **Buttons**: Rounded-full for primary actions, shadow on hover, scale animation
- **Cards**: Rounded-xl, subtle shadow, gradient backgrounds for lessons
- **Badges**: Pill-shaped, icon + text, color-coded by type
- **Icons**: 20-24px standard, 32-48px for featured elements

### Spacing System
```css
/* Use Tailwind's default scale */
space-2  → 0.5rem (8px)
space-4  → 1rem (16px)
space-6  → 1.5rem (24px)
space-8  → 2rem (32px)
space-12 → 3rem (48px)
```

---

## ✨ Features & Modules

### 1. User App Features

#### 1.1 Lesson System
**Goal**: Deliver bite-sized educational content on leukemia

**Lesson Categories**:
1. **Basics** (3 lessons)
   - What is Leukemia?
   - Types of Leukemia (ALL, AML, CLL, CML)
   - How Blood Cells Work

2. **Symptoms & Detection** (4 lessons)
   - Early Warning Signs
   - When to See a Doctor
   - Diagnostic Tests Explained
   - Understanding Blood Counts

3. **Risk Factors** (3 lessons)
   - Genetic Factors
   - Environmental Risks
   - Who is at Risk?

4. **Treatment** (4 lessons)
   - Chemotherapy Basics
   - Stem Cell Transplants
   - Targeted Therapy
   - Living During Treatment

5. **Support & Action** (3 lessons)
   - Supporting Someone with Leukemia
   - Lifestyle & Prevention
   - Resources & Communities

**Question Types**:
- **Multiple Choice**: "Which symptom is common in leukemia?" (4 options)
- **True/False**: "Leukemia is contagious" (True/False)
- **Fill-in-the-Blank**: "Leukemia affects ___ cells" (blood)
- **Match Pairs**: Match symptoms to types (drag-and-drop)
- **Scenario**: "If you notice unexplained bruising, you should: [options]"

**Lesson Flow**:
```
Lesson Card → Intro (30 sec) → Questions (5-7) → Summary → Points/Badge Award
```

#### 1.2 Gamification Mechanics

**XP & Levels**:
- 10 XP per correct answer
- 50 XP bonus for perfect lesson
- 100 XP for daily streak milestone (7, 30, 100 days)
- Levels: Beginner (0-500 XP) → Fighter (500-2000 XP) → Champion (2000+ XP)

**Streaks**:
- Track consecutive days of completing ≥1 lesson
- Streak Freeze: Use once to skip a day without breaking streak
- Visual: Flame icon with day count (e.g., 🔥 12)

**Badges**:
| Badge Name             | Icon        | Condition                          |
|------------------------|-------------|------------------------------------||
| First Steps            | 🎯          | Complete first lesson              |
| Symptom Spotter        | 🔍          | Complete all Symptoms lessons      |
| Risk Awareness         | ⚠️          | Complete all Risk Factors lessons  |
| Treatment Expert       | 💉          | Complete all Treatment lessons     |
| Week Warrior           | 🔥          | 7-day streak                       |
| Month Master           | 🏆          | 30-day streak                      |
| Perfect Score          | ⭐          | Get 100% on any lesson             |
| Community Helper       | 🤝          | Share 5 lessons                    |
| Knowledge Champion     | 👑          | Complete all 17 lessons            |

**Leaderboard**:
- **Weekly Leaderboard**: Resets every Monday, ranks by XP earned this week
- **All-Time Leaderboard**: Ranks by total XP
- Display: Top 10 with user's rank if not in top 10
- Leagues (Future): Bronze, Silver, Gold, Diamond based on rank

#### 1.3 User Profile
- Avatar (customizable color)
- Display Name
- Stats:
  - Total XP
  - Current Level
  - Streak (days)
  - Lessons Completed (X/17)
  - Badges Earned (X/9)
- Progress Chart: XP over time (line chart)
- Badge Showcase: Grid of earned badges

#### 1.4 Social Features
- **Share Progress**: Generate image card with stats to share on social media
- **Referral System** (Future): Invite friends, earn bonus XP
- **Community Feed** (Future): See friends' achievements

---

### 2. Admin Dashboard Features

#### 2.1 Dashboard Overview
**URL**: `/dashboard`

**Metrics**:
- Total Users
- Active Users (last 7 days)
- Total Lessons Completed
- Average Streak Length
- Top 5 Most Completed Lessons

**Charts**:
- User Growth (line chart)
- Lesson Completion Rate (bar chart)
- Daily Active Users (area chart)

#### 2.2 Lesson Management
**CRUD Operations**:
- **Create**: Add new lesson with questions
- **Read**: View all lessons with stats (completion rate, avg score)
- **Update**: Edit lesson content, questions, correct answers
- **Delete**: Remove lesson (with confirmation)

**Form Fields**:
```typescript
interface Lesson {
  id: string;
  title: string;
  category: 'basics' | 'symptoms' | 'risks' | 'treatment' | 'support';
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  questions: Question[];
  order: number; // Display order
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'match';
  questionText: string;
  options?: string[]; // For multiple-choice
  correctAnswer: string | string[]; // String or array for match
  explanation: string; // Shown after answer
}
```

#### 2.3 User Management
- **View All Users**: Paginated table (20 per page)
- **Filter**: By level, streak, last active
- **Search**: By username/email
- **Actions**: View profile, ban/unban (future), reset progress
- **Export**: CSV of user data

#### 2.4 Leaderboard Management
- View current top 100
- Manually adjust XP (with reason log)
- Reset weekly leaderboard
- Feature users on homepage

#### 2.5 Badge Management
- **Create Custom Badges**: Name, icon, condition
- **Award Manually**: Give badge to specific user
- **View Badge Stats**: How many users have each badge

#### 2.6 Content Moderation (Future)
- Review user-generated content (comments, forum posts)
- Flag inappropriate content
- Moderate community discussions

---

## 📊 Database Schema

### JSON Structure (MVP)

#### `data/lessons.json`
```json
[
  {
    "id": "lesson-001",
    "title": "What is Leukemia?",
    "category": "basics",
    "description": "Learn the fundamentals of leukemia and how it affects the body",
    "difficulty": "easy",
    "xpReward": 50,
    "order": 1,
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "questionText": "Leukemia is a cancer that affects which part of the body?",
        "options": [
          "Heart",
          "Blood and bone marrow",
          "Lungs",
          "Liver"
        ],
        "correctAnswer": "Blood and bone marrow",
        "explanation": "Leukemia is a cancer of blood-forming tissues, including bone marrow and the lymphatic system."
      },
      {
        "id": "q2",
        "type": "true-false",
        "questionText": "Leukemia is contagious and can spread from person to person.",
        "correctAnswer": "false",
        "explanation": "Leukemia is NOT contagious. It's caused by genetic mutations, not infections."
      }
    ]
  }
]
```

#### `data/users.json`
```json
[
  {
    "id": "user-001",
    "username": "fighter123",
    "email": "user@example.com",
    "avatar": "orange", // Color identifier
    "createdAt": "2026-02-01T10:00:00Z",
    "lastActiveAt": "2026-02-28T10:00:00Z",
    "stats": {
      "totalXP": 850,
      "level": 2,
      "currentStreak": 12,
      "longestStreak": 15,
      "lessonsCompleted": ["lesson-001", "lesson-002"],
      "badgesEarned": ["first-steps", "week-warrior"],
      "streakFreezeAvailable": 1
    },
    "weeklyXP": 350, // Reset every Monday
    "role": "user" // or "admin"
  }
]
```

#### `data/badges.json`
```json
[
  {
    "id": "first-steps",
    "name": "First Steps",
    "description": "Complete your first lesson",
    "icon": "FiTarget", // React Icons name
    "condition": {
      "type": "lessons_completed",
      "value": 1
    },
    "xpBonus": 25
  },
  {
    "id": "week-warrior",
    "name": "Week Warrior",
    "description": "Maintain a 7-day streak",
    "icon": "FiZap",
    "condition": {
      "type": "streak",
      "value": 7
    },
    "xpBonus": 100
  }
]
```

#### `data/leaderboard.json`
```json
{
  "weekly": [
    {
      "userId": "user-001",
      "username": "fighter123",
      "xp": 350,
      "rank": 1
    }
  ],
  "allTime": [
    {
      "userId": "user-001",
      "username": "fighter123",
      "xp": 850,
      "rank": 1
    }
  ],
  "lastWeeklyReset": "2026-02-24T00:00:00Z"
}
```

### Future Database Schema (PostgreSQL via Drizzle)

```typescript
// schema.ts
import { pgTable, serial, text, integer, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  avatar: text('avatar'),
  totalXP: integer('total_xp').default(0),
  level: integer('level').default(1),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  weeklyXP: integer('weekly_xp').default(0),
  role: text('role').default('user'), // 'user' | 'admin'
  createdAt: timestamp('created_at').defaultNow(),
  lastActiveAt: timestamp('last_active_at').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  difficulty: text('difficulty'),
  xpReward: integer('xp_reward').default(50),
  questions: jsonb('questions').notNull(), // Store questions as JSONB
  order: integer('order'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  lessonId: integer('lesson_id').references(() => lessons.id),
  score: integer('score'), // Percentage
  completedAt: timestamp('completed_at').defaultNow(),
});

export const badges = pgTable('badges', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon'),
  condition: jsonb('condition'),
  xpBonus: integer('xp_bonus').default(0),
});

export const userBadges = pgTable('user_badges', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  badgeId: integer('badge_id').references(() => badges.id),
  earnedAt: timestamp('earned_at').defaultNow(),
});
```

---

## 📁 File Structure

```
Leukemiaingo/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── manifest.json          # PWA manifest
│   └── images/
│       ├── og-image.png        # Social share image
│       └── badges/             # Badge icons (if custom)
│
├── src/
│   ├── app/
│   │   ├── (user)/             # User-facing routes (grouped)
│   │   │   ├── page.tsx        # Homepage/Dashboard
│   │   │   ├── lessons/
│   │   │   │   ├── page.tsx    # All lessons
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # Single lesson
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── about/
│   │   │       └── page.tsx    # About leukemia (static content)
│   │   │
│   │   ├── dashboard/          # Admin routes (protected)
│   │   │   ├── page.tsx        # Admin overview
│   │   │   ├── layout.tsx      # Admin sidebar layout
│   │   │   ├── lessons/
│   │   │   │   ├── page.tsx    # Manage lessons
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx # Create lesson
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx # View lesson
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx # Edit lesson
│   │   │   ├── users/
│   │   │   │   ├── page.tsx    # Manage users
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # User details
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   ├── badges/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx    # App settings
│   │   │
│   │   ├── api/                # API Routes
│   │   │   ├── lessons/
│   │   │   │   ├── route.ts    # GET /api/lessons
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts # GET/PUT/DELETE /api/lessons/:id
│   │   │   ├── users/
│   │   │   │   ├── route.ts    # GET /api/users
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts # GET/PUT /api/users/:id
│   │   │   ├── leaderboard/
│   │   │   │   └── route.ts    # GET /api/leaderboard
│   │   │   ├── badges/
│   │   │   │   └── route.ts    # GET /api/badges
│   │   │   └── progress/
│   │   │       └── route.ts    # POST /api/progress (update user progress)
│   │   │
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles + Tailwind
│   │   └── not-found.tsx       # 404 page
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Progress.tsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx     # Admin sidebar
│   │   │   └── MobileNav.tsx
│   │   │
│   │   ├── lessons/            # Lesson-specific components
│   │   │   ├── LessonCard.tsx
│   │   │   ├── LessonGrid.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── MultipleChoice.tsx
│   │   │   ├── TrueFalse.tsx
│   │   │   ├── FillBlank.tsx
│   │   │   └── MatchPairs.tsx
│   │   │
│   │   ├── gamification/       # Gamification components
│   │   │   ├── StreakDisplay.tsx
│   │   │   ├── XPBar.tsx
│   │   │   ├── BadgeGrid.tsx
│   │   │   ├── LevelIndicator.tsx
│   │   │   └── PointsAnimation.tsx
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardTable.tsx
│   │   │   └── UserRankCard.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── ProgressChart.tsx
│   │   │
│   │   └── dashboard/          # Admin components
│   │       ├── StatsCard.tsx
│   │       ├── UserTable.tsx
│   │       ├── LessonForm.tsx
│   │       └── ChartWrapper.tsx
│   │
│   ├── lib/
│   │   ├── store.ts            # Zustand global state
│   │   ├── data.ts             # JSON data fetching functions
│   │   ├── theme.ts            # Theme configuration
│   │   ├── utils.ts            # Utility functions
│   │   ├── constants.ts        # App constants
│   │   └── validations/
│   │       ├── lesson.ts       # Lesson validation schemas
│   │       └── user.ts         # User validation schemas
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useLesson.ts
│   │   ├── useUser.ts
│   │   ├── useLeaderboard.ts
│   │   └── useLocalStorage.ts
│   │
│   └── types/
│       ├── lesson.ts
│       ├── user.ts
│       ├── badge.ts
│       └── api.ts
│
├── data/                       # JSON database files
│   ├── lessons.json
│   ├── users.json
│   ├── badges.json
│   └── leaderboard.json
│
├── .env.local                  # Environment variables
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── PROJECT_PLAN.md             # This file
```

---

## 🚀 Implementation Roadmap

### Phase 1: Foundation Setup (Week 1)
**Goal**: Get the dev environment running with basic structure

- [ ] Initialize Next.js 16 project with TypeScript
- [ ] Configure Tailwind CSS 4 (CSS-first)
- [ ] Set up file structure
- [ ] Install dependencies: `react-icons`, `zustand`, `framer-motion`
- [ ] Create global theme in `lib/theme.ts`
- [ ] Set up Tailwind config with custom colors
- [ ] Create basic UI components (Button, Card, Badge)
- [ ] Set up Git repository and push initial commit

**Deliverables**:
- Working dev server at `localhost:3000`
- Basic homepage with header/footer
- Theme switcher (colors changeable from one file)

---

### Phase 2: User App Core (Week 2-3)
**Goal**: Build the main user-facing features

#### Sprint 2.1: Lesson System
- [ ] Create `data/lessons.json` with 3 sample lessons
- [ ] Build lesson list page (`/lessons`)
- [ ] Build single lesson page (`/lessons/[id]`)
- [ ] Implement quiz components:
  - [ ] MultipleChoice.tsx
  - [ ] TrueFalse.tsx
  - [ ] FillBlank.tsx
- [ ] Add answer validation logic
- [ ] Show explanations after answering
- [ ] Calculate and display XP earned

#### Sprint 2.2: Gamification
- [ ] Create `data/users.json` with sample user
- [ ] Implement Zustand store for user state
- [ ] Build StreakDisplay component
- [ ] Build XPBar component
- [ ] Implement level calculation (XP → Level)
- [ ] Create badge system logic
- [ ] Build BadgeGrid component
- [ ] Award badges automatically based on conditions

#### Sprint 2.3: Profile & Progress
- [ ] Build profile page (`/profile`)
- [ ] Display user stats (XP, level, streak)
- [ ] Show completed lessons
- [ ] Show earned badges
- [ ] Add progress chart (simple bar chart with CSS)

**Deliverables**:
- Users can complete lessons and earn XP
- Streak tracking works
- Badges awarded automatically
- Profile shows all user data

---

### Phase 3: Leaderboard & Social (Week 4)
**Goal**: Add competitive and social elements

- [ ] Create `data/leaderboard.json`
- [ ] Build leaderboard page (`/leaderboard`)
- [ ] Implement weekly leaderboard reset logic
- [ ] Show user's rank (even if not in top 10)
- [ ] Add "Share Progress" feature (generate image card)
- [ ] Implement streak freeze mechanic
- [ ] Add daily goal notifications (browser API)

**Deliverables**:
- Working leaderboard with top 10 users
- Users can see their rank
- Share cards can be downloaded

---

### Phase 4: Admin Dashboard (Week 5-6)
**Goal**: Build admin interface for managing content

#### Sprint 4.1: Admin Setup
- [ ] Create admin layout with sidebar
- [ ] Build admin dashboard overview page
- [ ] Add basic authentication (hardcoded admin role for MVP)
- [ ] Protect admin routes

#### Sprint 4.2: Lesson Management
- [ ] Build lesson management page (`/dashboard/lessons`)
- [ ] Create lesson form (create/edit)
- [ ] Implement API routes:
  - [ ] `POST /api/lessons` (create)
  - [ ] `PUT /api/lessons/[id]` (update)
  - [ ] `DELETE /api/lessons/[id]` (delete)
- [ ] Add form validation with Zod
- [ ] Test CRUD operations

#### Sprint 4.3: User Management
- [ ] Build user management page (`/dashboard/users`)
- [ ] Show paginated user table
- [ ] Add search/filter functionality
- [ ] View individual user details
- [ ] Implement user stats dashboard

#### Sprint 4.4: Analytics
- [ ] Build stats cards (total users, lessons completed, etc.)
- [ ] Add simple charts (CSS-based or chart.js)
- [ ] Show most popular lessons
- [ ] Display engagement metrics

**Deliverables**:
- Fully functional admin dashboard
- Admins can CRUD lessons
- Admins can view/manage users
- Basic analytics visible

---

### Phase 5: Polish & Testing (Week 7)
**Goal**: Refine UI, fix bugs, optimize performance

- [ ] Mobile responsiveness testing (all breakpoints)
- [ ] Add loading states for all API calls
- [ ] Implement error boundaries
- [ ] Add toast notifications (success/error messages)
- [ ] Optimize images (use Next.js Image component)
- [ ] Add animations (Framer Motion)
- [ ] Accessibility audit (keyboard navigation, ARIA labels)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Add PWA support (manifest.json, service worker)
- [ ] Write README with setup instructions

**Deliverables**:
- Polished, bug-free MVP
- Responsive on all devices
- Fast page loads (<2s)
- PWA-ready

---

### Phase 6: Deployment (Week 8)
**Goal**: Deploy to production and monitor

- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Deploy to production
- [ ] Test production build
- [ ] Set up analytics (Vercel Analytics or Google Analytics)
- [ ] Configure custom domain (optional)
- [ ] Set up error tracking (Sentry - optional)
- [ ] Create user onboarding flow

**Deliverables**:
- Live production app
- Analytics tracking active users
- Monitoring for errors

---

### Phase 7: Future Enhancements (Post-MVP)

#### Database Migration
- [ ] Set up Supabase project
- [ ] Migrate JSON data to PostgreSQL
- [ ] Implement Drizzle ORM
- [ ] Update API routes to use database
- [ ] Test data migration

#### Authentication
- [ ] Implement NextAuth.js v5
- [ ] Add email/password signup
- [ ] Add OAuth (Google, GitHub)
- [ ] Email verification
- [ ] Password reset flow

#### Advanced Features
- [ ] Real-time leaderboard updates (WebSockets)
- [ ] Community forum/discussions
- [ ] User-to-user messaging
- [ ] Push notifications (PWA)
- [ ] Offline mode (cache lessons)
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle
- [ ] Advanced quiz types (drag-and-drop matching)
- [ ] Video lessons integration
- [ ] Certificate of completion (downloadable PDF)

#### Gamification 2.0
- [ ] Leagues (Bronze → Diamond)
- [ ] Weekly tournaments
- [ ] Team challenges
- [ ] Referral rewards
- [ ] Daily quests
- [ ] Seasonal events

---

## 🔌 API Routes

### Lessons API

#### `GET /api/lessons`
Get all lessons (paginated)

**Query Params**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category

**Response**:
```json
{
  "lessons": [
    {
      "id": "lesson-001",
      "title": "What is Leukemia?",
      "category": "basics",
      "difficulty": "easy",
      "xpReward": 50,
      "completionRate": 85
    }
  ],
  "pagination": {
    "total": 17,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

#### `GET /api/lessons/[id]`
Get single lesson with questions

**Response**:
```json
{
  "id": "lesson-001",
  "title": "What is Leukemia?",
  "category": "basics",
  "description": "Learn the fundamentals...",
  "questions": [...]
}
```

#### `POST /api/lessons` (Admin only)
Create new lesson

**Body**:
```json
{
  "title": "New Lesson",
  "category": "basics",
  "description": "...",
  "questions": [...]
}
```

**Response**:
```json
{
  "message": "Lesson created successfully",
  "lessonId": "lesson-018"
}
```

---

### Users API

#### `GET /api/users`
Get all users (Admin only, paginated)

**Query Params**:
- `page`, `limit`, `search`, `sortBy`

**Response**:
```json
{
  "users": [
    {
      "id": "user-001",
      "username": "fighter123",
      "level": 2,
      "totalXP": 850,
      "currentStreak": 12,
      "lastActiveAt": "2026-02-28T10:00:00Z"
    }
  ],
  "pagination": {...}
}
```

#### `GET /api/users/[id]`
Get single user profile

**Response**:
```json
{
  "id": "user-001",
  "username": "fighter123",
  "stats": {
    "totalXP": 850,
    "level": 2,
    "currentStreak": 12,
    "lessonsCompleted": ["lesson-001", "lesson-002"],
    "badgesEarned": ["first-steps", "week-warrior"]
  }
}
```

#### `PUT /api/users/[id]`
Update user data (own profile or admin)

**Body**:
```json
{
  "username": "newName",
  "avatar": "blue"
}
```

---

### Leaderboard API

#### `GET /api/leaderboard`
Get leaderboard rankings

**Query Params**:
- `type`: `weekly` | `allTime` (default: `weekly`)
- `limit`: Number of users (default: 10)

**Response**:
```json
{
  "type": "weekly",
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user-001",
      "username": "fighter123",
      "xp": 350,
      "avatar": "orange"
    }
  ],
  "currentUser": {
    "rank": 25,
    "xp": 120
  }
}
```

---

### Progress API

#### `POST /api/progress`
Update user progress after completing lesson

**Body**:
```json
{
  "userId": "user-001",
  "lessonId": "lesson-001",
  "score": 100,
  "xpEarned": 50
}
```

**Response**:
```json
{
  "success": true,
  "newXP": 900,
  "newLevel": 2,
  "badgesEarned": ["perfect-score"],
  "streakUpdated": true
}
```

---

### Badges API

#### `GET /api/badges`
Get all available badges

**Response**:
```json
{
  "badges": [
    {
      "id": "first-steps",
      "name": "First Steps",
      "description": "Complete your first lesson",
      "icon": "FiTarget",
      "earned": true,
      "earnedAt": "2026-02-15T10:00:00Z"
    }
  ]
}
```

---

## 🚢 Deployment Strategy

### Development Environment
- **Local Dev**: `npm run dev` on `localhost:3000`
- **Hot Reload**: Instant updates on code changes
- **TypeScript**: Compile-time error checking

### Staging Environment (Optional)
- **Preview Deployments**: Vercel auto-deploys every PR
- **Testing**: QA on preview URL before merging to main

### Production Environment
- **Platform**: Vercel (optimized for Next.js)
- **Domain**: `leukemiaingo.vercel.app` (or custom domain)
- **Deployment**: Auto-deploy on push to `main` branch
- **Edge Functions**: API routes run on Vercel Edge Network
- **Analytics**: Vercel Analytics + Web Vitals

### Environment Variables
```bash
# .env.local (not committed)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Leukemiaingo

# Future (when adding database)
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
```

### CI/CD Pipeline
1. **Push to GitHub** → Triggers Vercel build
2. **Build & Test** → Next.js compiles TypeScript
3. **Deploy** → Updates production or creates preview
4. **Monitor** → Vercel Analytics tracks performance

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3s
- **Lighthouse Score**: 90+ (all categories)

---

## 📝 Development Guidelines

### Code Style
- **TypeScript**: Use strict mode, define all types
- **Components**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utils
- **Imports**: Absolute imports with `@/` alias

### Commit Message Convention
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(lessons): add multiple choice question type
- fix(leaderboard): correct weekly reset logic
- docs(readme): update setup instructions
```

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/xyz`: New features
- `fix/xyz`: Bug fixes
- `docs/xyz`: Documentation updates

### Testing Checklist (Before Deploy)
- [ ] All pages load without errors
- [ ] Forms validate correctly
- [ ] API routes return expected data
- [ ] Mobile responsive (test on real device)
- [ ] Cross-browser compatible (Chrome, Safari, Firefox)
- [ ] Accessibility: keyboard navigation works
- [ ] No console errors or warnings

---

## 🎯 Success Metrics (Post-Launch)

### User Engagement
- **Daily Active Users (DAU)**: Target 100+ in first month
- **Average Session Duration**: Target 5+ minutes
- **Lesson Completion Rate**: Target 70%+
- **7-Day Retention**: Target 40%+

### Learning Outcomes
- **Total Lessons Completed**: Track growth over time
- **Average Quiz Score**: Target 75%+ (indicates comprehension)
- **Badge Earn Rate**: % of users earning each badge

### Social Impact
- **Shares**: Track social media shares
- **Referrals**: Users inviting friends
- **Feedback**: Collect user testimonials

---

## 📞 Contact & Support

**Developer**: Ahmad Kailany  
**GitHub**: [@ahmadkailany](https://github.com/ahmadkailany)  
**Repository**: [Leukemiaingo](https://github.com/ahmadkailany/Leukemiaingo)

---

## 📄 License

MIT License (or specify your chosen license)

---

## 🙏 Acknowledgments

- Inspired by Duolingo's gamification mechanics
- Leukemia information sourced from:
  - Mayo Clinic
  - American Cancer Society
  - Cleveland Clinic
  - National Cancer Institute

---

**Last Updated**: February 28, 2026  
**Version**: 1.0.0 (MVP Planning)

---

## Next Steps

1. ✅ **Create GitHub Repository** (Done)
2. ⏳ **Initialize Next.js Project**
3. ⏳ **Set Up Design System**
4. ⏳ **Build First Lesson**
5. ⏳ **Launch MVP**

**Let's build something impactful! 🚀🎗️**