// Dummy Data untuk Aplikasi Belajar Pintar
// Data ini mencakup modules, quizzes, dan achievements

// ============ MODULES DATA (Minimal 10) ============
export const modules = [
  {
    id: 1,
    title: "Pengenalan React Fundamentals",
    category: "Programming",
    description: "Mempelajari dasar-dasar React termasuk components, props, dan state",
    duration: 120, // dalam menit
    status: "completed",
    progress: 100,
    lastAccessed: "2026-01-14T10:30:00",
    difficulty: "beginner",
    instructor: "Dr. Budi Santoso",
    bookmarked: true,
    completedAt: "2026-01-10T15:20:00"
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    category: "Programming",
    description: "Memahami useState, useEffect, useContext, dan custom hooks",
    duration: 180,
    status: "in-progress",
    progress: 65,
    lastAccessed: "2026-01-15T08:15:00",
    difficulty: "intermediate",
    instructor: "Prof. Siti Rahayu",
    bookmarked: true,
    completedAt: null
  },
  {
    id: 3,
    title: "Database Design & Normalization",
    category: "Database",
    description: "Prinsip perancangan database dan normalisasi 1NF hingga 3NF",
    duration: 150,
    status: "completed",
    progress: 100,
    lastAccessed: "2026-01-12T14:00:00",
    difficulty: "intermediate",
    instructor: "Dr. Ahmad Fauzi",
    bookmarked: false,
    completedAt: "2026-01-12T16:30:00"
  },
  {
    id: 4,
    title: "SQL Query Optimization",
    category: "Database",
    description: "Teknik optimasi query SQL untuk performa maksimal",
    duration: 135,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "advanced",
    instructor: "Dr. Ahmad Fauzi",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 5,
    title: "Computer Networks Basics",
    category: "Network",
    description: "Konsep dasar jaringan komputer dan model OSI",
    duration: 160,
    status: "completed",
    progress: 100,
    lastAccessed: "2026-01-08T11:20:00",
    difficulty: "beginner",
    instructor: "Ir. Dewi Lestari",
    bookmarked: true,
    completedAt: "2026-01-09T10:45:00"
  },
  {
    id: 6,
    title: "TCP/IP Protocol Suite",
    category: "Network",
    description: "Memahami protokol TCP/IP dan implementasinya",
    duration: 145,
    status: "in-progress",
    progress: 40,
    lastAccessed: "2026-01-13T16:30:00",
    difficulty: "intermediate",
    instructor: "Ir. Dewi Lestari",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 7,
    title: "RESTful API Design",
    category: "Programming",
    description: "Best practices dalam merancang RESTful API",
    duration: 125,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "intermediate",
    instructor: "Dr. Budi Santoso",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 8,
    title: "MongoDB & NoSQL Databases",
    category: "Database",
    description: "Pengenalan NoSQL database dengan focus pada MongoDB",
    duration: 170,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "intermediate",
    instructor: "Dr. Ahmad Fauzi",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 9,
    title: "Network Security Fundamentals",
    category: "Network",
    description: "Dasar-dasar keamanan jaringan dan enkripsi",
    duration: 155,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "advanced",
    instructor: "Ir. Dewi Lestari",
    bookmarked: true,
    completedAt: null
  },
  {
    id: 10,
    title: "Advanced React Patterns",
    category: "Programming",
    description: "Pola-pola advanced dalam React: HOC, Render Props, Compound Components",
    duration: 200,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "advanced",
    instructor: "Prof. Siti Rahayu",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 11,
    title: "GraphQL Fundamentals",
    category: "Programming",
    description: "Pengenalan GraphQL dan perbandingan dengan REST",
    duration: 140,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "intermediate",
    instructor: "Dr. Budi Santoso",
    bookmarked: false,
    completedAt: null
  },
  {
    id: 12,
    title: "Cloud Computing Basics",
    category: "Network",
    description: "Konsep dasar cloud computing dan service models",
    duration: 165,
    status: "not-started",
    progress: 0,
    lastAccessed: null,
    difficulty: "beginner",
    instructor: "Ir. Dewi Lestari",
    bookmarked: false,
    completedAt: null
  }
];

