// // In app/index.tsx
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router'; // Import the router
// import React from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const WelcomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

//       <View style={styles.contentContainer}>
//         <View style={styles.iconContainer}>
//           <Ionicons name="wallet" size={80} color="#4682B4" />
//         </View>

//         <Text style={styles.title}>Welcome to Anantdv Wallet</Text>
//         <Text style={styles.subtitle}>Your simple, secure, and smart digital wallet.</Text>

//         <View style={styles.buttonContainer}>
//           {/* Use router.push to navigate to the login screen */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push('./login')}
//           >
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>

//           {/* Use router.push to navigate to the register screen */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push('./register')}
//           >
//             <Text style={styles.buttonText}>Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// // Styles from the previous example remain the same
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E0FFFF',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   iconContainer: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 40,
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     marginTop: 10,
//     marginBottom: 50,
//     maxWidth: '80%',
//   },
//   buttonContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   button: {
//     backgroundColor: '#4682B4',
//     padding: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 15,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default WelcomeScreen;



import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const WelcomeScreen = () => {
  const contentScale = useRef(new Animated.Value(0.8)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const buttonScaleLogin = useRef(new Animated.Value(1)).current;
  const buttonScaleRegister = useRef(new Animated.Value(1)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Entrance animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Button press animations
  const handleButtonPressIn = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = (scaleRef: Animated.Value) => {
    Animated.spring(scaleRef, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4682B4" barStyle="light-content" />

      <Animated.View
        style={[
          styles.contentContainer,
          { transform: [{ scale: contentScale }], opacity: contentOpacity },
        ]}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0)']}
          style={styles.iconSheen}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="wallet" size={80} color="#4682B4" />
          </View>
        </LinearGradient>

        <Text style={styles.title}>Welcome to Anantdv Wallet</Text>
        <Text style={styles.subtitle}>
          Your simple, secure, and smart digital wallet
        </Text>
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Empowering your financial freedom
        </Animated.Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => handleButtonPressIn(buttonScaleLogin)}
            onPressOut={() => handleButtonPressOut(buttonScaleLogin)}
            onPress={() => router.push('./login')}
          >
            <Animated.View style={{ transform: [{ scale: buttonScaleLogin }] }}>
              <LinearGradient
                colors={['#4682B4', '#2B547E']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => handleButtonPressIn(buttonScaleRegister)}
            onPressOut={() => handleButtonPressOut(buttonScaleRegister)}
            onPress={() => router.push('./register')}
          >
            <Animated.View style={{ transform: [{ scale: buttonScaleRegister }] }}>
              <LinearGradient
                colors={['#4682B4', '#2B547E']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.buttonText}>Register</Text>
              </LinearGradient>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  iconSheen: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: '85%',
    lineHeight: 24,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    fontStyle: 'italic',
    color: '#4682B4',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '85%',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;