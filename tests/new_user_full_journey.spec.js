import { test } from '@playwright/test'
import { ProductsPage } from './../page-objects/ProductsPage'
import { Navigation } from './../page-objects/Navigation'
import { Checkout } from './../page-objects/Checkout'

test.only('New user full end-to-end test journey', async ({ page }) => {
    const productPage = new ProductsPage(page)

    await productPage.visit()
    await productPage.sortByCheapest()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)

    const _navigation = new Navigation(page)
    await _navigation.goToCheckout()

    const _checkout = new Checkout(page)
    await _checkout.removeCheapestProduct()
    // await page.pause()
})