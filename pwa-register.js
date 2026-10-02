// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('PWA Service Worker terdaftar:', reg.scope);
      })
      .catch((err) => {
        console.error('PWA Service Worker gagal:', err);
      });
  });
}

// Menangkap event instalasi PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Tampilkan notifikasi kecil di UI jika aplikasi belum diinstal
  const installBanner = document.createElement('div');
  installBanner.id = 'pwa-install-banner';
  installBanner.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #004a77;
    color: #c2e7ff;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    z-index: 999;
  `;
  installBanner.innerText = '📲 Pasang Aplikasi ke Layar Utama';
  
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
                        
