import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$, useLocation, useNavigate } from '@builder.io/qwik-city';
import { getSupabaseClient } from '@api/client';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';
import { faker } from '@faker-js/faker';
import { getRandomFloat, getRandomInt, getRandomSubarray } from '../../utils/random';

export const head: DocumentHead = {
  title: 'Weed Map - Stores',
  meta: [
    {
      name: 'description',
      content: 'List of stores selling cannabis...',
    },
  ],
};

// TODO: move to utils
// TODO: consider using https://github.com/sindresorhus/query-string
const mergeSearchQuery = (params: URLSearchParams, name: string, value: string) => {
  const newParams = new URLSearchParams(params);
  if (newParams.has(name)) {
    const oldParams = newParams.get(name);
    const split = oldParams?.split(',');
    let newValue;
    if (split?.includes(value)) {
      newValue = split.filter((val) => val !== value).join(',');
    } else {
      newValue = `${oldParams},${value}`;
    }
    if (newValue) {
      newParams.set(name, newValue);
    } else {
      newParams.delete(name);
    }
  } else {
    newParams.append(name, value);
  }
  return decodeURIComponent(newParams.toString());
};

export const useStores = routeLoader$(async (req) => {
  const filters = [
    ['Open now', 'door_open'],
    ['Online order', 'shopping_cart'],
    ['Delivery', 'local_shipping'],
    ['Medical', 'cardiology'],
    ['THC', 'spa'],
    ['CBD', 'eco'],
    ['Top rated', 'verified'],
    ['Card payment', 'credit_card'],
    ['Cash payment', 'payments'],
    ['Accessible', 'accessible'],
  ].map(([label, icon]) => ({
    label,
    value: label.toLowerCase().split(' ').join('-'),
    icon,
  }));

  return {
    data: Array(40)
      .fill(0)
      .map((_, idx) => ({
        name: faker.animal.bird(),
        description: faker.lorem.sentences(5),
        slug: 'high-society',
        images: Array(5)
          .fill(0)
          .map(() => `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/400/400`),
        rating: {
          value: getRandomFloat(0, 4, 1),
          count: 457,
        },
        position: {
          lat: 50.099,
          lng: 14.42,
        },
        tags: getRandomSubarray(filters, getRandomInt(1, filters.length / 4)),
        isOpen: Math.random() > 0.5,
      })),
    count: 0,
  };

  const { query } = req;
  console.log('hit the server with', query);
  const client = getSupabaseClient(req);
  const { data, count } = await client.from('stores').select('*');
  return {
    data,
    count,
  };
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
    ['Card payment', 'credit_card'],
    ['Cash payment', 'payments'],
    ['Accessible', 'accessible'],
  ]
    .reverse()
    .map(([label, icon]) => ({
      label,
      value: label.toLowerCase().split(' ').join('-'),
      icon,
    }));

  const { url } = useLocation();

  return (
    <main class="container mx-auto flex flex-col gap-8 my-8 items-center px-4 sm:px-0">
      {/* ROW WITH FILTERS */}
      <div class="flex gap-8 w-full justify-center">
        <div class="flex flex-1 gap-4 flex-row-reverse items-center overflow-hidden">
          {filters.map(({ value, label, icon }) => (
            <Link key={value} href={`/stores?${mergeSearchQuery(url.searchParams, 'filters', value)}`}>
              <div
                class={[
                  `flex flex-col gap-1 items-center  hover:text-primary-600 text-center px-4`,
                  url.searchParams.get('filters')?.split(',')?.includes(value)
                    ? `text-primary-600 border-b-2 border-primary-600 font-bold`
                    : `text-primary-400`,
                ]}
              >
                <Icon icon={icon}></Icon>
                <span class="font-mono text-sm whitespace-nowrap">{label}</span>
              </div>
            </Link>
          ))}
        </div>
        <div class="flex items-center justify-center gap-2">
          <Button icon="sort" variant="ghost"></Button>
          <Button icon="page_info" variant="ghost"></Button>
        </div>
      </div>

      {/* STORES IN GRID */}
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {stores.value?.data?.map((store) => {
          return (
            <Link href={`/stores/${store.slug}`} key={`${store.name.toLowerCase().split(' ').join('-')}-${store.id}`}>
              {/* STORE CARD (TODO: COMPONeNt) */}
              <div class="flex flex-col gap-2">
                {/* featured images: TODO: carousel component */}
                <div class="rounded-lg overflow-hidden relative">
                  <img src={store.images[0]} alt="" width={400} height={400} />

                  <Icon icon="favorite" class="absolute top-5 right-5 text-primary-700"></Icon>

                  {/* CAROUSEL DOTS */}
                  <div class="absolute bottom-5 w-full flex justify-center gap-1.5">
                    {store.images.map((url: string) => (
                      <div key={url} class="h-1.5 w-1.5 rounded-full bg-slate-100"></div>
                    ))}
                  </div>
                </div>
                {/* metadata */}
                <div class="flex flex-col gap-2">
                  {/* name, rating */}
                  <div class="flex justify-between items-center">
                    <div class="font-bold font-mono text-lg">{store.name}</div>
                    <div class="flex gap-1 text-base items-center">
                      <Icon icon="star" class="text-base" filled></Icon>
                      <span>{store.rating.value.toLocaleString()}</span>
                      <span class="text-xs">({store.rating.count})</span>
                    </div>
                  </div>

                  {/* tags */}
                  <div class="flex flex-wrap gap-2 text-sm text-primary-600">
                    {store.tags.map(({ label, value, icon }: any) => (
                      <div key="value" class="flex gap-2 px-2 py-0.5 rounded bg-elevated items-center">
                        <Icon icon={icon} class="text-xs"></Icon>
                        <div>{label}</div>
                      </div>
                    ))}
                  </div>

                  {store.isOpen && (
                    <div class="flex gap-2 items-center">
                      <Icon icon="circle" filled class="text-xs text-emerald-600"></Icon>
                      <strong>Open now</strong>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
});
