/**
 * Server-only: live content API (defineLive from next-sanity/live).
 * Only import this file from React Server Components — never from client
 * components, as defineLive() throws at module evaluation time if executed
 * outside RSC context.
 */
import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ useCdn: false }),
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
})
