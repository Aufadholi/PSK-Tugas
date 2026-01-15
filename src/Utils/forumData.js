// Forum Data untuk Aplikasi Belajar Pintar
// Data ini terintegrasi dengan modules dari dummyData.js

// ============ FORUM CATEGORIES (Based on Modules) ============
export const forumCategories = [
  {
    id: 1,
    name: "Programming",
    description: "Diskusi seputar pemrograman dan development",
    icon: "💻",
    color: "indigo",
    threadCount: 5,
    modules: [1, 2, 7, 10, 11] // Module IDs from dummyData
  },
  {
    id: 2,
    name: "Database",
    description: "Diskusi tentang database dan pengelolaan data",
    icon: "🗄️",
    color: "purple",
    threadCount: 2,
    modules: [3, 4, 8]
  },
  {
    id: 3,
    name: "Network",
    description: "Diskusi jaringan komputer dan keamanan",
    icon: "🌐",
    color: "blue",
    threadCount: 2,
    modules: [5, 6, 9, 12]
  },
  {
    id: 4,
    name: "General",
    description: "Diskusi umum dan tanya jawab",
    icon: "💬",
    color: "gray",
    threadCount: 2,
    modules: []
  }
];

// ============ FORUM TAGS ============
export const forumTags = [
  // Programming Tags
  { id: 1, name: "React", color: "cyan", category: 1 },
  { id: 2, name: "Hooks", color: "blue", category: 1 },
  { id: 3, name: "State Management", color: "indigo", category: 1 },
  { id: 4, name: "REST API", color: "green", category: 1 },
  { id: 5, name: "GraphQL", color: "pink", category: 1 },
  { id: 6, name: "JavaScript", color: "yellow", category: 1 },
  
  // Database Tags
  { id: 7, name: "SQL", color: "orange", category: 2 },
  { id: 8, name: "NoSQL", color: "red", category: 2 },
  { id: 9, name: "Normalization", color: "purple", category: 2 },
  { id: 10, name: "MongoDB", color: "green", category: 2 },
  
  // Network Tags
  { id: 11, name: "TCP/IP", color: "blue", category: 3 },
  { id: 12, name: "Security", color: "red", category: 3 },
  { id: 13, name: "OSI Model", color: "indigo", category: 3 },
  { id: 14, name: "Routing", color: "cyan", category: 3 },
  
  // General Tags
  { id: 15, name: "Pertanyaan", color: "gray", category: 4 },
  { id: 16, name: "Tips", color: "green", category: 4 },
  { id: 17, name: "Tutorial", color: "blue", category: 4 },
  { id: 18, name: "Bug", color: "red", category: 4 }
];

// ============ FORUM USERS (with Reputation) ============
export const forumUsers = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "BS",
    reputation: 2000,
    badge: "Expert",
    badgeColor: "purple",
    role: "dosen",
    totalPosts: 45,
    totalReplies: 120,
    helpfulAnswers: 38
  },
  {
    id: 2,
    name: "Siti Rahayu",
    avatar: "SR",
    reputation: 1445,
    badge: "Expert",
    badgeColor: "purple",
    role: "dosen",
    totalPosts: 32,
    totalReplies: 85,
    helpfulAnswers: 28
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    avatar: "AF",
    reputation: 1155,
    badge: "Expert",
    badgeColor: "purple",
    role: "mahasiswa",
    totalPosts: 28,
    totalReplies: 65,
    helpfulAnswers: 22
  },
  {
    id: 4,
    name: "Dewi Lestari",
    avatar: "DL",
    reputation: 1730,
    badge: "Expert",
    badgeColor: "purple",
    role: "dosen",
    totalPosts: 38,
    totalReplies: 95,
    helpfulAnswers: 35
  },
  {
    id: 5,
    name: "Rudi Hartono",
    avatar: "RH",
    reputation: 765,
    badge: "Advanced",
    badgeColor: "blue",
    role: "mahasiswa",
    totalPosts: 18,
    totalReplies: 42,
    helpfulAnswers: 15
  },
  {
    id: 6,
    name: "Maya Putri",
    avatar: "MP",
    reputation: 1390,
    badge: "Expert",
    badgeColor: "purple",
    role: "mahasiswa",
    totalPosts: 25,
    totalReplies: 78,
    helpfulAnswers: 30
  },
  {
    id: 7,
    name: "Andi Wijaya",
    avatar: "AW",
    reputation: 460,
    badge: "Intermediate",
    badgeColor: "green",
    role: "mahasiswa",
    totalPosts: 12,
    totalReplies: 28,
    helpfulAnswers: 8
  },
  {
    id: 8,
    name: "Current User",
    avatar: "CU",
    reputation: 200,
    badge: "Beginner",
    badgeColor: "gray",
    role: "mahasiswa",
    totalPosts: 5,
    totalReplies: 15,
    helpfulAnswers: 3
  }
];

