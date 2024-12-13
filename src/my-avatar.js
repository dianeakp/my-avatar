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
    this.link = window.location.href;
    this.characterSettings = {
      seed: "0000000000",
      accessories: 0,
      base: 0,
      leg: 0,
      face: 0,
      faceItem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 300, // Default character size
      hatColor: 0,
      hat: "bunny",
      name: "",
      fire: false,
      walking: false,
      circle: false,
      sunglasses: false,
    };

    if (window.location.search) {
      this._initializeParameters();
    }

    // this._applySeedToSettings(); //for concistency
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      seed: { type: String },
      link: { type: String },
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
          padding: 15px;
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
        .shareLink {
          padding: 8px;
          border-radius: 8px;
          border: none;
          background-color: var(--ddd-theme-default-creekTeal);
          box-shadow: none;
          font-family: var(--ddd-font-primary);
          font-size: 13px;
          display: inline-block;
        }

        .twitter-share-button {
        }

        .bottom-bar {
          background-color: var(--ddd-theme-default-creekLight);
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          content: center;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .sliderbox {
            padding: 15px;
            border-radius: 8px;
            background-color: var(--ddd-theme-default-limestoneGray);
          }
          wired-item {
            color: var(--ddd-theme-default-limestoneGray);
          }
        }
        @media only screen and (max-width: 768px) {
          .wrapper {
            /* background-color: lightblue; */
            overflow: scroll;
          }
          .characterbox {
            padding: 30px;
          }
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
            literalseed
            accessories="${this.characterSettings.accessories}"
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceItem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            hatColor="${this.characterSettings.hatColor}"
            hat="${this.characterSettings.hat}"
            ?fire="${this.characterSettings.fire}"
            ?walking="${this.characterSettings.walking}"
            ?circle="${this.characterSettings.circle}"
            style="height: ${this.characterSettings.size}px; width: ${this
              .characterSettings.size}px;"
          >
          </rpg-character>
          <br />
          <br />
          <br />
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
              <wired-item value="0" role="option" class="wired-rendered"
                >Male</wired-item
              >
              <wired-item value="1" role="option" class="wired-rendered"
                >Female</wired-item
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
              value="${this.characterSettings.accessories}"
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
              value="${this.characterSettings.faceItem}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("faceItem", parseInt(e.detail.value))}"
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
              value="${this.characterSettings.hatColor}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("hatColor", parseInt(e.detail.value))}"
            ></wired-slider>
          </div>
          <br />
          <div class="singleInput">
            <label>Hat</label>
            <wired-combo
              selected="${this.characterSettings.hat}"
              @selected="${(e) =>
                this._updateSetting("hat", e.detail.selected)}"
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
              <wired-item
                value="watermelon"
                role="option"
                class="wired-rendered"
                >Watermelon</wired-item
              >
            </wired-combo>
          </div>
          <br />
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
          <br />
          <br />
          <div class="bottom-bar">
            <button class="shareLink" @click="${this._generateShareLink}">
              Share Link
            </button>
            <a
              class="shareLink"
              href="https://twitter.com/intent/tweet?text=Hey!%20Look%20at%20my%20super%20cool%20character:%20${this
                .link}"
              target="_blank"
            >
              Post on Twitter</a
            >

            <a
              class="shareLink"
              href="https://www.linkedin.com/sharing/share-offsite/?url=${this
                .link}"
              target="_blank"
            >
              Post on LinkedIn
            </a>

            <a
              class="shareLink"
              href="https://www.facebook.com/sharer/sharer.php?u=${this.link}"
              target="_blank"
            >
              Share on Facebook
            </a>
          </div>
        </div>

        <slot></slot>
      </div>
      <div>
        copy({ targets: [ { src: 'node_modules/@haxtheweb/simple-icon/lib/svgs',
        dest: 'public', }, { src:
        'node_modules/@haxtheweb/hax-iconset/lib/svgs', dest: 'public', }, ],
        }),
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
      this.characterSettings.leg,
      this.characterSettings.face,
      this.characterSettings.faceItem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ];
    console.log("attributes", attributes);
    this.characterSettings.seed = attributes.join("");
    console.log(this.characterSettings.seed);

    this.link = `${location.origin}${location.pathname}?seed=${this.characterSettings.seed}&hat=${this.characterSettings.hat}&fire=${this.characterSettings.fire}&walking=${this.characterSettings.walking}&circle=${this.characterSettings.circle}&size=${this.characterSettings.size}`;
  }

  _generateShareLink() {
    navigator.clipboard.writeText(this.link);
    alert("Link copied to clipboard!");
  }

  _initializeParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get("fire"));

    let fire, walking, circle;

    if (urlParams.get("fire") == "true") {
      fire = true;
    } else {
      fire = false;
    }

    if (urlParams.get("walking") == "true") {
      walking = true;
    } else {
      walking = false;
    }

    if (urlParams.get("circle") == "true") {
      circle = true;
    } else {
      circle = false;
    }

    let seedString = urlParams.get("seed");
    let seedArray = seedString.split("");
    this.characterSettings = {
      seed: urlParams.get("seed") || "0000000000",
      accessories: seedArray[0] || 0,
      base: seedArray[1] || 0,
      leg: 0,
      face: seedArray[3] || 0,
      faceItem: seedArray[4] || 0,
      hair: seedArray[5] || 0,
      pants: seedArray[6] || 0,
      shirt: seedArray[7] || 0,
      skin: seedArray[8] || 0,
      hatColor: seedArray[9] || 0,
      hat: urlParams.get("hat") || "bunny",
      fire: fire || false,
      walking: walking || false,
      circle: circle || false,
      size: urlParams.get("size") || 300,
    };
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
