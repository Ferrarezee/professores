import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalDisciplina = ({
    isOpen,
    onClose,
    DisciplinaSelecionada,
    setSeta,
    seta
}) => {
    if (!isOpen) return null

    const [disciplina, setdisciplina] = useState(DisciplinaSelecionada?.disciplina ?? '')
    const [codigo, setCodigo] = useState(DisciplinaSelecionada?.codigo ?? '')
    const [cargaHoraria, setCargaHoraria] = useState(DisciplinaSelecionada?.cargaHoraria ?? '')
    const token = localStorage.getItem('token')


    const handleSubmit = (e) => {
        e.preventDefault()
        const novaDisciplina = { disciplina, codigo, cargaHoraria }
        if (DisciplinaSelecionada) {
            atualizar({ ...DisciplinaSelecionada, ...DisciplinaSelecionada })
        } else {
            console.log("Teste nova disciplina: ", DisciplinaSelecionada)
            criar(novaDisciplina)
        }
    }

    const newDisc = async () => {
        console.log("Chegou")
        await axios.post('http://127.0.0.1:8000/api/disciplina',

            {
                disciplina: disciplina, // direita modal e o esquerda 
                codigo: codigo,
                cargaHoraria: cargaHoraria,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Disciplina inserida com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    const editTeacher = async () => {
        await axios.put(`http://127.0.0.1:8000/api/disciplinas/${DisciplinaSelecionada.id}`,
            {
                disciplina: disciplina, // direita modal e o esquerda 
                codigo: codigo,
                cargaHoraria: cargaHoraria,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Disciplina inserida com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    return (
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{DisciplinaSelecionada ? "Editar" : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="disciplina-modal"
                                value={disciplina}
                                placeholder="disciplina"
                                onChange={(e) => setdisciplina(e.target.value)}
                            />
                            <input
                                className="codigo-modal"
                                value={codigo}
                                placeholder="codigo"
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                            <input
                                className="cargaHoraria-modal"
                                value={cargaHoraria}
                                placeholder="cargaHoraria"
                                onChange={(e) => setCargaHoraria(e.target.value)}
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
                        onClick={DisciplinaSelecionada ? editTeacher : newDisc}
                    >
                        {DisciplinaSelecionada ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ModalDisciplina