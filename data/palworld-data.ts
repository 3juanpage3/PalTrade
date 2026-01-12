// Comprehensive Palworld Items and Pals Data
import { palImageUrls } from './pal-images'

// Helper function to get full-size Pal image URL
export function getPalImageUrl(palId: string): string | undefined {
  const thumbnailUrl = palImageUrls[palId.toLowerCase()]
  if (!thumbnailUrl) {
    console.warn(`No image URL found for Pal: ${palId}`)
    return undefined
  }
  
  // Extract the original image path from the thumbnail URL
  // Pattern: https://palworld.gg/_ipx/q_80&s_60x60/images/full_palicon/T_PinkCat_icon_normal.png
  // We want: https://palworld.gg/images/full_palicon/T_PinkCat_icon_normal.png
  const imagePathMatch = thumbnailUrl.match(/\/images\/full_palicon\/([^?&]+)/)
  if (imagePathMatch) {
    const imageName = imagePathMatch[1]
    const directUrl = `https://palworld.gg/images/full_palicon/${imageName}`
    console.log(`Extracted image URL for ${palId}:`, directUrl)
    return directUrl
  }
  
  // Fallback: use the _ipx URL with larger size (these might work)
  const largerUrl = thumbnailUrl.replace(/s_\d+x\d+/g, 's_256x256').replace('q_80', 'q_100')
  console.log(`Using fallback URL for ${palId}:`, largerUrl)
  return largerUrl
}

