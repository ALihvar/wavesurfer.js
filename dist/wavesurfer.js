/*!
 * wavesurfer.js 6.0.4 (2022-09-28)
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
		root["WaveSurfer"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/drawer.canvasentry.js":
/*!***********************************!*\
  !*** ./src/drawer.canvasentry.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CanvasEntry)
/* harmony export */ });
/* harmony import */ var _util_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/style */ "./src/util/style.js");
/* harmony import */ var _util_get_id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/get-id */ "./src/util/get-id.js");
/**
 * @since 3.0.0
 */


/**
 * The `CanvasEntry` class represents an element consisting of a wave `canvas`
 * and an (optional) progress wave `canvas`.
 *
 * The `MultiCanvas` renderer uses one or more `CanvasEntry` instances to
 * render a waveform, depending on the zoom level.
 */

class CanvasEntry {
  constructor() {
    /**
     * The wave node
     *
     * @type {HTMLCanvasElement}
     */
    this.wave = null;
    /**
     * The wave canvas rendering context
     *
     * @type {CanvasRenderingContext2D}
     */

    this.waveCtx = null;
    /**
     * The (optional) progress wave node
     *
     * @type {HTMLCanvasElement}
     */

    this.progress = null;
    /**
     * The (optional) progress wave canvas rendering context
     *
     * @type {CanvasRenderingContext2D}
     */

    this.progressCtx = null;
    /**
     * Start of the area the canvas should render, between 0 and 1
     *
     * @type {number}
     */

    this.start = 0;
    /**
     * End of the area the canvas should render, between 0 and 1
     *
     * @type {number}
     */

    this.end = 1;
    /**
     * Unique identifier for this entry
     *
     * @type {string}
     */

    this.id = (0,_util_get_id__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof this.constructor.name !== 'undefined' ? this.constructor.name.toLowerCase() + '_' : 'canvasentry_');
    /**
     * Canvas 2d context attributes
     *
     * @type {object}
     */

    this.canvasContextAttributes = {};
  }
  /**
   * Store the wave canvas element and create the 2D rendering context
   *
   * @param {HTMLCanvasElement} element The wave `canvas` element.
   */


  initWave(element) {
    this.wave = element;
    this.waveCtx = this.wave.getContext('2d', this.canvasContextAttributes);
  }
  /**
   * Store the progress wave canvas element and create the 2D rendering
   * context
   *
   * @param {HTMLCanvasElement} element The progress wave `canvas` element.
   */


  initProgress(element) {
    this.progress = element;
    this.progressCtx = this.progress.getContext('2d', this.canvasContextAttributes);
  }
  /**
   * Update the dimensions
   *
   * @param {number} elementWidth Width of the entry
   * @param {number} totalWidth Total width of the multi canvas renderer
   * @param {number} width The new width of the element
   * @param {number} height The new height of the element
   */


  updateDimensions(elementWidth, totalWidth, width, height) {
    // where the canvas starts and ends in the waveform, represented as a
    // decimal between 0 and 1
    this.start = this.wave.offsetLeft / totalWidth || 0;
    this.end = this.start + elementWidth / totalWidth; // set wave canvas dimensions

    this.wave.width = width;
    this.wave.height = height;
    let elementSize = {
      width: elementWidth + 'px'
    };
    (0,_util_style__WEBPACK_IMPORTED_MODULE_0__["default"])(this.wave, elementSize);

    if (this.hasProgressCanvas) {
      // set progress canvas dimensions
      this.progress.width = width;
      this.progress.height = height;
      (0,_util_style__WEBPACK_IMPORTED_MODULE_0__["default"])(this.progress, elementSize);
    }
  }
  /**
   * Clear the wave and progress rendering contexts
   */


  clearWave() {
    // wave
    this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height); // progress

    if (this.hasProgressCanvas) {
      this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);
    }
  }
  /**
   * Set the fill styles for wave and progress
   * @param {string|string[]} waveColor Fill color for the wave canvas,
   * or an array of colors to apply as a gradient
   * @param {?string|string[]} progressColor Fill color for the progress canvas,
   * or an array of colors to apply as a gradient
   */


  setFillStyles(waveColor, progressColor) {
    this.waveCtx.fillStyle = this.getFillStyle(this.waveCtx, waveColor);

    if (this.hasProgressCanvas) {
      this.progressCtx.fillStyle = this.getFillStyle(this.progressCtx, progressColor);
    }
  }
  /**
   * Utility function to handle wave color arguments
   *
   * When the color argument type is a string or CanvasGradient instance,
   * it will be returned as is. Otherwise, it will be treated as an array,
   * and a new CanvasGradient will be returned
   *
   * @since 6.0.0
   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
   * @param {string|string[]|CanvasGradient} color Either a single fill color
   *     for the wave canvas, an existing CanvasGradient instance, or an array
   *     of colors to apply as a gradient
   * @returns {string|CanvasGradient} Returns a string fillstyle value, or a
   *     canvas gradient
   */


  getFillStyle(ctx, color) {
    if (typeof color == 'string' || color instanceof CanvasGradient) {
      return color;
    }

    const waveGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    color.forEach((value, index) => waveGradient.addColorStop(index / color.length, value));
    return waveGradient;
  }
  /**
   * Set the canvas transforms for wave and progress
   *
   * @param {boolean} vertical Whether to render vertically
   */


  applyCanvasTransforms(vertical) {
    if (vertical) {
      // Reflect the waveform across the line y = -x
      this.waveCtx.setTransform(0, 1, 1, 0, 0, 0);

      if (this.hasProgressCanvas) {
        this.progressCtx.setTransform(0, 1, 1, 0, 0, 0);
      }
    }
  }
  /**
   * Draw a rectangle for wave and progress
   *
   * @param {number} x X start position
   * @param {number} y Y start position
   * @param {number} width Width of the rectangle
   * @param {number} height Height of the rectangle
   * @param {number} radius Radius of the rectangle
   */


  fillRects(x, y, width, height, radius) {
    this.fillRectToContext(this.waveCtx, x, y, width, height, radius);

    if (this.hasProgressCanvas) {
      this.fillRectToContext(this.progressCtx, x, y, width, height, radius);
    }
  }
  /**
   * Draw the actual rectangle on a `canvas` element
   *
   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
   * @param {number} x X start position
   * @param {number} y Y start position
   * @param {number} width Width of the rectangle
   * @param {number} height Height of the rectangle
   * @param {number} radius Radius of the rectangle
   */


  fillRectToContext(ctx, x, y, width, height, radius) {
    if (!ctx) {
      return;
    }

    if (radius) {
      this.drawRoundedRect(ctx, x, y, width, height, radius);
    } else {
      ctx.fillRect(x, y, width, height);
    }
  }
  /**
   * Draw a rounded rectangle on Canvas
   *
   * @param {CanvasRenderingContext2D} ctx Canvas context
   * @param {number} x X-position of the rectangle
   * @param {number} y Y-position of the rectangle
   * @param {number} width Width of the rectangle
   * @param {number} height Height of the rectangle
   * @param {number} radius Radius of the rectangle
   *
   * @return {void}
   * @example drawRoundedRect(ctx, 50, 50, 5, 10, 3)
   */


  drawRoundedRect(ctx, x, y, width, height, radius) {
    if (height === 0) {
      return;
    } // peaks are float values from -1 to 1. Use absolute height values in
    // order to correctly calculate rounded rectangle coordinates


    if (height < 0) {
      height *= -1;
      y -= height;
    }

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }
  /**
   * Render the actual wave and progress lines
   *
   * @param {number[]} peaks Array with peaks data
   * @param {number} absmax Maximum peak value (absolute)
   * @param {number} halfH Half the height of the waveform
   * @param {number} offsetY Offset to the top
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that
   * should be rendered
   */


  drawLines(peaks, absmax, halfH, offsetY, start, end) {
    this.drawLineToContext(this.waveCtx, peaks, absmax, halfH, offsetY, start, end);

    if (this.hasProgressCanvas) {
      this.drawLineToContext(this.progressCtx, peaks, absmax, halfH, offsetY, start, end);
    }
  }
  /**
   * Render the actual waveform line on a `canvas` element
   *
   * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas
   * @param {number[]} peaks Array with peaks data
   * @param {number} absmax Maximum peak value (absolute)
   * @param {number} halfH Half the height of the waveform
   * @param {number} offsetY Offset to the top
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that
   * should be rendered
   */


  drawLineToContext(ctx, peaks, absmax, halfH, offsetY, start, end) {
    if (!ctx) {
      return;
    }

    const length = peaks.length / 2;
    const first = Math.round(length * this.start); // use one more peak value to make sure we join peaks at ends -- unless,
    // of course, this is the last canvas

    const last = Math.round(length * this.end) + 1;
    const canvasStart = first;
    const canvasEnd = last;
    const scale = this.wave.width / (canvasEnd - canvasStart - 1); // optimization

    const halfOffset = halfH + offsetY;
    const absmaxHalf = absmax / halfH;
    ctx.beginPath();
    ctx.moveTo((canvasStart - first) * scale, halfOffset);
    ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf));
    let i, peak, h;

    for (i = canvasStart; i < canvasEnd; i++) {
      peak = peaks[2 * i] || 0;
      h = Math.round(peak / absmaxHalf);
      ctx.lineTo((i - first) * scale + this.halfPixel, halfOffset - h);
    } // draw the bottom edge going backwards, to make a single
    // closed hull to fill


    let j = canvasEnd - 1;

    for (j; j >= canvasStart; j--) {
      peak = peaks[2 * j + 1] || 0;
      h = Math.round(peak / absmaxHalf);
      ctx.lineTo((j - first) * scale + this.halfPixel, halfOffset - h);
    }

    ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf));
    ctx.closePath();
    ctx.fill();
  }
  /**
   * Destroys this entry
   */


  destroy() {
    this.waveCtx = null;
    this.wave = null;
    this.progressCtx = null;
    this.progress = null;
  }
  /**
   * Return image data of the wave `canvas` element
   *
   * When using a `type` of `'blob'`, this will return a `Promise` that
   * resolves with a `Blob` instance.
   *
   * @param {string} format='image/png' An optional value of a format type.
   * @param {number} quality=0.92 An optional value between 0 and 1.
   * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
   * @return {string|Promise} When using the default `'dataURL'` `type` this
   * returns a data URL. When using the `'blob'` `type` this returns a
   * `Promise` that resolves with a `Blob` instance.
   */


  getImage(format, quality, type) {
    if (type === 'blob') {
      return new Promise(resolve => {
        this.wave.toBlob(resolve, format, quality);
      });
    } else if (type === 'dataURL') {
      return this.wave.toDataURL(format, quality);
    }
  }

}

/***/ }),

/***/ "./src/drawer.js":
/*!***********************!*\
  !*** ./src/drawer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Drawer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util/index.js");

/**
 * Parent class for renderers
 *
 * @extends {Observer}
 */

class Drawer extends _util__WEBPACK_IMPORTED_MODULE_0__.Observer {
  /**
   * @param {HTMLElement} container The container node of the wavesurfer instance
   * @param {WavesurferParams} params The wavesurfer initialisation options
   */
  constructor(container, params) {
    super();
    this.container = _util__WEBPACK_IMPORTED_MODULE_0__.withOrientation(container, params.vertical);
    /**
     * @type {WavesurferParams}
     */

    this.params = params;
    /**
     * The width of the renderer
     * @type {number}
     */

    this.width = 0;
    /**
     * The height of the renderer
     * @type {number}
     */

    this.height = params.height * this.params.pixelRatio;
    this.lastPos = 0;
    /**
     * The `<wave>` element which is added to the container
     * @type {HTMLElement}
     */

    this.wrapper = null;
  }
  /**
   * Alias of `util.style`
   *
   * @param {HTMLElement} el The element that the styles will be applied to
   * @param {Object} styles The map of propName: attribute, both are used as-is
   * @return {HTMLElement} el
   */


  style(el, styles) {
    return _util__WEBPACK_IMPORTED_MODULE_0__.style(el, styles);
  }
  /**
   * Create the wrapper `<wave>` element, style it and set up the events for
   * interaction
   */


  createWrapper() {
    this.wrapper = _util__WEBPACK_IMPORTED_MODULE_0__.withOrientation(this.container.appendChild(document.createElement('wave')), this.params.vertical);
    this.style(this.wrapper, {
      display: 'block',
      position: 'relative',
      userSelect: 'none',
      webkitUserSelect: 'none',
      height: this.params.height + 'px'
    });

    if (this.params.fillParent || this.params.scrollParent) {
      this.style(this.wrapper, {
        width: '100%',
        cursor: this.params.hideCursor ? 'none' : 'auto',
        overflowX: this.params.hideScrollbar ? 'hidden' : 'auto',
        overflowY: 'hidden'
      });
    }

    this.setupWrapperEvents();
  }
  /**
   * Handle click event
   *
   * @param {Event} e Click event
   * @param {?boolean} noPrevent Set to true to not call `e.preventDefault()`
   * @return {number} Playback position from 0 to 1
   */


  handleEvent(e, noPrevent) {
    !noPrevent && e.preventDefault();
    const clientX = _util__WEBPACK_IMPORTED_MODULE_0__.withOrientation(e.targetTouches ? e.targetTouches[0] : e, this.params.vertical).clientX;
    const bbox = this.wrapper.getBoundingClientRect();
    const nominalWidth = this.width;
    const parentWidth = this.getWidth();
    const progressPixels = this.getProgressPixels(bbox, clientX);
    let progress;

    if (!this.params.fillParent && nominalWidth < parentWidth) {
      progress = progressPixels * (this.params.pixelRatio / nominalWidth) || 0;
    } else {
      progress = (progressPixels + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;
    }

    return _util__WEBPACK_IMPORTED_MODULE_0__.clamp(progress, 0, 1);
  }

  getProgressPixels(wrapperBbox, clientX) {
    if (this.params.rtl) {
      return wrapperBbox.right - clientX;
    } else {
      return clientX - wrapperBbox.left;
    }
  }

  setupWrapperEvents() {
    this.wrapper.addEventListener('click', e => {
      const orientedEvent = _util__WEBPACK_IMPORTED_MODULE_0__.withOrientation(e, this.params.vertical);
      const scrollbarHeight = this.wrapper.offsetHeight - this.wrapper.clientHeight;

      if (scrollbarHeight !== 0) {
        // scrollbar is visible.  Check if click was on it
        const bbox = this.wrapper.getBoundingClientRect();

        if (orientedEvent.clientY >= bbox.bottom - scrollbarHeight) {
          // ignore mousedown as it was on the scrollbar
          return;
        }
      }

      if (this.params.interact) {
        this.fireEvent('click', e, this.handleEvent(e));
      }
    });
    this.wrapper.addEventListener('dblclick', e => {
      if (this.params.interact) {
        this.fireEvent('dblclick', e, this.handleEvent(e));
      }
    });
    this.wrapper.addEventListener('scroll', e => this.fireEvent('scroll', e));
  }
  /**
   * Draw peaks on the canvas
   *
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
   * for split channel rendering
   * @param {number} length The width of the area that should be drawn
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that should be
   * rendered
   */


  drawPeaks(peaks, length, start, end) {
    if (!this.setWidth(length)) {
      this.clearWave();
    }

    this.params.barWidth ? this.drawBars(peaks, 0, start, end) : this.drawWave(peaks, 0, start, end);
  }
  /**
   * Scroll to the beginning
   */


  resetScroll() {
    if (this.wrapper !== null) {
      this.wrapper.scrollLeft = 0;
    }
  }
  /**
   * Recenter the view-port at a certain percent of the waveform
   *
   * @param {number} percent Value from 0 to 1 on the waveform
   */


  recenter(percent) {
    const position = this.wrapper.scrollWidth * percent;
    this.recenterOnPosition(position, true);
  }
  /**
   * Recenter the view-port on a position, either scroll there immediately or
   * in steps of 5 pixels
   *
   * @param {number} position X-offset in pixels
   * @param {boolean} immediate Set to true to immediately scroll somewhere
   */


  recenterOnPosition(position, immediate) {
    const scrollLeft = this.wrapper.scrollLeft;
    const half = ~~(this.wrapper.clientWidth / 2);
    const maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
    let target = position - half;
    let offset = target - scrollLeft;

    if (maxScroll == 0) {
      // no need to continue if scrollbar is not there
      return;
    } // if the cursor is currently visible...


    if (!immediate && -half <= offset && offset < half) {
      // set rate at which waveform is centered
      let rate = this.params.autoCenterRate; // make rate depend on width of view and length of waveform

      rate /= half;
      rate *= maxScroll;
      offset = Math.max(-rate, Math.min(rate, offset));
      target = scrollLeft + offset;
    } // limit target to valid range (0 to maxScroll)


    target = Math.max(0, Math.min(maxScroll, target)); // no use attempting to scroll if we're not moving

    if (target != scrollLeft) {
      this.wrapper.scrollLeft = target;
    }
  }
  /**
   * Get the current scroll position in pixels
   *
   * @return {number} Horizontal scroll position in pixels
   */


  getScrollX() {
    let x = 0;

    if (this.wrapper) {
      const pixelRatio = this.params.pixelRatio;
      x = Math.round(this.wrapper.scrollLeft * pixelRatio); // In cases of elastic scroll (safari with mouse wheel) you can
      // scroll beyond the limits of the container
      // Calculate and floor the scrollable extent to make sure an out
      // of bounds value is not returned
      // Ticket #1312

      if (this.params.scrollParent) {
        const maxScroll = ~~(this.wrapper.scrollWidth * pixelRatio - this.getWidth());
        x = Math.min(maxScroll, Math.max(0, x));
      }
    }

    return x;
  }
  /**
   * Get the width of the container
   *
   * @return {number} The width of the container
   */


  getWidth() {
    return Math.round(this.container.clientWidth * this.params.pixelRatio);
  }
  /**
   * Set the width of the container
   *
   * @param {number} width The new width of the container
   * @return {boolean} Whether the width of the container was updated or not
   */


  setWidth(width) {
    if (this.width == width) {
      return false;
    }

    this.width = width;

    if (this.params.fillParent || this.params.scrollParent) {
      this.style(this.wrapper, {
        width: ''
      });
    } else {
      const newWidth = ~~(this.width / this.params.pixelRatio) + 'px';
      this.style(this.wrapper, {
        width: newWidth
      });
    }

    this.updateSize();
    return true;
  }
  /**
   * Set the height of the container
   *
   * @param {number} height The new height of the container.
   * @return {boolean} Whether the height of the container was updated or not
   */


  setHeight(height) {
    if (height == this.height) {
      return false;
    }

    this.height = height;
    this.style(this.wrapper, {
      height: ~~(this.height / this.params.pixelRatio) + 'px'
    });
    this.updateSize();
    return true;
  }
  /**
   * Called by wavesurfer when progress should be rendered
   *
   * @param {number} progress From 0 to 1
   */


  progress(progress) {
    const minPxDelta = 1 / this.params.pixelRatio;
    const pos = Math.round(progress * this.width) * minPxDelta;

    if (pos < this.lastPos || pos - this.lastPos >= minPxDelta) {
      this.lastPos = pos;

      if (this.params.scrollParent && this.params.autoCenter) {
        const newPos = ~~(this.wrapper.scrollWidth * progress);
        this.recenterOnPosition(newPos, this.params.autoCenterImmediately);
      }

      this.updateProgress(pos);
    }
  }
  /**
   * This is called when wavesurfer is destroyed
   */


  destroy() {
    this.unAll();

    if (this.wrapper) {
      if (this.wrapper.parentNode == this.container.domElement) {
        this.container.removeChild(this.wrapper.domElement);
      }

      this.wrapper = null;
    }
  }
  /* Renderer-specific methods */

  /**
   * Called after cursor related params have changed.
   *
   * @abstract
   */


  updateCursor() {}
  /**
   * Called when the size of the container changes so the renderer can adjust
   *
   * @abstract
   */


  updateSize() {}
  /**
   * Draw a waveform with bars
   *
   * @abstract
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
   * rendering
   * @param {number} channelIndex The index of the current channel. Normally
   * should be 0
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that should be
   * rendered
   */


  drawBars(peaks, channelIndex, start, end) {}
  /**
   * Draw a waveform
   *
   * @abstract
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel
   * rendering
   * @param {number} channelIndex The index of the current channel. Normally
   * should be 0
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that should be
   * rendered
   */


  drawWave(peaks, channelIndex, start, end) {}
  /**
   * Clear the waveform
   *
   * @abstract
   */


  clearWave() {}
  /**
   * Render the new progress
   *
   * @abstract
   * @param {number} position X-Offset of progress position in pixels
   */


  updateProgress(position) {}

}

/***/ }),

