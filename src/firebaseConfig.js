// Analiza la variable de entorno que contiene la configuración de Firebase
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Inicializa Firebase con la configuración
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
