const GOOGLE_APPS_SCRIPT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbysNX2uzNOozpgABfSedeetCC5_aWkIsTUeNY00vQ0E6a3Yb3G8KC5vGaFInsJwhBnp/exec';
    const SUPABASE_URL = 'https://mzquhkqyggctyxqfppqh.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16cXVoa3F5Z2djdHl4cWZwcHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxMjk2OTksImV4cCI6MjEwMjcwNTY5OX0.a7OKi1yDaxjPcoUpFplJgHPpwRSRtQb0YSgxSsNGRVY';
    const supabaseReady = window.supabase && !SUPABASE_URL.includes('YOUR-PROJECT') && !SUPABASE_ANON_KEY.includes('YOUR_');
    const db = supabaseReady ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

    // Custom Alert/Confirmation Modal Helper
    function showCustomAlert({ title, message, type = 'info', confirmText = 'OK', showCancel = false }) {
      return new Promise((resolve) => {
        const modal = document.getElementById('alert-modal');
        const titleEl = document.getElementById('alert-modal-title');
        const messageEl = document.getElementById('alert-modal-message');
        const iconEl = document.getElementById('alert-modal-icon');
        const confirmBtn = document.getElementById('alert-modal-confirm');
        const cancelBtn = document.getElementById('alert-modal-cancel');

        titleEl.textContent = title;
        messageEl.textContent = message;
        confirmBtn.textContent = confirmText;

        // Custom Icon SVG selection based on type
        if (type === 'warning' || type === 'confirm') {
          iconEl.className = "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner";
          iconEl.innerHTML = `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
        } else if (type === 'error') {
          iconEl.className = "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-inner";
          iconEl.innerHTML = `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
        } else {
          iconEl.className = "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-powder/50 text-navy shadow-inner";
          iconEl.innerHTML = `<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
        }

        if (showCancel) {
          cancelBtn.classList.remove('hidden');
        } else {
          cancelBtn.classList.add('hidden');
        }

        modal.classList.remove('hidden');

        const handleConfirm = () => {
          cleanup();
          resolve(true);
        };

        const handleCancel = () => {
          cleanup();
          resolve(false);
        };

        const cleanup = () => {
          modal.classList.add('hidden');
          confirmBtn.removeEventListener('click', handleConfirm);
          cancelBtn.removeEventListener('click', handleCancel);
        };

        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
      });
    }

    const defaultGalleryPhotos = [
      { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85', alt: 'Couple walking together', label: 'A beginning' },
      { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85', alt: 'Wedding celebration', label: 'The little moments' },
      { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85', alt: 'Wedding flowers and rings', label: 'Details we love' },
      { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=85', alt: 'Bride and groom outdoors', label: 'Side by side' },
      { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85', alt: 'The Bride & the Groom', label: 'Gathered together' },
      { src: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85', alt: 'Wedding couple portrait', label: 'Our favorite chapter' },
      { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85', alt: 'Elegant wedding venue', label: 'Make a memory' },
      { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Elegant wedding venue', label: 'Together With God' },
      { src: 'https://images.unsplash.com/photo-1583939411023-14783179e581?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Elegant wedding ceremony', label: 'Our Ceremony' }
    ];
    let galleryPhotos = JSON.parse(localStorage.getItem('daniel-hannah-gallery-v3') || 'null') || defaultGalleryPhotos;
    let activePhoto = 0;
    let carouselTimer;

    function photoMarkup(photo) {
      return `<img src="${photo.src}" alt="${photo.alt}" class="h-full w-full object-cover">`;
    }

    function renderCarousel() {
      if (!galleryPhotos.length) return;
      const photo = galleryPhotos[activePhoto];
      document.getElementById('carousel-track').innerHTML = `<button type="button" class="gallery-image group absolute inset-0 h-full w-full text-left" data-photo-index="${activePhoto}" aria-label="Open ${photo.label}">${photoMarkup(photo)}<span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent px-6 pb-14 pt-16 font-script text-4xl sm:text-5xl tracking-wide text-white drop-shadow-md">${photo.label}</span></button>`;
      document.getElementById('carousel-dots').innerHTML = galleryPhotos.slice(0, 4).map((_, index) => `<button type="button" data-slide-index="${index}" class="h-2.5 w-2.5 rounded-full border border-white ${index === activePhoto ? 'bg-white' : 'bg-transparent'}" aria-label="Show featured photo ${index + 1}"></button>`).join('');
    }

    function changePhoto(index) { activePhoto = (index + galleryPhotos.length) % galleryPhotos.length; renderCarousel(); }
    function restartCarousel() { clearInterval(carouselTimer); carouselTimer = setInterval(() => changePhoto(activePhoto + 1), 5000); }

    function renderGalleryGrid() { document.getElementById('gallery-grid').innerHTML = galleryPhotos.slice(1).map((photo, index) => `<button type="button" data-photo-index="${index + 1}" class="gallery-image group aspect-square overflow-hidden rounded-2xl text-left" aria-label="Open ${photo.label}">${photoMarkup(photo)}<span class="sr-only">${photo.label}</span></button>`).join(''); }
    renderGalleryGrid();
    renderCarousel();
    restartCarousel();

    window.addEventListener('storage', event => {
      if (event.key !== 'daniel-hannah-gallery' || !event.newValue) return;
      try { galleryPhotos = JSON.parse(event.newValue); activePhoto = 0; renderGalleryGrid(); renderCarousel(); restartCarousel(); } catch (error) { console.error('Could not sync gallery changes.', error); }
    });

    document.getElementById('carousel-prev').addEventListener('click', () => { changePhoto(activePhoto - 1); restartCarousel(); });
    document.getElementById('carousel-next').addEventListener('click', () => { changePhoto(activePhoto + 1); restartCarousel(); });
    document.getElementById('carousel-dots').addEventListener('click', event => { const button = event.target.closest('[data-slide-index]'); if (button) { changePhoto(Number(button.dataset.slideIndex)); restartCarousel(); } });

    // Lightbox Function
    const lightbox = document.getElementById('lightbox');
    function showLightbox(index) { 
      activePhoto = (index + galleryPhotos.length) % galleryPhotos.length; 
      const photo = galleryPhotos[activePhoto]; 
      document.getElementById('lightbox-image').src = photo.src; 
      document.getElementById('lightbox-image').alt = photo.alt; 
      document.getElementById('lightbox-caption').textContent = photo.label; 
      lightbox.classList.remove('hidden'); 
      lightbox.classList.add('flex'); 
      document.body.classList.add('overflow-hidden');
      document.getElementById('lightbox-close').focus(); 
    }

    function closeLightbox() { 
      lightbox.classList.add('hidden'); 
      lightbox.classList.remove('flex'); 
      document.body.classList.remove('overflow-hidden');
    }

    document.addEventListener('click', event => { const trigger = event.target.closest('[data-photo-index]'); if (trigger) showLightbox(Number(trigger.dataset.photoIndex)); });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => showLightbox(activePhoto - 1));
    document.getElementById('lightbox-next').addEventListener('click', () => showLightbox(activePhoto + 1));
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', event => { if (lightbox.classList.contains('hidden')) return; if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') showLightbox(activePhoto - 1); if (event.key === 'ArrowRight') showLightbox(activePhoto + 1); });

    document.getElementById('open-invitation').addEventListener('click', async () => {
        const audio = document.getElementById('wedding-audio');
        const overlay = document.getElementById('welcome-overlay');
        const siteContent = document.getElementById('site-content');

        // Patugtugin ang background music
        try { 
            await audio.play(); 
            document.getElementById('music-icon').textContent = '❚❚'; 
            document.getElementById('music-toggle').setAttribute('aria-label', 'Pause background music'); 
        } catch (error) {
            console.log("Audio play prevented by browser policy:", error);
        }

        // Ipakita ang Main Content & Itago ang Welcome Overlay
        siteContent.classList.remove('hidden');
        overlay.classList.add('pointer-events-none');
        overlay.classList.add('is-opening');
        window.setTimeout(() => overlay.classList.add('hidden'), 1150);

        // Reveal the FAQ widget only after the curtain transition completes.
        window.setTimeout(() => {
          const faqWidget = document.getElementById('faq-widget-container');
          if (faqWidget) faqWidget.style.setProperty('display', 'block', 'important');
        }, 1150);
    });

    const weddingDate = new Date('2026-12-29T15:00:00+08:00');
    function updateCountdown() {
      const remaining = Math.max(0, weddingDate - new Date());
      const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
      ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => { document.getElementById(id).textContent = String(values[index]).padStart(2, '0'); });
    }
    updateCountdown(); setInterval(updateCountdown, 1000);

    function escapeHtml(value) { const div = document.createElement('div'); div.textContent = value || ''; return div.innerHTML; }
    function renderWishes(rows) {
      const list = document.getElementById('guestbook-list');
      const status = document.getElementById('guestbook-status');
      if (!rows || !rows.length) { if (status) status.textContent = 'Be the first to leave a wish.'; list.innerHTML = ''; return; }
      if (status) status.textContent = '';
      const cards = rows.map(row => `<article class="wish-card mx-2 flex shrink-0 flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:mx-3 sm:p-6"><p class="font-display text-xl leading-[1.2] text-powder sm:text-2xl">“${escapeHtml(row.wishes)}”</p><p class="mt-5 text-[10px] font-bold uppercase leading-4 tracking-[.18em] text-white/60 sm:text-xs sm:tracking-widest">${escapeHtml(row.full_name)}</p></article>`).join('');
      list.innerHTML = (rows.length > 2) ? (cards + cards) : cards;
    }

    const wishesTrack = document.getElementById('guestbook-list');
    if (wishesTrack) {
      wishesTrack.addEventListener('touchstart', () => wishesTrack.classList.add('is-paused'), { passive: true });
      wishesTrack.addEventListener('touchend', () => wishesTrack.classList.remove('is-paused'), { passive: true });
      wishesTrack.addEventListener('touchcancel', () => wishesTrack.classList.remove('is-paused'), { passive: true });
      wishesTrack.addEventListener('focusin', () => wishesTrack.classList.add('is-paused'));
      wishesTrack.addEventListener('focusout', () => wishesTrack.classList.remove('is-paused'));
    }

    async function loadWishes() {
      if (!db) { renderWishes([]); return; }
      const { data, error } = await db.from('rsvp').select('full_name, wishes, created_at').eq('approved', true).not('wishes', 'is', null).order('created_at', { ascending: false }).limit(12);
      if (error) { document.getElementById('guestbook-list').innerHTML = '<p class="text-sm text-white/60">The guestbook is taking a moment to open.</p>'; return; }
      renderWishes(data || []);
      db.channel('guestbook-live').on('postgres_changes', { event: '*', schema: 'public', table: 'rsvp', filter: 'approved=eq.true' }, loadWishes).subscribe();
    }
    loadWishes();

    let allGuestsList = [];
    let confirmedIdsSet = new Set();

    async function loadGuests() {
      const searchInput = document.getElementById('guest-search-input');
      if (!searchInput || !db) return;

      try {
        const { data: guests } = await db.from('guests').select('id, full_name').order('full_name', { ascending: true }).range(0, 999);
        const { data: rsvpList } = await db.from('rsvp').select('guest_id');
        confirmedIdsSet = new Set((rsvpList || []).map(r => r.guest_id));
        allGuestsList = guests || [];
        searchInput.placeholder = allGuestsList.length ? 'Type your name here...' : 'No guests found';
      } catch (err) {
        searchInput.placeholder = 'Guest list unavailable';
      }
    }

    function closeAllCustomDropdowns() {
      const dropdowns = ['attendance-options'];
      const arrows = ['attendance-arrow'];
      
      dropdowns.forEach((id, idx) => {
        const el = document.getElementById(id);
        const arrow = document.getElementById(arrows[idx]);
        if (el) el.classList.add('hidden');
        if (arrow) arrow.classList.remove('rotate-180');
      });
    }

    // UPDATED Custom Dropdown Handler
    function setupCustomDropdown(triggerId, optionsId, arrowId, selectedTextId, hiddenInputId, optionClass) {
      const trigger = document.getElementById(triggerId);
      const optionsMenu = document.getElementById(optionsId);
      const arrow = document.getElementById(arrowId);
      const selectedText = document.getElementById(selectedTextId);
      const hiddenInput = document.getElementById(hiddenInputId);

      if (!trigger || !optionsMenu) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCurrentlyHidden = optionsMenu.classList.contains('hidden');
        const resultsList = document.getElementById('guest-results-list');
        if (resultsList) resultsList.classList.add('hidden');
        closeAllCustomDropdowns();

        if (isCurrentlyHidden) {
          optionsMenu.classList.remove('hidden');
          if (arrow) arrow.classList.add('rotate-180');
        }
      });

      optionsMenu.querySelectorAll(`.${optionClass}`).forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetOption = e.currentTarget;
          const val = targetOption.getAttribute('data-value');
          
          // Extract text label cleanly ignoring badge elements
          const textSpan = targetOption.querySelector('span:first-child') || targetOption;
          selectedText.textContent = textSpan.textContent.trim();
          hiddenInput.value = val;

          // Update active option styling dynamically
          optionsMenu.querySelectorAll(`.${optionClass}`).forEach(opt => {
            opt.classList.remove('bg-powder/60', 'font-semibold');
            opt.classList.add('font-medium', 'text-slate-600');
          });
          targetOption.classList.add('bg-powder/60', 'font-semibold');
          targetOption.classList.remove('text-slate-600');

          optionsMenu.classList.add('hidden');
          if (arrow) arrow.classList.remove('rotate-180');
        });
      });
    }

    // Live Character Counter Functionality
    function bindCharCounter(inputId, counterId, maxLen = 250) {
      const inputEl = document.getElementById(inputId);
      const counterEl = document.getElementById(counterId);

      if (!inputEl || !counterEl) return;

      const updateCount = () => {
        const currentLength = inputEl.value.length;
        counterEl.textContent = `${currentLength} / ${maxLen}`;

        if (currentLength >= maxLen) {
          counterEl.classList.remove('text-steel');
          counterEl.classList.add('text-amber-600', 'font-bold');
        } else {
          counterEl.classList.remove('text-amber-600');
          counterEl.classList.add('text-steel');
        }
      };

      inputEl.addEventListener('input', updateCount);
      updateCount();
    }

    // UPDATED Event Listeners Registration
    document.addEventListener('DOMContentLoaded', () => {
      loadGuests();
      
      // Bind live counters
      bindCharCounter('wishes-input', 'wishes-counter', 250);

      const searchInput = document.getElementById('guest-search-input');
      const resultsList = document.getElementById('guest-results-list');
      const hiddenIdInput = document.getElementById('selected-guest-id');

      if (searchInput && resultsList) {
        searchInput.addEventListener('focus', () => {
          closeAllCustomDropdowns();
        });

        searchInput.addEventListener('input', (e) => {
          closeAllCustomDropdowns();
          const query = e.target.value.toLowerCase().trim();
          hiddenIdInput.value = '';
          if (!query) { resultsList.classList.add('hidden'); return; }
          renderSearchList(allGuestsList.filter(g => g.full_name.toLowerCase().includes(query)));
        });

        document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && !resultsList.contains(e.target)) {
            resultsList.classList.add('hidden');
          }
          closeAllCustomDropdowns();
        });
      }

      function renderSearchList(list) {
        resultsList.innerHTML = '';
        if (list.length === 0) {
          resultsList.innerHTML = `<li class="px-4 py-2.5 text-slate-400 italic">No matching guest found</li>`;
        } else {
          list.forEach(guest => {
            const isConfirmed = confirmedIdsSet.has(guest.id);
            const li = document.createElement('li');
            if (isConfirmed) {
              li.className = 'px-4 py-2.5 text-slate-400 bg-slate-50 cursor-not-allowed flex items-center justify-between font-medium';
              li.innerHTML = `<span>${escapeHtml(guest.full_name)}</span> <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">RSVP Confirmed</span>`;
            } else {
              li.className = 'cursor-pointer px-4 py-2.5 hover:bg-powder/40 hover:text-navy transition-colors font-medium';
              li.textContent = guest.full_name;
              li.addEventListener('click', () => {
                searchInput.value = guest.full_name;
                hiddenIdInput.value = guest.id;
                resultsList.classList.add('hidden');
              });
            }
            resultsList.appendChild(li);
          });
        }
        resultsList.classList.remove('hidden');
      }

      // Initialize Custom Dropdowns with Updated Selectors
      setupCustomDropdown('attendance-trigger', 'attendance-options', 'attendance-arrow', 'attendance-selected-text', 'attendance-input', 'attendance-option');
    });

    const offlineRsvpKey = 'daniel-hannah-offline-rsvps';
    function getOfflineRsvps() { try { return JSON.parse(localStorage.getItem(offlineRsvpKey) || '[]'); } catch (error) { return []; } }
    function saveOfflineRsvp(rsvp) { const records = getOfflineRsvps(); const existingIndex = records.findIndex(record => record.guest_id === rsvp.guest_id); if (existingIndex >= 0) records[existingIndex] = { ...records[existingIndex], ...rsvp, updated_at: new Date().toISOString() }; else records.unshift({ ...rsvp, local_id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), captured_at: new Date().toISOString(), synced: false }); localStorage.setItem(offlineRsvpKey, JSON.stringify(records)); }
    async function sendToGoogleSheets(rsvp) {
      if (!GOOGLE_APPS_SCRIPT_WEBHOOK_URL || GOOGLE_APPS_SCRIPT_WEBHOOK_URL.includes('YOUR_')) return false;
      try { await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(rsvp) }); return true; } catch (error) { return false; }
    }

    // Dynamic Form Submission Logic with Modern Styled Custom Alert Modal
    document.getElementById('rsvp-form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const button = document.getElementById('rsvp-submit');
      const status = document.getElementById('form-status');

      if (!form.checkValidity()) { form.reportValidity(); return; }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const guestId = payload.guest_id;
      const attendanceValue = payload.attendance;

      // 1. Validation check for guest selection
      if (!guestId) {
        await showCustomAlert({
          title: "Guest Required",
          message: "Please search and select your name from the guest list before submitting.",
          type: "warning",
          confirmText: "Got it"
        });
        return;
      }

      // 2. Custom Confirmation Modal (replaces window.confirm)
      const isDeclining = attendanceValue === 'declining';
      const userConfirmed = await showCustomAlert({
        title: isDeclining ? "Confirm Decline" : "Confirm RSVP",
        message: isDeclining 
          ? "Are you sure you want to submit your RSVP as 'Sadly declining'?" 
          : "Are you sure you want to submit your RSVP as 'Joyfully attending'?",
        type: isDeclining ? "warning" : "confirm",
        confirmText: isDeclining ? "Yes, Decline" : "Yes, Submit RSVP",
        showCancel: true
      });

      if (!userConfirmed) return;

      button.disabled = true; 
      button.textContent = 'Sending...'; 
      status.textContent = '';

      const selectedName = document.getElementById('guest-search-input').value.trim();
      const offlinePayload = { guest_id: guestId, full_name: selectedName, attendance: payload.attendance, wishes: payload.wishes || null, synced: false };
      const { data: guest } = db ? await db.from('guests').select('id, full_name').eq('id', guestId).single() : { data: { id: guestId, full_name: selectedName } };
      if (guest?.full_name) offlinePayload.full_name = guest.full_name;
      saveOfflineRsvp(offlinePayload);

      const submission = { guest_id: guestId, full_name: offlinePayload.full_name, attendance: payload.attendance, wishes: offlinePayload.wishes, submitted_at: new Date().toISOString() };
      const supabasePayload = { guest_id: submission.guest_id, full_name: submission.full_name, attendance: submission.attendance, wishes: submission.wishes };
      const supabaseSubmission = db && guest ? db.from('rsvp').upsert(supabasePayload, { onConflict: 'guest_id' }).then(result => !result.error).catch(() => false) : Promise.resolve(false);
      const [supabaseSaved, sheetsSaved] = await Promise.all([supabaseSubmission, sendToGoogleSheets(submission)]);
      button.disabled = false; button.textContent = 'Send my RSVP';
      if (!supabaseSaved && !sheetsSaved) { 
        status.textContent = 'Saved locally, but the database and Google Sheets backup were unavailable.'; 
        status.className = 'mt-4 text-center text-sm text-red-700'; 
        return; 
      }

      const records = getOfflineRsvps();
      const savedRecord = records.find(record => record.guest_id === guestId);
      if (savedRecord) { savedRecord.synced = supabaseSaved; savedRecord.webhook_saved = sheetsSaved; localStorage.setItem(offlineRsvpKey, JSON.stringify(records)); }

      if (isDeclining) {
        status.textContent = 'Thank you for letting us know! We will miss you on our special day.';
      } else {
        await generateThankYouPass(offlinePayload.full_name, guestId);
        status.textContent = supabaseSaved && sheetsSaved ? 'Thank you! Your RSVP has been saved to our database and backup. Your confirmation card is downloading.' : 'Thank you! Your RSVP has been received. Your confirmation card is downloading.';
      }
      form.reset();
      document.getElementById('selected-guest-id').value = '';
      
      document.getElementById('attendance-selected-text').textContent = 'Joyfully attending';
      document.getElementById('attendance-input').value = 'attending';

      // Reset live counter labels
      document.getElementById('wishes-counter').textContent = '0 / 250';

      loadGuests();
      status.className = 'mt-4 text-center text-sm text-steel';
    });

    async function generateThankYouPass(guestName, guestId) {
      const pass = document.getElementById('pdf-pass');
      document.getElementById('pdf-guest-name').textContent = guestName;
      document.getElementById('pdf-guest-id').textContent = guestId || 'N/A';
      pass.style.opacity = '1'; pass.style.zIndex = '9999';
      await new Promise(resolve => setTimeout(resolve, 250));
      try {
        const canvas = await html2canvas(pass, { scale: 2, useCORS: true, backgroundColor: '#F8FAFC', logging: false });
        downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `RSVP-Card-${guestName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
        document.body.appendChild(downloadLink); downloadLink.click(); document.body.removeChild(downloadLink);
      } catch (err) { console.error(err); } 
      finally { pass.style.opacity = '0'; pass.style.zIndex = '-50'; }
    }

    const audio = document.getElementById('wedding-audio');
    const musicButton = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const video = document.querySelector('#save-the-date video');

    // I-set ang hina o lakas ng background music (0.2 = 20% volume)
    if (audio) {
      audio.volume = 0.50; 
    }

    let wasMusicPlayingBeforeVideo = false;

    musicButton.addEventListener('click', async () => {
      if (audio.paused) {
        try { 
          await audio.play(); 
          musicIcon.textContent = '❚❚'; 
        } catch (e) {}
      } else {
        audio.pause(); 
        musicIcon.textContent = '♬';
      }
    });

    if (video) {
      video.addEventListener('play', () => {
        if (!audio.paused) {
          wasMusicPlayingBeforeVideo = true;
          audio.pause();
          musicIcon.textContent = '♬';
        }
      });

      video.addEventListener('pause', () => {
        if (wasMusicPlayingBeforeVideo && video.currentTime < video.duration) {
          audio.play().catch(() => {});
          musicIcon.textContent = '❚❚';
          wasMusicPlayingBeforeVideo = false;
        }
      });

      video.addEventListener('ended', () => {
        if (wasMusicPlayingBeforeVideo) {
          audio.play().catch(() => {});
          musicIcon.textContent = '❚❚';
          wasMusicPlayingBeforeVideo = false;
        }
      });
    }

    // Entourage Modal
    const entourageModal = document.getElementById('entourage-modal');
    document.getElementById('open-entourage-modal').addEventListener('click', () => { 
      entourageModal.classList.remove('hidden'); 
      entourageModal.classList.add('flex'); 
      document.body.classList.add('overflow-hidden');
    });
    
    function closeEntourageModal() {
      entourageModal.classList.add('hidden'); 
      entourageModal.classList.remove('flex'); 
      document.body.classList.remove('overflow-hidden');
    }

    document.getElementById('close-entourage-modal').addEventListener('click', closeEntourageModal);
    entourageModal.addEventListener('click', (e) => {
      if (e.target === entourageModal) {
        closeEntourageModal();
      }
    });

    let secretClickCount = 0;
    let secretTimer = null;

    document.getElementById('admin-secret-trigger').addEventListener('click', () => {
      secretClickCount++;
      clearTimeout(secretTimer);

      if (secretClickCount >= 3) {
        window.location.href = 'admin.html';
      }

      secretTimer = setTimeout(() => {
        secretClickCount = 0;
      }, 1500);
    });

    // Detect Messenger / Facebook In-App Browser
    function isMessengerBrowser() {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1) || (ua.indexOf("Messenger") > -1);
    }

    // Auto-check as soon as page loads
    document.addEventListener('DOMContentLoaded', () => {
      if (isMessengerBrowser()) {
        const modal = document.getElementById('messenger-redirect-modal');
        const urlInput = document.getElementById('page-url-input');
        const qrContainer = document.getElementById('qrcode');
        const currentUrl = window.location.href;

        // Show Modal Immediately
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          document.body.classList.add('overflow-hidden'); // Prevent scrolling behind
        }

        // Set URL text
        if (urlInput) urlInput.value = currentUrl;

        // Render QR Code
        if (qrContainer && typeof QRCode !== 'undefined') {
          qrContainer.innerHTML = '';
          new QRCode(qrContainer, {
            text: currentUrl,
            width: 120,
            height: 120,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
        }
      }

      // Copy Button Action
      const copyBtn = document.getElementById('copy-url-btn');
      const copyStatus = document.getElementById('copy-status');
      
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const currentUrl = window.location.href;
          try {
            await navigator.clipboard.writeText(currentUrl);
            copyStatus.textContent = '✓ Link copied! Open it in Chrome or Safari.';
            setTimeout(() => { copyStatus.textContent = ''; }, 4000);
          } catch (err) {
            // Fallback copy strategy
            const input = document.getElementById('page-url-input');
            if (input) {
              input.select();
              document.execCommand('copy');
              copyStatus.textContent = '✓ Link copied!';
              setTimeout(() => { copyStatus.textContent = ''; }, 4000);
            }
          }
        });
      }

      // Allow guest to close modal if they really want to proceed
      const closeModalBtn = document.getElementById('close-messenger-modal');
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
          const modal = document.getElementById('messenger-redirect-modal');
          if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
          }
        });
      }
    });

    // Profile Avatars Configuration
    const CHAT_AVATARS = {
        ai: "Picture/dannah.png",
        user: "favicon.svg"
    };

    // Toggle Chat Window Open / Close
    function toggleFaqChat() {
        const chatWindow = document.getElementById('faq-chat-window');
        const badge = document.getElementById('chat-badge');
        
        if (chatWindow) {
            if (chatWindow.classList.contains('hidden')) {
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('flex');
                if (badge) badge.classList.add('hidden'); // Hide unread indicator
                const inputEl = document.getElementById('chat-input');
                if (inputEl) inputEl.focus();
            } else {
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
            }
        }
    }

    // FAQ Keyword Database
    const faqKnowledgeBase = [
        {
        keywords: ['dress code', 'attire', 'suot', 'damit', 'outfit', 'color', 'kulay', 'theme'],
        answer: "Ang dress code po ay <b>Formal / Semi-Formal</b> sa shades ng Navy, Dusty, at Powder Blue.<br>• <b>Gentlemen:</b> Suit, Barong, o Long Sleeve with Slacks.<br>• <b>Ladies:</b> Long Gown, Formal Dress, o Chic Cocktail Dress."
        },
        {
            keywords: ['venue', 'location', 'lugar', 'saan', 'time', 'oras', 'oras ng kasal', 'date', 'schedule'],
            answer: "• <b>Ceremony:</b> IOWO Novaliches Church, 8:30 AM<br>• <b>Reception:</b> Artan Garden Eiffel Tower, after ceremony<br>Mangyaring dumating nang 30 mins bago ang oras."
        },
        {
            keywords: ['gift', 'regalo', 'registry', 'cash', 'present', 'bigay'],
            answer: "Ang inyo pong pagdalo at panalangin ang pinakamagandang regalo! Ngunit kung nais niyo kaming bigyan ng monetary gift para sa aming bagong simula, labis po namin itong ipagpapasalamat."
        },
        {
            keywords: ['plus one', 'kids', 'bata', 'kasama', 'extra', 'guest', 'anak'],
            answer: "Dahil sa limited seating capacity, ang imbitasyon po ay strictly para lamang sa mga pangalang nakasaad sa inyong RSVP pass."
        },
        {
            keywords: ['parking', 'park', 'sasakyan', 'car'],
            answer: "May nakalaan pong ample parking space sa reception area para sa lahat ng bisita."
        },
        {
            keywords: ['confirm', 'pass', 'download', 'card', 'form', 'registration'],
            answer: "Maaari kayong mag-RSVP sa aming RSVP Section sa pahinang ito at i-download ang inyong pass!"
        },
        {
            keywords: ['deadline', 'hanggang kailan', 'kailan deadline', 'until when', 'due date', 'last day', 'kelan deadline', 'kailan rsvp'],
            answer: "Naka-reserve na po ang inyong upuan! Mangyaring mag-RSVP o magbigay ng inyong tugon bago o sa Disyembre 7, 2026 (7 December 2026)."
        },
        {
            keywords: ['meaning', 'kahulugan', 'ano ang rsvp', 'what is rsvp', 'ibig sabihin', 'ano ibig sabihin'],
            answer: "Ang RSVP ay nagmula sa pariralang Pranses na 'Répondez s'il vous plaît' na nangangahulugang 'Please reply' o 'Pakiusap na sumagot'. Ginagamit ito para kumpirmahin kung makakadalo ka sa kaganapan upang maipareserba ang inyong upuan."
        },
        {
            keywords: ['chatbot','site', 'website', 'gumuwa', 'created', 'create', 'develop', 'sino gumawa', 'gumawa', 'developer', 'creator', 'who made', 'who created', 'author', 'contact', 'josiah', 'elijah'],
            answer: "Ang buong website na ito kasama na ang Chatbot ay binuo ni Josiah Elijah! Maaari mo siyang makontak sa Email: je21fer2121@gmail.com o Contact No.: 09214041118."
        },
        {
            keywords: ['hindi umattend','pwede mauna sa reception', 'reception lang', 'reception agad', 'direct reception', 'deretso reception', 'diretso reception', 'pwedeng reception', 'pwede reception', 'skip ceremony', 'di dadalo sa ceremony', 'hindi dadalo sa ceremony'],
            answer: "Inaasahan po ang pagdalo ng lahat ng bisita sa <b>Ceremony</b> bago ang Reception. Ang pagdalo po sa kasal mismo (Ceremony) ay mandatory at napakahalaga para sa ating ikakasal!"
        }
    ];

    const defaultFallbackAnswer = "⚠️Pasensya na, hindi ko lubos na naintindihan ang tanong mo either ito ay hindi patungkol sa wedding nila Daniel and Hannah or mali ang spelling. Maaari mong itanong tungkol sa <b>Dress Code, Venue/Oras, o Gifts</b> sa pamamagitan ng pag-click sa buttons sa baba!";

    // Append Chat Message with Profile Avatars & Aligned Theme Styling
    function appendChatMessage(sender, text) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const isUser = sender === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex gap-2 ${isUser ? 'flex-row-reverse' : 'justify-start'}`;

        const content = isUser 
            ? `<img src="${CHAT_AVATARS.user}" alt="User" class="w-6 h-6 rounded-full border border-navy shrink-0 mt-0.5 object-cover">
              <div class="bg-navy text-white p-2.5 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm leading-relaxed text-xs font-montserrat">${text}</div>`
            : `<img src="${CHAT_AVATARS.ai}" alt="Dannah AI" class="w-6 h-6 rounded-full border border-powder shrink-0 mt-0.5 object-cover">
              <div class="bg-white border border-powder/30 text-navy p-2.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm leading-relaxed text-xs font-montserrat">${text}</div>`;

        msgDiv.innerHTML = content;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Match Input with FAQ Keywords
    function matchAnswer(userInput) {
        const cleanInput = userInput.toLowerCase();
        for (const item of faqKnowledgeBase) {
            if (item.keywords.some(keyword => cleanInput.includes(keyword))) {
                return item.answer;
            }
        }
        return defaultFallbackAnswer;
    }

    // Process Query and Handle Typing Indicator
    function processQuery(userInputText) {
        if (!userInputText.trim()) return;

        appendChatMessage('user', userInputText);

        const typingIndicator = document.getElementById('chat-typing-indicator');
        const chatMessages = document.getElementById('chat-messages');
        
        if (typingIndicator) typingIndicator.classList.remove('hidden');
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            if (typingIndicator) typingIndicator.classList.add('hidden');
            const responseText = matchAnswer(userInputText);
            appendChatMessage('bot', responseText);
        }, 900);
    }

    // Handle Form Submission
    function handleChatSubmit(e) {
        e.preventDefault();
        const inputEl = document.getElementById('chat-input');
        if (!inputEl) return;
        
        const text = inputEl.value;
        inputEl.value = '';
        processQuery(text);
    }

    // Handle Quick Prompt Buttons
    function sendPrompt(promptText) {
        processQuery(promptText);
    }

    document.querySelectorAll('[data-faq-toggle]').forEach(button => {
      button.addEventListener('click', toggleFaqChat);
    });
    document.querySelectorAll('[data-faq-prompt]').forEach(button => {
      button.addEventListener('click', () => sendPrompt(button.dataset.faqPrompt));
    });
    document.getElementById('chat-form')?.addEventListener('submit', handleChatSubmit);
