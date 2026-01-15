// Quiz Questions Data untuk berbagai quiz
// Setiap quiz memiliki questions dengan berbagai tipe
// 
// IMPORTANT: Data ini harus sinkron dengan quizzes di dummyData.js
// Quiz yang memiliki detail soal lengkap:
// - Quiz ID 1: React Fundamentals - Components & Props (moduleId: 1)
// - Quiz ID 2: React State Management (moduleId: 1)
// - Quiz ID 3: useState Hook (moduleId: 2)
//
// Quiz lainnya di dummyData.js tidak memiliki detail soal (untuk demo purposes)

export const quizQuestions = {
  // Quiz ID 1 - React Fundamentals
  1: {
    id: 1,
    title: "Quiz: React Fundamentals - Components & Props",
    moduleId: 1,
    duration: 15, // menit
    passingScore: 70,
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Apa yang dimaksud dengan Component dalam React?',
        options: [
          'Fungsi atau class yang mengembalikan elemen React',
          'File CSS untuk styling',
          'Database connection',
          'Server-side routing'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Component adalah fungsi atau class JavaScript yang mengembalikan elemen React (JSX).'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Bagaimana cara passing data dari parent ke child component?',
        options: [
          'Menggunakan state',
          'Menggunakan props',
          'Menggunakan context',
          'Menggunakan ref'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Props digunakan untuk passing data dari parent component ke child component.'
      },
      {
        id: 3,
        type: 'true-false',
        question: 'Props dalam React bersifat mutable (dapat diubah)?',
        correctAnswer: false,
        points: 10,
        explanation: 'Props bersifat read-only atau immutable. Child component tidak boleh mengubah props yang diterima.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Apa extension file yang umum digunakan untuk React component?',
        options: [
          '.js atau .jsx',
          '.html',
          '.css',
          '.react'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'React component biasanya menggunakan extension .js atau .jsx untuk JSX syntax.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Apa perbedaan utama antara Functional dan Class Component?',
        options: [
          'Functional component lebih sederhana dan menggunakan hooks',
          'Class component lebih cepat',
          'Tidak ada perbedaan',
          'Functional component tidak bisa memiliki state'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'Functional component lebih sederhana, menggunakan hooks untuk state dan lifecycle, sedangkan class component menggunakan this.state dan lifecycle methods.'
      },
      {
        id: 6,
        type: 'true-false',
        question: 'JSX adalah JavaScript syntax extension?',
        correctAnswer: true,
        points: 10,
        explanation: 'JSX adalah syntax extension untuk JavaScript yang memungkinkan penulisan HTML-like code dalam JavaScript.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'Bagaimana cara membuat list dari array di React?',
        options: [
          'Menggunakan for loop',
          'Menggunakan map() method',
          'Menggunakan forEach()',
          'Tidak bisa membuat list'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Method map() digunakan untuk membuat list element dari array di React.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'Apa fungsi dari key prop saat rendering list?',
        options: [
          'Untuk styling',
          'Untuk identifikasi unique element',
          'Untuk routing',
          'Tidak ada fungsi'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Key prop membantu React mengidentifikasi item mana yang berubah, ditambah, atau dihapus dari list.'
      },
      {
        id: 9,
        type: 'true-false',
        question: 'React component harus selalu mengembalikan satu root element?',
        correctAnswer: true,
        points: 10,
        explanation: 'Setiap React component harus return satu root element, bisa menggunakan <div>, Fragment, atau element lain.'
      },
      {
        id: 10,
        type: 'essay',
        question: 'Jelaskan secara singkat apa itu Virtual DOM dan kenapa React menggunakannya?',
        correctAnswer: null, // essay tidak ada correct answer otomatis
        points: 10,
        explanation: 'Virtual DOM adalah representasi lightweight dari real DOM. React menggunakannya untuk meningkatkan performance dengan hanya update bagian yang berubah, bukan seluruh DOM.'
      }
    ]
  },

  // Quiz ID 2 - React State Management
  2: {
    id: 2,
    title: "Quiz: React State Management",
    moduleId: 1,
    duration: 20,
    passingScore: 70,
    totalQuestions: 15,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Apa yang dimaksud dengan State dalam React?',
        options: [
          'Data yang tidak pernah berubah',
          'Data yang dapat berubah dan memicu re-render',
          'CSS styling',
          'Server data'
        ],
        correctAnswer: 1,
        points: 7,
        explanation: 'State adalah data yang dapat berubah dalam component dan memicu re-render ketika diupdate.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'State hanya bisa digunakan di Class Component?',
        correctAnswer: false,
        points: 7,
        explanation: 'Dengan hooks (useState), functional component juga bisa menggunakan state.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Bagaimana cara update state yang benar?',
        options: [
          'Langsung assign nilai baru: state = newValue',
          'Menggunakan setState() atau setter function',
          'Menggunakan props',
          'Tidak bisa diupdate'
        ],
        correctAnswer: 1,
        points: 7,
        explanation: 'State harus diupdate menggunakan setState() (class) atau setter function dari useState (functional).'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Apa yang terjadi ketika state di-update?',
        options: [
          'Tidak ada yang terjadi',
          'Component akan re-render',
          'Application restart',
          'Browser refresh'
        ],
        correctAnswer: 1,
        points: 7,
        explanation: 'Ketika state berubah, React akan re-render component tersebut untuk reflect perubahan.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'setState() di React bersifat synchronous?',
        correctAnswer: false,
        points: 7,
        explanation: 'setState() bersifat asynchronous untuk performance optimization.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'Dimana sebaiknya initial state didefinisikan di functional component?',
        options: [
          'Di luar component',
          'Di dalam useState() call',
          'Di props',
          'Di render method'
        ],
        correctAnswer: 1,
        points: 6,
        explanation: 'Initial state didefinisikan sebagai argument di useState() hook.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'Bagaimana cara update state berdasarkan state sebelumnya?',
        options: [
          'Langsung assign nilai baru',
          'Menggunakan callback function di setState',
          'Menggunakan props',
          'Tidak bisa'
        ],
        correctAnswer: 1,
        points: 6,
        explanation: 'Gunakan callback function: setState(prevState => prevState + 1) untuk update berdasarkan nilai sebelumnya.'
      },
      {
        id: 8,
        type: 'true-false',
        question: 'State dapat di-share langsung antar sibling components?',
        correctAnswer: false,
        points: 6,
        explanation: 'State tidak bisa langsung di-share. Harus di-lift up ke parent component atau gunakan Context/Redux.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'Apa itu lifting state up?',
        options: [
          'Menghapus state',
          'Memindahkan state ke parent component',
          'Membuat state global',
          'Menyimpan state di localStorage'
        ],
        correctAnswer: 1,
        points: 6,
        explanation: 'Lifting state up adalah memindahkan state ke common parent untuk sharing data antar child components.'
      },
      {
        id: 10,
        type: 'multiple-choice',
        question: 'Hook apa yang digunakan untuk state di functional component?',
        options: [
          'useEffect',
          'useState',
          'useContext',
          'useRef'
        ],
        correctAnswer: 1,
        points: 6,
        explanation: 'useState adalah hook untuk menambahkan state ke functional component.'
      },
      {
        id: 11,
        type: 'true-false',
        question: 'Kita bisa memiliki multiple state variables dalam satu component?',
        correctAnswer: true,
        points: 6,
        explanation: 'Ya, kita bisa call useState() berkali-kali untuk multiple state variables.'
      },
      {
        id: 12,
        type: 'multiple-choice',
        question: 'Apa yang dikembalikan oleh useState()?',
        options: [
          'Hanya state value',
          'Array dengan [state, setState]',
          'Object dengan state properties',
          'Function'
        ],
        correctAnswer: 1,
        points: 6,
        explanation: 'useState() return array dengan dua element: current state dan setter function.'
      },
      {
        id: 13,
        type: 'true-false',
        question: 'State update akan langsung terlihat setelah setState() dipanggil?',
        correctAnswer: false,
        points: 6,
        explanation: 'Tidak, setState() asynchronous. State baru baru terlihat setelah re-render.'
      },
      {
        id: 14,
        type: 'multiple-choice',
        question: 'Kapan sebaiknya menggunakan state vs props?',
        options: [
          'Selalu gunakan state',
          'State untuk data yang berubah, props untuk data dari parent',
          'Props untuk semua data',
          'Tidak ada bedanya'
        ],
        correctAnswer: 1,
        points: 7,
        explanation: 'State untuk data internal yang berubah, props untuk data yang diterima dari parent.'
      },
      {
        id: 15,
        type: 'essay',
        question: 'Jelaskan perbedaan antara controlled dan uncontrolled components dalam context state management!',
        correctAnswer: null,
        points: 7,
        explanation: 'Controlled component: form data dihandle oleh React state. Uncontrolled: form data dihandle oleh DOM sendiri menggunakan ref.'
      }
    ]
  },

  // Quiz ID 3 - useState Hook
  3: {
    id: 3,
    title: "Quiz: useState Hook",
    moduleId: 2,
    duration: 15,
    passingScore: 70,
    totalQuestions: 10,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'Syntax yang benar untuk useState adalah?',
        options: [
          'const [state] = useState(0)',
          'const [state, setState] = useState(0)',
          'useState(state, setState, 0)',
          'const state = useState(0)'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Syntax: const [state, setState] = useState(initialValue) menggunakan array destructuring.'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'useState dapat menerima function sebagai initial value?',
        correctAnswer: true,
        points: 10,
        explanation: 'Ya, untuk lazy initialization: useState(() => expensiveComputation())'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Apa kegunaan lazy initialization di useState?',
        options: [
          'Membuat state lambat',
          'Menghindari expensive computation di setiap render',
          'Menunda update state',
          'Tidak ada gunanya'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Lazy initialization hanya run sekali di initial render, menghindari expensive computation berulang.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'Bagaimana update object state dengan benar?',
        options: [
          'setState(newValue)',
          'setState({...state, key: newValue})',
          'state.key = newValue',
          'setState(state.key = newValue)'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Gunakan spread operator untuk preserve properties lain: setState({...state, key: newValue})'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'setState dengan nilai yang sama akan tetap trigger re-render?',
        correctAnswer: false,
        points: 10,
        explanation: 'React menggunakan Object.is comparison. Jika nilai sama, tidak akan re-render.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'Berapa kali useState dapat dipanggil dalam satu component?',
        options: [
          'Hanya 1 kali',
          'Maksimal 5 kali',
          'Tidak terbatas',
          'Tergantung browser'
        ],
        correctAnswer: 2,
        points: 10,
        explanation: 'Tidak ada batasan, bisa multiple useState calls dalam satu component.'
      },
      {
        id: 7,
        type: 'true-false',
        question: 'useState harus dipanggil di top level component?',
        correctAnswer: true,
        points: 10,
        explanation: 'Hooks harus dipanggil di top level, tidak boleh di dalam loops, conditions, atau nested functions.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'Apa yang terjadi jika setState dipanggil dengan object yang sama (same reference)?',
        options: [
          'Akan re-render',
          'Tidak akan re-render',
          'Error',
          'Component unmount'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Jika reference sama (===), React skip re-render untuk optimization.'
      },
      {
        id: 9,
        type: 'multiple-choice',
        question: 'Bagaimana cara update array state?',
        options: [
          'state.push(item)',
          'setState([...state, item])',
          'setState(state.concat(item))',
          'B dan C benar'
        ],
        correctAnswer: 3,
        points: 10,
        explanation: 'Gunakan spread atau concat untuk create new array: setState([...state, item]) atau setState(state.concat(item))'
      },
      {
        id: 10,
        type: 'essay',
        question: 'Kapan sebaiknya menggunakan multiple useState vs single useState dengan object? Berikan contoh use case!',
        correctAnswer: null,
        points: 10,
        explanation: 'Multiple useState: untuk state yang independent. Single object: untuk related state yang sering update bersamaan. Contoh: multiple untuk theme & sidebar state, object untuk form fields.'
      }
    ]
  },
};

// Helper function untuk get quiz questions by quiz ID
export const getQuizQuestions = (quizId) => {
  return quizQuestions[quizId] || null;
};

// Calculate quiz score
export const calculateQuizScore = (quiz, answers) => {
  let totalPoints = 0;
  let earnedPoints = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const results = quiz.questions.map((question, index) => {
    totalPoints += question.points;
    const userAnswer = answers[index];

    // Check if answered
    if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
      unansweredCount++;
      return {
        questionId: question.id,
        correct: false,
        userAnswer: null,
        correctAnswer: question.correctAnswer,
        points: 0,
        maxPoints: question.points,
      };
    }

    // Essay questions need manual grading
    if (question.type === 'essay') {
      return {
        questionId: question.id,
        correct: null, // null means pending manual grading
        userAnswer,
        correctAnswer: question.correctAnswer,
        points: 0, // will be graded manually
        maxPoints: question.points,
        needsGrading: true,
      };
    }

    // Check answer for multiple-choice and true-false
    let isCorrect = false;
    if (question.type === 'true-false') {
      isCorrect = userAnswer === question.correctAnswer;
    } else if (question.type === 'multiple-choice') {
      isCorrect = userAnswer === question.correctAnswer;
    }

    if (isCorrect) {
      earnedPoints += question.points;
      correctCount++;
    } else {
      incorrectCount++;
    }

    return {
      questionId: question.id,
      isCorrect: isCorrect,
      correct: isCorrect,
      userAnswer,
      correctAnswer: question.correctAnswer,
      points: isCorrect ? question.points : 0,
      maxPoints: question.points,
    };
  });

  const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const passed = score >= quiz.passingScore;

  return {
    score,
    earnedPoints,
    totalPoints,
    correctCount,
    incorrectCount,
    unansweredCount,
    passed,
    results,
    details: results, // alias untuk compatibility
    totalQuestions: quiz.questions.length,
  };
};
