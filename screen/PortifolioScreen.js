import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; // Para ícones

const db = getFirestore();
const auth = getAuth();

const PortfolioPostScreen = () => {
  const [portfolioPosts, setPortfolioPosts] = useState([]);
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPortfolioPosts = async () => {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setPortfolioPosts(docSnap.data().portfolioImages || []);
      }
    };

    fetchPortfolioPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} 
      >
        <Ionicons name="arrow-back" size={24} color="#003366" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Meu Portfólio</Text>

        <TouchableOpacity 
          style={styles.addPostButton} 
          onPress={() => navigation.navigate('PostImage')}
        >
          <Text style={styles.addPostButtonText}>Adicionar Postagem</Text>
        </TouchableOpacity>

        {portfolioPosts.length === 0 ? (
          <Text style={styles.noPostsText}>Nenhuma postagem encontrada</Text>
        ) : (
          <FlatList
            data={portfolioPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.portfolioItem}>
                <Image source={{ uri: item.url }} style={styles.portfolioImage} />
                <Text style={styles.portfolioDescription}>{item.description}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aaff', // Fundo azul
  },
  contentContainer: {
    backgroundColor: '#fff', // Fundo branco para a parte principal
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 'auto',
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },
  addPostButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  addPostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  portfolioItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  portfolioImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  portfolioDescription: {
    textAlign: 'center',
    color: '#666',
  },
  listContainer: {
    paddingBottom: 20,
  },
  noPostsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default PortfolioPostScreen;
