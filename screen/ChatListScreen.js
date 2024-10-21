import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchChats = async () => {
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef); // Consulta para obter todos os chats

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chatData = [];
        snapshot.docs.forEach((doc) => {
          const participants = doc.data().participants || [];
          if (participants.includes(currentUser.uid)) {
            chatData.push({ id: doc.id, participants }); // Armazena os participantes do chat
          }
        });
        setChats(chatData); // Atualiza o estado com os chats retornados
      });

      return () => unsubscribe();
    };

    fetchChats();
  }, [currentUser.uid]);

  const renderChatItem = ({ item }) => {
    const otherUserId = item.participants.find(uid => uid !== currentUser.uid); // Obtém o ID do outro usuário
    // Simulação de dados de usuário. Substitua isso por uma consulta real ao banco de dados de usuários.
    const otherUserName = `Usuário ${otherUserId}`; // Substitua pelo nome real do usuário
    const otherUserPhoto = 'https://via.placeholder.com/40'; // Substitua pela URL real da foto do usuário

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatScreen', { otherUserId, otherUserName, otherUserPhoto })} // Navega para a ChatScreen
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#000" />
        <Text style={styles.chatText}>{otherUserName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      {chats.length === 0 ? (
        <Text style={styles.noChatsText}>Nenhum chat iniciado</Text>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noChatsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 50,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  chatText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});

export default ChatListScreen;
