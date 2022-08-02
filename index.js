const express = require('express');
const cors = require('cors')
//Crear servidor
const app = express();

//Middleware. Habilito para que se puedan enviar JSON a la API/
app.use(cors())
app.use(express.json())

app.use('/bpc', require('./routes/bpc'))
app.use('/otros-entes', require('./routes/entesVarios'))
app.use('/agregar-entes', require('./routes/updateEntes'))

//instancia de app, para que escuche en el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo");
})