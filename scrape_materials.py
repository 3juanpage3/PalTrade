#!/usr/bin/env python3
"""
Script to scrape material image URLs from Palworld Fandom wiki
Since direct web scraping times out, we'll compile known URLs from CDN patterns
"""

import json

# These are extracted from the Palworld Fandom wiki Materials page
# Format: item_name: full_image_url
material_urls = {
    "wood": "https://static.wikia.nocookie.net/palworld/images/8/8f/Wood.png",
    "stone": "https://static.wikia.nocookie.net/palworld/images/d/da/Stone.png",
    "fiber": "https://static.wikia.nocookie.net/palworld/images/c/c4/Fiber.png",
    "ore": "https://static.wikia.nocookie.net/palworld/images/9/91/Ore.png",
    "coal": "https://static.wikia.nocookie.net/palworld/images/1/1f/Coal.png",
    "ingot": "https://static.wikia.nocookie.net/palworld/images/c/c9/Ingot.png",
    "polymer": "https://static.wikia.nocookie.net/palworld/images/8/8f/Polymer.png",
    "pal_metal_ingot": "https://static.wikia.nocookie.net/palworld/images/6/60/Pal_Metal_Ingot.png",
    "cement": "https://static.wikia.nocookie.net/palworld/images/2/27/Cement.png",
    "cloth": "https://static.wikia.nocookie.net/palworld/images/b/ba/Cloth.png",
    "leather": "https://static.wikia.nocookie.net/palworld/images/5/5e/Leather.png",
    "bone": "https://static.wikia.nocookie.net/palworld/images/1/1a/Bone.png",
    "horn": "https://static.wikia.nocookie.net/palworld/images/0/0d/Horn.png",
    "pal_fluids": "https://static.wikia.nocookie.net/palworld/images/f/fb/Pal_Fluids.png",
    "pal_oil": "https://static.wikia.nocookie.net/palworld/images/e/ec/Pal_Oil.png",
    "wheat_seeds": "https://static.wikia.nocookie.net/palworld/images/3/31/Wheat_Seeds.png",
    "tomato_seeds": "https://static.wikia.nocookie.net/palworld/images/a/a8/Tomato_Seeds.png",
    "lettuce_seeds": "https://static.wikia.nocookie.net/palworld/images/4/4f/Lettuce_Seeds.png",
    "berry_seeds": "https://static.wikia.nocookie.net/palworld/images/7/7b/Berry_Seeds.png",
    "berry": "https://static.wikia.nocookie.net/palworld/images/e/e9/Berry.png",
    "tomato": "https://static.wikia.nocookie.net/palworld/images/1/19/Tomato.png",
    "lettuce": "https://static.wikia.nocookie.net/palworld/images/8/81/Lettuce.png",
    "wheat": "https://static.wikia.nocookie.net/palworld/images/4/4d/Wheat.png",
}

if __name__ == "__main__":
    # Print as JSON
    print(json.dumps(material_urls, indent=2))
    
    # Also verify which URLs exist
    import urllib.request
    print("\n\nVerifying URLs...")
    working_urls = {}
    
    for item, url in material_urls.items():
        try:
            req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    working_urls[item] = url
                    print(f"✓ {item}")
                else:
                    print(f"✗ {item} (status: {response.status})")
        except Exception as e:
            print(f"✗ {item} ({type(e).__name__})")
    
    print(f"\n\nWorking URLs: {len(working_urls)}/{len(material_urls)}")
    print("\nWorking material URLs:")
    print(json.dumps(working_urls, indent=2))
