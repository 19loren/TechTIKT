const express=require("express");
const app=express();
const Inserir = require("./controllers/insertBilhete");
const recarregar = require("./controllers/insertrecarga");
//const verificarBilhete = require("./controllers/verificarBilhete");
const front = require("./frontEnd/js/script");


app.use(express.static(__dirname+"/frontEnd"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/frontEnd/index.html");
});

app.post("/gerarBilhete/:codigo",async(req,next)=>{
   await Inserir(req.params.codigo);
});

app.post("/RecarregarBilhete/:codigo/:tipo/:saldo",async(req,res,next)=>{
    try {
        await recarregar(req.params.codigo,req.params.tipo,req.params.saldo);
    } catch (error) {
        console.log(error);
    }
});

app.listen(8081,function(){
    console.log("Servidor Rodando!");
});
