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
      seed: "01000100030",
      accessories: 0,
      base: 1,
      leg: 0,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 300, // Default character size
      hatcolor: 0,
      hat: "none",
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
      characterSettings: { type: Object },
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
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
        .characterbox {
          flex: 1;
          min-width: 300px;
          text-align: center;
        }
        .sliderbox {
          flex: 1;
          min-width: 300px;
          text-align: left;
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
      <div class="characterbox">
        <rpg-character
          seed="${this.characterSettings.seed}"
          accessories="${this.characterSettings.accessories}"
          base="${this.characterSettings.base}"
          face="${this.characterSettings.face}"
          faceitem="${this.characterSettings.sunglasses ? 1 : 0}"
          hair="${this.characterSettings.hair}"
          pants="${this.characterSettings.pants}"
          shirt="${this.characterSettings.shirt}"
          skin="${this.characterSettings.skin}"
          hat="${this.characterSettings.hat}"
          hatcolor="${this.characterSettings.hatcolor}"
          ?fire="${this.characterSettings.fire}"
          ?walking="${this.characterSettings.walking}"
          ?circle="${this.characterSettings.circle}"
          style="height: ${this.characterSettings.size}px; width: ${this
            .characterSettings.size}px;"
        >
        </rpg-character>
      </div>

      <div class="sliderbox">
        <div class="singleInput">
          <label>Accessories</label>
          <wired-slider
            value="${this.characterSettings.size}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("accessories", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Base Gender</label>
          <!--  DO THIS! **1 or 5 (Male 0-4, Female 5-9) , make into drop down box-->
          <wired-slider
            value="${this.characterSettings.size}"
            min="0"
            max="1"
            @change="${(e) =>
              this._updateSetting("base", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Leg*</label>
          <!-- DO THIS!***(ignored, set to 0 and disable / hide input) -->
          <wired-slider
            value="${this.characterSettings.leg}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("leg", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Face</label>
          <wired-slider
            value="${this.characterSettings.face}"
            min="0"
            max="5"
            @change="${(e) =>
              this._updateSetting("face", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Face item*</label>
          <!-- ***FIX, DOESN'T WORK -->
          <wired-slider
            value="${this.characterSettings.hair}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("faceitem", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Hair Color</label>
          <wired-slider
            value="${this.characterSettings.hair}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("hair", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Pants</label>
          <wired-slider
            value="${this.characterSettings.pants}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("pants", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Shirt</label>
          <wired-slider
            value="${this.characterSettings.shirt}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("shirt", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Skin Color</label>
          <wired-slider
            value="${this.characterSettings.skin}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("skin", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>Hat Color</label>
          <wired-slider
            value="${this.characterSettings.hatcolor}"
            min="0"
            max="9"
            @change="${(e) =>
              this._updateSetting("hatcolor", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

        <div class="singleInput">
          <label>character size</label>
          <wired-slider
            value="${this.characterSettings.size}"
            min="100"
            max="400"
            @change="${(e) =>
              this._updateSetting("size", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>
      </div>

      <slot></slot>
    </div>`;
  }

  _updateSetting(key, value) {
    if (key === "accessories" && isNaN(value)) {
      value = 0;
    }
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._updateSeed();
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
