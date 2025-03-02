import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CityScreen from '../CityScreen';
import Weather from '../Weather';
import Favourite from '../Favourite';
import profile from '../profile';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let imageSource;
                    if (route.name === 'CityScreen') {
                        imageSource = require('../../assets/Image/Calendar_Days.png'); // Local image
                    } else if (route.name === 'Weather') {
                        imageSource = require('../../assets/Image/search1.png');
                    } else if (route.name === 'Favourite')
                        imageSource = require('../../assets/Image/heart.png');
                        else if (route.name === 'profile')
                            imageSource = require('../../assets/Image/user.png');
                    return (
                        <Image
                            source={imageSource}
                            style={{ width: size, height: size, }}
                            resizeMode="contain"
                        />
                    );
                },

                headerShown: false,
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Weather" component={Favourite} options={{tabBarLabel:'Search'}}/>
            <Tab.Screen name="CityScreen" component={CityScreen}options={{tabBarLabel:'Events'}}  />
            <Tab.Screen name="Favourite" component={Weather}options={{tabBarLabel:'Favourite'}}  />
            <Tab.Screen name="profile" component={profile}options={{tabBarLabel:'profile'}}  />
        </Tab.Navigator>
    );
};

export default BottomTabs;
