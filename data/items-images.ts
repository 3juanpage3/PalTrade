// Item image URLs using SVG data URLs with emojis for visual identification
export const itemImageUrls: { [key: string]: string } = {
  // Materials
  wood: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🌲%3C/text%3E%3C/svg%3E",
  stone:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23808080' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🪨%3C/text%3E%3C/svg%3E",
  fiber:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23DAA520' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E📦%3C/text%3E%3C/svg%3E",
  ore: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⛏%3C/text%3E%3C/svg%3E",
  coal: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23000000' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⚫%3C/text%3E%3C/svg%3E",
  ingot:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23C0C0C0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🟫%3C/text%3E%3C/svg%3E",
  polymer:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF69B4' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🎀%3C/text%3E%3C/svg%3E",
  pal_metal_ingot:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⭐%3C/text%3E%3C/svg%3E",
  cement:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23D3D3D3' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏗%3C/text%3E%3C/svg%3E",
  cloth:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23F5DEB3' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧵%3C/text%3E%3C/svg%3E",
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
  wooden_club: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏏%3C/text%3E%3C/svg%3E",
  stone_axe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23808080' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🪓%3C/text%3E%3C/svg%3E",
  stone_pickaxe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23A9A9A9' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⛏%3C/text%3E%3C/svg%3E",
  bow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏹%3C/text%3E%3C/svg%3E",
  crossbow: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23654321' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏹%3C/text%3E%3C/svg%3E",
  handgun: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  assault_rifle: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23556B2F' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  shotgun: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23000000' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔫%3C/text%3E%3C/svg%3E",
  rocket_launcher: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF4500' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🚀%3C/text%3E%3C/svg%3E",
  sword: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23C0C0C0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⚔%3C/text%3E%3C/svg%3E",
  spear: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23A9A9A9' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🗡%3C/text%3E%3C/svg%3E",

  // Armor
  cloth_armor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234169E1' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E👕%3C/text%3E%3C/svg%3E",
  leather_armor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B4513' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧥%3C/text%3E%3C/svg%3E",
  metal_armor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🛡%3C/text%3E%3C/svg%3E",
  pal_metal_armor: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E👑%3C/text%3E%3C/svg%3E",

  // Accessories
  ring: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFD700' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E💍%3C/text%3E%3C/svg%3E",
  amulet: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238B008B' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E📿%3C/text%3E%3C/svg%3E",
  necklace: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF69B4' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E📿%3C/text%3E%3C/svg%3E",

  // Tools
  pickaxe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23696969' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E⛏%3C/text%3E%3C/svg%3E",
  axe: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23808080' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🪓%3C/text%3E%3C/svg%3E",
  fishing_rod: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23228B22' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🎣%3C/text%3E%3C/svg%3E",
  torch: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF8C00' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔥%3C/text%3E%3C/svg%3E",
  lantern: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FFFF00' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🏮%3C/text%3E%3C/svg%3E",

  // Crafting Materials
  ancient_technology_point: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%238A2BE2' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E✨%3C/text%3E%3C/svg%3E",
  fragment: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23DC143C' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E💥%3C/text%3E%3C/svg%3E",
  sphere: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%2300CED1' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🔮%3C/text%3E%3C/svg%3E",
  potion: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23FF1493' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E🧪%3C/text%3E%3C/svg%3E",
  poison: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%234B0082' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='60' fill='white' text-anchor='middle' dominant-baseline='middle'%3E☠%3C/text%3E%3C/svg%3E",
};
