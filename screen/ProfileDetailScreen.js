import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const db = getFirestore();
const auth = getAuth();

const ProfileDetailScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          await checkIfFavorite(userDoc.id); // Passar o id do usuário aqui
        } else {
          setError('Nenhum dado encontrado para este usuário.');
        }
      } catch (error) {
        setError('Erro ao carregar dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecommendedProfiles = async () => {
      try {
        const q = query(collection(db, 'users'), where('userType', '==', 'Profissional'));
        const querySnapshot = await getDocs(q);
        const profiles = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== userId) {
            profiles.push({ id: doc.id, ...doc.data() });
          }
        });
        setRecommendedProfiles(profiles);
      } catch (error) {
        setError('Erro ao carregar perfis recomendados.');
      }
    };

    fetchUserData();
    fetchRecommendedProfiles();
  }, [userId]);

  const checkIfFavorite = async (userId) => {
    try {
      const favoritesDocRef = doc(db, 'favoritos', currentUser.uid);
      const favoritesSnapshot = await getDoc(favoritesDocRef);
      if (favoritesSnapshot.exists()) {
        const favoritesData = favoritesSnapshot.data();
        if (favoritesData[userId]) {
          setIsFavorite(true); // Ajuste aqui: use o userId em vez de data.id
        }
      }
    } catch (error) {
      console.error('Erro ao verificar favoritos:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favoritesDocRef = doc(db, 'favoritos', currentUser.uid);
      const favoritesSnapshot = await getDoc(favoritesDocRef);
      const favoritesData = favoritesSnapshot.exists() ? favoritesSnapshot.data() : {};

      if (isFavorite) {
        // Remove do favoritos
        delete favoritesData[userId];
        Alert.alert('Perfil removido dos favoritos!');
      } else {
        // Adiciona aos favoritos
        favoritesData[userId] = userData; // Adicione os dados do usuário
        Alert.alert('Perfil adicionado aos favoritos!');
      }

      // Salva no Firestore
      await setDoc(favoritesDocRef, favoritesData);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error);
      Alert.alert('Erro ao atualizar favoritos!');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0066cc" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <LinearGradient colors={['#003366', '#4E98F2']} style={styles.topContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: userData?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
            style={styles.profilePicture}
          />
          {userData?.instagram && (
            <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${userData.instagram.replace('@', '')}`)}>
              <Ionicons name="logo-instagram" size={30} color="#000" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={30} color={isFavorite ? "red" : "#fff"} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Detalhes do Perfil</Text>
        <Text style={styles.boldLabel}>Nome: {userData?.name}</Text>
        <Text style={styles.italicLabel}>Email: {userData?.email}</Text>
        {userData?.userType === 'Profissional' && (
          <Text style={styles.label}>Profissão: {userData?.profession}</Text>
        )}
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ChatScreen', { otherUserId: userId })}>
          <Text style={styles.contactButtonText}>Contatar</Text>
        </TouchableOpacity>


        <View style={styles.worksContainer}>
          <Text style={styles.worksTitle}>Trabalhos Realizados</Text>
          {userData?.works && userData.works.length > 0 ? (
            <FlatList
              data={userData.works}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.workItem}>{item}</Text>}
            />
          ) : (
            <Text style={styles.noWorksText}>Este usuário não recebeu nenhum feedback.</Text>
          )}
        </View>

        <View style={styles.recommendedContainer}>
          <Text style={styles.recommendedTitle}>Portfólio do Profissional</Text>
          <FlatList
            data={recommendedProfiles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.recommendedProfile}>
                <Image
                  source={{ uri: item.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
                  style={styles.recommendedProfilePicture}
                />
                <Text style={styles.recommendedProfileName}>{item.name}</Text>
                <Text style={styles.recommendedProfileProfession}>{item.profession}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    paddingTop: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'sans-serif',
  },
  boldLabel: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  italicLabel: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  profilePictureContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  worksContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  worksTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noWorksText: {
    fontSize: 16,
    color: '#666',
  },
  recommendedContainer: {
    marginTop: 30,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    fontFamily: 'sans-serif',
  },
  recommendedProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendedProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  recommendedProfileName: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  recommendedProfileProfession: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'sans-serif',
  },
  contactButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default ProfileDetailScreen;
