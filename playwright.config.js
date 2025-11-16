// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

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
  reporter:'html',
  //browser to be used here
  use: {
    browserName: 'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
  },

});
module.exports=config  // to export to available for rest files

