import React from 'react';
import { PersonalizableListItem } from '@uniformdev/optimize-tracker-common';
import { TalkDocument, TalksListDocument } from '../lib/sanityTypes';
import { useContext } from 'react';
import { TalksContext } from './TalksContext';
import { Personalize } from '@uniformdev/optimize-tracker-react';
import { PortableText } from '../lib/sanityHelpers';
import { mapSanityDocumentToPersonalizableItem } from '../lib/optimizeHelpers';

const TalkList: React.FC<TalksListDocument> = ({
  numberToShow,
  registerButtonText,
  title,
  titleWhenPersonalized,
}) => {
  const talks = useContext(TalksContext);

  const personalizableTalks = talks.map(mapSanityDocumentToPersonalizableItem);

  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        {talks && (
          <Personalize
            variations={personalizableTalks}
            component={(props) => <TalkListItem {...props} buttonText={registerButtonText} />}
            count={numberToShow}
            trackingEventName="talkListPersonalized"
            matchFilter="any"
            wrapperComponent={({ personalizationOccurred, children }) => (
              <>
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                  {personalizationOccurred ? titleWhenPersonalized : title}
                </h1>
                <div className="w-full mb-4">
                  <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
                </div>
                {children}
              </>
            )}
          />
        )}
      </div>
    </section>
  );
};

const TalkListItem: React.FC<TalkDocument & { buttonText: string } & PersonalizableListItem> = (props) => {
  const { title, description, intentTag } = props;

  let intents = [];
  if (intentTag) {
    intents = Object.keys(intentTag.intents);
  }

  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
          <div className="mt-3 mb-3 flex items-center justify-start">
            {intents.map((intentId, key) => (
              <IntentLabel key={key} intentId={intentId} />
            ))}
          </div>
        </div>
        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
          <div className="w-full font-bold text-xl text-gray-800 px-6">{title}</div>
        </a>
        <div className="text-gray-800 px-6 pb-6 text-sm">
          <PortableText blocks={description} />
        </div>
      </div>
    </div>
  );
};

export interface IIntentLabelProps {
  intentId: string | undefined;
}

const IntentLabel: React.FC<IIntentLabelProps> = (props) => {
  const { intentId } = props;

  if (!intentId) {
    return null;
  }

  if (intentId == '72ba66d0-0478-4d62-9ef4-5461c89b1ffc' || intentId === 'dev') {
    return (
      <span className="ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        Developers
      </span>
    );
  }

  if (intentId == '0d77df8f-a903-4163-befb-008bd061d454' || intentId === 'marketer') {
    return (
      <span className="ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
        Marketers
      </span>
    );
  }

  return (
    <span className="ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
      Unknown
    </span>
  );
};

export default TalkList;
