import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const AboutUsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={30} color="#0078f2" />
        </TouchableOpacity>
        <Image
          source={require('../img/mosaic.png')} // Insira aqui a URL da sua logo
          style={styles.logo}
        />
      </View>

      <View style={styles.sectionContainer}>
        <MaterialIcons name="send" size={50} color="#0078f2" />
        <Text style={styles.sectionTitle}>Solicitação</Text>
        <View style={styles.iconTextContainer}>
          <MaterialIcons name="thumb-up" size={30} color="#0078f2" />
          <Text style={styles.text}>Ótimos Profissionais</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <MaterialIcons name="rate-review" size={30} color="#0078f2" />
          <Text style={styles.text}>Avaliações e Feedback</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <FontAwesome name="rocket" size={30} color="#0078f2" />
          <Text style={styles.text}>Soluções Rápidas</Text>
        </View>
      </View>

      <Text style={styles.text}>
        Com a nossa plataforma, você pode solicitar serviços de forma rápida, fácil e confiável. Basta abrir o aplicativo, escolher o que você precisa, e encontrar o profissional ideal para atender à sua necessidade. Simplificamos sua vida ao reunir em um único lugar uma variedade de serviços confiáveis.
      </Text>

      <View style={styles.sectionContainer}>
        <MaterialIcons name="calendar-today" size={50} color="#0078f2" />
        <Text style={styles.sectionTitle}>Solicitação em 4 passos</Text>
        <Text style={styles.text}>
          Na Help Me, tornamos a solicitação de serviços simples e dinâmica.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <MaterialIcons name="info" size={50} color="#0078f2" />
        <Text style={styles.sectionTitle}>Sobre Nós</Text>
        <Text style={styles.text}>
          Somos uma equipe apaixonada por soluções inovadoras e experiências excepcionais. Fundada em 2024, nossa empresa nasceu da visão de tornar a vida das pessoas mais fácil, proporcionando acesso a serviços de qualidade de forma rápida e conveniente. Nosso time é composto por indivíduos dedicados e talentosos, sempre empenhados em superar as expectativas e em oferecer soluções personalizadas para cada necessidade.
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <FontAwesome name="users" size={50} color="#0078f2" />
        <Text style={styles.developersTitle}>Desenvolvedores</Text>
        <View style={styles.developersList}>
          {['Cibeli Mathias', 'João Paulo', 'Pedro Lucas', 'Tainá Menegatti', 'Yasmin Lobo'].map((name, index) => (
            <View key={index} style={styles.developerContainer}>
              <MaterialIcons name="person" size={24} color="#0078f2" />
              <Text style={styles.developerName}>{name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
  },
  sectionContainer: {
    marginBottom: 30,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0078f2',
    marginVertical: 15,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
    textAlign: 'justify',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  developersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0078f2',
    marginVertical: 20,
    textAlign: 'center',
  },
  developersList: {
    alignItems: 'center',
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  developerName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default AboutUsScreen;
