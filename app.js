const express=require("express");
const app=express();
const Inserir = require("./src/controllers/insertBilhete");
const Recarregar = require("./src/controllers/insertRecarga");
const Utilizar = require("./src/controllers/insertUtilizacao");
const verificarBilhete = require("./src/controllers/verificarBilhete");
const selectGerenciar = require("./src/controllers/selectGerenciar");
// const teste = require("./src/controllers/teste");


app.use(express.static(__dirname+"/src/front"));

// Rotas para Paginas HTML

app.get("/info",function(req,res){
    res.sendFile(__dirname+"/src/front/views/info.html");
});
app.get("/geracao",function(req,res){
    res.sendFile(__dirname+"/src/front/views/geracao.html");
});
app.get("/recarga",function(req,res){
    res.sendFile(__dirname+"/src/front/views/recarga.html");
});
app.get("/planos",function(req,res){
    res.sendFile(__dirname+"/src/front/views/planos.html");
});
app.get("/utilizacao",function(req,res){
    res.sendFile(__dirname+"/src/front/views/utilizacao.html");
});
app.get("/meu-techtikt",function(req,res){
    res.sendFile(__dirname+"/src/front/views/meu-techtikt.html");
});


// FETCH POST
app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/front/views/index.html");
});

app.post("/gerarBilhete/:codigo",async(req,next)=>{
   await Inserir(req.params.codigo);
});

app.post("/VerificarBilhete/:codigo",async(req,res,next)=>{
    existe= await verificarBilhete(req.params.codigo);
    codigo=req.params.codigo;
    return res.json(existe);
});

app.post("/RecarregarBilhete/:tipo/:saldo",async(req,next)=>{
    //(codigo);
    await Recarregar(codigo,req.params.tipo,req.params.saldo);
});

app.post("/utilizar/:codigo", async(req,res,next)=>{
    var dadosUtilizacao = await Utilizar(req.params.codigo);
    return res.json(dadosUtilizacao);
});

app.post("/gerenciar/:codigo", async(req,res,next)=>{
    var dadosGerenciar = await selectGerenciar(req.params.codigo);
    return res.json(dadosGerenciar)
});

app.listen(8081,function(){
    console.log("Servidor Rodando!");
});

