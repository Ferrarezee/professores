import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import ModalCursos  from "../../components/modalcursos";


export default function Cursos() {
    const [dados, setDados] = useState([]) // ([]) -> uma lista
    const [modalOpen, setModalOpen] = useState(false) //inicia com ela fechada
    const [Cursoselecionada, setCursoselecionada] = useState(null)
    const [seta, setSeta] = useState(false)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) return;
        
        const fetchData = async () => { //async assincrona (vai ler todos os valores)
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cursos',
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
             // URL com o ID da cursos para excluir
            try {
                await axios.delete(`http://127.0.0.1:8000/api/cursos/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`  // Adicionando o token de autenticação
                        }
                    }
                )
                setDados(dados.filter((cursos) => { cursos.id !== id }))  // Remove a cursos da lista
                setSeta(!seta) // Atualiza o estado para refletir a mudança
            } catch (error) {
                console.error(error)  // Exibe qualquer erro no console
            }
        }
    }

    const criar = async(novoCursos)=>{
        console.log("Nova Disciplina: ", novoCursos)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cursos',
                {
                    curso: curso, // direita modal e o esquerda 
                    codigo: codigo,
                    tipo: tipo,
                    cargaHoraria: cargaHoraria,
                    sigla: sigla
                },{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Dados inseridos com sucesso!", response.data)
            setDados([...dados, novoCursos]) // vai manter os dados e apeenas vai acrescentar um novo professor
            setModalOpen(false)
        } catch (error) {
            console.error(error)
        }

    }

    const atualizar = async (cursos)=>{
        setCursoselecionada(cursos)
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
                                <div className="col4"><th>CURSO</th></div>
                                <div className="col5"><th>CODIGO</th></div>
                                <div className="col6"><th>CARGA HORARIA</th></div>
                                <div className="col7"><th>TIPO</th></div>
                                <div className="col8"><th>SIGLA</th></div>
                            </tr>
                        </thead>
                        <tbody> 
                            {dados.map((dados) => ( //dados é uma constante (veio do estado atual)
                                <tr key={dados.id} className="campos">
                                    <td className="icons">
                                        <div className="col1"> 
                                            <FaEdit className="edit" onClick={() => atualizar(dados) }/> 
                                        </div>
                                        <div className="col2">
                                            <FaTrash className="delete" onClick={() => apagar(dados.id)} />
                                        </div>

                                    </td>
                                    <div className="col3"><td>{dados.id}</td></div>
                                    <div className="col4"><td>{dados.curso}</td></div>
                                    <div className="col5"><td>{dados.codigo}</td></div>
                                    <div className="col6"><td>{dados.cargaHoraria}</td></div>
                                    <div className="col7"><td>{dados.tipo}</td></div>
                                    <div className="col8"><td>{dados.sigla}</td></div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer_table">
                    <div className="btn1">
                        <FaPlus className="adicionar" onClick={()=>{setModalOpen(true), setCursoselecionada(null)}}/>
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
                <ModalCursos
                    isOpen={modalOpen}
                    onClose={()=>setModalOpen(false)}
                    Cursoselecionada={Cursoselecionada}
                    setSeta = {setSeta}
                    seta = {seta}
                />
            </div>
            <Footer />
        </div>
    )
}
