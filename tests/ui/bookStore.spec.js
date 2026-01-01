import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BooksPage } from '../../pages/BooksPage';
import fs from 'fs';
import path from 'path';

test.describe('Book Store Application', () => {
    let loginPage;
    let booksPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        booksPage = new BooksPage(page);
    });

    test('Login and Validate User Session', async ({ page }) => {
        const username = process.env.DEMOQA_USERNAME;
        const password = process.env.DEMOQA_PASSWORD;

        if (!username || !password) {
            test.skip('Skipping test because DEMOQA_USERNAME or DEMOQA_PASSWORD is not set');
            return;
        }

        // Navigate to Login Page
        await loginPage.navigate();

        // Login
        await loginPage.login(username, password);
        const loggedInUser = await loginPage.getLoggedInUsername();
        expect(loggedInUser).toBe(username);

        await expect(loginPage.logoutButton).toBeVisible();

        await loginPage.logout();
    });

    test('Search Book and Print Details', async ({ page }) => {
        const username = process.env.DEMOQA_USERNAME;
        const password = process.env.DEMOQA_PASSWORD;
        const bookTitle = "Learning JavaScript Design Patterns";

        if (!username || !password) {
            test.skip('Skipping test because DEMOQA_USERNAME or DEMOQA_PASSWORD is not set');
            return;
        }

        await loginPage.navigate();
        await loginPage.login(username, password);

        await booksPage.navigate();

        await booksPage.searchBook(bookTitle);

        const isBookVisible = await booksPage.checkBookVisible(bookTitle);
        expect(isBookVisible).toBeTruthy();

        const details = await booksPage.getBookDetailsFromTable(bookTitle);
        const outputContent = `Title: ${details.title}\nAuthor: ${details.author}\nPublisher: ${details.publisher}\n`;
        
        const outputPath = path.resolve(__dirname, '../../book-details.txt');
        fs.writeFileSync(outputPath, outputContent);
        console.log(`Book details written to ${outputPath}`);

        await booksPage.logoutButton.first().click();
    });
});
