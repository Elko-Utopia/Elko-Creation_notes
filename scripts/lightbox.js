const DEFAULT_SELECTOR = 'main img';

const boundImages = new WeakSet();
const registeredSelectors = new Set();

let overlayEl;
let stageEl;
let imageEl;
let observer;
let openRequestId = 0;

let isOpen = false;
let skipCloseClick = false;
let scrollLockSnapshot = null;

const settings = {
  viewportPadding: 48,
  transitionDurationMs: 150,
};

const state = {
  naturalWidth: 0,
  naturalHeight: 0,
  scale: 1,
  initialScale: 1,
  minScale: 0.5,
  maxScale: 3,
  translateX: 0,
  translateY: 0,
};

const pointerState = {
  active: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  originX: 0,
  originY: 0,
  longPressTimer: 0,
  dragReady: false,
  hasDragged: false,
};

/**
 * 初始化轻量灯箱并绑定选择器对应的图片。
 */
function initLightbox({ selector = DEFAULT_SELECTOR, viewportPadding, transitionDuration } = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const normalized = typeof selector === 'string' && selector.trim() ? selector.trim() : DEFAULT_SELECTOR;

  if (typeof viewportPadding === 'number' && Number.isFinite(viewportPadding)) {
    settings.viewportPadding = Math.max(0, viewportPadding);
  }
  if (typeof transitionDuration === 'number' && Number.isFinite(transitionDuration)) {
    settings.transitionDurationMs = clamp(transitionDuration, 80, 320);
    applyTransitionDuration();
  }

  ensureOverlay();
  bindImages(normalized);
  registeredSelectors.add(normalized);
  ensureObserver();
}

function ensureOverlay() {
  if (overlayEl) return;

  overlayEl = document.createElement('div');
  overlayEl.className = 'lb-overlay';
  overlayEl.setAttribute('aria-hidden', 'true');
  overlayEl.setAttribute('aria-modal', 'true');
  overlayEl.setAttribute('role', 'dialog');
  overlayEl.setAttribute('tabindex', '-1');

  stageEl = document.createElement('div');
  stageEl.className = 'lb-stage';

  imageEl = document.createElement('img');
  imageEl.className = 'lb-image';
  imageEl.alt = '';
  imageEl.decoding = 'async';
  imageEl.draggable = false;

  stageEl.appendChild(imageEl);
  overlayEl.appendChild(stageEl);

  if (document.body) {
    document.body.appendChild(overlayEl);
  } else {
    window.addEventListener(
      'DOMContentLoaded',
      () => {
        if (!overlayEl.isConnected) {
          document.body.appendChild(overlayEl);
        }
      },
      { once: true }
    );
  }

  overlayEl.addEventListener('click', onOverlayClick);
  overlayEl.addEventListener('wheel', onWheel, { passive: false });

  imageEl.addEventListener('pointerdown', onPointerDown);
  imageEl.addEventListener('pointermove', onPointerMove);
  imageEl.addEventListener('pointerup', onPointerUp);
  imageEl.addEventListener('pointercancel', onPointerCancel);
  imageEl.addEventListener('lostpointercapture', onPointerCancel);

  applyTransitionDuration();
}

function bindImages(selector) {
  document.querySelectorAll(selector).forEach(bindImage);
}

function bindImage(node) {
  if (!(node instanceof HTMLImageElement)) return;
  if (boundImages.has(node)) return;

  boundImages.add(node);
  node.addEventListener('click', onImageClick);
}

function ensureObserver() {
  if (observer || typeof MutationObserver === 'undefined') return;

  observer = new MutationObserver((mutations) => {
    if (!registeredSelectors.size) return;
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        scanNodeForImages(node);
      });
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
}

function applyTransitionDuration() {
  if (!overlayEl) return;
  overlayEl.style.setProperty('--lb-duration', `${settings.transitionDurationMs}ms`);
}