/***/ "./src/drawer.multicanvas.js":
/*!***********************************!*\
  !*** ./src/drawer.multicanvas.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MultiCanvas)
/* harmony export */ });
/* harmony import */ var _drawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawer */ "./src/drawer.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
/* harmony import */ var _drawer_canvasentry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drawer.canvasentry */ "./src/drawer.canvasentry.js");



/**
 * MultiCanvas renderer for wavesurfer. Is currently the default and sole
 * builtin renderer.
 *
 * A `MultiCanvas` consists of one or more `CanvasEntry` instances, depending
 * on the zoom level.
 */

class MultiCanvas extends _drawer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * @param {HTMLElement} container The container node of the wavesurfer instance
   * @param {WavesurferParams} params The wavesurfer initialisation options
   */
  constructor(container, params) {
    super(container, params);
    /**
     * @type {number}
     */

    this.maxCanvasWidth = params.maxCanvasWidth;
    /**
     * @type {number}
     */

    this.maxCanvasElementWidth = Math.round(params.maxCanvasWidth / params.pixelRatio);
    /**
     * Whether or not the progress wave is rendered. If the `waveColor`
     * and `progressColor` are the same color it is not.
     *
     * @type {boolean}
     */

    this.hasProgressCanvas = params.waveColor != params.progressColor;
    /**
     * @type {number}
     */

    this.halfPixel = 0.5 / params.pixelRatio;
    /**
     * List of `CanvasEntry` instances.
     *
     * @type {Array}
     */

    this.canvases = [];
    /**
     * @type {HTMLElement}
     */

    this.progressWave = null;
    /**
     * Class used to generate entries.
     *
     * @type {function}
     */

    this.EntryClass = _drawer_canvasentry__WEBPACK_IMPORTED_MODULE_2__["default"];
    /**
     * Canvas 2d context attributes.
     *
     * @type {object}
     */

    this.canvasContextAttributes = params.drawingContextAttributes;
    /**
     * Overlap added between entries to prevent vertical white stripes
     * between `canvas` elements.
     *
     * @type {number}
     */

    this.overlap = 2 * Math.ceil(params.pixelRatio / 2);
    /**
     * The radius of the wave bars. Makes bars rounded
     *
     * @type {number}
     */

    this.barRadius = params.barRadius || 0;
    /**
     * Whether to render the waveform vertically. Defaults to false.
     *
     * @type {boolean}
     */

    this.vertical = params.vertical;
  }
  /**
   * Initialize the drawer
   */


  init() {
    this.createWrapper();
    this.createElements();
  }
  /**
   * Create the canvas elements and style them
   *
   */


  createElements() {
    this.progressWave = _util__WEBPACK_IMPORTED_MODULE_1__.withOrientation(this.wrapper.appendChild(document.createElement('wave')), this.params.vertical);
    this.style(this.progressWave, {
      position: 'absolute',
      zIndex: 3,
      left: 0,
      top: 0,
      bottom: 0,
      overflow: 'hidden',
      width: '0',
      display: 'none',
      boxSizing: 'border-box',
      borderRightStyle: 'solid',
      pointerEvents: 'none'
    });
    this.addCanvas();
    this.updateCursor();
  }
  /**
   * Update cursor style
   */


  updateCursor() {
    this.style(this.progressWave, {
      borderRightWidth: this.params.cursorWidth + 'px',
      borderRightColor: this.params.cursorColor
    });
  }
  /**
   * Adjust to the updated size by adding or removing canvases
   */


  updateSize() {
    const totalWidth = Math.round(this.width / this.params.pixelRatio);
    const requiredCanvases = Math.ceil(totalWidth / (this.maxCanvasElementWidth + this.overlap)); // add required canvases

    while (this.canvases.length < requiredCanvases) {
      this.addCanvas();
    } // remove older existing canvases, if any


    while (this.canvases.length > requiredCanvases) {
      this.removeCanvas();
    }

    let canvasWidth = this.maxCanvasWidth + this.overlap;
    const lastCanvas = this.canvases.length - 1;
    this.canvases.forEach((entry, i) => {
      if (i == lastCanvas) {
        canvasWidth = this.width - this.maxCanvasWidth * lastCanvas;
      }

      this.updateDimensions(entry, canvasWidth, this.height);
      entry.clearWave();
    });
  }
  /**
   * Add a canvas to the canvas list
   *
   */


  addCanvas() {
    const entry = new this.EntryClass();
    entry.canvasContextAttributes = this.canvasContextAttributes;
    entry.hasProgressCanvas = this.hasProgressCanvas;
    entry.halfPixel = this.halfPixel;
    const leftOffset = this.maxCanvasElementWidth * this.canvases.length; // wave

    let wave = _util__WEBPACK_IMPORTED_MODULE_1__.withOrientation(this.wrapper.appendChild(document.createElement('canvas')), this.params.vertical);
    this.style(wave, {
      position: 'absolute',
      zIndex: 2,
      left: leftOffset + 'px',
      top: 0,
      bottom: 0,
      height: '100%',
      pointerEvents: 'none'
    });
    entry.initWave(wave); // progress

    if (this.hasProgressCanvas) {
      let progress = _util__WEBPACK_IMPORTED_MODULE_1__.withOrientation(this.progressWave.appendChild(document.createElement('canvas')), this.params.vertical);
      this.style(progress, {
        position: 'absolute',
        left: leftOffset + 'px',
        top: 0,
        bottom: 0,
        height: '100%'
      });
      entry.initProgress(progress);
    }

    this.canvases.push(entry);
  }
  /**
   * Pop single canvas from the list
   *
   */


  removeCanvas() {
    let lastEntry = this.canvases[this.canvases.length - 1]; // wave

    lastEntry.wave.parentElement.removeChild(lastEntry.wave.domElement); // progress

    if (this.hasProgressCanvas) {
      lastEntry.progress.parentElement.removeChild(lastEntry.progress.domElement);
    } // cleanup


    if (lastEntry) {
      lastEntry.destroy();
      lastEntry = null;
    }

    this.canvases.pop();
  }
  /**
   * Update the dimensions of a canvas element
   *
   * @param {CanvasEntry} entry Target entry
   * @param {number} width The new width of the element
   * @param {number} height The new height of the element
   */


  updateDimensions(entry, width, height) {
    const elementWidth = Math.round(width / this.params.pixelRatio);
    const totalWidth = Math.round(this.width / this.params.pixelRatio); // update canvas dimensions

    entry.updateDimensions(elementWidth, totalWidth, width, height); // style element

    this.style(this.progressWave, {
      display: 'block'
    });
  }
  /**
   * Clear the whole multi-canvas
   */


  clearWave() {
    _util__WEBPACK_IMPORTED_MODULE_1__.frame(() => {
      this.canvases.forEach(entry => entry.clearWave());
    })();
  }
  /**
   * Draw a waveform with bars
   *
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
   * for split channel rendering
   * @param {number} channelIndex The index of the current channel. Normally
   * should be 0. Must be an integer.
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that should be
   * rendered
   * @returns {void}
   */


  drawBars(peaks, channelIndex, start, end) {
    return this.prepareDraw(peaks, channelIndex, start, end, ({
      absmax,
      hasMinVals,
      height,
      offsetY,
      halfH,
      peaks,
      channelIndex: ch
    }) => {
      // if drawBars was called within ws.empty we don't pass a start and
      // don't want anything to happen
      if (start === undefined) {
        return;
      } // Skip every other value if there are negatives.


      const peakIndexScale = hasMinVals ? 2 : 1;
      const length = peaks.length / peakIndexScale;
      const bar = this.params.barWidth * this.params.pixelRatio;
      const gap = this.params.barGap === null ? Math.max(this.params.pixelRatio, ~~(bar / 2)) : Math.max(this.params.pixelRatio, this.params.barGap * this.params.pixelRatio);
      const step = bar + gap;
      const scale = length / this.width;
      const first = start;
      const last = end;
      let peakIndex = first;

      for (peakIndex; peakIndex < last; peakIndex += step) {
        // search for the highest peak in the range this bar falls into
        let peak = 0;
        let peakIndexRange = Math.floor(peakIndex * scale) * peakIndexScale; // start index

        const peakIndexEnd = Math.floor((peakIndex + step) * scale) * peakIndexScale;

        do {
          // do..while makes sure at least one peak is always evaluated
          const newPeak = Math.abs(peaks[peakIndexRange]); // for arrays starting with negative values

          if (newPeak > peak) {
            peak = newPeak; // higher
          }

          peakIndexRange += peakIndexScale; // skip every other value for negatives
        } while (peakIndexRange < peakIndexEnd); // calculate the height of this bar according to the highest peak found


        let h = Math.round(peak / absmax * halfH); // in case of silences, allow the user to specify that we
        // always draw *something* (normally a 1px high bar)

        if (h == 0 && this.params.barMinHeight) {
          h = this.params.barMinHeight;
        }

        this.fillRect(peakIndex + this.halfPixel, halfH - h + offsetY, bar + this.halfPixel, h * 2, this.barRadius, ch);
      }
    });
  }
  /**
   * Draw a waveform
   *
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays
   * for split channel rendering
   * @param {number} channelIndex The index of the current channel. Normally
   * should be 0
   * @param {number?} start The x-offset of the beginning of the area that
   * should be rendered (If this isn't set only a flat line is rendered)
   * @param {number?} end The x-offset of the end of the area that should be
   * rendered
   * @returns {void}
   */


  drawWave(peaks, channelIndex, start, end) {
    return this.prepareDraw(peaks, channelIndex, start, end, ({
      absmax,
      hasMinVals,
      height,
      offsetY,
      halfH,
      peaks,
      channelIndex
    }) => {
      if (!hasMinVals) {
        const reflectedPeaks = [];
        const len = peaks.length;
        let i = 0;

        for (i; i < len; i++) {
          reflectedPeaks[2 * i] = peaks[i];
          reflectedPeaks[2 * i + 1] = -peaks[i];
        }

        peaks = reflectedPeaks;
      } // if drawWave was called within ws.empty we don't pass a start and
      // end and simply want a flat line


      if (start !== undefined) {
        this.drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex);
      } // always draw a median line


      this.fillRect(0, halfH + offsetY - this.halfPixel, this.width, this.halfPixel, this.barRadius, channelIndex);
    });
  }
  /**
   * Tell the canvas entries to render their portion of the waveform
   *
   * @param {number[]} peaks Peaks data
   * @param {number} absmax Maximum peak value (absolute)
   * @param {number} halfH Half the height of the waveform
   * @param {number} offsetY Offset to the top
   * @param {number} start The x-offset of the beginning of the area that
   * should be rendered
   * @param {number} end The x-offset of the end of the area that
   * should be rendered
   * @param {channelIndex} channelIndex The channel index of the line drawn
   */


  drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex) {
    const {
      waveColor,
      progressColor
    } = this.params.splitChannelsOptions.channelColors[channelIndex] || {};
    this.canvases.forEach((entry, i) => {
      this.setFillStyles(entry, waveColor, progressColor);
      this.applyCanvasTransforms(entry, this.params.vertical);
      entry.drawLines(peaks, absmax, halfH, offsetY, start, end);
    });
  }
  /**
   * Draw a rectangle on the multi-canvas
   *
   * @param {number} x X-position of the rectangle
   * @param {number} y Y-position of the rectangle
   * @param {number} width Width of the rectangle
   * @param {number} height Height of the rectangle
   * @param {number} radius Radius of the rectangle
   * @param {channelIndex} channelIndex The channel index of the bar drawn
   */


  fillRect(x, y, width, height, radius, channelIndex) {
    const startCanvas = Math.floor(x / this.maxCanvasWidth);
    const endCanvas = Math.min(Math.ceil((x + width) / this.maxCanvasWidth) + 1, this.canvases.length);
    let i = startCanvas;

    for (i; i < endCanvas; i++) {
      const entry = this.canvases[i];
      const leftOffset = i * this.maxCanvasWidth;
      const intersection = {
        x1: Math.max(x, i * this.maxCanvasWidth),
        y1: y,
        x2: Math.min(x + width, i * this.maxCanvasWidth + entry.wave.width),
        y2: y + height
      };

      if (intersection.x1 < intersection.x2) {
        const {
          waveColor,
          progressColor
        } = this.params.splitChannelsOptions.channelColors[channelIndex] || {};
        this.setFillStyles(entry, waveColor, progressColor);
        this.applyCanvasTransforms(entry, this.params.vertical);
        entry.fillRects(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1, radius);
      }
    }
  }
  /**
   * Returns whether to hide the channel from being drawn based on params.
   *
   * @param {number} channelIndex The index of the current channel.
   * @returns {bool} True to hide the channel, false to draw.
   */


  hideChannel(channelIndex) {
    return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(channelIndex);
  }
  /**
   * Performs preparation tasks and calculations which are shared by `drawBars`
   * and `drawWave`
   *
   * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for
   * split channel rendering
   * @param {number} channelIndex The index of the current channel. Normally
   * should be 0
   * @param {number?} start The x-offset of the beginning of the area that
   * should be rendered. If this isn't set only a flat line is rendered
   * @param {number?} end The x-offset of the end of the area that should be
   * rendered
   * @param {function} fn The render function to call, e.g. `drawWave`
   * @param {number} drawIndex The index of the current channel after filtering.
   * @param {number?} normalizedMax Maximum modulation value across channels for use with relativeNormalization. Ignored when undefined
   * @returns {void}
   */


  prepareDraw(peaks, channelIndex, start, end, fn, drawIndex, normalizedMax) {
    return _util__WEBPACK_IMPORTED_MODULE_1__.frame(() => {
      // Split channels and call this function with the channelIndex set
      if (peaks[0] instanceof Array) {
        const channels = peaks;

        if (this.params.splitChannels) {
          const filteredChannels = channels.filter((c, i) => !this.hideChannel(i));

          if (!this.params.splitChannelsOptions.overlay) {
            this.setHeight(Math.max(filteredChannels.length, 1) * this.params.height * this.params.pixelRatio);
          }

          let overallAbsMax;

          if (this.params.splitChannelsOptions && this.params.splitChannelsOptions.relativeNormalization) {
            // calculate maximum peak across channels to use for normalization
            overallAbsMax = _util__WEBPACK_IMPORTED_MODULE_1__.max(channels.map(channelPeaks => _util__WEBPACK_IMPORTED_MODULE_1__.absMax(channelPeaks)));
          }

          return channels.forEach((channelPeaks, i) => this.prepareDraw(channelPeaks, i, start, end, fn, filteredChannels.indexOf(channelPeaks), overallAbsMax));
        }

        peaks = channels[0];
      } // Return and do not draw channel peaks if hidden.


      if (this.hideChannel(channelIndex)) {
        return;
      } // calculate maximum modulation value, either from the barHeight
      // parameter or if normalize=true from the largest value in the peak
      // set


      let absmax = 1 / this.params.barHeight;

      if (this.params.normalize) {
        absmax = normalizedMax === undefined ? _util__WEBPACK_IMPORTED_MODULE_1__.absMax(peaks) : normalizedMax;
      } // Bar wave draws the bottom only as a reflection of the top,
      // so we don't need negative values


      const hasMinVals = [].some.call(peaks, val => val < 0);
      const height = this.params.height * this.params.pixelRatio;
      const halfH = height / 2;
      let offsetY = height * drawIndex || 0; // Override offsetY if overlay is true

      if (this.params.splitChannelsOptions && this.params.splitChannelsOptions.overlay) {
        offsetY = 0;
      }

      return fn({
        absmax: absmax,
        hasMinVals: hasMinVals,
        height: height,
        offsetY: offsetY,
        halfH: halfH,
        peaks: peaks,
        channelIndex: channelIndex
      });
    })();
  }
  /**
   * Set the fill styles for a certain entry (wave and progress)
   *
   * @param {CanvasEntry} entry Target entry
   * @param {string} waveColor Wave color to draw this entry
   * @param {string} progressColor Progress color to draw this entry
   */


  setFillStyles(entry, waveColor = this.params.waveColor, progressColor = this.params.progressColor) {
    entry.setFillStyles(waveColor, progressColor);
  }
  /**
   * Set the canvas transforms for a certain entry (wave and progress)
   *
   * @param {CanvasEntry} entry Target entry
   * @param {boolean} vertical Whether to render the waveform vertically
   */


  applyCanvasTransforms(entry, vertical = false) {
    entry.applyCanvasTransforms(vertical);
  }
  /**
   * Return image data of the multi-canvas
   *
   * When using a `type` of `'blob'`, this will return a `Promise`.
   *
   * @param {string} format='image/png' An optional value of a format type.
   * @param {number} quality=0.92 An optional value between 0 and 1.
   * @param {string} type='dataURL' Either 'dataURL' or 'blob'.
   * @return {string|string[]|Promise} When using the default `'dataURL'`
   * `type` this returns a single data URL or an array of data URLs,
   * one for each canvas. When using the `'blob'` `type` this returns a
   * `Promise` that resolves with an array of `Blob` instances, one for each
   * canvas.
   */


  getImage(format, quality, type) {
    if (type === 'blob') {
      return Promise.all(this.canvases.map(entry => {
        return entry.getImage(format, quality, type);
      }));
    } else if (type === 'dataURL') {
      let images = this.canvases.map(entry => entry.getImage(format, quality, type));
      return images.length > 1 ? images : images[0];
    }
  }
  /**
   * Render the new progress
   *
   * @param {number} position X-offset of progress position in pixels
   */


  updateProgress(position) {
    this.style(this.progressWave, {
      width: position + 'px'
    });
  }

}

