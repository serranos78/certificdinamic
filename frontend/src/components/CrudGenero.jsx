import { useEffect, useState } from "react";
import axios from "axios";

const URL_GENERO = "http://localhost/dinamica/backend/genero.php";

export default function CrudGenero() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    popularidad: ""
  });

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  // ===== CARGAR DATOS
  const getGenero = async () => {
    const res = await axios.get(URL_GENERO);
    setLista(res.data);
  };

  useEffect(() => {
    getGenero();
  }, []);

  // ===== CONTROL INPUTS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===== GUARDAR / ACTUALIZAR
  const submit = async (e) => {
    e.preventDefault();

    const res = await axios.post(URL_GENERO, {
      ...form,
      op: editId ? "update" : "create",
      idgenero: editId
    });

    console.log(res.data);

    setForm({
      nombre: "",
      descripcion: "",
      popularidad: ""
    });

    setEditId(null);
    getGenero();
  };

  // ===== EDITAR
  const editar = (g) => {
    setForm(g);
    setEditId(g.idgenero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===== ELIMINAR
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar género?")) return;

    await axios.post(URL_GENERO, {
      op: "delete",
      idgenero: id
    });

    getGenero();
  };

  return (
    <>
      {/* ===== ESTILOS ===== */}
      <style>{`
        .genero-card {
          border-radius: 14px;
          border: none;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .genero-header {
          background: linear-gradient(135deg, #198754, #0f5132);
          color: white;
          text-align: center;
          border-radius: 14px 14px 0 0;
        }

        .badge-pop {
          padding: 5px 10px;
          border-radius: 8px;
          color: white;
          font-size: 0.8rem;
        }

        .alta { background: #dc3545; }
        .media { background: #ffc107; color: black; }
        .baja { background: #0d6efd; }
        .muyalta { background: #6f42c1; }
      `}</style>

      <div className="container mt-4">

        {/* ===== FORMULARIO ===== */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card genero-card mb-4">

              <div className="card-header genero-header">
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
                  <span className={`badge-pop ${
                    g.popularidad === "Alta" ? "alta" :
                    g.popularidad === "Media" ? "media" :
                    g.popularidad === "Baja" ? "baja" :
                    "muyalta"
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