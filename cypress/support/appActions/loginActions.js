import loginPage from "../page/loginPage";


class LoginActions {

    loginAppAction(usuario,senha){
        loginPage.preencherUsuario(usuario)
        loginPage.preencherSenha(senha)
    }

}

export default new LoginActions();