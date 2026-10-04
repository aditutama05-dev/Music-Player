# 📌 Katalog Fitur Aplikasi (Alicia - Personal AI & Codex Agent)

Dokumen ini berfungsi sebagai rekam jejak spesifikasi fitur proyek. Setiap pembaruan atau modifikasi dilarang menghapus atau merusak fungsi yang tercantum di bawah ini.

---

## 1. Arsitektur & Deployment
* **Tipe Aplikasi:** Progressive Web App (PWA) berbasis web mandiri.
* **Identitas AI:** Alicia.
* **Hosting:** GitHub Pages.
* **CI/CD:** GitHub Actions (`.github/workflows/build-release.yml`) untuk verifikasi integritas berkas, pembuatan fallback ikon, dan rilis zip otomatis.
* **PWA Engine:** `sw.js` (Service Worker caching dinamis - versi aktif `v7`) dan `pwa-register.js` untuk mode fullscreen serta instalasi layar utama HP.

---

## 2. Antarmuka Pengguna (UI/UX)
* **Tema Visual:** Dark Mode modern minimalis bergaya Google Gemini, kontras tinggi dan ramah aksesibilitas (*Low Vision Friendly*).
* **Navigasi Sidebar Alicia:**
  1. **Obrolan baru:** Tombol utama membuat sesi percakapan baru dengan ikon tambah bulat.
  2. **Avatar:** Akses cepat ke studio visual perancangan karakter avatar.
  3. **AI Agent:** Studio analisa koding dan perbaikan GitHub Codex.
  4. **Video:** Studio pembuatan dan pemutaran video berbasis difusi.
  5. **Koleksi:** Galeri arsip terpadu untuk meninjau seluruh gambar dan video yang pernah digenerate.
  6. **Riwayat:** Daftar riwayat percakapan dengan label ringkas *"Riwayat"* dan tombol hapus langsung (`✕`) merah tegas di setiap item.
* **Kotak Input Bar Ala Gemini:**
  * Wadah masukan teks berbasis `<textarea>` multi-baris yang otomatis meluas ke atas (*auto-grow*) tanpa menggeser teks ke samping.
  * Mempertahankan struktur baris baru, enter, dan paragraf (*white-space: pre-wrap*) saat menempel teks panjang dari catatan eksternal.
  * Kartu pratinjau thumbnail gambar/lampiran terintegrasi di dalam bar input sebelum pesan dikirim.
  * Tombol kirim bulat dengan ikon panah ke atas yang kontras dan tegas.
* **Action Bar Respon AI:**
  * 🔄 **Muat Ulang (Regenerate):** Mengirim ulang prompt terakhir untuk variasi jawaban baru.
  * 📋 **Salin:** Menyalin seluruh teks jawaban ke clipboard.
  * 🔊 **Speaker (TTS):** Membacakan teks dengan Web Speech Synthesis, diposisikan mandiri di sudut paling kanan (`margin-left: auto;`) agar bebas dari himpitan tombol lain.
  * Menu titik tiga (⋯) dihilangkan demi kesederhanaan dan kejelasan navigasi.
* **Markdown & Code Engine:**
  * Integrasi pustaka `Marked.js` dengan opsi `breaks: true` dan `gfm: true`.
  * Integrasi `Highlight.js` dengan tema `atom-one-dark` untuk sintaks kodingan.
  * Tombol salin blok kode modern (`copy-helper.js`) dengan ikon dokumen SVG yang berubah menjadi tanda centang saat berhasil disalin.

---

## 3. Fitur Utama & Mode AI

### A. Obrolan Utama & Long-Term Memory (Alicia)
* Integrasi teks melalui Pollinations AI API (uncensored, objektif, solutif, dan ramah).
* **Fitur Belajar Mandiri (Self-Learning Memory):** Fungsi `learnUserPreferences` otomatis membaca preferensi, panggilan, serta instruksi kerja pengguna di latar belakang dan menyimpannya ke `localStorage` (`ai_user_memories`).
* **Injeksi Konteks Otomatis:** Memori preferensi yang telah dipelajari otomatis disuntikkan ke dalam instruksi sistem di setiap obrolan baru tanpa perlu mengulang dari awal.
* Riwayat percakapan tersimpan aman secara lokal di perangkat (`localStorage`).

### B. Generator Visual Kontekstual & Bebas Watermark
* Integrasi generasi visual otomatis via Pollinations Image API (`image.pollinations.ai`).
* Resolusi tinggi `1024x1024`, model `flux`, peningkatan detail otomatis (`enhance=true`), serta bebas watermark (`nologo=true` & `private=true`).
* **Multi-Keyword Natural Trigger:** Mengetik di obrolan umum dengan awalan seperti *"buat gambar"*, *"bikinin gue gambar"*, *"bikin gambar"*, *"gambar"*, *"lukis"*, *"buat foto"*, atau *"buatkan foto"* otomatis langsung merender gambar tanpa berpindah menu.
* **Contextual Revision & Seed Locking:**
  * Mendeteksi instruksi modifikasi (seperti *"ubah outfit"*, *"ganti baju"*, *"pakaikan jaket"*, dll.).
  * Mengunci nilai `seed` dan menumpuk konteks prompt terakhir sehingga karakter dan komposisi wajah tetap konsisten tanpa teracak ulang.
* **Tombol Aksi Gambar Minimalis:**
  * Tombol berbentuk pill oval dengan ikon murni tanpa teks:
    * 📋 **Salin:** Menyalin tautan gambar ke clipboard.
    * 📥 **Simpan / Unduh:** Mengunduh file visual langsung ke memori perangkat.

### C. Generator Video (Video Diffusion)
* Integrasi generasi video otomatis via Pollinations Video Engine.
* **Pemicu Alami:** Cukup ketik perintah seperti *"buat video..."*, *"bikinin gue video..."*, *"bikin video..."*, atau *"generate video..."* langsung di obrolan umum maupun via menu Video.
* **Pemutar Video Interaktif:** Merender tag `<video>` responsif dengan kontrol pemutar, putar otomatis, loop, serta dilengkapi tombol **Salin Tautan Video** dan **Simpan Video**.

### D. Mode AI Agent (Codex GitHub) & Koleksi Media
* **Autentikasi Lokal:** Input GitHub Personal Access Token (PAT) disimpan di `localStorage`. Tombol pengaturan token disematkan langsung di dalam panel AI Agent.
* **Antarmuka Codex Cloud:** Pemilihan repositori, pemilihan cabang (*branch*), instruksi perbaikan, serta panel hasil analisa (*Tugas*, *Diff*, *Log*).
* **Modal Koleksi Media:** Menampilkan seluruh hasil gambar dan video yang pernah digenerate dalam format kisi (*grid*) yang rapi.

---

## 4. Aturan Pemeliharaan (Maintenance Rule)
* Pengeditan file tidak boleh merusak fungsi parsing Markdown, Action Bar respon AI, tombol aksi media, atau penanganan attachment.
* Perubahan versi Service Worker (`CACHE_NAME`) wajib dinaikkan setiap kali ada modifikasi berkas inti agar browser perangkat segera memperbarui cache.
