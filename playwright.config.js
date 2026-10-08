import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4198', trace: 'retain-on-failure' },
  webServer: process.env.HOME_URL ? undefined : { command: 'node scripts/serve.mjs', url: 'http://127.0.0.1:4198', env: { PORT: '4198' }, reuseExistingServer: false },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1100 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
});
