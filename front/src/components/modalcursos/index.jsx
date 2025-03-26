import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalCursos = ({
    isOpen,
    onClose,
    CursosSelecionado,
    setSeta,
    seta
}) => {
    if (!isOpen) return null

    const [codigo, setCodigo] = useState(CursosSelecionado?.codigo ?? '')
    const [curso, setCurso] = useState(CursosSelecionado?.curso ?? '')
    const [tipo, setTipo] = useState(CursosSelecionado?.tipo ?? '')
    const [cargaHoraria, setcargaHoraria] = useState(CursosSelecionado?.cargaHoraria ?? '')
    const [tipoCursoOptions, setTipoCursoOptions] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchTipoCursoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/tipo_curso_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setTipoCursoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de tipo de curso:", error);
            }
        }
    
        fetchTipoCursoOptions();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        const novoCursos = { codigo, curso, tipo, cargaHoraria}
        if (CursosSelecionado) {
            atualizar({ ...CursosSelecionado, ...CursosSelecionado })
        } else {
            console.log("Teste novo Cursos: ", CursosSelecionado)
            criar(novoCursos)
        }
    }

    const newCur = async () => {
        console.log("Chegou")
        await axios.post('http://127.0.0.1:8000/api/cursos',

            {// direita modal e o esquerda 
                codigo: codigo,
                curso: curso,
                tipo: tipo,
                cargaHoraria: cargaHoraria,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Cursos inserida com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    const editCurs = async () => {
        await axios.put(`http://127.0.0.1:8000/api/cursos/${CursosSelecionado.id}`,
            {
                // direita modal e o esquerda 
                codigo: codigo,
                curso: curso,
                tipo: tipo,
                cargaHoraria: cargaHoraria,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Cursos inserido com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    return (
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{CursosSelecionado ? "Editar" : "Cadastrar"}</h2>
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
                                className="curso-modal"
                                value={curso}
                                placeholder="curso"
                                onChange={(e) => setCurso(e.target.value)}
                            />
                            <select
                                className="tipo_curso-modal"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            >
                                <option value="">Selecione o tipo</option>
                                {tipoCursoOptions.length > 0 ? (
                                    tipoCursoOptions.map((option) => (
                                        <option key={option[0]} value={option[0]}>
                                            {option[1]}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando...</option>
                                )}
                            </select>
                            <input
                                className="cargaHoraria-modal"
                                value={cargaHoraria}
                                placeholder="cargaHoraria"
                                onChange={(e) => setcargaHoraria(e.target.value)}
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
                        onClick={CursosSelecionado ? editCurs : newCur}
                    >
                        {CursosSelecionado ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ModalCursos