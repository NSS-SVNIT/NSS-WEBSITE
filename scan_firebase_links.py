import os
import re

PROJECT_DIR = "src"   # scans everything inside src folder

firebase_pattern = r'https://firebasestorage[^\s"\']+'

found_any = False

for root, dirs, files in os.walk(PROJECT_DIR):
    for file in files:
        if file.endswith((".js", ".jsx", ".ts", ".tsx", ".json")):
            path = os.path.join(root, file)

            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()

            urls = re.findall(firebase_pattern, content)
            if urls:
                found_any = True
                print(f"\n📄 File: {path}")
                for url in urls:
                    print("   🔗", url)

if not found_any:
    print("❌ No Firebase links found in src folder")
