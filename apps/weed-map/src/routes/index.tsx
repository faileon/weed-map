import { component$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import leaflet from 'leaflet';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { Button } from '@ui/button';

export default component$(() => {
  // leaflet.map('map').setView([51.505, -0.09], 13)
  // this will not be visible in the Browser Developer Console
  console.log('Ran on the SERVER');

  // the code is happening on the SERVER by default, we must use this hook to run things on the CLIENT side
  useVisibleTask$(() => {
    // todo consider getting hold of the element like so:
    // https://qwik.builder.io/docs/components/overview/#getting-hold-of-dom-element
    console.log('Ran on the CLIENT');
    const map = leaflet.map('map').setView([51.505, -0.09], 13);

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
      .addTo(map);
  });

  return (
    <>
      <div id="map" class="h-[750px]" />
      <Link href="/stores">Stores</Link>
      <Link href="/strains">Strains</Link>
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
