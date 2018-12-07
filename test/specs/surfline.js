var assert = require('assert')
var surflineConfig = require('../../config/surfline.config')

const URL = 'https://www.surfline.com/sign-in?redirectUrl=https%3A%2F%2Fwww.surfline.com'
const EMAIL = surflineConfig.email
const PASSWORD = surflineConfig.password

describe('Sign in', function() {
  it('should have the right title - and sign in', function() {
    // Visit sign in page
    browser.url(URL)
    console.log(browser.getTitle())

    // Enter credentials
    browser.element('#email').setValue(EMAIL)
    browser.element('#password').setValue(PASSWORD)
    browser.click('.quiver-button')
    browser.pause(5000) // 5 seconds

    // Search for Cardiff Reef Overview
    browser.element('.quiver-new-navigation-bar__search__wrapper__input').setValue('Cardiff Reef Overview')
    browser.keys("\uE007")
    browser.waitForVisible('span.result__name > highlight', 5000)

    // Click the Cardiff Reef Overview
    browser.click('span.result__name > highlight')
    browser.waitForVisible('.quiver-surf-height', 5000)

    // Get some data from surf report
    console.log(browser.getTitle())

    // Save screenshot to file
    browser.saveDocumentScreenshot('./snapshot.png');

    // Get HTML
    //http://webdriver.io/api/property/getHTML.html
    //var outerHTML = browser.getHTML('#test');

    // Get cookies
    //http://webdriver.io/api/cookie/getCookie.html
    //var allCookies = browser.getCookie()

    // Debug time
    browser.pause(10000) // 10 seconds
  })
})
