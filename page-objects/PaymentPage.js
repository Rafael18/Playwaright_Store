import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activeDescountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.credCardInput = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.cardValid = page.locator('[data-qa="valid-until"]')
        this.cardCVC = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code =await this.discountCode.innerText()
        await this.discountInput.waitFor()
        // Opção 1 inputs com delay: modo rápido
        await this.discountInput.fill(code)
        await expect(await this.discountInput).toHaveValue(code)

        // opção 2 inputs com delay: modo lento
        // await this.discountInput.focus()
        // await this.page.keyboard.type(code, { delay: 1000 })
        // await expect(await this.discountInput.inputValue()).toBe(code)

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage).not.toBeVisible()

        await this.activeDescountButton.waitFor()
        await this.activeDescountButton.click()

        await this.discountActiveMessage.waitFor()

        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText() // "757$"
        const discountValueOnlyNumber = discountValueText.replace("$","")
        const discountValueNumber = parseInt(discountValueOnlyNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() // "757$"
        const totalValueOnlyNumber = totalValueText.replace("$","")
        const totalValueNumber = parseInt(totalValueOnlyNumber, 10)
        // Check that the discounted price total is smaller than the regular one
        expect(discountValueNumber).toBeLessThan(totalValueNumber)

    }

    fillPaymentDetails = async (paymentDetails) => {
        await this.credCardInput.waitFor()
        await this.credCardInput.fill(paymentDetails.creditCard)

        await this.cardNumber.waitFor()
        await this.cardNumber.fill(paymentDetails.cardNumber)
        
        await this.cardValid.waitFor()
        await this.cardValid.fill(paymentDetails.cardValid)
        
        await this.cardCVC.waitFor()
        await this.cardCVC.fill(paymentDetails.cardCVC)
        
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
}