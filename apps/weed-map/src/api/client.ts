import {RequestEventLoader} from "@builder.io/qwik-city";
import {createClient, SupabaseClient} from "@supabase/supabase-js";

const supabaseMapKey = "__supabase";
export const getSupabaseClient = (requestEvent: RequestEventLoader): SupabaseClient => {
  const cached = requestEvent.sharedMap.get(supabaseMapKey);

  if (cached) {
    return cached;
  }

  const url = requestEvent.env.get("PUBLIC_SUPABASE_URL");
  const key = requestEvent.env.get("PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !key) {
    throw new Error("NO ENV VARIABLES");
  }

  const client = createClient(url, key, { auth: { persistSession: false } });

  requestEvent.sharedMap.set(supabaseMapKey, client);

  return client;
}