// ============ QUIZZES DATA (Minimal 30) ============
// IMPORTANT: Quiz dengan hasQuestions: true memiliki detail soal di quizQuestionsData.js
// Quiz ID 1, 2, 3 memiliki detail soal lengkap untuk demo
// Total: 32 quizzes, 10 completed (termasuk 5 dengan nilai 90+)
export const quizzes = [
  {
    id: 1,
    moduleId: 1,
    title: "Quiz: React Fundamentals - Components & Props",
    category: "Programming",
    type: "multiple-choice",
    duration: 15, // menit
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0,
    hasQuestions: true // indicator quiz ini punya soal
  },
  {
    id: 2,
    moduleId: 1,
    title: "Quiz: React State Management",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 15,
    passingScore: 70,
    status: "completed",
    score: 92,
    attemptDate: "2026-01-10T15:00:00",
    timeSpent: 18,
    hasQuestions: true
  },
  {
    id: 3,
    moduleId: 2,
    title: "Quiz: useState Hook",
    category: "Programming",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0,
    hasQuestions: true
  },
  {
    id: 4,
    moduleId: 2,
    title: "Quiz: useEffect Hook",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "in-progress",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 5,
    moduleId: 3,
    title: "Quiz: Database Normalization",
    category: "Database",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "completed",
    score: 91,
    attemptDate: "2026-01-12T16:00:00",
    timeSpent: 22
  },
  {
    id: 6,
    moduleId: 3,
    title: "Quiz: ER Diagram Design",
    category: "Database",
    type: "essay",
    duration: 30,
    totalQuestions: 5,
    passingScore: 75,
    status: "completed",
    score: 82,
    attemptDate: "2026-01-12T16:30:00",
    timeSpent: 28
  },
  {
    id: 7,
    moduleId: 5,
    title: "Quiz: OSI Model Layers",
    category: "Network",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "completed",
    score: 90,
    attemptDate: "2026-01-09T10:00:00",
    timeSpent: 13
  },
  {
    id: 8,
    moduleId: 5,
    title: "Quiz: Network Topologies",
    category: "Network",
    type: "true-false",
    duration: 10,
    totalQuestions: 8,
    passingScore: 70,
    status: "completed",
    score: 100,
    attemptDate: "2026-01-09T10:30:00",
    timeSpent: 8
  },
  {
    id: 9,
    moduleId: 6,
    title: "Quiz: TCP vs UDP",
    category: "Network",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 10,
    moduleId: 2,
    title: "Quiz: useContext Hook",
    category: "Programming",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 11,
    moduleId: 2,
    title: "Quiz: Custom Hooks",
    category: "Programming",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 12,
    moduleId: 4,
    title: "Quiz: SQL Query Basics",
    category: "Database",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 13,
    moduleId: 4,
    title: "Quiz: Index Optimization",
    category: "Database",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 14,
    moduleId: 7,
    title: "Quiz: HTTP Methods",
    category: "Programming",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 15,
    moduleId: 7,
    title: "Quiz: API Authentication",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 16,
    moduleId: 8,
    title: "Quiz: MongoDB CRUD Operations",
    category: "Database",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 17,
    moduleId: 8,
    title: "Quiz: NoSQL vs SQL",
    category: "Database",
    type: "true-false",
    duration: 10,
    totalQuestions: 8,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 18,
    moduleId: 9,
    title: "Quiz: Encryption Methods",
    category: "Network",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 19,
    moduleId: 9,
    title: "Quiz: Network Threats",
    category: "Network",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 20,
    moduleId: 10,
    title: "Quiz: Higher Order Components",
    category: "Programming",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 21,
    moduleId: 10,
    title: "Quiz: Render Props Pattern",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 22,
    moduleId: 11,
    title: "Quiz: GraphQL Queries",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 23,
    moduleId: 11,
    title: "Quiz: GraphQL Mutations",
    category: "Programming",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 24,
    moduleId: 12,
    title: "Quiz: Cloud Service Models",
    category: "Network",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 25,
    moduleId: 12,
    title: "Quiz: Cloud Deployment Models",
    category: "Network",
    type: "true-false",
    duration: 10,
    totalQuestions: 8,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 26,
    moduleId: 1,
    title: "Quiz: JSX Syntax",
    category: "Programming",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "completed",
    score: 95,
    attemptDate: "2026-01-10T14:30:00",
    timeSpent: 12
  },
  {
    id: 27,
    moduleId: 3,
    title: "Quiz: Database Keys",
    category: "Database",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "completed",
    score: 85,
    attemptDate: "2026-01-12T15:00:00",
    timeSpent: 18
  },
  {
    id: 28,
    moduleId: 6,
    title: "Quiz: IP Addressing",
    category: "Network",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 29,
    moduleId: 6,
    title: "Quiz: Subnetting",
    category: "Network",
    type: "multiple-choice",
    duration: 30,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 30,
    moduleId: 2,
    title: "Quiz: useReducer Hook",
    category: "Programming",
    type: "multiple-choice",
    duration: 20,
    totalQuestions: 12,
    passingScore: 70,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  },
  {
    id: 31,
    moduleId: 5,
    title: "Quiz: Network Devices",
    category: "Network",
    type: "multiple-choice",
    duration: 15,
    totalQuestions: 10,
    passingScore: 70,
    status: "completed",
    score: 88,
    attemptDate: "2026-01-09T09:30:00",
    timeSpent: 14
  },
  {
    id: 32,
    moduleId: 10,
    title: "Quiz: Compound Components",
    category: "Programming",
    type: "multiple-choice",
    duration: 25,
    totalQuestions: 15,
    passingScore: 75,
    status: "not-started",
    score: null,
    attemptDate: null,
    timeSpent: 0
  }
];

