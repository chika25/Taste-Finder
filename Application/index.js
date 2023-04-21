import { HomePage } from '../components/HomePage';
import { DishPage } from '../components/DishPage';
import { ProfilePage } from '../components/ProfilePage';
import { AddReview } from '../components/AddReview.js';
import {Result} from "../components/Result";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AboutPage } from '../components/AboutPage';
import { ContactPage } from '../components/ContactPage';
import { Feather } from '@expo/vector-icons';
import { LoginPage } from '../components/LoginPage';
import Ionicons from "react-native-vector-icons/Ionicons";



import {
  View,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: '#f6f6f6f' } }}>
      <Stack.Group
      // screenOptions={{
      //   headerShown: false}}
      >
        <Stack.Screen options={{headerShown: false,}} name="Login" component={LoginPage} />
        <Stack.Screen options={{headerShown: false,}} name="Home" component={HomePage}/>
        <Stack.Screen options={{headerShown: false, title: 'Search Result'}} name="Result" component={Result}/>
        <Stack.Screen options={{headerShown: true,title: 'Reviews'}} name="Food" component={DishPage} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default function Application() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator sceneContainerStyle={{ backgroundColor: '#f6f6f6f' }}>
          <Tab.Screen
            name="Main"
            component={Root}
            options={{
              tabBarActiveTintColor: '#FF7C60',
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={HomePage}
            options={{
              headerShown: false,
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Search Food',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search-outline" color={color} size={size}/>
              ),
            }}
          />
          <Tab.Screen
            name="About Us"
            component={AboutPage}
            options={{
              headerShown: false,
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'About Us',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="help-outline" color={color} size={size}/>
              ),
            }}
          />
          <Tab.Screen
            name="Contact Us"
            component={ContactPage}
            options={{
              headerShown: false,
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Contact Us',
              tabBarIcon: ({ color, size }) => (
                <Feather name="message-square" color={color} size={size}/>
              ),
            }}
          />
          <Tab.Screen
            name="Profile Page"
            component={ProfilePage}
            options={{
              headerShown: false,
              tabBarActiveTintColor: '#FF7C60',
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="reader-outline" color={color} size={size}/>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
  }
});
