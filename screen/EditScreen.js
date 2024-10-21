import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditScreen = ({ route }) => {
  const { accountData } = route.params; // Dados da conta enviados pela tela anterior
  const navigation = useNavigation();

  // Usando o estado local para armazenar os valores editáveis
  const [name, setName] = useState(accountData.name);
  const [email, setEmail] = useState(accountData.email);
  const [contactNumber, setContactNumber] = useState(accountData.contactNumber);
  const [cpf, setCpf] = useState(accountData.cpf);
  const [profession, setProfession] = useState(accountData.profession);
  const [professionalEmail, setProfessionalEmail] = useState(accountData.professionalEmail);
  const [specialty, setSpecialty] = useState(accountData.specialty);
  const [birthDate, setBirthDate] = useState(accountData.birthDate);
  const [instagram, setInstagram] = useState(accountData.instagram);

  const handleSave = () => {
    // Aqui você pode salvar as alterações no Firebase ou em outro backend
    alert('Dados salvos com sucesso!');

    // Após salvar, navegar de volta para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Número de Contato:</Text>
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <Text style={styles.label}>CPF:</Text>
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={setCpf}
        />

        <Text style={styles.label}>Profissão:</Text>
        <TextInput
          style={styles.input}
          value={profession}
          onChangeText={setProfession}
        />

        <Text style={styles.label}>E-mail Profissional:</Text>
        <TextInput
          style={styles.input}
          value={professionalEmail}
          onChangeText={setProfessionalEmail}
        />

        <Text style={styles.label}>Especialidade:</Text>
        <TextInput
          style={styles.input}
          value={specialty}
          onChangeText={setSpecialty}
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <Text style={styles.label}>Instagram:</Text>
        <TextInput
          style={styles.input}
          value={instagram}
          onChangeText={setInstagram}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eaf2f8',
  },
  formContainer: {
    marginBottom: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007bff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;
