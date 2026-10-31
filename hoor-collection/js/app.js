// ============================================================
// HOOR COLLECTION — LUXURY APPLICATION ENGINE (IQ2000 EDITION)
// ============================================================

// Global UI State
let activeStitchingType = 'ready-to-wear';
let activeSize = 'M';
let activeMeasurements = null;
let activeQuantity = 1;
let currentPDPProduct = null;
let currentPDPImageIndex = 0;
let searchDebounceTimer = null;

// ============================================================
// ROUTING ENGINE
// ============================================================
function initRouter() {
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

function handleHashChange() {
  const hash = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const route = parts[0];
  const param = parts[1];

  switch (route) {
    case 'listing':
      AppState.currentPage = 'listing';
      renderListingPage(param);
      break;
    case 'product':
      AppState.currentPage = 'product';
      renderPDP(param);
      break;
    case 'lookbook':
      AppState.currentPage = 'lookbook';
      renderLookbookPage();
      break;
    case 'about':
      AppState.currentPage = 'about';
      renderAboutPage();
      break;
    case 'contact':
      AppState.currentPage = 'contact';
      renderContactPage();
      break;
    case 'home':
    default:
      AppState.currentPage = 'home';
      renderHomePage();
      break;
  }

  updateNavLinks();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTo(page, params = {}) {
  let hash = page;
  if (page === 'product' && params.slug) {
    hash = `product/${params.slug}`;
  } else if (page === 'listing' && params.category) {
    hash = `listing/${encodeURIComponent(params.category)}`;
  }
  window.location.hash = hash;
}

function updateNavLinks() {
  document.querySelectorAll('[data-nav-link]').forEach(el => {
    const linkPage = el.getAttribute('data-nav-link');
    el.classList.toggle('is-active', linkPage === AppState.currentPage);
  });
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCustomCursor() {
  const ring = document.getElementById('cursor-ring');
  const dot = document.getElementById('cursor-dot');
  if (!ring || !dot) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.setAttribute('data-cursor-visible', 'true');
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  document.addEventListener('mouseleave', () => {
    document.body.removeAttribute('data-cursor-visible');
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  window.addEventListener('mousedown', () => ring.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => ring.classList.remove('is-clicking'));

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, input, select, textarea, .product-card, .lookbook-item, .fit-card, [role="button"]');
    if (target) {
      ring.classList.add('is-link');
    } else {
      ring.classList.remove('is-link');
    }
  });
}

// ============================================================
// 3D CARD TILT EFFECT
// ============================================================
function init3DTilt() {
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
  });

  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.product-card');
    if (card && !card.contains(e.relatedTarget)) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s var(--ease-luxury)';
    }
  });
}

