import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import {QwikLogo} from "../../components/icons/qwik";

export default component$(() => {
  return (
    <>
    <div class="logo">
      <a href="https://qwik.builder.io/" target="_blank">
        <QwikLogo />
      </a>
    </div>
    <ul>
      <li>
        <a
          href="https://qwik.builder.io/docs/components/overview/"
          target="_blank"
          >
          Docs
        </a>
      </li>
      <li>
        <a
          href="https://qwik.builder.io/examples/introduction/hello-world/"
          target="_blank"
          >
          Examples
        </a>
      </li>
      <li>
        <a
          href="https://qwik.builder.io/tutorial/welcome/overview/"
          target="_blank"
          >
          Tutorials
        </a>
      </li>
    </ul>

    <div>
      <h1>
        Welcome weed-map <span class="lightning">⚡️</span>
      </h1>

      <ul>
        <li>
          Check out the <code>src/routes</code> directory to get started.
        </li>
        <li>
          Add integrations with <code>npm run qwik add</code>.
        </li>
        <li>
          More info about development in <code>README.md</code>
        </li>
      </ul>

      <h2>Commands</h2>

      <table class="commands">
        <tbody>
          <tr>
            <td>
              <code>npm run start</code>
            </td>
            <td>Start the dev server and watch for changes.</td>
          </tr>
        </tbody>
      </table>

      <h2>Add Integrations</h2>

      <table class="commands">
        <tbody>
          <tr>
            <td>
              <code>npm run qwik add cloudflare-pages</code>
            </td>
            <td>
              <a href="https://developers.cloudflare.com/pages" target="_blank">
                Cloudflare Pages Server
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <code>npm run qwik add express</code>
            </td>
            <td>
              <a href="https://expressjs.com/" target="_blank">
                Nodejs Express Server
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <code>npm run qwik add netlify-edge</code>
            </td>
            <td>
              <a href="https://docs.netlify.com/" target="_blank">
                Netlify Edge Functions
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <code>npm run qwik add static</code>
            </td>
            <td>
              <a
                href="https://qwik.builder.io/qwikcity/static-site-generation/overview/"
                target="_blank"
              >
                Static Site Generation (SSG)
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Community</h2>

      <ul>
        <li>
          <span>Questions or just want to say hi? </span>
          <a href="https://qwik.builder.io/chat" target="_blank">
            Chat on discord!
          </a>
        </li>
        <li>
          <span>Follow </span>
          <a href="https://twitter.com/QwikDev" target="_blank">
            @QwikDev
          </a>
          <span> on Twitter</span>
        </li>
        <li>
          <span>Open issues and contribute on </span>
          <a href="https://github.com/BuilderIO/qwik" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          <span>Watch </span>
          <a href="https://qwik.builder.io/media/" target="_blank">
            Presentations, Podcasts, Videos, etc.
          </a>
        </li>
      </ul>
      <Link class="mindblow" href="/flower/">
        Blow my mind 🤯
      </Link>
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
