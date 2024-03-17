import React, { useState, useEffect } from 'react';
import ApiFetch from '../../axios/config';
import Modal from '../../components/Modal/Modal';
import './Home.css';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ email: '', senha: '', id: 0 });

    const getUser = async () => {
        try {
            const response = await ApiFetch.get('/Usuario');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const openModal = (user) => {
        setSelectedUser(user);
        setFormData({ email: user.email, senha: user.senha, id: user.id });
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiFetch.put(`/Usuario/${selectedUser.id}`, formData);
            getUser();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await ApiFetch.delete(`/Usuario/${id}`);
            getUser();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home">
            <h1>Usuários</h1>
            {users.length === 0 ? (
                <p>Carregando....</p>
            ) : (
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.senha}</td>
                                <td>
                                    <button className="btn action" onClick={() => openModal(user)}>Alterar</button>
                                    <button className="btn action" onClick={() => handleDelete(user.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showModal && (
                <Modal
                    title="Alterar Usuário"
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                >
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                        />
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="text"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleFormChange}
                            required
                        />
                        <button className='btn' type="submit">Salvar</button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default Home;
