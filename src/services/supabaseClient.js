/**
 * SUPABASE CLIENT
 * ---------------------------------------------------------------------------
 * One shared client used everywhere (AuthContext, mockApi). Reads the project
 * URL + public "anon" key from environment variables — never hardcode these
 * in the source file, even though the anon key is safe to expose to the
 * browser (it only works within your Row Level Security rules).
 *
 * SETUP:
 * 1. Create a project at https://supabase.com
 * 2. Go to Project Settings → API
 * 3. Copy "Project URL" and "anon public" key into a `.env` file at the
 *    project root (see .env.example in this project):
 *
 *      VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
 *      VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
 *
 * 4. Restart `npm run dev` after creating/editing .env (Vite only reads
 *    env files on startup).
 * ---------------------------------------------------------------------------
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev instead of silently breaking every API call.
  console.error(
    "Missing Supabase env vars. Create a .env file with VITE_SUPABASE_URL " +
      "and VITE_SUPABASE_ANON_KEY — see .env.example."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // keeps user logged in across page reloads
    autoRefreshToken: true, // refreshes the JWT before it expires
    detectSessionInUrl: true, // needed for Google OAuth redirect + magic links
  },
});
