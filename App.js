// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './src/screen/Home'
// import WeatherScreen from './src/screen/Weather';
// import CityScreen from './src/screen/CityScreen';
// import Toast from 'react-native-toast-message'
// const Stack = createStackNavigator();

// function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{
//           headerShown: false
//         }} >

//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
//           <Stack.Screen name="CityScreen" component={CityScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <Toast />
//     </>
//   );
// }

// export default App;





// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from './src/screen/Home';
// import WeatherScreen from './src/screen/Weather';
// import CityScreen from './src/screen/CityScreen';
// import Toast from 'react-native-toast-message';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import icons

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         // tabBarIcon: ({ color, size }) => {
//         //   let iconName;
//         //   if (route.name === 'CityScreen') {
//         //     iconName = 'location-city'; // MaterialIcons name
//         //   } else if (route.name === 'WeatherScreen') {
//         //     iconName = 'cloud';
//         //   }
//         //   return <MaterialIcons name={iconName} size={size} color={color} />;
//         // },
//         headerShown: false,
//         tabBarActiveTintColor: 'blue',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="CityScreen" component={CityScreen} />
//       {/* <Tab.Screen name="WeatherScreen" component={WeatherScreen} /> */}
//     </Tab.Navigator>
//   );
// }

// function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <Toast />
//     </>
//   );
// }

// export default App;


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screen/Home';
import BottomTabs from './src/screen/Widget/BottomTabsNavigator';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
