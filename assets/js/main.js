/* =========================================
   KOTOV — site interactions
   ========================================= */
(() => {
  "use strict";

  /* ---------- Loader ---------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader && loader.classList.add("is-hidden"), 600);
  });

  /* ---------- Sticky nav + mobile menu ---------- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const navMenu = document.getElementById("navMenu");

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger && burger.addEventListener("click", () => {
    nav.classList.toggle("is-menu-open");
  });
  navMenu && navMenu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("is-menu-open"))
  );

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Gallery data ----------
     To use real photos: drop images into assets/images/ and replace src below.
     Example: { src: "assets/images/work-01.jpg", label: "Fade + Beard" }
  */
  const galleryItems = [
    { src: "https://images.unsplash.com/photo-1521490683864-4ee85b2cf2c6?w=1200&q=80", label: "Classic Fade", cls: "gallery__tile--tall" },
    { src: "https://images.unsplash.com/photo-1635273051936-1a06fc9ee0b9?w=1200&q=80", label: "Beard Shape" },
    { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=80", label: "Texture Crop" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&q=80", label: "Skin Fade", cls: "gallery__tile--wide" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80", label: "Studio Vibe" },
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1200&q=80", label: "Gentleman" },
    { src: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1200&q=80", label: "Side Part" },
    { src: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=1200&q=80", label: "Pompadour" },
    { src: "https://images.unsplash.com/photo-1620932744430-26442e9e1c2c?w=1200&q=80", label: "Royal Shave" },
    { src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1200&q=80", label: "Modern Crop", cls: "gallery__tile--wide" },
    { src: "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?w=1200&q=80", label: "Beard Trim" },
    { src: "https://images.unsplash.com/photo-1521322714240-ee1d383eab62?w=1200&q=80", label: "Detail Work", cls: "gallery__tile--tall" }
  ];

  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid) {
    galleryItems.forEach((item, i) => {
      const tile = document.createElement("button");
      tile.className = `gallery__tile ${item.cls || ""}`;
      tile.dataset.index = String(i);
      tile.innerHTML = `
        <img src="${item.src}" alt="${item.label}" loading="lazy" />
        <span class="gallery__tile-label">${item.label}</span>
      `;
      galleryGrid.appendChild(tile);
    });
  }

  /* ---------- Video data ----------
     To use real videos: place .mp4 files in assets/videos/ and update `src`.
     `poster` is a thumbnail shown before play.
  */
  const videoItems = [
    {
      poster: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=80",
      src: "",
      title: "Skin fade, шаг за шагом",
      meta: "Reels · 0:42"
    },
    {
      poster: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80",
      src: "",
      title: "Атмосфера студии",
      meta: "Behind the scenes"
    },
    {
      poster: "https://images.unsplash.com/photo-1521490683864-4ee85b2cf2c6?w=900&q=80",
      src: "",
      title: "До / После — трансформация",
      meta: "Reels · 0:30"
    }
  ];

  const videoGrid = document.getElementById("videoGrid");
  if (videoGrid) {
    videoItems.forEach((v, i) => {
      const card = document.createElement("button");
      card.className = "video-card";
      card.dataset.video = String(i);
      card.innerHTML = `
        <div class="video-card__poster" style="background-image:url('${v.poster}')"></div>
        <div class="video-card__play"><span>▶</span></div>
        <div class="video-card__title">${v.title}<small>${v.meta}</small></div>
      `;
      videoGrid.appendChild(card);
    });
  }

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbStage = document.getElementById("lightboxStage");
  const lbClose = document.getElementById("lightboxClose");
  const lbPrev = document.getElementById("lightboxPrev");
  const lbNext = document.getElementById("lightboxNext");

  let lbList = [];
  let lbIndex = 0;

  const renderLb = () => {
    const item = lbList[lbIndex];
    if (!item) return;
    lbStage.innerHTML = "";
    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.label || "";
      lbStage.appendChild(img);
    } else if (item.type === "video") {
      if (item.src) {
        const v = document.createElement("video");
        v.src = item.src;
        v.controls = true;
        v.autoplay = true;
        v.playsInline = true;
        lbStage.appendChild(v);
      } else {
        // No video file yet — show a placeholder card linking to Instagram
        const ph = document.createElement("div");
        ph.style.cssText = `
          background: #161208;
          border: 1px solid rgba(212,175,111,.4);
          padding: 60px 40px;
          border-radius: 18px;
          text-align: center;
          max-width: 460px;
          color: #f4ecdf;
          font-family: 'Playfair Display', serif;
        `;
        ph.innerHTML = `
          <div style="font-size:3rem;margin-bottom:14px;">🎬</div>
          <h3 style="margin:0 0 10px;font-size:1.5rem;">${item.title || "Видео скоро появится"}</h3>
          <p style="color:#aaa;font-family:Inter,sans-serif;margin:0 0 22px;">
            Свежие ролики и Reels — в Instagram мастера.
          </p>
          <a href="https://instagram.com/kotov.haircuts" target="_blank" rel="noopener"
             style="display:inline-block;background:linear-gradient(180deg,#d4af6f,#c9a35a);
                    color:#1a1100;padding:12px 26px;border-radius:999px;font-weight:600;
                    font-family:Inter,sans-serif;text-decoration:none;">
            Открыть @kotov.haircuts
          </a>
        `;
        lbStage.appendChild(ph);
      }
    }
  };

  const openLb = (list, index) => {
    lbList = list;
    lbIndex = index;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    renderLb();
  };
  const closeLb = () => {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    lbStage.innerHTML = "";
  };
  const stepLb = (delta) => {
    if (!lbList.length) return;
    lbIndex = (lbIndex + delta + lbList.length) % lbList.length;
    renderLb();
  };

  galleryGrid && galleryGrid.addEventListener("click", (e) => {
    const tile = e.target.closest(".gallery__tile");
    if (!tile) return;
    const list = galleryItems.map(g => ({ type: "image", src: g.src, label: g.label }));
    openLb(list, Number(tile.dataset.index));
  });

  videoGrid && videoGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".video-card");
    if (!card) return;
    const list = videoItems.map(v => ({ type: "video", src: v.src, title: v.title }));
    openLb(list, Number(card.dataset.video));
  });

  lbClose && lbClose.addEventListener("click", closeLb);
  lbPrev && lbPrev.addEventListener("click", () => stepLb(-1));
  lbNext && lbNext.addEventListener("click", () => stepLb(1));
  lb && lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll(
    ".section__head, .service-card, .review-card, .gallery__tile, .video-card, .about__text, .about__media, .contact__info, .contact__form"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger
        setTimeout(() => entry.target.classList.add("is-visible"), idx * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  revealTargets.forEach(el => io.observe(el));

  /* ---------- Form (demo) ---------- */
  const form = document.getElementById("bookForm");
  const formSuccess = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[name=name]").value.trim();
      const phone = form.querySelector("[name=phone]").value.trim();
      if (!name || !phone) {
        alert("Пожалуйста, укажите имя и телефон");
        return;
      }
      // Demo behavior — wire up to a real backend / Telegram bot / Formspree.
      formSuccess.classList.add("is-shown");
      form.reset();
      setTimeout(() => formSuccess.classList.remove("is-shown"), 5000);
    });
  }
})();