/***/ }),

/***/ "./src/mediaelement-webaudio.js":
/*!**************************************!*\
  !*** ./src/mediaelement-webaudio.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaElementWebAudio)
/* harmony export */ });
/* harmony import */ var _mediaelement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mediaelement */ "./src/mediaelement.js");

/**
 * MediaElementWebAudio backend: load audio via an HTML5 audio tag, but playback with the WebAudio API.
 * The advantage here is that the html5 <audio> tag can perform range requests on the server and not
 * buffer the entire file in one request, and you still get the filtering and scripting functionality
 * of the webaudio API.
 * Note that in order to use range requests and prevent buffering, you must provide peak data.
 *
 * @since 3.2.0
 */

class MediaElementWebAudio extends _mediaelement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Construct the backend
   *
   * @param {WavesurferParams} params Wavesurfer parameters
   */
  constructor(params) {
    super(params);
    /** @private */

    this.params = params;
    /** @private */

    this.sourceMediaElement = null;
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  init() {
    this.setPlaybackRate(this.params.audioRate);
    this.createTimer();
    this.createVolumeNode();
    this.createScriptNode();
    this.createAnalyserNode();
  }
  /**
   * Private method called by both `load` (from url)
   * and `loadElt` (existing media element) methods.
   *
   * @param {HTMLMediaElement} media HTML5 Audio or Video element
   * @param {number[]|Number.<Array[]>} peaks Array of peak data
   * @param {string} preload HTML 5 preload attribute value
   * @private
   */


  _load(media, peaks, preload) {
    super._load(media, peaks, preload);

    this.createMediaElementSource(media);
  }
  /**
   * Create MediaElementSource node
   *
   * @since 3.2.0
   * @param {HTMLMediaElement} mediaElement HTML5 Audio to load
   */


  createMediaElementSource(mediaElement) {
    this.sourceMediaElement = this.ac.createMediaElementSource(mediaElement);
    this.sourceMediaElement.connect(this.analyser);
  }

  play(start, end) {
    this.resumeAudioContext();
    return super.play(start, end);
  }
  /**
   * This is called when wavesurfer is destroyed
   *
   */


  destroy() {
    super.destroy();
    this.destroyWebAudio();
  }

}

/***/ }),

/***/ "./src/mediaelement.js":
/*!*****************************!*\
  !*** ./src/mediaelement.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaElement)
/* harmony export */ });
/* harmony import */ var _webaudio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webaudio */ "./src/webaudio.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util/index.js");


/**
 * MediaElement backend
 */

class MediaElement extends _webaudio__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Construct the backend
   *
   * @param {WavesurferParams} params Wavesurfer parameters
   */
  constructor(params) {
    super(params);
    /** @private */

    this.params = params;
    /**
     * Initially a dummy media element to catch errors. Once `_load` is
     * called, this will contain the actual `HTMLMediaElement`.
     * @private
     */

    this.media = {
      currentTime: 0,
      duration: 0,
      paused: true,
      playbackRate: 1,

      play() {},

      pause() {},

      volume: 0
    };
    /** @private */

    this.mediaType = params.mediaType.toLowerCase();
    /** @private */

    this.elementPosition = params.elementPosition;
    /** @private */

    this.peaks = null;
    /** @private */

    this.playbackRate = 1;
    /** @private */

    this.volume = 1;
    /** @private */

    this.isMuted = false;
    /** @private */

    this.buffer = null;
    /** @private */

    this.onPlayEnd = null;
    /** @private */

    this.mediaListeners = {};
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  init() {
    this.setPlaybackRate(this.params.audioRate);
    this.createTimer();
  }
  /**
   * Attach event listeners to media element.
   */


  _setupMediaListeners() {
    this.mediaListeners.error = () => {
      this.fireEvent('error', 'Error loading media element');
    };

    this.mediaListeners.canplay = () => {
      this.fireEvent('canplay');
    };

    this.mediaListeners.ended = () => {
      this.fireEvent('finish');
    }; // listen to and relay play, pause and seeked events to enable
    // playback control from the external media element


    this.mediaListeners.play = () => {
      this.fireEvent('play');
    };

    this.mediaListeners.pause = () => {
      this.fireEvent('pause');
    };

    this.mediaListeners.seeked = event => {
      this.fireEvent('seek');
    };

    this.mediaListeners.volumechange = event => {
      this.isMuted = this.media.muted;

      if (this.isMuted) {
        this.volume = 0;
      } else {
        this.volume = this.media.volume;
      }

      this.fireEvent('volume');
    }; // reset event listeners


    Object.keys(this.mediaListeners).forEach(id => {
      this.media.removeEventListener(id, this.mediaListeners[id]);
      this.media.addEventListener(id, this.mediaListeners[id]);
    });
  }
  /**
   * Create a timer to provide a more precise `audioprocess` event.
   */


  createTimer() {
    const onAudioProcess = () => {
      if (this.isPaused()) {
        return;
      }

      this.fireEvent('audioprocess', this.getCurrentTime()); // Call again in the next frame

      _util__WEBPACK_IMPORTED_MODULE_1__.frame(onAudioProcess)();
    };

    this.on('play', onAudioProcess); // Update the progress one more time to prevent it from being stuck in
    // case of lower framerates

    this.on('pause', () => {
      this.fireEvent('audioprocess', this.getCurrentTime());
    });
  }
  /**
   * Create media element with url as its source,
   * and append to container element.
   *
   * @param {string} url Path to media file
   * @param {HTMLElement} container HTML element
   * @param {number[]|Number.<Array[]>} peaks Array of peak data
   * @param {string} preload HTML 5 preload attribute value
   * @throws Will throw an error if the `url` argument is not a valid media
   * element.
   */


  load(url, container, peaks, preload) {
    const media = document.createElement(this.mediaType);
    media.controls = this.params.mediaControls;
    media.autoplay = this.params.autoplay || false;
    media.preload = preload == null ? 'auto' : preload;
    media.src = url;
    media.style.width = '100%';
    const prevMedia = container.querySelector(this.mediaType);

    if (prevMedia) {
      container.removeChild(prevMedia);
    }

    container.appendChild(media);

    this._load(media, peaks, preload);
  }
  /**
   * Load existing media element.
   *
   * @param {HTMLMediaElement} elt HTML5 Audio or Video element
   * @param {number[]|Number.<Array[]>} peaks Array of peak data
   */


  loadElt(elt, peaks) {
    elt.controls = this.params.mediaControls;
    elt.autoplay = this.params.autoplay || false;

    this._load(elt, peaks, elt.preload);
  }
  /**
   * Method called by both `load` (from url)
   * and `loadElt` (existing media element) methods.
   *
   * @param {HTMLMediaElement} media HTML5 Audio or Video element
   * @param {number[]|Number.<Array[]>} peaks Array of peak data
   * @param {string} preload HTML 5 preload attribute value
   * @throws Will throw an error if the `media` argument is not a valid media
   * element.
   * @private
   */


  _load(media, peaks, preload) {
    // verify media element is valid
    if (!(media instanceof HTMLMediaElement) || typeof media.addEventListener === 'undefined') {
      throw new Error('media parameter is not a valid media element');
    } // load must be called manually on iOS, otherwise peaks won't draw
    // until a user interaction triggers load --> 'ready' event
    //
    // note that we avoid calling media.load here when given peaks and preload == 'none'
    // as this almost always triggers some browser fetch of the media.


    if (typeof media.load == 'function' && !(peaks && preload == 'none')) {
      // Resets the media element and restarts the media resource. Any
      // pending events are discarded. How much media data is fetched is
      // still affected by the preload attribute.
      media.load();
    }

    this.media = media;

    this._setupMediaListeners();

    this.peaks = peaks;
    this.onPlayEnd = null;
    this.buffer = null;
    this.isMuted = media.muted;
    this.setPlaybackRate(this.playbackRate);
    this.setVolume(this.volume);
  }
  /**
   * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
   *
   * @return {boolean} Media paused or not
   */


  isPaused() {
    return !this.media || this.media.paused;
  }
  /**
   * Used by `wavesurfer.getDuration()`
   *
   * @return {number} Duration
   */


  getDuration() {
    if (this.explicitDuration) {
      return this.explicitDuration;
    }

    let duration = (this.buffer || this.media).duration;

    if (duration >= Infinity) {
      // streaming audio
      duration = this.media.seekable.end(0);
    }

    return duration;
  }
  /**
   * Returns the current time in seconds relative to the audio-clip's
   * duration.
   *
   * @return {number} Current time
   */


  getCurrentTime() {
    return this.media && this.media.currentTime;
  }
  /**
   * Get the position from 0 to 1
   *
   * @return {number} Current position
   */


  getPlayedPercents() {
    return this.getCurrentTime() / this.getDuration() || 0;
  }
  /**
   * Get the audio source playback rate.
   *
   * @return {number} Playback rate
   */


  getPlaybackRate() {
    return this.playbackRate || this.media.playbackRate;
  }
  /**
   * Set the audio source playback rate.
   *
   * @param {number} value Playback rate
   */


  setPlaybackRate(value) {
    this.playbackRate = value || 1;
    this.media.playbackRate = this.playbackRate;
  }
  /**
   * Used by `wavesurfer.seekTo()`
   *
   * @param {number} start Position to start at in seconds
   */


  seekTo(start) {
    if (start != null && !isNaN(start)) {
      this.media.currentTime = start;
    }

    this.clearPlayEnd();
  }
  /**
   * Plays the loaded audio region.
   *
   * @param {number} start Start offset in seconds, relative to the beginning
   * of a clip.
   * @param {number} end When to stop, relative to the beginning of a clip.
   * @emits MediaElement#play
   * @return {Promise} Result
   */


  play(start, end) {
    this.seekTo(start);
    const promise = this.media.play();
    end && this.setPlayEnd(end);
    return promise;
  }
  /**
   * Pauses the loaded audio.
   *
   * @emits MediaElement#pause
   * @return {Promise} Result
   */


  pause() {
    let promise;

    if (this.media) {
      promise = this.media.pause();
    }

    this.clearPlayEnd();
    return promise;
  }
  /**
   * Set the play end
   *
   * @param {number} end Where to end
   */


  setPlayEnd(end) {
    this.clearPlayEnd();

    this._onPlayEnd = time => {
      if (time >= end) {
        this.pause();
        this.seekTo(end);
      }
    };

    this.on('audioprocess', this._onPlayEnd);
  }
  /** @private */


  clearPlayEnd() {
    if (this._onPlayEnd) {
      this.un('audioprocess', this._onPlayEnd);
      this._onPlayEnd = null;
    }
  }
  /**
   * Compute the max and min value of the waveform when broken into
   * <length> subranges.
   *
   * @param {number} length How many subranges to break the waveform into.
   * @param {number} first First sample in the required range.
   * @param {number} last Last sample in the required range.
   * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of
   * arrays of peaks consisting of (max, min) values for each subrange.
   */


  getPeaks(length, first, last) {
    if (this.buffer) {
      return super.getPeaks(length, first, last);
    }

    return this.peaks || [];
  }
  /**
   * Set the sink id for the media player
   *
   * @param {string} deviceId String value representing audio device id.
   * @returns {Promise} A Promise that resolves to `undefined` when there
   * are no errors.
   */


  setSinkId(deviceId) {
    if (deviceId) {
      if (!this.media.setSinkId) {
        return Promise.reject(new Error('setSinkId is not supported in your browser'));
      }

      return this.media.setSinkId(deviceId);
    }

    return Promise.reject(new Error('Invalid deviceId: ' + deviceId));
  }
  /**
   * Get the current volume
   *
   * @return {number} value A floating point value between 0 and 1.
   */


  getVolume() {
    return this.volume;
  }
  /**
   * Set the audio volume
   *
   * @param {number} value A floating point value between 0 and 1.
   */


  setVolume(value) {
    this.volume = value; // no need to change when it's already at that volume

    if (this.media.volume !== this.volume) {
      this.media.volume = this.volume;
    }
  }
  /**
   * Enable or disable muted audio
   *
   * @since 4.0.0
   * @param {boolean} muted Specify `true` to mute audio.
   */


  setMute(muted) {
    // This causes a volume change to be emitted too through the
    // volumechange event listener.
    this.isMuted = this.media.muted = muted;
  }
  /**
   * This is called when wavesurfer is destroyed
   *
   */


  destroy() {
    this.pause();
    this.unAll();
    this.destroyed = true; // cleanup media event listeners

    Object.keys(this.mediaListeners).forEach(id => {
      if (this.media) {
        this.media.removeEventListener(id, this.mediaListeners[id]);
      }
    });

    if (this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode) {
      this.media.parentNode.removeChild(this.media);
    }

    this.media = null;
  }

}

/***/ }),

/***/ "./src/peakcache.js":
/*!**************************!*\
  !*** ./src/peakcache.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PeakCache)
/* harmony export */ });
/**
 * Caches the decoded peaks data to improve rendering speed for large audio
 *
 * Is used if the option parameter `partialRender` is set to `true`
 */
class PeakCache {
  /**
   * Instantiate cache
   */
  constructor() {
    this.clearPeakCache();
  }
  /**
   * Empty the cache
   */


  clearPeakCache() {
    /**
     * Flat array with entries that are always in pairs to mark the
     * beginning and end of each subrange.  This is a convenience so we can
     * iterate over the pairs for easy set difference operations.
     * @private
     */
    this.peakCacheRanges = [];
    /**
     * Length of the entire cachable region, used for resetting the cache
     * when this changes (zoom events, for instance).
     * @private
     */

    this.peakCacheLength = -1;
  }
  /**
   * Add a range of peaks to the cache
   *
   * @param {number} length The length of the range
   * @param {number} start The x offset of the start of the range
   * @param {number} end The x offset of the end of the range
   * @return {Number.<Array[]>} Array with arrays of numbers
   */


  addRangeToPeakCache(length, start, end) {
    if (length != this.peakCacheLength) {
      this.clearPeakCache();
      this.peakCacheLength = length;
    } // Return ranges that weren't in the cache before the call.


    let uncachedRanges = [];
    let i = 0; // Skip ranges before the current start.

    while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] < start) {
      i++;
    } // If |i| is even, |start| falls after an existing range.  Otherwise,
    // |start| falls between an existing range, and the uncached region
    // starts when we encounter the next node in |peakCacheRanges| or
    // |end|, whichever comes first.


    if (i % 2 == 0) {
      uncachedRanges.push(start);
    }

    while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] <= end) {
      uncachedRanges.push(this.peakCacheRanges[i]);
      i++;
    } // If |i| is even, |end| is after all existing ranges.


    if (i % 2 == 0) {
      uncachedRanges.push(end);
    } // Filter out the 0-length ranges.


    uncachedRanges = uncachedRanges.filter((item, pos, arr) => {
      if (pos == 0) {
        return item != arr[pos + 1];
      } else if (pos == arr.length - 1) {
        return item != arr[pos - 1];
      }

      return item != arr[pos - 1] && item != arr[pos + 1];
    }); // Merge the two ranges together, uncachedRanges will either contain
    // wholly new points, or duplicates of points in peakCacheRanges.  If
    // duplicates are detected, remove both and extend the range.

    this.peakCacheRanges = this.peakCacheRanges.concat(uncachedRanges);
    this.peakCacheRanges = this.peakCacheRanges.sort((a, b) => a - b).filter((item, pos, arr) => {
      if (pos == 0) {
        return item != arr[pos + 1];
      } else if (pos == arr.length - 1) {
        return item != arr[pos - 1];
      }

      return item != arr[pos - 1] && item != arr[pos + 1];
    }); // Push the uncached ranges into an array of arrays for ease of
    // iteration in the functions that call this.

    const uncachedRangePairs = [];

    for (i = 0; i < uncachedRanges.length; i += 2) {
      uncachedRangePairs.push([uncachedRanges[i], uncachedRanges[i + 1]]);
    }

    return uncachedRangePairs;
  }
  /**
   * For testing
   *
   * @return {Number.<Array[]>} Array with arrays of numbers
   */


  getCacheRanges() {
    const peakCacheRangePairs = [];
    let i;

    for (i = 0; i < this.peakCacheRanges.length; i += 2) {
      peakCacheRangePairs.push([this.peakCacheRanges[i], this.peakCacheRanges[i + 1]]);
    }

    return peakCacheRangePairs;
  }

}

