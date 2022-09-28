/*!
 * wavesurfer.js mediasession plugin 6.0.4 (2022-09-28)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WaveSurfer", [], factory);
	else if(typeof exports === 'object')
		exports["WaveSurfer"] = factory();
	else
		root["WaveSurfer"] = root["WaveSurfer"] || {}, root["WaveSurfer"]["mediasession"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./src/plugin/mediasession/index.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaSessionPlugin)
/* harmony export */ });
/*global MediaMetadata*/

/**
 * @typedef {Object} MediaSessionPluginParams
 * @property {MediaMetadata} metadata A MediaMetadata object: a representation
 * of the metadata associated with a MediaSession that can be used by user agents
 * to provide a customized user interface.
 * @property {?boolean} deferInit Set to true to manually call
 * `initPlugin('mediasession')`
 */

/**
 * Visualize MediaSession information for a wavesurfer instance.
 *
 * @implements {PluginClass}
 * @extends {Observer}
 * @example
 * // es6
 * import MediaSessionPlugin from 'wavesurfer.mediasession.js';
 *
 * // commonjs
 * var MediaSessionPlugin = require('wavesurfer.mediasession.js');
 *
 * // if you are using <script> tags
 * var MediaSessionPlugin = window.WaveSurfer.mediasession;
 *
 * // ... initialising wavesurfer with the plugin
 * var wavesurfer = WaveSurfer.create({
 *   // wavesurfer options ...
 *   plugins: [
 *     MediaSessionPlugin.create({
 *       // plugin options ...
 *     })
 *   ]
 * });
 */
class MediaSessionPlugin {
  /**
   * MediaSession plugin definition factory
   *
   * This function must be used to create a plugin definition which can be
   * used by wavesurfer to correctly instantiate the plugin.
   *
   * @param  {MediaSessionPluginParams} params parameters use to initialise the plugin
   * @return {PluginDefinition} an object representing the plugin
   */
  static create(params) {
    return {
      name: 'mediasession',
      deferInit: params && params.deferInit ? params.deferInit : false,
      params: params,
      instance: MediaSessionPlugin
    };
  }

  constructor(params, ws) {
    this.params = params;
    this.wavesurfer = ws;

    if ('mediaSession' in navigator) {
      // update metadata
      this.metadata = this.params.metadata;
      this.update(); // update metadata when playback starts

      this.wavesurfer.on('play', () => {
        this.update();
      }); // set playback action handlers

      navigator.mediaSession.setActionHandler('play', () => {
        this.wavesurfer.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        this.wavesurfer.playPause();
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        this.wavesurfer.skipBackward();
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        this.wavesurfer.skipForward();
      });
    }
  }

  init() {}

  destroy() {}

  update() {
    if (typeof MediaMetadata === typeof Function) {
      // set metadata
      navigator.mediaSession.metadata = new MediaMetadata(this.metadata);
    }
  }

}
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=wavesurfer.mediasession.js.map