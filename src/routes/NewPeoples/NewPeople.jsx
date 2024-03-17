import ApiFetch from "../../axios/config"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import "./NewPeople.css"

const NewPeople = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const createUsuario = async (e) => {
        e.preventDefault()

        await ApiFetch.post("/Usuario", { email, senha });


        navigate("/home")
    }

    return (
        <div className='new-people'>
            <h2>Inserir novo Usuario:</h2>
            <form onSubmit={(e) => createUsuario(e)}>
                <div className="form-control">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="text"
                        name="senha"
                        id="senha"
                        placeholder="Senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <input type="submit" value="Criar Usuario" className='btn' />
                <Link to="/home" className="btn">
                    Voltar
                </Link>
            </form>

        </div>
    )
}

export default NewPeople