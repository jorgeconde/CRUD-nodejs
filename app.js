
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , questions = require('./routes/questions')
  , answers = require('./routes/answers')
  , valquestions = require('./routes/valquestions')
  , categories = require('./routes/categories');

var app = express();
var myConnection = require('express-myconnection'); 
var dbOptions = {
		  host: 'localhost',
		  user: 'root',
		  password : '',
		  port : 3306, //port mysql
		  database:'preguntados'	
};
var mysql = require('mysql');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(myConnection(mysql, dbOptions, 'request'));

app.get('/', routes.index);


app.get('/categories', categories.list);
app.get('/categories/add', categories.add);
app.post('/categories/add', categories.save);
app.get('/categories/delete/:id', categories.delete_category);
app.get('/categories/edit/:id', categories.edit); 
//app.post('/categories/edit/:id', categories.save_edit);

app.get('/questions', questions.list);
app.get('/questions/add', questions.add);
app.post('/questions/add', questions.save);
app.get('/questions/delete/:id', questions.delete_question);
app.get('/questions/edit/:id', questions.edit);
app.post('/questions/edit/:id', questions.save_edit);

app.get('/answers', answers.list);
app.get('/answers/add', answers.add);
app.post('/answers/add', answers.save);
app.get('/answers/delete/:id/:posicion/:respuesta', answers.delete_answer);

app.get('/valquestions', valquestions.list);
app.get('/valquestions/add', valquestions.add);
app.post('/valquestions/add', valquestions.save);
app.get('/valquestions/delete/:id', valquestions.delete_valquestion);
app.get('/valquestions/edit/:id', valquestions.edit);
app.post('/valquestions/edit/:id', valquestions.save_edit);
app.get('/valquestions/validate/:id', valquestions.validate);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});