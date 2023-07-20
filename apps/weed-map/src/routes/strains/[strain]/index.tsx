import {
  component$,
  useStore,
  useStyles$,
  useStylesScoped$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { getSupabaseClient } from '@api/client';
import StrainStyles from './strain.css?inline';

export const head: DocumentHead = {
  title: 'Weed Map - Strain Detail',
  meta: [
    {
      name: 'description',
      content: 'Store detail...',
    },
  ],
};

const mockStrain = {
  id: 1,
  slug: 'strain1',
  name: 'Strain name 2',
  img_url: 'https://images.leafly.com/flower-images/gg-4.jpg',
  rating: {
    value: 4.6,
    count: 5142,
    likes: 82265,
  },
  created_at: '2023-07-09T12:54:01.829421+00:00',
  updated_at: '2023-07-09T12:54:01.829421+00:00',
  genetic: 'Sativa',
  purity: { min: 90, max: 100 },
  thc: { min: 20, max: 20 },
  cbd: { min: 0, max: 0 },
  price: { min: 10, max: 15, currency: 'USD' },
  parents: ['strain2'],
  aliases: ['Gorilla Glue', 'Sticky Glue'],
  description:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam bibendum elit eget erat. Nullam eget nisl. Duis condimentum augue id magna semper rutrum. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris metus. In enim a arcu imperdiet malesuada. Integer lacinia. Mauris elementum mauris vitae tortor. Aliquam in lorem sit amet leo accumsan lacinia. Fusce tellus. Etiam commodo dui eget wisi. Nulla pulvinar eleifend sem. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Nulla quis diam. Praesent dapibus. Quisque porta. Aliquam in lorem sit amet leo accumsan lacinia. Praesent vitae arcu tempor neque lacinia pretium.',
  feelings: [
    { name: 'relaxed', evidence: 30 },
    { name: 'sleepy', evidence: 30 },
    { name: 'hungry', evidence: 30 },
  ],
  negatives: [
    { name: 'dry mouth', evidence: 30 },
    { name: 'paranoid', evidence: 30 },
    { name: 'dry eyes', evidence: 30 },
  ],
  helps: [
    { name: 'stress', evidence: 30 },
    { name: 'anxiety', evidence: 30 },
    { name: 'pain', evidence: 30 },
  ],
  flavors: [
    { name: 'pungent', evidence: 30 },
    { name: 'pine', evidence: 30 },
    { name: 'earthy', evidence: 30 },
  ],
  terpene_dominant: 'caryophyllene',
  terpene_other: ['myrcene', 'limonene'],
};

export const useStrain = routeLoader$(async (req) => {
  const { strain } = req.params;
  const client = getSupabaseClient(req);
  const { data } = await client
    .from('strains')
    .select('*')
    .eq('slug', strain)
    .single();
  return data;
});

export default component$(() => {
  const strain = useStore({ ...mockStrain });
  useStylesScoped$(StrainStyles);

  return (
    <>
      <div class="flex py-4">
        <div class="flex flex-1 flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow">
          {/* Main row */}
          <div class="flex flex-1 flex-row gap-2">
            {/* Image container */}
            <div>
              <img src={strain.img_url} alt="" width={200} height={200} />
            </div>

            {/* KPIs container */}
            <div class="flex flex-1 flex-col gap-2 bg-elevated rounded-md p-4  ">
              <h1 class="text-2xl font-medium">{strain.name}</h1>
              <div class="flex flex-row">
                {'aka '.concat(strain.aliases.map((alias) => alias).join(', '))}
              </div>
              <ul class="flex flex-row">
                <li>{strain.genetic}</li>
                <li class="px-1">
                  THC {strain.thc.min}-{strain.thc.max}%
                </li>
                <li class="px-1">
                  CBD {strain.cbd.min}-{strain.cbd.max}%
                </li>
              </ul>
              <div class="flex flex-row">
                <span>
                  Price: {strain.price.min}-{strain.price.max}{' '}
                  {strain.price.currency}
                </span>
              </div>
            </div>

            {/* Ratings container */}
            <div class="flex flex-col">
              <span class="text-4xl">{strain.rating.value}</span>
              <span>****</span>
              <span>{strain.rating.count} ratings</span>
              <span>{strain.rating.likes} likes</span>
            </div>
          </div>

          {/* Description row */}
          <div class="p-4">{strain.description}</div>

          {/* Highlights row */}
          <div class="p-4">
            <div>STRAIN HIGHLIGHTS</div>

            {/* Feelings */}
            <div class="flex flex-row gap-3">
              <div>Feelings:</div>
              {strain.feelings.map((feeling) => (
                <Link href={`/strains?feeling=${feeling.name}`}>
                  {feeling.name}
                </Link>
              ))}
            </div>

            {/* Negatives */}
            <div class="flex flex-row gap-3">
              <div>Negatives:</div>
              {strain.negatives.map((negative) => (
                <Link href={`/strains?negative=${negative.name}`}>
                  {negative.name}
                </Link>
              ))}
            </div>

            {/* Helps */}
            <div class="flex flex-row gap-3">
              <div>Helps with:</div>
              {strain.helps.map((help) => (
                <Link href={`/strains?helps-with=${help.name}`}>
                  {help.name}
                </Link>
              ))}
            </div>

            {/* Flavor */}
            <div class="flex flex-row gap-3">
              <div>Flavor:</div>
              {strain.flavors.map((flavor) => (
                <Link href={`/strains?flavor=${flavor.name}`}>
                  {flavor.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
