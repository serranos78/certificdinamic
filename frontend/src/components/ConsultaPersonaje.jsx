import { useEffect, useState } from "react";
import axios from "axios";

const URL_ANIME = "http://localhost/dinamica/backend/anime.php";
const URL_CONSULTA = "http://localhost/dinamica/backend/consulta_personaje.php";

export default function ConsultaPersonaje() {
  const [animes, setAnimes] = useState([]);
  const [idanime, setIdanime] = useState("");
  const [resultados, setResultados] = useState([]);

  // ===== CARGAR ANIMES
  const getAnimes = async () => {
    const res = await axios.get(URL_ANIME);
    setAnimes(res.data);
  };

  useEffect(() => {
    getAnimes();
  }, []);

  // ===== CONSULTA
  const consultar = async () => {
    if (!idanime) {
      alert("Selecciona un anime");
      return;
    }

    const res = await axios.post(URL_CONSULTA, { idanime });
    setResultados(res.data);
  };

  return (
    <div className="container mt-4">

      <h4 className="text-center mb-3">Consulta de Personajes por Anime</h4>

      {/* ===== DROPDOWN ===== */}
      <div className="row justify-content-center mb-3">
        <div className="col-md-5">

          <select
            className="form-control mb-2"
            value={idanime}
            onChange={(e) => setIdanime(e.target.value)}
          >
            <option value="">Selecciona un anime</option>
            {animes.map((a) => (
              <option key={a.idanime} value={a.idanime}>
                {a.descripcionanime}
              </option>
            ))}
          </select>

          <button className="btn btn-primary w-100" onClick={consultar}>
            Consultar
          </button>

        </div>
      </div>

      {/* ===== TABLA ===== */}
      {resultados.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-dark text-center">
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Rol</th>
                <th>Fecha aparición</th>
                <th>Anime</th>
              </tr>
            </thead>

            <tbody>
              {resultados.map((p) => (
                <tr key={p.idpersonaje}>
                  <td>{p.nombre}</td>
                  <td className="text-center">{p.edad}</td>
                  <td>{p.rol}</td>
                  <td>{p.fecha_aparicion}</td>
                  <td>{p.descripcionanime}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}
``