/* global browser */
/* global describe */
/* global it */
const surflineConfig = require('../../config/surfline.config');

const SIGNIN_URL = 'https://www.surfline.com/sign-in?redirectUrl=https%3A%2F%2Fwww.surfline.com';
const EMAIL = surflineConfig.email;
const PASSWORD = surflineConfig.password;

const urls = {
    cardiff: 'https://www.surfline.com/surf-report/cardiff-reef-overview/5842041f4e65fad6a77088b1',
    '15th-street': 'https://www.surfline.com/surf-report/15th-st-/5842041f4e65fad6a77088af',
    swamis: 'https://www.surfline.com/surf-report/swami-s/5842041f4e65fad6a77088b4',
    'north-san-diego': 'https://www.surfline.com/surf-forecasts/north-san-diego/58581a836630e24c44878fd7',
    'south-san-diego': 'https://www.surfline.com/surf-forecasts/south-san-diego/58581a836630e24c4487900d'
};

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

        const snapshotTime = new Date().getTime();
        Object.keys(urls).forEach((surfSpot) => {
            const surfSpotUrl = urls[surfSpot];
            browser.url(surfSpotUrl);

            browser.waitForVisible('.sl-forecast-header__main__title', 2000);
            console.log(browser.getTitle());
            browser.saveDocumentScreenshot(`./snapshots/${snapshotTime}/snapshot-${surfSpot}-${snapshotTime}.png`);
        });

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
