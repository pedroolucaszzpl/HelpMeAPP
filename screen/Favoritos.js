import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const db = getFirestore();
const auth = getAuth();

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log("Usuário logado:", user.uid); // Log do usuário logado
          const favoritesDocRef = doc(db, 'favoritos', user.uid);
          const favoritesSnapshot = await getDoc(favoritesDocRef);

          if (favoritesSnapshot.exists()) {
            const favoritesData = favoritesSnapshot.data();
            const favoriteIds = Object.keys(favoritesData); // IDs dos usuários favoritos
            const favoriteProfiles = await Promise.all(favoriteIds.map(async (id) => {
              const userDocRef = doc(db, 'users', id);
              const userDoc = await getDoc(userDocRef);
              if (userDoc.exists()) {
                return { id: userDoc.id, ...userDoc.data() };
              }
              return null; // Caso o documento não exista
            }));
            const filteredFavorites = favoriteProfiles.filter(profile => profile !== null);
            setFavorites(filteredFavorites);
          } else {
            setError('Nenhum favorito encontrado.');
          }
        }
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error); // Log do erro
        setError('Erro ao carregar favoritos.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0066cc" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Favoritos</Text>
        <Text style={styles.noFavoritesText}>Você ainda não tem favoritos.</Text>
      </View>
    );
  }

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
        style={styles.favoriteImage}
      />
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteProfession}>{item.profession}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail', { userId: item.id })}>
        <Ionicons name="heart" size={24} color="red" style={styles.heartIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#00aaff', '#0055ff']} style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          numColumns={2} // Exibir em duas colunas
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 'auto',
    flex: 1,
    marginTop: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginRight: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '45%', // Para garantir a largura das colunas
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  favoriteInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  favoriteProfession: {
    fontSize: 14,
    color: '#666',
  },
  heartIcon: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
