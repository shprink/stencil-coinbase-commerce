import { newE2EPage } from '@stencil/core/testing';

describe('cc-iframe', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cc-iframe></cc-iframe>');

    const element = await page.find('cc-iframe');
    expect(element).toHaveClass('hydrated');
  });
});
