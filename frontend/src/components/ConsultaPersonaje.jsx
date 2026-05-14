import { useEffect, useState } from "react";
import axios from "axios";

// ✅ URL base de tu backend en Render
const API = "https://certificdinamic-production.up.railway.app";

export default function ConsultaPersonaje() {
  const [animes, setAnimes] = useState([]);
  const [idanime, setIdanime] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Cargar lista de animes
  const getAnimes = async () => {
    try {
      const res = await axios.get(`${API}/anime`);
      setAnimes(res.data);
    } catch (error) {
      console.error("Error al cargar animes:", error);
      alert("No se pudieron cargar los animes");
    }
  };

  useEffect(() => {
    getAnimes();
  }, []);

  // ✅ Consulta por ID de anime
  const consultar = async () => {
    if (!idanime) {
      alert("Selecciona un anime");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/anime/${idanime}/personajes`
      );

      setResultados(res.data);

    } catch (error) {
      console.error("Error en la consulta:", error);
      alert("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h4 className="text-center mb-3">
        Consulta de Personajes por Anime
      </h4>

      {/* ✅ SELECT */}
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

          <button
            className="btn btn-primary w-100"
            onClick={consultar}
            disabled={loading}
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>

        </div>
      </div>

      {/* ✅ TABLA */}
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

      {/* ✅ Mensaje si no hay datos */}
      {(!loading && resultados.length === 0 && idanime) && (
        <p className="text-center">No hay personajes para este anime.</p>
      )}

    </div>
  );
}