/***/ }),

/***/ "./src/util/absMax.js":
/*!****************************!*\
  !*** ./src/util/absMax.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ absMax)
/* harmony export */ });
/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./max */ "./src/util/max.js");
/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./min */ "./src/util/min.js");


/**
 * Get the largest absolute value in an array
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Largest number found
 * @example console.log(max([-3, 2, 1]), max([-3, 2, 4])); // logs 3 4
 * @since 4.3.0
 */

function absMax(values) {
  const max = (0,_max__WEBPACK_IMPORTED_MODULE_0__["default"])(values);
  const min = (0,_min__WEBPACK_IMPORTED_MODULE_1__["default"])(values);
  return -min > max ? -min : max;
}

/***/ }),

/***/ "./src/util/clamp.js":
/*!***************************!*\
  !*** ./src/util/clamp.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clamp)
/* harmony export */ });
/**
 * Returns a number limited to the given range.
 *
 * @param {number} val The number to be limited to a range
 * @param {number} min The lower boundary of the limit range
 * @param {number} max The upper boundary of the limit range
 * @returns {number} A number in the range [min, max]
 */
function clamp(val, min, max) {
  return Math.min(Math.max(min, val), max);
}

/***/ }),

/***/ "./src/util/fetch.js":
/*!***************************!*\
  !*** ./src/util/fetch.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchFile)
/* harmony export */ });
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ "./src/util/observer.js");
/**
 * @since 3.0.0
 */


class ProgressHandler {
  /**
   * Instantiate ProgressHandler
   *
   * @param {Observer} instance The `fetchFile` observer instance.
   * @param {Number} contentLength Content length.
   * @param {Response} response Response object.
   */
  constructor(instance, contentLength, response) {
    this.instance = instance;
    this.instance._reader = response.body.getReader();
    this.total = parseInt(contentLength, 10);
    this.loaded = 0;
  }
  /**
   * A method that is called once, immediately after the `ReadableStream``
   * is constructed.
   *
   * @param {ReadableStreamDefaultController} controller Controller instance
   *     used to control the stream.
   */


  start(controller) {
    const read = () => {
      // instance._reader.read() returns a promise that resolves
      // when a value has been received
      this.instance._reader.read().then(({
        done,
        value
      }) => {
        // result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (done) {
          // ensure onProgress called when content-length=0
          if (this.total === 0) {
            this.instance.onProgress.call(this.instance, {
              loaded: this.loaded,
              total: this.total,
              lengthComputable: false
            });
          } // no more data needs to be consumed, close the stream


          controller.close();
          return;
        }

        this.loaded += value.byteLength;
        this.instance.onProgress.call(this.instance, {
          loaded: this.loaded,
          total: this.total,
          lengthComputable: !(this.total === 0)
        }); // enqueue the next data chunk into our target stream

        controller.enqueue(value);
        read();
      }).catch(error => {
        controller.error(error);
      });
    };

    read();
  }

}
/**
 * Load a file using `fetch`.
 *
 * @param {object} options Request options to use. See example below.
 * @returns {Observer} Observer instance
 * @example
 * // default options
 * let options = {
 *     url: undefined,
 *     method: 'GET',
 *     mode: 'cors',
 *     credentials: 'same-origin',
 *     cache: 'default',
 *     responseType: 'json',
 *     requestHeaders: [],
 *     redirect: 'follow',
 *     referrer: 'client'
 * };
 *
 * // override some options
 * options.url = '../media/demo.wav';

 * // available types: 'arraybuffer', 'blob', 'json' or 'text'
 * options.responseType = 'arraybuffer';
 *
 * // make fetch call
 * let request = util.fetchFile(options);
 *
 * // listen for events
 * request.on('progress', e => {
 *     console.log('progress', e);
 * });
 *
 * request.on('success', data => {
 *     console.log('success!', data);
 * });
 *
 * request.on('error', e => {
 *     console.warn('fetchFile error: ', e);
 * });
 */


function fetchFile(options) {
  if (!options) {
    throw new Error('fetch options missing');
  } else if (!options.url) {
    throw new Error('fetch url missing');
  }

  const instance = new _observer__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const fetchHeaders = new Headers();
  const fetchRequest = new Request(options.url); // add ability to abort

  instance.controller = new AbortController(); // check if headers have to be added

  if (options && options.requestHeaders) {
    // add custom request headers
    options.requestHeaders.forEach(header => {
      fetchHeaders.append(header.key, header.value);
    });
  } // parse fetch options


  const responseType = options.responseType || 'json';
  const fetchOptions = {
    method: options.method || 'GET',
    headers: fetchHeaders,
    mode: options.mode || 'cors',
    credentials: options.credentials || 'same-origin',
    cache: options.cache || 'default',
    redirect: options.redirect || 'follow',
    referrer: options.referrer || 'client',
    signal: instance.controller.signal
  };
  fetch(fetchRequest, fetchOptions).then(response => {
    // store response reference
    instance.response = response;
    let progressAvailable = true;

    if (!response.body) {
      // ReadableStream is not yet supported in this browser
      // see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
      progressAvailable = false;
    } // Server must send CORS header "Access-Control-Expose-Headers: content-length"


    const contentLength = response.headers.get('content-length');

    if (contentLength === null) {
      // Content-Length server response header missing.
      // Don't evaluate download progress if we can't compare against a total size
      // see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Access-Control-Expose-Headers
      progressAvailable = false;
    }

    if (!progressAvailable) {
      // not able to check download progress so skip it
      return response;
    } // fire progress event when during load


    instance.onProgress = e => {
      instance.fireEvent('progress', e);
    };

    return new Response(new ReadableStream(new ProgressHandler(instance, contentLength, response)), fetchOptions);
  }).then(response => {
    let errMsg;

    if (response.ok) {
      switch (responseType) {
        case 'arraybuffer':
          return response.arrayBuffer();

        case 'json':
          return response.json();

        case 'blob':
          return response.blob();

        case 'text':
          return response.text();

        default:
          errMsg = 'Unknown responseType: ' + responseType;
          break;
      }
    }

    if (!errMsg) {
      errMsg = 'HTTP error status: ' + response.status;
    }

    throw new Error(errMsg);
  }).then(response => {
    instance.fireEvent('success', response);
  }).catch(error => {
    instance.fireEvent('error', error);
  }); // return the fetch request

  instance.fetchRequest = fetchRequest;
  return instance;
}

/***/ }),

/***/ "./src/util/frame.js":
/*!***************************!*\
  !*** ./src/util/frame.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ frame)
/* harmony export */ });
/* harmony import */ var _request_animation_frame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request-animation-frame */ "./src/util/request-animation-frame.js");

/**
 * Create a function which will be called at the next requestAnimationFrame
 * cycle
 *
 * @param {function} func The function to call
 *
 * @return {func} The function wrapped within a requestAnimationFrame
 */

function frame(func) {
  return (...args) => (0,_request_animation_frame__WEBPACK_IMPORTED_MODULE_0__["default"])(() => func(...args));
}

/***/ }),

/***/ "./src/util/get-id.js":
/*!****************************!*\
  !*** ./src/util/get-id.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getId)
/* harmony export */ });
/**
 * Get a random prefixed ID
 *
 * @param {String} prefix Prefix to use. Default is `'wavesurfer_'`.
 * @returns {String} Random prefixed ID
 * @example
 * console.log(getId()); // logs 'wavesurfer_b5pors4ru6g'
 *
 * let prefix = 'foo-';
 * console.log(getId(prefix)); // logs 'foo-b5pors4ru6g'
 */
function getId(prefix) {
  if (prefix === undefined) {
    prefix = 'wavesurfer_';
  }

  return prefix + Math.random().toString(32).substring(2);
}

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observer": () => (/* reexport safe */ _observer__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "absMax": () => (/* reexport safe */ _absMax__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "clamp": () => (/* reexport safe */ _clamp__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "debounce": () => (/* reexport default from dynamic */ debounce__WEBPACK_IMPORTED_MODULE_8___default.a),
/* harmony export */   "fetchFile": () => (/* reexport safe */ _fetch__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "frame": () => (/* reexport safe */ _frame__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "getId": () => (/* reexport safe */ _get_id__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "ignoreSilenceMode": () => (/* reexport safe */ _silence_mode__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "max": () => (/* reexport safe */ _max__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "min": () => (/* reexport safe */ _min__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "preventClick": () => (/* reexport safe */ _prevent_click__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "requestAnimationFrame": () => (/* reexport safe */ _request_animation_frame__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "style": () => (/* reexport safe */ _style__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "withOrientation": () => (/* reexport safe */ _orientation__WEBPACK_IMPORTED_MODULE_12__["default"])
/* harmony export */ });
/* harmony import */ var _get_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-id */ "./src/util/get-id.js");
/* harmony import */ var _max__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./max */ "./src/util/max.js");
/* harmony import */ var _min__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./min */ "./src/util/min.js");
/* harmony import */ var _absMax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./absMax */ "./src/util/absMax.js");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./observer */ "./src/util/observer.js");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style */ "./src/util/style.js");
/* harmony import */ var _request_animation_frame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./request-animation-frame */ "./src/util/request-animation-frame.js");
/* harmony import */ var _frame__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./frame */ "./src/util/frame.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _prevent_click__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./prevent-click */ "./src/util/prevent-click.js");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fetch */ "./src/util/fetch.js");
/* harmony import */ var _clamp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./clamp */ "./src/util/clamp.js");
/* harmony import */ var _orientation__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./orientation */ "./src/util/orientation.js");
/* harmony import */ var _silence_mode__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./silence-mode */ "./src/util/silence-mode.js");















/***/ }),

/***/ "./src/util/max.js":
/*!*************************!*\
  !*** ./src/util/max.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ max)
/* harmony export */ });
/**
 * Get the largest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Largest number found
 * @example console.log(max([1, 2, 3])); // logs 3
 */
function max(values) {
  let largest = -Infinity;
  Object.keys(values).forEach(i => {
    if (values[i] > largest) {
      largest = values[i];
    }
  });
  return largest;
}

/***/ }),

/***/ "./src/util/min.js":
/*!*************************!*\
  !*** ./src/util/min.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ min)
/* harmony export */ });
/**
 * Get the smallest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Smallest number found
 * @example console.log(min([1, 2, 3])); // logs 1
 */
function min(values) {
  let smallest = Number(Infinity);
  Object.keys(values).forEach(i => {
    if (values[i] < smallest) {
      smallest = values[i];
    }
  });
  return smallest;
}

/***/ }),

/***/ "./src/util/observer.js":
/*!******************************!*\
  !*** ./src/util/observer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Observer)
/* harmony export */ });
/**
 * @typedef {Object} ListenerDescriptor
 * @property {string} name The name of the event
 * @property {function} callback The callback
 * @property {function} un The function to call to remove the listener
 */

/**
 * Observer class
 */
class Observer {
  /**
   * Instantiate Observer
   */
  constructor() {
    /**
     * @private
     * @todo Initialise the handlers here already and remove the conditional
     * assignment in `on()`
     */
    this._disabledEventEmissions = [];
    this.handlers = null;
  }
  /**
   * Attach a handler function for an event.
   *
   * @param {string} event Name of the event to listen to
   * @param {function} fn The callback to trigger when the event is fired
   * @return {ListenerDescriptor} The event descriptor
   */


  on(event, fn) {
    if (!this.handlers) {
      this.handlers = {};
    }

    let handlers = this.handlers[event];

    if (!handlers) {
      handlers = this.handlers[event] = [];
    }

    handlers.push(fn); // Return an event descriptor

    return {
      name: event,
      callback: fn,
      un: (e, fn) => this.un(e, fn)
    };
  }
  /**
   * Remove an event handler.
   *
   * @param {string} event Name of the event the listener that should be
   * removed listens to
   * @param {function} fn The callback that should be removed
   */


  un(event, fn) {
    if (!this.handlers) {
      return;
    }

    const handlers = this.handlers[event];
    let i;

    if (handlers) {
      if (fn) {
        for (i = handlers.length - 1; i >= 0; i--) {
          if (handlers[i] == fn) {
            handlers.splice(i, 1);
          }
        }
      } else {
        handlers.length = 0;
      }
    }
  }
  /**
   * Remove all event handlers.
   */


  unAll() {
    this.handlers = null;
  }
  /**
   * Attach a handler to an event. The handler is executed at most once per
   * event type.
   *
   * @param {string} event The event to listen to
   * @param {function} handler The callback that is only to be called once
   * @return {ListenerDescriptor} The event descriptor
   */


  once(event, handler) {
    const fn = (...args) => {
      /*  eslint-disable no-invalid-this */
      handler.apply(this, args);
      /*  eslint-enable no-invalid-this */

      setTimeout(() => {
        this.un(event, fn);
      }, 0);
    };

    return this.on(event, fn);
  }
  /**
   * Disable firing a list of events by name. When specified, event handlers for any event type
   * passed in here will not be called.
   *
   * @since 4.0.0
   * @param {string[]} eventNames an array of event names to disable emissions for
   * @example
   * // disable seek and interaction events
   * wavesurfer.setDisabledEventEmissions(['seek', 'interaction']);
   */


  setDisabledEventEmissions(eventNames) {
    this._disabledEventEmissions = eventNames;
  }
  /**
   * plugins borrow part of this class without calling the constructor,
   * so we have to be careful about _disabledEventEmissions
   */


  _isDisabledEventEmission(event) {
    return this._disabledEventEmissions && this._disabledEventEmissions.includes(event);
  }
  /**
   * Manually fire an event
   *
   * @param {string} event The event to fire manually
   * @param {...any} args The arguments with which to call the listeners
   */


  fireEvent(event, ...args) {
    if (!this.handlers || this._isDisabledEventEmission(event)) {
      return;
    }

    const handlers = this.handlers[event];
    handlers && handlers.forEach(fn => {
      fn(...args);
    });
  }

}

/***/ }),

/***/ "./src/util/orientation.js":
/*!*********************************!*\
  !*** ./src/util/orientation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ withOrientation)
/* harmony export */ });
const verticalPropMap = {
  width: 'height',
  height: 'width',
  overflowX: 'overflowY',
  overflowY: 'overflowX',
  clientWidth: 'clientHeight',
  clientHeight: 'clientWidth',
  clientX: 'clientY',
  clientY: 'clientX',
  scrollWidth: 'scrollHeight',
  scrollLeft: 'scrollTop',
  offsetLeft: 'offsetTop',
  offsetTop: 'offsetLeft',
  offsetHeight: 'offsetWidth',
  offsetWidth: 'offsetHeight',
  left: 'top',
  right: 'bottom',
  top: 'left',
  bottom: 'right',
  borderRightStyle: 'borderBottomStyle',
  borderRightWidth: 'borderBottomWidth',
  borderRightColor: 'borderBottomColor'
};
/**
 * Convert a horizontally-oriented property name to a vertical one.
 *
 * @param {string} prop A property name
 * @param {bool} vertical Whether the element is oriented vertically
 * @returns {string} prop, converted appropriately
 */

function mapProp(prop, vertical) {
  if (Object.prototype.hasOwnProperty.call(verticalPropMap, prop)) {
    return vertical ? verticalPropMap[prop] : prop;
  } else {
    return prop;
  }
}

const isProxy = Symbol("isProxy");
/**
 * Returns an appropriately oriented object based on vertical.
 * If vertical is true, attribute getting and setting will be mapped through
 * verticalPropMap, so that e.g. getting the object's .width will give its
 * .height instead.
 * Certain methods of an oriented object will return oriented objects as well.
 * Oriented objects can't be added to the DOM directly since they are Proxy objects
 * and thus fail typechecks. Use domElement to get the actual element for this.
 *
 * @param {object} target The object to be wrapped and oriented
 * @param {bool} vertical Whether the element is oriented vertically
 * @returns {Proxy} An oriented object with attr translation via verticalAttrMap
 * @since 5.0.0
 */

function withOrientation(target, vertical) {
  if (target[isProxy]) {
    return target;
  } else {
    return new Proxy(target, {
      get: function (obj, prop, receiver) {
        if (prop === isProxy) {
          return true;
        } else if (prop === 'domElement') {
          return obj;
        } else if (prop === 'style') {
          return withOrientation(obj.style, vertical);
        } else if (prop === 'canvas') {
          return withOrientation(obj.canvas, vertical);
        } else if (prop === 'getBoundingClientRect') {
          return function (...args) {
            return withOrientation(obj.getBoundingClientRect(...args), vertical);
          };
        } else if (prop === 'getContext') {
          return function (...args) {
            return withOrientation(obj.getContext(...args), vertical);
          };
        } else {
          let value = obj[mapProp(prop, vertical)];
          return typeof value == 'function' ? value.bind(obj) : value;
        }
      },
      set: function (obj, prop, value) {
        obj[mapProp(prop, vertical)] = value;
        return true;
      }
    });
  }
}

/***/ }),

/***/ "./src/util/prevent-click.js":
/*!***********************************!*\
  !*** ./src/util/prevent-click.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ preventClick)
/* harmony export */ });
/**
 * Stops propagation of click event and removes event listener
 *
 * @private
 * @param {object} event The click event
 */
function preventClickHandler(event) {
  event.stopPropagation();
  document.body.removeEventListener('click', preventClickHandler, true);
}
/**
 * Starts listening for click event and prevent propagation
 *
 * @param {object} values Values
 */


function preventClick(values) {
  document.body.addEventListener('click', preventClickHandler, true);
}

/***/ }),

/***/ "./src/util/request-animation-frame.js":
/*!*********************************************!*\
  !*** ./src/util/request-animation-frame.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable valid-jsdoc */

