module.exports.home = (application,req,res) => 
    res.render('index',{validacao: {}, dadosForm: {}})

module.exports.autenticar = (application,req,res) => {
    const dadosForm = req.body

    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty()
    req.assert('senha', 'Senha Não pode ser vazio').notEmpty()
    
    const erros = req.validationErrors()
    if(erros){
        res.render("index",{validacao: erros, dadosForm: dadosForm})
        return
    }

    const connection = application.config.dbConnection
    const UsuariosDAO = new application.app.models.UsuariosDAO(connection)

    UsuariosDAO.autenticar(dadosForm,req, res)

    // res.send('podemos criar sessao')
}
    