/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Deno HTTP server when building for production.
 *
 * Learn more about the Deno integration here:
 * - https://qwik.builder.io/docs/deployments/deno/
 * - https://deno.com/manual/examples/http_server
 *
 */
import { createQwikCity } from '@builder.io/qwik-city/middleware/deno';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';
// @ts-ignore
import { serve } from 'https://deno.land/std@0.194.0/http/server.ts';

// Create the Qwik City Deno middleware
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
  static: {
    root: 'client',
  },
});

// Allow for dynamic port
const port = Number(Deno.env.get('PORT') ?? 8080);

serve(
  async (request: Request, conn: any) => {
    const staticResponse = await staticFile(request);
    if (staticResponse) {
      return staticResponse;
    }

    // Server-side render this request with Qwik City
    const qwikCityResponse = await router(request, conn);
    if (qwikCityResponse) {
      return qwikCityResponse;
    }

    // Path not found
    return notFound(request);
  },
  { port }
);

declare const Deno: any;
