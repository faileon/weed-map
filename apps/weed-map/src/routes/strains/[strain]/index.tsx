import {component$, useStore, useStyles$, useStylesScoped$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {routeLoader$} from "@builder.io/qwik-city";
import {getSupabaseClient} from "@api/client";
import StrainStyles from './strain.css?inline'

export const head: DocumentHead = {
  title: 'Weed Map - Strain Detail',
  meta: [
    {
      name: 'description',
      content: 'Store detail...',
    },
  ],
};

const mockStrain =  {
  id: 1,
  slug: 'strain1',
  name: 'Strain name 2',
  img_url: 'https://images.leafly.com/flower-images/gg-4.jpg',
  rating: {
    value: 4.6,
    count: 5142,
    likes: 82265
  },
  created_at: '2023-07-09T12:54:01.829421+00:00',
  updated_at: '2023-07-09T12:54:01.829421+00:00',
  genetic: 'Sativa',
  purity: { min: 90, max: 100 },
  thc: {min: 20, max: 20 },
  cbd: {min: 0, max: 0 },
  price: { min: 10, max: 15, currency: 'USD' },
  parents: ['strain2'],
  aliases: ['Gorilla Glue', 'Sticky Glue'],
  description: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
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
  terpene_other: [ 'myrcene', 'limonene' ],
};

export const useStrain = routeLoader$(async (req) => {
  const {strain} = req.params;
  const client = getSupabaseClient(req);
  const {data} = await client.from('strains').select('*').eq('slug', strain).single();
  return data;
})


export default component$(() => {
  const strain = useStore({...mockStrain});
  useStylesScoped$(StrainStyles);

  return (
    <>
      <div class="flex py-4">
        {
          <div class="flex flex-1 flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow">
            <div class="flex flex-1 flex-row gap-2">
              <div>
                <img src={strain.img_url} alt="" width={200} height={200} />
              </div>
              <div class="flex flex-1 flex-col gap-2 bg-elevated rounded-md p-4  ">
                <span class="text-2xl font-medium">{strain.name}</span>
                <div class="flex flex-row items-baseline">
                  <p>aka</p> 
                  <ul class="flex flex-row items-baseline">
                  {strain.aliases.map((alias) => (
                    <li class="px-1">
                      {alias}
                    </li>
                  ))}
                  </ul>
                </div>
                <ul class="flex flex-row items-baseline">
                  <li> 
                    {strain.genetic}
                  </li>
                  <li class="px-1">
                    THC {strain.thc.min}-{strain.thc.max}%
                  </li>
                  <li class="px-1">
                    CBD {strain.cbd.min}-{strain.cbd.max}%
                  </li>
                </ul>
                <div class="flex flex-row items-baseline">
                  <span>Price: {strain.price.min}-{strain.price.max} {strain.price.currency}</span> 
                </div>
              </div>
              <div class="flex flex-col items-baseline">
                <span class="text-4xl">{strain.rating.value}</span>
                <span>****</span>
                <span>{strain.rating.count} ratings</span>
                <span>{strain.rating.likes} likes</span>
              </div>
            </div>
            
            <div class="bg-elevated p-4">
              {strain.description}
            </div>

            <div class="bg-elevated p-4">
              STRAIN HIGHLIGHTS
              <div>
                <ul>
                <li>
                    <div class="flex flex-row items-baseline">
                      Feelings: 
                      {strain.feelings.map((feeling) => (
                        <div class="px-1">
                          {feeling.name}
                        </div>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div class="flex flex-row items-baseline">
                      Negatives: 
                      {strain.negatives.map((negative) => (
                        <div class="px-1">
                          {negative.name}
                        </div>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div class="flex flex-row items-baseline">
                      Helps with: 
                      {strain.helps.map((help) => (
                        <div class="px-1">
                          {help.name}
                        </div>
                      ))}
                    </div>
                  </li>
                  <li>
                    <div class="flex flex-row items-baseline">
                      Flavor: 
                      {strain.flavors.map((flavor) => (
                        <div class="px-1">
                          {flavor.name}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
});
