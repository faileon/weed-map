import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {Link, routeLoader$} from "@builder.io/qwik-city";
import {getSupabaseClient} from "@api/client";

export const head: DocumentHead = {
  title: 'Strains',
  meta: [
    {
      name: 'description',
      content: 'List of strains',
    },
  ],
};


export const useStrains = routeLoader$(async (req) => {
  // const client = getSupabaseClient(req);
  // const {data} = await client.from('strains').select('*');
  // console.log("🚀 ~ file: index.tsx:21 ~ useStrains ~ data:", data)
  // return data;

  return [
    {
      id: 1,
      name: 'High Society',
      created_at: '2023-07-09T12:54:01.829421+00:00',
      updated_at: '2023-07-09T12:54:01.829421+00:00',
      slug: 'high-society'
    }, 
    {
      id: 2,
      name: 'High Society 2',
      created_at: '2023-07-09T12:54:01.829421+00:00',
      updated_at: '2023-07-09T12:54:01.829421+00:00',
      slug: 'high-society2'
    }, 
  ];
})  


export default component$(() => {
  const strains = useStrains();

  return (
    <>
      <div>Strains</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {strains.value?.map(strain => {
          return <Link href={`/strains/${strain.slug}`} key={`${strain.name.toLowerCase().split(' ').join('-')}-${strain.id}`}>
            <div  class="flex flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow ">
              <span>{strain.name}</span>
              <span>{new Date(strain.created_at).toDateString()}</span>
            </div>
          </Link>
        })}
      </div>
    </>
  );
});
