import { GetStaticPaths, GetStaticProps } from 'next';
import { Home, PageProps } from '../components/Home';
import { getEntriesByContentType, getPageBySlug } from '../lib/api';
import { TalkDocument } from '../lib/sanityTypes';

export default Home;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  let slug = context.params?.slug ? `/${(context.params.slug as string[]).join('/')}` : '/';

  if (slug === '/index') {
    slug = '/';
  }

  const page = getPageBySlug(context.preview, slug);

  const talks = getEntriesByContentType<TalkDocument>(context.preview, 'talk');

  return {
    props: {
      slug,
      page: await page,
      talks: (await talks) ?? [],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['/', '/developers', '/marketers', '/registration'],
    fallback: false,
  };
};
