const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const multer = require("multer")
const crypto = require("crypto")
const {MongoClient} = require("mongodb")

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view-engine", "ejs")
const uploads = multer({dest:".temp"})

let db;

function connectToDb() {
    let client = new MongoClient("mongodb://localhost/casos");
    client.connect();
    console.log("Conectado a la DB");
    db = client.db();
}

app.get("/descargar", (req, res)=>{
    let files = fs.readdirSync(__dirname+"/.storage");
    res.render("descargar.ejs", {archivos:files})
})

app.post("/descargar", (req, res)=>{
    let temporal = __dirname+"/.temp/"+req.body.documentos;
    let inputFS = fs.createReadStream(__dirname+"/.storage/"+req.body.documentos)
    let outputFS = fs.createWriteStream(__dirname+"/.temp/"+req.body.documentos)
    let key = "abcabcabcabcabcabcabcabcabcabc12"
    let iv = "abcabcabcabcabc1"
    let cipher = crypto.createDecipheriv("aes-256-cbc",key,iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", ()=> {
        res.download(temporal, (err)=> {
            if (err) throw err;
            fs.unlinkSync(temporal)
        })
    })
})

app.get("/cargar", (req, res)=> {
    res.render("cargar.ejs")
})

app.post("/cargar", uploads.single("archivo"), (req, res)=> {
    let rutaDefinitiva = "/.storage/"+req.body.nombre;
    let inputFS = fs.createReadStream(__dirname+"/.temp/"+req.file.filename)
    let outputFS = fs.createWriteStream(__dirname+rutaDefinitiva)
    let key = "abcabcabcabcabcabcabcabcabcabc12"
    let iv = "abcabcabcabcabc1"
    let cipher = crypto.createCipheriv("aes-256-cbc",key,iv)
    inputFS.pipe(cipher).pipe(outputFS)
    outputFS.on("finish", ()=> {
        fs.unlinkSync(__dirname+"/.temp/"+req.file.filename)
        let aInsertar = {nombre:req.body.nombre, archivo:rutaDefinitiva}
        db.collection("carpeta").insertOne(aInsertar, (err, res)=> {
            if (err) throw err;
            console.log(res);
        })
    })
    res.render("cargar.ejs")
})

app.listen(1337, ()=>{
    connectToDb();
    console.log("Server started in port 1337.....")
})