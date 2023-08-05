import { component$, useStore, useStyles$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { getSupabaseClient } from '@api/client';
import StrainStyles from './strain.css?inline';
import { Icon } from '@ui/icon';

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
    ratings_count: 5142,
    reviews_count: 1022,
    likes_count: 82265,
  },
  created_at: '2023-07-09T12:54:01.829421+00:00',
  updated_at: '2023-07-09T12:54:01.829421+00:00',
  genetic: 'Hybrid',
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
    { name: 'dry mouth xyzas asd asd asd  asd asd sa dsa d', evidence: 30 },
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
  likes: true,
};

export const useStrain = routeLoader$(async (req) => {
  const { strain } = req.params;
  const client = getSupabaseClient(req);
  const { data } = await client.from('strains').select('*').eq('slug', strain).single();
  return data;
});

export default component$(() => {
  const strain = useStore({ ...mockStrain });
  useStylesScoped$(StrainStyles);

  return (
    <>
      <div class="flex py-4">
        <div class="flex flex-col flex-1 gap-2 bg-elevated rounded-md p-4 drop-shadow">
          {/* Main row */}
          <div class="flex flex-wrap flex-1 flex-row gap-2">
            {/* Image container */}
            <div class="flex grow md:grow-0 ">
              <img class="object-cover h-full w-full md:h-52 md:w-52 rounded-xl" src={strain.img_url} />
            </div>

            {/* KPIs container */}
            <div class="flex flex-col grow p-4 text-sm gap-0 rounded-md">
              {/* Title */}
              <div class="text-4xl font-bold">{strain.name}</div>
              {/* Name aliases */}
              <div class="text-xs text-slate-500">{'aka '.concat(strain.aliases.map((alias) => alias).join(', '))}</div>
              <div class="mb-4"></div>

              <div class="flex flex-row justify-between">
                {/* Column left */}
                <div class="flex flex-col gap-0.5">
                  {/* Genetic */}
                  <Link href={`/strains?genetic=${strain.genetic}`} class="flex shrink gap-x-1">
                    <div class="rounded-md px-2 py-0.5 bg-yellow-500 hover:bg-yellow-400">{strain.genetic}</div>
                  </Link>

                  {/* THC, CBD levels */}
                  <div class="flex flex-row">
                    <div class="">THC {strain.thc.min}%</div>
                    <span class="w-1 h-1 mx-1.5 self-center bg-primary-600 rounded-full"></span>
                    <div class="">CBD {strain.cbd.min}%</div>
                  </div>

                  {/* Price */}
                  <div class="flex flex-row">
                    $$$ ({strain.price.min}-{strain.price.max} {strain.price.currency})
                  </div>
                </div>

                {/* Column right */}
                <div class="flex flex-col items-end gap-0.5">
                  {/* Ratings */}
                  <Link href="#" class="hover:text-primary-500 flex items-center gap-1">
                    <Icon icon="star_rate" class="text-sm text-primary-700" filled />
                    <div class="text-md font-bold text-center">{strain.rating.value}</div>
                    {/* <span class="w-1 h-1 mx-1.5 self-center bg-primary-600 rounded-full"></span> */}
                    <div>({strain.rating.ratings_count})</div>
                  </Link>

                  {/* Reviews */}
                  {/* <Link href="#" class="hover:text-primary-500">
                    reviews {strain.rating.reviews_count}
                  </Link> */}

                  {/* Likes */}
                  <div class="flex flex-row items-center gap-1">
                    <Link href="#">
                      <Icon icon="favorite" class="text-sm text-primary-700 hover:text-primary-500" filled />
                    </Link>
                    <Link href="#" class="hover:text-primary-500">
                      ({strain.rating.likes_count})
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings container */}
            {/* <div class="flex flex-col items-end grow">
              <div class="flex text-7xl">{strain.rating.value}</div>
              <div class="">
                <Icon icon="star_rate_half" class="text-s"></Icon>
                <Icon icon="star_rate" class="text-s"></Icon>
                <Icon icon="star_rate" class="text-s"></Icon>
                <Icon icon="star_rate" class="text-s"></Icon>
                <Icon icon="star_rate" class="text-s"></Icon>
              </div>
              <div>{strain.rating.ratings_count} ratings</div>
              <div>{strain.rating.likes_count} likes</div>
            </div> */}
          </div>
          {/* END - Main row */}

          {/* Description row */}
          <div class="p-4 text-justify">{strain.description}</div>

          {/* Highlights row */}
          <div class="flex flex-col gap-2 p-4">
            <div class="font-bold">STRAIN HIGHLIGHTS</div>
            {/* TODO: items should go in one column first, then other column */}
            <div class="grid grid-cols-1 md:grid-cols-2 md:grid-flow-row gap-x-8 gap-y-2 text-sm">
              {/* Feelings */}
              <div class="flex flex-col gap-2 grow">
                <div>Feelings</div>
                <div class="grid grid-cols-3 gap-2 items-stretch grow">
                  {strain.feelings.map((feeling) => (
                    <Link class="hover:text-primary-500" href={`/strains?feelings=${feeling.name}`} key={feeling.name}>
                      <div class="flex flex-col w-full p-2 rounded-md bg-primary-100 items-center hover:bg-primary-200" key={feeling.name}>
                        <Icon icon="spa" class="text-4xl text-primary-600" />
                        <div>{feeling.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Negatives */}
              <div class="flex flex-col gap-2">
                <div>Negatives</div>
                <div class="grid grid-cols-3 gap-2 items-stretch">
                  {strain.negatives.map((negative) => (
                    <Link class="flex hover:text-primary-500" href={`/strains?negatives=${negative.name}`} key={negative.name}>
                      <div class="flex flex-col w-full p-2 rounded-md bg-primary-100 text-center hover:bg-primary-200">
                        <Icon icon="spa" class="text-4xl text-primary-600" />
                        <div>{negative.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Helps */}
              <div class="flex flex-col gap-2">
                <div>Helps with</div>
                <div class="grid grid-cols-3 gap-2 items-stretch">
                  {strain.helps.map((help) => (
                    <Link class="w-full hover:text-primary-500" href={`/strains?helps=${help.name}`} key={help.name}>
                      <div class="flex flex-col w-full p-2 rounded-md bg-primary-100 items-center hover:bg-primary-200" key={help.name}>
                        <Icon icon="spa" class="text-4xl text-primary-600" />
                        <div>{help.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Flavor */}
              <div class="flex flex-col gap-2">
                <div>Flavor</div>
                <div class="grid grid-cols-3 gap-2 items-stretch">
                  {strain.flavors.map((flavor) => (
                    <Link class="w-full hover:text-primary-500" href={`/strains?flavor=${flavor.name}`} key={flavor.name}>
                      <div class="flex flex-col w-full p-2 rounded-md bg-primary-100 items-center hover:bg-primary-200" key={flavor.name}>
                        <Icon icon="spa" class="text-4xl text-primary-600" />
                        <div>{flavor.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* END - Highlights row */}
        </div>
      </div>
    </>
  );
});
