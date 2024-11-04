import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

// import { API_URL } from '@env';

import SecureStorage from 'rn-secure-storage';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const apiIp = 'http://192.168.1.10:8000'
  const handleLogin = async () => {
    try {
      const res = await fetch(`${apiIp}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log('data user ==>>>> ', data);

      if (data.success) {
        await SecureStorage.setItem('authToken', data.authToken);
        await SecureStorage.setItem('userId', data.user);

        navigation.replace('HomePage');
      } else {
        if (data.error === 'Invalid Email') {
          console.log('data.error LP==>>>', data.error);
          Alert.alert(
            'Invalid Email',
            'The email you entered is incorrect or  does not exist.',
          );
        } else if (data.error === 'Invalid Password') {
          Alert.alert(
            'Invalid Password',
            'The password you entered is incorrect.',
          );
        } else {
          Alert.alert(
            'Login failed',
            'Something went wrong. Please try again.',
          );
        }
      }
    } catch (error) {
      console.log('Error Occurred', error);
      Alert.alert('Error', 'An error occurred while logging in.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <Text htmlFor="">Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text htmlFor="">Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={togglePasswordVisibility}>
        <Feather
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('SignupPage')}>
        Don't have an account? Sign up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  eyeIcon: {
    position: 'relative',
    left: 280,
    top: -55,
    padding: 10,
  },
  mainContainer: {
    // flex: 1,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    color: 'white',
    marginBottom: 20,
  },

  heading: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    color: 'lightblue',
    textAlign: 'center',
  },
});

export default LoginPage;
