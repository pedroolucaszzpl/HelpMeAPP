import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Importe o LinearGradient

const UserTypeSelectionScreen = () => {
  const navigation = useNavigation();

  const handleSelectType = (type) => {
    navigation.navigate('CreateUserProfile', { userType: type });
  };

  return (
    <LinearGradient
      colors={['#00aaff', '#0055ff']} // Azul claro para escuro
      style={styles.container}
    >
      <Image source={require('../img/logohelpme2.png')} style={styles.logo} />
      <Text style={styles.title}>Escolha o tipo de usuário</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleSelectType('profissional')}>
        <Text style={styles.buttonText}>Profissional</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleSelectType('client')}>
        <Text style={styles.buttonText}>Contratante</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200, // Ajuste o tamanho conforme necessário
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff', // Fundo branco
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc', // Cor da borda
  },
  buttonText: {
    color: '#0078f2',
    fontSize: 18,
  },
});

export default UserTypeSelectionScreen;
