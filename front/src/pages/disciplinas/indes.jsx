import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalDisciplina  from "../../components/modaldisciplina"; // Modal é uma janela onde posso cadastrar o professor


export default function Disciplinas() {
    const [dados, setDados] = useState([]) // ([]) -> uma lista
    const [modalOpen, setModalOpen] = useState(false) //inicia com ela fechada
    const [DisciplinaSelecionada, setDisciplinaSelecionada] = useState(null)
    const [seta, setSeta] = useState(false)
    const token = localStorage.getItem('token')


    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => { //async assincrona (vai ler todos os valores)
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/disciplina',
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
                await axios.delete(`http://127.0.0.1:8000/api/disciplinas/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`  // Adicionando o token de autenticação
                        }
                    }
                )
                setDados(dados.filter((disciplina) => { disciplina.id !== id }))  // Remove a disciplina da lista
                setSeta(!seta) // Atualiza o estado para refletir a mudança
            } catch (error) {
                console.error(error)  // Exibe qualquer erro no console
            }
        }
    }

    const criar = async(novaDisciplina)=>{
        console.log("Nova Disciplina: ", novaDisciplina)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/disciplinas',
                {
                    disciplina: disciplina, // direita modal e o esquerda 
                    codigo: codigo,
                    cargaHoraria: cargaHoraria,
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novaDisciplina]) // vai manter os dados e apeenas vai acrescentar um novo professor
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = async (disciplina)=>{
        setDisciplinaSelecionada(disciplina)
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
                                <div className="col4"><th>DISCIPLINA</th></div>
                                <div className="col5"><th>CODIGO</th></div>
                                <div className="col6"><th>CARGA HORARIA</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((disciplina) => ( //dados é uma constante (veio do estado atual)
                                <tr key={disciplina.id} className="campos">
                                    <td className="icons">
                                        <div className="col1"> 
                                            <FaEdit className="edit" onClick={() => atualizar(disciplina) }/> 
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(disciplina.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{disciplina.id}</td></div>
                                    <div className="col4"><td>{disciplina.disciplina}</td></div>
                                    <div className="col5"><td>{disciplina.codigo}</td></div>
                                    <div className="col6"><td>{disciplina.cargaHoraria}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setDisciplinaSelecionada(null)}}/>
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
                <ModalDisciplina
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    DisciplinaSelecionada={DisciplinaSelecionada}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
