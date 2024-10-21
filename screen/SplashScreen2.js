import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const SplashScreen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../img/trabalhador.png')} style={styles.illustration} />
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Comece sua jornada com a gente!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Onboarding1')} style={styles.arrowButton}>
        <Text style={styles.arrowText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  arrowButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SplashScreen2;
