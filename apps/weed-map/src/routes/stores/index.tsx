import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import { getSupabaseClient } from '@api/client';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';

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
  const { data } = await client.from('stores').select('*');
  return data;
});

export default component$(() => {
  const stores = useStores();
  const filters = [
    ['Open now', 'door_open'],
    ['Online order', 'shopping_cart'],
    ['Delivery', 'local_shipping'],
    ['Medical', 'cardiology'],
    ['THC', 'spa'],
    ['CBD', 'eco'],
    ['Top rated', 'verified'],
  ].map(([label, icon]) => ({
    label,
    value: label.toLowerCase().split(' ').join('-'),
    icon,
  }));

  return (
    <main class="container mx-auto flex flex-col gap-4 mt-4">
      {/* ROW WITH FILTERS */}
      <div class="flex gap-8 w-full justify-center">
        <div class="flex flex-1 gap-8 flex-row-reverse items-center">
          {filters.map(({ value, label, icon }) => (
            <Link key={value} href={`/stores?filters=${value}`}>
              <div class="flex flex-col gap-2 items-center text-primary-600 hover:text-primary-500 w-24">
                <Icon icon={icon}></Icon>
                <span class="font-mono">{label}</span>
              </div>
            </Link>
          ))}
        </div>
        <div class="flex items-center justify-center">
          <Button icon="page_info" variant="ghost"></Button>
        </div>
      </div>

      {/* STORES IN GRID */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {stores.value?.map((store) => {
          return (
            <Link
              href={`/stores/${store.slug}`}
              key={`${store.name.toLowerCase().split(' ').join('-')}-${
                store.id
              }`}
            >
              <div class="flex flex-col gap-2 bg-elevated rounded-md p-4 drop-shadow ">
                <span>{store.name}</span>
                <span>{new Date(store.created_at).toDateString()}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
});
