const express=require("express");
const app=express();
const Inserir = require("./src/controllers/insertBilhete");
const Recarregar = require("./src/controllers/insertRecarga");
const Utilizar = require("./src/controllers/insertUtilizacao");
const Verificar = require("./src/controllers/verificarBilhete");
// const teste = require("./src/controllers/teste");

app.use(express.static(__dirname+"/src/front"));

// Rotas para Paginas HTML
app.get("/",function(req,res){
    res.sendFile(__dirname+"/src/front/views/index.html");
});
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
app.post("/gerarBilhete/:codigo",async(req,next)=>{
   await Inserir(req.params.codigo);
});

app.post("/RecarregarBilhete/:codigo/:tipo/:saldo",async(req,res,next)=>{
    try {
        await Recarregar(req.params.codigo,req.params.tipo,req.params.saldo);
    } catch (error) {
        console.log(error);
    }
});

app.post("/VerificarBilhete/:codigo",async(req,res,next)=>{
    existe = await Verificar(req.params.codigo);

    return res.json(existe);
});

app.post("/plano/:codigo/:tipo/:saldo",async(req,res,next)=>{

});

app.post("/utilizar/:codigo", async(req,res,next)=>{
    try {
        await Utilizar(req.params.codigo)
    } catch (error) {
        console.log(error);
    }
});

app.listen(8081,function(){
    console.log("Servidor Rodando!");
});

