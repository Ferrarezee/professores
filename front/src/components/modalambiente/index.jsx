import React, { useEffect, useState } from "react";
import axios from 'axios'
import './styles.css'

const ModalAmbiente = ({
    isOpen,
    onClose,
    AmbienteSelecionado,
    setSeta,
    seta
}) => {
    if (!isOpen) return null

    const [sala, setSala] = useState(AmbienteSelecionado?.sala ?? '')
    const [capacidade, setCapacidade] = useState(AmbienteSelecionado?.capacidade ?? '')
    const [responsavel, setResponsavel] = useState(AmbienteSelecionado?.responsavel ?? '')
    const [periodo, setPeriodo] = useState(AmbienteSelecionado?.periodo ?? '')
    const [periodoOptions, setPeriodoOptions] = useState([]);
    const token = localStorage.getItem('token')

    useEffect(() => {
        async function fetchPeriodoOptions() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/periodo_choices", 
                    {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                setPeriodoOptions(response.data); // Aqui recebe a lista corretamente
    
            } catch (error) {
                console.error("Erro ao buscar opções de tipo de curso:", error);
            }
        }
    
        fetchPeriodoOptions();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault()
        const novoAmbiente = { sala, capacidade, responsavel, periodo}
        if (AmbienteSelecionado) {
            atualizar({ ...AmbienteSelecionado, ...AmbienteSelecionado })
        } else {
            console.log("Teste novo Ambiente: ", AmbienteSelecionado)
            criar(novoAmbiente)
        }
    }

    const newAmbi = async () => {
        console.log("Chegou")
        await axios.post ('http://127.0.0.1:8000/api/ambiente',

            { 
                sala: sala,
                capacidade: capacidade,
                responsavel: responsavel,
                periodo: periodo,
            }, {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("Ambiente inserido com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    const editAmbi = async () => {
        await axios.put(`http://127.0.0.1:8000/api/ambiente/${AmbienteSelecionado.id}`,
            { 
                sala: sala,
                capacidade: capacidade,
                responsavel: responsavel,
                periodo: periodo,
            }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        console.log("Ambiente inserido com sucesso!")
        setSeta(!seta) // valor booleano (falso ou verdadeiro)
        onClose(true)

    }

    return (
        <div className="modal-modal">
            <div className="container-modal">
                <div className="head-modal">
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <h2>{AmbienteSelecionado ? "Editar" : "Cadastrar"}</h2>
                <div className="body-modal">
                    <form onSubmit={handleSubmit}>
                        <div className="caixa1">
                            <input
                                className="sala-modal"
                                value={sala}
                                placeholder="sala"
                                onChange={(e) => setSala(e.target.value)}
                            />
                            <input
                                className="capacidade-modal"
                                value={capacidade}
                                placeholder="capacidade"
                                onChange={(e) => setCapacidade(e.target.value)}
                            />
                            <input
                                className="responsavel-modal"
                                value={responsavel}
                                placeholder="responsavel"
                                onChange={(e) => setResponsavel(e.target.value)}
                            />
                            <select
                                className="periodo-modal"
                                value={periodo}
                                onChange={(e) => setPeriodo(e.target.value)}
                            >
                                <option value="periodo">Selecione o periodo</option>
                                {periodoOptions.length > 0 ? (
                                    periodoOptions.map((option) => (
                                        <option key={option[0]} value={option[0]}>
                                            {option[1]}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando...</option>
                                )}
                            </select>
                        </div>
                        <div className="caixa2">

                        </div>

                    </form>
                </div>
                <div className="footer-modal">
                    <button
                        type="submit"
                        className="button-save"
                        onClick={AmbienteSelecionado ? editAmbi : newAmbi}
                    >
                        {AmbienteSelecionado ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ModalAmbiente