/**
 * Returns the `requestAnimationFrame` function for the browser, or a shim with
 * `setTimeout` if the function is not found
 *
 * @return {function} Available `requestAnimationFrame` function for the browser
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((callback, element) => setTimeout(callback, 1000 / 60))).bind(window));

/***/ }),

/***/ "./src/util/silence-mode.js":
/*!**********************************!*\
  !*** ./src/util/silence-mode.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ignoreSilenceMode)
/* harmony export */ });
/**
 * Ignores device silence mode when using the `WebAudio` backend.
 *
 * Many mobile devices contain a hardware button to mute the ringtone for incoming
 * calls and messages. Unfortunately, on some platforms like iOS, this also mutes
 * wavesurfer's audio when using the `WebAudio` backend. This function creates a
 * temporary `<audio>` element that makes sure the WebAudio backend keeps playing
 * when muting the device ringer.
 *
 * @since 5.2.0
 */
function ignoreSilenceMode() {
  // Set the src to a short bit of url encoded as a silent mp3
  // NOTE The silence MP3 must be high quality, when web audio sounds are played
  // in parallel the web audio sound is mixed to match the bitrate of the html sound
  // 0.01 seconds of silence VBR220-260 Joint Stereo 859B
  const audioData = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ=="; // disable iOS Airplay (setting the attribute in js doesn't work)

  let tmp = document.createElement("div");
  tmp.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
  let audioSilentMode = tmp.children.item(0);
  audioSilentMode.src = audioData;
  audioSilentMode.preload = "auto";
  audioSilentMode.type = "audio/mpeg";
  audioSilentMode.disableRemotePlayback = true; // play

  audioSilentMode.play(); // cleanup

  audioSilentMode.remove();
  tmp.remove();
}

/***/ }),

/***/ "./src/util/style.js":
/*!***************************!*\
  !*** ./src/util/style.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ style)
/* harmony export */ });
/**
 * Apply a map of styles to an element
 *
 * @param {HTMLElement} el The element that the styles will be applied to
 * @param {Object} styles The map of propName: attribute, both are used as-is
 *
 * @return {HTMLElement} el
 */
function style(el, styles) {
  Object.keys(styles).forEach(prop => {
    if (el.style[prop] !== styles[prop]) {
      el.style[prop] = styles[prop];
    }
  });
  return el;
}

/***/ }),

/***/ "./src/webaudio.js":
/*!*************************!*\
  !*** ./src/webaudio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebAudio)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
 // using constants to prevent someone writing the string wrong

const PLAYING = 'playing';
const PAUSED = 'paused';
const FINISHED = 'finished';
/**
 * WebAudio backend
 *
 * @extends {Observer}
 */

class WebAudio extends _util__WEBPACK_IMPORTED_MODULE_0__.Observer {
  /** scriptBufferSize: size of the processing buffer */
  static scriptBufferSize = 256;
  /** audioContext: allows to process audio with WebAudio API */

  audioContext = null;
  /** @private */

  offlineAudioContext = null;
  /** @private */

  stateBehaviors = {
    [PLAYING]: {
      init() {
        this.addOnAudioProcess();
      },

      getPlayedPercents() {
        const duration = this.getDuration();
        return this.getCurrentTime() / duration || 0;
      },

      getCurrentTime() {
        return this.startPosition + this.getPlayedTime();
      }

    },
    [PAUSED]: {
      init() {
        this.removeOnAudioProcess();
      },

      getPlayedPercents() {
        const duration = this.getDuration();
        return this.getCurrentTime() / duration || 0;
      },

      getCurrentTime() {
        return this.startPosition;
      }

    },
    [FINISHED]: {
      init() {
        this.removeOnAudioProcess();
        this.fireEvent('finish');
      },

      getPlayedPercents() {
        return 1;
      },

      getCurrentTime() {
        return this.getDuration();
      }

    }
  };
  /**
   * Does the browser support this backend
   *
   * @return {boolean} Whether or not this browser supports this backend
   */

  supportsWebAudio() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }
  /**
   * Get the audio context used by this backend or create one
   *
   * @return {AudioContext} Existing audio context, or creates a new one
   */


  getAudioContext() {
    if (!window.WaveSurferAudioContext) {
      window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    return window.WaveSurferAudioContext;
  }
  /**
   * Get the offline audio context used by this backend or create one
   *
   * @param {number} sampleRate The sample rate to use
   * @return {OfflineAudioContext} Existing offline audio context, or creates
   * a new one
   */


  getOfflineAudioContext(sampleRate) {
    if (!window.WaveSurferOfflineAudioContext) {
      window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, sampleRate);
    }

    return window.WaveSurferOfflineAudioContext;
  }
  /**
   * Construct the backend
   *
   * @param {WavesurferParams} params Wavesurfer parameters
   */


  constructor(params) {
    super();
    /** @private */

    this.params = params;
    /** ac: Audio Context instance */

    this.ac = params.audioContext || (this.supportsWebAudio() ? this.getAudioContext() : {});
    /**@private */

    this.lastPlay = this.ac.currentTime;
    /** @private */

    this.startPosition = 0;
    /** @private */

    this.scheduledPause = null;
    /** @private */

    this.states = {
      [PLAYING]: Object.create(this.stateBehaviors[PLAYING]),
      [PAUSED]: Object.create(this.stateBehaviors[PAUSED]),
      [FINISHED]: Object.create(this.stateBehaviors[FINISHED])
    };
    /** @private */

    this.buffer = null;
    /** @private */

    this.filters = [];
    /** gainNode: allows to control audio volume */

    this.gainNode = null;
    /** @private */

    this.mergedPeaks = null;
    /** @private */

    this.offlineAc = null;
    /** @private */

    this.peaks = null;
    /** @private */

    this.playbackRate = 1;
    /** analyser: provides audio analysis information */

    this.analyser = null;
    /** scriptNode: allows processing audio */

    this.scriptNode = null;
    /** @private */

    this.source = null;
    /** @private */

    this.splitPeaks = [];
    /** @private */

    this.state = null;
    /** @private */

    this.explicitDuration = params.duration;
    /**
     * Boolean indicating if the backend was destroyed.
     */

    this.destroyed = false;
  }
  /**
   * Initialise the backend, called in `wavesurfer.createBackend()`
   */


  init() {
    this.createVolumeNode();
    this.createScriptNode();
    this.createAnalyserNode();
    this.setState(PAUSED);
    this.setPlaybackRate(this.params.audioRate);
    this.setLength(0);
  }
  /** @private */


  disconnectFilters() {
    if (this.filters) {
      this.filters.forEach(filter => {
        filter && filter.disconnect();
      });
      this.filters = null; // Reconnect direct path

      this.analyser.connect(this.gainNode);
    }
  }
  /**
   * @private
   *
   * @param {string} state The new state
   */


  setState(state) {
    if (this.state !== this.states[state]) {
      this.state = this.states[state];
      this.state.init.call(this);
    }
  }
  /**
   * Unpacked `setFilters()`
   *
   * @param {...AudioNode} filters One or more filters to set
   */


  setFilter(...filters) {
    this.setFilters(filters);
  }
  /**
   * Insert custom Web Audio nodes into the graph
   *
   * @param {AudioNode[]} filters Packed filters array
   * @example
   * const lowpass = wavesurfer.backend.ac.createBiquadFilter();
   * wavesurfer.backend.setFilter(lowpass);
   */


  setFilters(filters) {
    // Remove existing filters
    this.disconnectFilters(); // Insert filters if filter array not empty

    if (filters && filters.length) {
      this.filters = filters; // Disconnect direct path before inserting filters

      this.analyser.disconnect(); // Connect each filter in turn

      filters.reduce((prev, curr) => {
        prev.connect(curr);
        return curr;
      }, this.analyser).connect(this.gainNode);
    }
  }
  /** Create ScriptProcessorNode to process audio */


  createScriptNode() {
    if (this.params.audioScriptProcessor) {
      this.scriptNode = this.params.audioScriptProcessor;
    } else {
      if (this.ac.createScriptProcessor) {
        this.scriptNode = this.ac.createScriptProcessor(WebAudio.scriptBufferSize);
      } else {
        this.scriptNode = this.ac.createJavaScriptNode(WebAudio.scriptBufferSize);
      }
    }

    this.scriptNode.connect(this.ac.destination);
  }
  /** @private */


  addOnAudioProcess() {
    this.scriptNode.onaudioprocess = () => {
      const time = this.getCurrentTime();

      if (time >= this.getDuration()) {
        this.setState(FINISHED);
        this.fireEvent('pause');
      } else if (time >= this.scheduledPause) {
        this.pause();
      } else if (this.state === this.states[PLAYING]) {
        this.fireEvent('audioprocess', time);
      }
    };
  }
  /** @private */


  removeOnAudioProcess() {
    this.scriptNode.onaudioprocess = null;
  }
  /** Create analyser node to perform audio analysis */


  createAnalyserNode() {
    this.analyser = this.ac.createAnalyser();
    this.analyser.connect(this.gainNode);
  }
  /**
   * Create the gain node needed to control the playback volume.
   *
   */


  createVolumeNode() {
    // Create gain node using the AudioContext
    if (this.ac.createGain) {
      this.gainNode = this.ac.createGain();
    } else {
      this.gainNode = this.ac.createGainNode();
    } // Add the gain node to the graph


    this.gainNode.connect(this.ac.destination);
  }
  /**
   * Set the sink id for the media player
   *
   * @param {string} deviceId String value representing audio device id.
   * @returns {Promise} A Promise that resolves to `undefined` when there
   * are no errors.
   */


  setSinkId(deviceId) {
    if (deviceId) {
      /**
       * The webaudio API doesn't currently support setting the device
       * output. Here we create an HTMLAudioElement, connect the
       * webaudio stream to that element and setSinkId there.
       */
      let audio = new window.Audio();

      if (!audio.setSinkId) {
        return Promise.reject(new Error('setSinkId is not supported in your browser'));
      }

      audio.autoplay = true;
      const dest = this.ac.createMediaStreamDestination();
      this.gainNode.disconnect();
      this.gainNode.connect(dest);
      audio.srcObject = dest.stream;
      return audio.setSinkId(deviceId);
    } else {
      return Promise.reject(new Error('Invalid deviceId: ' + deviceId));
    }
  }
  /**
   * Set the audio volume
   *
   * @param {number} value A floating point value between 0 and 1.
   */


  setVolume(value) {
    this.gainNode.gain.setValueAtTime(value, this.ac.currentTime);
  }
  /**
   * Get the current volume
   *
   * @return {number} value A floating point value between 0 and 1.
   */


  getVolume() {
    return this.gainNode.gain.value;
  }
  /**
   * Decode an array buffer and pass data to a callback
   *
   * @private
   * @param {ArrayBuffer} arraybuffer The array buffer to decode
   * @param {function} callback The function to call on complete.
   * @param {function} errback The function to call on error.
   */


  decodeArrayBuffer(arraybuffer, callback, errback) {
    if (!this.offlineAc) {
      this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100);
    }

    if ('webkitAudioContext' in window) {
      // Safari: no support for Promise-based decodeAudioData enabled
      // Enable it in Safari using the Experimental Features > Modern WebAudio API option
      this.offlineAc.decodeAudioData(arraybuffer, data => callback(data), errback);
    } else {
      this.offlineAc.decodeAudioData(arraybuffer).then(data => callback(data)).catch(err => errback(err));
    }
  }
  /**
   * Set pre-decoded peaks
   *
   * @param {number[]|Number.<Array[]>} peaks Peaks data
   * @param {?number} duration Explicit duration
   */


  setPeaks(peaks, duration) {
    if (duration != null) {
      this.explicitDuration = duration;
    }

    this.peaks = peaks;
  }
  /**
   * Set the rendered length (different from the length of the audio)
   *
   * @param {number} length The rendered length
   */


  setLength(length) {
    // No resize, we can preserve the cached peaks.
    if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {
      return;
    }

    this.splitPeaks = [];
    this.mergedPeaks = []; // Set the last element of the sparse array so the peak arrays are
    // appropriately sized for other calculations.

    const channels = this.buffer ? this.buffer.numberOfChannels : 1;
    let c;

    for (c = 0; c < channels; c++) {
      this.splitPeaks[c] = [];
      this.splitPeaks[c][2 * (length - 1)] = 0;
      this.splitPeaks[c][2 * (length - 1) + 1] = 0;
    }

    this.mergedPeaks[2 * (length - 1)] = 0;
    this.mergedPeaks[2 * (length - 1) + 1] = 0;
  }
  /**
   * Compute the max and min value of the waveform when broken into <length> subranges.
   *
   * @param {number} length How many subranges to break the waveform into.
   * @param {number} first First sample in the required range.
   * @param {number} last Last sample in the required range.
   * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of arrays of
   * peaks consisting of (max, min) values for each subrange.
   */


  getPeaks(length, first, last) {
    if (this.peaks) {
      return this.peaks;
    }

    if (!this.buffer) {
      return [];
    }

    first = first || 0;
    last = last || length - 1;
    this.setLength(length);

    if (!this.buffer) {
      return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
    }
    /**
     * The following snippet fixes a buffering data issue on the Safari
     * browser which returned undefined It creates the missing buffer based
     * on 1 channel, 4096 samples and the sampleRate from the current
     * webaudio context 4096 samples seemed to be the best fit for rendering
     * will review this code once a stable version of Safari TP is out
     */


    if (!this.buffer.length) {
      const newBuffer = this.createBuffer(1, 4096, this.sampleRate);
      this.buffer = newBuffer.buffer;
    }

    const sampleSize = this.buffer.length / length;
    const sampleStep = ~~(sampleSize / 10) || 1;
    const channels = this.buffer.numberOfChannels;
    let c;

    for (c = 0; c < channels; c++) {
      const peaks = this.splitPeaks[c];
      const chan = this.buffer.getChannelData(c);
      let i;

      for (i = first; i <= last; i++) {
        const start = ~~(i * sampleSize);
        const end = ~~(start + sampleSize);
        /**
         * Initialize the max and min to the first sample of this
         * subrange, so that even if the samples are entirely
         * on one side of zero, we still return the true max and
         * min values in the subrange.
         */

        let min = chan[start];
        let max = min;
        let j;

        for (j = start; j < end; j += sampleStep) {
          const value = chan[j];

          if (value > max) {
            max = value;
          }

          if (value < min) {
            min = value;
          }
        }

        peaks[2 * i] = max;
        peaks[2 * i + 1] = min;

        if (c == 0 || max > this.mergedPeaks[2 * i]) {
          this.mergedPeaks[2 * i] = max;
        }

        if (c == 0 || min < this.mergedPeaks[2 * i + 1]) {
          this.mergedPeaks[2 * i + 1] = min;
        }
      }
    }

    return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;
  }
  /**
   * Get the position from 0 to 1
   *
   * @return {number} Position
   */


  getPlayedPercents() {
    return this.state.getPlayedPercents.call(this);
  }
  /** @private */


  disconnectSource() {
    if (this.source) {
      this.source.disconnect();
    }
  }
  /**
   * Destroy all references with WebAudio, disconnecting audio nodes and closing Audio Context
   */


  destroyWebAudio() {
    this.disconnectFilters();
    this.disconnectSource();
    this.gainNode.disconnect();
    this.scriptNode.disconnect();
    this.analyser.disconnect(); // close the audioContext if closeAudioContext option is set to true

    if (this.params.closeAudioContext) {
      // check if browser supports AudioContext.close()
      if (typeof this.ac.close === 'function' && this.ac.state != 'closed') {
        this.ac.close();
      } // clear the reference to the audiocontext


      this.ac = null; // clear the actual audiocontext, either passed as param or the
      // global singleton

      if (!this.params.audioContext) {
        window.WaveSurferAudioContext = null;
      } else {
        this.params.audioContext = null;
      } // clear the offlineAudioContext


      window.WaveSurferOfflineAudioContext = null;
    }
  }
  /**
   * This is called when wavesurfer is destroyed
   */


  destroy() {
    if (!this.isPaused()) {
      this.pause();
    }

    this.unAll();
    this.buffer = null;
    this.destroyed = true;
    this.destroyWebAudio();
  }
  /**
   * Loaded a decoded audio buffer
   *
   * @param {Object} buffer Decoded audio buffer to load
   */


  load(buffer) {
    this.startPosition = 0;
    this.lastPlay = this.ac.currentTime;
    this.buffer = buffer;
    this.createSource();
  }
  /** @private */


  createSource() {
    this.disconnectSource();
    this.source = this.ac.createBufferSource(); // adjust for old browsers

    this.source.start = this.source.start || this.source.noteGrainOn;
    this.source.stop = this.source.stop || this.source.noteOff;
    this.setPlaybackRate(this.playbackRate);
    this.source.buffer = this.buffer;
    this.source.connect(this.analyser);
  }
  /**
   * @private
   *
   * some browsers require an explicit call to #resume before they will play back audio
   */


  resumeAudioContext() {
    if (this.ac.state == 'suspended') {
      this.ac.resume && this.ac.resume();
    }
  }
  /**
   * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`
   *
   * @return {boolean} Whether or not this backend is currently paused
   */


  isPaused() {
    return this.state !== this.states[PLAYING];
  }
  /**
   * Used by `wavesurfer.getDuration()`
   *
   * @return {number} Duration of loaded buffer
   */


  getDuration() {
    if (this.explicitDuration) {
      return this.explicitDuration;
    }

    if (!this.buffer) {
      return 0;
    }

    return this.buffer.duration;
  }
  /**
   * Used by `wavesurfer.seekTo()`
   *
   * @param {number} start Position to start at in seconds
   * @param {number} end Position to end at in seconds
   * @return {{start: number, end: number}} Object containing start and end
   * positions
   */


  seekTo(start, end) {
    if (!this.buffer) {
      return;
    }

    this.scheduledPause = null;

    if (start == null) {
      start = this.getCurrentTime();

      if (start >= this.getDuration()) {
        start = 0;
      }
    }

    if (end == null) {
      end = this.getDuration();
    }

    this.startPosition = start;
    this.lastPlay = this.ac.currentTime;

    if (this.state === this.states[FINISHED]) {
      this.setState(PAUSED);
    }

    return {
      start: start,
      end: end
    };
  }
  /**
   * Get the playback position in seconds
   *
   * @return {number} The playback position in seconds
   */


  getPlayedTime() {
    return (this.ac.currentTime - this.lastPlay) * this.playbackRate;
  }
  /**
   * Plays the loaded audio region.
   *
   * @param {number} start Start offset in seconds, relative to the beginning
   * of a clip.
   * @param {number} end When to stop relative to the beginning of a clip.
   */


  play(start, end) {
    if (!this.buffer) {
      return;
    } // need to re-create source on each playback


    this.createSource();
    const adjustedTime = this.seekTo(start, end);
    start = adjustedTime.start;
    end = adjustedTime.end;
    this.scheduledPause = end;
    this.source.start(0, start);
    this.resumeAudioContext();
    this.setState(PLAYING);
    this.fireEvent('play');
  }
  /**
   * Pauses the loaded audio.
   */


  pause() {
    this.scheduledPause = null;
    this.startPosition += this.getPlayedTime();

    try {
      this.source && this.source.stop(0);
    } catch (err) {// Calling stop can throw the following 2 errors:
      // - RangeError (The value specified for when is negative.)
      // - InvalidStateNode (The node has not been started by calling start().)
      // We can safely ignore both errors, because:
      // - The range is surely correct
      // - The node might not have been started yet, in which case we just want to carry on without causing any trouble.
    }

    this.setState(PAUSED);
    this.fireEvent('pause');
  }
  /**
   * Returns the current time in seconds relative to the audio-clip's
   * duration.
   *
   * @return {number} The current time in seconds
   */


  getCurrentTime() {
    return this.state.getCurrentTime.call(this);
  }
  /**
   * Returns the current playback rate. (0=no playback, 1=normal playback)
   *
   * @return {number} The current playback rate
   */


  getPlaybackRate() {
    return this.playbackRate;
  }
  /**
   * Set the audio source playback rate.
   *
   * @param {number} value The playback rate to use
   */


  setPlaybackRate(value) {
    this.playbackRate = value || 1;
    this.source && this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);
  }
  /**
   * Set a point in seconds for playback to stop at.
   *
   * @param {number} end Position to end at
   * @version 3.3.0
   */


  setPlayEnd(end) {
    this.scheduledPause = end;
  }

}

