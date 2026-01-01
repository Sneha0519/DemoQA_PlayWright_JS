export class BooksPage {
    constructor(page) {
        this.page = page;
        this.searchBox = page.locator('#searchBox');
        this.logoutButton = page.locator('button:has-text("Log out")');
    }

    async navigate() {
        await this.page.goto('https://demoqa.com/books');
    }

    async searchBook(title) {
        await this.searchBox.fill(title);
        await this.page.waitForTimeout(1000);
    }

    async checkBookVisible(title) {
        let bookLink = this.page.locator('a:has-text("' + title + '")');
        return await bookLink.isVisible();
    }

    async getBookDetailsFromTable(title) {
        let row = this.page.locator('.rt-tr-group:has(a:has-text("' + title + '"))');
        await row.waitFor({ state: 'visible', timeout: 10000 });

        let bookTitle = await row.locator('.rt-td >> a').innerText();
        let author = await row.locator('.rt-td').nth(2).innerText();
        let publisher = await row.locator('.rt-td').nth(3).innerText();

        return { title: bookTitle, author: author, publisher: publisher };
    }
}
