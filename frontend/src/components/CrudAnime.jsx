import { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://localhost/dinamica/backend/anime.php";

export default function CrudAnime() {
  const [form, setForm] = useState({});
  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(URL, {
      ...form,
      op: editId ? "update" : "create",
      idanime: editId,
    });

    setForm({});
    setEditId(null);
    getData();
  };

  const editar = (anime) => {
    setForm(anime);
    setEditId(anime.idanime);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este anime?")) return;
    await axios.post(URL, { op: "delete", idanime: id });
    getData();
  };

  return (
    <>
      {/* ====== ESTILOS ====== */}
      <style>{`
        .anime-card {
          border-radius: 14px;
          border: none;
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .anime-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 45px rgba(0,0,0,0.15);
        }

        .anime-header {
          background: linear-gradient(135deg, #0d6efd, #084298);
          color: #fff;
          text-align: center;
          border-radius: 14px 14px 0 0;
        }

        .anime-input {
          border-radius: 8px;
          transition: border-color .2s, box-shadow .2s;
        }

        .anime-input:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 .15rem rgba(13,110,253,.25);
        }

        .anime-btn {
          border-radius: 25px;
          font-weight: 500;
          letter-spacing: .4px;
          transition: transform .15s ease, box-shadow .15s ease;
        }

        .anime-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 18px rgba(25,135,84,.45);
        }
      `}</style>

      <div className="container mt-4">

        {/* ===== FORMULARIO ===== */}
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card anime-card mb-4">
              <div className="card-header anime-header">
                <h6 className="mb-0">
                  {editId ? "Editar Anime" : "Agregar Anime"}
                </h6>
              </div>
              <div className="card-body">

                <form onSubmit={submit}>
                  <input
                    name="descripcionanime"
                    placeholder="Anime"
                    className="form-control form-control-sm mb-2 anime-input"
                    value={form.descripcionanime || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="numtemporadas"
                    placeholder="Temporadas"
                    className="form-control form-control-sm mb-2 anime-input"
                    value={form.numtemporadas || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="number"
                    name="capitulos"
                    placeholder="Capítulos"
                    className="form-control form-control-sm mb-2 anime-input"
                    value={form.capitulos || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="date"
                    name="fechalanzam"
                    className="form-control form-control-sm mb-2 anime-input"
                    value={form.fechalanzam || ""}
                    onChange={handleChange}
                    required
                  />

                  <input
                    name="empresalanzam"
                    placeholder="Empresa"
                    className="form-control form-control-sm mb-3 anime-input"
                    value={form.empresalanzam || ""}
                    onChange={handleChange}
                    required
                  />

                  <button className="btn btn-success btn-sm w-100 anime-btn">
                    {editId ? "Actualizar" : "Guardar"}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>

        {/* ===== TABLA ===== */}
        <div className="table-responsive">
          <table className="table table-hover table-sm align-middle">
            <thead className="table-dark text-center">
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
                  <td className="text-center">{a.numtemporadas}</td>
                  <td className="text-center">{a.capitulos}</td>
                  <td>{a.fechalanzam}</td>
                  <td>{a.empresalanzam}</td>
                  <td className="text-center">
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

      </div>
    </>
  );
}