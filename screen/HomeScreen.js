import React, { useEffect, useState } from 'react';  
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';  // Ícone de chat

const db = getFirestore();

const HomeScreen = ({ navigation }) => {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const q = query(collection(db, 'users'), where('userType', '==', 'profissional'));
        const querySnapshot = await getDocs(q);
        const professionalsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('Erro ao buscar profissionais: ', error);
      }
    };

    fetchProfessionals();
  }, []);

  const handleInstagramPress = (instagramUrl) => {
    if (instagramUrl) {
      Linking.openURL(instagramUrl);
    } else {
      console.log('Instagram URL não disponível');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
        style={styles.photo}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.profession}>{item.profession}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileDetail', { userId: item.id })}
      >
        <Text style={styles.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#00aaff', '#0055ff']} // Gradiente azul claro para escuro
      style={styles.container}
    >
      <Image 
        source={require('../img/logohelpme2.png')} 
        style={styles.logo}
      />
      
      {/* Ícone de Chat no canto superior direito */}
      <TouchableOpacity
        style={styles.chatIconContainer}
        onPress={() => navigation.navigate('ChatListScreen')} // Navega para a tela de chat
      >
        <Ionicons name="chatbubble-outline" size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.contentContainer}> {/* Fundo branco */}
        <Text style={styles.title}>Profissionais da sua região</Text>
        <FlatList
          data={professionals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2} // Exibir em duas colunas
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 120,
    alignSelf: 'center',
    marginVertical: 15,
  },
  chatIconContainer: {
    position: 'absolute',  // Coloca o ícone no canto superior direito
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 5,  // Adiciona sombra no Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3, // Adiciona sombra no iOS
  },
  contentContainer: {
    backgroundColor: '#fff', // Fundo branco
    borderTopLeftRadius: 20,  // Borda arredondada somente no topo esquerdo
    borderTopRightRadius: 20,
    padding: 20,
    height: 'auto',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  flatListContent: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0', // Fundo cinza dos cards
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // Adicionando a sombra para profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  profession: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0091F2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd', // Cor de fundo para caso não haja foto
  },
});

export default HomeScreen;
