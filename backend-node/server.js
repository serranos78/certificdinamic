const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ TODAS LAS RUTAS
app.use('/anime', require('./anime'));
app.use('/genero', require('./genero'));
app.use('/personaje', require('./personaje'));
app.use('/', require('./consulta')); // ✅ importante

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});
