import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Image} from 'react-native';
import RNSecureStorage from 'rn-secure-storage';

const LaunchApp = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timer to redirect to either LoginPage or HomePage after 3 seconds
    const timer = setTimeout(async () => {
      try {
        const auth = await RNSecureStorage.getItem('authToken');
        if (auth) {
          // Navigate to HomePage if the user is authenticated
          navigation.replace('HomePage');
          // navigation.replace('DrawerNavigator', { screen: 'HomePage' });

        } else {
          // Navigate to LoginPage if the user is not authenticated
          navigation.replace('LoginPage');
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
        navigation.replace('LoginPage'); // Default to LoginPage on error
      }
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <>
      <View style={styles.mainContainer}>
        <Image
          source={require('../assets/Images/applogo.webp')}
          style={styles.image}
        />

        <Text style={styles.title}>Friendle</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    padding: 16,
    backgroundColor: '#000',
  },

  image: {
    width: 200,
    height: 200,
    // marginBottom: 20,
    borderRadius: 100,
  },

  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 40,
    fontWeight: '300',
    color: '#F5A623',
    marginBottom: 20,
  },
});

export default LaunchApp;
