import re
import json

path = r"C:\Users\dmlda\.gemini\antigravity\brain\5949174f-cbe9-4509-a238-ad733a27df57\.system_generated\steps\210\content.md"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for JSON data in the script tags or anywhere in the HTML that contains document metadata.
# Drive usually puts folder contents in a JS array or JSON structure.
# Let's search for filenames and IDs.
# Common formats in Google Drive page:
# [id, name, mimeType, ...] or similar.
# Let's look for common image patterns or file extensions: .jpg, .png, .webp, .jpeg, etc.
# Or just find all strings that look like a Drive file ID.

print("--- FILE NAME SEARCH ---")
matches = re.findall(r'"([^"\\]+\.(?:jpg|png|webp|jpeg|gif|svg))"', content, re.IGNORECASE)
unique_matches = sorted(list(set(matches)))
for m in unique_matches:
    print("Found image name:", m)

print("\n--- GOOGLE DRIVE IDs & URLs ---")
# Drive direct download / view urls or file IDs
# IDs are usually 33 characters long, alphanumeric, hyphens, underscores.
# Example: 1F0IGP3AL7IHfdHdv9JdETHHoxxHQvDSa is the folder ID. File IDs look similar.
drive_ids = re.findall(r'[-\w]{28,40}', content)
# Filter ids that look like valid base64url or hex and are in the vicinity of file names or drive terms
# Let's search for urls containing drive.google.com or drive/folders or similar
urls = re.findall(r'https?://[^\s"\'<>]+', content)
unique_urls = sorted(list(set(urls)))
for u in unique_urls:
    if "drive" in u or "googleusercontent" in u:
        print("URL:", u)

# Let's also print some lines surrounding image names to find associations between names and IDs.
print("\n--- CONTEXTS OF IMAGE NAMES ---")
for name in unique_matches[:15]:
    pos = 0
    while True:
        idx = content.lower().find(name.lower(), pos)
        if idx == -1:
            break
        start = max(0, idx - 300)
        end = min(len(content), idx + 300)
        print(f"Context for {name}:")
        print(content[start:end])
        print("-" * 50)
        pos = idx + len(name)
        if pos >= len(content):
            break
