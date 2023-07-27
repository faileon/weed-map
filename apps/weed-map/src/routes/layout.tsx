import { component$, Slot } from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <Header />
      <div class="flex flex-col flex-1 relative">
        <Slot />
      </div>
      <footer />
    </>
  );
});
