import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Foooter from './Footer';
import RNSecureStorage from 'rn-secure-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import { UserContext } from './UserContext';

const Profile = () => {
  const navigation = useNavigation();
  const apiIp = 'http://192.168.1.10:8000'; // Change this to your backend IP or domain
  const { user, setUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);
  console.log('profileImage Profile===>>> ',profileImage)

  useEffect(() => {
    if (user && user.profileImage) {
      const updatedImageUri = `${user.profileImage.replace(/\\/g, '/')}`;
      setProfileImage(updatedImageUri);
    }
  }, [user]);

  // Handle profile image update and upload to server
// Handle profile image update and upload to server
const handleProfileImageChange = async () => {
  ImagePicker.launchImageLibrary({}, async response => {
    if (!response.didCancel && !response.error) {
      const image = response.assets[0];
      console.log('image profile >>>>', image);

      const imageUri = image.uri.startsWith('file://') ? image.uri : 'file://' + image.uri;

      const formData = new FormData();
      formData.append('profileImage', {
        uri: imageUri,
        type: image.type,
        name: image.fileName || 'profile.jpg',
      });

      console.log('formData profile ==>>', formData._parts);

      try {
        const authToken = await RNSecureStorage.getItem('authToken');
        const res = await fetch(`${apiIp}/api/updateProfilePicture`, {
          method: 'PUT',
          headers: {
            'auth-token': `Bearer ${authToken}`,
          },
          body: formData,
        });

        // Check if the server response is actually JSON
        const responseText = await res.text(); // Read raw response
        console.log('Server response:', responseText);

        // Try to parse the response as JSON
        try {
          const data = JSON.parse(responseText);
          if (data.success) {
            setProfileImage(`${apiIp}/${data.profileImage.replace(/\\/g, '/')}`);
            console.log('profile inside funct ==>>> ', profileImage);
            setUser(prevUser => ({
              ...prevUser,
              profileImage: data.profileImage,
            }));
            Alert.alert('Success', 'Profile picture updated successfully');
          } else {
            Alert.alert('Error', 'Failed to update profile picture');
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          Alert.alert('Error', 'Failed to parse server response');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong while updating');
        console.error('Error during fetch:', error);
      }
    }
  });
};


  const handleLogout = async () => {
    await RNSecureStorage.removeItem('authToken');
    await RNSecureStorage.removeItem('userId');
    navigation.replace('LoginPage');
  };
  const imageUri = user?.profileImage && !user.profileImage.includes('http')
  ? `${apiIp}/${user.profileImage.replace(/\\/g, '/')}`
  : user?.profileImage; // Use the full URL if it already contains 'http'

console.log('userImage Footer===>>> ', imageUri);


  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <>
                <Image source={{uri: imageUri}} style={styles.profileImage} />
                <AntDesign
                  name="pluscircle"
                  size={25}
                  color="#90EE90"
                  style={styles.iconPlus}
                  onPress={handleProfileImageChange}
                />
              </>
            ) : (
              <Text style={styles.text}>No Profile Image</Text>
            )}
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          {/* Age */}
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={24} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={String(user.age || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          {/* Country */}
          <View style={styles.inputContainer}>
            <FontAwesome name="globe" size={24} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={String(user.country || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="birthday-cake"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={String(user.dateofbirth || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          {/* Religion */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="star"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={String(user.religion || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          {/* Gender */}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="user"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={String(user.gender || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          {/* Relationship */}
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="user-friends"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={String(user.relationship || '')}
              editable={false}
              placeholderTextColor="#fff"
            />
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Foooter />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
  },
  logoutButton: {
    width: '90%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    // backgroundColor: '#F5A623',
    // borderColor: '#F5A623',
    borderColor: 'lightblue',
    borderWidth: 2, // Increased border width for a clear outline
    // marginTop: 20,
  },
  logoutButtonText: {
    // color: '#F5A623',
    color: 'lightblue',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
  },
  iconPlus: {
    position: 'relative',
    top: -50,
    zIndex: 1,
    left: 110,
  },
  userName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#5C5C61',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 20,
  },
  icon: {
    paddingHorizontal: 20,
  },
  input: {
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});

// import {View, Text, StyleSheet} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Foooter from './Footer';

// const Profile = () => {
//   const [user, setUser] = useState('');

//   const getUserData = async () => {
//     try {
//       const authToken = await RNSecureStorage.getItem('authToken');
//       const userId = await RNSecureStorage.getItem('userId');

//       const res = await fetch(`${apiIp}/api/user/${userId}`, {
//         method: `GET`,
//         headers: {
//           'Content-Type': 'application/json',
//           'auth-token': `bearer ${authToken}`,
//         },
//         // body: JSON.stringify({
//         //   email: email,
//         //   password: password,
//         //   p
//         // }),
//       });
//       const data = await res.json();
//       console.log('User info >>>', data);

//       if (data.success) {
//         setUser(data.user); // Set user information
//       } else {
//         console.log('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.log('Error occurred while fetching user data:', error);
//     }
//   };
//   console.log('user data for profile ===>> ', user);
//   useEffect(() => {
//     getUserData();
//   }, []);
//   return (
//     <View style={styles.container}>
//       {/* Main content */}
//       <View style={styles.content}>
//         <Text style={styles.text}>This is Profile component</Text>
//       </View>
//       {/* Footer */}
//       <Foooter />
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Ensure the container takes the full screen height
//     backgroundColor: '#000', // Set the background color to black
//   },
//   content: {
//     flex: 1, // Ensure the content takes the remaining space above the footer
//     justifyContent: 'center', // Center the content vertically
//     alignItems: 'center', // Center the content horizontally
//   },
//   text: {
//     color: '#fff', // White text to contrast with the black background
//     fontSize: 18,
//   },
// });
