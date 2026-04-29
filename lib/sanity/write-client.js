import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '../../sanity/env'

const token = process.env.SANITY_API_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})
