// Item image URLs from Palworld Fandom Wiki
export const itemImageUrls: { [key: string]: string } = {
  // Materials
  wood: "https://static.wikia.nocookie.net/palworld/images/f/f2/Wood_icon.png/revision/latest?cb=20240124033749",
  stone: "https://static.wikia.nocookie.net/palworld/images/3/3b/Stone_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033748",
  fiber: "https://static.wikia.nocookie.net/palworld/images/1/14/Fiber_icon.png/revision/latest/scale-to-width-down/48?cb=20240406025045",
  ore: "https://static.wikia.nocookie.net/palworld/images/0/01/Ore_icon.png/revision/latest/scale-to-width-down/48?cb=20240124114113",
  coal: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",
  ingot: "https://static.wikia.nocookie.net/palworld/images/0/0c/Ingot_icon.png/revision/latest?cb=20240123174835",
  polymer: "https://static.wikia.nocookie.net/palworld/images/d/d4/Polymer_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033746",
  pal_metal_ingot: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",
  cement: "https://static.wikia.nocookie.net/palworld/images/7/71/Cement_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033742",
  cloth: "https://static.wikia.nocookie.net/palworld/images/f/f7/Cloth_icon.png/revision/latest/scale-to-width-down/48?cb=20240122173642",
  leather: "https://static.wikia.nocookie.net/palworld/images/9/9a/Leather_icon.png/revision/latest?cb=20240121070758",
  bone: "https://static.wikia.nocookie.net/palworld/images/8/80/Bone_icon.png/revision/latest/scale-to-width-down/48?cb=20240405194033",
  horn: "https://static.wikia.nocookie.net/palworld/images/6/6c/Horn_icon.png/revision/latest/scale-to-width-down/48?cb=20240409120137",
  pal_fluids: "https://static.wikia.nocookie.net/palworld/images/e/e8/Pal_Fluids_icon.png/revision/latest?cb=20240121071006",
  pal_oil: "https://static.wikia.nocookie.net/palworld/images/3/3c/Crude_Oil_icon.png/revision/latest/scale-to-width-down/48?cb=20240627043306",

  // Seeds
  wheat_seeds: "https://static.wikia.nocookie.net/palworld/images/e/ed/Wheat_Seeds_icon.png/revision/latest?cb=20240121074212",
  tomato_seeds: "https://static.wikia.nocookie.net/palworld/images/e/e7/Tomato_Seeds_icon.png/revision/latest?cb=20240121130810",
  lettuce_seeds: "https://static.wikia.nocookie.net/palworld/images/8/8a/Lettuce_Seeds_icon.png/revision/latest?cb=20240121130649",
  berry_seeds: "https://static.wikia.nocookie.net/palworld/images/c/c3/Berry_Seeds_icon.png/revision/latest?cb=20240121070549",

  // Food (using seed icons as fallback for now)
  berry: "https://static.wikia.nocookie.net/palworld/images/c/c3/Berry_Seeds_icon.png/revision/latest?cb=20240121070549",
  tomato: "https://static.wikia.nocookie.net/palworld/images/e/e7/Tomato_Seeds_icon.png/revision/latest?cb=20240121130810",
  lettuce: "https://static.wikia.nocookie.net/palworld/images/8/8a/Lettuce_Seeds_icon.png/revision/latest?cb=20240121130649",
  wheat: "https://static.wikia.nocookie.net/palworld/images/e/ed/Wheat_Seeds_icon.png/revision/latest?cb=20240121074212",
  baked_berry: "https://static.wikia.nocookie.net/palworld/images/c/c3/Berry_Seeds_icon.png/revision/latest?cb=20240121070549",
  fried_egg: "https://static.wikia.nocookie.net/palworld/images/c/c3/Berry_Seeds_icon.png/revision/latest?cb=20240121070549",
  bread: "https://static.wikia.nocookie.net/palworld/images/e/ed/Wheat_Seeds_icon.png/revision/latest?cb=20240121074212",
  cake: "https://static.wikia.nocookie.net/palworld/images/c/c3/Berry_Seeds_icon.png/revision/latest?cb=20240121070549",
  honey: "https://static.wikia.nocookie.net/palworld/images/e/e8/Pal_Fluids_icon.png/revision/latest?cb=20240121071006",
  milk: "https://static.wikia.nocookie.net/palworld/images/e/e8/Pal_Fluids_icon.png/revision/latest?cb=20240121071006",

  // Weapons (using placeholder stone icon for now)
  wooden_club: "https://static.wikia.nocookie.net/palworld/images/3/3b/Stone_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033748",
  stone_axe: "https://static.wikia.nocookie.net/palworld/images/3/3b/Stone_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033748",
  stone_pickaxe: "https://static.wikia.nocookie.net/palworld/images/0/01/Ore_icon.png/revision/latest/scale-to-width-down/48?cb=20240124114113",
  bow: "https://static.wikia.nocookie.net/palworld/images/1/14/Fiber_icon.png/revision/latest/scale-to-width-down/48?cb=20240406025045",
  crossbow: "https://static.wikia.nocookie.net/palworld/images/1/14/Fiber_icon.png/revision/latest/scale-to-width-down/48?cb=20240406025045",
  handgun: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",
  assault_rifle: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",
  shotgun: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",
  rocket_launcher: "https://static.wikia.nocookie.net/palworld/images/d/d4/Polymer_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033746",
  sword: "https://static.wikia.nocookie.net/palworld/images/0/0c/Ingot_icon.png/revision/latest?cb=20240123174835",
  spear: "https://static.wikia.nocookie.net/palworld/images/0/0c/Ingot_icon.png/revision/latest?cb=20240123174835",

  // Armor
  cloth_armor: "https://static.wikia.nocookie.net/palworld/images/f/f7/Cloth_icon.png/revision/latest/scale-to-width-down/48?cb=20240122173642",
  leather_armor: "https://static.wikia.nocookie.net/palworld/images/9/9a/Leather_icon.png/revision/latest?cb=20240121070758",
  metal_armor: "https://static.wikia.nocookie.net/palworld/images/0/0c/Ingot_icon.png/revision/latest?cb=20240123174835",
  pal_metal_armor: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",

  // Accessories
  ring: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",
  amulet: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",
  necklace: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",

  // Tools
  pickaxe: "https://static.wikia.nocookie.net/palworld/images/0/01/Ore_icon.png/revision/latest/scale-to-width-down/48?cb=20240124114113",
  axe: "https://static.wikia.nocookie.net/palworld/images/f/f2/Wood_icon.png/revision/latest?cb=20240124033749",
  fishing_rod: "https://static.wikia.nocookie.net/palworld/images/1/14/Fiber_icon.png/revision/latest/scale-to-width-down/48?cb=20240406025045",
  torch: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",
  lantern: "https://static.wikia.nocookie.net/palworld/images/f/ff/Coal_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033744",

  // Crafting Materials
  ancient_technology_point: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",
  fragment: "https://static.wikia.nocookie.net/palworld/images/3/3b/Stone_icon.png/revision/latest/scale-to-width-down/48?cb=20240124033748",
  sphere: "https://static.wikia.nocookie.net/palworld/images/3/34/Pal_Metal_Ingot_icon.png/revision/latest/scale-to-width-down/48?cb=20240124120017",
  potion: "https://static.wikia.nocookie.net/palworld/images/e/e8/Pal_Fluids_icon.png/revision/latest?cb=20240121071006",
  poison: "https://static.wikia.nocookie.net/palworld/images/3/3c/Crude_Oil_icon.png/revision/latest/scale-to-width-down/48?cb=20240627043306",
};
  leather:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧤%3C/text%3E%3C/svg%3E",
  bone: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFFFF0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🦴%3C/text%3E%3C/svg%3E",
  horn: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23A9A9A9' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E♪%3C/text%3E%3C/svg%3E",
  pal_fluids:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%231E90FF' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E💧%3C/text%3E%3C/svg%3E",
  pal_oil:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B0000' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🛢%3C/text%3E%3C/svg%3E",

  // Seeds
  wheat_seeds:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23D2B48C' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🌾%3C/text%3E%3C/svg%3E",
  tomato_seeds:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF6347' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍅%3C/text%3E%3C/svg%3E",
  lettuce_seeds:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2390EE90' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🥬%3C/text%3E%3C/svg%3E",
  berry_seeds:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B00FF' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🫐%3C/text%3E%3C/svg%3E",

  // Food
  berry:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B00FF' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🫐%3C/text%3E%3C/svg%3E",
  tomato:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF6347' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍅%3C/text%3E%3C/svg%3E",
  lettuce:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2390EE90' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🥬%3C/text%3E%3C/svg%3E",
  wheat:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23DAA520' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🌾%3C/text%3E%3C/svg%3E",
  baked_berry:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23654321' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍞%3C/text%3E%3C/svg%3E",
  fried_egg:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFFF99' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍳%3C/text%3E%3C/svg%3E",
  bread:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23D2691E' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍞%3C/text%3E%3C/svg%3E",
  cake: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFB6C1' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍰%3C/text%3E%3C/svg%3E",
  honey:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🍯%3C/text%3E%3C/svg%3E",
  milk: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23F0F8FF' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🥛%3C/text%3E%3C/svg%3E",

  // Weapons
  wooden_club:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏏%3C/text%3E%3C/svg%3E",
  stone_axe:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23808080' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🪓%3C/text%3E%3C/svg%3E",
  stone_pickaxe:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23A9A9A9' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⛏%3C/text%3E%3C/svg%3E",
  bow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏹%3C/text%3E%3C/svg%3E",
  crossbow:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23654321' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏹%3C/text%3E%3C/svg%3E",
  handgun:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  assault_rifle:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23556B2F' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  shotgun:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23000000' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  rocket_launcher:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF4500' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🚀%3C/text%3E%3C/svg%3E",
  sword:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23C0C0C0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⚔%3C/text%3E%3C/svg%3E",
  spear:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23A9A9A9' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🗡%3C/text%3E%3C/svg%3E",

  // Armor
  cloth_armor:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234169E1' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E👕%3C/text%3E%3C/svg%3E",
  leather_armor:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧥%3C/text%3E%3C/svg%3E",
  metal_armor:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🛡%3C/text%3E%3C/svg%3E",
  pal_metal_armor:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E👑%3C/text%3E%3C/svg%3E",

  // Accessories
  ring: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E💍%3C/text%3E%3C/svg%3E",
  amulet:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B008B' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E📿%3C/text%3E%3C/svg%3E",
  necklace:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF69B4' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E📿%3C/text%3E%3C/svg%3E",

  // Tools
  pickaxe:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⛏%3C/text%3E%3C/svg%3E",
  axe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23808080' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🪓%3C/text%3E%3C/svg%3E",
  fishing_rod:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23228B22' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🎣%3C/text%3E%3C/svg%3E",
  torch:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF8C00' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔥%3C/text%3E%3C/svg%3E",
  lantern:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFFF00' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏮%3C/text%3E%3C/svg%3E",

  // Crafting Materials
  ancient_technology_point:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238A2BE2' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E✨%3C/text%3E%3C/svg%3E",
  fragment:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23DC143C' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E💥%3C/text%3E%3C/svg%3E",
  sphere:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2300CED1' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔮%3C/text%3E%3C/svg%3E",
  potion:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF1493' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧪%3C/text%3E%3C/svg%3E",
  poison:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234B0082' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E☠%3C/text%3E%3C/svg%3E",
};