// ============ ACHIEVEMENTS DATA (Minimal 10) ============
export const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Selesaikan modul pertama Anda",
    icon: "🎯",
    category: "milestone",
    points: 50,
    rarity: "common",
    unlocked: true,
    unlockedAt: "2026-01-10T15:20:00",
    progress: 100,
    requirement: "Complete 1 module"
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Selesaikan 3 modul dalam seminggu",
    icon: "⚡",
    category: "speed",
    points: 100,
    rarity: "uncommon",
    unlocked: true,
    unlockedAt: "2026-01-12T16:30:00",
    progress: 100,
    requirement: "Complete 3 modules in 1 week"
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Dapatkan nilai 90+ pada 5 quiz",
    icon: "🏆",
    category: "performance",
    points: 150,
    rarity: "rare",
    unlocked: true,
    unlockedAt: "2026-01-12T16:35:00",
    progress: 100,
    requirement: "Score 90+ on 5 quizzes (Quiz #2: 92, #5: 91, #7: 90, #8: 100, #26: 95)"
  },
  {
    id: 4,
    title: "Perfect Score",
    description: "Dapatkan nilai 100 pada quiz",
    icon: "💯",
    category: "performance",
    points: 200,
    rarity: "rare",
    unlocked: true,
    unlockedAt: "2026-01-09T10:30:00",
    progress: 100,
    requirement: "Score 100 on any quiz"
  },
  {
    id: 5,
    title: "7 Day Streak",
    description: "Belajar 7 hari berturut-turut",
    icon: "🔥",
    category: "consistency",
    points: 250,
    rarity: "epic",
    unlocked: false,
    unlockedAt: null,
    progress: 71, // 5 dari 7 hari
    requirement: "Study for 7 consecutive days"
  },
  {
    id: 6,
    title: "Network Ninja",
    description: "Selesaikan semua modul Network",
    icon: "🌐",
    category: "specialization",
    points: 300,
    rarity: "epic",
    unlocked: false,
    unlockedAt: null,
    progress: 25, // 1 dari 4 modul network selesai
    requirement: "Complete all Network modules"
  },
  {
    id: 7,
    title: "Database Expert",
    description: "Selesaikan semua modul Database",
    icon: "💾",
    category: "specialization",
    points: 300,
    rarity: "epic",
    unlocked: false,
    unlockedAt: null,
    progress: 33, // 1 dari 3 modul database selesai
    requirement: "Complete all Database modules"
  },
  {
    id: 8,
    title: "Programming Pro",
    description: "Selesaikan semua modul Programming",
    icon: "💻",
    category: "specialization",
    points: 300,
    rarity: "epic",
    unlocked: false,
    unlockedAt: null,
    progress: 20, // 1 dari 5 modul programming selesai
    requirement: "Complete all Programming modules"
  },
  {
    id: 9,
    title: "Early Bird",
    description: "Belajar sebelum jam 7 pagi sebanyak 10 kali",
    icon: "🌅",
    category: "habit",
    points: 100,
    rarity: "uncommon",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Study before 7 AM 10 times"
  },
  {
    id: 10,
    title: "Night Owl",
    description: "Belajar setelah jam 10 malam sebanyak 10 kali",
    icon: "🦉",
    category: "habit",
    points: 100,
    rarity: "uncommon",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Study after 10 PM 10 times"
  },
  {
    id: 11,
    title: "Knowledge Seeker",
    description: "Selesaikan 10 modul",
    icon: "📚",
    category: "milestone",
    points: 500,
    rarity: "legendary",
    unlocked: false,
    unlockedAt: null,
    progress: 30, // 3 dari 10 modul selesai
    requirement: "Complete 10 modules"
  },
  {
    id: 12,
    title: "Speed Runner",
    description: "Selesaikan modul dalam waktu kurang dari 60% estimasi",
    icon: "🚀",
    category: "speed",
    points: 150,
    rarity: "rare",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Complete module in under 60% estimated time"
  },
  {
    id: 13,
    title: "Bookworm",
    description: "Bookmark 5 modul atau lebih",
    icon: "🔖",
    category: "engagement",
    points: 75,
    rarity: "common",
    unlocked: false,
    unlockedAt: null,
    progress: 80, // 4 dari 5 bookmark (Module 1, 2, 5, 9)
    requirement: "Bookmark 5 or more modules"
  },
  {
    id: 14,
    title: "Discussion Starter",
    description: "Buat thread pertama di forum",
    icon: "💬",
    category: "forum",
    points: 50,
    rarity: "common",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Create your first forum thread"
  },
  {
    id: 15,
    title: "Helpful Member",
    description: "Dapatkan 10 helpful marks pada jawaban Anda",
    icon: "🤝",
    category: "forum",
    points: 200,
    rarity: "rare",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Get 10 helpful marks on your answers"
  },
  {
    id: 16,
    title: "Forum Champion",
    description: "Capai reputasi 1000+ di forum",
    icon: "👑",
    category: "forum",
    points: 300,
    rarity: "epic",
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    requirement: "Reach 1000+ reputation in forum"
  }
];