// ============ FORUM THREADS ============
export const forumThreads = [
  {
    id: 1,
    title: "Cara menggunakan useState dengan object?",
    content: "Saya bingung bagaimana cara update object state menggunakan useState. Apakah harus spread operator setiap kali update?\n\nContoh:\n```javascript\nconst [user, setUser] = useState({name: '', email: ''});\n```\n\nBagaimana best practice-nya?",
    author: forumUsers[6], // Andi Wijaya
    categoryId: 1,
    tags: [1, 2, 3], // React, Hooks, State Management
    views: 245,
    replies: 8,
    votes: 12,
    isPinned: true,
    isSolved: true,
    createdAt: "2026-01-14T09:30:00",
    updatedAt: "2026-01-15T08:20:00",
    solvedBy: 1, // Budi Santoso
    moduleId: 2
  },
  {
    id: 2,
    title: "Database Normalization: Kapan perlu denormalisasi?",
    content: "Saya sedang belajar normalisasi database dan sudah paham 1NF sampai 3NF. Tapi saya dengar ada kasus tertentu yang memerlukan denormalisasi untuk performance.\n\nKapan kita perlu denormalisasi? Dan apa trade-off-nya?",
    author: forumUsers[4], // Rudi Hartono
    categoryId: 2,
    tags: [7, 9], // SQL, Normalization
    views: 189,
    replies: 2,
    votes: 8,
    isPinned: false,
    isSolved: true,
    createdAt: "2026-01-13T14:15:00",
    updatedAt: "2026-01-14T10:30:00",
    solvedBy: 2, // Siti Rahayu
    moduleId: 3
  },
  {
    id: 3,
    title: "Perbedaan TCP dan UDP dalam praktik",
    content: "Saya sudah baca teorinya tapi masih belum clear kapan harus pakai TCP vs UDP. Bisa kasih contoh real-world use case?\n\nMisalnya untuk video streaming lebih baik yang mana?",
    author: forumUsers[6], // Andi Wijaya
    categoryId: 3,
    tags: [11, 13], // TCP/IP, OSI Model
    views: 312,
    replies: 2,
    votes: 15,
    isPinned: false,
    isSolved: true,
    createdAt: "2026-01-12T11:20:00",
    updatedAt: "2026-01-14T15:45:00",
    solvedBy: 3, // Dewi Lestari
    moduleId: 6
  },
  {
    id: 4,
    title: "useEffect cleanup function - kapan dijalankan?",
    content: "Saya masih bingung dengan cleanup function di useEffect. Apakah cleanup dijalankan setiap kali component re-render atau hanya saat unmount?\n\n```javascript\nuseEffect(() => {\n  // setup\n  return () => {\n    // cleanup - kapan ini dijalankan?\n  };\n}, []);\n```",
    author: forumUsers[5], // Maya Putri
    categoryId: 1,
    tags: [1, 2], // React, Hooks
    views: 178,
    replies: 2,
    votes: 9,
    isPinned: false,
    isSolved: false,
    createdAt: "2026-01-15T07:10:00",
    updatedAt: "2026-01-15T09:15:00",
    solvedBy: null,
    moduleId: 2
  },
  {
    id: 5,
    title: "REST API vs GraphQL - mana yang lebih baik?",
    content: "Saya sedang design backend untuk project akhir. Bingung mau pakai REST API atau GraphQL.\n\nApa kelebihan dan kekurangan masing-masing? Dan untuk project skala kecil-menengah lebih recommended yang mana?",
    author: forumUsers[2], // Ahmad Fauzi
    categoryId: 1,
    tags: [4, 5], // REST API, GraphQL
    views: 425,
    replies: 1,
    votes: 18,
    isPinned: true,
    isSolved: false,
    createdAt: "2026-01-11T13:45:00",
    updatedAt: "2026-01-15T08:30:00",
    solvedBy: null,
    moduleId: 7
  },
  {
    id: 6,
    title: "MongoDB aggregation pipeline untuk join data",
    content: "Gimana cara join data dari multiple collections di MongoDB? Saya sudah coba $lookup tapi hasilnya tidak sesuai ekspektasi.\n\nAda yang bisa bantu explain aggregation pipeline dengan contoh sederhana?",
    author: forumUsers[4], // Rudi Hartono
    categoryId: 2,
    tags: [8, 10], // NoSQL, MongoDB
    views: 156,
    replies: 0,
    votes: 6,
    isPinned: false,
    isSolved: false,
    createdAt: "2026-01-14T16:20:00",
    updatedAt: "2026-01-15T07:50:00",
    solvedBy: null,
    moduleId: 8
  },
  {
    id: 7,
    title: "Network security: Enkripsi symmetric vs asymmetric",
    content: "Bisa tolong jelaskan perbedaan enkripsi symmetric dan asymmetric?\n\nDan kapan kita pakai masing-masing? Apakah HTTPS pakai keduanya?",
    author: forumUsers[6], // Andi Wijaya
    categoryId: 3,
    tags: [12], // Security
    views: 203,
    replies: 1,
    votes: 11,
    isPinned: false,
    isSolved: true,
    createdAt: "2026-01-13T10:30:00",
    updatedAt: "2026-01-14T14:20:00",
    solvedBy: 3, // Dewi Lestari
    moduleId: 9
  },
  {
    id: 8,
    title: "Tips belajar programming untuk pemula",
    content: "Saya baru mulai belajar programming. Ada tips atau resource yang recommended untuk pemula?\n\nSekarang saya lagi fokus ke JavaScript dan React.",
    author: forumUsers[6], // Andi Wijaya
    categoryId: 4,
    tags: [15, 16, 6], // Pertanyaan, Tips, JavaScript
    views: 567,
    replies: 2,
    votes: 22,
    isPinned: false,
    isSolved: false,
    createdAt: "2026-01-10T08:15:00",
    updatedAt: "2026-01-15T09:00:00",
    solvedBy: null,
    moduleId: null
  },
  {
    id: 9,
    title: "Bug: Quiz tidak auto-save setelah 5 menit",
    content: "Saya mengerjakan quiz React Fundamentals tadi, tapi setelah 5 menit quiz tidak auto-save. Ini bug atau gimana ya?\n\nAda yang mengalami masalah yang sama?",
    author: forumUsers[4], // Rudi Hartono
    categoryId: 4,
    tags: [18], // Bug
    views: 89,
    replies: 0,
    votes: 2,
    isPinned: false,
    isSolved: false,
    createdAt: "2026-01-15T06:45:00",
    updatedAt: "2026-01-15T08:10:00",
    solvedBy: null,
    moduleId: null
  },
  {
    id: 10,
    title: "Custom hooks: Kapan harus membuat custom hook?",
    content: "Saya sering lihat code yang pakai custom hooks tapi masih bingung kapan sebaiknya membuat custom hook sendiri.\n\nApa kriteria atau best practice untuk decide kapan perlu extract logic ke custom hook?",
    author: forumUsers[5], // Maya Putri
    categoryId: 1,
    tags: [1, 2], // React, Hooks
    views: 198,
    replies: 1,
    votes: 10,
    isPinned: false,
    isSolved: true,
    createdAt: "2026-01-12T15:30:00",
    updatedAt: "2026-01-13T11:20:00",
    solvedBy: 1, // Budi Santoso
    moduleId: 2
  }
];

