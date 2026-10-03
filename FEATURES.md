# 📌 Katalog Fitur Aplikasi (Personal AI & Codex Agent)

Dokumen ini berfungsi sebagai rekam jejak spesifikasi fitur proyek. Setiap pembaruan atau modifikasi dilarang menghapus atau merusak fungsi yang tercantum di bawah ini.

---

## 1. Arsitektur & Deployment
* **Tipe Aplikasi:** Progressive Web App (PWA) berbasis web mandiri.
* **Hosting:** GitHub Pages.
* **CI/CD:** GitHub Actions (`.github/workflows/build-release.yml`) untuk verifikasi integritas berkas, pembuatan fallback ikon, dan rilis zip otomatis.
* **PWA Engine:** `sw.js` (Service Worker caching dinamis - versi aktif `v5`) dan `pwa-register.js` untuk mode fullscreen serta instalasi layar utama HP.

---

## 2. Antarmuka Pengguna (UI/UX)
* **Tema Visual:** Dark Mode modern minimalis bergaya Google Gemini.
* **Navigasi Sidebar Drawer:**
  * Tombol `＋ Chat Baru`.
  * Navigasi Mode (`💬 Chat Bebas`, `🤖 AI Agent`, `🎨 Buat Gambar`).
  * Daftar riwayat percakapan interaktif (`active-chat`) dengan indikator sematan (`📌`).
  * Tombol opsi titik tiga (`⋮`) di setiap sesi obrolan yang memicu **Bottom Sheet** ala Gemini:
    * 📌 **Sematkan / Lepas Sematan:** Menempatkan obrolan prioritas di posisi teratas.
    * ✏️ **Ganti Nama:** Mengubah judul sesi percakapan secara langsung.
    * 🗑️ **Hapus:** Menghapus sesi obrolan secara permanen dari penyimpanan perangkat.
  * Tombol akses cepat pengaturan token GitHub.
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

### A. Mode Chat Bebas (Uncensored)
* Integrasi teks melalui Pollinations AI API.
* Prompt sistem objektif, lugas, dan bebas batasan filter.
* Riwayat chat tersimpan lokal di perangkat (`localStorage`).
* Menyertakan konteks metadata nama berkas jika pengguna melampirkan file pada pesan chat.

### B. Mode Buat Gambar & Generator Chat Kontekstual
* Integrasi generasi visual otomatis via Pollinations Image API (`image.pollinations.ai`).
* Resolusi tinggi `1024x1024`, model `flux`, dan peningkatan detail otomatis (`enhance=true`).
* **Multi-Keyword Natural Trigger:** Mengetik di obrolan umum dengan awalan seperti *"buat gambar"*, *"bikinin gue gambar"*, *"bikin gambar"*, *"gambar"*, *"lukis"*, *"buat foto"*, atau *"buatkan foto"* otomatis langsung merender visual tanpa harus berpindah mode.
* **Contextual Revision & Seed Locking:**
  * Mendeteksi instruksi modifikasi (seperti *"ubah outfit"*, *"ganti baju"*, *"pakaikan jaket"*, dll.).
  * Mengunci nilai `seed` dan menggabungkan konteks prompt terakhir sehingga karakter dan komposisi wajah tetap konsisten tanpa teracak ulang.
* **Image Action Tools Minimalis (Ala Gemini):**
  * Tombol aksi disajikan dalam bentuk pill melengkung murni ikon SVG tanpa teks:
    * 📥 **Simpan / Unduh:** Mengunduh file visual langsung ke memori perangkat.
    * 📋 **Salin:** Menyalin URL/tautan visual ke clipboard.

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
* Pengeditan file tidak boleh menghilangkan integrasi `copy-helper.js`, parsing Markdown, Action Bar respon AI, bottom sheet riwayat, tombol aksi gambar, atau pengelolaan attachment.
* Perubahan versi Service Worker (`CACHE_NAME`) wajib dinaikkan setiap kali ada perubahan file inti agar browser pengguna segera memperbarui cache.
* 
