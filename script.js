// --- Data dasar untuk masing-masing kelas ---
const dataKelas = {
  IPA: {
    kebutuhan: ["Buku catatan", "LKS", "Alat tulis", "Seragam sekolah"],
    pr: [
      "PPKN: Membuat biografi PPKN.",
      "Matematika Wajib: Mengerjakan halaman 50.",
      "Seni Budaya: Presentasi seni budaya.",
      "Bahasa Indonesia: Membuat vlog berita."
    ],
    jadwal: [
      "Senin: B. Inggris, PPKN, Sejarah, Mtk Lanjut, Seni Rupa.",
      "Selasa: Mtk Lanjut, Fisika, B. Inggris, B. Indo, B. Arab, Informatika.",
      "Rabu: Penjas, Biologi, Fisika, Kemuhammadiyahan, PAI, Matematika.",
      "Kamis: Fisika, Kimia, Matematika, B. Indo, PAI.",
      "Jumat: Biologi, B. Jawa, BK, Kimia."
    ],
    ekstrakulikuler: ["Rabu: Double Track", "Kamis: Hizbul Wathan", "Jumat: Tapak Suci"],
    goals: ["“Jangan takut gagal, karena kegagalan adalah bagian dari perjalanan menuju sukses.” — B.J. Habibie"]
  },
  IPS: {
    kebutuhan: ["Buku tulis", "LKS", "Alat tulis", "Seragam sekolah"],
    pr: [
      "Geografi: Mencari kata Polystichum Lemmoni.",
      "Matematika: Mengerjakan tugas mandiri bab 2.",
      "Seni Budaya: Membawa kanvas kecil.",
      "Ekonomi: Membuat laporan neraca.",
      "B. Jawa: Membuat sesorah pidato atau pranatacara.",
      "B. Indonesia: Membuat vlog berita."
    ],
    jadwal: [
      "Senin: Geografi, Mtk, Seni Budaya, Ekonomi.",
      "Selasa: B. Jawa, Sejarah, Kemuhammadiyahan, Informatika, Geografi, Ekonomi.",
      "Rabu: Penjas, B. Arab, Biologi, BK.",
      "Kamis: B. Inggris, B. Indo, PAI, Sosiologi.",
      "Jumat: PAI, PPKN, Biologi, Sosiologi."
    ],
    ekstrakulikuler: ["Rabu: Double Track", "Kamis: Hizbul Wathan", "Jumat: Tapak Suci"],
    goals: ["“Kesuksesan adalah hasil dari kerja keras dan ketekunan.” — Ir. Soekarno"]
  }
};

// --- Elemen HTML utama ---
const main = document.getElementById("mainContent");
const btnLoad = document.getElementById("btnLoad");
const btnReset = document.getElementById("btnReset");
const namaInput = document.getElementById("namaInput");
const kelasSelect = document.getElementById("kelasSelect");

// --- Event: Muat Data ---
btnLoad.addEventListener("click", () => {
  const nama = namaInput.value.trim();
  const kelas = kelasSelect.value;
  if (!nama) {
    alert("Masukkan nama terlebih dahulu ya!");
    return;
  }
  renderPage(nama, kelas);
});

// --- Event: Reset Data ---
btnReset.addEventListener("click", () => {
  main.innerHTML = "";
  namaInput.value = "";
});

// --- Fungsi: Render Halaman Berdasarkan Kelas ---
function renderPage(nama, kelas) {
  const data = dataKelas[kelas];
  main.innerHTML = `
    <div class="card">
      <h2>Halo, ${nama} dari kelas ${kelas} 💕</h2>
      <p class="muted">Semangat untuk hari ini yaa!</p>
    </div>
    <div class="grid">
      ${renderListCard("📘 Kebutuhan Harian", "kebutuhan", data.kebutuhan)}
      ${renderListCard("📚 PR & Tugas", "pr", data.pr)}
      ${renderListCard("📅 Jadwal Pelajaran", "jadwal", data.jadwal)}
      ${renderListCard("⭐ Ekstrakulikuler / Double Track", "ekstrakulikuler", data.ekstrakulikuler)}
      ${renderListCard("🎯 Goals", "goals", data.goals)}
      ${renderMoodCard()}
    </div>
  `;
  attachListEvents();
}

// --- Fungsi: Template Card List Dinamis ---
function renderListCard(title, key, items) {
  return `
    <div class="card" data-key="${key}">
      <h2>${title}</h2>
      <ul class="list">
        ${items.map((i) => `<li>${i}<button class="small-btn del">hapus</button></li>`).join("")}
      </ul>
      <div class="adder">
        <input type="text" placeholder="tambah item baru..." />
        <button class="small-btn">tambah</button>
      </div>
    </div>
  `;
}

// --- Fungsi: Card Mood dan Catatan Harian ---
function renderMoodCard() {
  return `
    <div class="card" id="moodCard">
      <h2>💖 Perasaan Hari Ini</h2>
      <div class="mood-row">
        <button class="mood-btn" data-mood="happy">😊 Senang</button>
        <button class="mood-btn" data-mood="sad">😢 Sedih</button>
        <button class="mood-btn" data-mood="flat">😐 Biasa aja</button>
      </div>
      <textarea id="reason" placeholder="Ceritain alasannya di sini..."></textarea>
      <button id="saveNote" class="primary" style="margin-top:10px;">Simpan Catatan</button>
      <div class="notes-list" id="notesList"></div>
    </div>
  `;
}

// --- Fungsi: Aktifkan tombol tambah & hapus ---
function attachListEvents() {
  document.querySelectorAll(".adder button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      const text = input.value.trim();
      if (text) {
        const ul = btn.closest(".card").querySelector(".list");
        const li = document.createElement("li");
        li.innerHTML = `${text}<button class="small-btn del">hapus</button>`;
        ul.appendChild(li);
        input.value = "";
        attachDeleteButtons();
      }
    });
  });
  attachDeleteButtons();
  attachMoodButtons();
}

// --- Fungsi: Hapus item ---
function attachDeleteButtons() {
  document.querySelectorAll(".del").forEach((btn) => {
    btn.addEventListener("click", () => btn.parentElement.remove());
  });
}

// --- Fungsi: Mood dan catatan ---
function attachMoodButtons() {
  const moods = document.querySelectorAll(".mood-btn");
  moods.forEach((btn) =>
    btn.addEventListener("click", () => {
      moods.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    })
  );

  document.getElementById("saveNote").addEventListener("click", () => {
    const activeMood = document.querySelector(".mood-btn.active");
    const reason = document.getElementById("reason").value.trim();
    if (!activeMood) return alert("Pilih dulu perasaanmu hari ini yaa 💕");
    const mood = activeMood.textContent;
    const notesList = document.getElementById("notesList");
    const card = document.createElement("div");
    const now = new Date().toLocaleString("id-ID");
    card.classList.add("note-card");
    card.innerHTML = `
      <div class="meta">${now} — ${mood}</div>
      <div>${reason || "(tidak ada catatan)"}</div>
    `;
    notesList.prepend(card);
    document.getElementById("reason").value = "";
  });
}