// ============ LEARNING STATS DATA ============
export const learningStats = {
  totalModules: modules.length,
  completedModules: modules.filter(m => m.status === 'completed').length,
  inProgressModules: modules.filter(m => m.status === 'in-progress').length,
  notStartedModules: modules.filter(m => m.status === 'not-started').length,
  totalPoints: achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
  currentStreak: 5, // hari berturut-turut
  longestStreak: 7,
  totalQuizzesTaken: quizzes.filter(q => q.status === 'completed').length, // Total: 8 completed quizzes
  averageQuizScore: Math.round(
    quizzes.filter(q => q.status === 'completed' && q.score)
      .reduce((sum, q) => sum + q.score, 0) / 
    quizzes.filter(q => q.status === 'completed' && q.score).length
  ), // Average dari 8 quiz completed
  totalStudyTime: modules.filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.duration, 0), // dalam menit
};

// ============ WEEKLY PROGRESS DATA (4 minggu terakhir) ============
export const weeklyProgress = [
  { week: 'Week 1', progress: 8, hours: 2.0, modulesCompleted: 1 },  // React completed
  { week: 'Week 2', progress: 17, hours: 2.5, modulesCompleted: 1 }, // Database completed  
  { week: 'Week 3', progress: 25, hours: 2.67, modulesCompleted: 1 }, // Network completed
  { week: 'Week 4', progress: 25, hours: 0, modulesCompleted: 0 }    // No new completion, working on in-progress
];