export const palworldItems = [
  // Materials
  { id: 'wood', name: 'Wood', category: 'Material', description: 'Basic building material' },
  { id: 'stone', name: 'Stone', category: 'Material', description: 'Basic building material' },
  { id: 'fiber', name: 'Fiber', category: 'Material', description: 'Plant-based material' },
  { id: 'ore', name: 'Ore', category: 'Material', description: 'Metal ore for crafting' },
  { id: 'coal', name: 'Coal', category: 'Material', description: 'Fuel source' },
  { id: 'ingot', name: 'Ingot', category: 'Material', description: 'Refined metal' },
  { id: 'polymer', name: 'Polymer', category: 'Material', description: 'Advanced material' },
  { id: 'pal_metal_ingot', name: 'Pal Metal Ingot', category: 'Material', description: 'Rare metal ingot' },
  { id: 'cement', name: 'Cement', category: 'Material', description: 'Building material' },
  { id: 'cloth', name: 'Cloth', category: 'Material', description: 'Fabric material' },
  { id: 'leather', name: 'Leather', category: 'Material', description: 'Animal hide' },
  { id: 'bone', name: 'Bone', category: 'Material', description: 'Animal bone' },
  { id: 'horn', name: 'Horn', category: 'Material', description: 'Animal horn' },
  { id: 'pal_fluids', name: 'Pal Fluids', category: 'Material', description: 'Liquid from Pals' },
  { id: 'pal_oil', name: 'Pal Oil', category: 'Material', description: 'Oil from Pals' },
  { id: 'wheat_seeds', name: 'Wheat Seeds', category: 'Seed', description: 'Wheat crop seeds' },
  { id: 'tomato_seeds', name: 'Tomato Seeds', category: 'Seed', description: 'Tomato crop seeds' },
  { id: 'lettuce_seeds', name: 'Lettuce Seeds', category: 'Seed', description: 'Lettuce crop seeds' },
  { id: 'berry_seeds', name: 'Berry Seeds', category: 'Seed', description: 'Berry crop seeds' },
  
  // Food Items
  { id: 'berry', name: 'Berry', category: 'Food', description: 'Basic food item' },
  { id: 'tomato', name: 'Tomato', category: 'Food', description: 'Vegetable' },
  { id: 'lettuce', name: 'Lettuce', category: 'Food', description: 'Vegetable' },
  { id: 'wheat', name: 'Wheat', category: 'Food', description: 'Grain' },
  { id: 'baked_berry', name: 'Baked Berry', category: 'Food', description: 'Cooked berry' },
  { id: 'fried_egg', name: 'Fried Egg', category: 'Food', description: 'Cooked egg' },
  { id: 'bread', name: 'Bread', category: 'Food', description: 'Baked bread' },
  { id: 'cake', name: 'Cake', category: 'Food', description: 'Sweet dessert' },
  { id: 'honey', name: 'Honey', category: 'Food', description: 'Sweet honey' },
  { id: 'milk', name: 'Milk', category: 'Food', description: 'Dairy product' },
  
  // Weapons
  { id: 'wooden_club', name: 'Wooden Club', category: 'Weapon', description: 'Basic melee weapon' },
  { id: 'stone_axe', name: 'Stone Axe', category: 'Weapon', description: 'Stone tool/weapon' },
  { id: 'stone_pickaxe', name: 'Stone Pickaxe', category: 'Weapon', description: 'Mining tool' },
  { id: 'bow', name: 'Bow', category: 'Weapon', description: 'Ranged weapon' },
  { id: 'crossbow', name: 'Crossbow', category: 'Weapon', description: 'Advanced ranged weapon' },
  { id: 'handgun', name: 'Handgun', category: 'Weapon', description: 'Firearm' },
  { id: 'assault_rifle', name: 'Assault Rifle', category: 'Weapon', description: 'Automatic firearm' },
  { id: 'shotgun', name: 'Shotgun', category: 'Weapon', description: 'Close-range firearm' },
  { id: 'rocket_launcher', name: 'Rocket Launcher', category: 'Weapon', description: 'Explosive weapon' },
  { id: 'sword', name: 'Sword', category: 'Weapon', description: 'Melee weapon' },
  { id: 'spear', name: 'Spear', category: 'Weapon', description: 'Long melee weapon' },
  
  // Armor
  { id: 'cloth_armor', name: 'Cloth Armor', category: 'Armor', description: 'Basic protection' },
  { id: 'leather_armor', name: 'Leather Armor', category: 'Armor', description: 'Light armor' },
  { id: 'metal_armor', name: 'Metal Armor', category: 'Armor', description: 'Heavy armor' },
  { id: 'pal_metal_armor', name: 'Pal Metal Armor', category: 'Armor', description: 'Advanced armor' },
  { id: 'heat_resistant_armor', name: 'Heat Resistant Armor', category: 'Armor', description: 'Fire protection' },
  { id: 'cold_resistant_armor', name: 'Cold Resistant Armor', category: 'Armor', description: 'Ice protection' },
  
  // Accessories
  { id: 'necklace', name: 'Necklace', category: 'Accessory', description: 'Stat boosting accessory' },
  { id: 'ring', name: 'Ring', category: 'Accessory', description: 'Stat boosting accessory' },
  { id: 'shield', name: 'Shield', category: 'Accessory', description: 'Defensive item' },
  
  // Tools
  { id: 'repair_kit', name: 'Repair Kit', category: 'Tool', description: 'Repairs equipment' },
  { id: 'medicine', name: 'Medicine', category: 'Tool', description: 'Healing item' },
  { id: 'antidote', name: 'Antidote', category: 'Tool', description: 'Cures poison' },
  { id: 'pal_sphere', name: 'Pal Sphere', category: 'Tool', description: 'Captures Pals' },
  { id: 'mega_sphere', name: 'Mega Sphere', category: 'Tool', description: 'Improved capture sphere' },
  { id: 'giga_sphere', name: 'Giga Sphere', category: 'Tool', description: 'Advanced capture sphere' },
  { id: 'hyper_sphere', name: 'Hyper Sphere', category: 'Tool', description: 'Elite capture sphere' },
  { id: 'ultra_sphere', name: 'Ultra Sphere', category: 'Tool', description: 'Master capture sphere' },
  
  // Ammunition
  { id: 'arrow', name: 'Arrow', category: 'Ammunition', description: 'Bow ammunition' },
  { id: 'handgun_ammo', name: 'Handgun Ammo', category: 'Ammunition', description: 'Handgun bullets' },
  { id: 'assault_rifle_ammo', name: 'Assault Rifle Ammo', category: 'Ammunition', description: 'Rifle bullets' },
  { id: 'shotgun_shell', name: 'Shotgun Shell', category: 'Ammunition', description: 'Shotgun ammunition' },
  { id: 'rocket', name: 'Rocket', category: 'Ammunition', description: 'Rocket launcher ammo' },
]

