# 📝 Panduan Menggunakan Fitur Quiz

## Status: ✅ SIAP DIGUNAKAN

Fitur quiz sudah **lengkap dan berfungsi** dengan semua requirement yang diminta!

---

## 🎯 Fitur yang Tersedia

### ✅ Interface Mengerjakan Quiz
1. **Timer Countdown** ⏱️
   - Countdown timer real-time
   - Warna berubah: hijau → kuning (5 menit) → merah (1 menit)
   - Auto-submit ketika waktu habis

2. **Navigasi Soal** 🔢
   - Tombol "Sebelumnya" dan "Selanjutnya"
   - Grid navigasi sidebar untuk jump ke soal tertentu
   - Visual indicator: terjawab (hijau), ditandai (kuning), current (ungu), belum dijawab (abu)

3. **Tandai untuk Review** ⭐
   - Tombol "Tandai" pada setiap soal
   - Soal bertanda muncul dengan highlight kuning
   - Counter jumlah soal ditandai di sidebar

4. **Auto-save Jawaban** 💾
   - Jawaban otomatis tersimpan ke localStorage setiap 100ms setelah perubahan
   - Progress quiz dipulihkan jika browser refresh
   - Toast notification "Progress sebelumnya dipulihkan"

5. **Konfirmasi Submit dengan Review** ✅
   - Modal konfirmasi sebelum submit
   - Menampilkan:
     - Total soal
     - Jumlah terjawab (hijau)
     - Belum dijawab (merah)
     - Ditandai review (kuning)
   - Warning untuk soal belum dijawab
   - Tombol Batal & Ya Submit

---

## 🚀 Cara Menggunakan

### 1. Akses Halaman Quiz
- Login ke aplikasi
- Klik menu **"Quiz"** di sidebar
- Atau navigasi ke `/admin/quiz`

### 2. Memulai Quiz
**Quiz yang Bisa Dikerjakan (Ada Soal Lengkap):**
- ✅ Quiz 1: React Fundamentals - Components & Props (10 soal, 15 menit)
- ✅ Quiz 2: React State Management (15 soal, 20 menit)
- ✅ Quiz 3: useState Hook (10 soal, 15 menit)

**Cara Mulai:**
1. Scroll ke section "📝 Quiz Tersedia"
2. Pilih salah satu quiz (1, 2, atau 3)
3. Klik tombol **"Mulai Quiz"**
4. Quiz akan langsung dimulai dengan timer countdown

### 3. Mengerjakan Quiz

**Header (Sticky Top):**
- Judul quiz
- Progress: "Soal X dari Y"
- Timer countdown (warna: hijau/kuning/merah)
- Progress bar dengan persentase terjawab

**Area Soal:**
- Nomor soal dengan badge
- Tipe soal (Pilihan Ganda / Benar-Salah / Essay)
- Poin per soal
- Tombol "Tandai" untuk review
- Pertanyaan
- Pilihan jawaban (radio buttons untuk multiple choice)

**Navigasi:**
- Tombol **"← Sebelumnya"** (bottom left)
- Tombol **"Selanjutnya →"** (bottom right)
- Tombol **"Submit Quiz"** (soal terakhir)

**Sidebar Navigator:**
- Grid 5 kolom dengan nomor soal
- Klik nomor untuk jump ke soal
- Warna indikator:
  - 🟢 Hijau = Terjawab
  - 🟡 Kuning = Ditandai review
  - 🟣 Ungu = Soal aktif
  - ⚪ Abu = Belum dijawab
- Legend di bawah grid
- Tombol "Submit Quiz" di bawah

### 4. Menjawab Soal

**Pilihan Ganda:**
- Klik radio button atau klik area pilihan
- Pilihan terpilih akan highlight ungu
- Jawaban auto-save setelah 100ms

**Benar/Salah:**
- Klik "✅ Benar" atau "❌ Salah"
- Pilihan benar = hijau, salah = merah
- Auto-save otomatis

**Essay (jika ada):**
- Ketik di textarea
- Min 200px height, bisa resize
- Auto-save saat typing selesai

### 5. Menandai Soal untuk Review

**Kapan Pakai:**
- Soal yang tidak yakin
- Ingin review lagi nanti
- Butuh waktu lebih banyak

