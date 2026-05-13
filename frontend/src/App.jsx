import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import CrudAnime from "./components/CrudAnime"
import CrudGenero from "./components/CrudGenero"
import CrudPersonaje from "./components/CrudPersonaje"
import ConsultaPersonaje from "./components/ConsultaPersonaje"

import './App.css'

function App() {
  
  return (
    <>
      <Header />
      <hr />
      <h4>Operaciones CRUD usando React, PHP y MySQL</h4>
      <BrowserRouter>
            <nav>
              <ul>
                <li>
                  <Link to="/anime/anime">Anime</Link>
                </li>
                <li>
                  <Link to="/anime/genero">Genero</Link>
                </li>
                <li>
                  <Link to="/anime/personaje">Personajes</Link>
                </li>
                <li>
                  <Link to="/anime/consulta">Consulta: Lista de Personajes</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path='/anime/anime' element={<CrudAnime />} />
              <Route path='/anime/genero' element= {<CrudGenero />} />
              <Route path='/anime/personaje' element= {<CrudPersonaje />} />
              <Route path='/anime/consulta' element= {<ConsultaPersonaje />} />
            </Routes>
      </BrowserRouter>

      <Footer/>

    </>
  )
}

export default App
