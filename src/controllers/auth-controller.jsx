import { useState } from 'react';
import * as authService from '../services/auth-service';

const useAuthController = () => {
    const [error, setError] = useState(null);

    // Función para iniciar sesión
    const signIn = async (email, password) => {
        try {
            setError(null); // Reinicia el error
            await authService.signIn(email, password);
        } catch (error) {
            setError(error.message); // Captura y establece el mensaje de error
        }
    };

    // Función para cerrar sesión
    const signOut = async () => {
        try {
            setError(null); // Reinicia el error
            await authService.signOut();
        } catch (error) {
            setError(error.message); // Captura y establece el mensaje de error
        }
    };

    // Función para registrar un nuevo usuario
    const signUp = async (email, password) => {
        try {
            setError(null); // Reinicia el error
            await authService.signUp(email, password);
        } catch (error) {
            setError(error.message); // Captura y establece el mensaje de error
        }
    };

    // Función para obtener el usuario actualmente autenticado
    const getCurrentUser = async () => {
        try {
            setError(null); // Reinicia el error
            return await authService.getCurrentUser();
        } catch (error) {
            setError(error.message); // Captura y establece el mensaje de error
            return null; // Devuelve null si hay un error
        }
    };

    // Función para enviar un correo electrónico de restablecimiento de contraseña
    const forgotPassword = async (email) => {
        try {
            setError(null); // Reinicia el error
            await authService.forgotPassword(email);
        } catch (error) {
            setError(error.message); // Captura y establece el mensaje de error
        }
    };

    return {
        error,
        signIn,
        signOut,
        signUp,
        getCurrentUser,
        forgotPassword,
    };
};

export default useAuthController;
