import { newSpecPage } from '@stencil/core/testing';
import { CcButton } from '../cc-button';

describe('cc-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CcButton],
      html: `<cc-button></cc-button>`,
    });
    expect(page.root).toEqualHtml(`
      <cc-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cc-button>
    `);
  });
});
