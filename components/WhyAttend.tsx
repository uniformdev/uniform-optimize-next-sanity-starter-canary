import { PortableText, urlFor } from '../lib/sanityHelpers';
import { WhyAttendDocument } from '../lib/sanityTypes';

export const WhyAttend: React.FC<WhyAttendDocument> = ({ title, description, image }) => {
  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <div className="w-1/2">
          <img
            src={urlFor(image).url()}
            alt={image.asset.title ?? title}
            width={image.asset?.metadata?.dimensions?.width ?? 400}
            height={image.asset?.metadata?.dimensions?.height ?? 400}
            loading="lazy"
            className="p-10"
          />
        </div>
        <div className="w-1/2">
          <div className="p-10">
            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
              {title}
            </h2>
            <hr />
            <div className="text-gray-800 p-10 whitespace-pre-line">
              <PortableText blocks={description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
