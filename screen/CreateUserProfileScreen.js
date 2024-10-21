import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, Alert, StyleSheet, Platform, TextInput } from 'react-native';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text'; // Importa o TextInputMask
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const auth = getAuth();
const db = getFirestore();

const CreateUserProfileScreen = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [profession, setProfession] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [otherProfession, setOtherProfession] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  const { userType } = route.params;

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userData = {
          email: user.email,
          name,
          userType,
          dateOfBirth: dateOfBirth.toISOString(),
        };
  
        // Processar o campo de Instagram
        let instagramUsername = instagram.trim(); // Remover espaços em branco antes e depois
  
        if (instagramUsername.includes('instagram.com')) {
          // Extrair o nome de usuário do link
          const parts = instagramUsername.split('/');
          instagramUsername = parts[parts.length - 1] || parts[parts.length - 2]; // Caso tenha uma barra no final do link
        }
        
        // Remover '@' se estiver presente
        if (instagramUsername.startsWith('@')) {
          instagramUsername = instagramUsername.substring(1);
        }
  
        if (userType === 'profissional') {
          if (!name || !cpf || !contactNumber || !professionalEmail || !profession) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
          }
          userData.cpf = cpf;
          userData.contactNumber = contactNumber;
          userData.professionalEmail = professionalEmail;
          userData.profession = profession === 'Outro' ? otherProfession : profession;
          userData.instagram = instagramUsername; // Salvar o nome de usuário formatado sem o '@'
          userData.specialty = specialty;
        } else if (userType === 'client') {
          if (!name || !phoneNumber) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
          }
          userData.phoneNumber = phoneNumber;
          userData.additionalInfo = additionalInfo;
        }
  
        await setDoc(doc(db, 'users', user.uid), userData);
        Alert.alert('Perfil criado com sucesso!');
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Erro', error.message);
      }
    }
  };
  
  

  return (
    <LinearGradient
      colors={['#00aaff', '#0055ff']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Complete seu perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      {/* Selecionar data de nascimento */}
      <Text style={styles.label}>Nascimento</Text>
      {Platform.OS === 'web' ? (
        <DatePicker
          selected={dateOfBirth}
          onChange={date => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          className="input"
          showYearDropdown
          scrollableYearDropdown
          placeholderText="Selecionar Data de Nascimento"
        />
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={{ color: '#000' }}>{dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Selecionar Data de Nascimento'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      )}

      {userType === 'profissional' && (
        <>
          <TextInputMask
            type={'cpf'}
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
          />
          <TextInputMask
            type={'cel-phone'}
            style={styles.input}
            placeholder="Número de Contato"
            value={contactNumber}
            onChangeText={setContactNumber}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail Profissional"
            value={professionalEmail}
            onChangeText={setProfessionalEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Profissão"
            value={profession}
            onChangeText={setProfession}
          />
          {profession === 'Outro' && (
            <TextInput
              style={styles.input}
              placeholder="Especifique sua profissão"
              value={otherProfession}
              onChangeText={setOtherProfession}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Especialidade"
            value={specialty}
            onChangeText={setSpecialty}
          />
          <TextInput
            style={styles.input}
            placeholder="Instagram (opcional)"
            value={instagram}
            onChangeText={setInstagram}
          />
        </>
      )}

      {userType === 'client' && (
        <>
          <TextInputMask
            type={'cel-phone'}
            style={styles.input}
            placeholder="Número de Telefone"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Informações adicionais (opcionais)"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </>
      )}

      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonSave: {
    backgroundColor: '#ff5722',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CreateUserProfileScreen;