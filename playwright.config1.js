// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig({   or 
const config = ({
  testDir: './tests',
  timeout: 40 * 1000,//40 sec
  expect: {
    timeout: 5 * 1000,
  },
  Worker:1, // it is used to run testcase in sequence else it will run in parallel
  reporter: 'html',
  retries:2,  //if test passes after second run then it is moved to flaky status
  //browser to be used here
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHttpsError: true,  // avoid hhtps error
        permissions: ['geolocation'],// allowing google location
        trace: 'retain-on-failure',// we can use on, it will give screenshots for every test(passed or failed)
        video: 'on',//'retain-on-failure',
        // viewport:{width:720,height:720},// used to check webresponsive like reducing screensize

      }
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on', // we can use on, it will give screenshots for every test(passed or failed)
        ...devices['iPhone 8 Plus'] // to test on mobile devices
      }
    }

  ],

});
module.exports = config  // to export to available for rest files

