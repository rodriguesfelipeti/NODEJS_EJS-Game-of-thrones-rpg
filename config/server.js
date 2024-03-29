const express = require('express') /* importar o módulo do framework express */
const consign = require('consign') /* importar o módulo do consign */
const bodyParser = require('body-parser') /* importar o módulo do body-parser */
const expressValidator = require('express-validator') /* importar o módulo do express-validator */
const expressSession = require('express-session') /* importar modulo de express session */

var app = express(); /* iniciar o objeto do express */

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(express.static('./app/public')) /* configurar o middleware express.static */
app.use(bodyParser.urlencoded({extended: true})) /* configurar o middleware body-parser */
app.use(expressValidator()); /* configurar o middleware express-validator */
app.use(expressSession({ /* configurar o middleware express-session */
	secret: 'fdsafdsaf',
	resave: false,
	saveUnitialized: false
})) 

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);


module.exports = app; /* exportar o objeto app */