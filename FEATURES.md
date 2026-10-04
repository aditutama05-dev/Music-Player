# 📌 Katalog Fitur Aplikasi (Personal AI & Codex Agent)

Dokumen ini berfungsi sebagai rekam jejak spesifikasi fitur proyek. Setiap pembaruan atau modifikasi dilarang menghapus atau merusak fungsi yang tercantum di bawah ini.

---

## 1. Arsitektur & Deployment
* **Tipe Aplikasi:** Progressive Web App (PWA) berbasis web mandiri.
* **Hosting:** GitHub Pages.
* **CI/CD:** GitHub Actions (`.github/workflows/build-release.yml`) untuk verifikasi integritas berkas, pembuatan fallback ikon, dan rilis zip otomatis.
* **PWA Engine:** `sw.js` (Service Worker caching dinamis - versi aktif `v6`) dan `pwa-register.js` untuk mode fullscreen serta instalasi layar utama HP.

---

## 2. Antarmuka Pengguna (UI/UX)
* **Tema Visual:** Dark Mode modern minimalis bergaya Google Gemini, kontras tinggi dan ramah aksesibilitas (Low Vision Friendly).
* **Navigasi Sidebar Satu Pintu (Universal Single View):**
  * Tombol `＋ Chat Baru`.
  * Daftar riwayat percakapan interaktif (`active-chat`) dengan indikator sematan (`📌`).
  * **Tombol Hapus Langsung (`✕`):** Tombol merah tegas di setiap item riwayat untuk menghapus sesi secara instan tanpa perlu membuka menu tambahan.
  * Tombol opsi titik tiga (`⋮`) di setiap sesi obrolan yang memicu **Bottom Sheet** ala Gemini:
    * 📌 **Sematkan / Lepas Sematan:** Menempatkan obrolan prioritas di posisi teratas.
    * ✏️ **Ganti Nama:** Mengubah judul sesi percakapan secara langsung.
    * 🗑️ **Hapus:** Menghapus sesi obrolan secara permanen dari penyimpanan perangkat.
  * Tombol akses cepat pengaturan token GitHub di footer sidebar.
* **Action Bar Respon AI (Ala Gemini):**
  * Setiap balasan teks dari AI dilengkapi baris alat interaktif:
    * 🔄 **Muat Ulang (Regenerate):** Mengirim ulang input terakhir untuk variasi jawaban baru.
    * 📋 **Salin:** Menyalin seluruh teks jawaban ke clipboard.
    * 🔊 **Speaker (TTS):** Membacakan teks secara suara alami lewat Web Speech Synthesis API.
    * ⋯ **Menu Ekspor:** Membuka modal ekspor berkas ke format dokumen (`.txt` / `.doc`).
* **Input Bar & Lampiran File:**
  * Tombol bulat `＋` di sisi kiri yang terhubung langsung ke dialog pemilihan file/gambar perangkat (`#file-uploader`).
  * Bar pratinjau lampiran (`#attachment-preview-bar`) tepat di atas input teks dengan pill nama file dan tombol hapus (`✕`).
  * Dukungan render pratinjau badge file/gambar yang dikirim pengguna di dalam bubble percakapan.
  * Input bar responsif dengan pemicu `Enter` atau tombol `Kirim`.
* **Markdown & Code Engine:**
  * Integrasi pustaka `Marked.js` untuk parsing Markdown lengkap (tabel, list, formatting).
  * Integrasi `Highlight.js` dengan tema `atom-one-dark` untuk pewarnaan sintaks kodingan.
  * Tombol salin kode modern (`copy-helper.js`) dengan ikon dokumen SVG yang berubah menjadi centang saat berhasil disalin.

---

## 3. Fitur Utama & Mode AI

### A. Obrolan Universal & Memori Belajar Mandiri (Long-Term Memory)
* Integrasi teks melalui Pollinations AI API (uncensored, cerdas, dan lugas).
* **Fitur Belajar Mandiri (Self-Learning Memory):** Fungsi `learnUserPreferences` membaca preferensi, panggilan, serta instruksi kerja pengguna secara otomatis di latar belakang dan menyimpannya ke `localStorage` (`ai_user_memories`).
* **Injeksi Konteks Otomatis:** Preferensi yang telah dipelajari otomatis disuntikkan ke dalam instruksi sistem di setiap percakapan baru tanpa perlu mengulang dari awal.
* Riwayat chat tersimpan lokal di perangkat (`localStorage`).
* Menyertakan konteks metadata nama berkas jika pengguna melampirkan file pada pesan chat.

### B. Generator Visual & Revisi Kontekstual (Bebas Watermark)
* Integrasi generasi visual otomatis via Pollinations Image API (`image.pollinations.ai`).
* Resolusi tinggi `1024x1024`, model `flux`, peningkatan detail otomatis (`enhance=true`), serta bebas watermark (`nologo=true` & `private=true`).
* **Multi-Keyword Natural Trigger:** Mengetik di obrolan umum dengan awalan seperti *"buat gambar"*, *"bikinin gue gambar"*, *"bikin gambar"*, *"gambar"*, *"lukis"*, *"buat foto"*, atau *"buatkan foto"* otomatis langsung merender visual tanpa berpindah menu.
* **Contextual Revision & Seed Locking:**
  * Mendeteksi instruksi modifikasi (seperti *"ubah outfit"*, *"ganti baju"*, *"pakaikan jaket"*, dll.).
  * Mengunci nilai `seed` dan menumpuk konteks prompt terakhir sehingga karakter dan komposisi wajah tetap konsisten tanpa teracak ulang.
* **Image Action Tools Minimalis (Ala Gemini):**
  * Tombol aksi berbentuk pill oval minimalis murni ikon SVG tanpa teks:
    * 📋 **Salin:** Menyalin tautan visual ke clipboard.
    * 📥 **Simpan / Unduh:** Mengunduh file visual langsung ke memori perangkat.

### C. Generator Video (Video Diffusion)
* Integrasi generasi video otomatis via Pollinations Video Engine.
* **Pemicu Alami:** Cukup ketik perintah seperti *"buat video..."*, *"bikinin gue video..."*, *"bikin video..."*, atau *"generate video..."* langsung di obrolan umum.
* **Pemutar Video Interaktif:** Merender tag `<video>` responsif dengan kontrol playback, autoplay, loop, serta dilengkapi tombol **Salin Tautan Video** dan **Simpan Video**.

### D. Mode AI Agent (Codex GitHub)
* **Autentikasi Lokal:** Input GitHub Personal Access Token (PAT) disimpan aman di `localStorage` tanpa terekspos ke backend publik.
* **Antarmuka Mandiri:** Tampilan bergaya ChatGPT Codex Cloud:
  * Pemilihan repositori pengguna via REST API GitHub.
  * Pemilihan cabang (*branch*) aktif (misal `main`).
  * Area instruksi perbaikan kode/analisa bug.
  * Panel hasil analisa dengan tab *Tugas*, *Diff*, dan *Log*.
* **Isolasi Sesi:** Riwayat chat dan sesi antar mode terpisah rapi agar tidak saling menumpuk.

---

## 4. Aturan Pemeliharaan (Maintenance Rule)
* Pengeditan file tidak boleh menghilangkan integrasi `copy-helper.js`, parsing Markdown, Action Bar respon AI, bottom sheet riwayat, tombol aksi gambar/video, atau pengelolaan attachment.
* Perubahan versi Service Worker (`CACHE_NAME`) wajib dinaikkan setiap kali ada perubahan file inti agar browser pengguna segera memperbarui cache.
