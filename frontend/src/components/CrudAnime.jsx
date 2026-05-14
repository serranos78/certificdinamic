import { useEffect, useState } from "react";
import axios from "axios";

//const URL = "http://localhost:3000/anime";
const URL = "http://backend.onrender.com/anime";

export default function CrudAnime() {
  const [form, setForm] = useState({});
  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ GET
  const getData = async () => {
    const res = await axios.get(URL);
    setLista(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE / UPDATE
  const submit = async (e) => {
    e.preventDefault();

    if (editId) {
      // 🔹 UPDATE
      await axios.put(`${URL}/${editId}`, form);
    } else {
      // 🔹 CREATE
      await axios.post(URL, form);
    }

    setForm({});
    setEditId(null);
    getData();
  };

  const editar = (anime) => {
    setForm(anime);
    setEditId(anime.idanime);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este anime?")) return;

    await axios.delete(`${URL}/${id}`);
    getData();
  };

  return (
    <>
      {/* ===== CONTENIDO VISUAL (NO CAMBIA) ===== */}

      <div className="container mt-4">

        {/* FORMULARIO */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card mb-4">
              <div className="card-header bg-primary text-white text-center">
                <h6>{editId ? "Editar Anime" : "Agregar Anime"}</h6>
              </div>

              <div className="card-body">
                <form onSubmit={submit}>
                  <input
                    name="descripcionanime"
                    placeholder="Anime"
                    className="form-control mb-2"
                    value={form.descripcionanime || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="numtemporadas"
                    placeholder="Temporadas"
                    className="form-control mb-2"
                    value={form.numtemporadas || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="capitulos"
                    placeholder="Capítulos"
                    className="form-control mb-2"
                    value={form.capitulos || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="date"
                    name="fechalanzam"
                    className="form-control mb-2"
                    value={form.fechalanzam || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="empresalanzam"
                    placeholder="Empresa"
                    className="form-control mb-3"
                    value={form.empresalanzam || ""}
                    onChange={handleChange}
                    required
                  />

                  <button className="btn btn-success w-100">
                    {editId ? "Actualizar" : "Guardar"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* TABLA */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Anime</th>
              <th>Temp.</th>
              <th>Cap.</th>
              <th>Fecha</th>
              <th>Empresa</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((a) => (
              <tr key={a.idanime}>
                <td>{a.descripcionanime}</td>
                <td>{a.numtemporadas}</td>
                <td>{a.capitulos}</td>
                <td>{a.fechalanzam}</td>
                <td>{a.empresalanzam}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => editar(a)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(a.idanime)}
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
