/**
 * Copyright 2024 dianeakp
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

/**
 * `my-avatar`
 *
 * @demo index.html
 * @element my-avatar
 */
export class MyAvatar extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "my-avatar";
  }

  //html inputs

  constructor() {
    super();
    this.characterSettings = {
      seed: "1234567890",
      accessories: 0,
      base: 1,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 300, // Default character size
      name: "",
      fire: false,
      walking: false,
      circle: false,
      sunglasses: false,
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--my-avatar-label-font-size, var(--ddd-font-size-s));
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <div class="character">
        <rpg-character> </rpg-character>
      </div>
      <div class="sliders">
        <wired-slider></wired-slider>
      </div>
      <h3><span>${this.t.title}:</span> ${this.title}</h3>
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(MyAvatar.tag, MyAvatar);
