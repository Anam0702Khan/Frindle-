import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import RNSecureStorage from 'rn-secure-storage';
import {useNavigation} from '@react-navigation/native';
import Foooter from './Footer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { UserContext } from './UserContext';

// import {API_URL} from '@env';

const HomePage = ({route}) => {
  // const navigation = useNavigation();
  // const [user, setUser] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [profileImage, setProfileImage] = useState(null); // New state for profile image

  // const apiIp = 'http://192.168.1.10:8000';

  // // Assuming userId is passed via route.params from the login page
  // // const {userId, authToken} = route.params;
  // // console.log('userId for HP ===>>>>', userId);

  // // Function to fetch user data
  // const getUserData = async () => {
  //   try {
  //     const authToken = await RNSecureStorage.getItem('authToken');
  //     const userId = await RNSecureStorage.getItem('userId');

  //     const res = await fetch(`${apiIp}/api/user/${userId}`, {
  //       method: `GET`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token': `bearer ${authToken}`,
  //       },
  //       // body: JSON.stringify({
  //       //   email: email,
  //       //   password: password,
  //       //   p
  //       // }),
  //     });
  //     const data = await res.json();
  //     console.log('User info >>>', data);

  //     if (data.success) {
  //       setUser(data.user); 
  //       setProfileImage(data.user.profileImage);

  //     } else {
  //       console.log('Failed to fetch user data');
  //     }

  //     setLoading(false);
  //   } catch (error) {
  //     console.log('Error occurred while fetching user data:', error);
  //     setLoading(false);
  //   }
  // };
  // console.log('data user for Home Page ====>>> ', user);

  // // Fetch user data when the component mounts
  // useEffect(() => {
  //   getUserData();
  // }, [imageUri]);

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  // // Clean up the profileImage path, if necessary
  // const imageUri = profileImage
  //   ? `${apiIp}/${profileImage.replace(/\\/g, '/')}` 
  //   : null;

  // console.log('User Image Hp ====>>', imageUri);
  // console.log('image Home Page ==>>>', profileImage);

 
  // const handleChatNavigate = () => {
  //   navigation.navigate('ChatPage'); 
  // };
  const navigation = useNavigation();
  const {user, setUser} = useContext(UserContext); // Access the global user data
  const [loading, setLoading] = useState(true);

  const apiIp = 'http://192.168.1.10:8000'; // Define your server URL

  useEffect(() => {
    if (user) {
      setLoading(false); // Stop loading once user data is available in the context
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Get user profile image from the context and format it
  // const userImage = user?.profileImage 
  // ? `http://192.168.1.10:8000/${user.profileImage.replace(/\\/g, '/')}` // Replace backslashes and add the base URL
  // : null;
  const imageUri = user?.profileImage && !user.profileImage.includes('http')
  ? `${apiIp}/${user.profileImage.replace(/\\/g, '/')}`
  : user?.profileImage; // Use the full URL if it already contains 'http'

  console.log('User Image HomePage ===>>>', imageUri);

  const handleChatNavigate = () => {
    navigation.navigate('ChatPage');
  };
  return (
    <>
      <View style={styles.header}>
        {/* Top-left user image */}
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <Text style={styles.text}>Profile image not available</Text>
        )}

        {/* Centered Welcome text */}
        <Text style={styles.welcomeText}>{user?.name}</Text>

        {/* Top-right video and chat icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="movie-play-outline"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChatNavigate}>
            <Fontisto name="messenger" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <View style={styles.container}>
        {user ? (
          <>
            <Text style={styles.text}>Username: {user.username}</Text>
            <Text style={styles.text}>Name: {user.name}</Text>
            <Text style={styles.text}>Bio: {user.bio}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>Age: {user.age}</Text>
            <Text style={styles.text}>Country: {user.country}</Text>
            <Text style={styles.text}>
              Relationship Status: {user.relationship}
            </Text>
            <Text style={styles.text}>Gender: {user.gender}</Text>
            <Text style={styles.text}>Religion: {user.religion}</Text>
            <Text style={styles.text}>Date Of Birth: {user.dateofbirth}</Text>

            {/* <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity> */}
          </>
        ) : (
          <Text style={styles.text}>No user data available</Text>
        )}
      </View>

      {/* Footer */}
      <Foooter />
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#000',
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circle shape
    borderWidth: 2, // White border
    borderColor: '#fff', // White border color
  },
  welcomeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // Ensure text is visible on black background
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ActivityIndicator,
//   Button,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import RNSecureStorage from 'rn-secure-storage';
// import {useNavigation} from '@react-navigation/native';
// import Foooter from './Footer';