// ============ STUDY TIME BY CATEGORY ============
export const studyTimeByCategory = [
  { category: 'Programming', hours: 2.0, modules: 1, color: '#6366f1' },  // 120 menit / 60
  { category: 'Database', hours: 2.5, modules: 1, color: '#8b5cf6' },     // 150 menit / 60
  { category: 'Network', hours: 2.67, modules: 1, color: '#ec4899' }      // 160 menit / 60
];

// ============ CUMULATIVE STUDY HOURS (Akumulasi per hari) ============
export const cumulativeStudyHours = [
  { date: '08 Jan', hours: 0 },
  { date: '09 Jan', hours: 2.67 },   // Network completed (160 min)
  { date: '10 Jan', hours: 4.67 },   // React completed (120 min)
  { date: '12 Jan', hours: 7.17 },   // Database completed (150 min)
  { date: '13 Jan', hours: 7.17 },   // No completion
  { date: '14 Jan', hours: 7.17 },   // No completion
  { date: '15 Jan', hours: 7.17 }    // No completion (today, working on in-progress)
];

// ============ SKILL RADAR DATA ============
export const skillRadarData = [
  { skill: 'Programming', score: 75, fullMark: 100 },
  { skill: 'Database', score: 65, fullMark: 100 },
  { skill: 'Network', score: 60, fullMark: 100 },
  { skill: 'Problem Solving', score: 70, fullMark: 100 },
  { skill: 'Communication', score: 55, fullMark: 100 }
];

