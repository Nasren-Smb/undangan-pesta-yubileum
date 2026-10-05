# Undangan Online Sederhana (HTML, CSS, JS, Bootstrap 5, jQuery)

Proyek sistem undangan online sederhana tanpa database tradisional, menggunakan **Google Sheets** untuk menyimpan data kehadiran (RSVP) serta mendukung **personalisasi nama tamu otomatis dari URL**.

Dirancang khusus dengan struktur kode yang bersih, rapi, dan memiliki komentar lengkap di setiap bagian agar mudah dipelajari oleh **programmer junior** atau **AI agent**.

---

## 📁 Struktur File & Folder

```
undangan/
│
├── index.html                  # Halaman utama undangan online untuk tamu
├── generator.html              # Tool admin untuk membuat link undangan per tamu
├── Issue.md                    # Dokumen perencanaan spesifikasi sistem
├── PANDUAN_GOOGLE_SHEETS.md    # Tutorial lengkap setup Google Sheets & Apps Script
├── README.md                   # Petunjuk penggunaan proyek ini
│
├── css/
│   └── style.css               # Styling custom (tema warna, responsif, kartu undangan)
│
├── js/
│   ├── script.js               # Logika ambil ?nama=, countdown timer, & submit RSVP AJAX
│   └── generator.js            # Logika generator link URL & template pesan WhatsApp
│
└── assets/
    └── img/
        └── sample-photo.svg    # Ilustrasi/placeholder foto acara
```

---

## 🚀 Fitur Unggulan

1. **Personalisasi Nama Tamu dari URL**:
   - Jika tamu membuka: `index.html?nama=Fauzi`, nama **"Fauzi"** akan langsung muncul di cover pembuka undangan dan otomatis terisi di form RSVP.
2. **Generator Link & Pesan WhatsApp**:
   - Buka `generator.html`, masukkan nama tamu, lalu klik tombol **"Buat Link Undangan"**.
   - Sistem akan menghasilkan URL unik dan template pesan WhatsApp yang siap dikirim langsung dengan satu klik.
3. **Form RSVP Terhubung ke Google Sheets**:
   - Tamu mengisi Nama, Alamat, dan Konfirmasi Kehadiran.
   - Data otomatis dikirim dan tersimpan di Google Spreadsheet tanpa perlu sewa server backend/database.
4. **Desain Mobile-First & Elegan**:
   - Menggunakan Bootstrap 5, Google Fonts (*Playfair Display*, *Great Vibes*, *Plus Jakarta Sans*), dan SweetAlert2.

---

## 🛠️ Cara Menjalankan & Menguji Secara Lokal

1. **Buka Langsung di Browser**:
   - Cukup klik dua kali pada file [index.html](file:///c:/Users/USER/Desktop/undangan/index.html) atau [generator.html](file:///c:/Users/USER/Desktop/undangan/generator.html) di file explorer komputer Anda.
2. **Uji Coba dengan Parameter Nama**:
   - Buka di browser dengan menambahkan nama di akhir URL, misalnya:
     ```
     index.html?nama=Fauzi%20Alamsyah
     ```
3. **Ganti Foto Acara**:
   - Simpan foto Anda di dalam folder `assets/img/foto.jpg`.
   - Buka [index.html](file:///c:/Users/USER/Desktop/undangan/index.html) dan cari baris:
     ```html
     <img src="assets/img/sample-photo.svg" id="foto-acara" alt="Foto Acara">
     ```
     Ubah `src` menjadi:
     ```html
     <img src="assets/img/foto.jpg" id="foto-acara" alt="Foto Acara">
     ```

---

## 📊 Menghubungkan Form RSVP ke Google Sheets

Ikuti panduan langkah demi langkah yang sudah kami sediakan di file:
👉 **[PANDUAN_GOOGLE_SHEETS.md](file:///c:/Users/USER/Desktop/undangan/PANDUAN_GOOGLE_SHEETS.md)**
