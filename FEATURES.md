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
* **Input Bar & Lampiran File:**
  * Tombol bulat `＋` di sisi kiri yang terhubung langsung ke dialog pemilihan file/gambar perangkat (`#file-uploader`).
  * Bar pratinjau lampiran (`#attachment-preview-bar`) tepat di atas input teks dengan pill nama file dan tombol hapus (`✕`).
  * Dukungan render pratinjau badge file/gambar yang dikirim pengguna di dalam bubble percakapan.
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
* Menyertakan konteks metadata nama berkas jika pengguna melampirkan file pada pesan chat.

### B. Mode Buat Gambar & Generator Chat Langsung
* Integrasi generasi visual otomatis via Pollinations Image API (`image.pollinations.ai`).
* **Multi-Keyword Natural Trigger:** Mengetik di obrolan umum dengan awalan kata seperti *"buat gambar"*, *"buatkan gambar"*, *"bikin gambar"*, *"gambar"*, *"lukis"*, *"buat foto"*, atau *"buatkan foto"* otomatis langsung mengeksekusi pembuatan gambar tanpa harus berpindah mode.
* **Image Action Tools:** Setiap gambar yang dirender dilengkapi 3 tombol aksi:
  * 📥 **Unduh:** Mengunduh berkas gambar langsung ke penyimpanan HP (format JPG).
  * 📋 **Salin:** Menyalin URL/tautan gambar langsung ke clipboard perangkat.
  * 🔗 **Bagikan:** Membuka menu share bawaan sistem Android (Web Share API) untuk membagikan gambar langsung ke aplikasi lain.

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
* Pengeditan file tidak boleh menghilangkan integrasi `copy-helper.js`, parsing Markdown, tombol aksi gambar, atau pengelolaan attachment.
* Perubahan versi Service Worker (`CACHE_NAME`) wajib dinaikkan setiap kali ada perubahan file inti agar browser pengguna segera memperbarui cache.
* 
