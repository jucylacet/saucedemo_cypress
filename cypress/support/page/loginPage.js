const ELEMENTS = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    btnLogin: '#login-button',
    errorMessage: '[data-test="error"]'
}

class LoginPage {

    preencherUsuario(usuario){
        if (usuario != '') {
            cy.get(ELEMENTS.username).type(usuario)
        }
    }

    preencherSenha(senha){
        if (senha != '') {
            cy.get(ELEMENTS.password).type(senha)
        }
    }

    clicarLogin(){
        cy.get(ELEMENTS.btnLogin).click()
    }

    loginAppAction(usuario,senha){
        cy.get(ELEMENTS.username).type(usuario)
        cy.get(ELEMENTS.password).type(senha)
    }

    verificarMensagemDeErro(mensagem){
        cy.get(ELEMENTS.errorMessage).should('be.visible')
        .and('contain', mensagem)
    }

}

export default new LoginPage();