// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const RegistrationScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       <View style={styles.header}>
//         <Text style={styles.title}>Create Account</Text>
//         <Text style={styles.subtitle}>Join the Anantdv Wallet </Text>
//       </View>

//       <View style={styles.formContainer}>
//         <View style={styles.inputContainer}>
//           <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             placeholderTextColor="#888"
//             value={name}
//             onChangeText={setName}
//             autoCapitalize="words"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="mail-outline" size={22} color="#888" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             placeholderTextColor="#888"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.inputIcon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Create a password"
//             placeholderTextColor="#888"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//         </View>

//         <TouchableOpacity style={styles.registerButton} onPress={() => router.push('./login')}>
//           <Text style={styles.registerButtonText}>Register</Text>
//         </TouchableOpacity>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>Already have an account? </Text>
//           <TouchableOpacity onPress={() => router.push('./login')}>
//             <Text style={styles.footerLink}>Log In</Text>
//           </TouchableOpacity>
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
//     backgroundColor: '#4682B4',
//     padding: 30,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     color: '#fff',
//     fontSize: 16,
//     marginTop: 5,
//   },
//   formContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     color: '#333',
//   },
//   registerButton: {
//     backgroundColor: '#4682B4',
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   registerButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
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

// export default RegistrationScreen;



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

// const RegistrationScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section (same style as login) */}
//       <LinearGradient
//         colors={['#4682B4', '#5A9BD4']}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0)']}
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <Ionicons name="person-add-outline" size={36} color="#fff" style={styles.logoIcon} />
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Create Account</Text>
//             <Text style={styles.subtitle}>Join the Anantdv Wallet</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Form */}
//       <View style={styles.formWrapper}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your name"
//               placeholderTextColor="#888"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//             />
//           </View>

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
//               placeholder="Create a password"
//               placeholderTextColor="#888"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.registerButton} onPress={() => router.push('./login')}>
//             <Text style={styles.registerButtonText}>Register</Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('./login')}>
//               <Text style={styles.footerLink}>Log In</Text>
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
//     borderRadius: 20,
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
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   subtitle: {
//     color: '#E0E0E0',
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
//   registerButton: {
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
//   registerButtonText: {
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

// export default RegistrationScreen;



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

// const RegistrationScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       {/* Header Section */}
//       <LinearGradient
//         colors={['#4682B4', '#2B547E']} // Exact match with DashBoardScreen
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <LinearGradient
//           colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0)']} // Exact sheen effect
//           style={styles.headerSheen}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//         />
//         <View style={styles.headerInner}>
//           <Ionicons name="person-add-outline" size={36} color="#fff" style={styles.logoIcon} />
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>Create Account</Text>
//             <Text style={styles.subtitle}>Join Anantdv Wallet</Text>
//           </View>
//         </View>
//       </LinearGradient>

//       {/* Form */}
//       <View style={styles.formWrapper}>
//         <View style={styles.formContainer}>
//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your name"
//               placeholderTextColor="#888"
//               value={name}
//               onChangeText={setName}
//               autoCapitalize="words"
//             />
//           </View>

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
//               placeholder="Create a password"
//               placeholderTextColor="#888"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.registerButton} onPress={() => router.push('./login')}>
//             <Text style={styles.registerButtonText}>Register</Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => router.push('./login')}>
//               <Text style={styles.footerLink}>Log In</Text>
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
//     borderRadius: 20,
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
//     fontFamily: 'RobotoSlab-Bold', // Match DashBoardScreen typography
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   subtitle: {
//     color: '#E0E0E0',
//     fontSize: 14,
//     fontFamily: 'Roboto-Regular', // Match DashBoardScreen typography
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
//   registerButton: {
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
//   registerButtonText: {
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

// export default RegistrationScreen;



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

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
        router.push('./login');
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
          <Ionicons name="person-add-outline" size={36} color="#fff" style={styles.logoIcon} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Anantdv Wallet</Text>
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
              <Ionicons name="person-outline" size={22} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
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
                placeholder="Create a password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
                placeholder="Confirm your password"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </LinearGradient>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            onPress={() => router.push('./login')}
          >
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <LinearGradient
                colors={['#4682B4', '#2B547E']}
                style={styles.registerButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('./login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.swipeHint}>Swipe up to login</Text>
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
    borderRadius: 20,
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
    textShadowRadius: 2,
  },
  subtitle: {
    color: '#E0E0E0',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
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
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto-Regular',
  },
  registerButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
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
    fontFamily: 'Roboto-Regular',
  },
  footerLink: {
    color: '#4682B4',
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
  },
  swipeHint: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RegistrationScreen;