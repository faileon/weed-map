import { component$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import leaflet from 'leaflet';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { Button } from '@ui/button';
import { Icon } from '@ui/icon';

export default component$(() => {
  // leaflet.map('map').setView([51.505, -0.09], 13)
  // this will not be visible in the Browser Developer Console
  console.log('Ran on the SERVER');

  // the code is happening on the SERVER by default, we must use this hook to run things on the CLIENT side
  useVisibleTask$(() => {
    // todo consider getting hold of the element like so:
    // https://qwik.builder.io/docs/components/overview/#getting-hold-of-dom-element
    console.log('Ran on the CLIENT');
    const map = leaflet.map('map').setView([50.099, 14.42], 13);

    leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map);
  });

  return (
    <>
      <div class="absolute inset-0 flex">
        <div class="relative flex-1 h-full">
          <div class="absolute bottom-2 w-full flex justify-center">
            <Link href="/stores" style="z-index: 500">
              <Button label="Zobrazit seznam" icon="list" variant="filled"></Button>
            </Link>
          </div>

          <div id="map" class="w-full h-full" />
        </div>

        <div class="h-full w-[500px] hidden lg:flex p-4 flex items-center justify-center">
          <div class="flex flex-col gap-2 items-center">
            <Icon icon="storefront" class="text-primary-600 text-5xl"></Icon>
            <span class="font-mono">List of stores...</span>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