export const palworldPals = [
  { id: 'lamball', name: 'Lamball', type: 'Neutral', description: 'A fluffy sheep-like Pal' },
  { id: 'cattiva', name: 'Cattiva', type: 'Neutral', description: 'A cat-like Pal' },
  { id: 'chikipi', name: 'Chikipi', type: 'Neutral', description: 'A chicken-like Pal' },
  { id: 'lifmunk', name: 'Lifmunk', type: 'Grass', description: 'A squirrel-like Pal' },
  { id: 'foxparks', name: 'Foxparks', type: 'Fire', description: 'A fox-like Pal with fire abilities' },
  { id: 'fuack', name: 'Fuack', type: 'Water', description: 'A duck-like Pal' },
  { id: 'sparkit', name: 'Sparkit', type: 'Electric', description: 'An electric mouse-like Pal' },
  { id: 'tanzee', name: 'Tanzee', type: 'Grass', description: 'A monkey-like Pal' },
  { id: 'rooby', name: 'Rooby', type: 'Fire', description: 'A rooster-like Pal' },
  { id: 'pengullet', name: 'Pengullet', type: 'Water', description: 'A penguin-like Pal' },
  { id: 'penking', name: 'Penking', type: 'Water', description: 'A penguin king Pal' },
  { id: 'jolthog', name: 'Jolthog', type: 'Electric', description: 'An electric hedgehog Pal' },
  { id: 'gumoss', name: 'Gumoss', type: 'Grass', description: 'A moss-covered Pal' },
  { id: 'vixy', name: 'Vixy', type: 'Neutral', description: 'A fox-like Pal' },
  { id: 'hoocrates', name: 'Hoocrates', type: 'Dark', description: 'A dark owl-like Pal' },
  { id: 'teafant', name: 'Teafant', type: 'Water', description: 'An elephant-like Pal' },
  { id: 'depresso', name: 'Depresso', type: 'Dark', description: 'A depressed-looking Pal' },
  { id: 'cremis', name: 'Cremis', type: 'Neutral', description: 'A cute fluffy Pal' },
  { id: 'daedream', name: 'Daedream', type: 'Dark', description: 'A dream-like Pal' },
  { id: 'rushoar', name: 'Rushoar', type: 'Ground', description: 'A boar-like Pal' },
  { id: 'nox', name: 'Nox', type: 'Dark', description: 'A nocturnal Pal' },
  { id: 'fuddler', name: 'Fuddler', type: 'Ground', description: 'A mole-like Pal' },
  { id: 'killamari', name: 'Killamari', type: 'Dark', description: 'A squid-like Pal' },
  { id: 'mau', name: 'Mau', type: 'Dark', description: 'A cat-like Pal' },
  { id: 'celeray', name: 'Celeray', type: 'Neutral', description: 'A ray-like Pal' },
  { id: 'direhowl', name: 'Direhowl', type: 'Neutral', description: 'A wolf-like Pal' },
  { id: 'tocotoco', name: 'Tocotoco', type: 'Neutral', description: 'A bird-like Pal' },
  { id: 'flopie', name: 'Flopie', type: 'Grass', description: 'A flower-like Pal' },
  { id: 'mozzarina', name: 'Mozzarina', type: 'Neutral', description: 'A cow-like Pal' },
  { id: 'bristla', name: 'Bristla', type: 'Grass', description: 'A plant-like Pal' },
  { id: 'gobfin', name: 'Gobfin', type: 'Water', description: 'A goblin-like Pal' },
  { id: 'hangyu', name: 'Hangyu', type: 'Ground', description: 'A hanging Pal' },
  { id: 'mossanda', name: 'Mossanda', type: 'Grass', description: 'A panda-like Pal' },
  { id: 'woolypop', name: 'Woolypop', type: 'Neutral', description: 'A sheep-like Pal' },
  { id: 'caprity', name: 'Caprity', type: 'Grass', description: 'A deer-like Pal' },
  { id: 'melpaca', name: 'Melpaca', type: 'Neutral', description: 'An alpaca-like Pal' },
  { id: 'eikthyrdeer', name: 'Eikthyrdeer', type: 'Neutral', description: 'A deer-like Pal' },
  { id: 'nitewing', name: 'Nitewing', type: 'Neutral', description: 'A bird-like Pal' },
  { id: 'ribunny', name: 'Ribunny', type: 'Neutral', description: 'A rabbit-like Pal' },
  { id: 'incineram', name: 'Incineram', type: 'Fire', description: 'A fire demon-like Pal' },
  { id: 'cinnamoth', name: 'Cinnamoth', type: 'Grass', description: 'A moth-like Pal' },
  { id: 'arsleet', name: 'Arsleet', type: 'Ice', description: 'An arctic seal-like Pal' },
  { id: 'dumud', name: 'Dumud', type: 'Ground', description: 'A ground-type Pal' },
  { id: 'cawgnito', name: 'Cawgnito', type: 'Dark', description: 'A crow-like Pal' },
  { id: 'leezpunk', name: 'Leezpunk', type: 'Dark', description: 'A punk-like Pal' },
  { id: 'loupmoon', name: 'Loupmoon', type: 'Dark', description: 'A wolf moon Pal' },
  { id: 'galeclaw', name: 'Galeclaw', type: 'Neutral', description: 'A clawed bird Pal' },
  { id: 'robinquill', name: 'Robinquill', type: 'Grass', description: 'A bird-like Pal' },
  { id: 'gorirat', name: 'Gorirat', type: 'Neutral', description: 'A gorilla-like Pal' },
  { id: 'beegarde', name: 'Beegarde', type: 'Grass', description: 'A bee-like Pal' },
  { id: 'elizabee', name: 'Elizabee', type: 'Grass', description: 'A bee queen Pal' },
  { id: 'grintale', name: 'Grintale', type: 'Neutral', description: 'A cat-like Pal' },
  { id: 'swee', name: 'Swee', type: 'Ice', description: 'An ice-type Pal' },
  { id: 'sweepa', name: 'Sweepa', type: 'Ice', description: 'An ice-type Pal' },
  { id: 'chillet', name: 'Chillet', type: 'Ice', description: 'A chill lizard Pal' },
  { id: 'uniplat', name: 'Uniplat', type: 'Neutral', description: 'A unicorn-like Pal' },
  { id: 'foxcicle', name: 'Foxcicle', type: 'Ice', description: 'An ice fox Pal' },
  { id: 'pyrin', name: 'Pyrin', type: 'Fire', description: 'A fire horse Pal' },
  { id: 'reindrix', name: 'Reindrix', type: 'Ice', description: 'A reindeer-like Pal' },
  { id: 'rayhound', name: 'Rayhound', type: 'Electric', description: 'An electric hound Pal' },
  { id: 'kitsun', name: 'Kitsun', type: 'Fire', description: 'A fire fox Pal' },
  { id: 'dazzi', name: 'Dazzi', type: 'Electric', description: 'An electric Pal' },
  { id: 'lunaris', name: 'Lunaris', type: 'Neutral', description: 'A lunar Pal' },
  { id: 'dinossom', name: 'Dinossom', type: 'Grass', description: 'A dinosaur-like Pal' },
  { id: 'surfent', name: 'Surfent', type: 'Water', description: 'A water serpent Pal' },
  { id: 'maraith', name: 'Maraith', type: 'Dark', description: 'A dark Pal' },
  { id: 'digtoise', name: 'Digtoise', type: 'Ground', description: 'A digging turtle Pal' },
  { id: 'tombat', name: 'Tombat', type: 'Dark', description: 'A bat-like Pal' },
  { id: 'lovander', name: 'Lovander', type: 'Neutral', description: 'A love-themed Pal' },
  { id: 'flambelle', name: 'Flambelle', type: 'Fire', description: 'A fire Pal' },
  { id: 'vanwyrm', name: 'Vanwyrm', type: 'Dark', description: 'A dark wyrm Pal' },
  { id: 'bushi', name: 'Bushi', type: 'Fire', description: 'A samurai-like Pal' },
  { id: 'beakon', name: 'Beakon', type: 'Electric', description: 'An electric beacon Pal' },
  { id: 'ristelle', name: 'Ristelle', type: 'Water', description: 'A water Pal' },
  { id: 'broncherry', name: 'Broncherry', type: 'Grass', description: 'A cherry dinosaur Pal' },
  { id: 'petallia', name: 'Petallia', type: 'Grass', description: 'A petal Pal' },
  { id: 'warsect', name: 'Warsect', type: 'Grass', description: 'A warrior insect Pal' },
  { id: 'felbat', name: 'Felbat', type: 'Dark', description: 'A bat-like Pal' },
  { id: 'quivern', name: 'Quivern', type: 'Dragon', description: 'A dragon-like Pal' },
  { id: 'blazehowl', name: 'Blazehowl', type: 'Fire', description: 'A fire howl Pal' },
  { id: 'relaxaurus', name: 'Relaxaurus', type: 'Dragon', description: 'A relaxed dinosaur Pal' },
  { id: 'broncherry_aqua', name: 'Broncherry Aqua', type: 'Water', description: 'A water cherry dinosaur Pal' },
  { id: 'petallia_noct', name: 'Petallia Noct', type: 'Dark', description: 'A dark petal Pal' },
  { id: 'wumpo', name: 'Wumpo', type: 'Ice', description: 'An ice Pal' },
  { id: 'wumpo_botan', name: 'Wumpo Botan', type: 'Grass', description: 'A grass Pal' },
  { id: 'warsect_alpha', name: 'Warsect Alpha', type: 'Grass', description: 'An alpha warrior insect Pal' },
  { id: 'fenglope', name: 'Fenglope', type: 'Neutral', description: 'A neutral Pal' },
  { id: 'verdash', name: 'Verdash', type: 'Grass', description: 'A grass Pal' },
  { id: 'kitsun_alpha', name: 'Kitsun Alpha', type: 'Fire', description: 'An alpha fire fox Pal' },
  { id: 'lyleen', name: 'Lyleen', type: 'Grass', description: 'A grass Pal' },
  { id: 'lyleen_noct', name: 'Lyleen Noct', type: 'Dark', description: 'A dark Pal' },
  { id: 'faleris', name: 'Faleris', type: 'Fire', description: 'A fire Pal' },
  { id: 'orzerk', name: 'Orzerk', type: 'Electric', description: 'An electric Pal' },
  { id: 'frostallion', name: 'Frostallion', type: 'Ice', description: 'An ice stallion Pal' },
  { id: 'frostallion_noct', name: 'Frostallion Noct', type: 'Dark', description: 'A dark ice stallion Pal' },
  { id: 'jetragon', name: 'Jetragon', type: 'Dragon', description: 'A jet dragon Pal' },
  { id: 'paladius', name: 'Paladius', type: 'Neutral', description: 'A paladin Pal' },
  { id: 'necromus', name: 'Necromus', type: 'Dark', description: 'A necromancer Pal' },
  { id: 'frostallion_alpha', name: 'Frostallion Alpha', type: 'Ice', description: 'An alpha ice stallion Pal' },
  { id: 'jetragon_alpha', name: 'Jetragon Alpha', type: 'Dragon', description: 'An alpha jet dragon Pal' },
]

export const palTypes = ['Neutral', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Ground', 'Dark', 'Dragon']

export const itemCategories = ['Material', 'Food', 'Weapon', 'Armor', 'Accessory', 'Tool', 'Ammunition', 'Seed']

