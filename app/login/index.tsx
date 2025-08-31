
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';


// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       <View style={styles.header}>
//   <Ionicons name="wallet-outline" size={36} color="#fff" style={styles.logoIcon} />
//   <View style={styles.headerTextContainer}>
//     <Text style={styles.title}>Welcome Back!</Text>
//     <Text style={styles.subtitle}>Log in to Anantdv Wallet</Text>
//   </View>
// </View>


//       <View style={styles.formWrapper}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               placeholderTextColor="#888"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#888"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.loginButton} onPress={() => router.push('./dashboard')}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('./register')}>
//               <Text style={styles.footerLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//   backgroundColor: '#4682B4',
//   paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 30,
//   paddingBottom: 30,
//   paddingHorizontal: 20,
//   borderTopLeftRadius:12,
//   borderTopRightRadius: 12,
//   borderBottomLeftRadius: 12,
//   borderBottomRightRadius: 12,
//   marginHorizontal: 0.5,
//   marginTop: 0.5,
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'flex-start',
//   elevation: 8,
//   shadowColor: '#000',
//   shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
    
 
// },
// logoContainer: {
//   display: 'none' // or just remove it if not used
// },

// logoIcon: {
//   marginRight: 12,
// },
// headerTextContainer: {
//   flex: 1,
// },
// title: {
//   color: '#fff',
//   fontSize: 22,
//   fontWeight: 'bold',
// },
// subtitle: {
//   color: '#fff',
//   fontSize: 14,
//   marginTop: 2,
// },

//   logoContainer: {
//     backgroundColor: '#5A9BD5',
//     padding: 12,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
 
//   formWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F8FF',
//     borderRadius: 12,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     height: 50,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#4682B4',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15,
//   },
//   footerText: {
//     color: '#333',
//     fontSize: 14,
//   },
//   footerLink: {
//     color: '#4682B4',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;



// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']} // Match dashboard gradient
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0)']} // Sheen effect
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <Ionicons name="wallet-outline" size={36} color="#fff" style={styles.logoIcon} />
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Welcome Back!</Text>
//             <Text style={styles.subtitle}>Log in to Anantdv Wallet</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       <View style={styles.formWrapper}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               placeholderTextColor="#888"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#888"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.loginButton} onPress={() => router.push('./dashboard')}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('./register')}>
//               <Text style={styles.footerLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 30,
//     paddingBottom: 30,
//     paddingHorizontal: 20,
//     borderTopLeftRadius: 20, // Match dashboard rounding
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     marginHorizontal: 0.5,
//     marginTop: 0.5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoIcon: {
//     marginRight: 12,
//   },
//   headerTextContainer: {
//     flex: 1,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)', // Match dashboard text shadow
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   subtitle: {
//     color: '#E0E0E0', // Match dashboard subtitle color
//     fontSize: 14,
//     marginTop: 2,
//   },
//   formWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F8FF',
//     borderRadius: 12,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     height: 50,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#4682B4',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15,
//   },
//   footerText: {
//     color: '#333',
//     fontSize: 14,
//   },
//   footerLink: {
//     color: '#4682B4',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;


// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#2B547E']} // Exact match with dashboard
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']} // Updated sheen effect
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <Ionicons name="wallet-outline" size={36} color="#fff" style={styles.logoIcon} />
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Welcome Back!</Text>
//             <Text style={styles.subtitle}>Log in to Anantdv Wallet</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       <View style={styles.formWrapper}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               placeholderTextColor="#888"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               placeholderTextColor="#888"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.loginButton} onPress={() => router.push('./dashboard')}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('./register')}>
//               <Text style={styles.footerLink}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   header: {
//     paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 30,
//     paddingBottom: 30,
//     paddingHorizontal: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     marginHorizontal: 0.5,
//     marginTop: 0.5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//   },
//   headerSheen: {
//     ...StyleSheet.absoluteFillObject,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerInner: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoIcon: {
//     marginRight: 12,
//   },
//   headerTextContainer: {
//     flex: 1,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 22,
//     fontFamily: 'RobotoSlab-Bold', // Match dashboard typography
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   subtitle: {
//     color: '#E0E0E0',
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular', // Match dashboard typography
//     marginTop: 2,
//   },
//   formWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 25,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F0F8FF',
//     borderRadius: 12,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     height: 50,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#4682B4',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15,
//   },
//   footerText: {
//     color: '#333',
//     fontSize: 14,
//   },
//   footerLink: {
//     color: '#4682B4',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;



import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formScale = useRef(new Animated.Value(0.8)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Form entrance animation
  useEffect(() => {
    Animated.timing(formScale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Button press animation
  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Swipe-up gesture handler
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < -100) {
        router.push('./register');
      }
    },
    onPanResponderRelease: () => {},
  });

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

      {/* Header Section */}
      <LinearGradient
        colors={['#4682B4', '#2B547E']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']}
          style={styles.headerSheen}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.headerInner}>
          <Ionicons name="wallet-outline" size={36} color="#fff" style={styles.logoIcon} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to Anantdv Wallet</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.formWrapper}>
        <Animated.View style={[styles.formContainer, { transform: [{ scale: formScale }] }]}>
          <LinearGradient
            colors={['#4682B4', '#2B547E']}
            style={styles.inputGradientBorder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#4682B4', '#2B547E']}
            style={styles.inputGradientBorder}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </LinearGradient>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => console.log('Forgot Password pressed')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            onPress={() => router.push('./dashboard')}
          >
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <LinearGradient
                colors={['#4682B4', '#2B547E']}
                style={styles.loginButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('./register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.swipeHint}>Swipe up to register</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 0.5,
    marginTop: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  headerSheen: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
    marginTop: 2,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  inputGradientBorder: {
    borderRadius: 12,
    padding: 2,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter-Regular',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#4682B4',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  footerText: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  footerLink: {
    color: '#4682B4',
    fontSize: 14,
    fontFamily: 'InterBold',
    fontWeight: 'bold',
  },
  swipeHint: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;