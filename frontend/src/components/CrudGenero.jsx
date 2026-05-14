import { useEffect, useState } from "react";
import axios from "axios";

// ✅ URL base del backend
const API = "https://certificdinamic.onrender.com";

export default function CrudGenero() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    popularidad: ""
  });

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ GET
  const getGenero = async () => {
    try {
      const res = await axios.get(`${API}/genero`);
      setLista(res.data);
    } catch (error) {
      console.error("Error al cargar géneros:", error);
      alert("Error al cargar datos");
    }
  };

  useEffect(() => {
    getGenero();
  }, []);

  // ✅ CONTROL INPUTS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE / UPDATE
  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await axios.put(`${API}/genero/${editId}`, form);
      } else {
        // CREATE
        await axios.post(`${API}/genero`, form);
      }

      setForm({
        nombre: "",
        descripcion: "",
        popularidad: ""
      });

      setEditId(null);
      getGenero();

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar datos");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EDITAR
  const editar = (g) => {
    setForm(g);
    setEditId(g.idgenero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar género?")) return;

    try {
      await axios.delete(`${API}/genero/${id}`);
      getGenero();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar");
    }
  };

  return (
    <>
      <div className="container mt-4">

        {/* FORMULARIO */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card mb-4">

              <div className="card-header bg-success text-white text-center">
                <h6>{editId ? "Editar Género" : "Agregar Género"}</h6>
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
                    name="descripcion"
                    placeholder="Descripción"
                    className="form-control mb-2"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                  />

                  <select
                    name="popularidad"
                    className="form-control mb-3"
                    value={form.popularidad}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar</option>
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Altisima">Muy Alta</option>
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
              <th>Descripción</th>
              <th>Popularidad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((g) => (
              <tr key={g.idgenero}>
                <td>{g.nombre}</td>
                <td>{g.descripcion}</td>

                <td className="text-center">
                  <span className={`badge ${
                    g.popularidad === "Alta" ? "bg-danger" :
                    g.popularidad === "Media" ? "bg-warning text-dark" :
                    g.popularidad === "Baja" ? "bg-primary" :
                    "bg-secondary"
                  }`}>
                    {g.popularidad}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => editar(g)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(g.idgenero)}
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