import { auth } from '../firebaseConfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { signOut as signOutFirebase } from 'firebase/auth';
import { createUser } from './users-service.js';

/**
 * Inicia sesión con correo electrónico y contraseña.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<firebase.auth.UserCredential>} Una promesa que resuelve con las credenciales del usuario.
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        return error;
    }
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>} Una promesa vacía que se resuelve después de cerrar la sesión.
 */
export const signOut = async () => {
    try {
        await signOutFirebase(auth);
    } catch (error) {
        return error;
    }
};

/**
 * Registra un nuevo usuario con correo electrónico y contraseña.
 * @param {string} email - Correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña del nuevo usuario.
 * @returns {Promise<string>} Una promesa que resuelve con el ID del usuario creado.
 */
export const signUp = async (email, password) => {
    console.log("Registrando usuario...");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = await createUser(); // Suponiendo que createUser() devuelve el ID del usuario creado
        return userId;
    } catch (error) {
        return error;
    }
};

/**
 * Obtiene el usuario actualmente autenticado.
 * @returns {Promise<firebase.User | null>} Una promesa que resuelve con el usuario actualmente autenticado, o null si no hay usuario autenticado.
 */
export const getCurrentUser = async () => {
    try {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    } catch (error) {
        return error;
    }
};

/**
 * Envia un correo electrónico de restablecimiento de contraseña.
 * @param {string} email - Correo electrónico del usuario para restablecer la contraseña.
 * @returns {Promise<void>} Una promesa vacía que se resuelve después de enviar el correo electrónico de restablecimiento de contraseña.
 */
export const forgotPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        return error;
    }
};
