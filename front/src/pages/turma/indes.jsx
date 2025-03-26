import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalTurma from "../../components/modalturma"; // Modal é uma janela onde posso cadastrar o professor


export default function Turma() {
    const [dados, setDados] = useState([]) // ([]) -> uma lista
    const [modalOpen, setModalOpen] = useState(false) //inicia com ela fechada
    const [TurmaSelecionada, setTurmaSelecionada] = useState(null)
    const [seta, setSeta] = useState(false)
    const token = localStorage.getItem('token')


    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => { //async assincrona (vai ler todos os valores)
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/turma',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setDados(response.data) // data (dados)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData() 
    }, [seta])

    const apagar = async (id) => {
        if (window.confirm("Tem certeza? ")) {
             // URL com o ID da disciplina para excluir
            try {
                await axios.delete(`http://127.0.0.1:8000/api/turma/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`  // Adicionando o token de autenticação
                        }
                    }
                )
                setDados(dados.filter((turma) => { turma.id !== id }))  // Remove a disciplina da lista
                setSeta(!seta) // Atualiza o estado para refletir a mudança
            } catch (error) {
                console.error(error)  // Exibe qualquer erro no console
            }
        }
    }

    const criar = async(novaTurma)=>{
        console.log("Nova Turma: ", novaTurma)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/turma',
                {// direita modal e o esquerda 
                    codigo: codigo,
                    turma: turma
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaTurma]) // vai manter os dados e apeenas vai acrescentar um novo professor
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = async (turma)=>{
        setTurmaSelecionada(turma)
        setModalOpen(true)
    }
    return (
        <div >
            <Header />
            <div className="container_home">
                <div className="lista">
                    <table>
                        <thead>
                            <tr className="icons">
                                <div className="col1"></div>
                                <div className="col2"></div>
                                <div className="col3"><th>ID</th></div>
                                <div className="col5"><th>CODIGO</th></div>
                                <div className="col6"><th>TURMA</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((turma) => ( //dados é uma constante (veio do estado atual)
                                <tr key={turma.id} className="campos">
                                    <td className="icons">
                                        <div className="col1"> 
                                            <FaEdit className="edit" onClick={() => atualizar(turma) }/> 
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(turma.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{turma.id}</td></div>
                                    <div className="col5"><td>{turma.codigo}</td></div>
                                    <div className="col6"><td>{turma.turma}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setTurmaSelecionada(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome da Disciplina" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalTurma
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    TurmaSelecionada={TurmaSelecionada}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
