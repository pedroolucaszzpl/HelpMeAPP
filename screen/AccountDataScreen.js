import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const AccountDataScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation();

  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('Nenhum documento encontrado!');
          }
        } else {
          console.log('Nenhum usuário autenticado!');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSavePress = async () => {
    try {
      const user = auth.currentUser;

      if (user && userData) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, userData);
        Alert.alert('Sucesso', 'Informações atualizadas com sucesso.');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados do Firestore: ', error);
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
    } finally {
      setIsEditing(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#0056b3" />
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        {userData && (
          <>
            {userData.name && (
              <View style={styles.item}>
                <Text style={styles.label}>Nome:</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userData.name}
                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                  />
                ) : (
                  <Text style={styles.value}>{userData.name}</Text>
                )}
              </View>
            )}

            {userData.email && (
              <View style={styles.item}>
                <Text style={styles.label}>E-mail:</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userData.email}
                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                  />
                ) : (
                  <Text style={styles.value}>{userData.email}</Text>
                )}
              </View>
            )}

            {userData.phoneNumber && (
              <View style={styles.item}>
                <Text style={styles.label}>Número de Contato:</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.input}
                    value={userData.phoneNumber}
                    onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                  />
                ) : (
                  <Text style={styles.value}>{userData.phoneNumber}</Text>
                )}
              </View>
            )}
          </>
        )}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={isEditing ? handleSavePress : handleEditPress}>
        <FontAwesome name={isEditing ? "check" : "pencil"} size={24} color="white" />
        <Text style={styles.buttonText}>{isEditing ? "Salvar" : "Editar"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eaf2f8',
  },
  dataContainer: {
    marginTop: 60,
    marginBottom: 50,
  },
  item: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  value: {
    fontSize: 16,
    color: '#333333',
  },
  input: {
    fontSize: 16,
    color: '#333333',
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    padding: 4,
  },
  editButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0056b3',
    borderRadius: 50,
    padding: 10,
    elevation: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#eaf2f8',
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
  },
});

export default AccountDataScreen;
