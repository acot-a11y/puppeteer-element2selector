import { element2selector, Options } from '../';

beforeAll(async () => {
  await page.goto('http://localhost:1234/simple');
});

test.each<[string, Options | undefined]>([
  ['h1', undefined],
  ['article:nth-of-type(2) > section > h2', undefined],
  ['.blog1 p:nth-of-type(3)', undefined],
  ['#note', undefined],
  ['#note', { seedMinLength: 2 }],
])('simple - %s - %p', async (input, options) => {
  const element = await page.$(input);
  expect(await element2selector(element!, options)).toMatchSnapshot();
});
