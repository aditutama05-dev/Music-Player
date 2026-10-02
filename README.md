# Personal AI Codex

Aplikasi Personal AI berbasis web mandiri (PWA) dengan antarmuka modern ala ChatGPT / Gemini, terintegrasi dengan GitHub Codex Agent dan generator gambar tanpa batas ketat.

## 🚀 Fitur Utama
- **💬 Chat Bebas:** Model AI berbasis Pollinations API, respons cepat, minim batasan/filter moralitas kaku, dan 100% gratis.
- **💻 GitHub Codex Agent:** Kelola dan inspeksi repositori GitHub langsung melalui perintah chat menggunakan GitHub Personal Access Token (PAT).
- **🎨 Studio Gambar:** Generator gambar AI instan tanpa login dan tanpa kuota.
- **📱 PWA Ready:** Dapat dipasang langsung di Android/iOS layaknya aplikasi native tanpa perlu menjalankan Termux.
- **📦 Auto Release:** Setiap commit ke branch `main` otomatis memicu GitHub Actions dan mempublikasikan paket aplikasi ke menu **Releases / Tags**.

---

## 🛠️ Cara Mengaktifkan GitHub Pages (Hosting Gratis)
1. Buka repositori ini di GitHub.
2. Masuk ke tab **Settings** > menu **Pages** (di sidebar kiri).
3. Di bagian **Build and deployment**:
   - **Source:** Pilih `Deploy from a branch`.
   - **Branch:** Pilih `main` dan folder `/ (root)`.
4. Klik **Save**. Tunggu sekitar 1–2 menit hingga link web muncul (misal: `https://<username>.github.io/<nama-repo>`).

---

## 📲 Cara Memasang Jadi Aplikasi di HP
1. Buka link GitHub Pages kamu di browser Chrome HP.
2. Tunggu banner **"📲 Pasang Aplikasi ke Layar Utama"** muncul di bawah layar, lalu klik banner tersebut.
3. Alternatif: Tekan titik tiga di pojok kanan atas browser > pilih **"Tambahkan ke Layar Utama"** atau **"Install App"**.
4. Ikon aplikasi akan langsung muncul di drawer HP kamu.

---

## 🔑 Mengatur GitHub Token (Khusus Mode Codex)
1. Buka aplikasi yang sudah terpasang di HP.
2. Buka sidebar > klik tombol **⚙️ Pengaturan GitHub Token**.
3. Masukkan GitHub Personal Access Token (PAT) kamu (`repo` scope).
4. Klik **Simpan**. Token tersimpan secara aman di penyimpanan lokal HP kamu.
