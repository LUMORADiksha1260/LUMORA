import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";

import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import InstallPrompt from "./components/layout/InstallPrompt";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardHome from "./pages/DashboardHome";
import AICompanionPage from "./pages/AICompanionPage";
import SafeSpacePage from "./pages/SafeSpacePage";
import MoodTrackerPage from "./pages/MoodTrackerPage";
import JournalPage from "./pages/JournalPage";
import MeditationPage from "./pages/MeditationPage";
import NatureLibraryPage from "./pages/NatureLibraryPage";
import CounselorsPage from "./pages/CounselorsPage";
import CommunityPage from "./pages/CommunityPage";
import PremiumPage from "./pages/PremiumPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import HelpCenterPage from "./pages/HelpCenterPage";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <InstallPrompt />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                {/* Public */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                </Route>

                {/* Auth (no navbar/footer chrome) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                {/* Dashboard (protected) */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="companion" element={<AICompanionPage />} />
                  <Route path="safe-space" element={<SafeSpacePage />} />
                  <Route path="mood" element={<MoodTrackerPage />} />
                  <Route path="journal" element={<JournalPage />} />
                  <Route path="meditation" element={<MeditationPage />} />
                  <Route path="nature" element={<NatureLibraryPage />} />
                  <Route path="counselors" element={<CounselorsPage />} />
                  <Route path="community" element={<CommunityPage />} />
                  <Route path="premium" element={<PremiumPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="help" element={<HelpCenterPage />} />
                </Route>

                {/* Catch-all — no dead links, ever */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
