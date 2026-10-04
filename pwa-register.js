// Register Service Worker Alicia
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('Alicia Service Worker terdaftar:', reg.scope);

        // Deteksi pembaruan Service Worker baru otomatis
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Pembaruan baru Alicia tersedia.');
              }
            };
          }
        };
      })
      .catch((err) => {
        console.error('Alicia Service Worker gagal:', err);
      });
  });
}

// Menangkap event instalasi PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Hindari penumpukan banner ganda
  const existingBanner = document.getElementById('pwa-install-banner');
  if (existingBanner) existingBanner.remove();

  // Tampilkan tombol instalasi mengambang ramah aksesibilitas
  const installBanner = document.createElement('div');
  installBanner.id = 'pwa-install-banner';
  installBanner.style.cssText = `
    position: fixed;
    bottom: 85px;
    left: 50%;
    transform: translateX(-50%);
    background: #004a77;
    color: #ffffff;
    border: 1px solid #3880ff;
    padding: 10px 20px;
    border-radius: 24px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.6);
    z-index: 9999;
    white-space: nowrap;
  `;
  installBanner.innerText = '📲 Pasang Alicia ke Layar Utama';

  installBanner.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installBanner.remove();
      }
      deferredPrompt = null;
    }
  };

  document.body.appendChild(installBanner);
});

// Bersihkan banner jika aplikasi sudah terpasang
window.addEventListener('appinstalled', () => {
  const existingBanner = document.getElementById('pwa-install-banner');
  if (existingBanner) existingBanner.remove();
  deferredPrompt = null;
  console.log('Alicia berhasil dipasang ke Layar Utama.');
});
                        
