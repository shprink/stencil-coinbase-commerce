import { newE2EPage } from '@stencil/core/testing';

describe('cc-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cc-button></cc-button>');

    const element = await page.find('cc-button');
    expect(element).toHaveClass('hydrated');
  });
});
