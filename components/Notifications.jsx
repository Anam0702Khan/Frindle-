import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Foooter from './Footer';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>This is Notifications components</Text>
      </View>
      <Foooter />
    </View>
  );
};

export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes the full screen height
    backgroundColor: '#000', // Set the background color to black
  },
  content: {
    flex: 1, // Ensure the content takes the remaining space above the footer
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  text: {
    color: '#fff', // White text to contrast with the black background
    fontSize: 18,
  },
});
