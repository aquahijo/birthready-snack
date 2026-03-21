import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useUserStore } from '../store/userStore';

import SignInScreen from '../screens/SignIn/SignInScreen';
import OnboardingDueDateScreen from '../screens/Onboarding/OnboardingDueDateScreen';
import OnboardingPregnancyNumberScreen from '../screens/Onboarding/OnboardingPregnancyNumberScreen';
import OnboardingNotificationsScreen from '../screens/Onboarding/OnboardingNotificationsScreen';
import HomeScreen from '../screens/Home/HomeScreen';

export type RootStackParamList = {
  SignIn: undefined;
  OnboardingDueDate: undefined;
  OnboardingPregnancyNumber: undefined;
  OnboardingNotifications: undefined;
  Home: undefined;
  ModuleLibrary: undefined;
  ModulePlayer: { moduleId: string };
  LaborStageMap: undefined;
  ContractionTimer: undefined;
  BirthAdvocacy: undefined;
  MentalHealthCheckIn: undefined;
  Postpartum: undefined;
  Paywall: undefined;
  GiftFlow: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAuthenticated, user } = useUserStore();

  const getInitialRouteName = () => {
    if (!isAuthenticated || !user) return 'SignIn';
    if (!user.hasCompletedOnboarding) return 'OnboardingDueDate';
    return 'Home';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}
          options={{ animation: 'fade' }}
        />
        
        <Stack.Screen 
          name="OnboardingDueDate" 
          component={OnboardingDueDateScreen}
          options={{ animation: 'slide_from_right' }}
        />
        
        <Stack.Screen 
          name="OnboardingPregnancyNumber" 
          component={OnboardingPregnancyNumberScreen}
          options={{ animation: 'slide_from_right' }}
        />
        
        <Stack.Screen 
          name="OnboardingNotifications" 
          component={OnboardingNotificationsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
