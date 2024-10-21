import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Importa o módulo de autenticação
import { getAnalytics } from 'firebase/analytics';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAzhFV15De7rBpJXn4K61-8V6agFxyyx4",
  authDomain: "helpme-dbcca.firebaseapp.com",
  projectId: "helpme-dbcca",
  storageBucket: "helpme-dbcca.appspot.com",
  messagingSenderId: "622777469972",
  appId: "1:622777469972:web:02dc8a49f74b6b9f4fab01",
  measurementId: "G-V1YHFGN7TR"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Inicializa o módulo de autenticação
const analytics = getAnalytics(app);

export { auth };
