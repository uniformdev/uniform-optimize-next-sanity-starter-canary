import { Personalize } from '@uniformdev/optimize-tracker-react';
import { mapSanityDocumentToPersonalizableItem } from '../lib/optimizeHelpers';
import { PersonalizedHeroDocument } from '../lib/sanityTypes';
import Hero from './Hero';
import Splitter from './Splitter';

const PersonalizedHeroLoading = () => {
  return (
    <>
      <div className="pt-24">
        <div
          className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center"
          style={{ height: '548px' }}
        >
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
            <p className="uppercase tracking-loose w-full"></p>
            <h1 className="my-4 text-5xl font-bold leading-tight"></h1>
            <p className="leading-normal text-2xl mb-8"></p>
          </div>
          <div className="w-full md:w-3/5 py-6 text-center"></div>
        </div>
      </div>
      <Splitter />
    </>
  );
};

export const PersonalizedHero: React.FC<PersonalizedHeroDocument> = ({ heroVariations }) => {
  const variations = heroVariations.map(mapSanityDocumentToPersonalizableItem);

  return (
    <Personalize
      variations={variations}
      trackingEventName="heroPersonalized"
      component={Hero}
      loadingMode={PersonalizedHeroLoading}
    />
  );
};
