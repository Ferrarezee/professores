import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalProfessores from "../../components/modals"; // Modal é uma janela onde posso cadastrar o professor


export default function Home() {
    const [dados, setDados] = useState([]) // ([]) -> uma lista
    const [modalOpen, setModalOpen] = useState(false) //inicia com ela fechada
    const [professorSelecionado, setProfessorSelecionado] = useState(null)
    const [seta, setSeta] = useState(false)
    const token = localStorage.getItem('token')


    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => { //async assincrona (vai ler todos os valores)
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/professores',
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
            try {
                await axios.delete(`http://127.0.0.1:8000/api/professor/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // token (serve para a armazenar )
                        }
                    }
                )
                setDados(dados.filter((professor) => { professor.id !== id }))
                setSeta(!seta)
            } catch (error) {
                console.error(error)
            }
        }
    }

    const criar = async(novoProfessor)=>{
        console.log("Novo Professor: ", novoProfessor)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/professor',
                {
                    ni: novoProfessor.ni,
                    nome: novoProfessor.nome,
                    email: novoProfessor.email,
                    tel: novoProfessor.tel,
                    ocupacao: novoProfessor.ocupacao
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoProfessor]) // vai manter os dados e apeenas vai acrescentar um novo professor
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = async (professor)=>{
        setProfessorSelecionado(professor)
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
                                <div className="col4"><th>NI</th></div>
                                <div className="col5"><th>NOME</th></div>
                                <div className="col6"><th>EMAIL</th></div>
                                <div className="col7"><th>TELEFONE</th></div>
                                <div className="col8"><th>OC</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((professor) => ( //dados é uma constante (veio do estado atual)
                                <tr key={professor.id} className="campos">
                                    <td className="icons">
                                        <div className="col1"> 
                                            <FaEdit className="edit" onClick={() => atualizar(professor) }/> 
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(professor.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{professor.id}</td></div>
                                    <div className="col4"><td>{professor.ni}</td></div>
                                    <div className="col5"><td>{professor.nome}</td></div>
                                    <div className="col6"><td>{professor.email}</td></div>
                                    <div className="col7"><td>{professor.tel}</td></div>
                                    <div className="col8"><td>{professor.ocupacao}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setProfessorSelecionado(null)}}/>
                    </div>
                    <div className="id">
                        <input placeholder="id" />
                    </div>
                    <div className="nome">
                        <input placeholder="nome do professor" />
                    </div>
                    <div className="btn2">
                        <FaSearch className="procurar" />
                    </div>
                </div>
                <ModalProfessores
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    professorSelecionado={professorSelecionado}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
