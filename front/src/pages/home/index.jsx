import axios from "axios";
import React, { useState, useEffect } from "react"; // useState o estado atual 
//import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa'
import './styles.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import {useNavigate} from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate()
    return(
        <div>
            <Header/>
            <div className="container_home">
                <h1>Home</h1>
                <button onClick={() =>navigate('/professor')}>Professores</button>
                <button onClick={() =>navigate('/disciplinas')}>Disciplinas</button>
                <button onClick={() =>navigate('/turma')}>Turmas</button>
                <button onClick={() =>navigate('/ambiente')}>Ambiente</button>
                <button onClick={() =>navigate('/cursos')}>Cursos</button>
            </div>
            <Footer/>
        </div>
    )
}