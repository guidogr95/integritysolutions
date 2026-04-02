import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

// Use inferred type to avoid resolution issues with @sanity/image-url internals
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

const builder = createImageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
