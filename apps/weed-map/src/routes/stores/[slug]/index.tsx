import {component$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {routeLoader$} from "@builder.io/qwik-city";
import {getSupabaseClient} from "@api/client";

export const head: DocumentHead = {
  title: 'Weed Map - Store Detail',
  meta: [
    {
      name: 'description',
      content: 'Store detail...',
    },
  ],
};


export const useStore = routeLoader$(async (req) => {
  const {slug} = req.params;
  const client = getSupabaseClient(req);
  const {data} = await client.from('stores').select('*').eq('slug', slug).single();
  return data;
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
