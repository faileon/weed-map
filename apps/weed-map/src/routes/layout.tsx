import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <main>
        <Header />
          <h1>Map</h1>
          <Slot />
      </main>
      <footer>
      </footer>
    </>
  );
});
