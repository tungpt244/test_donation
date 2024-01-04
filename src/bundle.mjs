'use strict'

import puppeteer from 'puppeteer'

export const useDonation = async ({ _site, _name, _message, _loop }) => {
  if (!_site) return { success: false, message: 'điền hộ cái site vào' }
  if (!_name) return { success: false, message: 'điền hộ cái name vào' }
  if (!_message) return { success: false, message: 'điền hộ cái message vào' }
  if (!_loop) return { success: false, message: 'điền hộ cái loop vào' }
  if (Number(_loop) > 8) {
    return { success: false, message: 'loop ít thôi, cpu 100%' }
  }

  // Navigate the page to a URL
  const loop = async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer
      .launch({
        headless: true,
        args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
        executablePath:
          process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
      })
      .catch(error => {
        console.log(error)
      })

    const page = await browser.newPage()
    await page.goto(_site || 'https://j97.tungpt.me/', {
      waitUntil: 'networkidle0',
    })

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 })

    const name = await page.waitForSelector('form.donation-form input')

    const message = await page.waitForSelector('form.donation-form textarea')

    const donate = await page.waitForSelector("form.donation-form label[for='donation-2']")

    const button = await page.waitForSelector('form.donation-form button')

    await name?.type(_name || 'Tung')
    await message?.type(_message || 'I love you')

    await donate?.click()

    await button?.click()

    const email = await page.waitForXPath('//*[@id="app"]/div[2]/div/div[2]/form/div/div[1]/div[2]/div/div/input')

    await email?.type('hongphambk@gmail.com')

    const select = await page.waitForXPath('//*[@id="app"]/div[2]/div/div[2]/form/div/div[2]/div/ul/li[2]')

    await select?.click()

    const sgb = await page.waitForXPath(
      '//*[@id="app"]/div[2]/div/div[2]/form/div/div[2]/div/ul/li[2]/div/div/div[22]/button'
    )

    await sgb?.click()

    const button2 = await page.waitForXPath('//*[@id="app"]/div[2]/div/div[2]/form/div/div[3]/button[1]')

    await button2?.click()

    const bankNumber = await page.waitForXPath('//*[@id="card_number"]')

    await bankNumber?.type('9704000000000001')

    const bankName = await page.waitForXPath('//*[@id="card_name"]')

    await bankName?.type('Tung Pham')

    const bankDate = await page.waitForXPath('//*[@id="card_date"]')

    await bankDate?.type('12/22')

    const button3 = await page.waitForXPath('//*[@id="btn-submit"]')

    await button3?.click()

    const otp = await page.waitForXPath('//*[@id="otp"]')

    await otp?.type('123456')

    const button4 = await page.waitForXPath('//*[@id="btn-submit"]')

    await button4?.click()

    await page.waitForNavigation()

    await browser.close()
  }

  if (_loop) {
    await Promise.all(
      [...Array(_loop ?? 1)].map(async () => {
        await loop()
      })
    )
  } else {
    await loop()
  }

  return {
    success: true,
  }
}
