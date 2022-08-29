const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const multer = require("multer")

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view-engine", "ejs")
const uploads = multer({dest:".temp"})

app.get("/descargar", (req, res)=>{
    let files = fs.readdirSync(__dirname+"/.storage");
    res.render("descargar.ejs", {archivos:files})
})

app.post("/descargar", (req, res)=>{
    res.download(__dirname+"/.storage/"+req.body.documentos, (err)=> {
        if (err) throw err;
    })
})

app.get("/cargar", (req, res)=> {
    res.render("cargar.ejs")
})

app.post("/cargar", uploads.single("archivo"), (req, res)=> {
    console.log(req.file.filename, req.body.nombre);
})

app.listen(1337, ()=>{
    console.log("Server started in port 1337.....")
})