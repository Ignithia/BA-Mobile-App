import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, ShoppingBag, Newspaper, MapPin, Gamepad2, User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import NewsScreen from '../screens/NewsScreen';
import CampusScreen from '../screens/CampusScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import CampusDetailsScreen from '../screens/CampusDetailsScreen';
import StudySeekerScreen from '../screens/StudySeekerScreen';
import MiniGameScreen from '../screens/MiniGameScreen';
import { Colors } from '../theme/theme';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const GameStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
      <Stack.Screen name="MiniGame" component={MiniGameScreen} options={{ title: 'Mini-Game' }} />
    </Stack.Navigator>
);

const StudyStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
      <Stack.Screen name="StudySeeker" component={StudySeekerScreen} options={{ title: 'Studiezoeker' }} />
    </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ 
    headerStyle: { backgroundColor: Colors.primary }, 
    headerTintColor: '#fff',
    headerTitleStyle: { fontWeight: 'bold' }
  }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Berthoutinstituut' }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Detail' }} />
    <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: 'Nieuws Detail' }} />
    <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} options={{ title: 'Campus Detail' }} />
  </Stack.Navigator>
);

const ProductStack = () => (
  <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
    <Stack.Screen name="Products" component={ProductScreen} options={{ title: 'Winkel' }} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Detail' }} />
  </Stack.Navigator>
);

const NewsStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
      <Stack.Screen name="News" component={NewsScreen} options={{ title: 'Nieuws' }} />
      <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} options={{ title: 'Nieuws Detail' }} />
    </Stack.Navigator>
);

const CampusStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Campuses" component={CampusScreen} options={{ title: 'Campussen' }} />
      <Stack.Screen name="CampusDetails" component={CampusDetailsScreen} options={{ title: 'Campus Detail' }} />
    </Stack.Navigator>
);

const CartStack = () => (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Winkelmandje' }} />
    </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'HomeTab') return <Home color={color} size={size} />;
        if (route.name === 'ProductsTab') return <ShoppingBag color={color} size={size} />;
        if (route.name === 'NewsTab') return <Newspaper color={color} size={size} />;
        if (route.name === 'CampusTab') return <MapPin color={color} size={size} />;
        if (route.name === 'CartTab') return <ShoppingBag color={color} size={size} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Home' }} />
    <Tab.Screen name="ProductsTab" component={ProductStack} options={{ title: 'Winkel' }} />
    <Tab.Screen name="NewsTab" component={NewsStack} options={{ title: 'Nieuws' }} />
    <Tab.Screen name="CampusTab" component={CampusStack} options={{ title: 'Campussen' }} />
    <Tab.Screen name="CartTab" component={CartStack} options={{ title: 'Mandje' }} />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const { user } = useApp();

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Drawer.Navigator screenOptions={{ drawerActiveTintColor: Colors.primary }}>
      <Drawer.Screen name="Main" component={TabNavigator} options={{ title: 'Overzicht' }} />
      <Drawer.Screen name="Seeker" component={StudyStack} options={{ title: 'Studiezoeker' }} />
      <Drawer.Screen name="Game" component={GameStack} options={{ title: 'Mini-Game' }} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
