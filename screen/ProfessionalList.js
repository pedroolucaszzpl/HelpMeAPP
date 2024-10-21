import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; // Firebase Firestore

const db = getFirestore();

const Container = styled.View`
  flex: 1;
  background-color: #f0f4f8;
  padding: 20px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  text-align: center;
  flex: 1;
`;

const Card = styled.View`
  width: 150px;
  margin: 5px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #ddd;
`;

const ItemLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  text-align: center;
`;

const ProfessionLabel = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
`;

const DetailsButton = styled.TouchableOpacity`
  background-color: #0078f2;
  padding: 8px 12px;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const Loading = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function ProfessionsList() {
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const navigation = useNavigation(); // Hook de navegação
  const route = useRoute();
  const { professions, title } = route.params; // Profissões e título da área

  useEffect(() => {
    // Função para buscar os profissionais no Firebase
    const fetchProfessionals = async () => {
      try {
        // Criar a consulta no Firestore para buscar profissionais cujas profissões estão na lista
        const professionsLabels = professions.map(prof => prof.label);
        const q = query(collection(db, 'users'), where('profession', 'in', professionsLabels));
        const querySnapshot = await getDocs(q);
        
        // Mapear os dados dos profissionais encontrados
        const professionalsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Atualiza o estado com a lista de profissionais
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('Erro ao buscar profissionais: ', error);
      } finally {
        setLoading(false); // Define loading como false após a consulta
      }
    };

    fetchProfessionals();
  }, [professions]);

  // Renderizar cada profissional na lista
  const renderItem = ({ item }) => (
    <Card>
      <ProfileImage
        source={{ uri: item.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5gz3En8ZRfRkOfX4TYzN2BdBw3vYel2NgA&s' }}
      />
      <ItemLabel>{item.name}</ItemLabel>
      <ProfessionLabel>{item.profession}</ProfessionLabel>
      <DetailsButton
        onPress={() => navigation.navigate('ProfileDetail', { userId: item.id })}
      >
        <ButtonText>Ver Detalhes</ButtonText>
      </DetailsButton>
    </Card>
  );

  if (loading) {
    // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
    return (
      <Loading>
        <ActivityIndicator size="large" color="#0078f2" />
      </Loading>
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#0078f2" />
        </TouchableOpacity>
        <Header>{title}</Header> {/* Título da área de atuação */}
      </HeaderContainer>
      <FlatList
        data={professionals}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </Container>
  );
}
