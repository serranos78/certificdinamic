import { useEffect, useState } from "react";
import axios from "axios";

const URL_PERSONAJE = "http://localhost/dinamica/backend/personaje.php";
const URL_ANIME = "http://localhost/dinamica/backend/anime.php";

export default function CrudPersonaje() {
  const [form, setForm] = useState({});
  const [lista, setLista] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [editId, setEditId] = useState(null);

  // ===== CARGAR PERSONAJES
  const getPersonajes = async () => {
    const res = await axios.get(URL_PERSONAJE);
    setLista(res.data);
  };

  // ===== CARGAR ANIMES (para dropdown)
  const getAnimes = async () => {
    const res = await axios.get(URL_ANIME);
    setAnimes(res.data);
  };

  useEffect(() => {
    getPersonajes();
    getAnimes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(URL_PERSONAJE, {
      ...form,
      op: editId ? "update" : "create",
      idpersonaje: editId,
    });

    setForm({});
    setEditId(null);
    getPersonajes();
  };

  const editar = (p) => {
    setForm(p);
    setEditId(p.idpersonaje);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar personaje?")) return;
    await axios.post(URL_PERSONAJE, { op: "delete", idpersonaje: id });
    getPersonajes();
  };

  return (
    <>
      <style>{`
        .anime-card {
          border-radius: 14px;
          border: none;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }
        .anime-header {
          background: linear-gradient(135deg, #6f42c1, #3d2c8d);
          color: white;
          text-align: center;
          border-radius: 14px 14px 0 0;
        }
      `}</style>

      <div className="container mt-4">

        {/* ===== FORM ===== */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card anime-card mb-4">

              <div className="card-header anime-header">
                <h6>{editId ? "Editar Personaje" : "Agregar Personaje"}</h6>
              </div>

              <div className="card-body">
                <form onSubmit={submit}>

                  <input
                    name="nombre"
                    placeholder="Nombre"
                    className="form-control mb-2"
                    value={form.nombre || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="edad"
                    placeholder="Edad"
                    className="form-control mb-2"
                    value={form.edad || ""}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="rol"
                    className="form-control mb-2"
                    value={form.rol || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="Protagonista">Protagonista</option>
                    <option value="Antagonista">Antagonista</option>
                    <option value="Secundario">Secundario</option>
                  </select>

                  <input
                    type="date"
                    name="fecha_aparicion"
                    className="form-control mb-2"
                    value={form.fecha_aparicion || ""}
                    onChange={handleChange}
                    required
                  />

                  {/* ✅ DROPDOWN DINÁMICO */}
                  <select
                    name="idanime"
                    className="form-control mb-3"
                    value={form.idanime || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar Anime</option>
                    {animes.map((a) => (
                      <option key={a.idanime} value={a.idanime}>
                        {a.descripcionanime}
                      </option>
                    ))}
                  </select>

                  <button className="btn btn-success w-100">
                    {editId ? "Actualizar" : "Guardar"}
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TABLA ===== */}
        <table className="table table-hover table-sm">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Rol</th>
              <th>Fecha</th>
              <th>Anime</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((p) => (
              <tr key={p.idpersonaje}>
                <td>{p.nombre}</td>
                <td className="text-center">{p.edad}</td>
                <td>{p.rol}</td>
                <td>{p.fecha_aparicion}</td>

                {/* ✅ Mostrar nombre del anime */}
                <td className="text-center">
                  {
                    animes.find(a => a.idanime == p.idanime)?.descripcionanime || p.idanime
                  }
                </td>

                <td className="text-center">
                  <button className="btn btn-warning btn-sm me-1"
                    onClick={() => editar(p)}>
                    Editar
                  </button>

                  <button className="btn btn-danger btn-sm"
                    onClick={() => eliminar(p.idpersonaje)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}
