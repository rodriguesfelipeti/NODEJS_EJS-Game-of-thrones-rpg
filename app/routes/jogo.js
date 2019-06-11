module.exports = (application) => {
	application.get('/jogo', (req, res) => 
		application.app.controllers.jogo.jogo(application,req,res))

	application.get('/sair', (req, res) => 
		application.app.controllers.jogo.sair(application,req,res))

	application.get('/suditos', (req, res) => 
		application.app.controllers.jogo.suditos(application,req,res))
	
	application.get('/pergaminhos', (req, res) => 
		application.app.controllers.jogo.pergaminhos(application,req,res))	

	application.post('/ordernar_acao_sudito', (req, res) => 
		application.app.controllers.jogo.ordernar_acao_sudito(application,req,res))	
	

}
	
