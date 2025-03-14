import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalDisciplina = ({
    isOpen,
    onClose,
    DisciplinaSelecionado,
    setSeta,
    seta
}) => {
    if (!isOpen) return null

    const [nome, setNome] = useState(professorSelecionado?.nome ?? '')
    const [email, setEmail] = useState(professorSelecionado?.email ?? '')
    const [tel, setTel] = useState(professorSelecionado?.tel ?? '')
    const [ocupacao, setOcupacao] = useState(professorSelecionado?.ocupacao ?? '')
    const token = localStorage.getItem('token')


    const handleSubmit = (e) => {
        e.preventDefault()
        const novoProfessor = {nome, email, tel, ocupacao }
        if (professorSelecionado) {
            atualizar({ ...professorSelecionado, ...novoProfessor })
        } else {
            console.log("Teste novo professor: ", novoProfessor)
            criar(novoProfessor)
        }
    }

    const newTeacher = async () =>{
        console.log("Chegou")
      
            await axios.post('http://127.0.0.1:8000/api/professores',
                {
                    ni: ni, // direita modal e o esquerda 
                    nome: nome,
                    email: email,
                    tel: tel,
                    ocupacao: ocupacao
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Professor inserido com sucesso!")
            setSeta(!seta) // valor booleano (falso ou verdadeiro)
            onClose(true)
      
    }

    const editTeacher = async () =>{
        await axios.put(`http://127.0.0.1:8000/api/professor/${professorSelecionado.id}`,
            {
                ni: ni,
                nome: nome,
                email: email,
                tel: tel,
                ocupacao: ocupacao
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("Professor inserido com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)
      
    }

    return (
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{professorSelecionado ? "Editar" : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="ni-modal"
                                value={ni}
                                placeholder="ni"
                                onChange={(e) => setNi(e.target.value)}
                            />
                            <input
                                className="nome-modal"
                                value={nome}
                                placeholder="nome"
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                className="email-modal"
                                value={email}
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="tel-modal"
                                value={tel}
                                placeholder="tel"
                                onChange={(e) => setTel(e.target.value)}
                            />
                            <input
                                className="ocupacao-modal"
                                value={ocupacao}
                                placeholder="ocupacao"
                                onChange={(e) => setOcupacao(e.target.value)}
                            />
                        </div>
                        <div className="caixa2">
                            
                        </div>

                    </form>
                </div>
                <div className="footer-modal">
                    <button 
                        type="submit" 
                        className="button-save" 
                        onClick={professorSelecionado ? editTeacher : newTeacher}
                        >
                            {professorSelecionado ? "Atualizar" : "Salvar"}
                        </button>
                </div>
            </div>
        </div>
    )
}


export default ModalProfessores