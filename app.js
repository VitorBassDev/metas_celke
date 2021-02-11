require('dotenv/config');

const express   = require('express')
const mongoose  = require('mongoose')
const http      = require ('http');
const cors 			= require ('cors');
const { request, response } = require('express');

// UTILIZAR A MODEL - META
require('./src/models/Metas');
const Meta = mongoose.model('Meta')

const app       = express();
app.use(express.json());

// IMPLEMENTAÇÃO DO CORS COMO MIDDEWARE
app.use((request, response, next) =>{
	response.header("Access-Control-Allow-Origin", "*")
	response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
	response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-PINGOTHER")
	app.use(cors());
	next();
})

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

app.get('/metas', async(request, response) => {
	
	await Meta.find({}).then((metas) => {
		console.log('Todas as Metas')
		return response.json({
			error: false,
			metas
		})
	}).catch((err) =>{
		console.log("Nenhum registro Encontrado")
		return response.status(400).json({
			error: true,
			mensagem: "Nenhum registro Encontrado"
		})
	})
})

app.post('/metas', async (request, response) => {

	await Meta.create(request.body, (err) =>{
		if(err) {
			console.log('Erro ao Cadastrar')
			return response.status(400).json('Erro ao Cadastrar')
		}
	})
			console.log('Cadastrado com Sucesso')
			return response.status(200).json('Cadastrada com Sucesso')
})

const server = http.createServer(app);
  server.listen(process.env.PORT_BACKEND, () => {
  console.log(`Backend - Metas CELKE - PORT`, process.env.PORT_BACKEND)
}); 