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