// ============ INSTRUKTUR DASHBOARD DATA ============
// Mahasiswa Performance Data (integrated with modules & quizzes)
export const mahasiswaPerformance = [
  {
    id: 1,
    nim: "2023001",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@student.ac.id",
    avatar: "AF",
    kelas: "TI-3A",
    modulesCompleted: 8,
    modulesInProgress: 2,
    totalModules: 12,
    completionRate: 67, // percentage
    averageQuizScore: 88,
    totalQuizzesTaken: 15,
    totalStudyTime: 1240, // menit
    lastActive: "2026-01-15T09:30:00",
    status: "on-track", // on-track, at-risk, struggling
    achievements: 8,
    forumActivity: 25,
    needsHelp: false,
    performanceTrend: "up" // up, stable, down
  },
  {
    id: 2,
    nim: "2023002",
    name: "Siti Rahayu",
    email: "siti.rahayu@student.ac.id",
    avatar: "SR",
    kelas: "TI-3A",
    modulesCompleted: 10,
    modulesInProgress: 1,
    totalModules: 12,
    completionRate: 83,
    averageQuizScore: 92,
    totalQuizzesTaken: 18,
    totalStudyTime: 1580,
    lastActive: "2026-01-15T10:15:00",
    status: "on-track",
    achievements: 12,
    forumActivity: 35,
    needsHelp: false,
    performanceTrend: "up"
  },
  {
    id: 3,
    nim: "2023003",
    name: "Budi Santoso",
    email: "budi.santoso@student.ac.id",
    avatar: "BS",
    kelas: "TI-3A",
    modulesCompleted: 5,
    modulesInProgress: 1,
    totalModules: 12,
    completionRate: 42,
    averageQuizScore: 68,
    totalQuizzesTaken: 10,
    totalStudyTime: 680,
    lastActive: "2026-01-13T14:20:00",
    status: "at-risk",
    achievements: 4,
    forumActivity: 8,
    needsHelp: true,
    performanceTrend: "down"
  },
  {
    id: 4,
    nim: "2023004",
    name: "Dewi Lestari",
    email: "dewi.lestari@student.ac.id",
    avatar: "DL",
    kelas: "TI-3A",
    modulesCompleted: 11,
    modulesInProgress: 1,
    totalModules: 12,
    completionRate: 92,
    averageQuizScore: 95,
    totalQuizzesTaken: 20,
    totalStudyTime: 1750,
    lastActive: "2026-01-15T11:00:00",
    status: "on-track",
    achievements: 14,
    forumActivity: 42,
    needsHelp: false,
    performanceTrend: "up"
  },
  {
    id: 5,
    nim: "2023005",
    name: "Rudi Hartono",
    email: "rudi.hartono@student.ac.id",
    avatar: "RH",
    kelas: "TI-3B",
    modulesCompleted: 3,
    modulesInProgress: 2,
    totalModules: 12,
    completionRate: 25,
    averageQuizScore: 62,
    totalQuizzesTaken: 7,
    totalStudyTime: 450,
    lastActive: "2026-01-12T08:45:00",
    status: "struggling",
    achievements: 2,
    forumActivity: 5,
    needsHelp: true,
    performanceTrend: "down"
  },
  {
    id: 6,
    nim: "2023006",
    name: "Maya Putri",
    email: "maya.putri@student.ac.id",
    avatar: "MP",
    kelas: "TI-3B",
    modulesCompleted: 9,
    modulesInProgress: 2,
    totalModules: 12,
    completionRate: 75,
    averageQuizScore: 85,
    totalQuizzesTaken: 16,
    totalStudyTime: 1320,
    lastActive: "2026-01-15T08:20:00",
    status: "on-track",
    achievements: 10,
    forumActivity: 28,
    needsHelp: false,
    performanceTrend: "stable"
  },
  {
    id: 7,
    nim: "2023007",
    name: "Andi Wijaya",
    email: "andi.wijaya@student.ac.id",
    avatar: "AW",
    kelas: "TI-3B",
    modulesCompleted: 6,
    modulesInProgress: 1,
    totalModules: 12,
    completionRate: 50,
    averageQuizScore: 74,
    totalQuizzesTaken: 12,
    totalStudyTime: 820,
    lastActive: "2026-01-14T16:30:00",
    status: "at-risk",
    achievements: 5,
    forumActivity: 12,
    needsHelp: true,
    performanceTrend: "stable"
  },
  {
    id: 8,
    nim: "2023008",
    name: "Linda Susanti",
    email: "linda.susanti@student.ac.id",
    avatar: "LS",
    kelas: "TI-3B",
    modulesCompleted: 7,
    modulesInProgress: 2,
    totalModules: 12,
    completionRate: 58,
    averageQuizScore: 80,
    totalQuizzesTaken: 13,
    totalStudyTime: 950,
    lastActive: "2026-01-15T07:45:00",
    status: "on-track",
    achievements: 7,
    forumActivity: 18,
    needsHelp: false,
    performanceTrend: "up"
  }
];

