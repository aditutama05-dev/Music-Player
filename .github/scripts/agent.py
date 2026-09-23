import os
import re
from google import genai

# Ambil API key dan instruksi tugas dari environment
api_key = os.environ.get("GEMINI_API_KEY")
task_prompt = os.environ.get("TASK_PROMPT", "")

client = genai.Client(api_key=api_key)

target_file = "index.html"
current_code = ""

# Baca file index.html jika sebelumnya sudah pernah ada
if os.path.exists(target_file):
    with open(target_file, "r", encoding="utf-8") as f:
        current_code = f.read()

prompt = f"""
Kamu adalah AI coding agent otonom. Tugasmu membuat atau memodifikasi file {target_file}.
Instruksi tugas:
{task_prompt}

Kode saat ini:
{current_code}

Ketentuan output:
Berikan HANYA seluruh kode lengkap untuk file {target_file}.
DILARANG memberikan teks pembuka, penutup, penjelasan, ataupun blok pembungkus markdown seperti ```html.
"""

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
)

new_code = response.text.strip()

# Bersihkan blok markdown jika AI masih menyertakannya
new_code = re.sub(r"^```[a-zA-Z]*\n", "", new_code)
new_code = re.sub(r"\n```$", "", new_code)

with open(target_file, "w", encoding="utf-8") as f:
    f.write(new_code)

print(f"File {target_file} berhasil diperbarui oleh AI Agent.")
