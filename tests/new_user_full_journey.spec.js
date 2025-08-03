import { test } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid';

import { ProductsPage } from './../page-objects/ProductsPage'
import { Navigation } from './../page-objects/Navigation'
import { Checkout } from './../page-objects/Checkout'
import { LoginPage } from './../page-objects/LoginPage'
import { RegisterPage } from '../page-objects/RegisterPage'
import { DeliveryDetails } from '../page-objects/DeliveryDetails'
import { PaymentPage } from './../page-objects/PaymentPage'

import { deliveryDetails as userAddress } from './../data/deliveryDetails'
import { paymentDetails } from './../data/paymentDetails'

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
    await _checkout.continueToCheckout()

    const _login = new LoginPage(page)
    await _login.moveToSignup()

    const _registerPage = new RegisterPage(page)
    const email = uuidv4() + "@test.com"
    const password = uuidv4()
    await _registerPage.signUpAsNewUser(email, password)

    const _deliveryDetails = new DeliveryDetails(page)
    await _deliveryDetails.fillDetails(userAddress)
    await _deliveryDetails.saveDetails()
    await _deliveryDetails.continueToPayment()

    const _paymentPage = new PaymentPage(page)
    await _paymentPage.activateDiscount()
    await _paymentPage.fillPaymentDetails(paymentDetails)
    await _paymentPage.completePayment()
    
    await page.pause()
})