// Konten/Media Data
export const kontenMedia = [
  {
    id: 1,
    title: "React Fundamentals - Video Tutorial",
    type: "video",
    moduleId: 1,
    uploadDate: "2026-01-05T10:00:00",
    fileSize: "245 MB",
    duration: "45 menit",
    views: 156,
    likes: 98,
    completionRate: 87,
    averageWatchTime: 38, // menit
    engagement: "high", // high, medium, low
    thumbnail: "react-fundamentals.jpg",
    uploadedBy: "Dr. Budi Santoso"
  },
  {
    id: 2,
    title: "Database Design - PDF Slides",
    type: "pdf",
    moduleId: 3,
    uploadDate: "2026-01-03T14:30:00",
    fileSize: "12 MB",
    pages: 45,
    downloads: 142,
    likes: 85,
    engagement: "high",
    thumbnail: "database-slides.pdf",
    uploadedBy: "Dr. Ahmad Fauzi"
  },
  {
    id: 3,
    title: "Network Topology Diagram",
    type: "image",
    moduleId: 5,
    uploadDate: "2026-01-02T09:15:00",
    fileSize: "2.5 MB",
    views: 98,
    likes: 62,
    engagement: "medium",
    thumbnail: "network-topology.png",
    uploadedBy: "Ir. Dewi Lestari"
  },
  {
    id: 4,
    title: "React Hooks Deep Dive",
    type: "video",
    moduleId: 2,
    uploadDate: "2026-01-07T11:20:00",
    fileSize: "380 MB",
    duration: "62 menit",
    views: 134,
    likes: 89,
    completionRate: 72,
    averageWatchTime: 45,
    engagement: "high",
    thumbnail: "react-hooks.jpg",
    uploadedBy: "Prof. Siti Rahayu"
  },
  {
    id: 5,
    title: "SQL Query Examples",
    type: "pdf",
    moduleId: 4,
    uploadDate: "2026-01-04T15:45:00",
    fileSize: "8 MB",
    pages: 28,
    downloads: 67,
    likes: 45,
    engagement: "medium",
    thumbnail: "sql-examples.pdf",
    uploadedBy: "Dr. Ahmad Fauzi"
  },
  {
    id: 6,
    title: "Advanced React Patterns Webinar",
    type: "video",
    moduleId: 10,
    uploadDate: "2026-01-08T16:00:00",
    fileSize: "520 MB",
    duration: "90 menit",
    views: 45,
    likes: 28,
    completionRate: 45,
    averageWatchTime: 40,
    engagement: "low",
    thumbnail: "advanced-react.jpg",
    uploadedBy: "Prof. Siti Rahayu"
  }
];

// Feedback dari Mahasiswa
export const feedbackMahasiswa = [
  {
    id: 1,
    studentId: 2,
    studentName: "Siti Rahayu",
    contentId: 1,
    contentTitle: "React Fundamentals - Video Tutorial",
    rating: 5,
    feedback: "Video sangat jelas dan mudah dipahami. Penjelasan step-by-step sangat membantu!",
    category: "content-quality",
    date: "2026-01-10T14:30:00",
    helpful: 12,
    status: "reviewed"
  },
  {
    id: 2,
    studentId: 1,
    studentName: "Ahmad Fauzi",
    contentId: 2,
    contentTitle: "Database Design - PDF Slides",
    rating: 4,
    feedback: "Materi lengkap, tapi perlu lebih banyak contoh praktis untuk ERD.",
    category: "content-quality",
    date: "2026-01-11T09:15:00",
    helpful: 8,
    status: "reviewed"
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Budi Santoso",
    contentId: 1,
    contentTitle: "React Fundamentals - Video Tutorial",
    rating: 3,
    feedback: "Konten bagus tapi terlalu cepat untuk pemula. Butuh lebih banyak waktu untuk praktik.",
    category: "difficulty",
    date: "2026-01-09T16:45:00",
    helpful: 15,
    status: "pending"
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Dewi Lestari",
    contentId: 4,
    contentTitle: "React Hooks Deep Dive",
    rating: 5,
    feedback: "Penjelasan custom hooks sangat detail. Best video so far!",
    category: "content-quality",
    date: "2026-01-12T11:20:00",
    helpful: 10,
    status: "reviewed"
  },
  {
    id: 5,
    studentId: 5,
    studentName: "Rudi Hartono",
    contentId: 3,
    contentTitle: "Network Topology Diagram",
    rating: 4,
    feedback: "Diagram jelas, tapi perlu penjelasan lebih detail untuk setiap komponen.",
    category: "content-quality",
    date: "2026-01-08T13:50:00",
    helpful: 6,
    status: "reviewed"
  },
  {
    id: 6,
    studentId: 6,
    studentName: "Maya Putri",
    contentId: 2,
    contentTitle: "Database Design - PDF Slides",
    rating: 5,
    feedback: "Slides sangat terstruktur dan mudah dipelajari. Perfect!",
    category: "content-quality",
    date: "2026-01-13T10:30:00",
    helpful: 9,
    status: "reviewed"
  },
  {
    id: 7,
    studentId: 7,
    studentName: "Andi Wijaya",
    contentId: 6,
    contentTitle: "Advanced React Patterns Webinar",
    rating: 2,
    feedback: "Terlalu advanced untuk level saya saat ini. Mungkin perlu prerequisite yang lebih jelas.",
    category: "difficulty",
    date: "2026-01-14T15:20:00",
    helpful: 11,
    status: "pending"
  }
];

