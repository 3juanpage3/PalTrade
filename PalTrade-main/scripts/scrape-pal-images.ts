import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import * as path from 'path'
import { palworldPals } from '../data/palworld-data'

interface PalImage {
  name: string
  id: string
  imageUrl: string
}

// Normalize Pal names to match website format
function normalizePalName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

async function scrapePalImages(): Promise<void> {
  try {
    console.log('Fetching Palworld.gg page...')
    const response = await axios.get('https://palworld.gg/pals', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    const palImages: PalImage[] = []

    console.log('Parsing HTML for Pal images...')

    // Find all Pal entries - they seem to be in elements with class or data attributes
    // Looking for img tags that contain Pal images
    $('img').each((index, element) => {
      const $img = $(element)
      const src = $img.attr('src') || $img.attr('data-src')
      const alt = $img.attr('alt') || ''
      
      // Check if this is a Pal image (usually contains 'pal' in the URL or alt text)
      if (src && (src.includes('pal') || src.includes('Pal') || alt.toLowerCase().includes('pal'))) {
        // Try to extract Pal name from alt text or nearby elements
        const palName = alt.replace(/pal|Pal/gi, '').trim()
        
        if (palName) {
          // Find matching Pal in our data
          const matchingPal = palworldPals.find(p => 
            p.name.toLowerCase() === palName.toLowerCase() ||
            normalizePalName(p.name) === normalizePalName(palName)
          )

          if (matchingPal) {
            // Convert relative URLs to absolute
            const imageUrl = src.startsWith('http') 
              ? src 
              : `https://palworld.gg${src.startsWith('/') ? '' : '/'}${src}`

            palImages.push({
              name: matchingPal.name,
              id: matchingPal.id,
              imageUrl: imageUrl
            })
          }
        }
      }
    })

    // Also try to find images in data attributes or specific containers
    $('[data-pal], .pal-item, .pal-card').each((index, element) => {
      const $el = $(element)
      const palName = $el.attr('data-pal') || $el.find('.pal-name').text().trim()
      const imgSrc = $el.find('img').attr('src') || $el.find('img').attr('data-src')
      
      if (palName && imgSrc) {
        const matchingPal = palworldPals.find(p => 
          p.name.toLowerCase() === palName.toLowerCase() ||
          normalizePalName(p.name) === normalizePalName(palName)
        )

        if (matchingPal && !palImages.find(p => p.id === matchingPal.id)) {
          const imageUrl = imgSrc.startsWith('http') 
            ? imgSrc 
            : `https://palworld.gg${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`

          palImages.push({
            name: matchingPal.name,
            id: matchingPal.id,
            imageUrl: imageUrl
          })
        }
      }
    })

    // Try alternative approach - look for images in table rows or list items
    $('tr, li, .pal').each((index, element) => {
      const $el = $(element)
      const text = $el.text()
      const img = $el.find('img').first()
      
      if (img.length) {
        const imgSrc = img.attr('src') || img.attr('data-src')
        if (imgSrc) {
          // Try to find Pal name in the element's text
          for (const pal of palworldPals) {
            if (text.includes(pal.name) && !palImages.find(p => p.id === pal.id)) {
              const imageUrl = imgSrc.startsWith('http') 
                ? imgSrc 
                : `https://palworld.gg${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`

              palImages.push({
                name: pal.name,
                id: pal.id,
                imageUrl: imageUrl
              })
              break
            }
          }
        }
      }
    })

    console.log(`Found ${palImages.length} Pal images`)

    // Create images directory if it doesn't exist
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'pals')
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }

    // Save image URLs mapping
    const imageMap: Record<string, string> = {}
    palImages.forEach(pal => {
      imageMap[pal.id] = pal.imageUrl
    })

    // Save to JSON file
    const outputPath = path.join(process.cwd(), 'data', 'pal-images.json')
    fs.writeFileSync(outputPath, JSON.stringify(imageMap, null, 2))
    console.log(`Saved image URLs to ${outputPath}`)

    // Also create a TypeScript file for easy import
    const tsOutput = `// Auto-generated Pal image URLs from palworld.gg
export const palImageUrls: Record<string, string> = ${JSON.stringify(imageMap, null, 2)}
`
    const tsOutputPath = path.join(process.cwd(), 'data', 'pal-images.ts')
    fs.writeFileSync(tsOutputPath, tsOutput)
    console.log(`Saved TypeScript file to ${tsOutputPath}`)

    // Download images (optional - uncomment if you want to download)
    console.log('\nDownloading images...')
    for (const pal of palImages.slice(0, 10)) { // Download first 10 as test
      try {
        const imageResponse = await axios.get(pal.imageUrl, {
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        const ext = path.extname(pal.imageUrl) || '.png'
        const filename = `${pal.id}${ext}`
        const filepath = path.join(imagesDir, filename)
        
        fs.writeFileSync(filepath, imageResponse.data)
        console.log(`Downloaded: ${pal.name} -> ${filename}`)
      } catch (error) {
        console.error(`Failed to download ${pal.name}:`, error)
      }
    }

    console.log('\n✅ Scraping complete!')
    console.log(`Found ${palImages.length} Pal images`)
    console.log(`Downloaded ${Math.min(10, palImages.length)} images to public/images/pals/`)

  } catch (error) {
    console.error('Error scraping Pal images:', error)
    throw error
  }
}

// Run the scraper
scrapePalImages().catch(console.error)

