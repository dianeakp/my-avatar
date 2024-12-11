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
    const url = new URLSearchParams(window.location.search);
    this.characterSettings = {
      seed: "0100000000",
      accessories: 0,
      base: 0,
      leg: "",
      face: 0,
      faceItem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 300, // Default character size
      hatcolor: 0,
      hat: "bunny",
      name: "",
      fire: false,
      walking: false,
      circle: false,
      sunglasses: false,
    };

    // this._applySeedToSettings(); //for concistency
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      seed: { type: String },
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
          color: light-dark(#333b3c, #efefec);
          background-color: light-dark(#efedea, #223a2c);
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
          color: light-dark(#333b3c, #efefec);
          background-color: light-dark(#efedea, #223a2c);
        }

        h3 span {
          font-size: var(--my-avatar-label-font-size, var(--ddd-font-size-s));
        }

        .singleInput {
          padding: 0.5px;
        }

        .sizer {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <div class="characterbox">
        <div class="seed-display">Seed: ${this.characterSettings.seed}</div>

        <rpg-character
          seed="${this.characterSettings.seed}"
          accessories="${this.characterSettings.accessories}"
          base="${this.characterSettings.base}"
          face="${this.characterSettings.face}"
          faceitem="${this.characterSettings.faceitem}"
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
        <button class="shareLink" @click="${this._generateShareLink}">
          Share Link
        </button>
      </div>

      <div class="sliderbox">
        <div class="singleInput">
          <label>Gender</label>
          <wired-combo
            selected="${this.characterSettings.base}"
            @selected="${(e) =>
              this._updateSetting("base", parseInt(e.detail.selected))}"
            role="combobox"
            aria-haspopup="listbox"
            tabindex="0"
            class="wired-rendered"
            aria-expanded="false"
          >
            <wired-item value="1" role="option" class="wired-rendered"
              >Female</wired-item
            >
            <wired-item value="0" role="option" class="wired-rendered"
              >Male</wired-item
            >
          </wired-combo>
        </div>

        <div class="sizer">
          <label>Size</label>
          <wired-slider
            value="${this.characterSettings.size}"
            min="100"
            max="400"
            @change="${(e) =>
              this._updateSetting("size", parseInt(e.detail.value))}"
          ></wired-slider>
        </div>

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
          <label>Face item</label>
          <!-- ***FIX, DOESN'T WORK -->
          <wired-slider
            value="${this.characterSettings.faceitem}"
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
          <label>Hat</label>
          <wired-combo
            selected="${this.characterSettings.hat}"
            @selected="${(e) => this._updateSetting("hat", e.detail.selected)}"
            role="combobox"
            aria-haspopup="listbox"
            tabindex="0"
            class="wired-rendered"
            aria-expanded="false"
          >
            <wired-item value="none" role="option" class="wired-rendered"
              >None</wired-item
            >
            <wired-item value="bunny" role="option" class="wired-rendered"
              >Bunny</wired-item
            >
            <wired-item value="coffee" role="option" class="wired-rendered"
              >Coffee</wired-item
            >
            <wired-item
              value="construction"
              role="option"
              class="wired-rendered"
              >Construction</wired-item
            >
            <wired-item value="cowboy" role="option" class="wired-rendered"
              >Cowboy</wired-item
            >
            <wired-item value="education" role="option" class="wired-rendered"
              >Education</wired-item
            >
            <wired-item value="knight" role="option" class="wired-rendered"
              >Knight</wired-item
            >
            <wired-item value="ninja" role="option" class="wired-rendered"
              >Ninja</wired-item
            >
            <wired-item value="party" role="option" class="wired-rendered"
              >Party</wired-item
            >
            <wired-item value="pirate" role="option" class="wired-rendered"
              >Pirate</wired-item
            >
            <wired-item value="watermelon" role="option" class="wired-rendered"
              >Watermelon</wired-item
            >
          </wired-combo>
        </div>

        <wired-checkbox
          ?checked="${this.characterSettings.fire}"
          @change="${(e) => this._updateSetting("fire", e.detail.checked)}"
          >On Fire</wired-checkbox
        >
        <wired-checkbox
          ?checked="${this.characterSettings.walking}"
          @change="${(e) => this._updateSetting("walking", e.detail.checked)}"
          >Walking</wired-checkbox
        >
        <wired-checkbox
          ?checked="${this.characterSettings.circle}"
          @change="${(e) => this._updateSetting("circle", e.detail.checked)}"
          >Circle</wired-checkbox
        >
      </div>

      <slot></slot>
    </div>`;
  }

  _updateSetting(key, value) {
    console.log("update");
    console.log(key, value);

    console.log(this.characterSettings.seed);
    console.log("base", this.characterSettings.base);

    // this.characterSettings.seed = `${this.characterSettings.base}${this.characterSettings.accessories}0${this.characterSettings.face}${this.characterSettings.faceitem}${this.characterSettings.hair}${this.characterSettings.pants}${this.characterSettings.shirt}${this.characterSettings.skin}${this.characterSettings.hatcolor}`;
    this.characterSettings = { ...this.characterSettings, [key]: value };
    this._generateSeed();
    // this.requestUpdate();
  }

  _generateSeed() {
    const attributes = [
      this.characterSettings.accessories,
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatcolor,
    ];
    this.characterSettings.seed = attributes.join("");
    console.log(this.characterSettings.seed);
  }

  _generateShareLink() {
    const link = `${location.origin}${location.pathname}?seed=${this.seed}&hat=${this.hat}&fire=${this.fire}&walking=${this.walking}&circle=${this.circle}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  }

  _applySeedToSettings() {
    console.log("apply");
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));

    [
      this.characterSettings.accessories,
      this.characterSettings.base,
      this.characterSettings.leg,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;

    // this.requestUpdate(); // Ensure UI updates after applying settings
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
