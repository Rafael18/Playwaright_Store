import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page

        this.firstNameInput = page.getByRole('textbox', { name: 'First name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name' })
        this.streetInput = page.getByRole('textbox', { name: 'Street' })
        this.postCodeInput = page.getByRole('textbox', { name: 'Post code' })
        this.cityInput = page.getByRole('textbox', { name: 'City' })
        this.contryInput = page.locator('[data-qa="country-dropdown"]')
        this.saveDetailsButton = page.locator('[data-qa="save-address-button"]')
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)

        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(userAddress.lastName)

        await this.streetInput.waitFor()
        await this.streetInput.fill(userAddress.stret)

        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(userAddress.postcode)

        await this.cityInput.waitFor()
        await this.cityInput.fill(userAddress.city)

        await this.contryInput.waitFor()
        await this.contryInput.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeButtonSaving = await this.savedAddressContainer.count()
        await this.saveDetailsButton.waitFor()
        await this.saveDetailsButton.click()
        await this.savedAddressContainer.waitFor()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeButtonSaving + 1)
        await this.savedAddressContainer.click()
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    } 
}