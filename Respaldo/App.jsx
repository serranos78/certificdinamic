import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Header from "./components/Header"
import ListAnime from "./components/ListAnime"
import CreateAnime from "./components/CreateAnime"
import EditAnime from "./components/EditAnime"
import DeleteAnime from "./components/DeleteAnime"
import './App.css'

function App() {
  
  return (
    <>
      <Header />
      <h4>Operaciones CRUD usando React, PHP y MySQL</h4>
      <BrowserRouter>
            <nav>
              <ul>
                <li>
                  <Link to="/animes">Lista de Animes</Link>
                </li>
                <li>
                  <Link to="/anime/create">Agregar Anime</Link>
                </li>
                <li>
                  <Link to="/anime/edit">Editar Anime</Link>
                </li>
                <li>
                  <Link to="/anime/delete">Eliminar Anime</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path='/animes' element={<ListAnime />} />
              <Route path='/anime/create' element= {<CreateAnime />} />
              <Route path='/anime/edit' element= {<EditAnime />} />
              <Route path='/anime/delete' element= {<DeleteAnime />} />
            </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
