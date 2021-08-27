import { IntentTags } from '@uniformdev/optimize-common';
import { PersonalizableListItem } from '@uniformdev/optimize-tracker-common';
import { SanityDocument } from './sanityTypes';

/**
 * This function is used for mapping certain properties found on a Sanity document to "known"
 * Optimize properties that can be used by the Optimize tracker and behavior tracking functionality.
 * @param document
 */
export function mapSanityDocumentToPersonalizableItem<TDoc extends SanityDocument>(
  document: TDoc
): TDoc & PersonalizableListItem {
  // parse the intent tags field (if it hasn't already been parsed)
  const parsedDocument = parseIntentTagsField(document);
  return {
    ...document,
    type: document._type,
    intentTag: parsedDocument.unfrmOptIntentTag,
  };
}

/**
 * This function mutates the provided document, parsing the `unfrmOptIntentTag` field to JSON if the field exists on the document.
 */
export function parseIntentTagsField<T extends SanityDocument>(document: T): T {
  if (
    document &&
    document.unfrmOptIntentTag &&
    typeof document.unfrmOptIntentTag.uniformIntentTags === 'string'
  ) {
    // note: due to Sanity schema structure, the field name is `unfrmOptIntentTag` but the _actual_ field value that we're interested
    // in is nested within `unfrmOptIntentTag.uniformIntentTags`.
    (document as any).unfrmOptIntentTag = JSON.parse(
      (document.unfrmOptIntentTag?.uniformIntentTags as any) || '{}'
    ) as IntentTags;
  }
  return document;
}
