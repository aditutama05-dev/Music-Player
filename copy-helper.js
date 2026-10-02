// Helper untuk menyematkan tombol Copy di setiap blok kode
function attachCodeCopyButtons(container) {
  const codeBlocks = container.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    if (pre.querySelector('.btn-copy-code')) return;

    pre.style.position = 'relative';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-copy-code';
    copyBtn.innerText = 'Salin';
    copyBtn.style.cssText = `
      position: absolute;
      top: 6px;
      right: 6px;
      background: #2b2c2f;
      color: #c4c7c5;
      border: 1px solid #3c4043;
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 11px;
      cursor: pointer;
      opacity: 0.85;
      z-index: 10;
    `;

    copyBtn.onclick = async () => {
      const code = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.innerText = 'Tersalin!';
        copyBtn.style.color = '#a8c7fa';
        setTimeout(() => {
          copyBtn.innerText = 'Salin';
          copyBtn.style.color = '#c4c7c5';
        }, 2000);
      } catch (err) {
        copyBtn.innerText = 'Gagal';
      }
    };

    pre.appendChild(copyBtn);
  });
}

window.attachCodeCopyButtons = attachCodeCopyButtons;
