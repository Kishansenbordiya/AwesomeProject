import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Home = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    let isValid = true;
    if (!email) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }
    if (!password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }
    if (!isValid) return;

    setLoading(true);
    try {
      const response = await axios.post(
        'http://3.7.81.243/projects/plie-api/public/api/login',
        { email, password }
      );
      console.log("Response>>>>>>",JSON.stringify(response))
      if (response.data.data.token) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        Alert.alert('Success', 'Login successful');
        navigation.navigate('BottomTabs',{screen:'CityScreen'});
      } else {
        Alert.alert('Error', response.data.message);
        // navigation.navigate('CityScreen');
        
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials or network issue');
      console.log("error>>>>",error)
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Info', `Login with ${provider} not implemented yet`);
  };

  return (
    <View style={{flex:1,backgroundColor:"#C8C8C8"}}>
     {/* <View style={{padding:40}}>
      <ImageBackground source={require('../assets/Image/Rectangle 52.png')}>
      </ImageBackground>
     </View> */}
    <View style={styles.container}>
      <TextInput
        style={[styles.input, emailError && styles.errorInput]}
        placeholder="email@email.com"
        value={email}
        onChangeText={(text) => { setEmail(text); setEmailError(false); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>Email is required</Text>}
      <View style={{marginTop:10}}>
      <View style={[styles.passwordContainer, passwordError && styles.errorInput,]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(false);
          }}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
  <Image
    source={
      showPassword
        ? require('../assets/Image/hide.png') // Use your actual file path
        : require('../assets/Image/view.png')
    }
    style={{ width: 24, height: 24, tintColor: 'gray' }}
  />
</TouchableOpacity>
      </View>
      </View>
      {passwordError && <Text style={styles.errorText}>Password is required</Text>}

      <TouchableOpacity style={{ marginLeft: 200, bottom:0 }} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sign In...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <View style={{ marginLeft: 130, marginTop: 10 }}>
        <Text style={styles.socialButtonText}>
          Not a member?{' '}
          <Text
            style={[styles.socialButtonText, { textDecorationLine: 'underline', color: 'black' }]}
            onPress={() => navigation.navigate('SignupScreen')}
          >
            Signup here
          </Text>
        </Text>
      </View>


      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or signin with</Text>
        <View style={styles.line} />
      </View>

     <View style={{flexDirection:'row',justifyContent:'space-around',gap:10,marginTop:20}}>
  <Image source={require('../assets/Image/google.png')} style={styles.icon} />
  <Image source={require('../assets/Image/Black-Logo-Square.png')} style={styles.icon} />

  <Image source={require('../assets/Image/fb.png')} style={styles.icon} />
  </View>


      {/* Enter as Guest */}
      
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor:'white',
    elevation:5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor:'white',
    elevation:5
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1.5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  showHideText: {
    color: '#007bff',
    fontWeight: 'bold',
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: 'gray',
    marginBottom: 15,
  },
  button: {
    width: '40%',
    backgroundColor: '#21D393',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 180
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    // top:50
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: 'black'
  },
  guestText: {
    color: '#007bff',
    marginTop: 15,
    fontSize: 16,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjust as needed (e.g., 'center' or 'space-evenly')
    // alignItems: 'center',
    marginVertical: 20,
    marginTop:60
  },
  icon: {
    width: 40, // Adjust size as needed
    height: 40,
    resizeMode: 'contain',
    
  },
});

export default Home;