// ============================================================
// HEADER SCROLL BLUR & SCROLL TOP
// ============================================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const scrollBtn = document.getElementById('scroll-top-btn');

  function onScroll() {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }

    if (window.scrollY > 300) {
      scrollBtn?.classList.add('is-visible');
    } else {
      scrollBtn?.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================
// CURRENCY SWITCHER
// ============================================================
function setCurrency(newCurrency) {
  if (!CONFIG.currency.available.includes(newCurrency)) return;
  AppState.currency = newCurrency;
  localStorage.setItem('hoor-currency', newCurrency);

  document.querySelectorAll('.current-currency-text').forEach(el => {
    el.textContent = newCurrency;
  });

  if (AppState.currentPage === 'home') renderHomePage();
  else if (AppState.currentPage === 'listing') renderListingPage();
  else if (AppState.currentPage === 'product' && currentPDPProduct) renderPDP(currentPDPProduct.slug);
  else if (AppState.currentPage === 'lookbook') renderLookbookPage();

  renderCartDrawer();
  renderWishlistDrawer();
  showToast({ type: 'info', title: 'Currency Changed', description: `Display currency set to ${newCurrency}` });
}

// ============================================================
// CART DRAWER
// ============================================================
function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ============================================================
// FILTER DRAWER
// ============================================================
function openFilterDrawer() {
  const drawer = document.getElementById('filter-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeFilterDrawer() {
  const drawer = document.getElementById('filter-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('is-open');
  if (backdrop && !document.getElementById('cart-drawer')?.classList.contains('is-open') && !document.getElementById('wishlist-drawer')?.classList.contains('is-open')) {
    backdrop.classList.remove('is-open');
  }
  document.body.style.overflow = '';
}

// ============================================================
// MOBILE MENU DRAWER
// ============================================================
function openMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('drawer-backdrop');
  if (menu) menu.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('drawer-backdrop');
  if (menu) menu.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ============================================================
// SEARCH OVERLAY & FUZZY SEARCH
// ============================================================
function openSearchDrawer() {
  const overlay = document.getElementById('search-overlay');
  const input = document.getElementById('search-input');
  if (overlay) overlay.classList.add('is-open');
  if (input) {
    input.value = '';
    setTimeout(() => input.focus(), 100);
  }
  renderSearchResults('');
  document.body.style.overflow = 'hidden';
}

function closeSearchDrawer() {
  const overlay = document.getElementById('search-overlay');
  if (overlay) overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

function handleSearchInput(query) {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    renderSearchResults(query.trim());
  }, 200);
}

function renderSearchResults(query) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  if (!query) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--charcoal-500)">
        <p style="font-size:1.1rem;margin-bottom:1rem">Curated Collections & Silhouettes</p>
        <div style="display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap">
          <button class="badge badge-emerald" onclick="document.getElementById('search-input').value='Kaftan';renderSearchResults('Kaftan')">Kaftan</button>
          <button class="badge badge-bridal" onclick="document.getElementById('search-input').value='Bridal';renderSearchResults('Bridal')">Bridal</button>
          <button class="badge badge-emerald" onclick="document.getElementById('search-input').value='Raw Silk';renderSearchResults('Raw Silk')">Raw Silk</button>
          <button class="badge badge-emerald" onclick="document.getElementById('search-input').value='Viscose';renderSearchResults('Viscose')">Viscose</button>
          <button class="badge badge-emerald" onclick="document.getElementById('search-input').value='Plazo';renderSearchResults('Plazo')">Plazo</button>
          <button class="badge badge-gold" onclick="document.getElementById('search-input').value='Chunnari';renderSearchResults('Chunnari')">Chunnari</button>
        </div>
      </div>`;
    return;
  }

  const q = query.toLowerCase();
  const matches = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.subtitle.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.fabric.primary.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );

  if (!matches.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:4rem 1rem;color:var(--charcoal-500)">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 1rem;color:var(--charcoal-400)"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h4 class="font-serif" style="font-size:1.4rem;color:var(--emerald-900);margin-bottom:.5rem">No creations found</h4>
        <p style="font-size:.9rem">We couldn't find matches for "${escapeHtml(query)}". Try searching "Kaftan", "Bridal", or "Silk".</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="margin-bottom:1rem;font-size:.875rem;color:var(--charcoal-500)">
      Found ${matches.length} exquisite ${matches.length === 1 ? 'creation' : 'creations'}
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem">
      ${matches.map(p => `
        <div class="search-result-card" onclick="closeSearchDrawer();navigateTo('product',{slug:'${p.slug}'})" style="display:flex;gap:1rem;background:white;padding:.75rem;border-radius:1rem;border:1px solid var(--charcoal-200);cursor:pointer;transition:transform .2s,box-shadow .2s">
          <img src="${p.images[0].src}" alt="${escapeHtml(p.title)}" style="width:70px;height:90px;object-fit:cover;border-radius:.5rem;flex-shrink:0">
          <div>
            <span class="badge ${p.badge==='BRIDAL'?'badge-bridal':'badge-gold'}" style="font-size:.6rem;padding:.15rem .5rem">${p.category}</span>
            <div style="font-weight:600;font-family:var(--font-serif);font-size:1.05rem;color:var(--emerald-900);margin-top:.25rem">${escapeHtml(p.title)}</div>
            <div style="font-size:.8rem;color:var(--charcoal-500)">${escapeHtml(p.subtitle)}</div>
            <div style="font-weight:700;color:var(--gold-600);margin-top:.25rem">${formatPrice(getProductPrice(p))}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

// ============================================================
// STITCHING MATRIX MODAL
// ============================================================
function openStitchingModal() {
  const modal = document.getElementById('stitching-modal');
  if (!modal) return;

  if (activeMeasurements) {
    ['bust', 'waist', 'hips', 'shirtLength', 'sleeves', 'shoulder'].forEach(f => {
      const input = document.getElementById(`measure-${f}`);
      if (input && activeMeasurements[f]) input.value = activeMeasurements[f];
    });
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeStitchingModal() {
  const modal = document.getElementById('stitching-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function saveCustomMeasurements() {
  const fields = ['bust', 'waist', 'hips', 'shirtLength', 'sleeves', 'shoulder'];
  const vals = {};
  let hasEmpty = false;

  fields.forEach(f => {
    const input = document.getElementById(`measure-${f}`);
    if (input) {
      const v = input.value.trim();
      vals[f] = v;
      if (!v) {
        input.classList.add('has-error');
        hasEmpty = true;
      } else {
        input.classList.remove('has-error');
      }
    }
  });

  if (hasEmpty) {
    showToast({ type: 'error', title: 'Missing Measurements', description: 'Please fill in all 6 measurements (in inches) for custom tailoring.' });
    return;
  }

  activeMeasurements = vals;
  closeStitchingModal();

  const summaryEl = document.getElementById('pdp-measurement-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="padding:1rem;background:var(--cream-100);border-radius:.75rem;border:1px solid var(--gold-300);margin-top:1rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem">
          <span style="font-weight:600;color:var(--emerald-900);font-size:.85rem">✓ Bespoke Measurements Recorded:</span>
          <button onclick="openStitchingModal()" style="font-size:.75rem;color:var(--gold-600);text-decoration:underline">Edit</button>
        </div>
        <div style="font-size:.8rem;color:var(--charcoal-600);line-height:1.6">
          Bust: ${vals.bust}" | Waist: ${vals.waist}" | Hips: ${vals.hips}" | Length: ${vals.shirtLength}" | Sleeves: ${vals.sleeves}" | Shoulder: ${vals.shoulder}"
        </div>
      </div>`;
  }

  showToast({ type: 'success', title: 'Measurements Saved', description: 'Your custom tailoring dimensions have been saved.' });
}

// ============================================================
// SIZE GUIDE MODAL
// ============================================================
function openSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ============================================================
// HIGH-RESOLUTION LIGHTBOX INSPECTOR (EMBROIDERY ZOOM)
// ============================================================
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(src, index = 0) {
  if (!currentPDPProduct) return;
  currentLightboxImages = currentPDPProduct.images || [];
  currentLightboxIndex = index >= 0 ? index : 0;

  const modal = document.getElementById('lightbox-modal');
  const activeImg = document.getElementById('lightbox-active-img');
  const title = document.getElementById('lightbox-title');
  const caption = document.getElementById('lightbox-caption');
  const thumbs = document.getElementById('lightbox-thumbs');
  const stage = document.getElementById('lightbox-stage');

  if (!modal || !activeImg) return;

  stage?.classList.remove('is-zoomed');
  activeImg.src = src || currentLightboxImages[currentLightboxIndex].src;
  if (title) title.textContent = `${currentPDPProduct.title} — High-Definition Embroidery Inspector`;
  if (caption) caption.textContent = `${currentPDPProduct.fabric.primary} · ${currentPDPProduct.work.type} (Click image to toggle 2.5x magnification)`;

  if (thumbs) {
    thumbs.innerHTML = currentLightboxImages.map((img, idx) => `
      <div class="lightbox-thumb ${idx === currentLightboxIndex ? 'is-active' : ''}" onclick="switchLightboxImage(${idx})">
        <img src="${img.src}" alt="${escapeHtml(img.alt || '')}">
      </div>
    `).join('');
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function switchLightboxImage(idx) {
  if (!currentLightboxImages[idx]) return;
  currentLightboxIndex = idx;
  const stage = document.getElementById('lightbox-stage');
  stage?.classList.remove('is-zoomed');
  const img = document.getElementById('lightbox-active-img');
  if (img) img.src = currentLightboxImages[idx].src;

  document.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
    t.classList.toggle('is-active', i === idx);
  });
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function toggleLightboxZoom() {
  const stage = document.getElementById('lightbox-stage');
  stage?.classList.toggle('is-zoomed');
}

function lightboxNext() {
  if (!currentLightboxImages.length) return;
  const nextIdx = (currentLightboxIndex + 1) % currentLightboxImages.length;
  switchLightboxImage(nextIdx);
}

function lightboxPrev() {
  if (!currentLightboxImages.length) return;
  const prevIdx = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
  switchLightboxImage(prevIdx);
}

window.addEventListener('keydown', (e) => {
  if (document.getElementById('lightbox-modal')?.classList.contains('is-open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
  }
});

// ============================================================
// SMART FIT & SILHOUETTE RECOMMENDER
// ============================================================
const fitState = {
  height: 'regular',
  bust: '36',
  silhouette: 'relaxed'
};

function openFitAssistant() {
  const modal = document.getElementById('fit-modal');
  if (!modal) return;
  renderFitStep(1);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeFitAssistant() {
  const modal = document.getElementById('fit-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function renderFitStep(step) {
  const body = document.getElementById('fit-modal-body');
  const footer = document.getElementById('fit-modal-footer');
  if (!body) return;

  if (step === 1) {
    body.innerHTML = `
      <div style="text-align:center;margin-bottom:1.5rem">
        <span style="font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Step 1 of 3</span>
        <h4 class="font-serif" style="font-size:1.3rem;color:var(--emerald-900);margin-top:.25rem">What is your height stature?</h4>
        <p style="font-size:.85rem;color:var(--charcoal-500)">Crucial for calculating kaftan length and trouser fall</p>
      </div>
      <div class="fit-option-grid">
        <div class="fit-card ${fitState.height==='petite'?'is-selected':''}" onclick="fitState.height='petite';renderFitStep(2)">
          <div style="font-size:1.5rem">🌸</div>
          <div style="font-weight:600;margin-top:.5rem">Petite</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Under 5'3" (160 cm)</div>
        </div>
        <div class="fit-card ${fitState.height==='regular'?'is-selected':''}" onclick="fitState.height='regular';renderFitStep(2)">
          <div style="font-size:1.5rem">✨</div>
          <div style="font-weight:600;margin-top:.5rem">Regular</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">5'3" to 5'7" (160-170 cm)</div>
        </div>
        <div class="fit-card ${fitState.height==='tall'?'is-selected':''}" onclick="fitState.height='tall';renderFitStep(2)">
          <div style="font-size:1.5rem">👑</div>
          <div style="font-weight:600;margin-top:.5rem">Tall</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">5'7"+ (170+ cm)</div>
        </div>
      </div>
    `;
    if (footer) footer.innerHTML = `<button class="btn btn-outline" onclick="closeFitAssistant()">Cancel</button>`;
  } else if (step === 2) {
    body.innerHTML = `
      <div style="text-align:center;margin-bottom:1.5rem">
        <span style="font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Step 2 of 3</span>
        <h4 class="font-serif" style="font-size:1.3rem;color:var(--emerald-900);margin-top:.25rem">Your bust measurement range:</h4>
        <p style="font-size:.85rem;color:var(--charcoal-500)">Measured around the fullest point of your chest</p>
      </div>
      <div class="fit-option-grid" style="grid-template-columns:repeat(2,1fr)">
        <div class="fit-card ${fitState.bust==='34'?'is-selected':''}" onclick="fitState.bust='34';renderFitStep(3)">
          <div style="font-weight:700">32" - 35"</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Equivalent to UK 8-10 / US 4-6</div>
        </div>
        <div class="fit-card ${fitState.bust==='37'?'is-selected':''}" onclick="fitState.bust='37';renderFitStep(3)">
          <div style="font-weight:700">36" - 39"</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Equivalent to UK 12-14 / US 8-10</div>
        </div>
        <div class="fit-card ${fitState.bust==='41'?'is-selected':''}" onclick="fitState.bust='41';renderFitStep(3)">
          <div style="font-weight:700">40" - 43"</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Equivalent to UK 16 / US 12</div>
        </div>
        <div class="fit-card ${fitState.bust==='45'?'is-selected':''}" onclick="fitState.bust='45';renderFitStep(3)">
          <div style="font-weight:700">44"+</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Equivalent to UK 18+ / US 14+</div>
        </div>
      </div>
    `;
    if (footer) footer.innerHTML = `<button class="btn btn-outline" onclick="renderFitStep(1)">← Back</button>`;
  } else if (step === 3) {
    body.innerHTML = `
      <div style="text-align:center;margin-bottom:1.5rem">
        <span style="font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Step 3 of 3</span>
        <h4 class="font-serif" style="font-size:1.3rem;color:var(--emerald-900);margin-top:.25rem">Preferred silhouette drape:</h4>
        <p style="font-size:.85rem;color:var(--charcoal-500)">How do you like this piece to fit your posture?</p>
      </div>
      <div class="fit-option-grid" style="grid-template-columns:1fr 1fr">
        <div class="fit-card ${fitState.silhouette==='relaxed'?'is-selected':''}" onclick="fitState.silhouette='relaxed';calculateFitResult()">
          <div style="font-size:1.5rem">🌊</div>
          <div style="font-weight:600;margin-top:.5rem">Fluid Royal Drape</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Relaxed, flowing silhouette (Signature Kaftan look)</div>
        </div>
        <div class="fit-card ${fitState.silhouette==='tailored'?'is-selected':''}" onclick="fitState.silhouette='tailored';calculateFitResult()">
          <div style="font-size:1.5rem">✂️</div>
          <div style="font-weight:600;margin-top:.5rem">Structured Tailored</div>
          <div style="font-size:.75rem;color:var(--charcoal-500)">Fitted shoulders with contoured waistline</div>
        </div>
      </div>
    `;
    if (footer) footer.innerHTML = `<button class="btn btn-outline" onclick="renderFitStep(2)">← Back</button>`;
  }
}

function calculateFitResult() {
  const body = document.getElementById('fit-modal-body');
  const footer = document.getElementById('fit-modal-footer');
  if (!body) return;

  let recommendedSize = 'M';
  let isCustomRecommended = false;

  if (fitState.bust === '34') {
    recommendedSize = fitState.silhouette === 'tailored' ? 'S' : 'M';
  } else if (fitState.bust === '37') {
    recommendedSize = fitState.silhouette === 'tailored' ? 'M' : 'L';
  } else if (fitState.bust === '41') {
    recommendedSize = fitState.silhouette === 'tailored' ? 'L' : 'XL';
  } else {
    isCustomRecommended = true;
  }

  body.innerHTML = `
    <div style="text-align:center;padding:1rem">
      <div style="width:56px;height:56px;border-radius:50%;background:rgba(212,175,55,.2);color:var(--gold-600);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem">
        ✦
      </div>
      <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:700">Atelier Recommendation</span>
      <h3 class="font-serif" style="font-size:2rem;color:var(--emerald-900);margin:.5rem 0">
        ${isCustomRecommended ? 'Custom Bespoke Tailoring' : `Size ${recommendedSize}`}
      </h3>
      <p style="font-size:.9rem;color:var(--charcoal-700);line-height:1.6;max-width:440px;margin:0 auto 1.5rem">
        ${isCustomRecommended
          ? 'Based on your proportions, our master cut-and-sew team recommends Custom Tailoring to ensure the shoulder seams and drape fall flawlessly.'
          : `Based on your ${fitState.height} stature and bust dimensions, **Size ${recommendedSize}** will deliver the most graceful, flattering silhouette for this ${currentPDPProduct?.title || 'creation'}.`
        }
      </p>

      <div style="background:var(--cream-100);border:1px solid rgba(212,175,55,.3);border-radius:1rem;padding:1rem;text-align:left;font-size:.85rem;color:var(--charcoal-700);margin-bottom:1.5rem">
        <div>• <strong>Silhouette Drape:</strong> ${fitState.silhouette === 'relaxed' ? 'Relaxed fluid kaftan fall' : 'Contoured tailored fit'}</div>
        <div>• <strong>Stature Guidance:</strong> ${fitState.height === 'petite' ? 'Standard length may fall at ankles — custom length can be shortened free of charge' : fitState.height === 'tall' ? 'Full 52" silhouette will sit elegantly at mid-calf / ankle' : 'True to Pakistani formal sizing'}</div>
      </div>
    </div>
  `;

  if (footer) {
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="renderFitStep(1)">Retake</button>
      <button class="btn btn-emerald" onclick="applyFitRecommendation('${recommendedSize}', ${isCustomRecommended})">
        Apply Recommendation
      </button>
    `;
  }
}

function applyFitRecommendation(size, isCustom) {
  closeFitAssistant();
  if (isCustom) {
    const customBtn = document.querySelectorAll('.pdp-stitching-btn')[1];
    if (customBtn) selectStitchingType('custom', customBtn);
    openStitchingModal();
  } else {
    const rtwBtn = document.querySelectorAll('.pdp-stitching-btn')[0];
    if (rtwBtn) selectStitchingType('ready-to-wear', rtwBtn);
    const sizeBtn = Array.from(document.querySelectorAll('.pdp-size-btn')).find(b => b.textContent.trim() === size);
    if (sizeBtn) selectSize(size, sizeBtn);
    showToast({ type: 'success', title: 'Fit Applied', description: `Selected Size ${size} based on your stylist recommendations.` });
  }
}

// ============================================================
// ATELIER ORDER TRACKER
// ============================================================
function openOrderTracker(defaultId = 'HOOR-8921') {
  const modal = document.getElementById('order-tracker-modal');
  const body = document.getElementById('tracker-modal-body');
  if (!modal || !body) return;

  trackOrder(defaultId);
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeOrderTracker() {
  const modal = document.getElementById('order-tracker-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function trackOrder(orderId) {
  const body = document.getElementById('tracker-modal-body');
  if (!body) return;

  body.innerHTML = `
    <div style="display:flex;gap:.5rem;margin-bottom:1.5rem">
      <input type="text" id="tracker-input" value="${escapeHtml(orderId)}" placeholder="e.g. HOOR-8921" class="contact-input" style="flex:1">
      <button class="btn btn-emerald" onclick="trackOrder(document.getElementById('tracker-input').value.trim())">Look Up</button>
    </div>

    <div style="background:white;padding:1.5rem;border-radius:1rem;border:1px solid rgba(212,175,55,.2);box-shadow:var(--shadow-luxury)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
        <div>
          <span class="badge badge-emerald">In Atelier Tailoring</span>
          <h4 class="font-serif" style="font-size:1.3rem;color:var(--emerald-900);margin-top:.25rem">Order #${escapeHtml(orderId || 'HOOR-8921')}</h4>
          <p style="font-size:.8rem;color:var(--charcoal-500)">Creation: Khuda Baksh Silk Chunnari 3PC · Bespoke Stitching</p>
        </div>
        <div style="text-align:right">
          <div style="font-size:.75rem;color:var(--charcoal-500)">Estimated Dispatch</div>
          <div style="font-weight:700;color:var(--gold-600);font-size:.9rem">In 3 Business Days</div>
        </div>
      </div>

      <div class="tracker-timeline">
        <div class="tracker-node is-done">
          <div class="tracker-node-title">1. Fabric Sourcing & Inspection</div>
          <div class="tracker-node-desc">Pure Silk Chunnari fabric inspected for loom purity and weave density.</div>
        </div>
        <div class="tracker-node is-done">
          <div class="tracker-node-title">2. Pattern Drafting & Silhouette Cutting</div>
          <div class="tracker-node-desc">Master pattern drafted to client's exact bespoke proportions.</div>
        </div>
        <div class="tracker-node is-current">
          <div class="tracker-node-title">3. Artisan Hand Embroidery & Appliqué Work (Active)</div>
          <div class="tracker-node-desc">Senior artisan currently applying Kora Dabka & hand Gotta wirework in Lahore atelier.</div>
        </div>
        <div class="tracker-node">
          <div class="tracker-node-title">4. Master Stitching & Crushed Silk Pleating</div>
          <div class="tracker-node-desc">Assembly of shirt panels, lining attachment, and crushed sharara pleating.</div>
        </div>
        <div class="tracker-node">
          <div class="tracker-node-title">5. Multi-Point Quality Assurance Inspection</div>
          <div class="tracker-node-desc">Checking stitch tension, seam durability, and embroidery alignment.</div>
        </div>
        <div class="tracker-node">
          <div class="tracker-node-title">6. DHL Express Worldwide Dispatch</div>
          <div class="tracker-node-desc">Packaged in scented keepsake emerald box with live DHL tracking number.</div>
        </div>
      </div>

      <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--cream-300);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <span style="font-size:.8rem;color:var(--charcoal-600)">Need direct status photos from the workshop?</span>
        <button class="btn btn-whatsapp" style="padding:.4rem .75rem;font-size:.75rem" onclick="openWhatsApp('Hello Hoor Collection! I am inquiring about Order #' + (document.getElementById('tracker-input')?.value || 'HOOR-8921'))">
          WhatsApp Atelier Update
        </button>
      </div>
    </div>
  `;
}

// ============================================================
// SHARE MODAL
// ============================================================
function openShareModal() {
  if (!currentPDPProduct) return;
  const modal = document.getElementById('share-modal');
  const body = document.getElementById('share-modal-body');
  if (!modal || !body) return;

  const url = window.location.href;

  body.innerHTML = `
    <div style="text-align:center;margin-bottom:1.5rem">
      <img src="${currentPDPProduct.images[0].src}" alt="${escapeHtml(currentPDPProduct.title)}" style="width:90px;height:115px;object-fit:cover;border-radius:.75rem;margin:0 auto .75rem;box-shadow:var(--shadow-luxury)">
      <h4 class="font-serif" style="font-size:1.2rem;color:var(--emerald-900)">${escapeHtml(currentPDPProduct.title)}</h4>
      <p style="font-size:.85rem;color:var(--gold-600);font-weight:600">${formatPrice(getProductPrice(currentPDPProduct))}</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:.75rem">
      <button class="btn btn-whatsapp btn-full" onclick="shareProductWhatsApp()">
        Share via WhatsApp Direct
      </button>
      <button class="btn btn-emerald btn-full" onclick="copyProductLink('${url}')">
        Copy Direct Link
      </button>
    </div>
  `;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function copyProductLink(url) {
  navigator.clipboard.writeText(url || window.location.href);
  showToast({ type: 'success', title: 'Link Copied', description: 'Product link copied to clipboard.' });
  closeShareModal();
}

function shareProductWhatsApp() {
  if (!currentPDPProduct) return;
  const text = `Look at this breathtaking couture piece from Hoor Collection: ${currentPDPProduct.title} (${currentPDPProduct.subtitle}) - ${formatPrice(getProductPrice(currentPDPProduct))}\n${window.location.href}`;
  openWhatsApp(text);
  closeShareModal();
}

// ============================================================
// FLOATING CONCIERGE WIDGET
// ============================================================
function toggleConcierge() {
  const card = document.getElementById('concierge-card');
  card?.classList.toggle('is-open');
}

// ============================================================
// ACCORDION TOGGLE
// ============================================================
function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  const content = item.querySelector('.accordion-content');
  const isOpen = content.classList.contains('is-open');

  const parent = item.parentElement;
  parent.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('is-open'));
  parent.querySelectorAll('.accordion-trigger').forEach(t => t.classList.remove('is-open'));

  if (!isOpen) {
    content.classList.add('is-open');
    btn.classList.add('is-open');
  }
}

// ============================================================
// PAGE: HOMEPAGE
// ============================================================
function renderHomePage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <!-- HERO SECTION -->
    <section class="hero-luxury" style="position:relative;min-height:92vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(rgba(6,35,28,.65),rgba(6,35,28,.8)), url('images/products/dress-5/img-1.jpg') center/cover no-repeat;background-attachment:fixed">
      <div style="position:absolute;inset:0;background:radial-gradient(circle at center, transparent 30%, rgba(3,23,18,.9) 100%);pointer-events:none"></div>
      
      <div class="container" style="position:relative;z-index:10;text-align:center;padding:6rem 1rem 4rem;color:var(--cream-200)">
        <div style="display:inline-flex;align-items:center;gap:.75rem;padding:.5rem 1.25rem;border-radius:100px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);backdrop-filter:blur(8px);margin-bottom:1.5rem">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--gold-400);box-shadow:0 0 10px var(--gold-400)"></span>
          <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--gold-300)">Haute Couture · Festive '26</span>
        </div>

        <h1 class="text-display-xl" style="color:var(--cream-100);margin-bottom:1.25rem;max-width:900px;margin-left:auto;margin-right:auto;text-shadow:0 10px 40px rgba(0,0,0,.6)">
          Where Heritage Meets <span style="font-style:italic;color:var(--gold-400)">Unrivaled</span> Elegance
        </h1>

        <div class="luxury-divider" style="margin:1.5rem auto"></div>

        <p style="font-size:clamp(1rem,2vw,1.3rem);max-width:640px;margin:0 auto 2.5rem;color:rgba(250,249,246,.85);line-height:1.8;font-weight:300">
          Pure Viscose kaftans, hand-embellished raw silks, and regal bridal chunnari sets crafted in our Lahore atelier.
        </p>

        <div class="hero__actions" style="display:flex;gap:1.25rem;justify-content:center;align-items:center;flex-wrap:wrap">
          <button class="btn btn-gold" onclick="navigateTo('listing')" style="min-width:200px">
            Explore Collection
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <button class="btn btn-outline" onclick="navigateTo('lookbook')" style="min-width:200px;border-color:rgba(250,249,246,.5);color:var(--cream-200);backdrop-filter:blur(6px)">
            View Lookbook
          </button>
        </div>

        <div style="margin-top:4rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;opacity:.7">
          <span style="font-size:.7rem;letter-spacing:.2em;text-transform:uppercase">Scroll to discover</span>
          <div style="width:1px;height:40px;background:linear-gradient(to bottom, var(--gold-400), transparent);animation:float 2s infinite"></div>
        </div>
      </div>
    </section>

    <!-- CRAFTSMANSHIP TRIPTYCH -->
    <section class="section-padding" style="background:white;border-bottom:1px solid var(--cream-400)">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2.5rem">
          <div style="padding:2.5rem;border-radius:1.5rem;background:var(--cream-100);border:1px solid rgba(212,175,55,.2);text-align:center">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(212,175,55,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;color:var(--gold-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 class="font-serif" style="font-size:1.4rem;color:var(--emerald-900);margin-bottom:.75rem">Master Craftsmanship</h3>
            <p style="color:var(--charcoal-600);font-size:.9rem;line-height:1.7">
              Each bridal and formal creation commands up to 80 hours of hand-guided Kora Dabka, Gotta, and intricate appliqué embroidery.
            </p>
          </div>

          <div style="padding:2.5rem;border-radius:1.5rem;background:var(--cream-100);border:1px solid rgba(212,175,55,.2);text-align:center">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(212,175,55,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;color:var(--gold-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>
            </div>
            <h3 class="font-serif" style="font-size:1.4rem;color:var(--emerald-900);margin-bottom:.75rem">Finest Pure Fabrics</h3>
            <p style="color:var(--charcoal-600);font-size:.9rem;line-height:1.7">
              We exclusively use 100% Pure Viscose, artisanal Raw Silk, and authentic Silk Chunnari with custom crushed-silk weaves.
            </p>
          </div>

          <div style="padding:2.5rem;border-radius:1.5rem;background:var(--cream-100);border:1px solid rgba(212,175,55,.2);text-align:center">
            <div style="width:64px;height:64px;border-radius:50%;background:rgba(212,175,55,.15);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;color:var(--gold-600)">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>
            </div>
            <h3 class="font-serif" style="font-size:1.4rem;color:var(--emerald-900);margin-bottom:.75rem">Bespoke Custom Fit</h3>
            <p style="color:var(--charcoal-600);font-size:.9rem;line-height:1.7">
              Submit your bespoke measurements through our Stitching Matrix for custom tailoring, delivered worldwide in 7 to 10 days.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SIGNATURE CREATIONS -->
    <section class="section-padding" style="background:var(--cream-200)">
      <div class="container">
        <div class="section-header">
          <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Digital Flagship</span>
          <h2>Signature Creations</h2>
          <div class="luxury-divider"></div>
          <p>Curated silhouettes embodying the grace, regal heritage, and modern allure of Hoor Collection.</p>
        </div>

        <div class="grid-products" style="margin-top:3rem">
          ${PRODUCTS.map(p => renderProductCard(p)).join('')}
        </div>

        <div style="text-align:center;margin-top:4rem">
          <button class="btn btn-emerald" onclick="navigateTo('listing')">
            View All 10 Creations in Catalog
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- EDITORIAL BANNER SECTION -->
    <section style="background:var(--emerald-900);color:var(--cream-200);position:relative;overflow:hidden;padding:6rem 0">
      <div style="position:absolute;right:0;top:0;bottom:0;width:50%;opacity:.15;background:url('images/products/dress-1/img-4.jpg') center/cover no-repeat;pointer-events:none"></div>
      <div class="container" style="position:relative;z-index:2">
        <div style="max-width:680px">
          <span style="font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-400);font-weight:600">The Atelier Narrative</span>
          <h2 class="text-display-lg" style="color:var(--cream-100);margin:1rem 0 1.5rem">
            Bridal Splendor & Fluid Kaftans Reimagined
          </h2>
          <p style="font-size:1.05rem;line-height:1.8;color:rgba(250,249,246,.8);margin-bottom:2.5rem">
            From the regal drama of the Khuda Baksh Silk Chunnari bridal suit with Kora Dabka & crushed silk sharara to our best-selling Pure Viscose kaftans with heavy appliqué work — each piece is cut to perfection and designed for timeless allure.
          </p>
          <div style="display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap">
            <button class="btn btn-gold" onclick="navigateTo('product',{slug:'khuda-baksh-silk-chunnari-3pc'})">
              Inspect Bridal Masterpiece
            </button>
            <button class="btn btn-whatsapp" onclick="openWhatsApp('Hello Hoor Collection! I would like to inquire about bespoke bridal and festive consultation.')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.918 1.381 5.594L0 24l6.594-1.381A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.714.779.793-3.671-.232-.371A9.818 9.818 0 1112 21.818z"/></svg>
              WhatsApp Concierge
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FASHION FILM / ATELIER VIDEO PREVIEW SECTION -->
    <section class="section-padding" style="background:var(--cream-100)">
      <div class="container">
        <div class="section-header">
          <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Motion & Texture</span>
          <h2>The Runway in Motion</h2>
          <div class="luxury-divider"></div>
          <p>Witness the fluid drape, light reflection, and artisanal movement captured live.</p>
        </div>

        <div style="max-width:960px;margin:0 auto;border-radius:2rem;overflow:hidden;box-shadow:var(--shadow-luxury);background:var(--emerald-950);border:2px solid rgba(212,175,55,.3)">
          <div style="position:relative;aspect-ratio:16/9;background:#000">
            <video id="hero-feature-video" controls poster="images/products/dress-4/img-1.jpg" style="width:100%;height:100%;object-fit:cover">
              <source src="images/products/dress-4/video.mp4" type="video/mp4">
              Your browser does not support video playback.
            </video>
          </div>
          <div style="padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;background:var(--emerald-900);color:var(--cream-200);flex-wrap:wrap;gap:1rem">
            <div>
              <div style="font-family:var(--font-serif);font-size:1.2rem;color:var(--cream-100)">Feature: Premium Viscose Kaftan</div>
              <div style="font-size:.85rem;color:var(--gold-400)">Pure Viscose with Heavy Appliqué Work & Hand Finished Trims</div>
            </div>
            <button class="btn btn-gold" onclick="navigateTo('product',{slug:'premium-viscose-kaftan-collection'})">
              Shop This Dress
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BADGES -->
    <section class="section-padding-sm" style="background:white;border-top:1px solid var(--cream-400)">
      <div class="container">
        <div class="trust-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center">
          <div>
            <div style="color:var(--gold-600);font-size:2rem;margin-bottom:.5rem">✈️</div>
            <h4 style="font-family:var(--font-serif);font-size:1.1rem;color:var(--emerald-900)">Worldwide Express</h4>
            <p style="font-size:.8rem;color:var(--charcoal-500);margin-top:.25rem">DHL Express delivery to USA, UK, UAE & Canada</p>
          </div>
          <div>
            <div style="color:var(--gold-600);font-size:2rem;margin-bottom:.5rem">🪡</div>
            <h4 style="font-family:var(--font-serif);font-size:1.1rem;color:var(--emerald-900)">Bespoke Tailoring</h4>
            <p style="font-size:.8rem;color:var(--charcoal-500);margin-top:.25rem">Custom size matrix tailored to your exact measurements</p>
          </div>
          <div>
            <div style="color:var(--gold-600);font-size:2rem;margin-bottom:.5rem">🛡️</div>
            <h4 style="font-family:var(--font-serif);font-size:1.1rem;color:var(--emerald-900)">100% Authentic</h4>
            <p style="font-size:.8rem;color:var(--charcoal-500);margin-top:.25rem">Pure fabrics sourced directly from certified Pakistani looms</p>
          </div>
          <div>
            <div style="color:var(--gold-600);font-size:2rem;margin-bottom:.5rem">💬</div>
            <h4 style="font-family:var(--font-serif);font-size:1.1rem;color:var(--emerald-900)">Direct WhatsApp VIP</h4>
            <p style="font-size:.8rem;color:var(--charcoal-500);margin-top:.25rem">Direct styling & measurement guidance with our atelier</p>
          </div>
        </div>
      </div>
    </section>
  `;

  init3DTilt();
}

// ============================================================
// PAGE: PRODUCT LISTING (PLP)
// ============================================================
function renderListingPage(categoryParam) {
  const root = document.getElementById('app-root');
  if (!root) return;

  if (categoryParam) {
    AppState.filters.categories = [decodeURIComponent(categoryParam)];
  }

  const products = getFilteredProducts();
  const allCategories = ['Formal', 'Semi-Formal', 'Bridal'];

  root.innerHTML = `
    <div class="page-hero" style="padding:6rem 0 3rem;background:linear-gradient(to bottom, var(--emerald-950) 0%, var(--emerald-900) 100%)">
      <div class="container">
        <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-400);font-weight:600">The Catalog</span>
        <h1>Curated Collection</h1>
        <p>Explore all 5 master creations with real photography, intricate fabric details, and custom stitching options.</p>
      </div>
    </div>

    <section class="section-padding-sm" style="background:var(--cream-200);min-height:80vh">
      <div class="container">
        <!-- FILTER BAR -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem;padding:1.25rem 1.75rem;background:white;border-radius:1.25rem;border:1px solid rgba(212,175,55,.2);box-shadow:var(--shadow-luxury)">
          <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
            <span style="font-size:.875rem;font-weight:600;color:var(--emerald-900)">Category:</span>
            <button class="badge ${AppState.filters.categories.length === 0 ? 'badge-gold' : 'badge-emerald'}" style="cursor:pointer" onclick="setCategoryFilter('')">All (${PRODUCTS.length})</button>
            ${allCategories.map(cat => {
              const active = AppState.filters.categories.includes(cat);
              return `<button class="badge ${active ? 'badge-gold' : 'badge-emerald'}" style="cursor:pointer" onclick="setCategoryFilter('${cat}')">${cat}</button>`;
            }).join('')}
          </div>

          <div style="display:flex;align-items:center;gap:1.5rem">
            <div style="display:flex;align-items:center;gap:.5rem">
              <span style="font-size:.85rem;color:var(--charcoal-600)">Sort by:</span>
              <select onchange="setSortFilter(this.value)" style="padding:.4rem .75rem;border-radius:.5rem;border:1px solid var(--charcoal-300);background:white;font-size:.85rem;color:var(--charcoal-800);outline:none">
                <option value="featured" ${AppState.filters.sort==='featured'?'selected':''}>Featured</option>
                <option value="price-low" ${AppState.filters.sort==='price-low'?'selected':''}>Price: Low to High</option>
                <option value="price-high" ${AppState.filters.sort==='price-high'?'selected':''}>Price: High to Low</option>
                <option value="newest" ${AppState.filters.sort==='newest'?'selected':''}>New Arrivals</option>
              </select>
            </div>
            
            <button class="btn btn-outline" onclick="openFilterDrawer()" style="padding:.4rem 1rem;font-size:.85rem;display:flex;align-items:center;gap:.5rem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              Filter Fabrics
            </button>
          </div>
        </div>

        <!-- ACTIVE FILTER CHIPS -->
        ${(AppState.filters.categories.length > 0 || AppState.filters.fabrics.length > 0) ? `
          <div style="display:flex;gap:.5rem;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap">
            <span style="font-size:.8rem;color:var(--charcoal-500)">Active filters:</span>
            ${AppState.filters.categories.map(c => `
              <span class="badge badge-emerald" style="display:inline-flex;align-items:center;gap:.35rem">
                ${c}
                <button onclick="removeCategoryFilter('${c}')" style="color:white;font-weight:700">×</button>
              </span>
            `).join('')}
            ${AppState.filters.fabrics.map(f => `
              <span class="badge badge-gold" style="display:inline-flex;align-items:center;gap:.35rem">
                ${f}
                <button onclick="removeFabricFilter('${f}')" style="color:var(--emerald-900);font-weight:700">×</button>
              </span>
            `).join('')}
            <button onclick="clearAllFilters()" style="font-size:.8rem;color:var(--gold-600);text-decoration:underline;margin-left:.5rem">Clear all</button>
          </div>
        ` : ''}

        <!-- PRODUCT GRID -->
        ${products.length > 0 ? `
          <div class="grid-products">
            ${products.map(p => renderProductCard(p)).join('')}
          </div>
        ` : `
          <div style="text-align:center;padding:5rem 1rem;background:white;border-radius:1.5rem;border:1px solid var(--charcoal-200)">
            <h3 class="font-serif" style="font-size:1.6rem;color:var(--emerald-900);margin-bottom:.5rem">No creations found</h3>
            <p style="color:var(--charcoal-500);font-size:.9rem;margin-bottom:1.5rem">Try resetting your active filters to view all 5 dresses.</p>
            <button class="btn btn-emerald" onclick="clearAllFilters()">Reset All Filters</button>
          </div>
        `}
      </div>
    </section>
  `;

  init3DTilt();
}

function setCategoryFilter(cat) {
  if (!cat) {
    AppState.filters.categories = [];
  } else {
    AppState.filters.categories = [cat];
  }
  renderListingPage();
}

function removeCategoryFilter(cat) {
  AppState.filters.categories = AppState.filters.categories.filter(c => c !== cat);
  renderListingPage();
}

function removeFabricFilter(fab) {
  AppState.filters.fabrics = AppState.filters.fabrics.filter(f => f !== fab);
  renderListingPage();
}

function setSortFilter(sort) {
  AppState.filters.sort = sort;
  renderListingPage();
}

function clearAllFilters() {
  AppState.filters.categories = [];
  AppState.filters.fabrics = [];
  AppState.filters.search = '';
  renderListingPage();
}

// ============================================================
// PAGE: PRODUCT DETAIL PAGE (PDP)
// ============================================================
function renderPDP(slug) {
  const root = document.getElementById('app-root');
  if (!root) return;

  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  currentPDPProduct = product;
  currentPDPImageIndex = 0;

  // Track in recently viewed items
  let recents = JSON.parse(localStorage.getItem('hoor-recent') || '[]');
  recents = recents.filter(id => id !== product.id);
  recents.unshift(product.id);
  if (recents.length > 5) recents.pop();
  localStorage.setItem('hoor-recent', JSON.stringify(recents));

  activeStitchingType = product.stitching.available[0] || 'ready-to-wear';
  activeSize = product.stitching.sizes?.[1] || product.stitching.sizes?.[0] || 'M';
  activeQuantity = 1;
  activeMeasurements = null;

  const price = getProductPrice(product);
  const relatedProducts = (product.relatedIds || []).map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const otherRecentProducts = recents.filter(id => id !== product.id).map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  root.innerHTML = `
    <section class="section-padding-sm" style="background:var(--cream-200);padding-top:7rem">
      <div class="container">
        <!-- BREADCRUMBS -->
        <nav class="breadcrumb">
          <a href="#" onclick="event.preventDefault();navigateTo('home')">Home</a>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <a href="#" onclick="event.preventDefault();navigateTo('listing')">Collection</a>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span style="color:var(--emerald-900);font-weight:600">${escapeHtml(product.title)}</span>
        </nav>

        <div class="pdp-layout">
          <!-- LEFT: IMAGE GALLERY & LIGHTBOX ZOOM -->
          <div class="pdp-gallery">
            <div class="pdp-main-image" id="pdp-main-wrap" style="position:relative">
              <img id="pdp-active-image" src="${product.images[0].src}" alt="${escapeHtml(product.images[0].alt)}" onclick="openLightbox(this.src, currentPDPImageIndex)">
              
              <!-- 2.5x Zoom trigger badge -->
              <div onclick="openLightbox(document.getElementById('pdp-active-image').src, currentPDPImageIndex)" style="position:absolute;top:1rem;right:1rem;background:rgba(6,35,28,.75);backdrop-filter:blur(8px);border:1px solid rgba(212,175,55,.4);color:var(--cream-200);padding:.4rem .85rem;border-radius:100px;font-size:.75rem;cursor:pointer;display:flex;align-items:center;gap:.4rem;z-index:5;transition:transform .2s">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Inspect 2.5x Zoom</span>
              </div>

              ${product.video ? `
                <div style="position:absolute;bottom:1.25rem;right:1.25rem;display:flex;gap:.5rem;z-index:5">
                  <button class="btn btn-gold" style="padding:.5rem 1rem;font-size:.75rem;box-shadow:var(--shadow-luxury)" onclick="togglePDPVideo(true)">
                    ▶ Watch Video Motion
                  </button>
                </div>
              ` : ''}

              <div id="pdp-video-container" style="display:none;position:absolute;inset:0;background:#000;border-radius:1.5rem;overflow:hidden;z-index:15">
                <video id="pdp-video-player" controls style="width:100%;height:100%;object-fit:cover">
                  ${product.video ? `<source src="${product.video}" type="video/mp4">` : ''}
                </video>
                <button onclick="togglePDPVideo(false)" style="position:absolute;top:1rem;right:1rem;background:rgba(0,0,0,.7);color:white;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;z-index:20;cursor:pointer">✕</button>
              </div>
            </div>

            <!-- THUMBNAIL STRIP -->
            <div class="pdp-thumbnails">
              ${product.images.map((img, idx) => `
                <div class="pdp-thumbnail ${idx === 0 ? 'is-active' : ''}" onclick="switchPDPImage('${img.src}', ${idx}, this)">
                  <img src="${img.src}" alt="${escapeHtml(img.alt)}">
                </div>
              `).join('')}
              ${product.video ? `
                <div class="pdp-thumbnail" onclick="togglePDPVideo(true)" style="background:var(--emerald-900);display:flex;align-items:center;justify-content:center;color:var(--gold-400)" title="Play Fashion Video">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              ` : ''}
            </div>

            <div style="margin-top:1.5rem;text-align:center;font-size:.8rem;color:var(--charcoal-500)">
              ✦ Click any thumbnail or photo to launch full-screen high-definition magnification
            </div>
          </div>

          <!-- RIGHT: PRODUCT SPECIFICATIONS & ACTIONS -->
          <div class="pdp-details" style="display:flex;flex-direction:column;gap:1.5rem">
            <div>
              <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem">
                <span class="badge ${product.badge==='BRIDAL'?'badge-bridal':'badge-emerald'}">${product.category}</span>
                <span style="font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--charcoal-500);font-weight:600">SKU: ${product.sku}</span>
              </div>
              <h1 class="font-serif" style="font-size:clamp(2rem,3.5vw,3rem);color:var(--emerald-900);line-height:1.2;margin-bottom:.25rem">
                ${escapeHtml(product.title)}
              </h1>
              <p style="font-size:1.15rem;color:var(--gold-600);font-weight:500">${escapeHtml(product.subtitle)}</p>
            </div>

            <!-- PRICE & RATING -->
            <div style="display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid rgba(212,175,55,.2);padding-bottom:1.25rem">
              <div>
                <span id="pdp-price-display" style="font-family:var(--font-serif);font-size:2.2rem;font-weight:700;color:var(--emerald-900)">
                  ${formatPrice(price)}
                </span>
                <span style="font-size:.85rem;color:var(--charcoal-500);margin-left:.5rem">Taxes & worldwide express shipping calculated at checkout</span>
              </div>
              <div style="display:flex;align-items:center;gap:.25rem;cursor:pointer" onclick="document.querySelector('.reviews-section')?.scrollIntoView({behavior:'smooth'})">
                <div style="display:flex;color:var(--gold-500)">${starsHTML(5)}</div>
                <span style="font-size:.85rem;font-weight:700;color:var(--charcoal-700);margin-left:.25rem">5.0</span>
                <span style="font-size:.75rem;color:var(--charcoal-500);text-decoration:underline">(${product.reviews?.length || 2} reviews)</span>
              </div>
            </div>

            <!-- SHORT DESCRIPTION -->
            <p style="color:var(--charcoal-700);line-height:1.75;font-size:1rem">
              ${escapeHtml(product.shortDescription)}
            </p>

            <!-- STITCHING TYPE SELECTOR -->
            <div>
              <label style="display:block;font-size:.85rem;font-weight:600;color:var(--emerald-900);text-transform:uppercase;letter-spacing:.05em;margin-bottom:.75rem">
                Stitching Selection:
              </label>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem">
                ${product.stitching.available.map(st => {
                  const label = st === 'ready-to-wear' ? 'Ready to Wear' : st === 'custom' ? 'Custom Tailoring' : 'Unstitched';
                  const extra = st === 'custom' ? `(+ ${formatPrice(product.stitching.customPriceAdjustment || 1500)})` : '(Included)';
                  const isSelected = activeStitchingType === st;
                  return `
                    <button class="pdp-stitching-btn ${isSelected ? 'is-selected' : ''}" onclick="selectStitchingType('${st}', this)" style="padding:.75rem;border-radius:.75rem;border:2px solid ${isSelected ? 'var(--gold-500)' : 'var(--charcoal-300)'};background:${isSelected ? 'rgba(212,175,55,.1)' : 'white'};text-align:center;cursor:pointer;transition:all .2s">
                      <div style="font-weight:600;font-size:.9rem;color:var(--emerald-900)">${label}</div>
                      <div style="font-size:.75rem;color:var(--charcoal-500);margin-top:.15rem">${extra}</div>
                    </button>`;
                }).join('')}
              </div>
            </div>

            <!-- STANDARD SIZE SELECTOR (VISIBLE WHEN READY-TO-WEAR) -->
            <div id="pdp-size-container" style="display:${activeStitchingType === 'ready-to-wear' ? 'block' : 'none'}">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.75rem">
                <label style="font-size:.85rem;font-weight:600;color:var(--emerald-900);text-transform:uppercase;letter-spacing:.05em">
                  Select Size:
                </label>
                <div style="display:flex;gap:1rem;align-items:center">
                  <button onclick="openFitAssistant()" style="font-size:.8rem;color:var(--gold-600);text-decoration:underline;cursor:pointer;font-weight:600">
                    ✦ Smart Fit Stylist
                  </button>
                  <button onclick="openSizeGuideModal()" style="font-size:.8rem;color:var(--charcoal-600);text-decoration:underline;cursor:pointer">
                    📐 Sizing Chart
                  </button>
                </div>
              </div>
              <div style="display:flex;gap:.75rem">
                ${(product.stitching.sizes || ['S', 'M', 'L', 'XL']).map(s => `
                  <button class="pdp-size-btn ${activeSize === s ? 'is-selected' : ''}" onclick="selectSize('${s}', this)" style="width:48px;height:48px;border-radius:.5rem;border:2px solid ${activeSize === s ? 'var(--gold-500)' : 'var(--charcoal-300)'};background:${activeSize === s ? 'var(--emerald-900)' : 'white'};color:${activeSize === s ? 'var(--cream-200)' : 'var(--charcoal-900)'};font-weight:700;cursor:pointer;transition:all .2s">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- CUSTOM MEASUREMENTS TRIGGER (VISIBLE WHEN CUSTOM TAILORING) -->
            <div id="pdp-custom-container" style="display:${activeStitchingType === 'custom' ? 'block' : 'none'}">
              <div style="padding:1.25rem;background:white;border-radius:1rem;border:1px dashed var(--gold-500)">
                <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem">
                  <span style="font-size:1.2rem">✂️</span>
                  <div style="font-weight:600;color:var(--emerald-900)">Bespoke Atelier Measurements</div>
                </div>
                <p style="font-size:.85rem;color:var(--charcoal-600);line-height:1.5;margin-bottom:1rem">
                  Provide your exact Bust, Waist, Hips, Shirt Length, Sleeves, and Shoulder dimensions for a couture fit tailored specifically for you.
                </p>
                <button class="btn btn-gold btn-full" onclick="openStitchingModal()">
                  Enter Custom Measurements
                </button>
                <div id="pdp-measurement-summary"></div>
              </div>
            </div>

            <!-- QUANTITY SELECTOR -->
            <div style="display:flex;align-items:center;gap:1.5rem">
              <span style="font-size:.85rem;font-weight:600;color:var(--emerald-900);text-transform:uppercase;letter-spacing:.05em">Quantity:</span>
              <div class="qty-control" style="border:2px solid var(--charcoal-300);background:white;border-radius:.75rem">
                <button class="qty-btn" onclick="adjustPDPQty(-1)">−</button>
                <span class="qty-value" id="pdp-qty-value">1</span>
                <button class="qty-btn" onclick="adjustPDPQty(1)">+</button>
              </div>
            </div>

            <!-- PRIMARY ACTIONS: ADD TO CART & WHATSAPP DIRECT ORDER -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:.5rem">
              <button class="btn btn-emerald btn-full" onclick="addCurrentProductToCart()" style="padding:1rem">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                Add to Bag
              </button>

              <button class="btn btn-whatsapp btn-full" onclick="orderCurrentProductViaWhatsApp()" style="padding:1rem">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.918 1.381 5.594L0 24l6.594-1.381A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.714.779.793-3.671-.232-.371A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp Order
              </button>
            </div>

            <!-- SECONDARY UTILITY BAR: WISHLIST, SHARE, AND ORDER TRACKER -->
            <div style="display:flex;gap:1rem;align-items:center;padding-top:.5rem">
              <button class="btn btn-outline" onclick="toggleWishlist('${product.id}')" style="flex:1;padding:.5rem;font-size:.85rem;display:flex;align-items:center;justify-content:center;gap:.4rem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${AppState.wishlist.includes(product.id)?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                Save to Wishlist
              </button>
              <button class="btn btn-outline" onclick="openShareModal()" style="padding:.5rem 1rem;font-size:.85rem;display:flex;align-items:center;gap:.4rem" title="Share">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share
              </button>
            </div>

            <!-- TRUST ICONS -->
            <div class="pdp-trust" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;padding:1.25rem 0;border-top:1px solid rgba(212,175,55,.2);border-bottom:1px solid rgba(212,175,55,.2)">
              <div class="pdp-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                <p><strong>Express Delivery</strong><br>Worldwide DHL</p>
              </div>
              <div class="pdp-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <p><strong>Pure Authenticity</strong><br>100% Quality Fabric</p>
              </div>
              <div class="pdp-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                <p><strong>Bespoke Tailoring</strong><br>7-10 Days Turnaround</p>
              </div>
            </div>

            <!-- ACCORDIONS: DETAILS, FABRIC, CARE -->
            <div class="accordion-group">
              <div class="accordion-item">
                <button class="accordion-trigger is-open" onclick="toggleAccordion(this)">
                  <span>Couture Description & Full Overview</span>
                  <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="accordion-content is-open">
                  <div class="accordion-content-inner">
                    <p style="line-height:1.7;color:var(--charcoal-700)">${escapeHtml(product.description)}</p>
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <button class="accordion-trigger" onclick="toggleAccordion(this)">
                  <span>Fabric, Materials & Artisanal Work</span>
                  <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="accordion-content">
                  <div class="accordion-content-inner">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;font-size:.875rem">
                      <div><strong>Primary Fabric:</strong> ${escapeHtml(product.fabric.primary)}</div>
                      <div><strong>Texture:</strong> ${escapeHtml(product.fabric.texture)}</div>
                      <div><strong>Technique:</strong> ${escapeHtml(product.work.technique)}</div>
                      <div><strong>Origin:</strong> Handcrafted in ${escapeHtml(product.fabric.origin)}</div>
                    </div>
                    ${product.fabric.care ? `
                      <div style="margin-top:1rem">
                        <strong>Care Instructions:</strong>
                        <ul style="margin-left:1.25rem;margin-top:.25rem;color:var(--charcoal-600)">
                          ${product.fabric.care.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <button class="accordion-trigger" onclick="toggleAccordion(this)">
                  <span>Worldwide Shipping & Tailoring Guarantee</span>
                  <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div class="accordion-content">
                  <div class="accordion-content-inner" style="font-size:.9rem;line-height:1.7;color:var(--charcoal-700)">
                    <p>• <strong>Domestic Pakistan:</strong> 2 to 4 business days via insured express couriers.</p>
                    <p>• <strong>International (US, UK, UAE, Canada, EU):</strong> 5 to 7 business days via DHL Express.</p>
                    <p>• <strong>Custom Tailoring:</strong> Adds 5–8 days for pattern drafting, cutting, and artisanal finishing.</p>
                    <p>• <strong>Packaging:</strong> Shipped in our signature Hoor Collection emerald & gold garment keepsake boxes.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- REVIEWS & CLIENT TESTIMONIALS SECTION -->
        <div class="reviews-section">
          <div class="section-header" style="text-align:left;margin-bottom:2rem">
            <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Verified Client Sentiment</span>
            <h2 style="font-size:2rem">Atelier Reviews & Accolades</h2>
            <div class="luxury-divider" style="margin:0.75rem 0"></div>
          </div>

          <div class="reviews-summary-card">
            <div style="text-align:center;border-right:1px solid rgba(212,175,55,.2);padding-right:2rem">
              <div style="font-family:var(--font-serif);font-size:3.5rem;font-weight:700;color:var(--emerald-900);line-height:1">5.0</div>
              <div style="display:flex;justify-content:center;color:var(--gold-500);margin:.5rem 0">${starsHTML(5)}</div>
              <div style="font-size:.8rem;color:var(--charcoal-500)">Based on 48 international bespoke orders</div>
            </div>

            <div>
              <div style="display:flex;flex-direction:column;gap:.4rem">
                <div style="display:flex;align-items:center;gap:.75rem;font-size:.8rem">
                  <span style="width:50px">5 Stars</span>
                  <div style="flex:1;height:8px;background:var(--cream-300);border-radius:100px;overflow:hidden">
                    <div style="width:96%;height:100%;background:var(--gold-500);border-radius:100px"></div>
                  </div>
                  <span style="width:35px;text-align:right;font-weight:600">96%</span>
                </div>
                <div style="display:flex;align-items:center;gap:.75rem;font-size:.8rem">
                  <span style="width:50px">4 Stars</span>
                  <div style="flex:1;height:8px;background:var(--cream-300);border-radius:100px;overflow:hidden">
                    <div style="width:4%;height:100%;background:var(--gold-500);border-radius:100px"></div>
                  </div>
                  <span style="width:35px;text-align:right;font-weight:600">4%</span>
                </div>
                <div style="display:flex;align-items:center;gap:.75rem;font-size:.8rem;opacity:.5">
                  <span style="width:50px">3 Stars</span>
                  <div style="flex:1;height:8px;background:var(--cream-300);border-radius:100px"></div>
                  <span style="width:35px;text-align:right">0%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="reviews-list">
            ${(product.reviews || []).map(rev => `
              <div class="review-card">
                <div class="review-header">
                  <div>
                    <div style="display:flex;align-items:center;gap:.5rem">
                      <span style="font-weight:700;color:var(--emerald-900);font-size:.95rem">${escapeHtml(rev.name)}</span>
                      <span class="verified-buyer-badge">✓ Verified Buyer (${escapeHtml(rev.location)})</span>
                    </div>
                    <div style="font-weight:600;color:var(--charcoal-900);margin-top:.25rem;font-size:.9rem">${escapeHtml(rev.title)}</div>
                  </div>
                  <div style="text-align:right">
                    <div style="display:flex;color:var(--gold-500)">${starsHTML(rev.rating)}</div>
                    <div style="font-size:.75rem;color:var(--charcoal-400);margin-top:.15rem">${escapeHtml(rev.date)}</div>
                  </div>
                </div>
                <p style="font-size:.875rem;color:var(--charcoal-700);line-height:1.65">${escapeHtml(rev.comment)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RECENTLY VIEWED PRODUCTS -->
        ${otherRecentProducts.length > 0 ? `
          <div style="margin-top:4rem">
            <div class="section-header" style="text-align:left;margin-bottom:2rem">
              <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Your Browsing History</span>
              <h2 style="font-size:1.8rem">Recently Inspected Creations</h2>
              <div class="luxury-divider" style="margin:0.75rem 0"></div>
            </div>
            <div class="related-scroll">
              ${otherRecentProducts.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- RELATED PRODUCTS -->
        ${relatedProducts.length > 0 ? `
          <div style="margin-top:4rem">
            <div class="section-header" style="text-align:left;margin-bottom:2rem">
              <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Complements & Pairings</span>
              <h2 style="font-size:1.8rem">Complete The Ensemble</h2>
              <div class="luxury-divider" style="margin:0.75rem 0"></div>
            </div>
            <div class="related-scroll">
              ${relatedProducts.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </section>
  `;

  init3DTilt();
}

function switchPDPImage(src, index, thumbEl) {
  togglePDPVideo(false);
  currentPDPImageIndex = index;
  const mainImg = document.getElementById('pdp-active-image');
  if (mainImg) mainImg.src = src;

  document.querySelectorAll('.pdp-thumbnail').forEach(t => t.classList.remove('is-active'));
  if (thumbEl) thumbEl.classList.add('is-active');
}

function togglePDPVideo(show) {
  const videoCont = document.getElementById('pdp-video-container');
  const player = document.getElementById('pdp-video-player');
  if (!videoCont) return;

  if (show) {
    videoCont.style.display = 'block';
    if (player) player.play();
  } else {
    videoCont.style.display = 'none';
    if (player) player.pause();
  }
}

function selectStitchingType(type, btn) {
  activeStitchingType = type;
  document.querySelectorAll('.pdp-stitching-btn').forEach(b => {
    b.classList.remove('is-selected');
    b.style.borderColor = 'var(--charcoal-300)';
    b.style.background = 'white';
  });

  if (btn) {
    btn.classList.add('is-selected');
    btn.style.borderColor = 'var(--gold-500)';
    btn.style.background = 'rgba(212,175,55,.1)';
  }

  const sizeCont = document.getElementById('pdp-size-container');
  const customCont = document.getElementById('pdp-custom-container');

  if (sizeCont) sizeCont.style.display = (type === 'ready-to-wear') ? 'block' : 'none';
  if (customCont) customCont.style.display = (type === 'custom') ? 'block' : 'none';

  const priceDisplay = document.getElementById('pdp-price-display');
  if (priceDisplay && currentPDPProduct) {
    let basePrice = getProductPrice(currentPDPProduct);
    if (type === 'custom') basePrice += (currentPDPProduct.stitching.customPriceAdjustment || 1500);
    priceDisplay.textContent = formatPrice(basePrice);
  }
}

function selectSize(s, btn) {
  activeSize = s;
  document.querySelectorAll('.pdp-size-btn').forEach(b => {
    b.classList.remove('is-selected');
    b.style.background = 'white';
    b.style.color = 'var(--charcoal-900)';
    b.style.borderColor = 'var(--charcoal-300)';
  });
  if (btn) {
    btn.classList.add('is-selected');
    btn.style.background = 'var(--emerald-900)';
    btn.style.color = 'var(--cream-200)';
    btn.style.borderColor = 'var(--gold-500)';
  }
}

function adjustPDPQty(delta) {
  activeQuantity = Math.max(1, activeQuantity + delta);
  const qtyEl = document.getElementById('pdp-qty-value');
  if (qtyEl) qtyEl.textContent = activeQuantity;
}

function addCurrentProductToCart() {
  if (!currentPDPProduct) return;

  if (activeStitchingType === 'custom' && !activeMeasurements) {
    openStitchingModal();
    showToast({ type: 'info', title: 'Measurements Required', description: 'Please enter your custom measurements before adding to cart.' });
    return;
  }

  addToCart({
    product: currentPDPProduct,
    stitchingType: activeStitchingType,
    size: activeStitchingType === 'ready-to-wear' ? activeSize : null,
    quantity: activeQuantity,
    measurements: activeMeasurements
  });
  openCartDrawer();
}

function orderCurrentProductViaWhatsApp() {
  if (!currentPDPProduct) return;

  if (activeStitchingType === 'custom' && !activeMeasurements) {
    openStitchingModal();
    showToast({ type: 'info', title: 'Measurements Required', description: 'Please submit your custom measurements before ordering on WhatsApp.' });
    return;
  }

  const message = buildWhatsAppMessage({
    product: currentPDPProduct,
    stitchingType: activeStitchingType,
    size: activeStitchingType === 'ready-to-wear' ? activeSize : null,
    quantity: activeQuantity,
    measurements: activeMeasurements,
    currency: AppState.currency
  });

  openWhatsApp(message);
}

// ============================================================
// PAGE: LOOKBOOK
// ============================================================
function renderLookbookPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="page-hero" style="padding:6rem 0 3rem;background:linear-gradient(to bottom, var(--emerald-950) 0%, var(--emerald-900) 100%)">
      <div class="container">
        <span style="font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-400);font-weight:600">The Editorial Gallery</span>
        <h1>Lookbook Vol. I</h1>
        <p>A visual symphony of high-definition textures, heavy embroidery, and regal draping photographed on location.</p>
      </div>
    </div>

    <section style="background:var(--emerald-950);padding:4rem 0">
      <div class="container-wide">
        <div class="lookbook-grid">
          <div class="lookbook-item" onclick="navigateTo('product',{slug:'khuda-baksh-silk-chunnari-3pc'})">
            <img src="images/products/dress-5/img-1.jpg" alt="Khuda Baksh Silk Chunnari 3PC">
            <div class="lookbook-item__overlay">
              <span class="badge badge-bridal" style="margin-bottom:.5rem;align-self:flex-start">Bridal 3PC</span>
              <div class="lookbook-item__title">Khuda Baksh Silk Chunnari</div>
              <div class="lookbook-item__price">${formatPrice(getProductPrice(PRODUCTS[4]))}</div>
            </div>
          </div>

          <div class="lookbook-item" onclick="navigateTo('product',{slug:'premium-viscose-kaftan-collection'})">
            <img src="images/products/dress-4/img-1.jpg" alt="Premium Viscose Kaftan Signature">
            <div class="lookbook-item__overlay">
              <span class="badge badge-gold" style="margin-bottom:.5rem;align-self:flex-start">Signature Edition</span>
              <div class="lookbook-item__title">Premium Viscose Kaftan</div>
              <div class="lookbook-item__price">${formatPrice(getProductPrice(PRODUCTS[3]))}</div>
            </div>
          </div>

          <div class="lookbook-item" onclick="navigateTo('product',{slug:'viscose-long-shirt-plazo-2pc'})">
            <img src="images/products/dress-3/img-1.jpg" alt="Viscose Long Shirt & Plazo">
            <div class="lookbook-item__overlay">
              <span class="badge badge-emerald" style="margin-bottom:.5rem;align-self:flex-start">Semi-Formal</span>
              <div class="lookbook-item__title">Viscose Long Shirt & Plazo</div>
              <div class="lookbook-item__price">${formatPrice(getProductPrice(PRODUCTS[2]))}</div>
            </div>
          </div>

          <div class="lookbook-item" onclick="navigateTo('product',{slug:'premium-raw-silk-2pc-kaftan-trouser'})">
            <img src="images/products/dress-2/img-1.jpg" alt="Raw Silk 2PC Kaftan & Trouser">
            <div class="lookbook-item__overlay">
              <span class="badge badge-emerald" style="margin-bottom:.5rem;align-self:flex-start">Minimalist Luxury</span>
              <div class="lookbook-item__title">Raw Silk 2PC Set</div>
              <div class="lookbook-item__price">${formatPrice(getProductPrice(PRODUCTS[1]))}</div>
            </div>
          </div>

          <div class="lookbook-item" onclick="navigateTo('product',{slug:'premium-viscose-kaftan-ethnic'})">
            <img src="images/products/dress-1/img-1.jpg" alt="Ethnic-Inspired Viscose Kaftan">
            <div class="lookbook-item__overlay">
              <span class="badge badge-emerald" style="margin-bottom:.5rem;align-self:flex-start">Ethnic Inspired</span>
              <div class="lookbook-item__title">Viscose Kaftan Appliqué</div>
              <div class="lookbook-item__price">${formatPrice(getProductPrice(PRODUCTS[0]))}</div>
            </div>
          </div>

          <div class="lookbook-item" onclick="navigateTo('product',{slug:'premium-viscose-kaftan-collection'})" style="background:var(--emerald-900);display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem">
            <div>
              <div style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-400);margin-bottom:.75rem">Couture Atelier</div>
              <div class="font-serif" style="font-size:2rem;color:var(--cream-100);margin-bottom:1rem">Inquire for Bespoke Orders</div>
              <button class="btn btn-gold" onclick="event.stopPropagation();openWhatsApp('Hello Hoor Collection! I am interested in custom atelier couture.')">
                Contact Stylist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// PAGE: ABOUT
// ============================================================
function renderAboutPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="page-hero" style="padding:6rem 0 3rem;background:linear-gradient(to bottom, var(--emerald-950) 0%, var(--emerald-900) 100%)">
      <div class="container">
        <span style="font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-400);font-weight:600">The Brand</span>
        <h1>The Story of Hoor Collection</h1>
        <p>Reviving centuries-old Pakistani couture craftsmanship with contemporary luxury precision.</p>
      </div>
    </div>

    <section class="section-padding" style="background:var(--cream-200)">
      <div class="container">
        <div class="about-grid">
          <div>
            <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Our Heritage</span>
            <h2 class="font-serif" style="font-size:clamp(2rem,3vw,2.8rem);color:var(--emerald-900);margin:1rem 0 1.5rem">
              Born from a Passion for Uncompromising Opulence
            </h2>
            <p style="color:var(--charcoal-700);line-height:1.8;font-size:1.05rem;margin-bottom:1.25rem">
              Hoor Collection was established with a singular vision: to create heirloom-quality apparel that celebrates Pakistan’s unmatched heritage of textile artistry. In an era of fast fashion, we champion the slow, thoughtful creation of garments meant to be cherished across generations.
            </p>
            <p style="color:var(--charcoal-700);line-height:1.8;font-size:1.05rem;margin-bottom:2rem">
              From our flagship atelier in Lahore, master embroiderers, sketch artists, and pattern makers converge to craft pieces featuring genuine Kora Dabka wirework, crushed silk pleating, and hand-cut appliqué detailing on the finest pure viscose and raw silk fabrics.
            </p>
            <div style="display:flex;gap:2rem;flex-wrap:wrap">
              <div>
                <div style="font-family:var(--font-serif);font-size:2.5rem;color:var(--gold-600);font-weight:700">80+</div>
                <div style="font-size:.85rem;color:var(--charcoal-600)">Hours Handcrafting Per Bridal</div>
              </div>
              <div>
                <div style="font-family:var(--font-serif);font-size:2.5rem;color:var(--gold-600);font-weight:700">100%</div>
                <div style="font-size:.85rem;color:var(--charcoal-600)">Pure Loomed Silks & Viscose</div>
              </div>
              <div>
                <div style="font-family:var(--font-serif);font-size:2.5rem;color:var(--gold-600);font-weight:700">30+</div>
                <div style="font-size:.85rem;color:var(--charcoal-600)">Countries Shipped Worldwide</div>
              </div>
            </div>
          </div>

          <div class="about-image-wrap">
            <img src="images/products/dress-1/img-3.jpg" alt="Artisan hand embroidering fabric">
          </div>
        </div>
      </div>
    </section>
  `;
}

// ============================================================
// PAGE: CONTACT / CONCIERGE
// ============================================================
function renderContactPage() {
  const root = document.getElementById('app-root');
  if (!root) return;

  root.innerHTML = `
    <div class="page-hero" style="padding:6rem 0 3rem;background:linear-gradient(to bottom, var(--emerald-950) 0%, var(--emerald-900) 100%)">
      <div class="container">
        <span style="font-size:.75rem;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-400);font-weight:600">Concierge & Bespoke</span>
        <h1>Connect with Our Atelier</h1>
        <p>Private appointments, bridal consultations, custom sizing guidance, and international inquiries.</p>
      </div>
    </div>

    <section class="section-padding" style="background:var(--cream-200)">
      <div class="container">
        <div class="contact-grid">
          <div>
            <span style="font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-600);font-weight:600">Personal Assistance</span>
            <h2 class="font-serif" style="font-size:2.2rem;color:var(--emerald-900);margin:.75rem 0 1.25rem">
              Speak Directly with Our Head Stylist
            </h2>
            <p style="color:var(--charcoal-700);line-height:1.7;margin-bottom:2rem">
              Whether you need guidance on which kaftan silhouette flatters your stature, need custom alterations for an upcoming wedding, or want to place an international corporate order, our concierge team is available 7 days a week.
            </p>

            <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:2rem">
              <div style="display:flex;align-items:center;gap:1rem;background:white;padding:1.25rem;border-radius:1rem;border:1px solid rgba(212,175,55,.2)">
                <div style="width:48px;height:48px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.918 1.381 5.594L0 24l6.594-1.381A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.714.779.793-3.671-.232-.371A9.818 9.818 0 1112 21.818z"/></svg>
                </div>
                <div>
                  <div style="font-weight:600;color:var(--emerald-900)">Instant WhatsApp Concierge</div>
                  <div style="font-size:.85rem;color:var(--charcoal-600)">Direct line to stylist: +${CONFIG.whatsappNumber}</div>
                  <button class="btn btn-whatsapp" style="padding:.35rem .75rem;font-size:.75rem;margin-top:.5rem" onclick="openWhatsApp('Hello Hoor Collection! I would like to consult with your concierge team.')">
                    Open WhatsApp Chat
                  </button>
                </div>
              </div>

              <div style="display:flex;align-items:center;gap:1rem;background:white;padding:1.25rem;border-radius:1rem;border:1px solid rgba(212,175,55,.2)">
                <div style="width:48px;height:48px;border-radius:50%;background:rgba(212,175,55,.15);display:flex;align-items:center;justify-content:center;color:var(--gold-600);flex-shrink:0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div style="font-weight:600;color:var(--emerald-900)">Lahore Couture Atelier</div>
                  <div style="font-size:.85rem;color:var(--charcoal-600)">Gulberg III, Lahore, Punjab, Pakistan</div>
                  <div style="font-size:.75rem;color:var(--charcoal-500);margin-top:.25rem">By appointment only · Monday to Saturday</div>
                </div>
              </div>
            </div>
          </div>

          <!-- CONTACT FORM -->
          <div style="background:white;padding:2.5rem;border-radius:1.5rem;border:1px solid rgba(212,175,55,.2);box-shadow:var(--shadow-luxury)">
            <h3 class="font-serif" style="font-size:1.6rem;color:var(--emerald-900);margin-bottom:1.5rem">Send an Inquiry</h3>
            <form onsubmit="handleContactSubmit(event)">
              <div class="contact-form-field">
                <label>Your Full Name *</label>
                <input type="text" id="contact-name" class="contact-input" required placeholder="e.g. Ayesha Khan">
              </div>

              <div class="contact-form-field">
                <label>WhatsApp / Phone Number *</label>
                <input type="tel" id="contact-phone" class="contact-input" required placeholder="e.g. +92 300 1234567">
              </div>

              <div class="contact-form-field">
                <label>Inquiry Type</label>
                <select id="contact-type" class="contact-input">
                  <option>Bridal Consultation (Khuda Baksh 3PC)</option>
                  <option>Custom Stitching / Sizing Guidance</option>
                  <option>International Shipping Inquiry</option>
                  <option>Order Status Update</option>
                  <option>Other Bespoke Request</option>
                </select>
              </div>

              <div class="contact-form-field">
                <label>Your Message / Specific Requirements</label>
                <textarea id="contact-message" class="contact-input" rows="4" placeholder="Tell us about your event, preferred dress, or custom dimensions..."></textarea>
              </div>

              <button type="submit" class="btn btn-emerald btn-full" style="margin-top:1rem">
                Send Inquiry to Atelier
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name')?.value;
  const phone = document.getElementById('contact-phone')?.value;
  const type = document.getElementById('contact-type')?.value;
  const msg = document.getElementById('contact-message')?.value;

  const payload = [
    '✨ *HOOR COLLECTION — CLIENT INQUIRY*',
    '',
    `👤 *Name:* ${name}`,
    `📱 *Phone:* ${phone}`,
    `🏷️ *Type:* ${type}`,
    `📝 *Message:* ${msg || 'N/A'}`
  ].join('\n');

  openWhatsApp(payload);
  showToast({ type: 'success', title: 'Inquiry Sent', description: 'Opening WhatsApp to deliver your inquiry directly to our atelier.' });
}

// ============================================================
// INITIALIZATION ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const savedCurr = localStorage.getItem('hoor-currency');
  if (savedCurr && CONFIG.currency.available.includes(savedCurr)) {
    AppState.currency = savedCurr;
    document.querySelectorAll('.current-currency-text').forEach(el => el.textContent = savedCurr);
  }

  initCustomCursor();
  initHeaderScroll();
  initRouter();
  updateCartBadge();
  updateWishlistBadge();
  renderCartDrawer();
  renderWishlistDrawer();
});
