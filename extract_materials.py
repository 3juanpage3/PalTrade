#!/usr/bin/env python3
"""Extract material image URLs from Palworld Fandom wiki"""

import re
import json
import subprocess

# Get the page content using PowerShell
ps_command = """
$page = Invoke-WebRequest -Uri 'https://palworld.fandom.com/wiki/Materials' -UseBasicParsing -UserAgent 'Mozilla/5.0';
$page.Content
"""

try:
    result = subprocess.run(['powershell', '-Command', ps_command], capture_output=True, text=True, timeout=30)
    page_content = result.stdout
    
    print(f"Page content length: {len(page_content)}")
    
    # Extract all image URLs
    image_urls = re.findall(r'https://static\.wikia\.nocookie\.net/palworld/images/[^"<>\s]+_icon\.png[^"<>\s]*', page_content)
    
    print(f"Total material icon URLs found: {len(image_urls)}")
    
    # Show unique URLs
    unique_urls = list(set(image_urls))
    print(f"Unique URLs: {len(unique_urls)}")
    
    # Print first 20 for inspection
    print("\nFirst 20 URLs:")
    for i, url in enumerate(unique_urls[:20]):
        print(f"{i+1}. {url}")
    
    # Parse them
    material_urls = {}
    for url in unique_urls:
        # Extract the filename from the URL
        match = re.search(r'images/[a-z0-9/]+/([^/]+?)_icon\.png', url)
        if match:
            name = match.group(1).replace('_', ' ')
            key = match.group(1).lower()
            material_urls[key] = url
    
    print(f"\nParsed materials:")
    for key, url in sorted(material_urls.items()):
        print(f"{key}: {url[:80]}...")
    
    # Save results
    with open('material_urls.json', 'w') as f:
        json.dump(material_urls, f, indent=2)
    
    print(f"\nSaved {len(material_urls)} material URLs to material_urls.json")
    
except Exception as e:
    import traceback
    print(f"Error: {e}")
    traceback.print_exc()
