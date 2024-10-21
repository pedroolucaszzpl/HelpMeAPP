import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SplashScreen1 = ({ navigation }) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Help Me';
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(logoOpacity.value, { duration: 2000 }),
      transform: [{ scale: withTiming(logoScale.value, { duration: 2000 }) }],
    };
  });

  useEffect(() => {
    logoOpacity.value = 1;
    logoScale.value = 1;

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId); // Limpa o intervalo quando o texto completo é exibido
      }
    }, 300);

    const timer = setTimeout(() => {
      navigation.navigate('Splash2');
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Animated.View style={animatedStyle}>
          <Image source={require('../img/logo1.png')} style={styles.logo} />
        </Animated.View>
        <Text style={styles.animatedText}>{displayedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  animatedText: {
    marginTop: 20,
    fontSize: 36,
    color: '#003366',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SplashScreen1;
