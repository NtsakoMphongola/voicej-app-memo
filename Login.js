import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import  {firebaseConfig} from './config.js';
import firebase  from 'firebase/compat/app';

const Login = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] =useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const sendVerification = () =>{
    if (!phoneNumber.trim()) {
      alert('Please Enter Phone Number');
      return;
    }else{
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
    .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
    .then(setVerificationId);
    setPhoneNumber('');
    }
  };
  const confirmCode = () =>{
    const credential=firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
    );
    firebase.auth().signInWithCredential(credential)
    .then(()=>{
        setCode('');
    })
    .catch((error) => {
        alert("Error");
    })
    if (!code.trim()) {
      alert('Please Enter Code');
      return;
    }else{
    alert(
        'Welcome',
    );
    navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
    < FirebaseRecaptchaVerifierModal
    ref= {recaptchaVerifier}
    firebaseConfig={firebaseConfig}
    />
    <Text style={{ fontSize:24,
      fontWeight:'bold',
      color:'#fff',
      margim:20}}>
      LogIn
    </Text>
    <TextInput
    placeholder='Enter your phone start with country code'
    onChangeText={setPhoneNumber}
    keyboardType='phone-pad'
    autoCompleteType='tel'
    style={{paddingTop:40,paddingBottom:20,paddingHorizontal:20, fontSize:24, borderBottomColor: '#fff',borderBottomWidth: 2, marginBottom: 20, textAlign:'center',color:'#fff'}}
    />
    <TouchableOpacity style={styles.sendVerificationq} onPress={sendVerification}>
      <Text style={{ textAlign:'center',color:'#fff', fontWeight:'bold'}}>
          Send Verification Code
      </Text>
    </TouchableOpacity>
    <TextInput
    placeholder='Confirm Code'
    onChangeText={setCode}
    keyboardType='number-pad'
    style={{paddingTop:40,paddingBottom:20,paddingHorizontal:20, fontSize:24, borderBottomColor: '#fff',borderBottomWidth: 2, marginBottom: 20, textAlign:'center',color:'#fff'}}
    />
      <TouchableOpacity style={styles.sendCode}  onPress = {confirmCode}>
      <Text style={{ textAlign:'center',color:'#fff', fontWeight:'bold'}}>
          Confirm Verification Code
      </Text>
    </TouchableOpacity>
  </View>
)
}

export default Login

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
  },
  sendVerificationq:{
      padding:20,
      backgroundColor:'#3498DB',
      borderRadius:10,
  },
  sendCode:{
      padding:20,
      backgroundColor:'#9B59B6',
      borderRadius:10,
  },
})