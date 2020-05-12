import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState([]);

  const storeData = (email, password) => {
    if (!email || !password) {
      Alert.alert(
        'Error',
        'Please enter the email and password!',
        [
          {
            text: 'Okay',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setData(() => {
        return [{email}, {password}];
      });
    }
  };
 
  return (
    <View style={styles.loginUI}>
      <Text style={styles.title}>LetsMeet</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <View style={styles.loginSignup}>
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
            storeData(email, password);
            setEmail('');
            setPassword('');
            }}>
            <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.btn}>
            <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>    
    </View>
  );
};

const styles = StyleSheet.create({
  loginUI: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40, 
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: 'purple',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: 'purple',
    fontSize: 23,
    textAlign: 'center',
  },
  loginSignup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default Login;