import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Foooter from './Footer';

const ChatPage = () => {
  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.text}>This is ChatPage component</Text>
      </View>
      {/* Footer */}
      <Foooter />
    </View>
  );
};

export default ChatPage;

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
