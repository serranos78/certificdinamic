import { useEffect, useState } from "react";
import axios from "axios";

// ✅ URL base correcta
const API = "https://certificdinamic-production.up.railway.app";

export default function CrudAnime() {
  const [form, setForm] = useState({
    descripcionanime: "",
    numtemporadas: "",
    capitulos: "",
    fechalanzam: "",
    empresalanzam: ""
  });

  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ GET
  const getData = async () => {
    try {
      const res = await axios.get(`${API}/anime`);
      setLista(res.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar animes");
    }
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

    try {
      setLoading(true);

      if (editId) {
        // UPDATE
        await axios.put(`${API}/anime/${editId}`, form);
      } else {
        // CREATE
        await axios.post(`${API}/anime`, form);
      }

      setForm({
        descripcionanime: "",
        numtemporadas: "",
        capitulos: "",
        fechalanzam: "",
        empresalanzam: ""
      });

      setEditId(null);
      getData();

    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar datos");
    } finally {
      setLoading(false);
    }
  };

  const editar = (anime) => {
    setForm(anime);
    setEditId(anime.idanime);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ DELETE
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este anime?")) return;

    try {
      await axios.delete(`${API}/anime/${id}`);
      getData();
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

              <div className="card-header bg-primary text-white text-center">
                <h6>{editId ? "Editar Anime" : "Agregar Anime"}</h6>
              </div>

              <div className="card-body">
                <form onSubmit={submit}>

                  <input
                    name="descripcionanime"
                    placeholder="Anime"
                    className="form-control mb-2"
                    value={form.descripcionanime}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="numtemporadas"
                    placeholder="Temporadas"
                    className="form-control mb-2"
                    value={form.numtemporadas}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="capitulos"
                    placeholder="Capítulos"
                    className="form-control mb-2"
                    value={form.capitulos}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="date"
                    name="fechalanzam"
                    className="form-control mb-2"
                    value={form.fechalanzam}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="empresalanzam"
                    placeholder="Empresa"
                    className="form-control mb-3"
                    value={form.empresalanzam}
                    onChange={handleChange}
                    required
                  />

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