**Cara:**
1. Klik tombol **"☆ Tandai"** (pojok kanan atas soal)
2. Berubah jadi **"⭐ Ditandai"** dengan highlight kuning
3. Nomor soal di sidebar juga jadi kuning
4. Klik lagi untuk unmark

### 6. Submit Quiz

**Cara 1 - Dari Soal Terakhir:**
1. Navigasi ke soal terakhir (atau klik nomor terakhir di sidebar)
2. Klik tombol **"Submit Quiz"** (hijau, bottom right)

**Cara 2 - Dari Sidebar:**
1. Dari soal mana pun
2. Klik tombol **"Submit Quiz"** di sidebar (bawah navigator)

**Modal Konfirmasi (Background Blur):**
- Background blur effect (bukan hitam)
- Menampilkan ringkasan:
  - Total soal: 10
  - Terjawab: 8 (hijau)
  - Belum dijawab: 2 (merah)
  - Ditandai review: 3 (kuning)
- Warning: "⚠️ Soal yang belum dijawab akan dianggap salah!"
- Pilihan:
  - **"Batal"** → Kembali ke quiz
  - **"Ya, Submit"** → Submit dan tampilkan hasil

---

### 7. Halaman Hasil Quiz (NEW!)

**Setelah klik "Ya, Submit":**

**Header Hasil:**
- 🎉 Icon besar (🎉 jika lulus, 😔 jika tidak)
- Gradient background (hijau jika lulus, merah jika tidak)
- Pesan "Selamat! Anda Lulus!" atau "Belum Berhasil"
- Subtitle motivasi

**Score Card:**
- Nilai besar di tengah (dalam circle)
- Passing score ditampilkan
- 4 Stats grid:
  - ✅ Jumlah Benar (hijau)
  - ❌ Jumlah Salah (merah)
  - 📊 Persentase Akurasi (biru)
  - ⏱️ Waktu Pengerjaan (ungu)
- Progress bar dengan animasi

**Detail Quiz:**
- Judul quiz
- Total soal
- Waktu pengerjaan vs durasi quiz
- Soal ditandai review
- Status badge (LULUS/TIDAK LULUS)

**Ringkasan Jawaban:**
- Grid 10 kolom dengan nomor soal
- Warna indikator:
  - 🟢 Hijau = Jawaban benar
  - 🔴 Merah = Jawaban salah
  - ⚪ Abu = Tidak dijawab
- Hover untuk lihat status per soal
- Legend di bawah grid

**Pesan Motivasi:**
- Jika lulus: Motivasi untuk lanjut belajar
- Jika tidak lulus: Encouragement untuk coba lagi

**Action Buttons:**
- **"Selesai & Kembali"** → Kembali ke daftar quiz (selalu ada)
- **"Coba Lagi"** → Retry quiz (hanya jika tidak lulus)

---

## 🔧 Fitur Tambahan

### Auto-Save System
**Apa yang Disimpan:**
- Semua jawaban yang sudah dipilih
- Nomor soal terakhir
- Status mark review

**Kapan Disimpan:**
- Otomatis 100ms setelah jawab soal
- Saat pindah soal
- Setiap perubahan jawaban

**Recovery:**
- Jika browser refresh → Progress dipulihkan
- Toast: "Progress sebelumnya dipulihkan!"
- Melanjutkan dari soal terakhir

### Warn Before Leave
- Jika coba close tab/browser → Warning
- Browser popup: "Apakah Anda yakin ingin meninggalkan?"
- Mencegah kehilangan progress tidak sengaja

### Timer Auto-Submit
- Ketika timer = 0:00
- Toast: "Waktu habis! Quiz akan di-submit otomatis."
- Auto-submit setelah 1 detik
- Tidak bisa dibatalkan

### Visual Feedback
- Timer berubah warna sesuai waktu tersisa
- Progress bar animasi smooth
- Hover effects pada tombol
- Active state pada soal terpilih
- Highlight untuk soal ditandai

---

## 📊 Tips & Best Practices

### Strategi Mengerjakan Quiz
1. **Baca Semua Soal Dulu** (opsional)
   - Klik nomor soal di sidebar untuk preview
   - Tandai soal yang sulit

