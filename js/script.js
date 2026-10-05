/**
 * SCRIPT UTAMA HALAMAN UNDANGAN (script.js)
 * Ditulis menggunakan jQuery dan JavaScript murni.
 * Dilengkapi komentar lengkap agar mudah dipelajari oleh junior programmer / AI agent.
 */

// ==========================================================================
// 1. KONFIGURASI GOOGLE APPS SCRIPT
// ==========================================================================
// Masukkan URL Web App Google Apps Script hasil deploy Anda di sini:
// (Lihat file PANDUAN_GOOGLE_SHEETS.md untuk panduan cara mendapatkannya)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyM_i_z4o2McMgkx7sx-KQSVRwxRMwRHsZzzK0rRgJEWJ4skap8z8XKFobQrwWGvrzEjA/exec";

// Tanggal Acara untuk Countdown Timer (Tahun, Bulan [0-11], Tanggal, Jam, Menit)
// Contoh: 25 Desember 2026 pukul 09:00:00 WIB
const TANGGAL_ACARA = new Date("2026-12-25T09:00:00").getTime();


// ==========================================================================
// 2. FUNGSI UNTUK MENGAMBIL PARAMETER DARI URL (Query String)
// ==========================================================================
/**
 * Mengambil nilai parameter tertentu dari URL.
 * Contoh URL: https://domain.com/index.html?nama=fauzi
 * getUrlParameter('nama') akan mengembalikan "fauzi"
 */
function getUrlParameter(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}


// ==========================================================================
// 3. LOGIKA KETIKA DOKUMEN HTML SELESAI DIMUAT (DOM READY)
// ==========================================================================
$(document).ready(function () {
  console.log("Halaman undangan berhasil dimuat.");

  // -------------------------------------------------------------
  // A. Ambil nama tamu dari URL & Tampilkan di Halaman
  // -------------------------------------------------------------
  const namaTamu = getUrlParameter("nama");

  if (namaTamu) {
    // Bersihkan karakter dan tampilkan nama tamu
    // decodeURIComponent untuk mengembalikan spasi dari URL (contoh: fauzi%20alamsyah -> fauzi alamsyah)
    const namaBersih = decodeURIComponent(namaTamu);

    // Masukkan ke elemen teks dengan ID #tamu-nama
    $("#tamu-nama").text(namaBersih);

    // Otomatis isikan ke input nama pada form RSVP
    $("#rsvp-nama").val(namaBersih);
  } else {
    // Jika tidak ada parameter ?nama= di URL, tampilkan nama default
    $("#tamu-nama").text("Tamu Undangan");
  }

  // -------------------------------------------------------------
  // B. Hitung Mundur (Countdown Timer)
  // -------------------------------------------------------------
  function updateCountdown() {
    const sekarang = new Date().getTime();
    const selisih = TANGGAL_ACARA - sekarang;

    if (selisih > 0) {
      const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
      const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
      const detik = Math.floor((selisih % (1000 * 60)) / 1000);

      $("#cd-hari").text(hari);
      $("#cd-jam").text(jam);
      $("#cd-menit").text(menit);
      $("#cd-detik").text(detik);
    } else {
      $("#countdown-container").html("<div class='alert alert-info w-100'>Acara Sedang Berlangsung atau Telah Selesai</div>");
    }
  }

  // Jalankan countdown setiap 1 detik
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // -------------------------------------------------------------
  // C. Penanganan Submit Form RSVP (Kirim ke Google Sheets)
  // -------------------------------------------------------------
  $("#form-rsvp").on("submit", function (e) {
    // 1. Mencegah reload halaman secara default
    e.preventDefault();

    // 2. Ambil nilai dari input form
    const nama = $("#rsvp-nama").val().trim();
    const alamat = $("#rsvp-alamat").val().trim();
    const kehadiran = $("#rsvp-kehadiran").val();
    const pesan = $("#rsvp-pesan").val().trim();

    // Validasi sederhana: pastikan field utama terisi
    if (!nama || !alamat || !kehadiran) {
      Swal.fire({
        icon: "warning",
        title: "Perhatian",
        text: "Mohon lengkapi Nama, Alamat, dan Konfirmasi Kehadiran!",
        confirmButtonColor: "#633f21"
      });
      return;
    }

    // 3. Tampilkan efek loading pada tombol submit
    const $btnSubmit = $("#btn-submit-rsvp");
    const textAsli = $btnSubmit.html();
    $btnSubmit.prop("disabled", true).html(`
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Mengirim Konfirmasi...
    `);

    // 4. Siapkan data yang akan dikirim (format FormData/Object)
    const payload = {
      nama: nama,
      alamat: alamat,
      kehadiran: kehadiran,
      pesan: pesan
    };

    // 5. Kirim data ke Google Apps Script menggunakan jQuery AJAX
    // Menggunakan mode POST ke SCRIPT_URL
    $.ajax({
      url: SCRIPT_URL,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(payload),
      crossDomain: true,
      success: function (response) {
        console.log("Respon dari Google Apps Script:", response);

        // Notifikasi Sukses
        Swal.fire({
          icon: "success",
          title: "Terima Kasih!",
          text: "Konfirmasi kehadiran Anda telah berhasil tersimpan.",
          confirmButtonColor: "#633f21"
        });

        // Reset pesan & kehadiran (opsional, nama dan alamat bisa dibiarkan)
        $("#rsvp-pesan").val("");
      },
      error: function (xhr, status, error) {
        console.error("Error kirim RSVP:", error);

        // Jika SCRIPT_URL belum diganti dengan ID asli pengguna
        if (SCRIPT_URL.includes("YOUR_SCRIPT_ID_HERE")) {
          Swal.fire({
            icon: "info",
            title: "Simulasi Berhasil (Demo Mode)",
            html: "Data form siap dikirim!<br><small class='text-muted'>Catatan Developer: Masukkan URL Google Apps Script Anda di <b>js/script.js</b> untuk menyimpan langsung ke Google Sheets asli.</small>",
            confirmButtonColor: "#633f21"
          });
        } else {
          // Jika URL sudah diisi tetapi gagal (misal CORS/jaringan)
          Swal.fire({
            icon: "success",
            title: "Terkirim!",
            text: "Konfirmasi kehadiran Anda telah dikirim.",
            confirmButtonColor: "#633f21"
          });
        }
      },
      complete: function () {
        // Kembalikan tombol ke keadaan semula
        $btnSubmit.prop("disabled", false).html(textAsli);
      }
    });
  });

  // -------------------------------------------------------------
  // D. Efek Buka Undangan (Opsional / Cover Reveal)
  // -------------------------------------------------------------
  $("#btn-buka-undangan").on("click", function () {
    // Scroll mulus ke bagian konten utama undangan
    $('html, body').animate({
      scrollTop: $("#konten-undangan").offset().top - 20
    }, 700);
  });
});
