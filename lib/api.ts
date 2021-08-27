import { createClient, ClientConfig } from 'next-sanity';
import { parseIntentTagsField } from './optimizeHelpers';
import { PageDocument, SanityDocument } from './sanityTypes';

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('SANITY_PROJECT_ID env not set.');
}

if (!process.env.SANITY_DATASET) {
  throw new Error('SANITY_DATASET env not set.');
}

export const config: ClientConfig = {
  dataset: process.env.SANITY_DATASET || 'production',
  projectId: process.env.SANITY_PROJECT_ID,
  /**
   * Set useCdn to `false` if your application requires the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: false,
  apiVersion: '2021-03-25',
};

const client = createClient(config);

const previewClient = createClient({
  ...config,
  useCdn: false,
  // sanity api token is optional - only necessary if needing to make authenticated requests to sanity api.
  // note: api token is secret, should not be exposed to client.
  token: process.env.SANITY_API_TOKEN,
});

const getClient = (preview) => (preview ? previewClient : client);

export const getPageBySlug = async (preview: boolean, slug: string): Promise<PageDocument> => {
  // The page query can contain arbitrary `reference` types to components, so we
  // need to use GROQ reference projection combined with object expansion `...` to
  // "expand" all fields for each component. This works well for top-level, non-reference fields.
  // However, our `PersonalizedHero` content type contains a `heroVariations` field that is an array of references.
  // Sanity will not expand those references by default when querying, so we have to tell
  // it to expand the `heroVariations` references and include all fields for each referenced object.
  // Furthermore, each `hero` object contains an `image` field that is also not expanded by default,
  // so we need to add expansion for that nested field as well. The same is true for other content types
  // that contain a top-level `image` field.
  const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    components[]->{
      ...,
      heroVariations[]->{
      	...,
        image {
          ...,
        	asset->
      	}
      },
			image {
        ...,
        asset->
      }
    }
  }`;

  const result = await getClient(preview).fetch<PageDocument>(pageQuery, { slug });
  // try to help out devs by parsing intent tag fields to JSON instead of requiring devs to parse in their components.
  result.components = result.components.map(parseIntentTagsField);
  return result;
};

export const getEntriesByContentType = async <T extends SanityDocument>(
  preview: boolean,
  type: string
): Promise<T[]> => {
  const query = `*[_type == $contentType]`;

  const result = await getClient(preview).fetch<T[]>(query, { contentType: type });

  // try to help out devs by parsing intent tag fields to JSON instead of requiring devs to parse in their components.
  return result.map(parseIntentTagsField);
};
