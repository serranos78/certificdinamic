import { useEffect, useState } from "react";
import axios from "axios";

// ✅ URL base correcta
const API = "https://certificdinamic-production.up.railway.app";

export default function CrudPersonaje() {
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    rol: "",
    fecha_aparicion: "",
    idanime: ""
  });

  const [lista, setLista] = useState([]);
  const [animes, setAnimes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ GET PERSONAJES
  const getPersonajes = async () => {
    try {
      const res = await axios.get(`${API}/personaje`);
      setLista(res.data);
    } catch (error) {
      console.error("Error al cargar personajes:", error);
      alert("Error al cargar personajes");
    }
  };

  // ✅ GET ANIMES
  const getAnimes = async () => {
    try {
      const res = await axios.get(`${API}/anime`);
      setAnimes(res.data);
    } catch (error) {
      console.error("Error al cargar animes:", error);
      alert("Error al cargar animes");
    }
  };

  useEffect(() => {
    getPersonajes();
    getAnimes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE / UPDATE
  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${API}/personaje/${editId}`, form);
      } else {
        await axios.post(`${API}/personaje`, form);
      }

      setForm({
        nombre: "",
        edad: "",
        rol: "",
        fecha_aparicion: "",
        idanime: ""
      });

      setEditId(null);
      getPersonajes();

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar personaje");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDITAR
  const editar = (p) => {
    setForm(p);
    setEditId(p.idpersonaje);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar personaje?")) return;

    try {
      await axios.delete(`${API}/personaje/${id}`);
      getPersonajes();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar");
    }
  };

  return (
    <>
      <div className="container mt-4">

        {/* FORM */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card mb-4">

              <div className="card-header bg-primary text-white text-center">
                <h6>{editId ? "Editar Personaje" : "Agregar Personaje"}</h6>
              </div>

              <div className="card-body">
                <form onSubmit={submit}>

                  <input
                    name="nombre"
                    placeholder="Nombre"
                    className="form-control mb-2"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="edad"
                    placeholder="Edad"
                    className="form-control mb-2"
                    value={form.edad}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="rol"
                    className="form-control mb-2"
                    value={form.rol}
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
                    value={form.fecha_aparicion}
                    onChange={handleChange}
                    required
                  />

                  {/* SELECT ANIME */}
                  <select
                    name="idanime"
                    className="form-control mb-3"
                    value={form.idanime}
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

                  <button className="btn btn-success w-100" disabled={loading}>
                    {loading
                      ? "Guardando..."
                      : editId
                      ? "Actualizar"
                      : "Guardar"}
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
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

                <td className="text-center">
                  {
                    animes.find(a => a.idanime == p.idanime)?.descripcionanime
                    || p.idanime
                  }
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => editar(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(p.idpersonaje)}
                  >
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