// Class Analytics Summary
export const classAnalytics = {
  totalStudents: mahasiswaPerformance.length,
  onTrackStudents: mahasiswaPerformance.filter(s => s.status === 'on-track').length,
  atRiskStudents: mahasiswaPerformance.filter(s => s.status === 'at-risk').length,
  strugglingStudents: mahasiswaPerformance.filter(s => s.status === 'struggling').length,
  averageClassScore: Math.round(
    mahasiswaPerformance.reduce((sum, s) => sum + s.averageQuizScore, 0) / mahasiswaPerformance.length
  ),
  averageCompletionRate: Math.round(
    mahasiswaPerformance.reduce((sum, s) => sum + s.completionRate, 0) / mahasiswaPerformance.length
  ),
  totalStudyHours: Math.round(
    mahasiswaPerformance.reduce((sum, s) => sum + s.totalStudyTime, 0) / 60
  ),
  averageStudyTimePerStudent: Math.round(
    mahasiswaPerformance.reduce((sum, s) => sum + s.totalStudyTime, 0) / mahasiswaPerformance.length / 60
  ),
  studentsNeedingHelp: mahasiswaPerformance.filter(s => s.needsHelp).length,
  totalContentUploaded: kontenMedia.length,
  highEngagementContent: kontenMedia.filter(c => c.engagement === 'high').length,
  totalFeedback: feedbackMahasiswa.length,
  averageContentRating: (
    feedbackMahasiswa.reduce((sum, f) => sum + f.rating, 0) / feedbackMahasiswa.length
  ).toFixed(1)
};

// Weekly Student Activity
export const weeklyStudentActivity = [
  { week: 'Week 1', activeStudents: 6, avgStudyTime: 8.5, quizzesCompleted: 12 },
  { week: 'Week 2', activeStudents: 7, avgStudyTime: 10.2, quizzesCompleted: 15 },
  { week: 'Week 3', activeStudents: 8, avgStudyTime: 11.8, quizzesCompleted: 18 },
  { week: 'Week 4', activeStudents: 7, avgStudyTime: 9.6, quizzesCompleted: 14 }
];

// Performance Distribution
export const performanceDistribution = [
  { range: '90-100', count: 2, label: 'Excellent' },
  { range: '80-89', count: 3, label: 'Good' },
  { range: '70-79', count: 2, label: 'Average' },
  { range: '60-69', count: 1, label: 'Below Average' },
  { range: '0-59', count: 0, label: 'Poor' }
];

// ============ HELPER FUNCTIONS ============
export const getModuleById = (id) => modules.find(m => m.id === id);
export const getQuizzesByModuleId = (moduleId) => quizzes.filter(q => q.moduleId === moduleId);
export const getAchievementsByCategory = (category) => achievements.filter(a => a.category === category);
export const getBookmarkedModules = () => modules.filter(m => m.bookmarked);
export const getLastAccessedModule = () => modules
  .filter(m => m.lastAccessed)
  .sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed))[0];
export const getRecommendedModule = () => modules.find(m => m.status === 'not-started');
export const getMahasiswaById = (id) => mahasiswaPerformance.find(m => m.id === id);
export const getKontenByModuleId = (moduleId) => kontenMedia.filter(k => k.moduleId === moduleId);
export const getFeedbackByContentId = (contentId) => feedbackMahasiswa.filter(f => f.contentId === contentId);
