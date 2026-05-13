import json
import shutil
import os

SOURCE = r"C:\Program Files\Epic Games\rocketleague\TAGame\CookedPCConsole"
DEST = "files"

os.makedirs(DEST, exist_ok=True)

with open("items.json", "r", encoding="utf-8") as f:
    data = json.load(f)

copied = 0
missing = 0

for item in data:

    filename = item["name"]

    src = os.path.join(SOURCE, filename)
    dst = os.path.join(DEST, filename)

    if os.path.exists(src):
        shutil.copy2(src, dst)
        copied += 1
        print("Copied:", filename)

    else:
        missing += 1
        print("Missing:", filename)

print()
print("Done!")
print("Copied:", copied)
print("Missing:", missing)