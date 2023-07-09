import {component$, Slot} from '@builder.io/qwik';
import Header from '../components/header/header';

export default component$(() => {
  return (
    <>
      <Header/>
      <main class="container mx-auto">
        <Slot/>
      </main>
      <footer/>
    </>
  );
});
