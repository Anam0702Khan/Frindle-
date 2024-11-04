import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView, // Import ScrollView for scrollable content
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // DatePicker for Date of Birth
import SecureStorage from 'rn-secure-storage';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [religion, setReligion] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // For showing DatePicker

  const navigation = useNavigation();
  const apiIp = 'http://192.168.1.10:8000';
  

  const handleSignup = async () => {
    const isPasswordValid = await validPassword();
    if (!isPasswordValid) {
      return;
    }
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !country ||
      !profileImage ||
      !gender ||
      !relationship ||
      !dateOfBirth
    ) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('age', age);
    formData.append('religion', religion);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('gender', gender);
    formData.append('relationship', relationship);
    formData.append('dateofbirth', dateOfBirth.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
    formData.append('profileImage', {
      uri: profileImage.uri,
      type: profileImage.type,
      name: profileImage.fileName || 'profile.jpg',
    });

    try {
      const res = await fetch(`${apiIp}/api/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(`SignUp page ===>>> `, data);

      if (data.success) {
        console.log(
          'Authentication Token for Signup Page ==>>> ',
          data.authToken,
        );
        await SecureStorage.setItem('authToken', data.authToken);
        await SecureStorage.setItem('userId', data.user);
        navigation.replace(`HomePage`, {
          userId: data.user,
          authToken: data.authToken,
        });
      } else {
        Alert.alert('Error', data.error || 'Failed to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.error(error);
    }
  };

  const selectImage = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0]);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validPassword = async () => {
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long.');
      return false;
    }

    if (password.length > 12) {
      Alert.alert('Password must not exceed 12 characters.');
      return false;
    }

    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (!uppercasePattern.test(password)) {
      Alert.alert('Password must contain at least one uppercase letter.');
      return false;
    }

    if (!lowercasePattern.test(password)) {
      Alert.alert('Password must contain at least one lowercase letter.');
      return false;
    }

    if (!digitPattern.test(password)) {
      Alert.alert('Password must contain at least one digit.');
      return false;
    }

    if (!specialCharPattern.test(password)) {
      Alert.alert('Password must contain at least one special character.');
      return false;
    }

    return true;
  };

  // Function to handle the date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign Up</Text>

        {/* Name and Username on the same row */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {/* <Text style={styles.label}>Bio</Text> */}
        <TextInput
          style={styles.bioInput}
          placeholder="Tell us about yourself"
          placeholderTextColor="#aaa"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={5} // Allows for 5 rows of text
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#aaa"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Religion"
          placeholderTextColor="#aaa"
          value={religion}
          onChangeText={setReligion}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}>
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Country Picker */}
        {/* <Text style={styles.label}>Country</Text> */}
        <Picker
          selectedValue={country}
          onValueChange={setCountry}
          style={styles.picker}>
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="USA" value="USA" />
          <Picker.Item label="Canada" value="Canada" />
          <Picker.Item label="India" value="India" />
        </Picker>

        {/* Gender Picker */}
        {/* <Text style={styles.label}>Gender</Text> */}
        <Picker
          selectedValue={gender}
          onValueChange={setGender}
          style={styles.picker}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>

        {/* Relationship Picker */}
        {/* <Text style={styles.label}>Relationship Status</Text> */}
        <Picker
          selectedValue={relationship}
          onValueChange={setRelationship}
          style={styles.picker}>
          <Picker.Item label="Select Relationship Status" value="" />
          <Picker.Item label="Single" value="single" />
          <Picker.Item label="Married" value="married" />
          <Picker.Item label="Unmarried" value="Unmarried" />
          <Picker.Item label="Divorced" value="Divorced" />
          <Picker.Item label="In a relationship" value="in_relationship" />
        </Picker>

        {/* Date of Birth Picker */}
        {/* Date of Birth Picker */}
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}>
          <Text style={styles.dateText}>
            {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}>
          <Text style={styles.dateText}>
            {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity> */}   

        {/* Profile Image */}
        <Button title="Upload Profile Picture" onPress={selectImage} />
        {profileImage && (
          <Image source={{uri: profileImage.uri}} style={styles.profileImage} />
        )}
      </View>

      {/* Sign Up Button */}
      <View>
        {/* <Button title="Sign Up" onPress={handleSignup} /> */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#000',
    flexGrow: 1,
    paddingVertical: 20,
  },
  signupButton: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F5A623',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  container: {
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#1A1A1D',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#5C5C61',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#333',
    textAlignVertical: 'top', // Ensures text starts from top of TextInput
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5C5C61',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#333',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#fff',
  },
  eyeIcon: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5C5C61',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  label: {
    color: '#bbb',
    marginBottom: 5,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#5C5C61',
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 15,
    borderRadius: 10,
  },
  dateButton: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
  },
  dateText: {
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#F5A623',
    fontWeight: '600',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 50,
    backgroundColor: '#F5A623',
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: '#F5A623',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.6,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default SignupPage;

// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   Image,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import * as ImagePicker from 'react-native-image-picker';
// import {useNavigation} from '@react-navigation/native';
// import Feather from 'react-native-vector-icons/Feather';
// import SecureStorage from 'rn-secure-storage';
// // import { API_URL } from '@env';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [country, setCountry] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const navigation = useNavigation();
//   const apiIp = 'http://192.168.1.10:8000'

//   const handleSignup = async () => {
//     const isPasswordValid = await validPassword();
//     if (!isPasswordValid) {
//       return;
//     }
//     if (!name || !email || !password || !country || !profileImage) {
//       Alert.alert('Error', 'All fields are required!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);

//     formData.append('profileImage', {
//       uri: profileImage.uri,
//       type: profileImage.type,
//       name: profileImage.fileName || 'profile.jpg',
//     });

//     try {
//       const res = await fetch(`${apiIp}/api/register`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       // setUserId(data?.user?._id);
//       console.log(`SignUp page ===>>> `, data);

//       if (data.success) {
//         console.log(
//           'Authentication Token for Signup Page ==>>> ',
//           data.authToken,
//         );
//         await SecureStorage.setItem('authToken', data.authToken);
//         await SecureStorage.setItem('userId', data.user);
//         // Alert.alert('Success', 'User registered successfully!');
//         navigation.replace(`HomePage`, {
//           userId: data.user,
//           authToken: data.authToken,
//         });
//       } else {
//         if (data.error === 'A user with this email already exist') {
//           Alert.alert('A user with this email already exist');
//           return;
//         }

//         // Alert.alert('Error', data.error || 'Failed to register');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong!');
//       console.error(error);
//     }
//   };

//   const selectImage = () => {
//     ImagePicker.launchImageLibrary({}, response => {
//       if (!response.didCancel && !response.error) {
//         setProfileImage(response.assets[0]);
//       }
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const validPassword = async () => {
//     if (password.length < 6) {
//       Alert.alert('Password must be at least 6 characters long.');
//       return false;
//     }

//     if (password.length > 12) {
//       Alert.alert('Password must not exceed 12 characters.');
//       return false;
//     }

//     const uppercasePattern = /[A-Z]/;
//     const lowercasePattern = /[a-z]/;
//     const digitPattern = /\d/;
//     const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

//     if (!uppercasePattern.test(password)) {
//       Alert.alert('Password must contain at least one uppercase letter.');
//       return false;
//     }

//     if (!lowercasePattern.test(password)) {
//       Alert.alert('Password must contain at least one lowercase letter.');
//       return false;
//     }

//     if (!digitPattern.test(password)) {
//       Alert.alert('Password must contain at least one digit.');
//       return false;
//     }

//     if (!specialCharPattern.test(password)) {
//       Alert.alert('Password must contain at least one special character.');
//       return false;
//     }

//     return true;
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Sign Up</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         {/* Password Input with Eye Icon */}
//         <View style={styles.passwordContainer}>
//           <TextInput
//             style={styles.passwordInput}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword}
//           />
//           <TouchableOpacity
//             onPress={togglePasswordVisibility}
//             style={styles.eyeIcon}>
//             <Feather
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={24}
//               color="#fff"
//             />
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="Country"
//           value={country}
//           onChangeText={setCountry}
//         />

//         <Button title="Upload Profile Picture" onPress={selectImage} />
//         {profileImage && (
//           <Image source={{uri: profileImage.uri}} style={styles.profileImage} />
//         )}
//       </View>
//       <View>
//         <Button title="Sign Up" onPress={handleSignup} />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     backgroundColor: '#000',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   passwordInput: {
//     flex: 1,
//     paddingVertical: 10,
//     color: '#fff',
//   },
//   eyeIcon: {
//     padding: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     color: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#fff',
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: 'center',
//     marginTop: 10,
//   },
// });

// export default SignupPage;
