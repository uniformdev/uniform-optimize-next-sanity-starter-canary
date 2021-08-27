import { ImageAsset } from '@sanity/types';
import { IntentTags } from '@uniformdev/optimize-common';

// the `SanityDocument` type from `@sanity/types` includes `[key: string]: unknown`
// and therefore isn't restrictive enough. i.e. it doesn't warn you when you're
// trying to reference a field/property that isn't defined on the generic type.
// Therefore, we borrow/copy the `SanityDocument` type from `@sanity/client`.
// Why not just do `import { SanityDocument } from '@sanity/client'?
// Because we can't assume @sanity/client is a dependency.
export type SanityDocument<T extends Record<string, any> = Record<string, any>> = {
  [P in keyof T]: T[P];
} & {
  _id: string;
  _rev: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export interface PersonalizedHeroFields {
  /** Hero Options */
  heroVariations?: HeroDocument[] | undefined;
}

export type PersonalizedHeroDocument = SanityDocument<PersonalizedHeroFields>;

export interface CallToActionFields {
  /** Heading */
  heading?: string | undefined;

  /** Subheading */
  subheading?: string | undefined;

  /** Button Link */
  buttonLink?: string | undefined;

  /** Button Text */
  buttonText?: string | undefined;

  /** Button Image */
  buttonImage?: ImageField | undefined;
}

export type CallToActionDocument = SanityDocument<CallToActionFields>;

export interface HeroFields {
  /** Title */
  title: string;

  /** Description */
  description: string;

  /** Button Text */
  buttonText?: string | undefined;

  /** image */
  image?: ImageField | undefined;

  /** Intent Tags */
  unfrmOptIntentTag?: IntentTags;

  /** Button Link Slug */
  buttonLinkSlug?: string | undefined;
}

export type HeroDocument = SanityDocument<HeroFields>;

export interface PageFields {
  /** Title */
  title?: string | undefined;

  /** Slug */
  slug?: string | undefined;

  /** Components */
  components?:
    | (
        | CallToActionDocument
        | HeroDocument
        | PersonalizedHeroDocument
        | RegistrationFormDocument
        | TalksListDocument
        | WhyAttendDocument
      )[]
    | undefined;
}

export type PageDocument = SanityDocument<PageFields>;

export interface RegistrationFormFields {
  /** Heading */
  heading?: string | undefined;

  /** ButtonText */
  buttonText?: string | undefined;

  /** Registered Text */
  registeredText?: string | undefined;
}

export type RegistrationFormDocument = SanityDocument<RegistrationFormFields>;

export interface TalkFields {
  /** Title */
  title?: string | undefined;

  /** Description */
  description?: Document | undefined;

  /** Intent Tags */
  unfrmOptIntentTag?: IntentTags | undefined;
}

export type TalkDocument = SanityDocument<TalkFields>;

export interface TalksListFields {
  /** Title */
  title?: string | undefined;

  /** Title When Personalized */
  titleWhenPersonalized?: string | undefined;

  /** NumberToShow */
  numberToShow?: number | undefined;

  /** Register Button Text */
  registerButtonText?: string | undefined;
}

export type TalksListDocument = SanityDocument<TalksListFields>;

export interface WhyAttendFields {
  /** Title */
  title?: string | undefined;

  /** Description */
  description?: string | undefined;

  /** Image */
  image?: ImageField | undefined;
}

export type WhyAttendDocument = SanityDocument<WhyAttendFields>;

export type ImageField = {
  _type: 'image';
  asset: ImageAsset & { title: string };
};
