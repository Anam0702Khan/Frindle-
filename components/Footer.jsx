import {useNavigation, useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useContext, useEffect, useState} from 'react';
import RNSecureStorage from 'rn-secure-storage';
import {UserContext} from './UserContext';

const Foooter = () => {
  const navigation = useNavigation();

  const {user} = useContext(UserContext); // Access the global user data
  // const userImage = user?.profileImage;
  // const userImage = user?.profileImage
  //     ? `http://192.168.1.10:8000/${user.profileImage.replace(/\\/g, '/')}` // Replace backslashes and add the base URL
  //     : null;

  const userImage =
    user?.profileImage && !user.profileImage.includes('http')
      ? `http://192.168.1.10:8000/${user.profileImage.replace(/\\/g, '/')}`
      : user?.profileImage; // Use the full URL if it already contains 'http'

  console.log('userImage Footer===>>> ', userImage);

  console.log('userImage Footer===>>> ', userImage);

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('HomePage')}>
        <Entypo name="home" size={24} color="#fff" />
        <Text style={styles.navButtonText}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Search')}>
        <FontAwesome name="search" size={24} color="#fff" />
        <Text style={styles.navButtonText}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('AddPost')}>
        <FontAwesome name="plus-square-o" size={24} color="#fff" />
        <Text style={styles.navButtonText}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Notifications')}>
        <FontAwesome name="heart" size={24} color="#fff" />
        <Text style={styles.navButtonText}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}>
        {userImage ? (
          <Image source={{uri: userImage}} style={styles.profileImage} />
        ) : (
          <FontAwesome name="user-circle-o" size={24} color="#fff" />
        )}
        <Text style={styles.navButtonText}></Text>
      </TouchableOpacity>
    </View>
  );
};
export default Foooter;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // Ensures that all items (icons and images) are centered vertically
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center', // Centers the icon and text inside each button
    justifyContent: 'center', // Centers the content vertically inside each button
  },
  navButtonText: {
    color: '#FFF',
    marginTop: 5, // Adds some spacing between the icon/image and the text
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15, // Ensures the image is circular
    borderWidth: 2, // Adds a border
    borderColor: 'white', // Color of the border
  },
});
