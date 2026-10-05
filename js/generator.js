/**
 * SCRIPT GENERATOR LINK UNDANGAN (generator.js)
 * Membantu pembuat acara membuat link undangan dengan parameter nama tamu
 * dan menyiapkannya untuk dikirimkan melalui WhatsApp / SMS / Media Sosial.
 */

$(document).ready(function () {
  console.log("Generator Link Undangan siap.");

  // Dapatkan URL dasar halaman index.html (otomatis mendeteksi domain/lokasi lokal)
  const baseUrl = window.location.href.replace(/generator\.html.*$/, "index.html");

  // Ketika form submit atau tombol "Buat Link" diklik
  $("#form-generator").on("submit", function (e) {
    e.preventDefault();

    // 1. Ambil nama tamu dari input
    const namaTamu = $("#input-nama-tamu").val().trim();

    if (!namaTamu) {
      Swal.fire({
        icon: "warning",
        title: "Nama Kosong",
        text: "Silakan masukkan nama tamu terlebih dahulu!",
        confirmButtonColor: "#633f21"
      });
      return;
    }

    // 2. Format nama agar aman dimasukkan ke URL (encodeURIComponent)
    const encodedNama = encodeURIComponent(namaTamu);
    
    // 3. Gabungkan base URL dengan parameter query ?nama=
    const finalUrl = `${baseUrl}?nama=${encodedNama}`;

    // 4. Siapkan format teks pesan WhatsApp yang ramah dan siap kirim
    const templatePesan = 
`Kepada Yth. Bapak/Ibu/Saudara/i: *${namaTamu}*

Salam damai dan sukacita dalam Tuhan.
Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dalam Perayaan Pesta Jubileum:
*"225 Tahun SFD Berkarya: Berakar dalam Rasa Syukur, Menyalakan Kasih, Merajut Persaudaraan Dina, dan Menjadi Berkat bagi Sesama dan Semesta"*

Detail acara dan konfirmasi kehadiran dapat dilihat melalui link undangan online berikut:
${finalUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan merayakan syukur bersama kami.

Terima kasih dan Tuhan memberkati.`;

    // 5. Tampilkan hasil ke elemen tampilan
    $("#output-link-text").text(finalUrl);
    $("#output-link-input").val(finalUrl);
    $("#output-wa-text").val(templatePesan);
    
    // Update tombol buka preview
    $("#btn-preview-link").attr("href", finalUrl);

    // Tampilkan container hasil
    $("#hasil-generator").removeClass("d-none").hide().fadeIn(400);

    // Scroll otomatis ke hasil
    $('html, body').animate({
      scrollTop: $("#hasil-generator").offset().top - 30
    }, 400);
  });

  // -------------------------------------------------------------
  // FITUR: Salin Link ke Clipboard
  // -------------------------------------------------------------
  $("#btn-copy-link").on("click", function () {
    const linkUrl = $("#output-link-input").val();

    if (!linkUrl) return;

    // Gunakan Clipboard API modern
    navigator.clipboard.writeText(linkUrl).then(function () {
      Swal.fire({
        icon: "success",
        title: "Tersalin!",
        text: "Link undangan berhasil disalin ke clipboard.",
        timer: 2000,
        showConfirmButton: false
      });
    }).catch(function (err) {
      // Fallback jika browser versi lama
      $("#output-link-input").select();
      document.execCommand("copy");
      Swal.fire({
        icon: "success",
        title: "Tersalin!",
        text: "Link undangan berhasil disalin.",
        timer: 1500,
        showConfirmButton: false
      });
    });
  });

  // -------------------------------------------------------------
  // FITUR: Salin Pesan Lengkap WhatsApp
  // -------------------------------------------------------------
  $("#btn-copy-wa").on("click", function () {
    const teksWA = $("#output-wa-text").val();

    if (!teksWA) return;

    navigator.clipboard.writeText(teksWA).then(function () {
      Swal.fire({
        icon: "success",
        title: "Tersalin!",
        text: "Teks undangan WhatsApp berhasil disalin. Siap ditempel di chat WA!",
        timer: 2000,
        showConfirmButton: false
      });
    });
  });

  // -------------------------------------------------------------
  // FITUR: Kirim Langsung ke WhatsApp Web / App
  // -------------------------------------------------------------
  $("#btn-share-wa").on("click", function () {
    const teksWA = $("#output-wa-text").val();
    if (!teksWA) return;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(teksWA)}`;
    window.open(waUrl, "_blank");
  });
});