/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************!*\
  !*** ./src/wavesurfer.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaveSurfer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util/index.js");
/* harmony import */ var _drawer_multicanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawer.multicanvas */ "./src/drawer.multicanvas.js");
/* harmony import */ var _webaudio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webaudio */ "./src/webaudio.js");
/* harmony import */ var _mediaelement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mediaelement */ "./src/mediaelement.js");
/* harmony import */ var _peakcache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./peakcache */ "./src/peakcache.js");
/* harmony import */ var _mediaelement_webaudio__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mediaelement-webaudio */ "./src/mediaelement-webaudio.js");






/*
 * This work is licensed under a BSD-3-Clause License.
 */

/** @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement */

/** @external {OfflineAudioContext} https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext */

/** @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File */

/** @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob */

/** @external {CanvasRenderingContext2D} https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */

/** @external {MediaStreamConstraints} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */

/** @external {AudioNode} https://developer.mozilla.org/de/docs/Web/API/AudioNode */

/**
 * @typedef {Object} WavesurferParams
 * @property {AudioContext} audioContext=null Use your own previously
 * initialized AudioContext or leave blank.
 * @property {number} audioRate=1 Speed at which to play audio. Lower number is
 * slower.
 * @property {ScriptProcessorNode} audioScriptProcessor=null Use your own previously
 * initialized ScriptProcessorNode or leave blank.
 * @property {boolean} autoCenter=true If a scrollbar is present, center the
 * waveform on current progress
 * @property {number} autoCenterRate=5 If autoCenter is active, rate at which the
 * waveform is centered
 * @property {boolean} autoCenterImmediately=false If autoCenter is active, immediately
 * center waveform on current progress
 * @property {string} backend='WebAudio' `'WebAudio'|'MediaElement'|'MediaElementWebAudio'` In most cases
 * you don't have to set this manually. MediaElement is a fallback for unsupported browsers.
 * MediaElementWebAudio allows to use WebAudio API also with big audio files, loading audio like with
 * MediaElement backend (HTML5 audio tag). You have to use the same methods of MediaElement backend for loading and
 * playback, giving also peaks, so the audio data are not decoded. In this way you can use WebAudio features, like filters,
 * also with audio with big duration. For example:
 * ` wavesurfer.load(url | HTMLMediaElement, peaks, preload, duration);
 *   wavesurfer.play();
 *   wavesurfer.setFilter(customFilter);
 * `
 * @property {string} backgroundColor=null Change background color of the
 * waveform container.
 * @property {number} barHeight=1 The height of the wave bars.
 * @property {number} barRadius=0 The radius of the wave bars. Makes bars rounded
 * @property {number} barGap=null The optional spacing between bars of the wave,
 * if not provided will be calculated in legacy format.
 * @property {number} barWidth=null Draw the waveform using bars.
 * @property {number} barMinHeight=null If specified, draw at least a bar of this height,
 * eliminating waveform gaps
 * @property {boolean} closeAudioContext=false Close and nullify all audio
 * contexts when the destroy method is called.
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the waveform should be drawn. This is the only required parameter.
 * @property {string} cursorColor='#333' The fill color of the cursor indicating
 * the playhead position.
 * @property {number} cursorWidth=1 Measured in pixels.
 * @property {object} drawingContextAttributes={desynchronized: false} Drawing context
 * attributes.
 * @property {number} duration=null Optional audio length so pre-rendered peaks
 * can be display immediately for example.
 * @property {boolean} fillParent=true Whether to fill the entire container or
 * draw only according to `minPxPerSec`.
 * @property {boolean} forceDecode=false Force decoding of audio using web audio
 * when zooming to get a more detailed waveform.
 * @property {number} height=128 The height of the waveform. Measured in
 * pixels.
 * @property {boolean} hideScrollbar=false Whether to hide the horizontal
 * scrollbar when one would normally be shown.
 * @property {boolean} hideCursor=false Whether to hide the mouse cursor
 * when one would normally be shown by default.
 * @property {boolean} ignoreSilenceMode=false If true, ignores device silence mode
 * when using the `WebAudio` backend.
 * @property {boolean} interact=true Whether the mouse interaction will be
 * enabled at initialization. You can switch this parameter at any time later
 * on.
 * @property {boolean} loopSelection=true (Use with regions plugin) Enable
 * looping of selected regions
 * @property {number} maxCanvasWidth=4000 Maximum width of a single canvas in
 * pixels, excluding a small overlap (2 * `pixelRatio`, rounded up to the next
 * even integer). If the waveform is longer than this value, additional canvases
 * will be used to render the waveform, which is useful for very large waveforms
 * that may be too wide for browsers to draw on a single canvas.
 * @property {boolean} mediaControls=false (Use with backend `MediaElement` or `MediaElementWebAudio`)
 * this enables the native controls for the media element
 * @property {string} mediaType='audio' (Use with backend `MediaElement` or `MediaElementWebAudio`)
 * `'audio'|'video'` ('video' only for `MediaElement`)
 * @property {number} minPxPerSec=20 Minimum number of pixels per second of
 * audio.
 * @property {boolean} normalize=false If true, normalize by the maximum peak
 * instead of 1.0.
 * @property {boolean} partialRender=false Use the PeakCache to improve
 * rendering speed of large waveforms
 * @property {number} pixelRatio=window.devicePixelRatio The pixel ratio used to
 * calculate display
 * @property {PluginDefinition[]} plugins=[] An array of plugin definitions to
 * register during instantiation, they will be directly initialised unless they
 * are added with the `deferInit` property set to true.
 * @property {string} progressColor='#555' The fill color of the part of the
 * waveform behind the cursor. When `progressColor` and `waveColor` are the same
 * the progress wave is not rendered at all.
 * @property {boolean} removeMediaElementOnDestroy=true Set to false to keep the
 * media element in the DOM when the player is destroyed. This is useful when
 * reusing an existing media element via the `loadMediaElement` method.
 * @property {Object} renderer=MultiCanvas Can be used to inject a custom
 * renderer.
 * @property {boolean|number} responsive=false If set to `true` resize the
 * waveform, when the window is resized. This is debounced with a `100ms`
 * timeout by default. If this parameter is a number it represents that timeout.
 * @property {boolean} rtl=false If set to `true`, renders waveform from
 * right-to-left.
 * @property {boolean} scrollParent=false Whether to scroll the container with a
 * lengthy waveform. Otherwise the waveform is shrunk to the container width
 * (see fillParent).
 * @property {number} skipLength=2 Number of seconds to skip with the
 * skipForward() and skipBackward() methods.
 * @property {boolean} splitChannels=false Render with separate waveforms for
 * the channels of the audio
 * @property {SplitChannelOptions} splitChannelsOptions={} Options for splitChannel rendering
 * @property {boolean} vertical=false Render the waveform vertically instead of horizontally.
 * @property {string} waveColor='#999' The fill color of the waveform after the
 * cursor.
 * @property {object} xhr={} XHR options. For example:
 * `let xhr = {
 *     cache: 'default',
 *     mode: 'cors',
 *     method: 'GET',
 *     credentials: 'same-origin',
 *     redirect: 'follow',
 *     referrer: 'client',
 *     requestHeaders: [
 *         {
 *             key: 'Authorization',
 *             value: 'my-token'
 *         }
 *     ]
 * };`
 */

/**
 * @typedef {Object} PluginDefinition
 * @desc The Object used to describe a plugin
 * @example wavesurfer.addPlugin(pluginDefinition);
 * @property {string} name The name of the plugin, the plugin instance will be
 * added as a property to the wavesurfer instance under this name
 * @property {?Object} staticProps The properties that should be added to the
 * wavesurfer instance as static properties
 * @property {?boolean} deferInit Don't initialise plugin
 * automatically
 * @property {Object} params={} The plugin parameters, they are the first parameter
 * passed to the plugin class constructor function
 * @property {PluginClass} instance The plugin instance factory, is called with
 * the dependency specified in extends. Returns the plugin class.
 */

/**
 * @typedef {Object} SplitChannelOptions
 * @desc parameters applied when splitChannels option is true
 * @property {boolean} overlay=false determines whether channels are rendered on top of each other or on separate tracks
 * @property {object} channelColors={} object describing color for each channel. Example:
 * {
 *     0: {
 *         progressColor: 'green',
 *         waveColor: 'pink'
 *     },
 *     1: {
 *         progressColor: 'orange',
 *         waveColor: 'purple'
 *     }
 * }
 * @property {number[]} filterChannels=[] indexes of channels to be hidden from rendering
 * @property {boolean} relativeNormalization=false determines whether
 * normalization is done per channel or maintains proportionality between
 * channels. Only applied when normalize and splitChannels are both true.
 * @since 4.3.0
 */

/**
 * @interface PluginClass
 *
 * @desc This is the interface which is implemented by all plugin classes. Note
 * that this only turns into an observer after being passed through
 * `wavesurfer.addPlugin`.
 *
 * @extends {Observer}
 */

class PluginClass {
  /**
   * Plugin definition factory
   *
   * This function must be used to create a plugin definition which can be
   * used by wavesurfer to correctly instantiate the plugin.
   *
   * It returns a `PluginDefinition` object representing the plugin.
   *
   * @param {Object} params={} The plugin params (specific to the plugin)
   */
  create(params) {}
  /**
   * Construct the plugin
   *
   * @param {Object} params={} The plugin params (specific to the plugin)
   * @param {Object} ws The wavesurfer instance
   */


  constructor(params, ws) {}
  /**
   * Initialise the plugin
   *
   * Start doing something. This is called by
   * `wavesurfer.initPlugin(pluginName)`
   */


  init() {}
  /**
   * Destroy the plugin instance
   *
   * Stop doing something. This is called by
   * `wavesurfer.destroyPlugin(pluginName)`
   */


  destroy() {}

}
/**
 * WaveSurfer core library class
 *
 * @extends {Observer}
 * @example
 * const params = {
 *   container: '#waveform',
 *   waveColor: 'violet',
 *   progressColor: 'purple'
 * };
 *
 * // initialise like this
 * const wavesurfer = WaveSurfer.create(params);
 *
 * // or like this ...
 * const wavesurfer = new WaveSurfer(params);
 * wavesurfer.init();
 *
 * // load audio file
 * wavesurfer.load('example/media/demo.wav');
 */


class WaveSurfer extends _util__WEBPACK_IMPORTED_MODULE_0__.Observer {
  /** @private */
  defaultParams = {
    audioContext: null,
    audioScriptProcessor: null,
    audioRate: 1,
    autoCenter: true,
    autoCenterRate: 5,
    autoCenterImmediately: false,
    backend: 'WebAudio',
    backgroundColor: null,
    barHeight: 1,
    barRadius: 0,
    barGap: null,
    barMinHeight: null,
    container: null,
    cursorColor: '#333',
    cursorWidth: 1,
    dragSelection: true,
    drawingContextAttributes: {
      // Boolean that hints the user agent to reduce the latency
      // by desynchronizing the canvas paint cycle from the event
      // loop
      desynchronized: false
    },
    duration: null,
    fillParent: true,
    forceDecode: false,
    height: 128,
    hideScrollbar: false,
    hideCursor: false,
    ignoreSilenceMode: false,
    interact: true,
    loopSelection: true,
    maxCanvasWidth: 4000,
    mediaContainer: null,
    mediaControls: false,
    mediaType: 'audio',
    minPxPerSec: 20,
    normalize: false,
    partialRender: false,
    pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
    plugins: [],
    progressColor: '#555',
    removeMediaElementOnDestroy: true,
    renderer: _drawer_multicanvas__WEBPACK_IMPORTED_MODULE_1__["default"],
    responsive: false,
    rtl: false,
    scrollParent: false,
    skipLength: 2,
    splitChannels: false,
    splitChannelsOptions: {
      overlay: false,
      channelColors: {},
      filterChannels: [],
      relativeNormalization: false
    },
    vertical: false,
    waveColor: '#999',
    xhr: {}
  };
  /** @private */

  backends = {
    MediaElement: _mediaelement__WEBPACK_IMPORTED_MODULE_3__["default"],
    WebAudio: _webaudio__WEBPACK_IMPORTED_MODULE_2__["default"],
    MediaElementWebAudio: _mediaelement_webaudio__WEBPACK_IMPORTED_MODULE_5__["default"]
  };
  /**
   * Instantiate this class, call its `init` function and returns it
   *
   * @param {WavesurferParams} params The wavesurfer parameters
   * @return {Object} WaveSurfer instance
   * @example const wavesurfer = WaveSurfer.create(params);
   */

  static create(params) {
    const wavesurfer = new WaveSurfer(params);
    return wavesurfer.init();
  }
  /**
   * The library version number is available as a static property of the
   * WaveSurfer class
   *
   * @type {String}
   * @example
   * console.log('Using wavesurfer.js ' + WaveSurfer.VERSION);
   */


  static VERSION = "6.0.4";
  /**
   * Functions in the `util` property are available as a prototype property to
   * all instances
   *
   * @type {Object}
   * @example
   * const wavesurfer = WaveSurfer.create(params);
   * wavesurfer.util.style(myElement, { background: 'blue' });
   */

  util = _util__WEBPACK_IMPORTED_MODULE_0__;
  /**
   * Functions in the `util` property are available as a static property of the
   * WaveSurfer class
   *
   * @type {Object}
   * @example
   * WaveSurfer.util.style(myElement, { background: 'blue' });
   */

  static util = _util__WEBPACK_IMPORTED_MODULE_0__;
  /**
   * Initialise wavesurfer instance
   *
   * @param {WavesurferParams} params Instantiation options for wavesurfer
   * @example
   * const wavesurfer = new WaveSurfer(params);
   * @returns {this} Wavesurfer instance
   */

