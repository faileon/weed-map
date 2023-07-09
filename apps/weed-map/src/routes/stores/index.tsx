import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {routeLoader$} from "@builder.io/qwik-city";
import {getSupabaseClient} from "@api/client";

export const head: DocumentHead = {
  title: 'Weed Map - Stores',
  meta: [
    {
      name: 'description',
      content: 'List of stores selling cannabis...',
    },
  ],
};


export const useStores = routeLoader$(async (req) => {
  const client = getSupabaseClient(req);
  const {data} = await client.from('stores').select('*');
  return data;
})


export default component$(() => {
  const stores = useStores();

  return (
    <>
      <div>Stores</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {stores.value?.map(store => {
          return <div key={`${store.name.toLowerCase().split(' ').join('-')}-${store.id}`} class="flex flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow ">
            <span>{store.name}</span>
            <span>{new Date(store.created_at).toDateString()}</span>
          </div>
        })}
      </div>
    </>
  );
});
