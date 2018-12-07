/* global browser */
/* global describe */
/* global it */
const surflineConfig = require('../../config/surfline.config');

const SIGNIN_URL = 'https://www.surfline.com/sign-in?redirectUrl=https%3A%2F%2Fwww.surfline.com';
const EMAIL = surflineConfig.email;
const PASSWORD = surflineConfig.password;

describe('Sign in', () => {
    it('should have the right title - and sign in', () => {
    // Visit sign in page
        browser.url(SIGNIN_URL);
        console.log(browser.getTitle());

        // Enter credentials
        browser.element('#email').setValue(EMAIL);
        browser.element('#password').setValue(PASSWORD);
        browser.click('.quiver-button');

        browser.pause(2000);

        const { urls } = surflineConfig;

        const snapshotTime = new Date().getTime();
        Object.keys(urls).forEach((surfSpot) => {
            const surfSpotUrl = urls[surfSpot];
            browser.url(surfSpotUrl);

            browser.waitForVisible('.sl-forecast-header__main__title', 2000);
            console.log(browser.getTitle());
            browser.saveDocumentScreenshot(`./snapshots/${snapshotTime}/snapshot-${surfSpot}-${snapshotTime}.png`);
        });


        // Get some data from surf report

        // Save screenshot to file
        // browser.saveDocumentScreenshot(`./snapshots/snapshot-cardiff-${new Date().getTime()}.png`);

        // Get HTML
        // http://webdriver.io/api/property/getHTML.html
        // var outerHTML = browser.getHTML('#test');

        // Get cookies
        // http://webdriver.io/api/cookie/getCookie.html
        // var allCookies = browser.getCookie()

        // Debug time
        // browser.pause(10000); // 10 seconds
    });
});
