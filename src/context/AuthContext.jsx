import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext(null);

// Turns a Supabase auth user + its profiles row into the flat "user" shape
// the rest of the app already expects (user.name, user.premium, user.pin...).
function toAppUser(authUser, profile) {
  if (!authUser) return null;
  return {
    id: authUser.id,
    email: authUser.email,
    name: profile?.name ?? authUser.user_metadata?.name ?? "",
    premium: profile?.premium ?? false,
    pin: profile?.pin ?? null,
    provider: profile?.provider ?? "email",
    avatarColor: profile?.avatar_color ?? "#B7A9E8",
    verified: !!authUser.email_confirmed_at,
  };
}

async function fetchProfile(userId) {
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pendingEmail, setPendingEmail] = useState(null); // email awaiting verification
  const [loading, setLoading] = useState(true); // true until we've checked for an existing session

  // On mount: check if a session already exists (e.g. user refreshed the
  // page), then keep listening for login/logout/token-refresh events.
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(toAppUser(session.user, profile));
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(toAppUser(session.user, profile));
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const logIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Match the old mock's UNVERIFIED-code behaviour so LoginPage's
      // existing error handling keeps working unchanged.
      if (error.message.toLowerCase().includes("confirm")) {
        const err = new Error("Please verify your email to continue.");
        err.code = "UNVERIFIED";
        err.email = email;
        throw err;
      }
      throw new Error("Incorrect email or password.");
    }
    const profile = await fetchProfile(data.user.id);
    const appUser = toAppUser(data.user, profile);
    setUser(appUser);
    return appUser;
  }, []);

  const signUp = useCallback(async (form) => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
    if (error) throw new Error(error.message);
    setPendingEmail(form.email);
    // No dev code with a real backend — Supabase emails the code directly
    // to the user's inbox (configure the "Confirm signup" template in
    // Supabase Dashboard → Authentication → Email Templates to include
    // {{ .Token }} so it's a 6-digit code, matching this app's UI).
    return { user: data.user, code: null };
  }, []);

  const googleLogin = useCallback(async () => {
    // Redirects the browser to Google, then back to this app — there is no
    // user object to return synchronously. onAuthStateChange (above) will
    // fire and populate `user` once the redirect completes.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) throw new Error(error.message);
    return null;
  }, []);

  const verifyEmail = useCallback(async (email, code) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });
    if (error) throw new Error("That code doesn't match. Check and try again.");
    const profile = await fetchProfile(data.user.id);
    const appUser = toAppUser(data.user, profile);
    setUser(appUser);
    setPendingEmail(null);
    return appUser;
  }, []);

  const logOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  // Locally merges a patch (e.g. after updateProfile/upgradeToPremium
  // already wrote to Supabase) so the UI updates instantly without a refetch.
  const updateUser = useCallback((patch) => setUser((u) => ({ ...u, ...patch })), []);

  return (
    <AuthContext.Provider
      value={{ user, pendingEmail, setPendingEmail, loading, logIn, signUp, googleLogin, verifyEmail, logOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
