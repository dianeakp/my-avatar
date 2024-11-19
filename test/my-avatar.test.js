import { html, fixture, expect } from '@open-wc/testing';
import "../my-avatar.js";

describe("MyAvatar test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <my-avatar
        title="title"
      ></my-avatar>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
