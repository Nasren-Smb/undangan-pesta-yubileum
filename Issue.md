# Project: Undangan Online Sederhana

## Deskripsi
Proyek ini bertujuan untuk membuat sistem undangan online sederhana berbasis HTML, CSS, dan JavaScript tanpa backend server tradisional. Sistem ini dirancang khusus untuk tujuan pembelajaran, sehingga struktur kodenya harus sederhana, bersih, dan mudah dipahami oleh junior programmer atau AI agent.

## Teknologi & Dependensi
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework/Library**: 
  - Bootstrap 5 (via CDN untuk styling dan layout responsif)
  - jQuery (via CDN untuk mempermudah manipulasi DOM dan request AJAX)
- **Database/Penyimpanan**: Google Sheets (sebagai pengganti database). Data RSVP akan dikirim langsung ke Spreadsheet menggunakan Google Apps Script.

## Fitur & Spesifikasi Utama

### 1. Halaman Undangan (View Undangan)
- **Personalisasi Nama Tamu**: Mengambil nama tamu dari parameter URL (contoh: url `/undangan?nama=fauzi`). Nama "fauzi" akan diambil oleh JavaScript dan ditampilkan secara dinamis di bagian pembuka undangan (misal: "Kepada Yth: fauzi").
- **Informasi Acara**: Menampilkan foto yang sudah disediakan, tema acara, tanggal, waktu, dan lokasi acara.
- **Form RSVP (Konfirmasi Kehadiran)**: Form bagi tamu undangan untuk mengonfirmasi kehadiran.
  - Field yang diperlukan: Nama, Alamat, dan Status Kehadiran (Datang / Tidak Datang).
  - Saat disubmit, data ini akan dikirim melalui AJAX ke Google Sheets.

### 2. Form Generator Link Undangan (Admin View)
- Sebuah form terpisah (bisa di file HTML berbeda, misalnya `generator.html`) yang digunakan khusus oleh pembuat acara sebelum mengirim undangan.
- **Fungsi**: Memasukkan nama tamu ke dalam input text.
- **Output**: Menghasilkan link (URL) undangan unik yang siap disalin/dikirimkan ke tamu tersebut (misalnya menghasilkan output: `/undangan?nama=fauzi`).

## Panduan Implementasi (Untuk Pembelajaran)
1. **Pemisahan File**: Pisahkan file `index.html` (untuk undangan), `style.css` (untuk styling tambahan di luar Bootstrap), dan `script.js` (untuk logika JavaScript).
2. **Google Sheets API**: Sertakan petunjuk singkat (atau file terpisah) tentang cara men-deploy Google Apps Script (`doPost` / `doGet`) yang akan bertugas menerima data JSON/Form-data dari form RSVP dan menuliskannya ke baris Spreadsheet.
3. **Komentar Kode**: Pastikan memberikan baris komentar (comments) di bagian logika utama JavaScript (seperti cara mengambil parameter URL dan cara mengirim AJAX request ke Google Sheets) agar mudah dipelajari.
