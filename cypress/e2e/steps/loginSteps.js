import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginActions from "../../support/appActions/loginActions";
import productsPage from "../../support/page/productsPage";
import loginPage from "../../support/page/loginPage";

let usersData; // Armazenará todos os dados do fixture
let currentUser; // Armazenará o objeto do usuário atualmente em teste

// Carrega o fixture uma vez antes de todos os cenários
before(() => {
  cy.fixture('users').then((dadosDoJson) => {
    usersData = dadosDoJson;
  });
});

// Executa a limpeza dos dados do navegador após cada teste
after(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
});

// Dado que eu acesse a página de login do Saucedemo
Given('que eu acesse a página de login', () => {
  cy.visit('/'); // URL do Saucedemo
});

// Quando eu preencho os campos de usuário e senha com as credenciais do usuário "{string}"
When('eu preencho os campos de usuário e senha com as credenciais do usuário {string}', (perfil_usuario) => {
    if (!usersData[perfil_usuario]) {
        cy.log(`Usuário '${perfil_usuario}' não encontrado no fixture!`);
      throw new Error(`Usuário '${perfil_usuario}' não encontrado no fixture!`);
    }
    const user = usersData[perfil_usuario];
    loginActions.loginAppAction(user.username, user.password);
    // loginPage.preencherUsuario(user.username)
    // loginPage.preencherSenha(user.password)

  });

  // E eu clico no botão "{string}" (este passo pode continuar genérico ou ser movido para o PO se sempre for o botão de login)
When('eu clico no botão {string}', (buttonText) => {
    loginPage.clicarLogin();
  });

  Then('eu devo ser redirecionado para a tela de {string}', (titleText) => {
    cy.url().should('include','/inventory.html')
    productsPage.textoDoTitulo(titleText)
  });

  Then('o sistema deve exibir a mensagem de erro {string}', (messageText) => {
    loginPage.verificarMensagemDeErro(messageText)
  });

  Then('o sistema deve exibir a mensagem de erro do perfil {string}', (perfil_usuario) => {
    if (!usersData[perfil_usuario] || !usersData[perfil_usuario].mensagem) {
      throw new Error(`Mensagem de erro para o usuário '${perfil_usuario}' não encontrada no fixture!`);
    }
    const expectedErrorMessage = usersData[perfil_usuario].mensagem;
    loginPage.verificarMensagemDeErro(expectedErrorMessage);
  });