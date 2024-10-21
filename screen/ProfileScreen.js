import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones
import * as ImagePicker from 'expo-image-picker'; // Para selecionar imagens
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Ajuste o caminho se necessário
import { useNavigation } from '@react-navigation/native'; // Importação da função de navegação
import { signOut } from 'firebase/auth'; // Importa a função de logout

const db = getFirestore();

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhoto, setNewPhoto] = useState(null); // Adicionar estado para a nova foto
  const [photoChanged, setPhotoChanged] = useState(false);

  const navigation = useNavigation(); // Hook de navegação

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setNewName(userDoc.data().name); // Define o nome atual no TextInput
          } else {
            setError('Nenhum dado encontrado para este usuário.');
          }
        } else {
          setError('Usuário não autenticado.');
        }
      } catch (error) {
        setError('Erro ao carregar dados do usuário.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const updates = {};
        if (newName.trim() !== '') {
          updates.name = newName;
        }
        if (photoChanged) {
          updates.photoURL = newPhoto; // Atualiza a URL da foto
        }
        await updateDoc(userDocRef, updates);
        setUserData(prevData => ({
          ...prevData,
          name: newName,
          photoURL: newPhoto || prevData.photoURL,
        }));
        setEditing(false);
      }
    } catch (error) {
      setError('Erro ao atualizar perfil.');
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPhoto(result.assets[0].uri);
      setPhotoChanged(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Navegar de volta para a tela de autenticação ou inicial
      navigation.navigate('AuthScreens');
    } catch (error) {
      setError('Erro ao fazer logout.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0078f2" />;
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
      {/* Parte superior com imagem de perfil e nome */}
      <View style={styles.header}>
        <Image
          source={{ uri: userData?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
          style={styles.profileImage}
        />
        <View style={styles.headerText}>
          <Text style={styles.nameText}>{userData?.name}</Text>
          <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Ionicons name="pencil" size={24} color="#0078f2" style={styles.editIcon} />
        </TouchableOpacity>
      </View>

      {/* Seções */}
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('About')}>
        <Ionicons name="information-circle-outline" size={24} color="#0078f2" />
        <Text style={styles.sectionText}>Sobre</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#0078f2" style={styles.chevronIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('Favorites')}>
        <Ionicons name="heart-outline" size={24} color="#0078f2" />
        <Text style={styles.sectionText}>Favoritos</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#0078f2" style={styles.chevronIcon} />
      </TouchableOpacity>

      {/* Nova seção para postagem no portfólio */}
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('PortfolioPost')}>
        <Ionicons name="images-outline" size={24} color="#0078f2" />
        <Text style={styles.sectionText}>Meu Portfólio</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#0078f2" style={styles.chevronIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Ionicons name="location-outline" size={24} color="#0078f2" />
        <Text style={styles.sectionText}>Endereços</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.section} onPress={() => navigation.navigate('AccountData')}>
        <Ionicons name="person-outline" size={24} color="#0078f2" />
        <Text style={styles.sectionText}>Dados da Conta</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#0078f2" style={styles.chevronIcon} />
      </TouchableOpacity>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ff4d4d" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      {/* Logo na parte inferior */}
      <View style={styles.footer}>
        <Image
          source={require('../img/logohelpme1.png')} // Insira aqui a URL da sua logo
          style={styles.logo}
        />
      </View>

      {/* Modal de Edição */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={editing}
        onRequestClose={() => setEditing(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            {/* Seção para selecionar a foto */}
            <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
              <Ionicons name="camera" size={24} color="#0078f2" />
              <Text style={styles.imagePickerText}>Escolher Foto</Text>
            </TouchableOpacity>
            {newPhoto && (
              <Image source={{ uri: newPhoto }} style={styles.previewImage} />
            )}

            {/* Seção para editar nome */}
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Digite o novo nome"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditing(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0078f2',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0078f2',
  },
  emailText: {
    fontSize: 14,
    color: '#666',
  },
  editIcon: {
    marginLeft: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sectionText: {
    flex: 1,
    fontSize: 16,
    color: '#0078f2',
    marginLeft: 15,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4d4d',
    marginLeft: 15,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#0078f2',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#0078f2',
    fontSize: 16,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#0078f2',
    marginLeft: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ProfileScreen;
