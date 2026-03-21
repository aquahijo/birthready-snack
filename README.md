# BirthReady Dads — Expo Snack Setup

## How to use this in Expo Snack

1. Go to https://snack.expo.dev
2. Click the **+** button or use "Upload" to add files
3. Upload/paste each file from this folder, preserving the directory structure:

```
App.tsx
src/
  components/
    AppleSignInButton.tsx
    Button.tsx
    Card.tsx
    EmailPasswordForm.tsx
    GoogleSignInButton.tsx
    MagicLinkForm.tsx
    OptionCard.tsx
    ProgressRing.tsx
  constants/
    colors.ts
    layout.ts
    strings.ts
  navigation/
    linking.ts
    RootNavigator.tsx
  screens/
    Home/HomeScreen.tsx
    Onboarding/OnboardingDueDateScreen.tsx
    Onboarding/OnboardingNotificationsScreen.tsx
    Onboarding/OnboardingPregnancyNumberScreen.tsx
    SignIn/SignInScreen.tsx
  store/
    playbackStore.ts
    progressStore.ts
    userStore.ts
  types/
    index.ts
```

4. In the Snack editor, add these packages via the dependency panel:
   - `@react-navigation/native` ^7.1.34
   - `@react-navigation/native-stack` ^7.14.6
   - `react-native-screens` ^4.4.0
   - `react-native-safe-area-context` ^4.12.0
   - `zustand` ^5.0.12

## What was changed vs. the original project

| Original | Snack version |
|---|---|
| `expo-av` audio setup | Removed (not needed for UI testing) |
| `expo-apple-authentication` | Stubbed — pure RN button, iOS-only via `Platform.OS` |
| `@react-native-google-signin/google-signin` | Stubbed — pure RN button |
| `expo-notifications` | Stubbed — notifications permission always returns "granted" |
| `expo-secure-store` | Not used at UI level |
| `@supabase/supabase-js` | Not used (auth is mocked with demo data) |

All sign-in flows use mock data so you can navigate the full app without a backend.

## What you can test

- **Sign In screen** — email/password form, Google button, Apple button (iOS only), magic link flow
- **Onboarding** — 3-step flow: due date picker, pregnancy number selection, notifications
- **Home screen** — week display, module card, progress ring, quick actions
- Navigation between all screens
