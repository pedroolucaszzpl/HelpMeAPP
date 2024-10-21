// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig';

import SplashScreen1 from './screen/SplashScreen1';
import SplashScreen2 from './screen/SplashScreen2';
import OnboardingScreen1 from './screen/OnboardingScreen1';
import OnboardingScreen2 from './screen/OnboardingScreen2';
import OnboardingScreen3 from './screen/OnboardingScreen3';

import AuthScreens from './screen/AuthScreens';
import UserTypeSelectionScreen from './screen/UserTypeSelectionScreen';
import CreateUserProfileScreen from './screen/CreateUserProfileScreen';
import Toast from 'react-native-toast-message';
import HomeScreen from './screen/BottomTabs'; // Verifique o caminho
import ProfileDetailScreen from './screen/ProfileDetailScreen'; 
import AboutScreen from './screen/AboutScreen';
import AccountDataScreen from './screen/AccountDataScreen';
import EditScreen from './screen/EditScreen';
import FavoritesScreen from './screen/Favoritos';
import ProfessionalsList from './screen/ProfessionalList';
import PortfolioPostScreen from './screen/PortifolioScreen';
import PostImagem from './screen/PostImagem';

import ChatScreen from './screen/ChatScreen';
import ChatListScreen from './screen/ChatListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Splash1');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setInitialRoute('BottomTabs');
      } else {
        setInitialRoute('AuthScreens');
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Splash1" component={SplashScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Splash2" component={SplashScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ headerShown: false, title: 'Detalhes do Perfil' }} />
        <Stack.Screen name="AuthScreens" component={AuthScreens} options={{ headerShown: false }} />
        <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateUserProfile" component={CreateUserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false, title: 'Sobre Nós' }} />
        <Stack.Screen name="AccountData" component={AccountDataScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfessionalsList" component={ProfessionalsList} options={{ headerShown: false }} />
        <Stack.Screen name="PortfolioPost" component={PortfolioPostScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="PostImage" component={PostImagem}  options={{ headerShown: false }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="ChatListScreen" component={ChatListScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
