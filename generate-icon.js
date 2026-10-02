const fs = require('fs');

// Placeholder ikon PNG 1x1 transparan valid berstandar PNG
// Digunakan sebagai fallback aset bila PNG belum diunggah manual
const minimalPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const buffer = Buffer.from(minimalPngBase64, 'base64');
fs.writeFileSync('icon-512.png', buffer);
console.log('icon-512.png berhasil disiapkan.');
