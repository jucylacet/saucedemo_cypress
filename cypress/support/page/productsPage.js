const ELEMENTS = {
    title: '[data-test="title"]'
}

class ProductsPage {

    textoDoTitulo(text){
        cy.get(ELEMENTS.title).contains(text).should('be.visible')
    }

}

export default new ProductsPage();