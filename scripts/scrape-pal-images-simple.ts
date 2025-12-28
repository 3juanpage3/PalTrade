import axios from 'axios'
import * as cheerio from 'cheerio'
import * as fs from 'fs'
import * as path from 'path'
import { palworldPals } from '../data/palworld-data'

/**
 * Simple scraper that extracts Pal image URLs from palworld.gg
 * This version uses a more direct approach to find images
 */
async function scrapePalImages(): Promise<void> {
  try {
    console.log('Fetching https://palworld.gg/pals...')
    const response = await axios.get('https://palworld.gg/pals', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    const $ = cheerio.load(response.data)
    const imageMap: Record<string, string> = {}

    console.log('Searching for Pal images...')

    // Method 1: Look for images with Pal names in alt text or nearby text
    $('img').each((index, element) => {
      const $img = $(element)
      const src = $img.attr('src') || $img.attr('data-src') || $img.attr('data-lazy-src')
      const alt = $img.attr('alt') || ''
      
      if (!src) return

      // Check if image URL suggests it's a Pal image
      const isPalImage = src.includes('pal') || 
                        src.includes('Pal') || 
                        alt.toLowerCase().includes('pal') ||
                        /\.(png|jpg|jpeg|webp)$/i.test(src)

      if (isPalImage) {
        // Try to match with our Pal list
        for (const pal of palworldPals) {
          const palNameLower = pal.name.toLowerCase()
          const altLower = alt.toLowerCase()
          
          // Check if alt text contains Pal name
          if (altLower.includes(palNameLower) && !imageMap[pal.id]) {
            const imageUrl = src.startsWith('http') 
              ? src 
              : src.startsWith('//')
              ? `https:${src}`
              : `https://palworld.gg${src.startsWith('/') ? '' : '/'}${src}`
            
            imageMap[pal.id] = imageUrl
            console.log(`Found: ${pal.name} -> ${imageUrl}`)
            break
          }
        }
      }
    })

    // Method 2: Look for specific data structures (table rows, cards, etc.)
    $('tr, .pal-card, [class*="pal"], [data-name]').each((index, element) => {
      const $el = $(element)
      const text = $el.text()
      const img = $el.find('img').first()
      
      if (img.length) {
        const imgSrc = img.attr('src') || img.attr('data-src') || img.attr('data-lazy-src')
        if (imgSrc) {
          // Find matching Pal in text
          for (const pal of palworldPals) {
            if (text.includes(pal.name) && !imageMap[pal.id]) {
              const imageUrl = imgSrc.startsWith('http') 
                ? imgSrc 
                : imgSrc.startsWith('//')
                ? `https:${imgSrc}`
                : `https://palworld.gg${imgSrc.startsWith('/') ? '' : '/'}${imgSrc}`
              
              imageMap[pal.id] = imageUrl
              console.log(`Found (method 2): ${pal.name} -> ${imageUrl}`)
              break
            }
          }
        }
      }
    })

    // Method 3: Try to find images by Pal number/ID pattern
    // Many Pal sites use patterns like /pals/123.png or /images/pal-123.png
    palworldPals.forEach(pal => {
      if (!imageMap[pal.id]) {
        // Try common URL patterns
        const patterns = [
          `https://palworld.gg/images/pals/${pal.id}.png`,
          `https://palworld.gg/images/pals/${pal.name.toLowerCase().replace(/\s+/g, '-')}.png`,
          `https://palworld.gg/assets/pals/${pal.id}.png`,
          `https://palworld.gg/pals/${pal.id}.png`,
        ]

        // We'll just note these patterns but not add them without verification
        // The user can manually verify or we can add a check later
      }
    })

    console.log(`\nFound ${Object.keys(imageMap).length} Pal images`)

    // Save results
    const outputDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Save as JSON
    const jsonPath = path.join(outputDir, 'pal-images.json')
    fs.writeFileSync(jsonPath, JSON.stringify(imageMap, null, 2))
    console.log(`✅ Saved to ${jsonPath}`)

    // Save as TypeScript
    const tsPath = path.join(outputDir, 'pal-images.ts')
    const tsContent = `// Auto-generated Pal image URLs from palworld.gg
// Generated on ${new Date().toISOString()}

export const palImageUrls: Record<string, string> = ${JSON.stringify(imageMap, null, 2)}
`
    fs.writeFileSync(tsPath, tsContent)
    console.log(`✅ Saved to ${tsPath}`)

    // Print summary
    console.log('\n📊 Summary:')
    console.log(`Total Pals in database: ${palworldPals.length}`)
    console.log(`Images found: ${Object.keys(imageMap).length}`)
    console.log(`Missing: ${palworldPals.length - Object.keys(imageMap).length}`)
    
    if (Object.keys(imageMap).length > 0) {
      console.log('\n✅ Success! Image URLs saved.')
      console.log('You can now import and use them:')
      console.log("import { palImageUrls } from '@/data/pal-images'")
    } else {
      console.log('\n⚠️  No images found. The website structure may have changed.')
      console.log('You may need to inspect the page manually or use browser DevTools.')
    }

  } catch (error: any) {
    console.error('❌ Error scraping Pal images:', error.message)
    if (error.response) {
      console.error('Response status:', error.response.status)
      console.error('Response data:', error.response.data?.substring(0, 200))
    }
    throw error
  }
}

// Run if executed directly
if (require.main === module) {
  scrapePalImages().catch(console.error)
}

export { scrapePalImages }

