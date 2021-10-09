var express = require("express"),
    app = express(),
    bodyParser = require('body-parser');
    
var todoRoutes = require("./routes/todos");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send("HEELO FROM THE ROOT ROUTE");
});

app.use('/api/todos', todoRoutes);


app.listen(process.env.PORT, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
})