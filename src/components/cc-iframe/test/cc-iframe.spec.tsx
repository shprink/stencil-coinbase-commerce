import { newSpecPage } from '@stencil/core/testing';
import { CcIframe } from '../cc-iframe';

describe('cc-iframe', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CcIframe],
      html: `<cc-iframe></cc-iframe>`,
    });
    expect(page.root).toEqualHtml(`
      <cc-iframe>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cc-iframe>
    `);
  });
});
