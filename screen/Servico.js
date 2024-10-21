import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Para navegação
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firebase Firestore

const db = getFirestore();

// Dados da lista com áreas e profissões
const servicesData = [
  {
    area: 'Arte e Design',
    icon: 'brush', // Ícone para Arte e Design
    professions: [
      { id: '1', label: 'Designer', icon: 'brush' },
      { id: '2', label: 'Pintor', icon: 'brush' },
      { id: '3', label: 'Desenhista', icon: 'pencil' },
      { id: '4', label: 'Tatuador', icon: 'brush' },
    ],
  },
  {
    area: 'Educação',
    icon: 'school', // Ícone para Educação
    professions: [
      { id: '5', label: 'Teacher', icon: 'school' },
    ],
  },
  {
    area: 'Esportes',
    icon: 'basketball', // Ícone para Esportes
    professions: [
      { id: '6', label: 'Jogador', icon: 'basketball' },
    ],
  },
  {
    area: 'Tecnologia',
    icon: 'laptop', // Ícone para Tecnologia
    professions: [
      { id: '7', label: 'Desenvolvedora', icon: 'laptop' },
      { id: '8', label: 'Multimídia', icon: 'film' },
    ],
  },
];

// Estilos com styled-components
const Container = styled.View`
  flex: 1;
  background-color: #f0f4f8;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchBar = styled.TextInput`
  height: 40px;
  border-radius: 20px;
  padding: 0 15px;
  background-color: #fff;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
`;

const ItemContainer = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;

const ItemLabel = styled.Text`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  text-align: center;
`;

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false); // Estado para controlar se a busca está ativa

  useEffect(() => {
    // Função para buscar todos os profissionais cadastrados
    const fetchProfessionals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const professionalsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Atualiza o estado com a lista de profissionais
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('Erro ao buscar profissionais: ', error);
      }
    };

    fetchProfessionals();
  }, []);

  // Filtrar os profissionais com base no termo de busca
  const filteredProfessionals = professionals.filter(professional => {
    const fullName = `${professional.name} ${professional.profession}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleAreaSelect = (professions, title) => {
    navigation.navigate('ProfessionalsList', { professions, title });
  };

  // Função para tratar a busca
  const handleSearch = (text) => {
    setSearchTerm(text);
    setIsSearching(text.length > 0); // Define se a busca está ativa
  };

  const renderItem = ({ item }) => (
    <ItemContainer onPress={() => handleAreaSelect(item.professions, item.area)}>
      <Ionicons name={item.icon} size={32} color="#0078f2" /> {/* Renderiza o ícone da área */}
      <ItemLabel>{item.area}</ItemLabel>
    </ItemContainer>
  );

  return (
    <Container>
      <Header>Serviços</Header>
      <SearchBar
        placeholder="Buscar por nome ou profissão..."
        value={searchTerm}
        onChangeText={handleSearch} // Chama a função de busca ao digitar
      />
      {/* Renderiza a lista de profissionais filtrados apenas quando a busca está ativa */}
      {isSearching ? (
        <FlatList
          key={`professionals-list-${searchTerm}`} // Adiciona uma chave única baseada no termo de busca
          data={filteredProfessionals}
          renderItem={({ item }) => (
            <ItemContainer onPress={() => {/* Ação ao clicar no profissional */}}>
              <Ionicons name="person" size={32} color="#0078f2" />
              <ItemLabel>{item.name} - {item.profession}</ItemLabel>
            </ItemContainer>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : (
        <FlatList
          key={`services-list`} // Adiciona uma chave única para a lista de serviços
          data={servicesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.area}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </Container>
  );
}
