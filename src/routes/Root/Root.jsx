import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthController from '../../controllers/auth-controller';
import LoginForm from "../../components/Auth/LoginForm";
import './Root.css'; // Importar el archivo de estilos CSS

const Root = () => {
    const authController = useAuthController();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Estado para almacenar si el usuario está autenticado o no
    const [error, setError] = React.useState(null); // Estado para almacenar mensajes de error
    const navigate = useNavigate(); // Hook de navegación

    // Verificar si el usuario está autenticado al cargar el componente
    React.useEffect(() => {
        const checkAuthentication = async () => {
            const user = await authController.getCurrentUser();
            setIsLoggedIn(!!user); // Actualizar el estado según si hay un usuario o no
        };

        checkAuthentication();
    }, [authController]);

    // Función para limpiar los errores
    const clearError = () => {
        setError(null);
    };

    const handleLogin = async (email, password) => {
        try {
            await authController.signIn(email, password);
            setIsLoggedIn(true); // Actualizar el estado para mostrar las vistas protegidas
        } catch (error) {
            setError(error.message); // Capturar y establecer el mensaje de error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evitar la actualización de la página por defecto del navegador
        await handleLogin(email, password); // Manejar el inicio de sesión
    };


    const handleLogout = async () => {
        try {
            await authController.signOut();
            setIsLoggedIn(false); // Actualizar el estado para ocultar las vistas protegidas
            // Navegar al inicio de sesión después de cerrar sesión
            navigate('/');
        } catch (error) {
            setError(error.message); // Capturar y establecer el mensaje de error
        }
    };

    return (
        <div className="w-100 d-flex flex-col"> {/* Aplicar el selector de clase para el contenedor principal */}
            {error && (
                <div className="error-alert"> {/* Aplicar el selector de clase para la alerta de error */}
                    <p>{error}</p>
                    <button onClick={clearError}>Cerrar</button>
                </div>
            )}
            {isLoggedIn ? (
                <div className='parent d-flex h-100'>
                    <button onClick={handleLogout} className="child max-width-xs logout-button right m-lg">Cerrar sesión</button> {/* Aplicar el selector de clase para el botón de cierre de sesión */}
                    <Outlet /> {/* Renderizar los hijos solo cuando el usuario esté autenticado */}
                </div>
            ) : (
                <div className="child abs-center d-flex flex-col justify-content-center align-items-center gap-md"> {/* Aplicar el selector de clase para el contenedor del formulario de inicio de sesión */}
                    <h1> Iniciar sesión </h1>
                    <LoginForm onLogin={handleLogin} onError={setError} /> {/* Pasar la función setError como prop al componente LoginForm */}
                    <a> ¿No tienes una cuenta? Regístrate aquí </a>
                </div>
            )}
        </div>
    );
};

export default Root;
