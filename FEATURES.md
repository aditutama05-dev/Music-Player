# 📌 Katalog Fitur Aplikasi (Personal AI & Codex Agent)

Dokumen ini berfungsi sebagai rekam jejak spesifikasi fitur proyek. Setiap pembaruan atau modifikasi dilarang menghapus atau merusak fungsi yang tercantum di bawah ini.

---

## 1. Arsitektur & Deployment
* **Tipe Aplikasi:** Progressive Web App (PWA) berbasis web mandiri.
* **Hosting:** GitHub Pages.
* **CI/CD:** GitHub Actions (`.github/workflows/build-release.yml`) untuk verifikasi integritas berkas, pembuatan fallback ikon, dan rilis zip otomatis.
* **PWA Engine:** `sw.js` (Service Worker caching dinamis) dan `pwa-register.js` untuk mode fullscreen serta instalasi layar utama HP.

---

## 2. Antarmuka Pengguna (UI/UX)
* **Tema Visual:** Dark Mode modern bergaya Google Gemini / ChatGPT.
* **Navigasi Sidebar Drawer:**
  * Tombol `＋ Chat Baru`.
  * Navigasi Mode (`💬 Chat Bebas`, `🤖 AI Agent`, `🎨 Buat Gambar`).
  * Daftar riwayat percakapan interaktif (`active-chat`).
  * Tombol akses cepat pengaturan token GitHub.
* **Input Bar:**
  * Tombol bulat `＋` di sisi kiri untuk lampiran/menu alat mendatang.
  * Input bar responsif dengan pemicu `Enter` atau tombol `Kirim`.
* **Markdown & Code Engine:**
  * Integrasi pustaka `Marked.js` untuk parsing Markdown lengkap (tabel, list, formatting).
  * Integrasi `Highlight.js` dengan tema `atom-one-dark` untuk pewarnaan sintaks kodingan.
  * Tombol salin kode modern (`copy-helper.js`) dengan ikon dokumen SVG yang berubah menjadi ikon centang hijau/biru saat berhasil disalin.

---

## 3. Fitur Utama & Mode AI

### A. Mode Chat Bebas (Uncensored)
* Integrasi teks melalui Pollinations AI API.
* Prompt sistem objektif, lugas, dan bebas batasan filter.
* Riwayat chat tersimpan lokal di perangkat (`localStorage`).

### B. Mode Buat Gambar (Image Studio)
* Integrasi generasi visual otomatis via Pollinations Image API.
* Fitur auto-detect: Jika pengguna mengetik perintah berawalan *"gambar"*, *"buatkan gambar"*, atau *"lukis"*, sistem langsung mengeksekusi gambar visual tanpa harus berada di mode Buat Gambar.
* Render gambar responsif langsung di dalam gelembung percakapan.

### C. Mode AI Agent (Codex GitHub)
* **Autentikasi Lokal:** Input GitHub Personal Access Token (PAT) disimpan aman di `localStorage` tanpa terekspos ke backend publik.
* **Antarmuka Mandiri:** Tampilan bergaya ChatGPT Codex Cloud:
  * Pemilihan repositori pengguna via REST API GitHub.
  * Pemilihan cabang (*branch*) aktif (misal `main`).
  * Area instruksi perbaikan kode/analisa bug.
  * Panel hasil analisa dengan tab *Tugas*, *Diff*, dan *Log*.
* **Isolasi Sesi:** Riwayat chat dan sesi antar mode terpisah rapi agar tidak saling menumpuk.

---

## 4. Aturan Pemeliharaan (Maintenance Rule)
* Pengeditan file tidak boleh menghilangkan integrasi `copy-helper.js` atau parsing Markdown.
* Perubahan versi Service Worker (`CACHE_NAME`) wajib diperbarui setiap kali ada perubahan file inti.
