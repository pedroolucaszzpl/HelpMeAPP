import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore();
const auth = getAuth();

const ChatScreen = ({ route }) => {
  const { otherUserId, otherUserName, otherUserPhoto } = route.params; // ID do outro usuário
  const currentUser = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const createOrGetChatId = async () => {
      const chatDocId = [currentUser.uid, otherUserId].sort().join('_'); // Gera um ID único para o chat entre os dois usuários
      setChatId(chatDocId);

      const chatRef = doc(db, 'chats', chatDocId);
      const messagesRef = collection(chatRef, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      await setDoc(chatRef, {
        participants: [currentUser.uid, otherUserId],
      }, { merge: true });

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      });

      return () => unsubscribe();
    };

    createOrGetChatId();
  }, [currentUser.uid, otherUserId]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const message = {
        senderId: currentUser.uid,
        receiverId: otherUserId,
        message: newMessage,
        timestamp: new Date(),
      };

      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, message);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<-'}</Text> {/* Seta para voltar */}
        </TouchableOpacity>
        {otherUserPhoto && (
          <Image source={{ uri: otherUserPhoto }} style={styles.userPhoto} /> // Exibe a foto do usuário
        )}
        <Text style={styles.userName}>{otherUserName}</Text> {/* Exibe o nome do usuário */}
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.senderId === currentUser.uid ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />
      
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Digite sua mensagem"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatScreen;
