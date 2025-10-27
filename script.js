// --- Data dasar untuk masing-masing kelas ---
const dataKelas = {
  IPA: {
    kebutuhan: ["Buku catatan", "LKS", "Alat tulis", "Seragam Sekolah"],
    pr: [
      "PPKN: Membuat biografi PPKN.",
      "Matematika Wajib: Mengerjakan halaman 50.",
      "Seni Budaya: Presentasi seni budaya.",
      "Bahasa Indonesia: Membuat vlog berita."
    ],
    jadwal: [
      "Senin: Bahasa Inggris, PPKN, Sejarah, Matematika Lanjut, Seni Rupa.",
      "Selasa: Matematika Lanjut, Fisika, Bahasa Inggris, Bahasa Indo, Bahasa Arab, Informatika.",
      "Rabu: Penjas, Biologi, Fisika, Kemuhammadiyahan, PAI, Matematika.",
      "Kamis: Fisika, Kimia, Matematika, Bahasa Indo, PAI.",
      "Jumat: Biologi, Bahasa Jawa, BK, Kimia."
    ],
    ekstrakulikuler: ["Rabu: Double Track", "Kamis: Hizbul Wathan", "Jumat: Tapak Suci"],
    goals: ["“Jangan takut gagal, karena kegagalan adalah bagian dari perjalanan menuju sukses.” — B.J. Habibie"]
  },
  IPS: {
    kebutuhan: ["Buku Catatan", "LKS", "Alat tulis", "Seragam Sekolah"],
    pr: [
      "Geografi: Mencari Kata Polystichum Lemmoni.",
      "Matematika: Mengerjakan Tugas Mandiri Bab 2.",
      "Seni Budaya: Membawa Kanvas Kecil.",
      "Ekonomi: Membuat Laporan Neraca.",
      "B. Jawa: Membuat Sesorah Pidato atau Pranatacara.",
      "B. Indonesia: Membuat Vlog Berita."
    ],
    jadwal: [
      "Senin: Geografi, Matematika, Seni Budaya, Ekonomi.",
      "Selasa: Bahasa Jawa, Sejarah, Kemuhammadiyahan, Informatika, Geografi, Ekonomi.",
      "Rabu: Penjas, Bahasa Arab, Biologi, BK.",
      "Kamis: Bahasa Inggris, Bahasa Indo, PAI, Sosiologi.",
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
      <p class="muted">💫Be your own kind of smart. Dengan Smart Day, semua jadwal, tugas, dan impianmu tersusun rapi biar kamu tetap produktif tanpa kehilangan vibe. 💫
</p>
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
        <button class="mood-btn" data-mood="Happy">😊 Senang</button>
        <button class="mood-btn" data-mood="Sad">😢 Sedih</button>
        <button class="mood-btn" data-mood="Flat">😐 Biasa aja</button>
        <button class="mood-btn" data-mood="Tired">😴 Capek</button>
        <button class="mood-btn" data-mood="Loved">😍 Hati terasa hangat</button>
        <button class="mood-btn" data-mood="Angry">😡 Marah</button>
        <button class="mood-btn" data-mood="Confused">😕 Bingung</button>
        <button class="mood-btn" data-mood="Excited">🤩 Sangat Bersemangat</button>
        <button class="mood-btn" data-mood="Lonely">😔 Kesepian</button>
        <button class="mood-btn" data-mood="Nervous">😬 Canggung</button>
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