  constructor(params) {
    super();
    /**
     * Extract relevant parameters (or defaults)
     * @private
     */

    this.params = Object.assign({}, this.defaultParams, params);
    this.params.splitChannelsOptions = Object.assign({}, this.defaultParams.splitChannelsOptions, params.splitChannelsOptions);
    /** @private */

    this.container = 'string' == typeof params.container ? document.querySelector(this.params.container) : this.params.container;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    if (this.params.mediaContainer == null) {
      /** @private */
      this.mediaContainer = this.container;
    } else if (typeof this.params.mediaContainer == 'string') {
      /** @private */
      this.mediaContainer = document.querySelector(this.params.mediaContainer);
    } else {
      /** @private */
      this.mediaContainer = this.params.mediaContainer;
    }

    if (!this.mediaContainer) {
      throw new Error('Media Container element not found');
    }

    if (this.params.maxCanvasWidth <= 1) {
      throw new Error('maxCanvasWidth must be greater than 1');
    } else if (this.params.maxCanvasWidth % 2 == 1) {
      throw new Error('maxCanvasWidth must be an even number');
    }

    if (this.params.rtl === true) {
      if (this.params.vertical === true) {
        _util__WEBPACK_IMPORTED_MODULE_0__.style(this.container, {
          transform: 'rotateX(180deg)'
        });
      } else {
        _util__WEBPACK_IMPORTED_MODULE_0__.style(this.container, {
          transform: 'rotateY(180deg)'
        });
      }
    }

    if (this.params.backgroundColor) {
      this.setBackgroundColor(this.params.backgroundColor);
    }
    /**
     * @private Used to save the current volume when muting so we can
     * restore once unmuted
     * @type {number}
     */


    this.savedVolume = 0;
    /**
     * @private The current muted state
     * @type {boolean}
     */

    this.isMuted = false;
    /**
     * @private Will hold a list of event descriptors that need to be
     * canceled on subsequent loads of audio
     * @type {Object[]}
     */

    this.tmpEvents = [];
    /**
     * @private Holds any running audio downloads
     * @type {Observer}
     */

    this.currentRequest = null;
    /** @private */

    this.arraybuffer = null;
    /** @private */

    this.drawer = null;
    /** @private */

    this.backend = null;
    /** @private */

    this.peakCache = null; // cache constructor objects

    if (typeof this.params.renderer !== 'function') {
      throw new Error('Renderer parameter is invalid');
    }
    /**
     * @private The uninitialised Drawer class
     */


    this.Drawer = this.params.renderer;
    /**
     * @private The uninitialised Backend class
     */
    // Back compat

    if (this.params.backend == 'AudioElement') {
      this.params.backend = 'MediaElement';
    }

    if ((this.params.backend == 'WebAudio' || this.params.backend === 'MediaElementWebAudio') && !_webaudio__WEBPACK_IMPORTED_MODULE_2__["default"].prototype.supportsWebAudio.call(null)) {
      this.params.backend = 'MediaElement';
    }

    this.Backend = this.backends[this.params.backend];
    /**
     * @private map of plugin names that are currently initialised
     */

    this.initialisedPluginList = {};
    /** @private */

    this.isDestroyed = false;
    /**
     * Get the current ready status.
     *
     * @example const isReady = wavesurfer.isReady;
     * @return {boolean}
     */

    this.isReady = false; // responsive debounced event listener. If this.params.responsive is not
    // set, this is never called. Use 100ms or this.params.responsive as
    // timeout for the debounce function.

    let prevWidth = 0;
    this._onResize = _util__WEBPACK_IMPORTED_MODULE_0__.debounce(() => {
      if (prevWidth != this.drawer.wrapper.clientWidth && !this.params.scrollParent) {
        prevWidth = this.drawer.wrapper.clientWidth;
        this.drawer.fireEvent('redraw');
      }
    }, typeof this.params.responsive === 'number' ? this.params.responsive : 100);
    return this;
  }
  /**
   * Initialise the wave
   *
   * @example
   * var wavesurfer = new WaveSurfer(params);
   * wavesurfer.init();
   * @return {this} The wavesurfer instance
   */


  init() {
    this.registerPlugins(this.params.plugins);
    this.createDrawer();
    this.createBackend();
    this.createPeakCache();
    return this;
  }
  /**
   * Add and initialise array of plugins (if `plugin.deferInit` is falsey),
   * this function is called in the init function of wavesurfer
   *
   * @param {PluginDefinition[]} plugins An array of plugin definitions
   * @emits {WaveSurfer#plugins-registered} Called with the array of plugin definitions
   * @return {this} The wavesurfer instance
   */


  registerPlugins(plugins) {
    // first instantiate all the plugins
    plugins.forEach(plugin => this.addPlugin(plugin)); // now run the init functions

    plugins.forEach(plugin => {
      // call init function of the plugin if deferInit is falsey
      // in that case you would manually use initPlugins()
      if (!plugin.deferInit) {
        this.initPlugin(plugin.name);
      }
    });
    this.fireEvent('plugins-registered', plugins);
    return this;
  }
  /**
   * Get a map of plugin names that are currently initialised
   *
   * @example wavesurfer.getPlugins();
   * @return {Object} Object with plugin names
   */


  getActivePlugins() {
    return this.initialisedPluginList;
  }
  /**
   * Add a plugin object to wavesurfer
   *
   * @param {PluginDefinition} plugin A plugin definition
   * @emits {WaveSurfer#plugin-added} Called with the name of the plugin that was added
   * @example wavesurfer.addPlugin(WaveSurfer.minimap());
   * @return {this} The wavesurfer instance
   */


  addPlugin(plugin) {
    if (!plugin.name) {
      throw new Error('Plugin does not have a name!');
    }

    if (!plugin.instance) {
      throw new Error(`Plugin ${plugin.name} does not have an instance property!`);
    } // staticProps properties are applied to wavesurfer instance


    if (plugin.staticProps) {
      Object.keys(plugin.staticProps).forEach(pluginStaticProp => {
        /**
         * Properties defined in a plugin definition's `staticProps` property are added as
         * staticProps properties of the WaveSurfer instance
         */
        this[pluginStaticProp] = plugin.staticProps[pluginStaticProp];
      });
    }

    const Instance = plugin.instance; // turn the plugin instance into an observer

    const observerPrototypeKeys = Object.getOwnPropertyNames(_util__WEBPACK_IMPORTED_MODULE_0__.Observer.prototype);
    observerPrototypeKeys.forEach(key => {
      Instance.prototype[key] = _util__WEBPACK_IMPORTED_MODULE_0__.Observer.prototype[key];
    });
    /**
     * Instantiated plugin classes are added as a property of the wavesurfer
     * instance
     * @type {Object}
     */

    this[plugin.name] = new Instance(plugin.params || {}, this);
    this.fireEvent('plugin-added', plugin.name);
    return this;
  }
  /**
   * Initialise a plugin
   *
   * @param {string} name A plugin name
   * @emits WaveSurfer#plugin-initialised
   * @example wavesurfer.initPlugin('minimap');
   * @return {this} The wavesurfer instance
   */


  initPlugin(name) {
    if (!this[name]) {
      throw new Error(`Plugin ${name} has not been added yet!`);
    }

    if (this.initialisedPluginList[name]) {
      // destroy any already initialised plugins
      this.destroyPlugin(name);
    }

    this[name].init();
    this.initialisedPluginList[name] = true;
    this.fireEvent('plugin-initialised', name);
    return this;
  }
  /**
   * Destroy a plugin
   *
   * @param {string} name A plugin name
   * @emits WaveSurfer#plugin-destroyed
   * @example wavesurfer.destroyPlugin('minimap');
   * @returns {this} The wavesurfer instance
   */


  destroyPlugin(name) {
    if (!this[name]) {
      throw new Error(`Plugin ${name} has not been added yet and cannot be destroyed!`);
    }

    if (!this.initialisedPluginList[name]) {
      throw new Error(`Plugin ${name} is not active and cannot be destroyed!`);
    }

    if (typeof this[name].destroy !== 'function') {
      throw new Error(`Plugin ${name} does not have a destroy function!`);
    }

    this[name].destroy();
    delete this.initialisedPluginList[name];
    this.fireEvent('plugin-destroyed', name);
    return this;
  }
  /**
   * Destroy all initialised plugins. Convenience function to use when
   * wavesurfer is removed
   *
   * @private
   */


  destroyAllPlugins() {
    Object.keys(this.initialisedPluginList).forEach(name => this.destroyPlugin(name));
  }
  /**
   * Create the drawer and draw the waveform
   *
   * @private
   * @emits WaveSurfer#drawer-created
   */


  createDrawer() {
    this.drawer = new this.Drawer(this.container, this.params);
    this.drawer.init();
    this.fireEvent('drawer-created', this.drawer);

    if (this.params.responsive !== false) {
      window.addEventListener('resize', this._onResize, true);
      window.addEventListener('orientationchange', this._onResize, true);
    }

    this.drawer.on('redraw', () => {
      this.drawBuffer();
      this.drawer.progress(this.backend.getPlayedPercents());
    }); // Click-to-seek

    this.drawer.on('click', (e, progress) => {
      setTimeout(() => this.seekTo(progress), 0);
    }); // Relay the scroll event from the drawer

    this.drawer.on('scroll', e => {
      if (this.params.partialRender) {
        this.drawBuffer();
      }

      this.fireEvent('scroll', e);
    });
  }
  /**
   * Create the backend
   *
   * @private
   * @emits WaveSurfer#backend-created
   */


  createBackend() {
    if (this.backend) {
      this.backend.destroy();
    }

    this.backend = new this.Backend(this.params);
    this.backend.init();
    this.fireEvent('backend-created', this.backend);
    this.backend.on('finish', () => {
      this.drawer.progress(this.backend.getPlayedPercents());
      this.fireEvent('finish');
    });
    this.backend.on('play', () => this.fireEvent('play'));
    this.backend.on('pause', () => this.fireEvent('pause'));
    this.backend.on('audioprocess', time => {
      this.drawer.progress(this.backend.getPlayedPercents());
      this.fireEvent('audioprocess', time);
    }); // only needed for MediaElement and MediaElementWebAudio backend

    if (this.params.backend === 'MediaElement' || this.params.backend === 'MediaElementWebAudio') {
      this.backend.on('seek', () => {
        this.drawer.progress(this.backend.getPlayedPercents());
      });
      this.backend.on('volume', () => {
        let newVolume = this.getVolume();
        this.fireEvent('volume', newVolume);

        if (this.backend.isMuted !== this.isMuted) {
          this.isMuted = this.backend.isMuted;
          this.fireEvent('mute', this.isMuted);
        }
      });
    }
  }
  /**
   * Create the peak cache
   *
   * @private
   */


  createPeakCache() {
    if (this.params.partialRender) {
      this.peakCache = new _peakcache__WEBPACK_IMPORTED_MODULE_4__["default"]();
    }
  }
  /**
   * Get the duration of the audio clip
   *
   * @example const duration = wavesurfer.getDuration();
   * @return {number} Duration in seconds
   */


  getDuration() {
    return this.backend.getDuration();
  }
  /**
   * Get the current playback position
   *
   * @example const currentTime = wavesurfer.getCurrentTime();
   * @return {number} Playback position in seconds
   */


  getCurrentTime() {
    return this.backend.getCurrentTime();
  }
  /**
   * Set the current play time in seconds.
   *
   * @param {number} seconds A positive number in seconds. E.g. 10 means 10
   * seconds, 60 means 1 minute
   */


  setCurrentTime(seconds) {
    if (seconds >= this.getDuration()) {
      this.seekTo(1);
    } else {
      this.seekTo(seconds / this.getDuration());
    }
  }
  /**
   * Starts playback from the current position. Optional start and end
   * measured in seconds can be used to set the range of audio to play.
   *
   * @param {?number} start Position to start at
   * @param {?number} end Position to end at
   * @emits WaveSurfer#interaction
   * @return {Promise} Result of the backend play method
   * @example
   * // play from second 1 to 5
   * wavesurfer.play(1, 5);
   */


  play(start, end) {
    if (this.params.ignoreSilenceMode) {
      // ignores device hardware silence mode
      _util__WEBPACK_IMPORTED_MODULE_0__.ignoreSilenceMode();
    }

    this.fireEvent('interaction', () => this.play(start, end));
    return this.backend.play(start, end);
  }
  /**
   * Set a point in seconds for playback to stop at.
   *
   * @param {number} position Position (in seconds) to stop at
   * @version 3.3.0
   */


  setPlayEnd(position) {
    this.backend.setPlayEnd(position);
  }
  /**
   * Stops and pauses playback
   *
   * @example wavesurfer.pause();
   * @return {Promise} Result of the backend pause method
   */


  pause() {
    if (!this.backend.isPaused()) {
      return this.backend.pause();
    }
  }
  /**
   * Toggle playback
   *
   * @example wavesurfer.playPause();
   * @return {Promise} Result of the backend play or pause method
   */


  playPause() {
    return this.backend.isPaused() ? this.play() : this.pause();
  }
  /**
   * Get the current playback state
   *
   * @example const isPlaying = wavesurfer.isPlaying();
   * @return {boolean} False if paused, true if playing
   */


  isPlaying() {
    return !this.backend.isPaused();
  }
  /**
   * Skip backward
   *
   * @param {?number} seconds Amount to skip back, if not specified `skipLength`
   * is used
   * @example wavesurfer.skipBackward();
   */


  skipBackward(seconds) {
    this.skip(-seconds || -this.params.skipLength);
  }
  /**
   * Skip forward
   *
   * @param {?number} seconds Amount to skip back, if not specified `skipLength`
   * is used
   * @example wavesurfer.skipForward();
   */


  skipForward(seconds) {
    this.skip(seconds || this.params.skipLength);
  }
  /**
   * Skip a number of seconds from the current position (use a negative value
   * to go backwards).
   *
   * @param {number} offset Amount to skip back or forwards
   * @example
   * // go back 2 seconds
   * wavesurfer.skip(-2);
   */


  skip(offset) {
    const duration = this.getDuration() || 1;
    let position = this.getCurrentTime() || 0;
    position = Math.max(0, Math.min(duration, position + (offset || 0)));
    this.seekAndCenter(position / duration);
  }
  /**
   * Seeks to a position and centers the view
   *
   * @param {number} progress Between 0 (=beginning) and 1 (=end)
   * @example
   * // seek and go to the middle of the audio
   * wavesurfer.seekTo(0.5);
   */


  seekAndCenter(progress) {
    this.seekTo(progress);
    this.drawer.recenter(progress);
  }
  /**
   * Seeks to a position
   *
   * @param {number} progress Between 0 (=beginning) and 1 (=end)
   * @emits WaveSurfer#interaction
   * @emits WaveSurfer#seek
   * @example
   * // seek to the middle of the audio
   * wavesurfer.seekTo(0.5);
   */


  seekTo(progress) {
    // return an error if progress is not a number between 0 and 1
    if (typeof progress !== 'number' || !isFinite(progress) || progress < 0 || progress > 1) {
      throw new Error('Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!');
    }

    this.fireEvent('interaction', () => this.seekTo(progress));
    const isWebAudioBackend = this.params.backend === 'WebAudio';
    const paused = this.backend.isPaused();

    if (isWebAudioBackend && !paused) {
      this.backend.pause();
    } // avoid small scrolls while paused seeking


    const oldScrollParent = this.params.scrollParent;
    this.params.scrollParent = false;
    this.backend.seekTo(progress * this.getDuration());
    this.drawer.progress(progress);

    if (isWebAudioBackend && !paused) {
      this.backend.play();
    }

    this.params.scrollParent = oldScrollParent;
    this.fireEvent('seek', progress);
  }
  /**
   * Stops and goes to the beginning.
   *
   * @example wavesurfer.stop();
   */


  stop() {
    this.pause();
    this.seekTo(0);
    this.drawer.progress(0);
  }
  /**
   * Sets the ID of the audio device to use for output and returns a Promise.
   *
   * @param {string} deviceId String value representing underlying output
   * device
   * @returns {Promise} `Promise` that resolves to `undefined` when there are
   * no errors detected.
   */


  setSinkId(deviceId) {
    return this.backend.setSinkId(deviceId);
  }
  /**
   * Set the playback volume.
   *
   * @param {number} newVolume A value between 0 and 1, 0 being no
   * volume and 1 being full volume.
   * @emits WaveSurfer#volume
   */


  setVolume(newVolume) {
    this.backend.setVolume(newVolume);
    this.fireEvent('volume', newVolume);
  }
  /**
   * Get the playback volume.
   *
   * @return {number} A value between 0 and 1, 0 being no
   * volume and 1 being full volume.
   */


  getVolume() {
    return this.backend.getVolume();
  }
  /**
   * Set the playback rate.
   *
   * @param {number} rate A positive number. E.g. 0.5 means half the normal
   * speed, 2 means double speed and so on.
   * @example wavesurfer.setPlaybackRate(2);
   */


  setPlaybackRate(rate) {
    this.backend.setPlaybackRate(rate);
  }
  /**
   * Get the playback rate.
   *
   * @return {number} The current playback rate.
   */


  getPlaybackRate() {
    return this.backend.getPlaybackRate();
  }
  /**
   * Toggle the volume on and off. If not currently muted it will save the
   * current volume value and turn the volume off. If currently muted then it
   * will restore the volume to the saved value, and then rest the saved
   * value.
   *
   * @example wavesurfer.toggleMute();
   */


  toggleMute() {
    this.setMute(!this.isMuted);
  }
  /**
   * Enable or disable muted audio
   *
   * @param {boolean} mute Specify `true` to mute audio.
   * @emits WaveSurfer#volume
   * @emits WaveSurfer#mute
   * @example
   * // unmute
   * wavesurfer.setMute(false);
   * console.log(wavesurfer.getMute()) // logs false
   */


  setMute(mute) {
    // ignore all muting requests if the audio is already in that state
    if (mute === this.isMuted) {
      this.fireEvent('mute', this.isMuted);
      return;
    }

    if (this.backend.setMute) {
      // Backends such as the MediaElement backend have their own handling
      // of mute, let them handle it.
      this.backend.setMute(mute);
      this.isMuted = mute;
    } else {
      if (mute) {
        // If currently not muted then save current volume,
        // turn off the volume and update the mute properties
        this.savedVolume = this.backend.getVolume();
        this.backend.setVolume(0);
        this.isMuted = true;
        this.fireEvent('volume', 0);
      } else {
        // If currently muted then restore to the saved volume
        // and update the mute properties
        this.backend.setVolume(this.savedVolume);
        this.isMuted = false;
        this.fireEvent('volume', this.savedVolume);
      }
    }

    this.fireEvent('mute', this.isMuted);
  }
  /**
   * Get the current mute status.
   *
   * @example const isMuted = wavesurfer.getMute();
   * @return {boolean} Current mute status
   */


  getMute() {
    return this.isMuted;
  }
  /**
   * Get the list of current set filters as an array.
   *
   * Filters must be set with setFilters method first
   *
   * @return {array} List of enabled filters
   */


  getFilters() {
    return this.backend.filters || [];
  }
  /**
   * Toggles `scrollParent` and redraws
   *
   * @example wavesurfer.toggleScroll();
   */


  toggleScroll() {
    this.params.scrollParent = !this.params.scrollParent;
    this.drawBuffer();
  }
  /**
   * Toggle mouse interaction
   *
   * @example wavesurfer.toggleInteraction();
   */


  toggleInteraction() {
    this.params.interact = !this.params.interact;
  }
  /**
   * Get the fill color of the waveform after the cursor.
   *
   * @param {?number} channelIdx Optional index of the channel to get its wave color if splitChannels is true
   * @return {string|object} A CSS color string, or an array of CSS color strings.
   */


  getWaveColor(channelIdx = null) {
    if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
      return this.params.splitChannelsOptions.channelColors[channelIdx].waveColor;
    }

