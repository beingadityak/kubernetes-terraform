var cheerio = require('cheerio');
var request = require('request');

// Gets a random date between two given dates
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatGoComicsDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
}

function getDilbert(date) {
	// Get Dilbert page
    return new Promise(function(resolve,reject){
        request('http://www.dilbert.com/strip/'+date, function(err, response, body) {
            if (err)  reject(err);
            // User cheerio to access the html of the returned page
            $ = cheerio.load(body);
            var retObj = {
                image : $('.img-comic').get(0).attribs.src,
                desc : $('.img-comic').get(0).attribs.alt,
                date : date
            };
            resolve(retObj);
        });
    });
}

function getCalvinHobbes(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/calvinandhobbes/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}

function getGarfield(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/garfield/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}
function getPeanuts(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/peanuts/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}
function getWizardofid(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/wizardofid/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}
function getBusinesscat(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/the-adventures-of-business-cat/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}
function getnonsequitur(date){
    return new Promise(function(resolve,reject){
        request('http://www.gocomics.com/nonsequitur/'+date, function(err,response,body){
            if(err) reject(err);
            $ = cheerio.load(body);

            var retObj = {
                image: $('.item-comic-image img').attr('src'),
                desc: $('.item-comic-link').attr('title'),
                date: date
            }
            resolve(retObj);
        });
    });
}





module.exports = function(app,express){
    var api = express.Router();

    api.get('/',function(req,res){

        res.status(200).json({
            'endpoints':[{
                'name' : 'Dilbert',
                'address' : '/random/dilbert'
            },
            {
                'name' : 'Calvin & Hobbes',
                'address' : '/random/calvinhobbes'
            },
            {
                'name' : 'Garfield',
                'address' : '/random/garfield'
            },
            {
                'name' : 'Peanuts',
                'address' : '/random/peanuts'
            },
            {
                'name' : 'Wizard of Id',
                'address' : '/random/wizardofid'
            },
            {
                'name' : 'The Adventures of Business Cat',
                'address' : '/random/businesscat'
            },
            {
                'name' : 'Non Sequitur',
                'address' : '/random/nonsequitur'
            }
        ]
        });

    });

    api.get('/random/dilbert', function(req,res){

        var date = randomDate(new Date(1989, 03, 17), new Date());
	    var year = date.getFullYear(), month = date.getMonth(), day = date.getDay();
	    var formattedDate = year + '-' + month + '-' + day;

        getDilbert(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });

    });

    api.get('/random/calvinhobbes', function(req,res){

        var date = randomDate(new Date(1986, 03, 17), new Date());
        var formattedDate = formatGoComicsDate(date);

        getCalvinHobbes(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });

    });

    api.get('/random/garfield',function(req,res){
        var date = randomDate(new Date(1978, 05, 19), new Date());
        var formattedDate = formatGoComicsDate(date);
        getGarfield(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });
    });
    api.get('/random/nonsequitur',function(req,res){
        var date = randomDate(new Date(1992, 02, 16), new Date());
        var formattedDate = formatGoComicsDate(date);
        getnonsequitur(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });
    });
    api.get('/random/peanuts',function(req,res){
        var date = randomDate(new Date(1950, 10, 02), new Date());
        var formattedDate = formatGoComicsDate(date);
        getPeanuts(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });
    });
    api.get('/random/wizardofid',function(req,res){
        var date = randomDate(new Date(2002, 01, 01), new Date());
        var formattedDate = formatGoComicsDate(date);
        getWizardofid(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });
    });
    api.get('/random/businesscat',function(req,res){
        var date = randomDate(new Date(2015, 04, 27), new Date());
        var formattedDate = formatGoComicsDate(date);
        getBusinesscat(formattedDate).then(function(retObj){
            //console.log(retObj);
            res.status(200).json(retObj);
        });
    });

    return api;
}