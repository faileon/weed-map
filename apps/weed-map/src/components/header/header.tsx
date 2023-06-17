import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.scss?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div></div>
  );
});
