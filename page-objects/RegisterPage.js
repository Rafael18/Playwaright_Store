export class RegisterPage {
    constructor(page) {
        this.page = page

        this.emailInput = page.getByRole('textbox', { name: 'e-mail' })
        this.passwordInput= page.getByRole('textbox', { name: 'password' })
        this.registerButton = page.getByRole('button', { name: 'register' })
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}