import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalTurma = ({
    isOpen,
    onClose,
    TurmaSelecionada,
    setSeta,
    seta
}) => {
    if (!isOpen) return null

    const [codigo, setCodigo] = useState( TurmaSelecionada?.codigo ?? '')
    const [turma, setTurma] = useState( TurmaSelecionada?.turma ?? '')
    const token = localStorage.getItem('token')


    const handleSubmit = (e) => {
        e.preventDefault()
        const novaTurma = { codigo, turma}
        if ( TurmaSelecionada) {
            atualizar({ ... TurmaSelecionada, ... TurmaSelecionada })
        } else {
            console.log("Teste nova turma: ", TurmaSelecionada)
            criar(novaTurma)
        }
    }

    const newTurma = async () => {
        console.log("Chegou")
        await axios.post('http://127.0.0.1:8000/api/turma',

            {
                 // direita modal e o esquerda 
                codigo: codigo,
                turma: turma
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Turma inserida com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    const editTurma = async () => {
        await axios.put(`http://127.0.0.1:8000/api/turma/${TurmaSelecionada.id}`,
            {
                // direita modal e o esquerda 
                codigo: codigo,
                turma: turma
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Turma inserida com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    return (
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{TurmaSelecionada ? "Editar" : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <input
                                className="turma-modal"
                                value={turma}
                                placeholder="turma"
                                onChange={(e) => setTurma(e.target.value)}
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
                        onClick={TurmaSelecionada ? editTurma : newTurma}
                    >
                        {TurmaSelecionada ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ModalTurma