2. **Jawab yang Mudah Dulu**
   - Kumpulkan poin cepat
   - Hemat waktu untuk soal sulit

3. **Gunakan Fitur Tandai**
   - Mark soal yang tidak yakin
   - Review nanti sebelum submit

4. **Perhatikan Timer**
   - Hijau = Waktu masih banyak, santai
   - Kuning = 5 menit tersisa, percepat
   - Merah = 1 menit tersisa, segera submit!

5. **Review Sebelum Submit**
   - Cek sidebar: ada berapa yang belum dijawab?
   - Review soal yang ditandai (kuning)
   - Pastikan tidak ada yang terlewat

### Troubleshooting

**Q: Tombol "Mulai Quiz" tidak bekerja?**
- A: Pastikan Anda klik Quiz 1, 2, atau 3 (yang ada soal lengkap)
- Quiz lainnya akan muncul toast: "Quiz ini belum memiliki soal lengkap"

**Q: Progress hilang setelah refresh?**
- A: Progress seharusnya auto-save ke localStorage
- Cek console browser untuk error
- Pastikan localStorage enabled

**Q: Timer tidak jalan?**
- A: Refresh halaman
- Cek console untuk error
- Pastikan JavaScript enabled

**Q: Tidak bisa submit quiz?**
- A: Pastikan sudah di soal terakhir ATAU
- Klik tombol Submit di sidebar (selalu available)

**Q: Modal konfirmasi tidak muncul?**
- A: Refresh halaman dan coba lagi
- Cek browser console untuk error

---

## 📁 File-File Terkait

### Frontend Components
```
src/Pages/Admin/
├── Quiz.jsx                 # Halaman utama quiz (list, tabs)
├── QuizTaking.jsx          # Interface mengerjakan quiz ⭐ MAIN
├── QuizAnalytics.jsx       # Analytics & statistik
└── QuizManagement.jsx      # Kelola quiz (untuk dosen)
```

### State Management
```
src/Utils/
├── Contexts/
│   └── QuizContext.jsx     # Global state quiz
└── Hooks/
    └── useQuiz.js          # Custom hook untuk quiz logic
```

### Data Layer
```
src/Utils/
├── dummyData.js            # Quiz metadata (32 quizzes)
└── quizQuestionsData.js    # Soal lengkap (Quiz 1, 2, 3)
```

---

## 🎨 Screenshot Areas (untuk Dokumentasi)

**Untuk screenshot fitur ini, tangkap:**

1. **Quiz List Page** (`Quiz.jsx`)
   - Header dengan stats cards
   - Tab navigation
   - Daftar quiz tersedia
   - Quiz completed

2. **Quiz Taking Interface** (`QuizTaking.jsx`)
   - Header dengan timer
   - Progress bar
   - Question card (multiple choice)
   - Navigation buttons
   - Sidebar navigator

3. **Special Features**
   - Timer countdown (3 warna)
   - Mark for review button
   - Navigator grid dengan color indicators
   - Submit confirmation modal

4. **Question Types**
   - Multiple choice
   - True/False
   - Essay (jika ada)

---

## ✅ Checklist Fitur (All Complete!)

- [x] Timer countdown real-time
- [x] Navigasi soal (prev/next)
- [x] Jump to question (sidebar grid)
- [x] Tandai untuk review
- [x] Auto-save jawaban
- [x] Konfirmasi submit dengan review
- [x] **Background blur pada modal (bukan hitam)** ⭐ NEW
- [x] **Halaman hasil quiz yang detail** ⭐ NEW
- [x] **Grid ringkasan jawaban (benar/salah/kosong)** ⭐ NEW
- [x] **Score card dengan stats lengkap** ⭐ NEW
- [x] **Motivational message berdasarkan hasil** ⭐ NEW
- [x] **Retry button untuk quiz yang tidak lulus** ⭐ NEW
- [x] Progress bar
- [x] Visual indicators
- [x] Auto-submit saat waktu habis
- [x] Warn before leave
- [x] Recovery progress
- [x] Multiple question types
- [x] Responsive design
- [x] Clean code & comments

**Status: PRODUCTION READY! 🚀**

---

*Last Updated: 2026-01-15*
*Feature Status: ✅ Complete & Tested*
