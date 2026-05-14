import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
      <h4>Operaciones CRUD usando React y Node.js</h4>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/anime">Anime</Link>
            </li>
            <li>
              <Link to="/genero">Género</Link>
            </li>
            <li>
              <Link to="/personaje">Personajes</Link>
            </li>
            <li>
              <Link to="/consulta">Consulta</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/anime" element={<CrudAnime />} />
          <Route path="/genero" element={<CrudGenero />} />
          <Route path="/personaje" element={<CrudPersonaje />} />
          <Route path="/consulta" element={<ConsultaPersonaje />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;