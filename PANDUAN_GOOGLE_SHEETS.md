# Panduan Integrasi Google Sheets untuk Form RSVP

Panduan ini dibuat secara rinci agar mudah dipahami oleh **junior programmer** atau **AI agent** pemula.

---

## 1. Konsep Cara Kerja
```
[Tamu Mengisi Form RSVP] 
       │
       ▼ (jQuery AJAX / Fetch POST)
[Google Apps Script (Web App)] 
       │
       ▼ (SpreadsheetApp API)
[Google Spreadsheet (Baris Baru Tersimpan)]
```

---

## 2. Langkah-Langkah Setup Google Sheets

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.google.com).
2. Buat sheet baru dan beri nama, misalnya: `Data Undangan Tamu`.
3. Pada baris pertama (Header / Judul Kolom), ketik:
   - Kolom A: `Timestamp` (Waktu pengisian)
   - Kolom B: `Nama`
   - Kolom C: `Alamat`
   - Kolom D: `Kehadiran`
   - Kolom E: `Ucapan / Pesan` (opsional)

---

### Langkah 2: Buka Apps Script
1. Di menu Google Sheets, klik **Extensions (Ekstensi)** > **Apps Script**.
2. Hapus semua kode default di dalam editor `Code.gs`, lalu ganti dengan kode berikut:

```javascript
/**
 * Google Apps Script untuk Menerima Data Form RSVP Undangan
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Kunci script selama 10 detik agar data tidak bertabrakan saat ada request bersamaan
  lock.tryLock(10000);

  try {
    // 1. Ambil spreadsheet aktif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 2. Ambil parameter data yang dikirim dari form HTML
    var rawData = e.postData ? e.postData.contents : "";
    var data = {};
    
    // Support data berformat JSON maupun form-encoded
    if (rawData && rawData.startsWith("{")) {
      data = JSON.parse(rawData);
    } else {
      data = e.parameter;
    }

    var timestamp = new Date();
    var nama = data.nama || "";
    var alamat = data.alamat || "";
    var kehadiran = data.kehadiran || "";
    var pesan = data.pesan || "-";

    // 3. Masukkan baris baru ke dalam Spreadsheet
    sheet.appendRow([timestamp, nama, alamat, kehadiran, pesan]);

    // 4. Berikan respon balik format JSON bahwa simpan berhasil
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data berhasil disimpan" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Jika ada error, kirim pesan error
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Lepas kunci script
    lock.releaseLock();
  }
}

// Support untuk test GET request di browser
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready", message: "Web App RSVP Google Sheets Aktif!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

### Langkah 3: Deploy sebagai Web App
1. Di pojok kanan atas Google Apps Script, klik tombol **Deploy** > **New deployment**.
2. Klik ikon gerigi (Select type) > pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   - **Description**: `API RSVP Undangan`
   - **Execute as**: `Me (email anda)`
   - **Who has access**: `Anyone` *(PENTING: Pilih "Anyone" agar tamu tanpa login Google tetap bisa mengirim RSVP)*.
4. Klik **Deploy**.
5. Jika diminta verifikasi hak akses Google:
   - Klik **Authorize access**.
   - Pilih akun Google Anda.
   - Klik **Advanced** (Lanjutan) > Klik **Go to Untitled project (unsafe)**.
   - Klik **Allow**.
6. Salin **Web App URL** yang dihasilkan (contoh format: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Langkah 4: Masukkan URL ke dalam file `js/script.js`
Buka file `js/script.js` di proyek undangan ini, cari variabel berikut di baris atas dan ganti dengan URL Anda:

```javascript
// GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA SENDIRI:
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

Selesai! Sekarang setiap kali tamu mengisi form RSVP di undangan, data otomatis masuk ke Google Sheets Anda secara realtime.
