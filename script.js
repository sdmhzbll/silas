// ========================
// CEK LOGIN DI SEMUA HALAMAN (kecuali login & register)
// ========================
if (!window.location.href.includes("login") && !window.location.href.includes("register")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
  }
}

// ========================
// LOGOUT GLOBAL
// ========================
function logout() {
  if (confirm("Yakin ingin logout?")) {
    localStorage.removeItem("user");
    window.location.href = "login.html";
  }
}

// ========================
// TAMPILKAN PROFIL USER DI HALAMAN AKUN
// ========================
function tampilkanProfil() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const data = users.find(u => u.email === user.email && u.password === user.password);

  if (data) {
    document.getElementById("user-nama").textContent = data.nama || "-";
    document.getElementById("user-email").textContent = data.email || "-";
    if (document.getElementById("user-alamat")) {
      document.getElementById("user-alamat").textContent = data.alamat || "-";
    }
  }
}

// ========================
// UPLOAD PEMBAYARAN & SIMPAN KE localStorage
// ========================
function uploadPembayaran() {
  const noPesanan = document.getElementById("noPesanan").value.trim();
  const bank = document.getElementById("bank").value;
  const bukti = document.getElementById("bukti").files[0];

  if (!noPesanan || !bank || !bukti) {
    alert("Semua data harus diisi dan bukti harus dipilih.");
    return;
  }

  const pembayarans = JSON.parse(localStorage.getItem("pembayaran")) || [];

  const reader = new FileReader();
  reader.onload = function(e) {
    pembayarans.push({
      noPesanan,
      bank,
      bukti: e.target.result,
      waktu: new Date().toLocaleString()
    });

    localStorage.setItem("pembayaran", JSON.stringify(pembayarans));
    alert("Pembayaran berhasil dikonfirmasi otomatis!");
    window.location.href = "status-pembayaran.html";
  };
  reader.readAsDataURL(bukti);
}

// ========================
// PREVIEW GAMBAR
// ========================
function previewGambar() {
  const file = document.getElementById("bukti").files[0];
  const preview = document.getElementById("preview");

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Bukti Pembayaran" style="max-width: 100%; height: auto;" />`;
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
  }
}

// ========================
// TAMPILKAN NOMOR REKENING
// ========================
function tampilkanRekening() {
  const bank = document.getElementById("bank").value;
  const rekeningDiv = document.getElementById("rekening");

  const nomorRekening = {
    BCA: "123-456-7890 a.n. SiLas Workshop",
    BRI: "9876-5432-1001 a.n. SiLas Lasindo",
    Mandiri: "140-001-999-1234 a.n. CV. SiLas Mandiri",
    BNI: "041-1234567890 a.n. PT. SiLas Teknindo"
  };

  if (nomorRekening[bank]) {
    rekeningDiv.innerHTML = `<strong>Nomor Rekening:</strong><br>${nomorRekening[bank]}`;
    rekeningDiv.style.display = "block";
  } else {
    rekeningDiv.innerHTML = "";
    rekeningDiv.style.display = "none";
  }
}
