import {component$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {routeLoader$} from "@builder.io/qwik-city";
import {getSupabaseClient} from "@api/client";

export const head: DocumentHead = {
  title: 'Weed Map - Strain Detail',
  meta: [
    {
      name: 'description',
      content: 'Store detail...',
    },
  ],
};


export const useStore = routeLoader$(async (req) => {
  // const {strain} = req.params;
  // const client = getSupabaseClient(req);
  // const {data} = await client.from('strains').select('*').eq('slug', strain).single();
  // return data;

  return {
    id: 1,
    slug: 'strain1',
    name: 'Strain name 1',
    created_at: '2023-07-09T12:54:01.829421+00:00',
    updated_at: '2023-07-09T12:54:01.829421+00:00',
    genetic: 'Sativa',
    purityMin: 90,
    purityMax: 100,
    thcMin: 100,
    thcMax: 100,
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
    flavor: [
      { name: 'pungent', evidence: 30 },
      { name: 'pine', evidence: 30 },
      { name: 'earthy', evidence: 30 },
    ],    
    terpene_dominant: 'caryophyllene',
    terpene_other: [ 'myrcene', 'limonene' ],
  };
})


export default component$(() => {
  const store = useStore();

  return (
    <>
      <div class="flex py-4">
        {
          <div class="flex flex-1 flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow ">
            <span class="text-2xl font-medium">{store.value.name}</span>
            <span>{new Date(store.value.created_at).toDateString()}</span>
          </div>
        }
      </div>
    </>
  );
});
