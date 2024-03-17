import React, { useState } from 'react';
import './Signin.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ApiFetch from "../../axios/config";

function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await ApiFetch.post("/Usuario/login", { email, senha });

            if (response.status >= 200)
                navigate('/home');


        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Email ou Senha incorretos');
            } else {
                console.error('Error:', error);
                setError('Ocorreu um Erro ao logar');
            }
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FaUserAlt className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <FaLock className='icon' />
                </div>
                {error && <div className="error">{error}</div>}
                <button type='submit'>Login</button>
                <div className="register-link">
                    <p>Não tem uma conta?<span className='register' onClick={() => navigate('/signup')}>&nbsp;Registre-se</span></p>
                </div>
            </form>
        </div>
    )
}

export default Signin;
