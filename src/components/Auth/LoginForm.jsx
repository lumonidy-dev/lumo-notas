import * as React from 'react';

const LoginForm = ({ onLogin, onError }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const colorShadow = () => {
    return error ? 'danger' : 'primary';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onLogin(email, password);
      setError(null); // Resetear el error cuando el inicio de sesión tenga éxito
    } catch (error) {
      setError(error); // Establecer el error en caso de que falle el inicio de sesión
    }
  };

  return (
    <form className={`bshadow ${colorShadow()} border-radius-md d-flex flex-col p-lg`} onSubmit={handleSubmit}>
      <label className='mt-lg d-flex flex-col'>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className='mt-lg d-flex flex-col'>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="mt-lg" type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
