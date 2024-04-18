import React, { useState } from 'react';
import { useProfile } from '../../ProfileProvider';

const Login = () => {
  const { login } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(email, password);
    if (!success) {
      // Mostrar mensaje de error al usuario si el inicio de sesión falla
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