    return this.params.waveColor;
  }
  /**
   * Set the fill color of the waveform after the cursor.
   *
   * @param {string|object} color A CSS color string, or an array of CSS color strings.
   * @param {?number} channelIdx Optional index of the channel to set its wave color if splitChannels is true
   * @example wavesurfer.setWaveColor('#ddd');
   */


  setWaveColor(color, channelIdx = null) {
    if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
      this.params.splitChannelsOptions.channelColors[channelIdx].waveColor = color;
    } else {
      this.params.waveColor = color;
    }

    this.drawBuffer();
  }
  /**
   * Get the fill color of the waveform behind the cursor.
   *
   * @param {?number} channelIdx Optional index of the channel to get its progress color if splitChannels is true
   * @return {string|object} A CSS color string, or an array of CSS color strings.
   */


  getProgressColor(channelIdx = null) {
    if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
      return this.params.splitChannelsOptions.channelColors[channelIdx].progressColor;
    }

    return this.params.progressColor;
  }
  /**
   * Set the fill color of the waveform behind the cursor.
   *
   * @param {string|object} color A CSS color string, or an array of CSS color strings.
   * @param {?number} channelIdx Optional index of the channel to set its progress color if splitChannels is true
   * @example wavesurfer.setProgressColor('#400');
   */


  setProgressColor(color, channelIdx) {
    if (this.params.splitChannelsOptions.channelColors[channelIdx]) {
      this.params.splitChannelsOptions.channelColors[channelIdx].progressColor = color;
    } else {
      this.params.progressColor = color;
    }

    this.drawBuffer();
  }
  /**
   * Get the background color of the waveform container.
   *
   * @return {string} A CSS color string.
   */


  getBackgroundColor() {
    return this.params.backgroundColor;
  }
  /**
   * Set the background color of the waveform container.
   *
   * @param {string} color A CSS color string.
   * @example wavesurfer.setBackgroundColor('#FF00FF');
   */


  setBackgroundColor(color) {
    this.params.backgroundColor = color;
    _util__WEBPACK_IMPORTED_MODULE_0__.style(this.container, {
      background: this.params.backgroundColor
    });
  }
  /**
   * Get the fill color of the cursor indicating the playhead
   * position.
   *
   * @return {string} A CSS color string.
   */


  getCursorColor() {
    return this.params.cursorColor;
  }
  /**
   * Set the fill color of the cursor indicating the playhead
   * position.
   *
   * @param {string} color A CSS color string.
   * @example wavesurfer.setCursorColor('#222');
   */


  setCursorColor(color) {
    this.params.cursorColor = color;
    this.drawer.updateCursor();
  }
  /**
   * Get the height of the waveform.
   *
   * @return {number} Height measured in pixels.
   */


  getHeight() {
    return this.params.height;
  }
  /**
   * Set the height of the waveform.
   *
   * @param {number} height Height measured in pixels.
   * @example wavesurfer.setHeight(200);
   */


  setHeight(height) {
    this.params.height = height;
    this.drawer.setHeight(height * this.params.pixelRatio);
    this.drawBuffer();
  }
  /**
   * Hide channels from being drawn on the waveform if splitting channels.
   *
   * For example, if we want to draw only the peaks for the right stereo channel:
   *
   * const wavesurfer = new WaveSurfer.create({...splitChannels: true});
   * wavesurfer.load('stereo_audio.mp3');
   *
   * wavesurfer.setFilteredChannel([0]); <-- hide left channel peaks.
   *
   * @param {array} channelIndices Channels to be filtered out from drawing.
   * @version 4.0.0
   */


  setFilteredChannels(channelIndices) {
    this.params.splitChannelsOptions.filterChannels = channelIndices;
    this.drawBuffer();
  }
  /**
   * Get the correct peaks for current wave view-port and render wave
   *
   * @private
   * @emits WaveSurfer#redraw
   */


  drawBuffer() {
    const nominalWidth = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio);
    const parentWidth = this.drawer.getWidth();
    let width = nominalWidth; // always start at 0 after zooming for scrolling : issue redraw left part

    let start = 0;
    let end = Math.max(start + parentWidth, width); // Fill container

    if (this.params.fillParent && (!this.params.scrollParent || nominalWidth < parentWidth)) {
      width = parentWidth;
      start = 0;
      end = width;
    }

    let peaks;

    if (this.params.partialRender) {
      const newRanges = this.peakCache.addRangeToPeakCache(width, start, end);
      let i;

      for (i = 0; i < newRanges.length; i++) {
        peaks = this.backend.getPeaks(width, newRanges[i][0], newRanges[i][1]);
        this.drawer.drawPeaks(peaks, width, newRanges[i][0], newRanges[i][1]);
      }
    } else {
      peaks = this.backend.getPeaks(width, start, end);
      this.drawer.drawPeaks(peaks, width, start, end);
    }

    this.fireEvent('redraw', peaks, width);
  }
  /**
   * Horizontally zooms the waveform in and out. It also changes the parameter
   * `minPxPerSec` and enables the `scrollParent` option. Calling the function
   * with a falsey parameter will reset the zoom state.
   *
   * @param {?number} pxPerSec Number of horizontal pixels per second of
   * audio, if none is set the waveform returns to unzoomed state
   * @emits WaveSurfer#zoom
   * @example wavesurfer.zoom(20);
   */


  zoom(pxPerSec) {
    if (!pxPerSec) {
      this.params.minPxPerSec = this.defaultParams.minPxPerSec;
      this.params.scrollParent = false;
    } else {
      this.params.minPxPerSec = pxPerSec;
      this.params.scrollParent = true;
    }

    this.drawBuffer();
    this.drawer.progress(this.backend.getPlayedPercents());
    this.drawer.recenter(this.getCurrentTime() / this.getDuration());
    this.fireEvent('zoom', pxPerSec);
  }
  /**
   * Decode buffer and load
   *
   * @private
   * @param {ArrayBuffer} arraybuffer Buffer to process
   */


  loadArrayBuffer(arraybuffer) {
    this.decodeArrayBuffer(arraybuffer, data => {
      if (!this.isDestroyed) {
        this.loadDecodedBuffer(data);
      }
    });
  }
  /**
   * Directly load an externally decoded AudioBuffer
   *
   * @private
   * @param {AudioBuffer} buffer Buffer to process
   * @emits WaveSurfer#ready
   */


  loadDecodedBuffer(buffer) {
    this.backend.load(buffer);
    this.drawBuffer();
    this.isReady = true;
    this.fireEvent('ready');
  }
  /**
   * Loads audio data from a Blob or File object
   *
   * @param {Blob|File} blob Audio data
   * @example
   */


  loadBlob(blob) {
    // Create file reader
    const reader = new FileReader();
    reader.addEventListener('progress', e => this.onProgress(e));
    reader.addEventListener('load', e => this.loadArrayBuffer(e.target.result));
    reader.addEventListener('error', () => this.fireEvent('error', 'Error reading file'));
    reader.readAsArrayBuffer(blob);
    this.empty();
  }
  /**
   * Loads audio and re-renders the waveform.
   *
   * @param {string|HTMLMediaElement} url The url of the audio file or the
   * audio element with the audio
   * @param {number[]|Number.<Array[]>} peaks Wavesurfer does not have to decode
   * the audio to render the waveform if this is specified
   * @param {?string} preload (Use with backend `MediaElement` and `MediaElementWebAudio`)
   * `'none'|'metadata'|'auto'` Preload attribute for the media element
   * @param {?number} duration The duration of the audio. This is used to
   * render the peaks data in the correct size for the audio duration (as
   * befits the current `minPxPerSec` and zoom value) without having to decode
   * the audio.
   * @returns {void}
   * @throws Will throw an error if the `url` argument is empty.
   * @example
   * // uses fetch or media element to load file (depending on backend)
   * wavesurfer.load('http://example.com/demo.wav');
   *
   * // setting preload attribute with media element backend and supplying
   * // peaks
   * wavesurfer.load(
   *   'http://example.com/demo.wav',
   *   [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888],
   *   true
   * );
   */


  load(url, peaks, preload, duration) {
    if (!url) {
      throw new Error('url parameter cannot be empty');
    }

    this.empty();

    if (preload) {
      // check whether the preload attribute will be usable and if not log
      // a warning listing the reasons why not and nullify the variable
      const preloadIgnoreReasons = {
        "Preload is not 'auto', 'none' or 'metadata'": ['auto', 'metadata', 'none'].indexOf(preload) === -1,
        'Peaks are not provided': !peaks,
        "Backend is not of type 'MediaElement' or 'MediaElementWebAudio'": ['MediaElement', 'MediaElementWebAudio'].indexOf(this.params.backend) === -1,
        'Url is not of type string': typeof url !== 'string'
      };
      const activeReasons = Object.keys(preloadIgnoreReasons).filter(reason => preloadIgnoreReasons[reason]);

      if (activeReasons.length) {
        // eslint-disable-next-line no-console
        console.warn('Preload parameter of wavesurfer.load will be ignored because:\n\t- ' + activeReasons.join('\n\t- ')); // stop invalid values from being used

        preload = null;
      }
    } // loadBuffer(url, peaks, duration) requires that url is a string
    // but users can pass in a HTMLMediaElement to WaveSurfer


    if (this.params.backend === 'WebAudio' && url instanceof HTMLMediaElement) {
      url = url.src;
    }

    switch (this.params.backend) {
      case 'WebAudio':
        return this.loadBuffer(url, peaks, duration);

      case 'MediaElement':
      case 'MediaElementWebAudio':
        return this.loadMediaElement(url, peaks, preload, duration);
    }
  }
  /**
   * Loads audio using Web Audio buffer backend.
   *
   * @private
   * @emits WaveSurfer#waveform-ready
   * @param {string} url URL of audio file
   * @param {number[]|Number.<Array[]>} peaks Peaks data
   * @param {?number} duration Optional duration of audio file
   * @returns {void}
   */


  loadBuffer(url, peaks, duration) {
    const load = action => {
      if (action) {
        this.tmpEvents.push(this.once('ready', action));
      }

      return this.getArrayBuffer(url, data => this.loadArrayBuffer(data));
    };

    if (peaks) {
      this.backend.setPeaks(peaks, duration);
      this.drawBuffer();
      this.fireEvent('waveform-ready');
      this.tmpEvents.push(this.once('interaction', load));
    } else {
      return load();
    }
  }
  /**
   * Either create a media element, or load an existing media element.
   *
   * @private
   * @emits WaveSurfer#waveform-ready
   * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an
   * existing HTML5 Audio/Video Element
   * @param {number[]|Number.<Array[]>} peaks Array of peaks. Required to bypass web audio
   * dependency
   * @param {?boolean} preload Set to true if the preload attribute of the
   * audio element should be enabled
   * @param {?number} duration Optional duration of audio file
   */


  loadMediaElement(urlOrElt, peaks, preload, duration) {
    let url = urlOrElt;

    if (typeof urlOrElt === 'string') {
      this.backend.load(url, this.mediaContainer, peaks, preload);
    } else {
      const elt = urlOrElt;
      this.backend.loadElt(elt, peaks); // If peaks are not provided,
      // url = element.src so we can get peaks with web audio

      url = elt.src;
    }

    this.tmpEvents.push(this.backend.once('canplay', () => {
      // ignore when backend was already destroyed
      if (!this.backend.destroyed) {
        this.drawBuffer();
        this.isReady = true;
        this.fireEvent('ready');
      }
    }), this.backend.once('error', err => this.fireEvent('error', err))); // If peaks are provided, render them and fire the `waveform-ready` event.

    if (peaks) {
      this.backend.setPeaks(peaks, duration);
      this.drawBuffer();
      this.fireEvent('waveform-ready');
    } // If no pre-decoded peaks are provided, or are provided with
    // forceDecode flag, attempt to download the audio file and decode it
    // with Web Audio.


    if ((!peaks || this.params.forceDecode) && this.backend.supportsWebAudio()) {
      this.getArrayBuffer(url, arraybuffer => {
        this.decodeArrayBuffer(arraybuffer, buffer => {
          this.backend.buffer = buffer;
          this.backend.setPeaks(null);
          this.drawBuffer();
          this.fireEvent('waveform-ready');
        });
      });
    }
  }
  /**
   * Decode an array buffer and pass data to a callback
   *
   * @private
   * @param {Object} arraybuffer The array buffer to decode
   * @param {function} callback The function to call on complete
   */


  decodeArrayBuffer(arraybuffer, callback) {
    if (!this.isDestroyed) {
      this.arraybuffer = arraybuffer;
      this.backend.decodeArrayBuffer(arraybuffer, data => {
        // Only use the decoded data if we haven't been destroyed or
        // another decode started in the meantime
        if (!this.isDestroyed && this.arraybuffer == arraybuffer) {
          callback(data);
          this.arraybuffer = null;
        }
      }, () => this.fireEvent('error', 'Error decoding audiobuffer'));
    }
  }
  /**
   * Load an array buffer using fetch and pass the result to a callback
   *
   * @param {string} url The URL of the file object
   * @param {function} callback The function to call on complete
   * @returns {util.fetchFile} fetch call
   * @private
   */


  getArrayBuffer(url, callback) {
    let options = Object.assign({
      url: url,
      responseType: 'arraybuffer'
    }, this.params.xhr);
    const request = _util__WEBPACK_IMPORTED_MODULE_0__.fetchFile(options);
    this.currentRequest = request;
    this.tmpEvents.push(request.on('progress', e => {
      this.onProgress(e);
    }), request.on('success', data => {
      callback(data);
      this.currentRequest = null;
    }), request.on('error', e => {
      this.fireEvent('error', e);
      this.currentRequest = null;
    }));
    return request;
  }
  /**
   * Called while the audio file is loading
   *
   * @private
   * @param {Event} e Progress event
   * @emits WaveSurfer#loading
   */


  onProgress(e) {
    let percentComplete;

    if (e.lengthComputable) {
      percentComplete = e.loaded / e.total;
    } else {
      // Approximate progress with an asymptotic
      // function, and assume downloads in the 1-3 MB range.
      percentComplete = e.loaded / (e.loaded + 1000000);
    }

    this.fireEvent('loading', Math.round(percentComplete * 100), e.target);
  }
  /**
   * Exports PCM data into a JSON array and optionally opens in a new window
   * as valid JSON Blob instance.
   *
   * @param {number} length=1024 The scale in which to export the peaks
   * @param {number} accuracy=10000
   * @param {?boolean} noWindow Set to true to disable opening a new
   * window with the JSON
   * @param {number} start Start index
   * @param {number} end End index
   * @return {Promise} Promise that resolves with array of peaks
   */


  exportPCM(length, accuracy, noWindow, start, end) {
    length = length || 1024;
    start = start || 0;
    accuracy = accuracy || 10000;
    noWindow = noWindow || false;
    const peaks = this.backend.getPeaks(length, start, end);
    const arr = [].map.call(peaks, val => Math.round(val * accuracy) / accuracy);
    return new Promise((resolve, reject) => {
      if (!noWindow) {
        const blobJSON = new Blob([JSON.stringify(arr)], {
          type: 'application/json;charset=utf-8'
        });
        const objURL = URL.createObjectURL(blobJSON);
        window.open(objURL);
        URL.revokeObjectURL(objURL);
      }

      resolve(arr);
    });
  }
  /**
   * Save waveform image as data URI.
   *
   * The default format is `'image/png'`. Other supported types are
   * `'image/jpeg'` and `'image/webp'`.
   *
   * @param {string} format='image/png' A string indicating the image format.
   * The default format type is `'image/png'`.
   * @param {number} quality=1 A number between 0 and 1 indicating the image
   * quality to use for image formats that use lossy compression such as
   * `'image/jpeg'`` and `'image/webp'`.
   * @param {string} type Image data type to return. Either 'dataURL' (default)
   * or 'blob'.
   * @return {string|string[]|Promise} When using `'dataURL'` type this returns
   * a single data URL or an array of data URLs, one for each canvas. When using
   * `'blob'` type this returns a `Promise` resolving with an array of `Blob`
   * instances, one for each canvas.
   */


  exportImage(format, quality, type) {
    if (!format) {
      format = 'image/png';
    }

    if (!quality) {
      quality = 1;
    }

    if (!type) {
      type = 'dataURL';
    }

    return this.drawer.getImage(format, quality, type);
  }
  /**
   * Cancel any fetch request currently in progress
   */


  cancelAjax() {
    if (this.currentRequest && this.currentRequest.controller) {
      // If the current request has a ProgressHandler, then its ReadableStream might need to be cancelled too
      // See: Wavesurfer issue #2042
      // See Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1583815
      if (this.currentRequest._reader) {
        // Ignoring exceptions thrown by call to cancel()
        this.currentRequest._reader.cancel().catch(err => {});
      }

      this.currentRequest.controller.abort();
      this.currentRequest = null;
    }
  }
  /**
   * @private
   */


  clearTmpEvents() {
    this.tmpEvents.forEach(e => e.un());
  }
  /**
   * Display empty waveform.
   */


  empty() {
    if (!this.backend.isPaused()) {
      this.stop();
      this.backend.disconnectSource();
    }

    this.isReady = false;
    this.cancelAjax();
    this.clearTmpEvents(); // empty drawer

    this.drawer.progress(0);
    this.drawer.setWidth(0);
    this.drawer.drawPeaks({
      length: this.drawer.getWidth()
    }, 0);
  }
  /**
   * Remove events, elements and disconnect WebAudio nodes.
   *
   * @emits WaveSurfer#destroy
   */


  destroy() {
    this.destroyAllPlugins();
    this.fireEvent('destroy');
    this.cancelAjax();
    this.clearTmpEvents();
    this.unAll();

    if (this.params.responsive !== false) {
      window.removeEventListener('resize', this._onResize, true);
      window.removeEventListener('orientationchange', this._onResize, true);
    }

    if (this.backend) {
      this.backend.destroy(); // clears memory usage

      this.backend = null;
    }

    if (this.drawer) {
      this.drawer.destroy();
    }

    this.isDestroyed = true;
    this.isReady = false;
    this.arraybuffer = null;
  }

}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=wavesurfer.js.map