// const HomePage = ({route}) => {
//   const navigation = useNavigation();
//   const [user, setUser] = useState([]);
//   // const [userImg, setUserImg] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const apiUrl = '192.168.190.141:8000';

//   // Assuming userId is passed via route.params from the login page
//   // const {userId, authToken} = route.params;
//   // console.log('userId for HP ===>>>>', userId);

//   // Function to fetch user data
//   const getUserData = async () => {
//     try {
//       const authToken = await RNSecureStorage.getItem('authToken');
//       const userId = await RNSecureStorage.getItem('userId');

//       const res = await fetch(`http://${apiUrl}/api/user/${userId}`, {
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

//       setLoading(false);
//     } catch (error) {
//       console.log('Error occurred while fetching user data:', error);
//       setLoading(false);
//     }
//   };
//   console.log('data user for Home Page ====>>> ', user);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     getUserData();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }
//   // Clean up the profileImage path, if necessary
//   const imageUri = user.profileImage
//     ? `http://${apiUrl}/${user.profileImage.replace(/\\/g, '/')}` // Replace backslashes with slashes
//     : null;

//   setUserImg(imageUri);
//   console.log('User Image Hp ====>>', userImg);

//   const handleLogout = async () => {
//     const authToken = await RNSecureStorage.getItem('authToken');
//     if (!authToken) {
//       Alert.alert('Authentication Token not found');
//     }
//     const removeAuthToken = await RNSecureStorage.removeItem('authToken');
//     console.log('removeAuthToken HP ===>>>> ', removeAuthToken);
//     console.log('removed AuthToken Successfully ');
//     const removeUserId = await RNSecureStorage.removeItem('userId');
//     console.log('removed UserId Successfully ');

//     console.log('removeUserId HP ===>>>> ', removeUserId);

//     navigation.replace('LoginPage');
//   };

//   // const handledelete = async () => {
//   //   const authToken = await RNSecureStorage.getItem('authToken');
//   //   if (!authToken) {
//   //     Alert.alert('Authentication Token not found');
//   //   }
//   //   const removeAuthToken = await RNSecureStorage.removeItem('authToken');
//   // };
//   return (
//     <>
//       <View style={styles.container}>
//         {user ? (
//           <>
//             {imageUri ? (
//               <Image source={{uri: imageUri}} style={styles.profileImage} />
//             ) : (
//               <Text style={styles.text}>Profile image not available</Text>
//             )}
//             <Text style={styles.text}>Name: {user.name}</Text>
//             <Text style={styles.text}>Email: {user.email}</Text>
//             <Text style={styles.text}>Country: {user.country}</Text>
//             {/* <Button style={styles.button}  onPress={handleLogout} />Logout */}
//             <TouchableOpacity
//               style={styles.logoutButton}
//               onPress={handleLogout}>
//               <Text style={styles.buttonText}>Logout</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <Text style={styles.text}>No user data available</Text>
//         )}
//       </View>
//       {/* Pass imageUri only if it's defined */}
//       <Foooter imageUri={userImg ? userImg : ''} />{' '}
//     </>
//   );
// };

// export default HomePage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   logoutButton: {
//     backgroundColor: 'red',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//     // backgroundColor:'#fff'
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
