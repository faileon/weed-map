import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Logo } from '../logo/logo';
import styles from './header.scss?inline';
import { Button } from '@ui/button';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header class="text-primary-800 bg-elevated h-14 sm:h-16 sticky top-0 drop-shadow p-2 flex justify-center">
      <div class="container gap-4 sm:gap-8 flex items-center h-full">
        <Link href="/">
          <Logo class="text-4xl sm:text-5xl" />
        </Link>

        {/* TODO: Make a input component */}
        <div class="search-box w-96">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i class="material-symbols-outlined">search</i>
            </div>
            <input
              type="search"
              id="search"
              class="block w-full p-2 bg-transparent pl-10 text-sm rounded-lg border-2 border-primary-800 text-black sm:p-3 sm:pl-11"
              placeholder="Search..."
              required
            />
          </div>
        </div>

        <div class="flex gap-2 items-center ml-auto">
          <Button icon="favorite" variant="ghost"></Button>
          <Button icon="account_circle" variant="ghost"></Button>
        </div>
      </div>
    </header>
  );
});
