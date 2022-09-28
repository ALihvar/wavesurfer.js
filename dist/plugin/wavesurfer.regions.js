/*!
 * wavesurfer.js regions plugin 6.0.4 (2022-09-28)
 * https://wavesurfer-js.org
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define('WaveSurfer', [], factory);
  else if (typeof exports === 'object') exports['WaveSurfer'] = factory();
  else
    (root['WaveSurfer'] = root['WaveSurfer'] || {}),
      (root['WaveSurfer']['regions'] = factory());
})(self, () => {
  return /******/ (() => {
    // webpackBootstrap
    /******/ 'use strict';
    /******/ var __webpack_modules__ = {
      /***/ './src/plugin/regions/region.js':
        /*!**************************************!*\
  !*** ./src/plugin/regions/region.js ***!
  \**************************************/
        /***/ (
          __unused_webpack_module,
          __webpack_exports__,
          __webpack_require__
        ) => {
          __webpack_require__.r(__webpack_exports__);
          /* harmony export */ __webpack_require__.d(__webpack_exports__, {
            /* harmony export */ Region: () => /* binding */ Region,
            /* harmony export */
          });
          /**
           *  @since 4.0.0
           *
           * (Single) Region plugin class
           *
           * Must be turned into an observer before instantiating. This is done in
           * `RegionsPlugin` (main plugin class).
           *
           * @extends {Observer}
           */
          class Region {
            constructor(params, regionsUtils, ws) {
              this.wavesurfer = ws;
              this.wrapper = ws.drawer.wrapper;
              this.util = ws.util;
              this.style = this.util.style;
              this.regionsUtil = regionsUtils;
              this.vertical = ws.drawer.params.vertical;
              this.id = params.id == null ? ws.util.getId() : params.id;
              this.start = Number(params.start) || 0;
              this.end =
                params.end == null // small marker-like region
                  ? this.start +
                    (4 / this.wrapper.scrollWidth) *
                      this.wavesurfer.getDuration()
                  : Number(params.end);
              this.resize =
                params.resize === undefined ? true : Boolean(params.resize);
              this.drag =
                params.drag === undefined ? true : Boolean(params.drag); // reflect resize and drag state of region for region-updated listener

              this.isResizing = false;
              this.isDragging = false;
              this.loop = Boolean(params.loop);
              this.color = params.color || 'rgba(0, 0, 0, 0.1)'; // The left and right handleStyle properties can be set to 'none' for
              // no styling or can be assigned an object containing CSS properties.

              this.handleStyle = params.handleStyle || {
                left: {},
                right: {},
              };
              this.handleLeftEl = null;
              this.handleRightEl = null;
              this.data = params.data || {};
              this.attributes = params.attributes || {};
              this.showTooltip = params.showTooltip || true;
              this.maxLength = params.maxLength; // It assumes the minLength parameter value, or the regionsMinLength parameter value, if the first one not provided

              this.minLength = params.minLength;

              this._onRedraw = () => this.updateRender();

              this.scroll = params.scroll !== false && ws.params.scrollParent;
              this.scrollSpeed = params.scrollSpeed || 1;
              this.scrollThreshold = params.scrollThreshold || 10; // Determines whether the context menu is prevented from being opened.

              this.preventContextMenu =
                params.preventContextMenu === undefined
                  ? false
                  : Boolean(params.preventContextMenu); // select channel ID to set region

              let channelIdx =
                params.channelIdx == null ? -1 : parseInt(params.channelIdx);
              let channelCount =
                ws.regions.params.channelCount && ws.params.splitChannels
                  ? ws.regions.params.channelCount
                  : -1;

              if (channelIdx >= ws.regions.params.channelCount) {
                this.regionHeight = '0%';
                return;
              }

              this.channelIdx = channelIdx;
              this.regionHeight = '100%';
              this.marginTop = '0px';

              if (channelIdx !== -1) {
                if (channelCount >= 0) {
                  this.regionHeight =
                    Math.floor((1 / channelCount) * 100) + '%';
                  this.marginTop =
                    this.wavesurfer.getHeight() * channelIdx + 'px';
                }
              }

              this.formatTimeCallback = params.formatTimeCallback;
              this.edgeScrollWidth = params.edgeScrollWidth;
              this.bindInOut();
              this.render();
              this.wavesurfer.on('zoom', this._onRedraw);
              this.wavesurfer.on('redraw', this._onRedraw);
              this.wavesurfer.fireEvent('region-created', this);
            }
            /* Update region params. */

            update(params, eventParams) {
              if (params.start != null) {
                this.start = Number(params.start);
              }

              if (params.end != null) {
                this.end = Number(params.end);
              }

              if (params.loop != null) {
                this.loop = Boolean(params.loop);
              }

              if (params.color != null) {
                this.color = params.color;
              }

              if (params.handleStyle != null) {
                this.handleStyle = params.handleStyle;
              }

              if (params.data != null) {
                this.data = params.data;
              }

              if (params.resize != null) {
                this.resize = Boolean(params.resize);
                this.updateHandlesResize(this.resize);
              }

              if (params.drag != null) {
                this.drag = Boolean(params.drag);
              }

              if (params.maxLength != null) {
                this.maxLength = Number(params.maxLength);
              }

              if (params.minLength != null) {
                this.minLength = Number(params.minLength);
              }

              if (params.attributes != null) {
                this.attributes = params.attributes;
              }

              this.updateRender();
              this.fireEvent('update');
              this.wavesurfer.fireEvent('region-updated', this, eventParams);
            }
            /* Remove a single region. */

            remove() {
              if (this.element) {
                this.wrapper.removeChild(this.element.domElement);
                this.element = null;
                this.fireEvent('remove');
                this.wavesurfer.un('zoom', this._onRedraw);
                this.wavesurfer.un('redraw', this._onRedraw);
                this.wavesurfer.fireEvent('region-removed', this);
              }
            }
            /**
             * Play the audio region.
             * @param {number} start Optional offset to start playing at
             */

            play(start) {
              const s = start || this.start;
              this.wavesurfer.play(s, this.end);
              this.fireEvent('play');
              this.wavesurfer.fireEvent('region-play', this);
            }
            /**
             * Play the audio region in a loop.
             * @param {number} start Optional offset to start playing at
             * */

            playLoop(start) {
              this.loop = true;
              this.play(start);
            }
            /**
             * Set looping on/off.
             * @param {boolean} loop True if should play in loop
             */

            setLoop(loop) {
              this.loop = loop;
            }
            /* Render a region as a DOM element. */

            render() {
              this.element = this.util.withOrientation(
                this.wrapper.appendChild(document.createElement('region')),
                this.vertical
              );
              this.element.className = 'wavesurfer-region';

              if (this.showTooltip) {
                this.element.title = this.formatTime(this.start, this.end);
              }

              this.element.setAttribute('data-id', this.id);

              for (const attrname in this.attributes) {
                this.element.setAttribute(
                  'data-region-' + attrname,
                  this.attributes[attrname]
                );
              }

              this.style(this.element, {
                position: 'absolute',
                height: this.regionHeight,
                top: this.marginTop,
              });
              /* Resize handles */

              if (this.resize) {
                this.handleLeftEl = this.util.withOrientation(
                  this.element.appendChild(document.createElement('handle')),
                  this.vertical
                );
                this.handleRightEl = this.util.withOrientation(
                  this.element.appendChild(document.createElement('handle')),
                  this.vertical
                );
                this.handleLeftEl.className =
                  'wavesurfer-handle wavesurfer-handle-start';
                this.handleRightEl.className =
                  'wavesurfer-handle wavesurfer-handle-end'; // Default CSS properties for both handles.

                const css = {
                  cursor: this.vertical ? 'row-resize' : 'col-resize',
                  position: 'absolute',
                  top: '0px',
                  width: '2px',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 1)',
                }; // Merge CSS properties per handle.

                const handleLeftCss =
                  this.handleStyle.left !== 'none'
                    ? Object.assign(
                        {
                          left: '0px',
                        },
                        css,
                        this.handleStyle.left
                      )
                    : null;
                const handleRightCss =
                  this.handleStyle.right !== 'none'
                    ? Object.assign(
                        {
                          right: '0px',
                        },
                        css,
                        this.handleStyle.right
                      )
                    : null;

                if (handleLeftCss) {
                  this.style(this.handleLeftEl, handleLeftCss);
                }

                if (handleRightCss) {
                  this.style(this.handleRightEl, handleRightCss);
                }
              }

              this.updateRender();
              this.bindEvents();
            }

            formatTime(start, end) {
              if (this.formatTimeCallback) {
                return this.formatTimeCallback(start, end);
              }

              return (start == end ? [start] : [start, end])
                .map((time) =>
                  [
                    Math.floor((time % 3600) / 60), // minutes
                    ('00' + Math.floor(time % 60)).slice(-2), // seconds
                  ].join(':')
                )
                .join('-');
            }

            getWidth() {
              return (
                this.wavesurfer.drawer.width / this.wavesurfer.params.pixelRatio
              );
            }
            /* Update element's position, width, color. */

            updateRender() {
              // duration varies during loading process, so don't overwrite important data
              const dur = this.wavesurfer.getDuration();
              const width = this.getWidth();
              let startLimited = this.start;
              let endLimited = this.end;

              if (startLimited < 0) {
                startLimited = 0;
                endLimited = endLimited - startLimited;
              }

              if (endLimited > dur) {
                endLimited = dur;
                startLimited = dur - (endLimited - startLimited);
              }

              if (this.minLength != null) {
                endLimited = Math.max(
                  startLimited + this.minLength,
                  endLimited
                );
              }

              if (this.maxLength != null) {
                endLimited = Math.min(
                  startLimited + this.maxLength,
                  endLimited
                );
              }

              if (this.element != null) {
                // Calculate the left and width values of the region such that
                // no gaps appear between regions.
                const left = Math.round((startLimited / dur) * width);
                const regionWidth =
                  Math.round((endLimited / dur) * width) - left;
                this.style(this.element, {
                  left: left + 'px',
                  width: regionWidth + 'px',
                  backgroundColor: this.color,
                  cursor: this.drag ? 'move' : 'default',
                });

                for (const attrname in this.attributes) {
                  this.element.setAttribute(
                    'data-region-' + attrname,
                    this.attributes[attrname]
                  );
                }

                if (this.showTooltip) {
                  this.element.title = this.formatTime(this.start, this.end);
                }
              }
            }
            /* Bind audio events. */

            bindInOut() {
              this.firedIn = false;
              this.firedOut = false;

              const onProcess = (time) => {
                let start = Math.round(this.start * 10) / 10;
                let end = Math.round(this.end * 10) / 10;
                time = Math.round(time * 10) / 10;

                if (
                  !this.firedOut &&
                  this.firedIn &&
                  (start > time || end <= time)
                ) {
                  this.firedOut = true;
                  this.firedIn = false;
                  this.fireEvent('out');
                  this.wavesurfer.fireEvent('region-out', this);
                }

                if (!this.firedIn && start <= time && end > time) {
                  this.firedIn = true;
                  this.firedOut = false;
                  this.fireEvent('in');
                  this.wavesurfer.fireEvent('region-in', this);
                }
              };

              this.wavesurfer.backend.on('audioprocess', onProcess);
              this.on('remove', () => {
                this.wavesurfer.backend.un('audioprocess', onProcess);
              });
              /* Loop playback. */

              this.on('out', () => {
                if (this.loop) {
                  const realTime = this.wavesurfer.getCurrentTime();

                  if (realTime >= this.start && realTime <= this.end) {
                    this.wavesurfer.play(this.start);
                  }
                }
              });
            }
            /* Bind DOM events. */

            bindEvents() {
              const preventContextMenu = this.preventContextMenu;
              this.element.addEventListener('mouseenter', (e) => {
                this.fireEvent('mouseenter', e);
                this.wavesurfer.fireEvent('region-mouseenter', this, e);
              });
              this.element.addEventListener('mouseleave', (e) => {
                this.fireEvent('mouseleave', e);
                this.wavesurfer.fireEvent('region-mouseleave', this, e);
              });
              this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.fireEvent('click', e);
                this.wavesurfer.fireEvent('region-click', this, e);
              });
              this.element.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.fireEvent('dblclick', e);
                this.wavesurfer.fireEvent('region-dblclick', this, e);
              });
              this.element.addEventListener('contextmenu', (e) => {
                if (preventContextMenu) {
                  e.preventDefault();
                }

                this.fireEvent('contextmenu', e);
                this.wavesurfer.fireEvent('region-contextmenu', this, e);
              });
              /* Drag or resize on mousemove. */

              if (this.drag || this.resize) {
                this.bindDragEvents();
              }
            }

            bindDragEvents() {
              const container = this.wavesurfer.drawer.container;
              const scrollSpeed = this.scrollSpeed;
              const scrollThreshold = this.scrollThreshold;
              let startTime;
              let touchId;
              let drag;
              let maxScroll;
              let resize;
              let updated = false;
              let scrollDirection;
              let wrapperRect;
              let regionLeftHalfTime;
              let regionRightHalfTime; // Scroll when the user is dragging within the threshold

              const edgeScroll = (event) => {
                let orientedEvent = this.util.withOrientation(
                  event,
                  this.vertical
                );
                const duration = this.wavesurfer.getDuration();

                if (!scrollDirection || (!drag && !resize)) {
                  return;
                }

                const x = orientedEvent.clientX;
                let distanceBetweenCursorAndWrapperEdge = 0;
                let regionHalfTimeWidth = 0;
                let adjustment = 0; // Get the currently selected time according to the mouse position

                let time = this.regionsUtil.getRegionSnapToGridValue(
                  this.wavesurfer.drawer.handleEvent(event) * duration
                );

                if (drag) {
                  // Considering the point of contact with the region while edgescrolling
                  if (scrollDirection === -1) {
                    regionHalfTimeWidth =
                      regionLeftHalfTime * this.wavesurfer.params.minPxPerSec;
                    distanceBetweenCursorAndWrapperEdge = x - wrapperRect.left;
                  } else {
                    regionHalfTimeWidth =
                      regionRightHalfTime * this.wavesurfer.params.minPxPerSec;
                    distanceBetweenCursorAndWrapperEdge = wrapperRect.right - x;
                  }
                } else {
                  // Considering minLength while edgescroll
                  let minLength = this.minLength;

                  if (!minLength) {
                    minLength = 0;
                  }

                  if (resize === 'start') {
                    if (time > this.end - minLength) {
                      time = this.end - minLength;
                      adjustment = scrollSpeed * scrollDirection;
                    }

                    if (time < 0) {
                      time = 0;
                    }
                  } else if (resize === 'end') {
                    if (time < this.start + minLength) {
                      time = this.start + minLength;
                      adjustment = scrollSpeed * scrollDirection;
                    }

                    if (time > duration) {
                      time = duration;
                    }
                  }
                } // Don't edgescroll if region has reached min or max limit

                const wrapperScrollLeft = this.wrapper.scrollLeft;

                if (scrollDirection === -1) {
                  if (Math.round(wrapperScrollLeft) === 0) {
                    return;
                  }

                  if (
                    Math.round(
                      wrapperScrollLeft -
                        regionHalfTimeWidth +
                        distanceBetweenCursorAndWrapperEdge
                    ) <= 0
                  ) {
                    return;
                  }
                } else {
                  if (Math.round(wrapperScrollLeft) === maxScroll) {
                    return;
                  }

                  if (
                    Math.round(
                      wrapperScrollLeft +
                        regionHalfTimeWidth -
                        distanceBetweenCursorAndWrapperEdge
                    ) >= maxScroll
                  ) {
                    return;
                  }
                } // Update scroll position

                let scrollLeft =
                  wrapperScrollLeft -
                  adjustment +
                  scrollSpeed * scrollDirection;

                if (scrollDirection === -1) {
                  const calculatedLeft = Math.max(
                    0 +
                      regionHalfTimeWidth -
                      distanceBetweenCursorAndWrapperEdge,
                    scrollLeft
                  );
                  this.wrapper.scrollLeft = scrollLeft = calculatedLeft;
                } else {
                  const calculatedRight = Math.min(
                    maxScroll -
                      regionHalfTimeWidth +
                      distanceBetweenCursorAndWrapperEdge,
                    scrollLeft
                  );
                  this.wrapper.scrollLeft = scrollLeft = calculatedRight;
                }

                const delta = time - startTime;
                startTime = time; // Continue dragging or resizing

                drag ? this.onDrag(delta) : this.onResize(delta, resize); // Repeat

                window.requestAnimationFrame(() => {
                  edgeScroll(event);
                });
              };

              const onDown = (event) => {
                const duration = this.wavesurfer.getDuration();

                if (event.touches && event.touches.length > 1) {
                  return;
                }

                touchId = event.targetTouches
                  ? event.targetTouches[0].identifier
                  : null; // stop the event propagation, if this region is resizable or draggable
                // and the event is therefore handled here.

                if (this.drag || this.resize) {
                  event.stopPropagation();
                } // Store the selected startTime we begun dragging or resizing

                startTime = this.regionsUtil.getRegionSnapToGridValue(
                  this.wavesurfer.drawer.handleEvent(event, true) * duration
                ); // Store the selected point of contact when we begin dragging

                regionLeftHalfTime = startTime - this.start;
                regionRightHalfTime = this.end - startTime; // Store for scroll calculations

                maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
                wrapperRect = this.util.withOrientation(
                  this.wrapper.getBoundingClientRect(),
                  this.vertical
                );
                this.isResizing = false;
                this.isDragging = false;

                if (event.target.tagName.toLowerCase() === 'handle') {
                  this.isResizing = true;
                  resize = event.target.classList.contains(
                    'wavesurfer-handle-start'
                  )
                    ? 'start'
                    : 'end';
                } else {
                  this.isDragging = true;
                  drag = true;
                  resize = false;
                }
              };

              const onUp = (event) => {
                if (event.touches && event.touches.length > 1) {
                  return;
                }

                if (drag || resize) {
                  this.isDragging = false;
                  this.isResizing = false;
                  drag = false;
                  scrollDirection = null;
                  resize = false;
                }

                if (updated) {
                  updated = false;
                  this.util.preventClick();
                  this.fireEvent('update-end', event);
                  this.wavesurfer.fireEvent('region-update-end', this, event);
                }
              };

              const onMove = (event) => {
                const duration = this.wavesurfer.getDuration();
                let orientedEvent = this.util.withOrientation(
                  event,
                  this.vertical
                );

                if (event.touches && event.touches.length > 1) {
                  return;
                }

                if (
                  event.targetTouches &&
                  event.targetTouches[0].identifier != touchId
                ) {
                  return;
                }

                if (!drag && !resize) {
                  return;
                }

                const oldTime = startTime;
                let time = this.regionsUtil.getRegionSnapToGridValue(
                  this.wavesurfer.drawer.handleEvent(event) * duration
                );

                if (drag) {
                  // To maintain relative cursor start point while dragging
                  const maxEnd = this.wavesurfer.getDuration();

                  if (time > maxEnd - regionRightHalfTime) {
                    time = maxEnd - regionRightHalfTime;
                  }

                  if (time - regionLeftHalfTime < 0) {
                    time = regionLeftHalfTime;
                  }
                }

                if (resize) {
                  // To maintain relative cursor start point while resizing
                  // we have to handle for minLength
                  let minLength = this.minLength;

                  if (!minLength) {
                    minLength = 0;
                  }

                  if (resize === 'start') {
                    if (time > this.end - minLength) {
                      time = this.end - minLength;
                    }

                    if (time < 0) {
                      time = 0;
                    }
                  } else if (resize === 'end') {
                    if (time < this.start + minLength) {
                      time = this.start + minLength;
                    }

                    if (time > duration) {
                      time = duration;
                    }
                  }
                }

                let delta = time - startTime;
                startTime = time; // Drag

                if (this.drag && drag) {
                  updated = updated || !!delta;
                  this.onDrag(delta);
                } // Resize

                if (this.resize && resize) {
                  updated = updated || !!delta;
                  this.onResize(delta, resize);
                }

                if (
                  this.scroll &&
                  container.clientWidth < this.wrapper.scrollWidth
                ) {
                  // Triggering edgescroll from within edgeScrollWidth
                  let x = orientedEvent.clientX; // Check direction

                  if (x < wrapperRect.left + this.edgeScrollWidth) {
                    scrollDirection = -1;
                  } else if (x > wrapperRect.right - this.edgeScrollWidth) {
                    scrollDirection = 1;
                  } else {
                    scrollDirection = null;
                  }

                  if (scrollDirection) {
                    edgeScroll(event);
                  }
                }
              };

              this.element.addEventListener('mousedown', onDown);
              this.element.addEventListener('touchstart', onDown);
              document.body.addEventListener('mousemove', onMove);
              document.body.addEventListener('touchmove', onMove, {
                passive: false,
              });
              document.addEventListener('mouseup', onUp);
              document.body.addEventListener('touchend', onUp);
              this.on('remove', () => {
                document.removeEventListener('mouseup', onUp);
                document.body.removeEventListener('touchend', onUp);
                document.body.removeEventListener('mousemove', onMove);
                document.body.removeEventListener('touchmove', onMove);
              });
              this.wavesurfer.on('destroy', () => {
                document.removeEventListener('mouseup', onUp);
                document.body.removeEventListener('touchend', onUp);
              });
            }

            onDrag(delta) {
              const maxEnd = this.wavesurfer.getDuration();

              if (this.end + delta > maxEnd) {
                delta = maxEnd - this.end;
              }

              if (this.start + delta < 0) {
                delta = this.start * -1;
              }

              const eventParams = {
                direction: this._getDragDirection(delta),
                action: 'drag',
              };
              this.update(
                {
                  start: this.start + delta,
                  end: this.end + delta,
                },
                eventParams
              );
            }
            /**
             * Returns the direction of dragging region based on delta
             * Negative delta means region is moving to the left
             * Positive - to the right
             * For zero delta the direction is not defined
             * @param {number} delta Drag offset
             * @returns {string|null} Direction 'left', 'right' or null
             */

            _getDragDirection(delta) {
              if (delta < 0) {
                return 'left';
              }

              if (delta > 0) {
                return 'right';
              }

              return null;
            }
            /**
             * @example
             * onResize(-5, 'start') // Moves the start point 5 seconds back
             * onResize(0.5, 'end') // Moves the end point 0.5 seconds forward
             *
             * @param {number} delta How much to add or subtract, given in seconds
             * @param {string} direction 'start 'or 'end'
             */

            onResize(delta, direction) {
              const duration = this.wavesurfer.getDuration();
              const eventParams = {
                action: 'resize',
                direction: direction === 'start' ? 'left' : 'right',
              };

              if (direction === 'start') {
                // Check if changing the start by the given delta would result in the region being smaller than minLength
                if (
                  delta > 0 &&
                  this.end - (this.start + delta) < this.minLength
                ) {
                  delta = this.end - this.minLength - this.start;
                } // Check if changing the start by the given delta would result in the region being larger than maxLength

                if (
                  delta < 0 &&
                  this.end - (this.start + delta) > this.maxLength
                ) {
                  delta = this.end - this.start - this.maxLength;
                }

                if (delta < 0 && this.start + delta < 0) {
                  delta = this.start * -1;
                }

                this.update(
                  {
                    start: Math.min(this.start + delta, this.end),
                    end: Math.max(this.start + delta, this.end),
                  },
                  eventParams
                );
              } else {
                // Check if changing the end by the given delta would result in the region being smaller than minLength
                if (
                  delta < 0 &&
                  this.end + delta - this.start < this.minLength
                ) {
                  delta = this.start + this.minLength - this.end;
                } // Check if changing the end by the given delta would result in the region being larger than maxLength

                if (
                  delta > 0 &&
                  this.end + delta - this.start > this.maxLength
                ) {
                  delta = this.maxLength - (this.end - this.start);
                }

                if (delta > 0 && this.end + delta > duration) {
                  delta = duration - this.end;
                }

                this.update(
                  {
                    start: Math.min(this.end + delta, this.start),
                    end: Math.max(this.end + delta, this.start),
                  },
                  eventParams
                );
              }
            }

            updateHandlesResize(resize) {
              let cursorStyle;

              if (resize) {
                cursorStyle = this.vertical ? 'row-resize' : 'col-resize';
              } else {
                cursorStyle = 'auto';
              }

              this.handleLeftEl &&
                this.style(this.handleLeftEl, {
                  cursor: cursorStyle,
                });
              this.handleRightEl &&
                this.style(this.handleRightEl, {
                  cursor: cursorStyle,
                });
            }
          }

          /***/
        },

      /******/
    };
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/ // Check if module is in cache
      /******/ var cachedModule = __webpack_module_cache__[moduleId];
      /******/ if (cachedModule !== undefined) {
        /******/ return cachedModule.exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (__webpack_module_cache__[moduleId] = {
        /******/ // no module.id needed
        /******/ // no module.loaded needed
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ __webpack_modules__[moduleId](
        module,
        module.exports,
        __webpack_require__
      );
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ (() => {
      /******/ // define getter functions for harmony exports
      /******/ __webpack_require__.d = (exports, definition) => {
        /******/ for (var key in definition) {
          /******/ if (
            __webpack_require__.o(definition, key) &&
            !__webpack_require__.o(exports, key)
          ) {
            /******/ Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key],
            });
            /******/
          }
          /******/
        }
        /******/
      };
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ (() => {
      /******/ __webpack_require__.o = (obj, prop) =>
        Object.prototype.hasOwnProperty.call(obj, prop);
      /******/
    })();
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ (() => {
      /******/ // define __esModule on exports
      /******/ __webpack_require__.r = (exports) => {
        /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module',
          });
          /******/
        }
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
      };
      /******/
    })();
    /******/
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      /*!*************************************!*\
  !*** ./src/plugin/regions/index.js ***!
  \*************************************/
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => /* binding */ RegionsPlugin,
        /* harmony export */
      });
      /* harmony import */ var _region_js__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(
          /*! ./region.js */ './src/plugin/regions/region.js'
        );
      /**
       *  @since 4.0.0 This class has been split
       *
       * @typedef {Object} RegionsPluginParams
       * @property {?boolean} dragSelection Enable creating regions by dragging with
       * the mouse
       * @property {?RegionParams[]} regions Regions that should be added upon
       * initialisation
       * @property {number} slop=2 The sensitivity of the mouse dragging
       * @property {?number} snapToGridInterval Snap the regions to a grid of the specified multiples in seconds
       * @property {?number} snapToGridOffset Shift the snap-to-grid by the specified seconds. May also be negative.
       * @property {?boolean} deferInit Set to true to manually call
       * @property {number} maxRegions Maximum number of regions that may be created by the user at one time.
       * `initPlugin('regions')`
       * @property {function} formatTimeCallback Allows custom formating for region tooltip.
       * @property {?number} edgeScrollWidth='5% from container edges' Optional width for edgeScroll to start
       */

      /**
       * @typedef {Object} RegionParams
       * @desc The parameters used to describe a region.
       * @example wavesurfer.addRegion(regionParams);
       * @property {string} id=→random The id of the region
       * @property {number} start=0 The start position of the region (in seconds).
       * @property {number} end=0 The end position of the region (in seconds).
       * @property {?boolean} loop Whether to loop the region when played back.
       * @property {boolean} drag=true Allow/disallow dragging the region.
       * @property {boolean} resize=true Allow/disallow resizing the region.
       * @property {string} [color='rgba(0, 0, 0, 0.1)'] HTML color code.
       * @property {?number} channelIdx Select channel to draw the region on (if there are multiple channel waveforms).
       * @property {?object} handleStyle A set of CSS properties used to style the left and right handle.
       * @property {?boolean} preventContextMenu=false Determines whether the context menu is prevented from being opened.
       * @property {boolean} showTooltip=true Enable/disable tooltip displaying start and end times when hovering over region.
       */

      /**
       * Regions are visual overlays on waveform that can be used to play and loop
       * portions of audio. Regions can be dragged and resized.
       *
       * Visual customization is possible via CSS (using the selectors
       * `.wavesurfer-region` and `.wavesurfer-handle`).
       *
       * @implements {PluginClass}
       * @extends {Observer}
       *
       * @example
       * // es6
       * import RegionsPlugin from 'wavesurfer.regions.js';
       *
       * // commonjs
       * var RegionsPlugin = require('wavesurfer.regions.js');
       *
       * // if you are using <script> tags
       * var RegionsPlugin = window.WaveSurfer.regions;
       *
       * // ... initialising wavesurfer with the plugin
       * var wavesurfer = WaveSurfer.create({
       *   // wavesurfer options ...
       *   plugins: [
       *     RegionsPlugin.create({
       *       // plugin options ...
       *     })
       *   ]
       * });
       */

      class RegionsPlugin {
        /**
         * Regions plugin definition factory
         *
         * This function must be used to create a plugin definition which can be
         * used by wavesurfer to correctly instantiate the plugin.
         *
         * @param {RegionsPluginParams} params parameters use to initialise the plugin
         * @return {PluginDefinition} an object representing the plugin
         */
        static create(params) {
          return {
            name: 'regions',
            deferInit: params && params.deferInit ? params.deferInit : false,
            params: params,
            staticProps: {
              addRegion(options) {
                if (!this.initialisedPluginList.regions) {
                  this.initPlugin('regions');
                }

                return this.regions.add(options);
              },

              clearRegions() {
                this.regions && this.regions.clear();
              },

              enableDragSelection(options) {
                if (!this.initialisedPluginList.regions) {
                  this.initPlugin('regions');
                }

                this.regions.enableDragSelection(options);
              },

              disableDragSelection() {
                this.regions.disableDragSelection();
              },
            },
            instance: RegionsPlugin,
          };
        }

        constructor(params, ws) {
          this.params = params;
          this.wavesurfer = ws;
          this.util = {
            ...ws.util,
            getRegionSnapToGridValue: (value) => {
              return this.getRegionSnapToGridValue(value, params);
            },
          };
          this.maxRegions = params.maxRegions;
          this.regionsMinLength = params.regionsMinLength || null; // turn the plugin instance into an observer

          const observerPrototypeKeys = Object.getOwnPropertyNames(
            this.util.Observer.prototype
          );
          observerPrototypeKeys.forEach((key) => {
            _region_js__WEBPACK_IMPORTED_MODULE_0__.Region.prototype[key] =
              this.util.Observer.prototype[key];
          });
          this.wavesurfer.Region =
            _region_js__WEBPACK_IMPORTED_MODULE_0__.Region; // By default, scroll the container if the user drags a region
          // within 5% (based on its initial size) of its edge

          const scrollWidthProportion = 0.05;

          this._onBackendCreated = () => {
            this.wrapper = this.wavesurfer.drawer.wrapper;
            this.orientation = this.wavesurfer.drawer.orientation;
            this.defaultEdgeScrollWidth =
              this.wrapper.clientWidth * scrollWidthProportion;

            if (this.params.regions) {
              this.params.regions.forEach((region) => {
                this.add(region);
              });
            }
          }; // Id-based hash of regions

          this.list = {};

          this._onReady = () => {
            this.wrapper = this.wavesurfer.drawer.wrapper;
            this.vertical = this.wavesurfer.drawer.params.vertical;

            if (this.params.dragSelection) {
              this.enableDragSelection(this.params);
            }

            Object.keys(this.list).forEach((id) => {
              this.list[id].updateRender();
            });
          };
        }

        init() {
          // Check if ws is ready
          if (this.wavesurfer.isReady) {
            this._onBackendCreated();

            this._onReady();
          } else {
            this.wavesurfer.once('ready', this._onReady);
            this.wavesurfer.once('backend-created', this._onBackendCreated);
          }
        }

        destroy() {
          this.wavesurfer.un('ready', this._onReady);
          this.wavesurfer.un('backend-created', this._onBackendCreated); // Disabling `region-removed' because destroying the plugin calls
          // the Region.remove() method that is also used to remove regions based
          // on user input. This can cause confusion since teardown is not a
          // user event, but would emit `region-removed` as if it was.

          this.wavesurfer.setDisabledEventEmissions(['region-removed']);
          this.disableDragSelection();
          this.clear();
        }
        /**
         * check to see if adding a new region would exceed maxRegions
         * @return {boolean} whether we should proceed and create a region
         * @private
         */

        wouldExceedMaxRegions() {
          return (
            this.maxRegions && Object.keys(this.list).length >= this.maxRegions
          );
        }
        /**
         * Add a region
         *
         * @param {object} params Region parameters
         * @return {Region} The created region
         */

        add(params) {
          if (this.wouldExceedMaxRegions()) {
            return null;
          }

          params = {
            edgeScrollWidth:
              this.params.edgeScrollWidth || this.defaultEdgeScrollWidth,
            ...params,
          }; // Take formatTimeCallback from plugin params if not already set

          if (!params.formatTimeCallback && this.params.formatTimeCallback) {
            params = {
              ...params,
              formatTimeCallback: this.params.formatTimeCallback,
            };
          }

          if (!params.minLength && this.regionsMinLength) {
            params = { ...params, minLength: this.regionsMinLength };
          }

          const region = new this.wavesurfer.Region(
            params,
            this.util,
            this.wavesurfer
          );
          this.list[region.id] = region;
          region.on('remove', () => {
            delete this.list[region.id];
          });
          return region;
        }
        /**
         * Remove all regions
         */

        clear() {
          Object.keys(this.list).forEach((id) => {
            this.list[id].remove();
          });
        }

        enableDragSelection(params) {
          this.disableDragSelection();
          const slop = params.slop || 2;
          const container = this.wavesurfer.drawer.container;
          const scroll =
            params.scroll !== false && this.wavesurfer.params.scrollParent;
          const scrollSpeed = params.scrollSpeed || 1;
          const scrollThreshold = params.scrollThreshold || 10;
          let drag;
          let duration = this.wavesurfer.getDuration();
          let maxScroll;
          let start;
          let region;
          let touchId;
          let pxMove = 0;
          let scrollDirection;
          let wrapperRect; // Scroll when the user is dragging within the threshold

          const edgeScroll = (e) => {
            if (!region || !scrollDirection) {
              return;
            } // Update scroll position

            let scrollLeft =
              this.wrapper.scrollLeft + scrollSpeed * scrollDirection;
            this.wrapper.scrollLeft = scrollLeft = Math.min(
              maxScroll,
              Math.max(0, scrollLeft)
            ); // Update range

            const end = this.wavesurfer.drawer.handleEvent(e);
            region.update({
              start: Math.min(end * duration, start * duration),
              end: Math.max(end * duration, start * duration),
            }); // Check that there is more to scroll and repeat

            if (scrollLeft < maxScroll && scrollLeft > 0) {
              window.requestAnimationFrame(() => {
                edgeScroll(e);
              });
            }
          };

          const eventDown = (e) => {
            if (e.touches && e.touches.length > 1) {
              return;
            }

            duration = this.wavesurfer.getDuration();
            touchId = e.targetTouches ? e.targetTouches[0].identifier : null; // Store for scroll calculations

            maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
            wrapperRect = this.util.withOrientation(
              this.wrapper.getBoundingClientRect(),
              this.vertical
            ); // set the region channel index based on the clicked area

            if (this.wavesurfer.params.splitChannels) {
              const y =
                (e.touches ? e.touches[0].clientY : e.clientY) -
                wrapperRect.top;
              const channelCount =
                this.wavesurfer.backend.buffer != null
                  ? this.wavesurfer.backend.buffer.numberOfChannels
                  : 1;
              const channelHeight = this.wrapper.clientHeight / channelCount;
              const channelIdx = Math.floor(y / channelHeight);
              params.channelIdx = channelIdx;
              const channelColors =
                this.wavesurfer.params.splitChannelsOptions.channelColors[
                  channelIdx
                ];

              if (channelColors && channelColors.dragColor) {
                params.color = channelColors.dragColor;
              }
            }

            drag = true;
            start = this.wavesurfer.drawer.handleEvent(e, true);
            region = null;
            scrollDirection = null;
          };

          this.wrapper.addEventListener('mousedown', eventDown);
          this.wrapper.addEventListener('touchstart', eventDown);
          this.on('disable-drag-selection', () => {
            this.wrapper.removeEventListener('touchstart', eventDown);
            this.wrapper.removeEventListener('mousedown', eventDown);
          });

          const eventUp = (e) => {
            if (e.touches && e.touches.length > 1) {
              return;
            }

            drag = false;
            pxMove = 0;
            scrollDirection = null;

            if (region) {
              this.util.preventClick();
              region.fireEvent('update-end', e);
              this.wavesurfer.fireEvent('region-update-end', region, e);
            }

            region = null;
          };

          this.wrapper.addEventListener('mouseleave', eventUp);
          this.wrapper.addEventListener('mouseup', eventUp);
          this.wrapper.addEventListener('touchend', eventUp);
          document.body.addEventListener('mouseup', eventUp);
          document.body.addEventListener('touchend', eventUp);
          this.on('disable-drag-selection', () => {
            document.body.removeEventListener('mouseup', eventUp);
            document.body.removeEventListener('touchend', eventUp);
            this.wrapper.removeEventListener('touchend', eventUp);
            this.wrapper.removeEventListener('mouseup', eventUp);
            this.wrapper.removeEventListener('mouseleave', eventUp);
          });

          const eventMove = (event) => {
            if (!drag) {
              return;
            }

            if (++pxMove <= slop) {
              return;
            }

            if (event.touches && event.touches.length > 1) {
              return;
            }

            if (
              event.targetTouches &&
              event.targetTouches[0].identifier != touchId
            ) {
              return;
            } // auto-create a region during mouse drag, unless region-count would exceed "maxRegions"

            if (!region) {
              region = this.add(params || {});

              if (!region) {
                return;
              }
            }

            const end = this.wavesurfer.drawer.handleEvent(event);
            const startUpdate =
              this.wavesurfer.regions.util.getRegionSnapToGridValue(
                start * duration
              );
            const endUpdate =
              this.wavesurfer.regions.util.getRegionSnapToGridValue(
                end * duration
              );
            region.update({
              start: Math.min(endUpdate, startUpdate),
              end: Math.max(endUpdate, startUpdate),
            });
            let orientedEvent = this.util.withOrientation(event, this.vertical); // If scrolling is enabled

            if (scroll && container.clientWidth < this.wrapper.scrollWidth) {
              // Check threshold based on mouse
              const x = orientedEvent.clientX - wrapperRect.left;

              if (x <= scrollThreshold) {
                scrollDirection = -1;
              } else if (x >= wrapperRect.right - scrollThreshold) {
                scrollDirection = 1;
              } else {
                scrollDirection = null;
              }

              scrollDirection && edgeScroll(event);
            }
          };

          this.wrapper.addEventListener('mousemove', eventMove);
          this.wrapper.addEventListener('touchmove', eventMove);
          this.on('disable-drag-selection', () => {
            this.wrapper.removeEventListener('touchmove', eventMove);
            this.wrapper.removeEventListener('mousemove', eventMove);
          });
          this.wavesurfer.on('region-created', (region) => {
            if (this.regionsMinLength) {
              region.minLength = this.regionsMinLength;
            }
          });
        }

        disableDragSelection() {
          this.fireEvent('disable-drag-selection');
        }
        /**
         * Get current region
         *
         * The smallest region that contains the current time. If several such
         * regions exist, take the first. Return `null` if none exist.
         *
         * @returns {Region} The current region
         */

        getCurrentRegion() {
          const time = this.wavesurfer.getCurrentTime();
          let min = null;
          Object.keys(this.list).forEach((id) => {
            const cur = this.list[id];

            if (cur.start <= time && cur.end >= time) {
              if (!min || cur.end - cur.start < min.end - min.start) {
                min = cur;
              }
            }
          });
          return min;
        }
        /**
         * Match the value to the grid, if required
         *
         * If the regions plugin params have a snapToGridInterval set, return the
         * value matching the nearest grid interval. If no snapToGridInterval is set,
         * the passed value will be returned without modification.
         *
         * @param {number} value the value to snap to the grid, if needed
         * @param {Object} params the regions plugin params
         * @returns {number} value
         */

        getRegionSnapToGridValue(value, params) {
          if (params.snapToGridInterval) {
            // the regions should snap to a grid
            const offset = params.snapToGridOffset || 0;
            return (
              Math.round((value - offset) / params.snapToGridInterval) *
                params.snapToGridInterval +
              offset
            );
          } // no snap-to-grid

          return value;
        }
      }
    })();

    /******/ return __webpack_exports__;
    /******/
  })();
});
//# sourceMappingURL=wavesurfer.regions.js.map
