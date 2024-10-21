import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import logo from '../img/logohelpme2.png';

const auth = getAuth();
const db = getFirestore();

const createUserProfile = async (user) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      // Adicione outros dados do perfil aqui
    });
    console.log('Perfil do usuário criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar perfil do usuário:', error);
  }
};

const AuthScreens = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  // Limpa os campos de email e senha sempre que o componente é montado
  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async () => {
    if (!isLogin) {
      // Validação do e-mail e senha durante o cadastro
      if (!email.includes('@')) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Por favor, insira um email válido.',
        });
        return;
      }
      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'A senha deve ter pelo menos 6 caracteres.',
        });
        return;
      }
    }

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        Toast.show({
          type: 'success',
          text1: 'Login bem-sucedido',
        });
        navigation.navigate('Home');
      } else {
        // Cadastro
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await createUserProfile(user);
        Toast.show({
          type: 'success',
          text1: 'Cadastro bem-sucedido',
        });
        navigation.navigate('UserTypeSelection');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.welcomeText}>Bem-vindo(a)!</Text>
        <Image source={logo} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{isLogin ? 'Entrar' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Ou entre com:</Text>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>F</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin ? 'Ainda não possui uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#0078f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 120,
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0078f2',
    paddingVertical: 8,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#0078f2',
    textAlign: 'center',
    marginBottom: 20,
  },
  orText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  switchText: {
    marginTop: 10,
    color: '#0078f2',
    textAlign: 'center',
  },
});

export default AuthScreens;
