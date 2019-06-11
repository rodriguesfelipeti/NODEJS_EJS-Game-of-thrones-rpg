module.exports.cadastro = (application,req,res) => {
    res.render("cadastro",{validacao: {}, dadosForm: {}})
} 

module.exports.cadastrar = (application,req,res) => {
    dadosForm = req.body

    req.assert('nome','NOME NÃO PODE SER VAZIO').notEmpty()
    req.assert('usuario','USUÁRIO NÃO PODE SER VAZIO').notEmpty()
    req.assert('senha','SENHA NÃO PODE SER VAZIO').notEmpty()
    req.assert('casa','CASA NÃO PODE SER VAZIO').notEmpty()

    const erros = req.validationErrors()

    if(erros){
        res.render("cadastro",{validacao: erros, dadosForm: dadosForm})
        return
    }

    const connection = application.config.dbConnection
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection)
    const JogoDAO = new application.app.models.JogoDAO(connection)
    UsuariosDAO.inserirUsuario(dadosForm)
    //geracao de parâmetros
    JogoDAO.gerarParametros(dadosForm.usuario)


    res.redirect('cadastro')

}