function lockScroll() {
  console.log('� 使用改进的滚动锁定');
  if (scrollLockSnapshot || typeof window === 'undefined') return;
  const body = document.body;
  const docEl = document.documentElement;
  if (!body || !docEl) return;

  // 保存当前滚动位置
  const currentScrollY = window.scrollY;
  const currentScrollX = window.scrollX;
  
  const scrollbarWidth = window.innerWidth - docEl.clientWidth;
  scrollLockSnapshot = {
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
    docOverflow: docEl.style.overflow,
    appliedPadding: 0,
    savedScrollY: currentScrollY,  // 保存滚动位置
    savedScrollX: currentScrollX
  };

  // 只锁定body，不锁定documentElement，避免触发重排
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${currentScrollY}px`;
  body.style.left = `-${currentScrollX}px`;
  body.style.width = '100%';

  if (scrollbarWidth > 0) {
    const computedPadding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const newPadding = computedPadding + scrollbarWidth;
    body.style.paddingRight = `${newPadding}px`;
    scrollLockSnapshot.appliedPadding = scrollbarWidth;
  }
}

function unlockScroll() {
  console.log('� 使用改进的滚动解锁');
  if (!scrollLockSnapshot) return;
  const body = document.body;
  const docEl = document.documentElement;
  
  if (body) {
    // 恢复body样式
    body.style.overflow = scrollLockSnapshot.bodyOverflow || '';
    body.style.paddingRight = scrollLockSnapshot.bodyPaddingRight || '';
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.width = '';
    
    // 恢复滚动位置
    window.scrollTo(scrollLockSnapshot.savedScrollX || 0, scrollLockSnapshot.savedScrollY || 0);
  }
  
  scrollLockSnapshot = null;
}

function primeWithPreview(triggerImage) {
  if (!triggerImage) return false;

  const previewSrc = triggerImage.currentSrc || triggerImage.src;
  if (!previewSrc) return false;

  const rect = triggerImage.getBoundingClientRect();
  const naturalW = triggerImage.naturalWidth || triggerImage.width || rect.width;
  const naturalH = triggerImage.naturalHeight || triggerImage.height || rect.height;

  if (!naturalW || !naturalH) return false;

  state.naturalWidth = naturalW;
  state.naturalHeight = naturalH;
  state.scale = 1;
  state.translateX = 0;
  state.translateY = 0;

  imageEl.src = previewSrc;
  imageEl.alt = triggerImage.alt || '';
  imageEl.style.width = `${state.naturalWidth}px`;
  imageEl.style.height = `${state.naturalHeight}px`;
  configureStageDimensions(false);
  return true;
}

function scanNodeForImages(node) {
  registeredSelectors.forEach((selector) => {
    if (node.matches(selector)) {
      bindImage(node);
    }
    node.querySelectorAll(selector).forEach(bindImage);
  });
}

function onImageClick(event) {
  console.log('🎯 lightbox onImageClick 被调用！', event.currentTarget);
  if (event.button && event.button !== 0) return;
  event.preventDefault();

  const target = event.currentTarget;
  if (!(target instanceof HTMLImageElement)) return;

  console.log('🎯 准备调用 openLightbox', target);
  openLightbox(target);
}

async function openLightbox(triggerImage) {
  console.log('🚀 openLightbox 被调用！', triggerImage);
  if (isOpen || !triggerImage) return;

  const source = resolveSource(triggerImage);
  console.log('🔍 resolved source:', source);
  if (!source) return;

  const requestId = ++openRequestId;

  isOpen = true;
  overlayEl.setAttribute('aria-hidden', 'false');
  overlayEl.classList.add('lb-open');
  skipCloseClick = false;
  lockScroll();

  state.naturalWidth = 0;
  state.naturalHeight = 0;
  state.scale = 1;
  state.translateX = 0;
  state.translateY = 0;
  const previewApplied = primeWithPreview(triggerImage);

  if (!previewApplied) {
    imageEl.src = '';
    imageEl.alt = '';
    imageEl.style.width = '0px';
    imageEl.style.height = '0px';
    applyTransform();
  }

  try {
    const loaded = await loadSourceImage(triggerImage, source);
    if (!isOpen || requestId !== openRequestId) {
      return;
    }

    state.naturalWidth = loaded.width;
    state.naturalHeight = loaded.height;
    state.scale = 1;
    state.initialScale = 1;
    state.translateX = 0;
    state.translateY = 0;

    imageEl.src = loaded.src;
    imageEl.alt = loaded.alt;
    imageEl.style.width = `${state.naturalWidth}px`;
    imageEl.style.height = `${state.naturalHeight}px`;

    configureStageDimensions(false);

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', handleResize);
    // 彻底移除focus调用 - 用其他方式实现键盘支持
    console.log('🚫 彻底跳过所有focus调用');
    
    // 手动添加键盘支持，不依赖focus
    overlayEl.setAttribute('tabindex', '-1');
    overlayEl.style.outline = 'none';
  } catch (error) {
    console.error('[lightbox] failed to load image', error);
    closeLightbox();
  }
}

function closeLightbox() {
  if (!isOpen) return;

  isOpen = false;
  overlayEl.classList.remove('lb-open');
  if (document.activeElement === overlayEl) {
    overlayEl.blur();
  }
  overlayEl.setAttribute('aria-hidden', 'true');
  imageEl.src = '';
  imageEl.alt = '';
  imageEl.style.width = '0px';
  imageEl.style.height = '0px';
  state.scale = 1;
  state.translateX = 0;
  state.translateY = 0;
  applyTransform();

  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('resize', handleResize);
  unlockScroll();

  state.naturalWidth = 0;
  state.naturalHeight = 0;

  window.clearTimeout(pointerState.longPressTimer);
  pointerState.active = false;
  pointerState.pointerId = null;
  pointerState.longPressTimer = 0;
  pointerState.dragReady = false;
  pointerState.hasDragged = false;
  skipCloseClick = false;
}

function onOverlayClick(event) {
  if (!isOpen) return;
  if (skipCloseClick) {
    skipCloseClick = false;
    return;
  }
  event.preventDefault();
  closeLightbox();
}

function onKeyDown(event) {
  if (!isOpen) return;
  if (event.key === 'Escape' || event.key === 'Esc') {
    event.preventDefault();
    closeLightbox();
  }
}

function handleResize() {
  if (!isOpen || !state.naturalWidth || !state.naturalHeight) return;
  configureStageDimensions(true);
}

function configureStageDimensions(maintainCurrentView) {
  const paddingLimit = Math.min(settings.viewportPadding, Math.min(window.innerWidth, window.innerHeight) / 2);
  const viewportW = Math.max(1, window.innerWidth - paddingLimit * 2);
  const viewportH = Math.max(1, window.innerHeight - paddingLimit * 2);

  const stageWidth = Math.max(1, Math.min(state.naturalWidth, viewportW));
  const stageHeight = Math.max(1, Math.min(state.naturalHeight, viewportH));

  stageEl.style.width = `${stageWidth}px`;
  stageEl.style.height = `${stageHeight}px`;

  const fitScale = Math.min(stageWidth / state.naturalWidth, stageHeight / state.naturalHeight, 1);

  state.initialScale = fitScale;
  state.minScale = Math.min(fitScale, 0.5);
  state.maxScale = 3;

  if (!maintainCurrentView) {
    state.scale = fitScale;
    state.translateX = (stageWidth - state.naturalWidth * state.scale) / 2;
    state.translateY = (stageHeight - state.naturalHeight * state.scale) / 2;
  } else {
    state.scale = clamp(state.scale, state.minScale, state.maxScale);
    constrainTranslation();
  }

  applyTransform();
}

/**
 * 鼠标滚轮缩放需要确保光标下的像素不漂移，
 * 因此缩放前记录光标对应的图像坐标，再重新解新的平移量。
 */
function onWheel(event) {
  if (!isOpen) return;
  event.preventDefault();

  if (!state.naturalWidth) return;

  const rect = stageEl.getBoundingClientRect();
  const offsetX = clamp(event.clientX - rect.left, 0, rect.width);
  const offsetY = clamp(event.clientY - rect.top, 0, rect.height);

  const scaleFactor = computeWheelScale(event);
  const nextScale = clamp(state.scale * scaleFactor, state.minScale, state.maxScale);
  if (Math.abs(nextScale - state.scale) < 1e-4) return;

  const imageX = (offsetX - state.translateX) / state.scale;
  const imageY = (offsetY - state.translateY) / state.scale;

  state.scale = nextScale;
  state.translateX = offsetX - imageX * state.scale;
  state.translateY = offsetY - imageY * state.scale;

  constrainTranslation();
  applyTransform();
}

/**
 * 长按激活拖拽，松开后解除 pointer capture，拖拽只影响视觉平移。
 */
function onPointerDown(event) {
  if (!isOpen || event.button !== 0) return;

  pointerState.active = true;
  pointerState.pointerId = event.pointerId;
  pointerState.startX = event.clientX;
  pointerState.startY = event.clientY;
  pointerState.originX = state.translateX;
  pointerState.originY = state.translateY;
  pointerState.hasDragged = false;
  pointerState.dragReady = false;

  window.clearTimeout(pointerState.longPressTimer);
  pointerState.longPressTimer = window.setTimeout(() => {
    pointerState.dragReady = true;
  }, 180);

  try {
    imageEl.setPointerCapture(event.pointerId);
  } catch (_) {
    // pointer capture 在部分浏览器上可能不支持，忽略即可。
  }
}

function onPointerMove(event) {
  if (!pointerState.active || event.pointerId !== pointerState.pointerId) return;

  const deltaX = event.clientX - pointerState.startX;
  const deltaY = event.clientY - pointerState.startY;

  if (!pointerState.dragReady) {
    return;
  }

  if (!pointerState.hasDragged) {
    pointerState.hasDragged = true;
  }

  state.translateX = pointerState.originX + deltaX;
  state.translateY = pointerState.originY + deltaY;
  constrainTranslation();
  applyTransform();
  skipCloseClick = true;
}

function onPointerUp(event) {
  if (!pointerState.active || event.pointerId !== pointerState.pointerId) return;

  window.clearTimeout(pointerState.longPressTimer);
  pointerState.longPressTimer = 0;

  try {
    imageEl.releasePointerCapture(event.pointerId);
  } catch (_) {
    // 捕获可能未开启，忽略错误。
  }

  if (pointerState.hasDragged) {
    skipCloseClick = true;
    window.setTimeout(() => {
      skipCloseClick = false;
    }, 0);
  }

  pointerState.active = false;
  pointerState.pointerId = null;
  pointerState.hasDragged = false;
  pointerState.dragReady = false;
}

function onPointerCancel(event) {
  if (pointerState.pointerId !== null && event.pointerId !== pointerState.pointerId) {
    return;
  }

  window.clearTimeout(pointerState.longPressTimer);
  pointerState.longPressTimer = 0;
  pointerState.active = false;
  pointerState.pointerId = null;
  pointerState.hasDragged = false;
  pointerState.dragReady = false;

  try {
    if (event.pointerId !== undefined) {
      imageEl.releasePointerCapture(event.pointerId);
    }
  } catch (_) {
    // 忽略。
  }
}

function applyTransform() {
  imageEl.style.transform = `translate3d(${state.translateX}px, ${state.translateY}px, 0) scale(${state.scale})`;
}

function constrainTranslation() {
  const stageWidth = stageEl.clientWidth;
  const stageHeight = stageEl.clientHeight;

  const displayWidth = state.naturalWidth * state.scale;
  const displayHeight = state.naturalHeight * state.scale;

  const minX = Math.min(0, stageWidth - displayWidth);
  const maxX = Math.max(0, stageWidth - displayWidth);
  const minY = Math.min(0, stageHeight - displayHeight);
  const maxY = Math.max(0, stageHeight - displayHeight);

  state.translateX = clamp(state.translateX, minX, maxX);
  state.translateY = clamp(state.translateY, minY, maxY);
}

function computeWheelScale(event) {
  const { deltaY, deltaMode } = event;
  if (deltaY === 0) return 1;

  const step = deltaMode === 1 ? 0.2 : deltaMode === 2 ? 0.45 : 0.0025;
  return Math.exp(-deltaY * step);
}

function resolveSource(image) {
  if (image.dataset && image.dataset.lightboxSrc) {
    return image.dataset.lightboxSrc;
  }
  return image.currentSrc || image.src || null;
}

function loadSourceImage(original, src) {
  return new Promise((resolve, reject) => {
    const loader = new Image();
    loader.decoding = 'async';

    if (original && original.crossOrigin) {
      loader.crossOrigin = original.crossOrigin;
    }
    if (original && original.referrerPolicy) {
      loader.referrerPolicy = original.referrerPolicy;
    }
    if (original && original.srcset) {
      loader.srcset = original.srcset;
      if (original.sizes) {
        loader.sizes = original.sizes;
      }
    }

    loader.addEventListener(
      'load',
      () => {
        const finalize = () =>
          resolve({
            src: loader.currentSrc || loader.src,
            width: loader.naturalWidth,
            height: loader.naturalHeight,
            alt: original ? original.alt || '' : '',
          });

        if (typeof loader.decode === 'function') {
          loader.decode().then(finalize).catch(finalize);
        } else {
          finalize();
        }
      },
      { once: true }
    );

    loader.addEventListener('error', reject, { once: true });
    loader.src = src;
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// 使initLightbox在全局作用域中可用
window.initLightbox = initLightbox;

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
});
