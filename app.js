const express= require("express");
const body_parser=require("body-parser");
const https = require("https");

const app=express();

app.use(body_parser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    // const city="bhilai";
    

    // res.send("yo-yo");
    
})
app.post("/",(req,res)=>{
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=61d2a482ac77192d42be2fbd7d62fa16&units=metric";
    https.get(url,(response)=>{
        console.log(response.statusMessage);
        response.on("data",(data)=>{
            // console.log(data);
            const obj=JSON.parse(data);
            // console.log(obj);
            const temperature=obj.main.temp;
            // console.log(temperature);
            const desc=obj.weather[0].description;
            const icon=obj.weather[0].icon;
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The description is " + desc + "</h1>")
            res.write("<h1>The temperature in "+query+" is " + temperature + " degree celcius </h1>")
            res.write("<img src="+imageurl+">");
            res.send();
        })
    })
})



app.listen(3000,()=>{
    console.log("server id running!\n");
})

// export {temperature,desc};