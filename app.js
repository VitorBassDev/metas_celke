require('dotenv/config');

const express   = require('express');
const mongoose  = require('mongoose')
const http      = require ('http');

const app       = express();

///
/**
 * Conexão com o banco de dados Local */
mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conectado com MongoDb')
}).catch((err) =>{
    console.log('Erro ao Conectar', + err)
});
/////

app.use(express.json());

app.get('/', async (request, response) => {
    console.log("Rota Principal");
    return response.json({
        Mensagem: "Rota Principal"
    })
})


const server = http.createServer(app);
  server.listen(process.env.PORT_BACKEND, () => {
  console.log(`Novo Backend - Help a ONG - PORT`, process.env.PORT_BACKEND);
}); 