// ============ FORUM REPLIES (Nested) ============
export const forumReplies = [
  // Thread 1 Replies
  {
    id: 1,
    threadId: 1,
    content: "Ya betul, untuk update object state kamu harus pakai spread operator. Ini karena React menggunakan shallow comparison untuk detect changes.\n\nContoh yang benar:\n```javascript\nsetUser(prev => ({...prev, name: 'John'}));\n```\n\nJangan langsung mutate object-nya ya!",
    author: forumUsers[0], // Budi Santoso
    votes: 15,
    isHelpful: true,
    isBestAnswer: true,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-14T10:15:00",
    updatedAt: "2026-01-14T10:15:00"
  },
  {
    id: 2,
    threadId: 1,
    content: "@Budi Santoso terima kasih penjelasannya! Kalau untuk nested object gimana? Misalnya:\n```javascript\nconst [user, setUser] = useState({\n  profile: { name: '', age: 0 }\n});\n```",
    author: forumUsers[6], // Andi Wijaya
    votes: 3,
    isHelpful: false,
    isBestAnswer: false,
    parentReplyId: 1,
    mentions: [1],
    createdAt: "2026-01-14T11:30:00",
    updatedAt: "2026-01-14T11:30:00"
  },
  {
    id: 3,
    threadId: 1,
    content: "Untuk nested object, kamu perlu spread di multiple level:\n```javascript\nsetUser(prev => ({\n  ...prev,\n  profile: {\n    ...prev.profile,\n    name: 'John'\n  }\n}));\n```\n\nAtau lebih baik pakai library seperti Immer untuk simplify.",
    author: forumUsers[0], // Budi Santoso
    votes: 8,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: 2,
    mentions: [],
    createdAt: "2026-01-14T12:00:00",
    updatedAt: "2026-01-14T12:00:00"
  },
  {
    id: 4,
    threadId: 1,
    content: "Saya biasanya pakai useReducer untuk complex state seperti ini. Lebih clean dan mudah di-maintain.",
    author: forumUsers[5], // Maya Putri
    votes: 5,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-14T13:20:00",
    updatedAt: "2026-01-14T13:20:00"
  },
  {
    id: 5,
    threadId: 1,
    content: "@Maya Putri betul, useReducer memang lebih suitable untuk complex state. Good point!",
    author: forumUsers[0], // Budi Santoso
    votes: 2,
    isHelpful: false,
    isBestAnswer: false,
    parentReplyId: 4,
    mentions: [5],
    createdAt: "2026-01-15T08:20:00",
    updatedAt: "2026-01-15T08:20:00"
  },

  // Thread 2 Replies
  {
    id: 6,
    threadId: 2,
    content: "Denormalisasi biasanya dilakukan untuk improve read performance, terutama untuk query yang sering join banyak tabel.\n\nTrade-off:\n- ✅ Faster read\n- ❌ Slower write (harus update multiple places)\n- ❌ Data redundancy\n- ❌ Risk of inconsistency\n\nUntuk web app dengan read-heavy workload, denormalisasi bisa worth it.",
    author: forumUsers[1], // Siti Rahayu
    votes: 12,
    isHelpful: true,
    isBestAnswer: true,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-13T15:30:00",
    updatedAt: "2026-01-13T15:30:00"
  },
  {
    id: 7,
    threadId: 2,
    content: "Contoh real case: E-commerce product listing. Daripada join dari product, category, brand tables setiap kali query, lebih baik store category name dan brand name langsung di product table.",
    author: forumUsers[2], // Ahmad Fauzi
    votes: 7,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-13T16:45:00",
    updatedAt: "2026-01-13T16:45:00"
  },

  // Thread 3 Replies
  {
    id: 8,
    threadId: 3,
    content: "TCP (Transmission Control Protocol):\n- Connection-oriented\n- Reliable, guaranteed delivery\n- Slower karena ada overhead\n- Use case: HTTP, Email, File transfer\n\nUDP (User Datagram Protocol):\n- Connectionless\n- Unreliable, no guarantee\n- Faster, low latency\n- Use case: Video streaming, Gaming, DNS\n\nUntuk video streaming, biasanya pakai UDP karena prioritas ke speed. Kehilangan beberapa packet masih acceptable.",
    author: forumUsers[3], // Dewi Lestari
    votes: 18,
    isHelpful: true,
    isBestAnswer: true,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-12T14:30:00",
    updatedAt: "2026-01-12T14:30:00"
  },
  {
    id: 9,
    threadId: 3,
    content: "Tambahan: Zoom dan video call apps biasanya pakai UDP untuk real-time communication. Kalau ada packet loss, lebih baik skip daripada delay.",
    author: forumUsers[5], // Maya Putri
    votes: 6,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-12T16:20:00",
    updatedAt: "2026-01-12T16:20:00"
  },

  // Thread 4 Replies
  {
    id: 10,
    threadId: 4,
    content: "Cleanup function dijalankan dalam 2 kondisi:\n1. Sebelum effect run lagi (kalau dependencies berubah)\n2. Saat component unmount\n\nJadi kalau dependencies array kosong [], cleanup hanya run saat unmount. Tapi kalau ada dependency, cleanup run setiap kali dependency berubah sebelum effect run lagi.",
    author: forumUsers[0], // Budi Santoso
    votes: 8,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-15T08:00:00",
    updatedAt: "2026-01-15T08:00:00"
  },
  {
    id: 11,
    threadId: 4,
    content: "Contoh praktis:\n```javascript\nuseEffect(() => {\n  const timer = setInterval(() => console.log('tick'), 1000);\n  \n  return () => clearInterval(timer); // cleanup\n}, []);\n```\n\nCleanup ini penting untuk avoid memory leaks!",
    author: forumUsers[5], // Maya Putri
    votes: 5,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-15T09:15:00",
    updatedAt: "2026-01-15T09:15:00"
  },

  // Thread 5 Replies
  {
    id: 12,
    threadId: 5,
    content: "REST API:\n✅ Simple, easy to learn\n✅ Cacheable\n✅ Stateless\n❌ Over-fetching/under-fetching data\n❌ Multiple endpoints\n\nGraphQL:\n✅ Get exactly what you need\n✅ Single endpoint\n✅ Strong typing\n❌ Learning curve\n❌ Caching more complex\n\nUntuk project kecil-menengah, REST sudah cukup. GraphQL worth it kalau data requirements complex.",
    author: forumUsers[0], // Budi Santoso
    votes: 14,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-11T15:20:00",
    updatedAt: "2026-01-11T15:20:00"
  },

  // Thread 7 Replies
  {
    id: 13,
    threadId: 7,
    content: "Symmetric encryption:\n- Same key untuk encrypt & decrypt\n- Faster\n- Contoh: AES, DES\n- Use case: Encrypt large data\n\nAsymmetric encryption:\n- Public key (encrypt) & Private key (decrypt)\n- Slower\n- Contoh: RSA\n- Use case: Digital signatures, key exchange\n\nHTTPS pakai keduanya! Asymmetric untuk exchange symmetric key, lalu symmetric untuk encrypt data.",
    author: forumUsers[3], // Dewi Lestari
    votes: 16,
    isHelpful: true,
    isBestAnswer: true,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-13T12:45:00",
    updatedAt: "2026-01-13T12:45:00"
  },

  // Thread 8 Replies
  {
    id: 14,
    threadId: 8,
    content: "Resource yang saya recommend:\n\n1. JavaScript:\n   - javascript.info (gratis, lengkap)\n   - Eloquent JavaScript (ebook gratis)\n   \n2. React:\n   - React docs (official)\n   - FreeCodeCamp React course\n   - Scrimba interactive tutorials\n\nTips: Practice, practice, practice! Build small projects.",
    author: forumUsers[0], // Budi Santoso
    votes: 18,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-10T10:30:00",
    updatedAt: "2026-01-10T10:30:00"
  },
  {
    id: 15,
    threadId: 8,
    content: "@Budi Santoso setuju! Tambahan: jangan langsung loncat ke framework. Kuasai JavaScript fundamentals dulu baru ke React.",
    author: forumUsers[5], // Maya Putri
    votes: 9,
    isHelpful: true,
    isBestAnswer: false,
    parentReplyId: 14,
    mentions: [1],
    createdAt: "2026-01-10T14:15:00",
    updatedAt: "2026-01-10T14:15:00"
  },

  // Thread 10 Replies
  {
    id: 16,
    threadId: 10,
    content: "Buat custom hook kalau:\n\n1. Logic yang sama dipakai di multiple components\n2. Logic kompleks yang bikin component bloated\n3. Abstraction untuk third-party library\n\nContoh:\n```javascript\n// useForm.js\nfunction useForm(initialValues) {\n  const [values, setValues] = useState(initialValues);\n  \n  const handleChange = (e) => {\n    setValues({...values, [e.target.name]: e.target.value});\n  };\n  \n  return { values, handleChange };\n}\n```\n\nSekarang bisa dipakai di banyak form components!",
    author: forumUsers[0], // Budi Santoso
    votes: 11,
    isHelpful: true,
    isBestAnswer: true,
    parentReplyId: null,
    mentions: [],
    createdAt: "2026-01-12T17:00:00",
    updatedAt: "2026-01-12T17:00:00"
  }
];

