var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// allow CORS -> https://enable-cors.org/server_expressjs.html
app.use('*', function(req, res, next) {
     res.header('Access-Control-Allow-Origin', "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

var api = require('./routes/api')(app,express);

app.use('/api',api);

app.get('*',function(req,res){
    res.status(200).json({
        'message' : 'Welcome to Comics Geek!'
    })
});

app.listen(port, function(err){
    if(err)
    {
        console.log(err);
    }
    console.log('Server started @ PORT : ',port);
});