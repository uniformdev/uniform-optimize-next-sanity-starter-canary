import Head from 'next/head';
import { PageDocument, TalkDocument } from '../lib/sanityTypes';
import { createElement } from 'react';
import { TalksContext } from '../components/TalksContext';
import MainHero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import { PersonalizedHero } from '../components/PersonalizedHero';
import { ComponentMapping } from '../lib/ComponentMapping';
import TalkList from '../components/TalkList';
import { RegisterForm } from '../components/RegisterForm';
import { WhyAttend } from './WhyAttend';

export interface PageProps {
  slug: string;
  page: PageDocument;
  talks: TalkDocument[];
}

const componentMapping: ComponentMapping = {
  hero: MainHero,
  callToAction: CallToAction,
  personalizedHero: PersonalizedHero,
  talksList: TalkList,
  registrationForm: RegisterForm,
  whyAttend: WhyAttend,
};

export function Home({ page, talks }: PageProps) {
  return (
    <TalksContext.Provider value={talks}>
      <Head>
        <title>{page?.title} | UniformConf</title>
      </Head>
      {page?.components &&
        page.components.map((component, index) =>
          createElement(componentMapping[component._type] ?? (() => null), {
            key: index,
            ...component,
          })
        )}
    </TalksContext.Provider>
  );
}