// ============ HELPER FUNCTIONS ============
export const getThreadById = (id) => forumThreads.find(t => t.id === id);
export const getThreadsByCategory = (categoryId) => forumThreads.filter(t => t.categoryId === categoryId);
export const getThreadsByTag = (tagId) => forumThreads.filter(t => t.tags.includes(tagId));
export const getRepliesByThread = (threadId) => forumReplies.filter(r => r.threadId === threadId);
export const getUserById = (id) => forumUsers.find(u => u.id === id);
export const getCategoryById = (id) => forumCategories.find(c => c.id === id);
export const getTagById = (id) => forumTags.find(t => t.id === id);

// Get top level replies (no parent)
export const getTopLevelReplies = (threadId) => 
  forumReplies.filter(r => r.threadId === threadId && r.parentReplyId === null);

// Get nested replies for a reply
export const getNestedReplies = (replyId) => 
  forumReplies.filter(r => r.parentReplyId === replyId);

// Search threads
export const searchThreads = (query) => {
  const lowerQuery = query.toLowerCase();
  return forumThreads.filter(t => 
    t.title.toLowerCase().includes(lowerQuery) ||
    t.content.toLowerCase().includes(lowerQuery)
  );
};

// Sort threads
export const sortThreads = (threads, sortBy) => {
  switch (sortBy) {
    case 'popular':
      return [...threads].sort((a, b) => b.votes - a.votes);
    case 'newest':
      return [...threads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'oldest':
      return [...threads].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'solved':
      return [...threads].sort((a, b) => (b.isSolved ? 1 : 0) - (a.isSolved ? 1 : 0));
    case 'unsolved':
      return [...threads].sort((a, b) => (a.isSolved ? 1 : 0) - (b.isSolved ? 1 : 0));
    case 'mostReplies':
      return [...threads].sort((a, b) => b.replies - a.replies);
    default:
      return threads;
  }
};

// Get current user (mock)
export const getCurrentUser = () => forumUsers[7]; // Current User

// Calculate reputation from activity
export const calculateReputation = (user) => {
  return (user.totalPosts * 10) + (user.helpfulAnswers * 25) + (user.totalReplies * 5);
};

// Get badge based on reputation
export const getBadgeByReputation = (reputation) => {
  if (reputation >= 1000) return { name: 'Expert', color: 'purple' };
  if (reputation >= 700) return { name: 'Advanced', color: 'blue' };
  if (reputation >= 400) return { name: 'Intermediate', color: 'green' };
  return { name: 'Beginner', color: 'gray' };
};
