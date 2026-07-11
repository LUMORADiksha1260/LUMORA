/**
 * REAL BACKEND LAYER — Supabase
 * ---------------------------------------------------------------------------
 * This file used to be an in-memory mock. It now talks to your Supabase
 * project. The file name and every exported function signature are kept
 * IDENTICAL to the old mock, so no page/component anywhere in the app had
 * to change — they all still call `mockApi.someFunction(...)` exactly as
 * before.
 *
 * Auth functions (signUp, logIn, googleLogin, verifyEmail, forgotPassword,
 * resendCode, logOut) live in AuthContext.jsx instead, since they need to
 * update React state (the logged-in user) directly. This file covers
 * everything else: profile, journal, mood, notifications, counselors.
 * ---------------------------------------------------------------------------
 */
import { supabase } from "./supabaseClient";

// Static reference data — no need for a database table for these yet.
// (You can move these into Supabase tables later the same way the rest
// of this file was migrated, if you want counselors/groups to be editable
// without a code deploy.)
export const COUNSELORS = [
  { id: 1, name: "Dr. Meera Anand", role: "Clinical Psychologist · Anxiety & Burnout", rating: 4.9, reviews: 212, photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop" },
  { id: 2, name: "Rohan Desai, LMFT", role: "Marriage & Family Therapist", rating: 4.8, reviews: 156, photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop" },
  { id: 3, name: "Dr. Sarah Kim", role: "Trauma-Informed Therapist", rating: 5.0, reviews: 98, photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop" },
];

export const COMMUNITY_GROUPS = [
  { id: 1, name: "Living with Anxiety", members: 4210 },
  { id: 2, name: "New Parents, Quietly Overwhelmed", members: 1860 },
  { id: 3, name: "Grief & Loss Circle", members: 2540 },
  { id: 4, name: "Rebuilding Self-Worth", members: 3120 },
];

// Small helper: throw a clean Error if Supabase returns one, so call sites
// can keep doing `catch (err) { setError(err.message) }` like before.
function check(error) {
  if (error) throw new Error(error.message);
}

export const mockApi = {
  // ---------- AUTH HELPERS (called directly by some pages, not via useAuth) ----------
  async forgotPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    check(error);
    return { message: `If an account exists for ${email}, a reset link has been sent.` };
  },

  async resendCode(email) {
    const { error } = await supabase.auth.resend({ type: "signup", email });
    check(error);
    // Real email is sent by Supabase — we never see the code itself here,
    // unlike the old mock. Returning code: null keeps the call signature
    // the same; VerifyEmailPage already handles a missing devCode fine.
    return { code: null };
  },

  // ---------- PROFILE ----------
  async updateProfile(userId, patch) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ name: patch.name })
      .eq("id", userId)
      .select()
      .single();
    check(error);
    return { id: userId, ...data };
  },

  async setPin(userId, pin) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ pin })
      .eq("id", userId)
      .select()
      .single();
    check(error);
    return { id: userId, ...data };
  },

  async upgradeToPremium(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .update({ premium: true })
      .eq("id", userId)
      .select()
      .single();
    check(error);
    return { id: userId, ...data };
  },

  // ---------- JOURNAL ----------
  async getJournalEntries(userId, type) {
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", userId)
      .eq("type", type)
      .order("created_at", { ascending: false });
    check(error);
    return data;
  },

  async saveJournalEntry(userId, type, text) {
    const { data, error } = await supabase
      .from("journal_entries")
      .insert({ user_id: userId, type, text })
      .select()
      .single();
    check(error);
    return data;
  },

  async getGratitudeEntries(userId) {
    const { data, error } = await supabase
      .from("gratitude_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    check(error);
    return data;
  },

  async saveGratitudeEntry(userId, items) {
    const { data, error } = await supabase
      .from("gratitude_entries")
      .insert({ user_id: userId, items })
      .select()
      .single();
    check(error);
    return data;
  },

  // ---------- MOOD ----------
  // Returns a 7-length array [Mon..Sun], 0 where nothing has been logged yet —
  // same shape the rest of the app already expects.
  async getMoodWeek(userId) {
    const { data, error } = await supabase
      .from("mood_entries")
      .select("day_index, value")
      .eq("user_id", userId);
    check(error);
    const week = [0, 0, 0, 0, 0, 0, 0];
    (data || []).forEach((row) => { week[row.day_index] = row.value; });
    return week;
  },

  async logMood(userId, dayIndex, value) {
    const { error } = await supabase
      .from("mood_entries")
      .upsert(
        { user_id: userId, day_index: dayIndex, value, updated_at: new Date().toISOString() },
        { onConflict: "user_id,day_index" }
      );
    check(error);
    return mockApi.getMoodWeek(userId);
  },

  // ---------- MISC ----------
  async getNotifications() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    check(error);
    return data;
  },

  async bookCounselor(counselorId) {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("counselor_bookings")
      .insert({ user_id: user.id, counselor_id: counselorId });
    check(error);
    return { success: true, counselorId };
  },
};
