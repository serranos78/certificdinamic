import { useState } from "react";
import axios from "axios";

export default function CreateAnime() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost/dinamica/backend/anime.php", inputs);

      if (res.data.success) {
        alert("Anime agregado correctamente");
      } else {
        alert("Error al guardar: " + res.data.error);
        console.error("SQL ejecutado:", res.data.sql);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el backend");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border">
            <div className="card-header bg-primary text-white py-1">
              <h6 className="mb-0" >Agregar un nuevo Anime</h6>
            </div>
            <div className="card-body p-2">
              <form onSubmit={handleSubmit}>
                
                <div className="row mb-2 align-items-center">
                  <label htmlFor="descripcionanime" className="col-4 col-form-label col-form-label-sm text-end">Anime: </label>
                  <div className="col-8"> 
                    <input type="text" className="form-control form-control-sm" id="descripcionanime" name="descripcionanime" onChange={handleChange}/>
                  </div>
                </div>


                <div className="row mb-2 align-items-center">
                  <label htmlFor="numtemporadas" className="col-4 col-form-label col-form-label-sm text-end">Temporadas:</label>
                  <div className="col-8">
                    <input type="number" className="form-control form-control-sm" id="numtemporadas" name="numtemporadas" onChange={handleChange} />
                  </div>
                </div>

                <div className="row mb-2 align-items-center">
                  <label htmlFor="capitulos" className="col-4 col-form-label col-form-label-sm text-end">No. de capítulos:</label>
                  <div className="col-8">
                    <input type="number" className="form-control form-control-sm" id="capitulos" name="capitulos" onChange={handleChange} />
                  </div>
                </div>

                <div className="row mb-2 align-items-center">
                  <label htmlFor="fechalanzam" className="col-4 col-form-label col-form-label-sm text-end">Fecha de lanzamiento:</label>
                  <div className="col-8">
                    <input type="date" className="form-control form-control-sm" id="fechalanzam" name="fechalanzam" onChange={handleChange} />
                  </div>
                </div>

                <div className="row mb-2 align-items-center">
                  <label htmlFor="empresalanzam" className="col-4 col-form-label col-form-label-sm text-end">Empresa de lanzamiento:</label>
                  <div className="col-8">
                    <input type="text" className="form-control form-control-sm" id="empresalanzam" name="empresalanzam" onChange={handleChange} />
                  </div>  
                </div>

                <button type="submit" className="btn btn-success btn-sm w-100">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
