import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore'; // Importar doc
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const storage = getStorage();
const db = getFirestore();
const auth = getAuth();

const PostImageScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const currentUser = auth.currentUser;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de acesso à galeria é necessária!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Selecione uma imagem antes de postar.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Adicione uma descrição antes de postar.');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `portfolioImages/${currentUser.uid}/${Date.now()}.jpg`);

      // Fazendo upload da imagem
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // Adiciona o post à subcoleção "posts" do usuário autenticado
      const userPostsRef = collection(db, 'posts', currentUser.uid, 'userPosts');
      const postData = {
        imageUrl: downloadURL,
        description: description,
        timestamp: new Date(),
      };

      await addDoc(userPostsRef, postData);

      Alert.alert('Imagem postada com sucesso!');
      setImageUri(null); // Limpa a imagem selecionada
      setDescription(''); // Limpa a descrição
      navigation.goBack(); // Volta para a página anterior após o upload
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      Alert.alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Postar no Portfólio</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.selectedImage} />
        ) : (
          <Ionicons name="image-outline" size={50} color="#666" />
        )}
        <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Adicione uma descrição..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {uploading ? (
        <ActivityIndicator size="large" color="#00aaff" />
      ) : (
        <TouchableOpacity style={styles.postButton} onPress={uploadImage}>
          <Text style={styles.postButtonText}>Postar Imagem</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aaff', // Fundo azul
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Cor do texto em branco
  },
  imagePicker: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fundo branco para destacar a área da imagem
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000', // Adicionando sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Efeito de elevação para Android
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  descriptionInput: {
    height: 80,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // Fundo branco para a entrada de texto
  },
  postButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PostImageScreen;
