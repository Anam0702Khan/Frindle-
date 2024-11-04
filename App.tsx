// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer'; // Import Drawer Navigator
// import React, {useEffect, useState} from 'react';
// import LoginPage from './components/LoginPage';
// import SignupPage from './components/SignupPage';
// import HomePage from './components/HomePage';
// import LaunchApp from './components/LaunchApp';
// import SecureStorage from 'rn-secure-storage';
// import Foooter from './components/Footer';
// import Search from './components/Search';
// import AddPost from './components/AddPost';
// import Notifications from './components/Notifications';
// import Profile from './components/Profile';
// import ChatPage from './components/ChatPage';
// import {GestureHandlerRootView} from 'react-native-gesture-handler'; // Required for gestures

// // Create Stack and Drawer Navigator
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         swipeEnabled: true, // Enable swipe gesture
//         drawerPosition: 'left', // Left-side drawer, change to 'right' if needed
//       }}>
//       <Drawer.Screen name="HomePage" component={HomePage} />
//       <Drawer.Screen name="Search" component={Search} />
//       <Drawer.Screen name="AddPost" component={AddPost} />
//       <Drawer.Screen name="Notifications" component={Notifications} />
//       <Drawer.Screen name="Profile" component={Profile} />
//       <Drawer.Screen name="ChatPage" component={ChatPage} />
//     </Drawer.Navigator>
//   );
// }

// function App(): React.JSX.Element {
//   const [initialRoute, setInitialRoute] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const checkAuthToken = async () => {
//       try {
//         const auth = await SecureStorage.getItem('authToken');
//         if (auth) {
//           setInitialRoute('DrawerNavigator');
//           console.log('auth ==>>>', auth);
//         } else {
//           setInitialRoute('LoginPage'); // Redirect to Login if no token
//           console.log('auth1 ==>>>', auth);
//         }
//       } catch (error) {
//         console.error('Error fetching auth token', error);
//       }
//     };
//     checkAuthToken();
//   }, []);

//   console.log('initialRoute APP.tsx==>>> ', initialRoute);

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName={initialRoute}>
//           <Stack.Screen
//             name="LaunchApp"
//             component={LaunchApp}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="LoginPage"
//             component={LoginPage}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="SignupPage"
//             component={SignupPage}
//             options={{headerShown: false}}
//           />
//           {/* Use DrawerNavigator when authenticated */}
//           <Stack.Screen
//             name="DrawerNavigator"
//             component={DrawerNavigator}
//             options={{headerShown: false}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// export default App;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';
import LaunchApp from './components/LaunchApp';
import SecureStorage from 'rn-secure-storage';
import Foooter from './components/Footer';
import Search from './components/Search';
import AddPost from './components/AddPost';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import ChatPage from './components/ChatPage';
import {UserProvider} from './components/UserContext';

// Create Stack Navigator
const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [initialRoute, setInitialRoute] = useState<string | undefined>(
    undefined,
  ); // Set to undefined instead of null

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const auth = await SecureStorage.getItem('authToken');
        if (auth) {
          setInitialRoute('HomePage');
          console.log('auth ==>>>', auth);
        } else {
          setInitialRoute('LoginPage'); // Redirect to Login if no token
          console.log('auth1 ==>>>', auth);
        }
      } catch (error) {
        console.error('Error fetching auth token', error);
        // setInitialRoute('LoginPage'); // Default to login in case of error
      }
    };
    checkAuthToken();
  }, []);

  console.log('initialRoute APP.tsx==>>> ', initialRoute);

  return (
    <>
      <UserProvider>
        <NavigationContainer>
          {/* Single Stack Navigator handling both LoginPage and SignupPage */}
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="LaunchApp"
              component={LaunchApp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignupPage"
              component={SignupPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Footer"
              component={Foooter}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPost"
              component={AddPost}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Notifications"
              component={Notifications}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChatPage"
              component={ChatPage}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}

export default App;
