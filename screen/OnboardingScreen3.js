import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OnboardingScreen3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../img/trabalhador4.png')} style={styles.illustration} />
      <Text style={styles.title}>Suporte</Text>
      <Text style={styles.description}>
        Estamos aqui para ajudar sempre que precisar.
      </Text>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')} style={styles.navigationButton}>
          <Ionicons name="chevron-back-circle" size={30} color="#007BFF" />
        </TouchableOpacity>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dotActive} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AuthScreens')} style={styles.navigationButton}>
          <Ionicons name="checkmark-circle" size={30} color="#007BFF" />
        </TouchableOpacity>
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
    padding: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#003366',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  navigationButton: {
    padding: 10,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#CCCCCC',
    marginHorizontal: 6,
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
    marginHorizontal: 6,
  },
});

export default OnboardingScreen3;