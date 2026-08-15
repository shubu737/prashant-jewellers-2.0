import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID || 'pjj05gg6'

const dataset =
  import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  if (!source) return null

  try {
    return builder.image(source)
  } catch {
    return null
  }
}