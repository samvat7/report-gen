const puppeteer = require('puppeteer');

module.exports = async function capturePageAsBase64(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        // Take a screenshot of the page and get it as a Buffer
        const screenshotBuffer = await page.screenshot();

        // Convert the Buffer to a base64 string
        const screenshotBase64 = screenshotBuffer.toString('base64');

        console.log("screenshotBase64: ", screenshotBase64);

        await browser.close();
        return `data:image/png;base64,${screenshotBase64}`;
    } catch (error) {
        console.error('Error capturing page as base64 image:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
