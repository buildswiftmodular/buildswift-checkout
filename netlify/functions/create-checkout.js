<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BaseBox Builder — BuildSwift Modular</title>
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --green-deep: #1B4332;
    --green-mid: #2D6A4F;
    --green-light: #52B788;
    --gold: #C9A84C;
    --gold-light: #F0D080;
    --cream: #FAF8F3;
    --warm-grey: #E8E4DC;
    --text-dark: #1A1A18;
    --text-mid: #555550;
    --text-light: #999990;
    --white: #FFFFFF;
    --shadow: 0 4px 24px rgba(27,67,50,0.10);
    --shadow-lg: 0 12px 48px rgba(27,67,50,0.16);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--text-dark);
    min-height: 100vh;
    max-width: 1100px;
    margin: 0 auto;
    overflow-x: hidden;
  }

  /* HEADER */
  .site-header {
    background: var(--green-deep);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .site-header .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
    color: var(--white);
  }
  .site-header .logo span { color: var(--gold); }
  .site-header .tagline {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* HERO BAND */
  .hero-band {
    background: linear-gradient(135deg, var(--green-deep) 0%, var(--green-mid) 100%);
    padding: 24px 24px 20px;
    position: relative;
    overflow: hidden;
  }
  .hero-band::after {
    content: '';
    position: absolute;
    right: -60px; top: -60px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: rgba(201,168,76,0.08);
  }
  .hero-band h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    letter-spacing: 3px;
    color: var(--white);
    line-height: 1;
  }
  .hero-band h1 span { color: var(--gold); }
  .hero-band p {
    margin-top: 8px;
    font-size: 14px;
    color: rgba(255,255,255,0.65);
    max-width: 500px;
    line-height: 1.6;
  }

  /* MAIN LAYOUT — single column for Wix embed compatibility */
  .builder-wrap {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* LEFT: CONFIGURATOR */
  .configurator {
    padding: 24px 24px;
    border-right: none;
    border-bottom: 1px solid var(--warm-grey);
  }

  /* SECTION BLOCKS */
  .config-section {
    margin-bottom: 36px;
    animation: fadeUp 0.4s ease both;
  }
  .config-section:nth-child(1) { animation-delay: 0.05s; }
  .config-section:nth-child(2) { animation-delay: 0.10s; }
  .config-section:nth-child(3) { animation-delay: 0.15s; }
  .config-section:nth-child(4) { animation-delay: 0.20s; }
  .config-section:nth-child(5) { animation-delay: 0.25s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .section-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    letter-spacing: 2px;
    color: var(--green-deep);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--warm-grey);
  }
  .section-num {
    background: var(--green-deep);
    color: var(--white);
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    width: 22px; height: 22px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* SIZE CARDS */
  .size-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .size-card {
    border: 2px solid var(--warm-grey);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--white);
    position: relative;
  }
  .size-card:hover { border-color: var(--green-light); }
  .size-card.active {
    border-color: var(--green-deep);
    background: #F0F7F4;
  }
  .size-card.active::after {
    content: '✓';
    position: absolute;
    top: 12px; right: 14px;
    background: var(--green-deep);
    color: white;
    width: 22px; height: 22px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }
  .size-card-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: 1px;
    color: var(--green-deep);
  }
  .size-card-dims {
    font-size: 12px;
    color: var(--text-mid);
    margin: 4px 0 10px;
    font-family: 'DM Mono', monospace;
  }
  .size-card-price {
    font-size: 22px;
    font-weight: 600;
    color: var(--text-dark);
  }
  .size-card-price span {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-light);
  }

  /* 3D RENDER */
  .render-area {
    background: linear-gradient(160deg, #E8F0EC 0%, #D4E6DB 100%);
    border-radius: 14px;
    height: 480px;
    margin-bottom: 28px;
    position: relative;
    overflow: visible;
    border: 1px solid rgba(27,67,50,0.10);
  }
  model-viewer {
    width: 100%;
    height: 100%;
    background: transparent;
  }
  .render-placeholder {
    text-align: center;
  }
  .render-placeholder .box-3d {
    width: 140px;
    height: 80px;
    position: relative;
    margin: 0 auto 12px;
  }
  /* CSS 3D box */
  .box-face {
    position: absolute;
    border: 2px solid rgba(27,67,50,0.25);
  }
  .box-front {
    width: 100px; height: 60px;
    background: rgba(255,255,255,0.75);
    bottom: 0; left: 20px;
  }
  .box-top {
    width: 100px; height: 28px;
    background: rgba(255,255,255,0.55);
    top: 0; left: 20px;
    transform: skewX(-30deg);
    transform-origin: bottom left;
  }
  .box-side {
    width: 28px; height: 60px;
    background: rgba(200,225,210,0.9);
    bottom: 0; right: 12px;
    transform: skewY(-30deg);
    transform-origin: top left;
  }
  .render-placeholder p {
    font-size: 11px;
    color: var(--text-light);
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: 'DM Mono', monospace;
  }
  .render-tags {
    position: absolute;
    bottom: 12px; right: 14px;
    display: flex; gap: 6px;
    flex-wrap: wrap; justify-content: flex-end;
  }
  .render-tag {
    background: var(--green-deep);
    color: var(--white);
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    padding: 3px 8px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.25s;
  }
  .render-tag.visible { opacity: 1; transform: translateY(0); }

  /* TOGGLE OPTIONS */
  .toggle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .toggle-item {
    border: 2px solid var(--warm-grey);
    border-radius: 10px;
    padding: 14px 16px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .toggle-item:hover { border-color: var(--green-light); }
  .toggle-item.active {
    border-color: var(--green-deep);
    background: #F0F7F4;
  }
  .toggle-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toggle-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-dark);
  }
  .toggle-check {
    width: 18px; height: 18px;
    border: 2px solid var(--warm-grey);
    border-radius: 50%;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; color: white;
    flex-shrink: 0;
  }
  .toggle-item.active .toggle-check {
    background: var(--green-deep);
    border-color: var(--green-deep);
  }
  .toggle-item.active .toggle-check::after { content: '✓'; }
  .toggle-price {
    font-size: 14px;
    font-weight: 700;
    color: var(--green-deep);
  }
  .toggle-desc {
    font-size: 11px;
    color: var(--text-light);
    line-height: 1.4;
    margin-top: 2px;
  }

  /* Solar sub-option */
  .solar-sub {
    margin-top: 10px;
    padding: 12px 14px;
    border: 1px dashed var(--warm-grey);
    border-radius: 8px;
    background: #FAFAF7;
    display: none;
  }
  .solar-sub.visible { display: block; }
  .solar-sub-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 8px;
  }
  .solar-mount-btns {
    display: flex; gap: 8px; margin-bottom: 10px;
  }
  .mount-btn {
    flex: 1;
    padding: 8px;
    border: 1px solid var(--warm-grey);
    border-radius: 6px;
    background: white;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    color: var(--text-mid);
  }
  .mount-btn.active {
    border-color: var(--green-deep);
    background: #F0F7F4;
    color: var(--green-deep);
  }
  .battery-addon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border: 1px solid var(--warm-grey);
    border-radius: 7px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 6px;
  }
  .battery-addon:hover { border-color: var(--green-light); }
  .battery-addon.active { border-color: var(--green-deep); background: #F0F7F4; }
  .battery-addon-info { font-size: 12px; }
  .battery-addon-name { font-weight: 600; color: var(--text-dark); }
  .battery-addon-desc { color: var(--text-light); font-size: 11px; margin-top: 1px; }
  .battery-addon-price { font-size: 13px; font-weight: 700; color: var(--green-deep); }

  /* COLOR SELECTORS */
  .color-section { margin-bottom: 16px; }
  .color-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-mid);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .color-scroll {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 8px;
    padding-top: 6px;
  }
  .color-scroll-wrap {
    /* no special overflow needed with wrap */
  }
  .color-chip {
    flex-shrink: 0;
    width: 80px;
    cursor: pointer;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .color-chip:hover { z-index: 10; }
  .color-chip.active .chip-swatch {
    border: 2.5px solid var(--green-deep);
    box-shadow: 0 0 0 2px var(--green-light);
  }
  .chip-swatch {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    border: 2px solid transparent;
    margin-bottom: 4px;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    background-size: cover;
    background-position: center;
    transform-origin: bottom center;
  }
  .color-chip:hover .chip-swatch {
    transform: scale(1.18);
    box-shadow: 0 6px 16px rgba(0,0,0,0.22);
  }
  .color-chip:hover .chip-label {
    font-weight: 600;
    color: var(--text-dark);
  }
  .chip-label {
    font-size: 8px;
    color: var(--text-light);
    line-height: 1.2;
    word-break: break-word;
    font-family: 'DM Mono', monospace;
  }

  /* FRAME TOGGLE */
  .frame-btns {
    display: flex; gap: 10px;
  }
  .frame-btn {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid var(--warm-grey);
    background: white;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
  }
  .frame-btn .swatch-dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.15);
  }
  .frame-btn.active { border-color: var(--green-deep); background: #F0F7F4; }

  /* INSTALLATION */
  .install-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .install-card {
    border: 2px solid var(--warm-grey);
    border-radius: 10px;
    padding: 14px 12px;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--white);
    text-align: center;
  }
  .install-card:hover { border-color: var(--green-light); }
  .install-card.active { border-color: var(--green-deep); background: #F0F7F4; }
  .install-card.disabled { opacity: 0.4; pointer-events: none; }
  .install-icon { font-size: 22px; margin-bottom: 6px; }
  .install-name { font-size: 12px; font-weight: 600; color: var(--text-dark); margin-bottom: 3px; }
  .install-price { font-size: 13px; font-weight: 700; color: var(--green-deep); }
  .install-note { font-size: 10px; color: var(--text-light); margin-top: 2px; line-height: 1.3; }

  /* SHIPPING */
  .shipping-opts { display: flex; gap: 10px; margin-bottom: 14px; }
  .ship-btn {
    flex: 1; padding: 12px;
    border: 2px solid var(--warm-grey);
    border-radius: 10px; background: white;
    cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    text-align: center;
  }
  .ship-btn:hover { border-color: var(--green-light); }
  .ship-btn.active { border-color: var(--green-deep); background: #F0F7F4; }
  .ship-btn.disabled { opacity: 0.38; cursor: not-allowed; pointer-events: none; }
  .ship-btn .ship-price { font-size: 11px; font-weight: 400; color: var(--text-light); margin-top: 2px; }
  .zip-row {
    display: flex; gap: 10px; align-items: flex-end;
  }
  .zip-input-wrap { flex: 1; }
  .zip-input-wrap label { font-size: 11px; color: var(--text-mid); font-weight: 600; display: block; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.8px; }
  .zip-input {
    width: 100%;
    padding: 10px 14px;
    border: 2px solid var(--warm-grey);
    border-radius: 8px;
    font-size: 16px;
    font-family: 'DM Mono', monospace;
    background: white;
    transition: border-color 0.2s;
    color: var(--text-dark);
  }
  .zip-input:focus { outline: none; border-color: var(--green-deep); }
  .zip-calc-btn {
    padding: 10px 18px;
    background: var(--green-deep);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .zip-calc-btn:hover { background: var(--green-mid); }
  .ship-result {
    margin-top: 10px;
    padding: 12px 14px;
    background: #F0F7F4;
    border-radius: 8px;
    border: 1px solid rgba(27,67,50,0.12);
    display: none;
  }
  .ship-result.visible { display: block; }
  .ship-result-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
  .ship-full { color: var(--text-light); font-size: 12px; }
  .ship-full-amt { text-decoration: line-through; color: var(--text-light); }
  .ship-you-pay { font-weight: 600; color: var(--green-deep); font-size: 15px; }
  .ship-savings { font-size: 11px; color: var(--green-light); font-weight: 600; margin-top: 3px; }

  /* BUYER FORM */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .field-wrap { display: flex; flex-direction: column; gap: 5px; }
  .field-wrap label { font-size: 11px; font-weight: 600; color: var(--text-mid); text-transform: uppercase; letter-spacing: 0.8px; }
  .field-wrap input {
    padding: 10px 14px;
    border: 2px solid var(--warm-grey);
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: white;
    color: var(--text-dark);
    transition: border-color 0.2s;
  }
  .field-wrap input:focus { outline: none; border-color: var(--green-deep); }

  /* RIGHT: SUMMARY PANEL */
  .summary-panel {
    background: var(--white);
    padding: 24px 24px;
    position: static;
    border-top: 2px solid var(--warm-grey);
  }
  .summary-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 2px;
    color: var(--green-deep);
    margin-bottom: 20px;
    padding-bottom: 14px;
    border-bottom: 2px solid var(--warm-grey);
  }
  .summary-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 9px 0;
    border-bottom: 1px solid var(--warm-grey);
    font-size: 13px;
    gap: 10px;
  }
  .summary-line:last-of-type { border-bottom: none; }
  .sum-label { color: var(--text-mid); flex: 1; }
  .sum-val { font-weight: 600; color: var(--text-dark); text-align: right; }
  .sum-val.green { color: var(--green-deep); }
  .sum-val.strike { text-decoration: line-through; color: var(--text-light); font-size: 12px; }
  .sum-val.savings { color: var(--green-light); font-size: 12px; }
  .ship-lines { border-bottom: 1px solid var(--warm-grey); padding: 9px 0; }
  .ship-line-row { display: flex; justify-content: space-between; font-size: 13px; padding: 2px 0; }

  .summary-divider {
    height: 1px;
    background: var(--warm-grey);
    margin: 12px 0;
  }
  .summary-subtotal {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 700;
    padding: 12px 0 8px;
    color: var(--text-dark);
  }
  .tax-note {
    font-size: 11px;
    color: var(--text-light);
    line-height: 1.5;
    padding: 10px 12px;
    background: #FAFAF7;
    border-radius: 8px;
    border: 1px dashed var(--warm-grey);
    margin: 8px 0 16px;
    font-style: italic;
  }
  .summary-total {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    padding: 14px 0 16px;
    color: var(--green-deep);
    border-top: 2px solid var(--green-deep);
  }
  .total-note { font-size: 10px; font-weight: 400; color: var(--text-light); }

  /* SUBMIT BUTTON */
  .submit-btn {
    width: 100%;
    padding: 16px;
    background: var(--green-deep);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .submit-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .submit-btn:hover::after { opacity: 0.15; }
  .submit-btn:active { transform: scale(0.98); }
  .submit-btn span { position: relative; z-index: 1; }

  .submit-note {
    text-align: center;
    font-size: 11px;
    color: var(--text-light);
    margin-top: 10px;
    line-height: 1.5;
  }

  /* SUCCESS STATE */
  .success-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(27,67,50,0.92);
    z-index: 999;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .success-overlay.visible { display: flex; }
  .success-box {
    background: white;
    border-radius: 16px;
    padding: 48px 40px;
    max-width: 440px;
    width: 90%;
  }
  .success-icon { font-size: 48px; margin-bottom: 16px; }
  .success-box h2 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--green-deep); letter-spacing: 2px; margin-bottom: 8px; }
  .success-box p { font-size: 14px; color: var(--text-mid); line-height: 1.6; margin-bottom: 24px; }
  .success-close {
    padding: 12px 28px;
    background: var(--green-deep);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }

  /* RESPONSIVE */
  @media (max-width: 600px) {
    .size-cards, .toggle-grid, .install-cards { grid-template-columns: 1fr; }
    .form-grid { grid-template-columns: 1fr; }
    .hero-band h1 { font-size: 36px; }
    .site-header { padding: 14px 16px; }
    .configurator { padding: 20px 16px; }
    .summary-panel { padding: 20px 16px; }
  }
</style>
</head>
<body>

<header class="site-header">
  <div class="logo">Build<span>Swift</span> Modular</div>
  <div class="tagline">Configure Your BaseBox</div>
</header>

<div class="hero-band">
  <h1>BaseBox <span>Builder</span></h1>
  <p>Customize your BaseBox — select your size, colors, add-ons, and delivery options. Get an instant quote delivered to your inbox.</p>
</div>

<div class="builder-wrap">

  <!-- LEFT CONFIGURATOR -->
  <div class="configurator">

    <!-- QR INLINE PANEL — appears above model when triggered -->
    <div id="qrPopup" style="display:none; background:white; border-radius:14px;
      padding:20px 24px; margin-bottom:16px; box-shadow:0 4px 20px rgba(0,0,0,0.12);
      border:1px solid var(--warm-grey);">
      <div style="display:flex; align-items:flex-start; gap:20px; flex-wrap:wrap;">
        <div>
          <div style="font-size:15px; font-weight:700; color:#1B4332; margin-bottom:4px;">View in AR on Your Phone</div>
          <div style="font-size:12px; color:#888; margin-bottom:12px;">Scan with your phone camera</div>
          <div id="qrImgWrap" style="width:160px; height:160px; background:#f5f5f5; border-radius:8px; overflow:hidden;">
            <img id="qrImg" src="data:image/png;base64,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" style="width:160px; height:160px; display:block;" alt="QR Code">
          </div>
        </div>
        <div style="flex:1; min-width:160px;">
          <ol style="font-size:12px; color:#444; line-height:2.0; margin:0 0 16px 0; padding-left:18px;">
            <li>Scan QR with phone camera</li>
            <li>Page opens in phone browser</li>
            <li>Aim camera at your target site</li>
            <li>Tap <strong>View in AR</strong></li>
          </ol>
          <button onclick="document.getElementById('qrPopup').style.display='none'" style="
            background:#1B4332; color:white; border:none; padding:8px 20px;
            border-radius:8px; font-size:12px; font-weight:600; cursor:pointer;
            font-family:'DM Sans',sans-serif;">✕ Close</button>
        </div>
      </div>
    </div>

    <!-- 3D RENDER -->
    <div class="render-area" id="renderArea">
      <model-viewer
        id="modelViewer"
        alt="BaseBox 3D Preview"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        auto-rotate-delay="3000"
        rotation-per-second="20deg"
        ar
        ar-modes="scene-viewer quick-look webxr"
        ar-scale="real"
        style="width:100%; height:100%; background:transparent;"
        camera-orbit="45deg 70deg 6m"
        min-camera-orbit="auto auto 2m"
        max-camera-orbit="auto auto 12m"
      >
        <div slot="progress-bar" style="display:none;"></div>
      </model-viewer>
      <!-- AR button sits outside model-viewer so it always shows -->
      <!-- AR tip shown before buttons -->
      <div style="position:absolute; top:10px; left:10px; right:10px; z-index:20;
        background:rgba(27,67,50,0.82); color:white; border-radius:7px;
        padding:7px 12px; font-size:11px; font-family:'DM Sans',sans-serif;
        line-height:1.5; pointer-events:none;">
        💡 <strong>AR tip:</strong> Point your camera at your target location <em>before</em> tapping View in AR — the unit places where you aim.
      </div>
      <!-- Interior toggle -->
      <button id="interiorToggle" onclick="toggleInterior()" style="
        position:absolute; bottom:14px; left:14px; z-index:20;
        background:rgba(27,67,50,0.85); color:white; border:none;
        padding:10px 14px; border-radius:8px;
        font-family:'DM Sans',sans-serif; font-size:12px;
        font-weight:600; cursor:pointer;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
      ">🏠 Show Interior</button>
      <div id="arBtnWrap" style="position:absolute; bottom:14px; right:14px; z-index:20; display:flex; gap:8px;">
        <button id="arBtn" onclick="launchAR()" style="
          background:#1B4332; color:white; border:none;
          padding:10px 16px; border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:13px;
          font-weight:600; cursor:pointer; display:flex;
          align-items:center; gap:6px; box-shadow:0 2px 8px rgba(0,0,0,0.25);
        ">📱 View in AR</button>
        <button id="qrBtn" onclick="showQR()" style="
          background:#C9A84C; color:#1B2A1F; border:none;
          padding:10px 14px; border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:13px;
          font-weight:600; cursor:pointer; display:flex;
          align-items:center; gap:6px; box-shadow:0 2px 8px rgba(0,0,0,0.2);
        " title="Get QR code to view in AR on your phone">⬛ QR</button>
      </div>

      <div class="render-tags" id="renderTags"></div>
    </div>

    <!-- STEP 1: SIZE -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">1</span> Select Your BaseBox Size</div>
      <div class="size-cards">
        <div class="size-card active" id="card72" onclick="selectSize(72)">
          <div class="size-card-name">BaseBox 72</div>
          <div class="size-card-dims">72 sq ft · Micro Unit</div>
          <div class="size-card-price">$15,399 <span>base</span></div>
        </div>
        <div class="size-card" id="card152" onclick="selectSize(152)">
          <div class="size-card-name">BaseBox 152</div>
          <div class="size-card-dims">152 sq ft · Studio Unit</div>
          <div class="size-card-price">$19,299 <span>base</span></div>
        </div>
      </div>
    </div>

    <!-- STEP 2: ADD-ONS -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">2</span> Add-Ons</div>
      <div class="toggle-grid">
        <div class="toggle-item" id="hvacToggle" onclick="toggleAddon('hvac')">
          <div class="toggle-header">
            <div class="toggle-name">HVAC Mini Split</div>
            <div class="toggle-check" id="hvacCheck"></div>
          </div>
          <div class="toggle-price" id="hvacPriceLabel">+$941</div>
          <div class="toggle-desc">Ductless heat pump, outdoor condenser + indoor wall-mount head unit</div>
          <div id="hvacOptions" style="display:none; margin-top:10px;">
            <div style="font-size:11px; font-weight:600; color:var(--text-mid); text-transform:uppercase; letter-spacing:0.8px; margin-bottom:6px;">BTU Size</div>
            <div style="display:flex; gap:8px;">
              <button id="btu6000btn" onclick="event.stopPropagation(); selectBTU(6000)" style="
                flex:1; padding:7px 4px; border-radius:7px; border:2px solid var(--green-light);
                background:var(--green-deep); color:white; font-family:'DM Sans',sans-serif;
                font-size:11px; font-weight:600; cursor:pointer; line-height:1.3;">
                6,000 BTU<br><span style="font-weight:400; font-size:10px;">Standard</span>
              </button>
              <button id="btu9000btn" onclick="event.stopPropagation(); selectBTU(9000)" style="
                flex:1; padding:7px 4px; border-radius:7px; border:2px solid var(--warm-grey);
                background:white; color:var(--text-dark); font-family:'DM Sans',sans-serif;
                font-size:11px; font-weight:600; cursor:pointer; line-height:1.3;">
                9,000 BTU<br><span style="font-weight:400; font-size:10px;">Pop-up / Extreme Heat</span>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-item" id="solarToggle" onclick="toggleAddon('solar')">
          <div class="toggle-header">
            <div class="toggle-name">Solar Package</div>
            <div class="toggle-check" id="solarCheck"></div>
          </div>
          <div class="toggle-price">+$2,175</div>
          <div class="toggle-desc">4 × 300W panels + battery station, roof or ground mount</div>
        </div>
      </div>

      <!-- Solar sub-options -->
      <div class="solar-sub" id="solarSub">
        <div class="solar-sub-title">Solar Mount Style</div>
        <div class="solar-mount-btns">
          <button class="mount-btn active" id="mountRoof" onclick="setSolarMount('roof')">☀️ Roof Mount</button>
          <button class="mount-btn" id="mountGround" onclick="setSolarMount('ground')">🌿 Ground Mount</button>
        </div>
        <div class="battery-addon" id="batteryAddon" onclick="toggleAddon('battery')">
          <div class="battery-addon-info">
            <div class="battery-addon-name">🔋 Battery Expansion Pack</div>
            <div class="battery-addon-desc">Doubles energy storage — run HVAC all night</div>
          </div>
          <div class="battery-addon-price">+$899</div>
        </div>
      </div>
    </div>

    <!-- STEP 3: EXTERIOR COLOR -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">3</span> Exterior Panel Color</div>

      <div class="color-section">
        <div class="color-label">Frame Color</div>
        <div class="frame-btns">
          <button class="frame-btn active" id="frameBlack" onclick="setFrame('black')">
            <div class="swatch-dot" style="background:#2A2A2A;"></div> Black
          </button>
          <button class="frame-btn" id="frameWhite" onclick="setFrame('white')">
            <div class="swatch-dot" style="background:#EFEFEF; border-color:#ccc;"></div> White
          </button>
        </div>
      </div>

      <div class="color-section">
        <div class="color-label">Panel Style — D-Series (Textured)</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="dSeriesScroll"></div></div>
      </div>

      <div class="color-section">
        <div class="color-label">Panel Style — S-Series (Two-Tone)</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="sSeriesScroll"></div></div>
      </div>

      <div class="color-section">
        <div class="color-label">Flat Steel — Solid Colors</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="solidScroll"></div></div>
      </div>

      <div class="color-section">
        <div class="color-label">Flat Steel — Wood Grain</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="woodScroll"></div></div>
      </div>
    </div>

    <!-- STEP 4: FLOOR COLOR -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">4</span> Interior Floor</div>

      <div class="color-section">
        <div class="color-label">Marble &amp; Stone</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="marbleScroll"></div></div>
      </div>

      <div class="color-section">
        <div class="color-label">SPC Series</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="spcScroll"></div></div>
      </div>

      <div class="color-section">
        <div class="color-label">Wood Plank Series</div>
        <div class="color-scroll-wrap"><div class="color-scroll" id="woodPlankScroll"></div></div>
      </div>
    </div>

    <!-- STEP 5: INSTALLATION -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">5</span> Set Up Option</div>
      <div class="install-cards">
        <div class="install-card active" id="installSelf" onclick="selectInstall('self')">
          <div class="install-icon">🔧</div>
          <div class="install-name">Self Set Up</div>
          <div class="install-price">Included</div>
          <div class="install-note">Minimal assembly required</div>
        </div>
        <div class="install-card" id="installPreset" onclick="selectInstall('preset')">
          <div class="install-icon">🏭</div>
          <div class="install-name">We Pre-Build</div>
          <div class="install-price" id="presetPriceLabel">+$2,100</div>
          <div class="install-note">Pre-assembled, price varies with add-ons</div>
        </div>
      </div>
      <div id="installStateWarn" style="display:none; margin-top:10px; font-size:12px; color:#C05; padding:8px 12px; background:#FFF0F0; border-radius:6px; border:1px solid #FCC;">
        ⚠️ On-site installation is only available in NM, KS, IA, and MO. Enter your zip code below to verify, or choose a different installation option.
      </div>
    </div>

    <!-- STEP 6: SHIPPING -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">6</span> Shipping &amp; Delivery</div>
      <div class="shipping-opts">
        <div class="ship-btn active" id="shipPickup" onclick="selectShipping('pickup')">
          📦 Local Pickup
          <div class="ship-price">Free — Santa Fe, NM</div>
        </div>
        <div class="ship-btn" id="shipDeliver" onclick="selectShipping('deliver')">
          🚚 Ship to Me
          <div class="ship-price">Enter zip to calculate</div>
        </div>
      </div>
      <div id="pickupUnavailNote" style="display:none; margin-top:8px; font-size:12px; color:#805000; padding:8px 12px; background:#FFF8EC; border-radius:6px; border:1px solid #F0D080;">
        📦 Local pickup is not available with on-site installation — we're coming to you!
      </div>
      <div id="zipSection" style="display:none;">
        <div class="zip-row">
          <div class="zip-input-wrap">
            <label>Delivery Zip Code</label>
            <input type="text" class="zip-input" id="zipInput" placeholder="e.g. 90210" maxlength="5" oninput="this.value=this.value.replace(/\D/g,''); checkInstallWarn();">
          </div>
          <button class="zip-calc-btn" onclick="calcShipping()">Calculate</button>
        </div>
        <div class="ship-result" id="shipResult">
          <div class="ship-result-row">
            <span class="ship-full">Full shipping cost: <span class="ship-full-amt" id="shipFullAmt"></span></span>
          </div>
          <div class="ship-result-row" style="margin-top:4px;">
            <span style="font-size:13px;">You pay <small style="color:var(--text-light)">(BuildSwift covers 50%)</small></span>
            <span class="ship-you-pay" id="shipYouPay"></span>
          </div>
          <div class="ship-savings" id="shipSavings"></div>
        </div>
      </div>
    </div>

    <!-- STEP 7: YOUR INFO -->
    <div class="config-section">
      <div class="section-label"><span class="section-num">7</span> Your Information</div>
      <div class="form-grid">
        <div class="field-wrap">
          <label>First &amp; Last Name</label>
          <input type="text" id="buyerName" placeholder="Jane Smith">
        </div>
        <div class="field-wrap">
          <label>Email Address</label>
          <input type="email" id="buyerEmail" placeholder="jane@email.com">
        </div>
        <div class="field-wrap">
          <label>Phone Number</label>
          <input type="tel" id="buyerPhone" placeholder="(555) 000-0000">
        </div>
        <div class="field-wrap">
          <label>Zip Code</label>
          <input type="text" id="buyerZip" placeholder="87501" maxlength="5" oninput="this.value=this.value.replace(/\D/g,''); checkInstallWarn();">
        </div>
      </div>
      <div class="field-wrap" style="margin-top:12px;">
        <label>Special Notes / Use Case</label>
        <textarea id="buyerNotes" placeholder="Tell us about your project, site, specific use case, or any special requirements..." oninput="state.notes=this.value" style="
          padding:10px 14px; border:2px solid var(--warm-grey); border-radius:8px;
          font-size:14px; font-family:'DM Sans',sans-serif; background:white;
          color:var(--text-dark); resize:vertical; min-height:80px; width:100%;
          box-sizing:border-box; transition:border-color 0.2s;
        "></textarea>
      </div>
    </div>

  </div><!-- end configurator -->

  <!-- RIGHT SUMMARY -->
  <div class="summary-panel">
    <div style="max-width:680px; margin:0 auto;">
    <div class="summary-title">Your Quote Summary</div>

    <div class="summary-line">
      <span class="sum-label" id="sumUnitLabel">BaseBox 72</span>
      <span class="sum-val" id="sumUnitPrice">$15,399</span>
    </div>
    <div class="summary-line" id="sumHvacLine" style="display:none;">
      <span class="sum-label" id="sumHvacLabel">HVAC Mini Split</span>
      <span class="sum-val" id="sumHvacVal">$941</span>
    </div>
    <div class="summary-line" id="sumSolarLine" style="display:none;">
      <span class="sum-label">Solar Package</span>
      <span class="sum-val">$2,175</span>
    </div>
    <div class="summary-line" id="sumBatteryLine" style="display:none;">
      <span class="sum-label">Battery Expansion Pack</span>
      <span class="sum-val">$899</span>
    </div>
    <div class="summary-line" id="sumInstallLine" style="display:none;">
      <span class="sum-label" id="sumInstallLabel">Set Up</span>
      <span class="sum-val" id="sumInstallPrice">$0</span>
    </div>

    <div class="summary-divider"></div>

    <div class="summary-line" id="sumShipLine">
      <span class="sum-label">Shipping</span>
      <span class="sum-val green" id="sumShipVal">Local Pickup — Free</span>
    </div>

    <div class="summary-divider"></div>

    <div class="summary-subtotal">
      <span>Subtotal</span>
      <span id="sumSubtotal">$15,399</span>
    </div>

    <div class="tax-note">
      * Applicable state and local taxes will be calculated and added to your final invoice.
    </div>

    <div class="summary-total">
      <div>
        <div>Estimated Total</div>
        <div class="total-note">Before tax</div>
      </div>
      <span id="sumTotal">$15,399</span>
    </div>

    <!-- Selection summary -->
    <div style="margin-bottom:16px; padding:12px; background:#FAFAF7; border-radius:8px; border:1px solid var(--warm-grey); font-size:11px; color:var(--text-mid); line-height:1.8;">
      <div><strong>Size:</strong> <span id="sumSize">BaseBox 72</span></div>
      <div><strong>Frame:</strong> <span id="sumFrame">Black</span></div>
      <div><strong>Exterior:</strong> <span id="sumExterior">—</span></div>
      <div><strong>Floor:</strong> <span id="sumFloor">—</span></div>
      <div><strong>Set Up:</strong> <span id="sumInstallSum">Self Set Up</span></div>
      <div><strong>Delivery:</strong> <span id="sumDelivery">Local Pickup</span></div>
    </div>

    <!-- TERMS & CONDITIONS -->
    <div style="background:#F0F7F4; border:1px solid var(--warm-grey); border-radius:10px; padding:14px 16px; margin-bottom:14px;">
      <div style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;" onclick="toggleTandC()">
        <div id="tncCheck" style="
          width:20px; height:20px; flex-shrink:0; margin-top:1px;
          border:2px solid var(--warm-grey); border-radius:4px;
          background:white; display:flex; align-items:center; justify-content:center;
          font-size:12px; color:white; transition:all 0.15s;
        "></div>
        <div style="font-size:12px; color:var(--text-dark); line-height:1.5;">
          I have read and agree to the
          <span onclick="event.stopPropagation(); openTandC()" style="color:var(--green-deep); font-weight:600; text-decoration:underline; cursor:pointer;">
            BaseBox Purchase Agreement
          </span>
        </div>
      </div>
      <div id="tncError" style="display:none; margin-top:8px; font-size:11px; color:#C05050; padding-left:30px;">
        ⚠️ Please read and agree to the Purchase Agreement before continuing.
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
      <button class="submit-btn" id="quoteBtn" onclick="checkTandCThen('quote')" style="margin:0; opacity:0.5; cursor:not-allowed;">
        <span>📩 Get My Quote</span>
      </button>
      <button class="submit-btn" id="buyNowBtn" onclick="checkTandCThen('buy')" style="margin:0; background:linear-gradient(135deg,#C9A84C,#A8862E); color:#1B2A1F; opacity:0.5; cursor:not-allowed;">
        <span>💳 Buy Now</span>
      </button>
    </div>
    <div class="submit-note">
      <strong>Get My Quote</strong> — we'll email your full spec, no obligation.<br>
      <strong>Buy Now</strong> — proceed directly to secure checkout.
    </div>

    <!-- T&C MODAL -->
    <div id="tncModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:9998; align-items:center; justify-content:center;">
      <div style="
        background:white; border-radius:16px; width:90%; max-width:680px;
        max-height:85vh; display:flex; flex-direction:column;
        box-shadow:0 16px 48px rgba(0,0,0,0.3); overflow:hidden;
      ">
        <div style="padding:20px 24px 16px; border-bottom:1px solid var(--warm-grey); flex-shrink:0;">
          <div style="font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:2px; color:var(--green-deep);">BaseBox Purchase Agreement</div>
          <div style="font-size:12px; color:var(--text-light); margin-top:2px;">BuildSwift Modular LLC — Please read carefully before purchasing.</div>
        </div>
        <div id="tncScroll" style="overflow-y:auto; padding:20px 24px; flex:1; font-size:13px; line-height:1.8; color:var(--text-dark); white-space:pre-wrap; font-family:'DM Sans',sans-serif;"></div>
        <div style="padding:16px 24px; border-top:1px solid var(--warm-grey); flex-shrink:0; display:flex; gap:12px; align-items:center;">
          <button onclick="acceptTandC()" style="
            flex:1; padding:12px; background:var(--green-deep); color:white;
            border:none; border-radius:8px; font-family:'DM Sans',sans-serif;
            font-size:14px; font-weight:600; cursor:pointer;
          ">✓ I Agree</button>
          <button onclick="closeTandC()" style="
            padding:12px 20px; background:white; color:var(--text-dark);
            border:2px solid var(--warm-grey); border-radius:8px;
            font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer;
          ">Close</button>
        </div>
      </div>
    </div>
    </div><!-- end inner wrapper -->
  </div>

</div><!-- end builder-wrap -->



<!-- SUCCESS OVERLAY -->
<div class="success-overlay" id="successOverlay">
  <div class="success-box">
    <div class="success-icon">✅</div>
    <h2>Quote Submitted!</h2>
    <p>Your BaseBox configuration has been sent to BuildSwift Modular. Expect a follow-up within 1 business day at the email you provided.</p>
    <button class="success-close" onclick="closeSuccess()">Back to Builder</button>
  </div>
</div>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
var _glb72 = null;
var _glb152 = null;
</script>
<script>
// ============================================================
// 3D MODEL DATA — create blob URLs from base64
// ============================================================
function b64toBlob(b64, type) {
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], {type});
}

// _glb72 loaded from data script
// _glb152 loaded from data script

// GLB files hosted on Netlify — upload basebox72.glb and basebox152.glb to your Netlify site
const NETLIFY_BASE = 'https://euphonious-puffpuff-73e592.netlify.app';
const GLB_MODELS = {
  72:  NETLIFY_BASE + '/basebox72.glb',
  152: NETLIFY_BASE + '/basebox152.glb',
};
console.log('GLB URLs:', GLB_MODELS);

// ============================================================
// STATE
// ============================================================
const state = {
  size: 72,
  hvac: false,
  solar: false,
  solarMount: 'roof',
  battery: false,
  hvacBTU: 6000,
  notes: '',
  frame: 'black',
  exterior: null,
  exteriorName: null,
  exteriorImg: null,
  floor: null,
  floorName: null,
  floorImg: null,
  install: 'self',
  shipping: 'pickup',
  shipMiles: 0,
  shipFull: 0,
  shipCustomer: 0,
  shipBuildswift: 0,
  interiorVisible: false,
};

const PRICES = {
  72: 15399,
  152: 19299,
  hvac6000: 941,
  hvac9000: 1269,
  solar: 2175,
  battery: 899,
  presetInstall: 2100,       // base pre-build price
  presetInstallHvac: 500,    // add if HVAC selected
  presetInstallSolar: 600,   // add if solar selected (roof or ground)
};

// Calculate dynamic pre-build price based on add-ons
function calcPresetPrice() {
  let price = PRICES.presetInstall;
  if (state.hvac)  price += PRICES.presetInstallHvac; // same regardless of BTU
  if (state.solar) price += PRICES.presetInstallSolar;
  return price;
}

const SWATCH_IMAGES = {
"d001": "data:image/jpeg;base64,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",
"d002": "data:image/jpeg;base64,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",
"d004": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC3ql0LHTp7gnlEOPc9q4jTgd25jk4yT7mtzxldERQWKnmRt7/QdP8APtWNZ8L9eayrPob4aGlzVib5evJNTRHMf/Aj/SoU5jBJI9KfCSExnJ3GuGTPRiixGATjHWs66Upekdn+ar3meWQcjrioNSHAk/utg49DVUJWmZYmHNC/Ym0xh/a1koI/4+I+M/7Qr3KvBtHfdrFljjNxH/6EK95r0Ty0LRRRQM+cdbuvtus3Eo5RP3afQcf40QfKOnQCmeTbWl0sepPNFG7f62NQVB9+9dVb6Bo7xhvtt46t0KR4/wDZa5pxlJnXCrCEUjKWQbBjpTomwGz/AHv6V00WgaEQuTftxjrj/wBlq1a6B4faaWMx3rAEHG88cfSsvq82afW6a7nHEb2zk59KmkUTROgHDLgZ9a7pPDXhzOfsl2frK3+Nc94ol0TRrcRafYFrp/u+bI5Cj1xuo+rzWtweLpyVrM5jRbpV1qxXBz9pjH/j4r6Cr5w0USJ4msZ3U7ZLmMNgd94xX0fXanc4BaKKKYHzj41wot4F4JJkP8h/WneHPFMqxLZXUi71GFZ88j86q+KZGuNcmAVisQEY+U9uv65qrolmZL3JRuCP4T9ai92W42iju4tZf+/Gfp/+urNvrskdwSWTDjsvcfjWVFbH+635VajtDn7p/KmYux0MOvyMhwV/L/69cH4h1CS+1uaSQk7TsUbcYArqIrfbn5T+Vc7rtp5ertJsOJEVs7fw/pRqCtcj0TB1iyBH/LzH/wChCvf68E0lHGs2JCn/AI+I+3+0K97oRYtFFFUBHJhI2cJuKgnaByfaqS38rROw06YMoyFIxuOQMfrmtGigDJGrylnA02UlYw4A/iPHHT3P5VJcajNACwsJHXcqgr1ORnOMdq0qKAM6bUJozxYSN8+0Y7jGc8VYtbg3BkDwNFsPG4dR61ZooATaPQUtFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=",
"d008": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCnv9xn0re0oeRYK38UpL/h0H+feucjUyyrGPvMdo+pNdOSEwi8KgCj6D/9QqRk5kPAzxn/AD/Kk/hX/Pc1CG6DPTH8v/r1JuARSSB/+upbBAePzppP+FI0iDOXX86ja4i6+YvIqRkdzYJqElsjYWSK4jeNvQhh+h6V6tXl1rcxfbIMPk+ao4B55Feo1cRMWiiirEeWf2Vp1mRJCzSTK2RmQHH4Cm9v896zPDdu8emNO5LPO5IJHYcD9c1rbfm9s/yqZO4ITPf61UACTzRMD13DPPB//VVo428kdPWqlw6/a/lIPyc4Occ1Ax5xjoai/A0rSYXpTFakMmt2C3dv05mT/wBCFeuV4ncX4hv7OFCDJJPGB7DeMmvbKqHUGhaKKK0JPBtN1VfsscUsgRoxtwTgYHSrjarZx/fuYx35NcxGHdfutnt8pqd4i/VCf+AmoGbh13Thkfal/BSf6VlDWYoNSuZY0aWKQALt45/Gqwth/wA8yPwNPW3H9xsfSkBcPiGNhxaSfiwoGu/L8toc+7//AFqq+T2CH/vmlEf+wfyNIAs2a41u0mlYljcR/QfOOK+iBXz5p0edUtPkbi4j7H+8K+gxSpq0pFzd0haKKK2MxNo9B+VQztKhjEMIk3NhsnGB61PRQBnx3F+022SwRE5+feDjjimQXWovFG0liqMUYuvoR0A+tadFAFB7i8VBtsw7EHAHGSDj8OOatW5d4EaaMJIR8yjsalooATaPQUtFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/2Q==",
"d010": "data:image/jpeg;base64,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",
"d013": "data:image/jpeg;base64,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",
"d015": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigArzPxg2PEt1k9k/9BFemV5j4w/5Gi6+if8AoIrKt8JcNzAvJ/Ks5H6EjA/GsOPHJA7elaGszYWKIc5yx/lWcp+VhjFZwVkbjgxOeexqJmcZKcMOVPuOR/Knr16djUTNgg88GtkKWp6Va3CXtjDcDBWeMNj6jkViWlqbPXUh/hDErnuNpxUng2587RntifmtJSmP9k/MP5mtG8td13bXKjmMkN9CD/X+dbyV43ONe7Kx6XRRRWZYV5h4y/5Ge6+if+givT68u8byeV4gvX5O1FIA/wBwVlV2LhucRfzeZevhshflH4VCH+Q896QWOoyHIs7gk9xCaeNI1Zhxp9yf+AYppGt0MVvmHP61GzjHWrS6DrTEEafL+JUf1pw8M663SxI+sqD/ANmqrC5kX/Bt95GvtbE/LeQ4H++vI/TNd4R97/db+RrzZNB1/T7y0vFsWLQzqQEkRj79D6V6WqNKSiD5mVgoPrg10Q+Bo5qluZNHdUUUViUFeY+Mt3/CT3JHYJ/6CK9OrzPxepPia64PRO3+yKiexUNxNKvEuV2yqpdeGBH61txxRf8APFP++RXFxvJbTrLGrZB5GOo9K7KxmW4gSRAcEelEHcJKxcjij/54p+VW44k7RqPwqFMjsfyqwh46VpymXMYutkPfW9uoACLvbFJZ/wDH3H9f6VCZDf3txcxqzgPsXCngCpV8y2JnaGQiNWYgIewNdCVoEXvI7eiiiuY2CkwPSlooAgnaVDH5MIk3NhsnGB61Alxe5+azCjno2fXH8h+dXqKAMv7bqeSPsA6N0PUjOO/fj86n8+9FtvNqplx9wH345+lXaKAIrdpHt0aVAkhHzKOxqSlooAKKKKACiiigAooooAKKKKACiiigD//Z",
"d016": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDcGBUPiG5a08MxhG2tPOPyGT/QURsXQZPPaqfjcoItPtTcRRbFZyHJ56DsD71MFqVIxQJZrzTXMkZO1D80gB5cnpVVJpry1vI3nyFKOPMfAHzEd/rTnGzXrKEMGCeQuR0PCn+tRwxRi3v9tzHIfJJ2qrDo6nuBVkjbuWaOKzHnlo2hCkJJlTtYj/ClWX/69Rqkc+lRGScReTO6ZKFshgD2+hp8aoQMPvHZgMVlURcDqPCEwfxDYjOf3uP0Net1454PAXxRYDHWX+hr2OlTildhNi0UUVqQeZWgElzEn+0M1zHjq58/xE0Q5EMKJ+Jyf612lnpc9rOssxQZyAA2TmvONVnF/wCKrlgciS72DntuCj+VKK0G9zQNru8To32m2AW4QBTL83y4GMY68Vn6YPNuriEsqCS3mXc3QcZ5/Klt5hL4rVgfvX2R/wB91BpEivqyRhgfMEiYz6owqxFjyETSbxVuoJirxyhYyxIGSpPIH94VHYtmM5P3Tiq+lt5j3EHea0kA+oG8f+g0aYzGZlwcMuenpWc1dFR3Ot8IjHijTj6zf0Nex1474SRz4n09iMAS5/Q17FUw2HPcWiiitCDkb4mNQwUkKDyB3964aw0DX1v4Z5ptO8oSh32RrkjOTj5OtbUviqd+I7K4wf7ygVROsXxYtHayR56gAD+tZ85XKzMsPA2p22pwXUt1akRzCRgpYk859Kv2fhzXobyOWfWYniVwXjWMjcvcdKm/tXUyP9VJ/wB9KKY2pamf4GGf9sf4Uc4cpT03wFeWOowXf9pRHyX3YWJskdMZqpPp1/Z3ixS63Neqh/eIQ236dTk/yrTa/wBSeMqwOD28wj+lUybpFAFvGBngbj/hUuTGomn4XVh4ksOw83+hr1ivKfDJuG8SWBaNFXzecMT2PtXq1XDYUhaKKKskTA9BVLz73ah+xLkk7vm6DtV6igDPe5v1CFbEHMZLDd0bsPxpDc34iz9iUvjp78/4frWjRQBkpeaoV3Np6geUDwed/HGPSnzXOpJEXjsY3PyYTPPP3vyrTooAanKKSMEjninUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9k=",
"d018": "data:image/jpeg;base64,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",
"d023": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigArnZtZs9NuL1J22ymfEYVclyVGK6GvNden3+LLmDBwsgJ/BRVxtZ3JavZGsGK2kak8k5NQk5NIZcqi56Cm7wCK529TZAigQxH2J/U09Www+tRCTMMX+7/WlXk1DGeZm0t4tXcC4fzElkOfKyMBsY610PhtYovEejhpyQt0EAEeNxJOO/auc16IxeJb/AGEL5c5yAeSG5/rW54WFrL4tspjl5ftkZGScjI9O3et1sQz3GiiimSIeleV3IM3j3W93IimRV/FQT/KvVD0ryW8muh8QNZiiKpH5wckoCSdijrSk7RY1ubLZJ9KbtOab503dYyf92jzZzxtjH0Wue6NB8Y/dR5/u1MmBVSKeYRrkIeP7tK08zDjav0FF0BxXi8Wya5dRySlWl8uU/uy20bQM/pWl4Niii8T6eVmEhJTPyYPU/wD16zvFTSxamXdUmJjUneoOR0x/OrHhDUJH8UaX5dtH5cjx/MqjKgsQf6V0RtyohnudFFFMkSvNr+3VfF+qSDq0gyf+AivSa4O/A/4SK/bH/LTn/vkVE/hKjuVtwBpd+TTDyeKADXLc0EU/uk+lKASacifuo890Bp4TmgDk/GKYKE5JMecDrgNg/o1XPCcKLrulCMBVWXGBj2OKrePI8W9tIGA3B4znuMqaj8G3rXGs6XIEXcLxFJ6dVwePXNddP4TOW57hRRRVEhWVN4dsp7uW5dpg8py2GGOmPStWmSv5ULybS21Sdo6nHak0nuFzJHhfTx/FP/32P8KP+EYsMH5puf8AbH+FSPrTIAfsFycpuxt9icfp+tSXGqSQiTbZSvs6Y/iPp0qeSPYfMyH/AIRqwCqN03ygAfOP8KP+Ebsf703/AH2P8Ke+rzKXCafK+1gq4P3ge447U/8AtZt7KLSXAfbuIIH16U+SPYLsoX/grSNSSNbpZXEbbl+YcH8qj0/wJoum3cVzbLMHicOoLjGR+FabanKjopsZcMxGfQAgZ4+tWrS4a5jZmiaIq20q3+feqWishE9FFFABRRRQAUUUUAFFFFABRRRQB//Z",
"d025": "data:image/jpeg;base64,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",
"d026": "data:image/jpeg;base64,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",
"d028": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCH4kTsnjW8UNgbIv8A0AVa8AXrOk9vwxRwwXOCAf8A69ZXxOz/AMJ5e8nHlxf+gCm+AZjFrchIPlmE7iBnHIxQ9gPTw0vaBf8Av5/9apA03/PFP+/n/wBaoxqFnj/WN/3xThfWpPyysT/uGo0KuyrbDZqNyDjJbcQDwMgfnWgpX2/Os+KaJLu4kllWLzH+XzGAyuAKtJd2p6XcJ+ki0xmnpDbrm5A+6qoOPXk/4Vq1y3hGdp9R1V92VzHgbsj+KupqiAooooA8I+JoJ8fXv+5F/wCgCtTwhpYttJFzICJLo7un8I+7/U1W8c6fJqfxQms0JHmiEE+i7Bk/lmuzihRFEcahY0UKo9AOBSkxojSFO9WkEaH3+lNC7aUg9akZy3jazS6nsmZQ2EYDI6dKybHT47fJAUA+g4rpfEqgpatxwSOfoKxUXONrZx71onoSztfh8Av28D/pn/7NXZ1xnw+/5f8An/nnx6fers6GAUUUUgOAvdN/4rvVdTdf+WcUMWf9wFj/ACH51bUbQRkZq5rR/wCJpIPZf5VSU8+wqHuWthx9Kae9KOeaRgNv480AZPifC2Nu+Od/9DXO7ztOOOOK6TxKM6XH0+WRTz+NczxtHStI7Es7n4dEst/nr+7/APZq7auG+G77zqIxjHl/+zV3NDEFFFFIDldaIGryk+i4/KqIYbfrXZva28j75II3Y92QE037Fa/8+0P/AHwKnlK5jkQeBRzjB9a6/wCx2v8Az7Rf98Cj7Jbf8+8X/fAo5Q5jz7xGCdILA4wU/nXJkA4PB/Gva5LCzlTZJaQuv91owRUX9jaWOmm2n/fhf8KtOwnqcl8Nv+Yj0/5Z/wDs1d1UNvZ2tpu+zW0UO773loFz+VTUMQUUUUgCoLu2W7tmhZioJByAD0Oe9T0UAZVxoUdwWLXU43AA/MM8DHXrWoOBS0UAFFFFABRRRQAUUUUAf//Z",
"d031": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDr9C58CXuCP9cef++arW8PlxmQnJfp9Kt+F4/O8FXUchxm4O4jv92iYe2PalbW476WKMlRRruuEH+0KnkFVnkMGZRjKc80xET9TUbGtY2ELqGGcEZGDUb6bD6uPx/+tUcyHZmVuwa7/wAKwRW/hqzihQIgUkKO2WJP865I6VEf+Wrj8q7TQohDo1tGCSFXGT9TTTTCxoUUUVQjj/ChH/CH3JHTz2/9lprJv74pfDtu1v4QvIpVaF1nYkMMEHCmmhyQCRg9x6VLbQ0RNa7+jj8qxfENx/ZFokzZZWmRGK9gTW9ux2rA8axed4dnI6ptfOOmGBqVJ3G0bVrMJbKCQdGjU/pTmbn/AOvVXSmzpFqQSw8oc5qwTz3/ADqHuULu/wA5rqdEbfo9u3qp/ma5GZ9kLMc9PyrofBt6NR8KWN2BgSKxA9t7AVcNyZG5RRRWhJw2mSfavAeou/G+4bjJOOV45qDTpw8IQ/eXj6+/+fSui0vwythoE2ky3JkWWQuZEXaR07HPpTE8H2sbbkvLkH/gP+FS1cpPQyiRWfr0AudCvIgMloXA49jXTSeFFb7uqXafQJ/VajPhBipU6zeEHsUi/wDianlYXRzHh19/h+zbOcxjmtEnmtOz8FR2NutvBqdyI16AxxnH6VYHhYd9QmP/AGzT/Ck4u47o4zxTf/YdCuJFGXKbV+p4FdX8N12fD7R19ID/AOhGmap4Cs9XgWG4vrlUVt2ECjJ/KtzRtKh0TSLfTYHd47ddqs+MnknnH1q4qxLZeoooqhBUN2k0ls6W8gjlI+Vj2/nU1FAGVJa6uXJW/TGBjC45246YPfmtRQwUbiCe5AxS0UAFFFFABRRRQAUUUUAFFICCAQcg96WgAooooAKKKKACiiigAooooA//2Q==",
"d031b": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigArP16XydBvpcZ2W7nHrxWhWfr6NLoF/GgyzW7gD3xSYI8juNcv7pfLa5dY+yIxApLLSJr07wu1O7tWpaaNBa4lvGDP1CVsoT5GVUID90D09ayjq7RNnorsit4YbaBIISNqDHufU1MOvH86jByfnTGO/UVIFXGQBW9rGFybEcsbRSgFJFKsp7gjB/SvLPDepy+FPEl3otyx8lJjGc+x4P4jFeoruHQ/nXl3xR09rPXrbVI1wt3Ftcj++nH8iPyqhH0ZRRRUFBVbULeK70+4t5gTHLGyvtODgjnmrNV7+WOCwnmlbbGkZZjjOABSYI4e68LeH7eNn+yyuR03Tuf60oKGIBMKoACgdgO1F5d+dcbATt6jPBxUYPOR17+9XHRCluKrMoO8Z91pwCuAynj1U0I2QcjBHaj5d+ejfzpiJF3D/AGh+RrL8VWi3ugSPt+e3IlG4c46H9D+lafB/+tUjIJYXikAZHUqwPcHimI7miiisywqpqhVdLui5AURNnPTpVusrxPx4X1M/9Osn/oJpN2QHGQgzZLcOpw4z0NWFh4zz+f8A9asfR9VW6QTSFBISI5hkdcfKw9j0NbiunpWEpyvozVRRVklx6+1M+0KVwwyKS5UDPB61XYfuzgN+VUpy7icUX4ZkJ++30NOkvBG+FGePWstGZTkZqvd3LKrtkghTg+lNSl3JtE9dooorUkKyvFHHhfU/+vWT/wBBNatZniOOSbw3qMUSM7vbOFVRkk46AUpbMa3PCkALjuOtTFiOjMB9atx6FrG450m9A/693/wpz6Hq+Mf2Ve/+A7/4VzUlaJtN6mPM8hPDv/30ahLzKMCWT8HNax0HWD/zCb7/AMB3/wAKT+wNZxzpN9/4Dv8A4VqQY5nuVBIuJx/20P8AjTPtF0wO64mP/bQ1qnQNaJI/se+x/wBez/4Ug8O6z/0B77/wGf8AwoJPoWiiitSQooooAKiuLmG1QPM4RScZPrUtRywRTqFmjWRQQQGGeaAIBqlkZPL+0Lu3be/XIHX8RVrqMiq40+zDbhbRBs5yEHXOf5gVYoAWiiigD//Z",
"d032": "data:image/jpeg;base64,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",
"d033": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigAqrqX/INuf+uTfyq1VXUzjS7k/9Mm/lQBxLNxWfqEmPLX1fJ/AZ/wAKtPJjrWXeyhroDPCJ+pP/ANaqW4mV2I5xjpUTfd/GnMd2ajJwDiqYi7ZtmHB/hOKnzVKyfl19s1bBz0NcVTSTOiOqPV6KKK6TEKrahG02n3EaY3PGwGT7VZqtqM32bTrifGfLjZsfQUAcY+hX2esXP+3XMTkrdXG4gkSlMg8fLx/jXRT+L/LRm8pcgHHyn/GuVjJ8lC33iNx+p5rRW6Eu48tkcGmZ4PPahm45700EHPfimBLavi4X34q/+BrKB2EMOoOa1SQQCOhrlrLW5tTeh6zRRRWpmFUdb/5Al7/1wf8AlV6qOtf8gS9/64P/ACoA8ou4GlgZEIBbufSq8M8V1EJYlmKHgfux2/GtBhVaVpbMLNbAgIwLxqOHXPPFJOw2iPbkf6uf8FH+NKIueIbg/gK3vtMGAd3X2pVuoNw+b9KOZisYEluUQsYZ/wAv/rVet1b7Ogb720Z9qsaldRyqkSLkE7mJHGBz6euKgDAru9aynK5pBWPWqKKK2MwqK5gS6tpLeTOyRSrYODg1LRQBgf8ACGaT6T/9/aP+EM0n0n/7+1vHpxWV5eueXGPNt9wB3H1OeO38qVguVD4J0c9Vn/7+0f8ACE6Pz8s3P/TStq0FytuBdMjSZPK+nb8anosh3MAeDNJAwBPj/rrQPBmkg/8ALf8A7+1v0UcqC7CiiimIKKKKACiiigAooooAKKKKAP/Z",
"d034": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0xj/xRUh/6cG/9ANeIxt8o57V7Y3/ACI8n/YPb/0A14ZAzeX8yEntgVPRFHWeFYc+fdsP+ma/zP8ASuh3ZJOegqhptv8AYtOggxhgu5/948mrIb5XP4UxAxpoxnnkHrQTzTc0gPMdRtjp2r3Fp0Ech2/7p5H6GvoPwmc+EtJP/TnH/wCgivFfHNr5WoW18MBZk2N/vL0/Q/pXtHhA58H6QfWzi/8AQRSW43sbNFFFWSYf/Mjv/wBg9v8A0A149otst1qECYyi/O30FexBGk8EsijLNYMB9dhrzPw9psthDLJcKFlfCgA5wKlbIZts+STSRNujc+rkflxTM81RjuJI5JYWGCG3AdsGm3YEaZ6n603/ABqp9qOKT7Uc9qjmQ7FPxVZfbfD8+Bl4P3q/h1/QmvS/Bv8AyJmj/wDXlF/6CK801TUxa6fNIylhtI2g4zmvS/BvHgzR/wDryi/9BFVF3EzaoooqhGTakDwmh7Cz/wDZa4NQRGvHOM12odk8CvIvDLpzEZ7HyzXmdhe3FzZxTGXllBPzZ7VN7IZrmqd4g86NwcNyCR3HvUZmuh0c1TuLm4N7brJKqr83XHNF7gXAGx1H50gRy3rTDJx/rF/GkWU7vvIfyrOxRk+KJvKsVhI+aVsfgK9j8HceDtH/AOvKL/0EV4N4iuHn1UoyBfKAUY5znnNe9eEOPB+kf9ecX/oIq4iZs0UUVZJW+wQHTTp5UmAxGIgnkqRjr9K50fDTwsowLGQD/r4k/wAa6uigDkx8NPC4PFpOPpdy/wDxVSRfDvw3DMsq2sxdeha6kbH5mtN49aKnZLAPnbHrjt2xVyzF4sR+2tEz7jgxAgY/GgDKPgzQz/y7Sf8Af5/8aT/hCtC/59X/AO/rf41v0UrAcpL8NPCs0zTPYSF2OSftDj+tdJZWcOn2UNnbKVhgQRopJOABgcmp6KdgCiiigAooooAKKKKACiiigAooooAKKKKAP//Z",
"d038": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDvvFf/AB92/wD1zP8AOsyzjEaNcuPu8Lnuf8/1rQ8WXFvHqNpFNOkTOhA3fWsHxDe3FrYq1oRHHGwGWXO4Hv8A596AJTl3LHnJpwSsKLVbhl5mH4Y/wqddTuP+ew/JajnRfIzZVOaNnFZQ1Kf/AJ7j8lo/tKf/AJ7j/vlaXtEP2bN65Xcit7V0Xh4Y0lP95v51yun3D3dkxkIYpgKwxz/9eus0EY0tB/tN/OtOhnazNKiiigDz/wCIn/ITsuv+pbp/vViR3TXOntb3EmSD8gYcmt74gf8AISs+n+pbqP8Aarm4jgg7UbHbkVknaRra8RluOCpJ3DqMcirSr7GosMl1uCDa4zk+v/6quLkHoPyqZR1LjK6GbR6fpSFRg8fpVkdOg/KlJGxs7Rx1xUWLuXLK7tbayjtpJv3n3zxkHPoRXX6DIkmlo0bbl3Nz+Nea6Qj+QpU5XJwWkBP5ivRvDOf7Fjz13t3z3roT1sc7WlzWoooqiDh/HhjGo2gdwp8pup96wIFiYgCUcnHWrfxQ1G0s9XsEuWCloGIypP8AFXJw6zpJ6zxj65FZvc1itDqJbcIhCkMo6GljGUBx/wCOCsy31vTvK2fbIdhB6vVm18Q6MIwi3MIA9Tj+dNu6ElZl8IMc4/74pssEbRNvbAwc4BH9afDqunyjMdxCw9nH+NSs8c25VKlSOxqCzM0KTNrtjXy0RmVVz0A9+9eh+Hc/2RHn+83864/TdOt7KHywCw3EjLdM12ehqq6YgQYG5u+e9WtyJbGjRRRVmZyPjHwBB4vvba5l1CW1NvGYwqRhs5Oc81zw+CdmP+Y5c/8Aflf8a9PqK5SSW2kSGTy5GUhW9DSsh3Z5yvwZs1GP7buP+/K/404fBy0H/MZuP+/K12U+natIpEeqbCVADBMY45/z/hWpErpEqyPvYDlsYz+FFkHMzzlfg3ZqMDWbjH/XFalX4RWy9NZuR9IlH9a9Eoosh8zOBT4WrH9zxBer9FH+NdboWktoulpZNdy3ZRmPmy/eOTmtGiiyE22FFFFMQUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=",
"d039": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigDM8QsU0WYg4OV5/EVw7zPsJjclvoK7PxScaBOc4wV5/4EK4BXYxnHB/nXJiHZHVh1dlG/hZGnu9u6UqAFyefYelLpc5uIo5XjMbYztbjFWbpke2lkB3AcA/TA/xqhDI6t8gDZOMGuBPQ9Hqa0ADRFPNkUqxUBcYGD9K9A8NgjQLUMSThuSP9o15tbSMk0ibuWwwJ/I16T4bO7QLU9flP/oRr16bvBM8iqrTaNSiiirMwooooAxPFxx4cuP95P8A0IVwsOwRozHJJ5rufGBI8OT4GSWQf+PCuAi5Y+i5rgxb1SO/CLdjLxh9jk8v5QMYA9zWfGQFZQcEMOfSrd6wS1f6gVnqwCSH2FcsdjsZNGjxagrscscxk/r/AEr1jwyc+HrQj+63/oRryQMxgldz8yFWH0r1jwoQfDNmQcja3Pr8xr0qErxsediY2lc2KKKK3OUKKKKAMTxeQPDs5JCjcnJ6D5hXGweHdQu4BLZ3Ns6P/EHyK67xt/yK9z/vJ/6GK5bTj9l0i22ZUyZc44zk/wD1q56lOMpe8dFOpKMfdK914P1dlClrf5mH8dQL4H1kKw3QHPo9aTTSSH5SRz71YhWZhkuck9jQqNMp16hzeoaFc6RaM19NboZVwiB8s5HYDvXongnf/wAIfp3mKVbyzkHr941zN/Yh7S6Jy7m3ZR7Y+b+YFdT4QIPhaxI6FWP/AI8a1hTjHVGU6kpq0jaoooqzIKKKKAK99YWupWrWt5EJYXILISRnByOnvWfcaRo1rFFG9kSgG1Am5sADPr7VsUUrIdzGs9O0i63eXYyJtxy4ZQfpzzVxdIsE+7bgfif8au0UWC7KZ0mwIwbcfmf8als7O30+0jtLWMRQxDCICTgfjU9NZtoB7Z59qYh1IzKvUgU1mJVgvUUwcbXC4H17GgdiaiiigQUnSlpDyD0/GgBHbYuaYzkqpHAJweMmmkDHIUYODx29qUsWQpglgKRVhhJHJ+8p7nk1I6qzj3BJPtS+XhiVwMjHSnKoVQOuBigLjIgdoKkY7g04RKARyc8c9qd0paYrn//Z",
"s001": "data:image/jpeg;base64,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",
"s002": "data:image/jpeg;base64,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",
"s005": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigAoopnmJ/fX86AH0UzzE/vr+dBljAyXX8xQA+io/Oi/56J/30KDPEDgypn/eFAElFRfaYN23zo8+m4VJuUAnIwOpzQAtFFFABXn0p/fPx/Gf516DXnU7kTyDtvP86TAd5gQc4ArP1G+V41t0/ibLfQc/zxSX1z5cW0HnvWPbytNJJIxJA+UVlNm9GN5IvxttIIxkc1rvFJOFJsWlB5DLHmsRT0robDVLv7JHGk7gIu0AHpipgb4haJnJ/Z2l8YpLZRkG3aMlVUAkYO48+nH516ZpKldLv9zFjtPU5/hNYKOFkBOM+9dBp2P7JviMfcPT/dNbHEb1FFFUIK80uWCzSE/32/nXpVeT6ncFZpQO7t/Ok2NGdqNxnPPWo7QbLZc9W+Y1UuGMsqpnknFXshRgdunNc82d2HjuyZWGRzmt/Qp7JIpUu4mZgwK7SenfpXOq3I4GM1esJNs4HOGGKKbsy68bwZ1f2/R05Fi7H/dJ/mav6dJHJpupNENqbWKj0G01zJIIxW7oZ/4kupn0Q/8AoBroPNOpooopgJXiury7rqb5jgO3T6mvaq8J1OUG6nH/AE0b/wBCNRIqJFafvLks3RBn+n+NXiw5A/Sqlgu2Fnx988fQVYzwCBz+Vc8tZHp0o8sCXoOp47ZqzFIUkDbTwQaqZO3OB+dTK2c4/SiJUlfQ3d3QgcGug0I/8SXVP9w/+gGuVgl3Qrz2xXT6A3/Eh1U/7Df+gGuo8pqzsddRRRTJErwDUH/02cDr5rf+hGvf6+f5V83WJR2ErsfwY1EjSmruxcWNI4lXA4GKUAZG0Dpz2pHOFyaYMl+rAjHAPrXLrueq7LQsDO08n8ulSJ0X5yOKqr1H7x29v8/jUkUg8teRn6iqRLZ0Wg6fFqEc6vcSRvHhgAoOQf8AP611OlWIstD1ILMZQ8bHJXGPkNcRo2pHTbsTKofcpQqG/H+YruNI1Ianouot5TR7EYc45+U+ldEXoefWjaZ//9k=",
"s006": "data:image/jpeg;base64,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",
"s010": "data:image/jpeg;base64,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",
"s011": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiigArA8U/8ep7fuX/lW/XP+Kji3wP+eT/yoGtzzkOv94fgalR/lkIb+A9/pUayv6mnea+PvHn2ry2z1rNoaG/2v/HqDIcffP4NRub1/QU52I2Yx9wE8CoLu7kZduvmHP1rThydKfBydprNLt7fkK0rYg6ZJk4+VuRXTh37xy4r4UeqUUUV3HnhXPeKldoQVAOIZOv0roa5vxXM0ZhRTgPG+f0oA85RhgfInbtUrkCRgETAJxxUKsgPCsQPVv8A61PLqxLbDyefmrypHrpeQ7eP7iflQXz1ROBjpTcr/dP/AH1QCufun/vqoKsuwu7/AGU/KtOxO6wcYHRuBWZldhYr0Ix831rR05s2jgDHJAFdOH+I5sT8HzPVqKKK7zzwrlvGJxLbf9c3/pXU1yvjH/XW3+4/9KAPPF2ZyGPP+z/9enjZ/eb8h/jUaqMAB0H408KM/fX9a8to9hDyFGMk5Iz06U0bMgAt+lK5U7f3i8KB0NAVWzhxwCTwamwJ6aib02Ffm+bB6jtWjpjDyXxnAbvWWdv/AD06/wCzWlpJHluAc/N3GK3ofEYYm3Iet0UUV3nnBXN+Kreaea28qF5MK2dqk46V0lFAHjv9h6oHKfYLgEAZ/dnv71J/YOqH/lymH/AD/hXq8t3bwlhJKFKgE59DSNe26wSTmT93Gu5mweB6/pWHsInT9ZmjyoaDqne0lH/AG/wp6aDqK5zbS8qR/q29PpXpw1S0Z2QSHKxiQ/Keh6Ukur2MJcPNgoQrfKTgntR7CIniJs8v/wCEf1HGDbzf9+m/wq5Y6Te2ysDaznJz/qmH9K9ETVrKSRkWbLK20gKevP8AhVyqjSjF3RE605qzFooorUyCiiigBjRRtncincMHI6ijyYtpXy0w3UbetPooAiFrbgkiGMZG04Ucj0pps7ZlKm3iKnqCg5qeigCAWdqCSLeIE9TsHNT0UUAf/9k=",
"s012": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpdZKi4thnJNpFkA+36CqJZtxGW+4cE8+hq1qEm++SPgbbW3wM46rVYplucEYOcsPTj/8AXWDWp1Ra5UMUttB3dR6/r/Km5J3D5dx54NP5XJ+XPXORyelNKttbnIPA+YGpsVdDFxu3LjcCSCOh+tGCquOyo2M8n0P/AOqnMHZ+owDnAP4/0pQrbSML93GCenzA0JDcjrvBJP8AZc6t/DNjrn+EV0lc14JP+gXYz924x/44tdLXRHY5JfEwooopknmd+23XghwT/Z9q2QOP4gfpUZOTgcEe1N1dseKrZWOC+kxdfUEf409sEkh15JxkY/pWEtzoh8IwYJDcEH/IApCPkH3cFjxjjoKcRz1HYc/4fnTWGVxlRzxg+w/wpWLvqCnacDk4yKapBB2kDv8A4/kaACcHI464Yc/WhkJJUqfTkjj1pDOu8CnOm3h5/wCPthz7Korp65jwLn+y7rPX7U38hXT10LY5HuFFFFMR5N4nk2eNNN6fNYhT/wB8g/0qwTkbumfUVpaxoVtd6tbX8ryGRLWIKoOAvHWg6bCf4n/Os5RbNYTSVmZmDkknuPw4NNAx/XP+Nah06MgjzGxnpgUw6YuCBJ+Yz/Wp5WX7RGZ1JwTjHekbDSsOASxGMZ78/wBK0v7MbP8ArF6jsaz9TH9mpHJKNyO+MpyQce/qM0uVle0idT8PZxPpF0drLtumByPYV1lcb8M0VdCutgwGu2PXP8K12VbnKFFFFAHL3ttcO0BWCQ4gjBwh4OKg+yXX/PvL/wB8GuslkWGJpHztUZOBmq7anbK7LuYlRk4X2zQBzf2S5/59pf8Avg0n2S5/59pf++DXTXGoQWzOJN+UQOcLngnFEeoQS/d3/d3crjjj/EUAcz9kuv8An2l/74NZXiLS7250phHZzu6OrALGSfQ/zrtJdbs4S4cv8jBWwvQ8/wCFLHrVnLK0aFyyttI29+f8KAMT4eWtzaaJOlzbywObgkLIhUkbV55rq6KKACiiigBCARgjIpGRG+8oP1FOooAa0aN95FP1FIIo16RqPoBT6KAGGKNhgxqQfVRSeTF/zyTn/ZFSUUAFFFFABRRRQB//2Q==",
"sc_black": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDiaKKKoQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==",
"sc_white": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1KiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//2Q==",
"sc_fgreen": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDj6KKK5TywooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9k=",
"sc_sgrey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBKKKKZAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//Z",
"sc_blue": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmaKKK908oKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9k=",
"sc_red": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCnRRRXEfahRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=",
"sc_yellow": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDuqKKK/JT6AKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z",
"sc_orange": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCaiiivgj9FCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP//Z",
"wg_cherry": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDmJvCdynMF9E3s6lT/AFqpJoGsxdIRL/1zkVv0rsWUk8bTipFtpmG5YZCg7qpIrnVSR1ujDucBJFqFr/r7WaPHdoyP1qP7eQMYGfrXoZLLgbip9DUctnb3J/fW0U3+9GDT9r3RLw/ZnDwXYC85FW0uUb+IV0U3hzTHHNkYj/0zZlqlJ4VtTzDdTRn0YBh/SqVSJk6Myisgx1qReuaV/DF6n+pubeX2bch/rTY9H1WPO+DAHQpIGz+VWpRfUycJrdEy0y4u47VRuUuT/CDjilit51kCTiSMepX/ABqa4soSrMspZsf3QapGUn0NhntzkbpFYewIqWyvJoWHk3bwn1Dlf5VltJhiaWOTBrkuevy3OkXVtQLbGuY5+37wK4/UVoLZajMglfRIJkYcNGmM/wDfJrj0m5z0q3BqM8H+qnkTH91iKtT7mUqX8p0DwiI5n0y6gH+w5/8AZgajKae2cyTR/wDXSFW/UEVUi8UarEBtvpj/ALzZ/nVoeL70gectvP8A9dIVNXzQZnyVEM+wWb8peW//AALen8wRT10gOuY5kP8AuyK39c04eI7OX/j40e0b12Aof0pf7S0KfG7Tpov+uc+f5ii0GK9RFJ7KRCQs0bY7bsVBLYu/3oFb6AGtZV8PTLgXN3Cf9uNWH6U5dN01z+41uIe0iMtLk7D519pfgcEZMhjninJIf0qkG2Kw3ZyaesnasTquXRJT1l+YiqXm89aVZfnNAXL4l460GX3qoJaUy80Bcued70sU3HWqZkB4pySCgLl1ZyGIz05pwuCD1qhuG8n14pxcUC0MMzkY+tPWXpxVMt+lPV+etVYi5cEvJoEvzGqvmc0eZ1pDuXRLx1oM3PWqivxR5mWosFy2JuTzT0mqj5lOR6AuXRNz1707zznrWeJDu608yc9aLBczcmnoeatrYlqkXTZPStOVmXOijuO6k31dOnS8/LTfsEoONnAo5WPnRXDHFIHPNWGtJAOlM+yvjp+tKzHzIi8w4p6yHFNeFgaDGaVh3FEnH15o83NMZSGxQENAH//Z",
"wg_pine": "data:image/jpeg;base64,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",
"wg_russet": "data:image/jpeg;base64,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",
"wg_teak": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCV9O1a3JezlS6jHIMT7j+XWoJNVuoT5V3C3I6kFTVMTPulZSQwAGR15NWbbUrm4i8pp947LMcgH8elc/tF0Ol0r7oms9Qs3h2u0pKknecZA9OB0q4EgnAMc6N6ZO1vzrNmsblgWS0UKRjdByD6dCarYeKIphl28gEc0/aNbkewi17rNNk1IN+7iSNcY3zDe35A/wBafFcSoGim2yumCWUBQc+1Zcd7dW8gEcjbSemelWF1c5InhUk9TjBq1ViYvDzXmdF4diA0W4jjBQGdjGD/AA8Aj9a6O2mFzaxzYwXXkeh7j864mz1z7HH5dusQUuXKyA4JPuM/yqeLxBcW92s62EwUn94IJRKjjudvBB98V0KaZzypyW6OpuNNtbvd5kS7yMFgMEiuV8QSQ6IVjif7RcEZWID5lX1Y9hWrdeM9ISylkguP9JAwkEyFGJ9wewryzXL+6uZpHaRsSMWYk8ufU0SsOCbO5SDw9cK5S6ubVj18xA4H4ioDoEcWWtdTtZ1ODt37W/I1jof3cnPX/CpLkkXKAYwAB+YrzvaJ6NHq+zktmI0cltMwHDLz8px0P+Bqymo3YLRGZnUA8SAMP1qq5JuRzw2P1GKcJHZ03c5FZcz6GnKnuL9pE0ke6CJSykZRdvP06VCXDAxsMsnIPqvpToyg8sshJEuAQff/AOvUzRQmRGkcoFY5bGcDNF22OySIooRKfLyoI4yWxV+Czn8hgyE7fuuPmH5irEeh20hBt9WtHOMbZMof1oXw9qcc+6CJZR3MLq2fyNbKMl0MJSi+pUczSR7JNsq91dQw/I1Sk0uylyGtmhPXMJIH5cj9K0p9PuYZBG8UiHHVgRg01JpSdrBWbHHYk1opSRm4xexnRgbT/tMf6Ci4+e4PJ4AIp0YPB65J/wDQqLgj7Uq46Ajj6VyW1Oy42YEFW9AR+Rp5XaMj+F+PzoYAxr75p5wYz7kEH8qAuRLzsHrIf5ipLgjzkXHD7h+ZNNi5kQ+kh/mKJiz3SbediljR1EPDZUnuNrfpz/KnmR4yrKzKc4yDioY23sR6qR+OadnNurHtincVjRTVbwRRsLmQ9iC2c9v8KmfWJpiBNHBKT0LRDP5isokraq3918GnSSgKCuRjB/z+VaKo11M3Ti+h1KeBLpdu2WNgO3Sqk3gfVBOJNiMM54YVBb+I9RCHZdPwcdf8+lO/4TPVFnVBcEqSRyK3vRZz2r9xJPCepoqg254PY1Xk8Pakqrm0k4x2q6vjXUigLOh5xytTjx1fIqgpE2QO1K1F9Sr110MMaTeQOhe2lUByeVPrVYK0d1hgQWOOfpXUDx1cyqFa3i+YZ71zuoagb6QzhFUxjfge5/wrOcafRmsJVH8SKMPyylR2JH61LgfZW+YdT/Wl8xBcuvlA/Mec+1MBUxyDoN1Ymw4kG1cDru/pTA26AHuB/LFS7YRathzkt3HtVvTtNgutsb3SxBgSC1Ci27IHJRV2UN5itVJznrxVSF3aaNiP4u9WLjLypF2HJPoKrrlLnBPGQRVJE3JCcRr2yx/nTpm2oDnoMVXLHy0wCef6mprkE8dOaQx4YrFkHkR4pQozKucZQqPoBimOcIfchcfjSRS5ndCDwCDUMpC7j9oc+6/yqTfhZR6tUAcecx9dv/oIpxPLe7/0oGShgYVBzguTx+FWAilE2yD5TiqeQBCOwyx/X/CkgdvIYkk/MD9KaYmj/9k=",
"wg_rose": "data:image/jpeg;base64,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",
"wg_cedar": "data:image/jpeg;base64,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",
"f_bmarble": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDi1cdlUVZVsn7irVVD9BUokWMgHjPHPrTAtk5jbsSPSpSw59uKqCUnaBxuHOe1Niu1kcqFIx69+tMCeTmq0oxUpfg571ExycZpAV8jfkjI71CwqZqiPU0ARke9Mx2FSEY70wg0AWlPHNK5JXGeD1pmcetG70oAYZHkQorYZTkEnr7Uto7eYxYEVXvwYrp4vmVxjj+97ipbfJvAoZSD26k+/tQK+lzQLelRu1Ogj8+UxZKt0HGcn0qxe6XdWW3eUYsgYhTyuemc96LlWZQZtzcD8hUTA56EfWnMS2STk+tM749aBAwI7j8DTDS45oxj0/EUAS9qOOrEj6CjtS8d6ALyoZ4WlWZQeoQrn+fepEa3ggL48yTPyt0A/D1rKS5eHiPBTsDTJbpnjKcjJ6qMcelGxm4tk9rerBOZHxhzwfx/SrWrapJczCMPMVU5UuQCB+BP86zFVWhAYZAqOMCMkAcGlY1vpYsZIHsaOtICTgCn7RimIjIbNGKkxSbSegoAWkbIFKvIOO1L1IFAEDjmm4qRhk59aMZoAci/J0qJkIYrxkHFTrlRx1oCA9RzQALgj3pcUqjFBoAaaQ040w0AP5wcU3JqTkdqaTnj0oAZRS0qKhPzPtH0zQAIR3NOyvvT1ihDY8wt7/dH5mlZYR0JP0bP9KAIiR70cHvT1EZOGkKDHXZn+tM+Xj7x/IUAFMcgfjTzgAkKT6ZqIkk5NAH/2Q==",
"f_gmarble": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBiYyKfkFsVCTnOMVIo5qgLMTDADDr0NTj0qCJWlf5VOeuAM4FWBviO2RSvsRigB68UpfpgdB69aQH/ACKQ0AMlY44HNVnXA4A96sNUT0AUpEOMevSq5iPerxXf8vY98dKhdSGIPGKADgHBH61Yt7aa4jmkhjLLCMuc9BUEyEtuxkH9KWK4WA7WlZUfhselJgbMVm9xp8PkEsOTKinknsfcYp5tJLaxk88lQceWjHJB7n2GKoR3kUcn+iyM8WQFY9elOkuWuGVC20MRlj25rO2txll7eWK2juH2iOX7vzZNVZJM/KuagmlUTmKKfzlU8EHiq1jqf2l1hePbMxYYXpx9armS3GouWxe6d6YT+NLvDSFDww5IpNvB457Zqk09hNNOzImJ6HoKhZsnBzjt7VOY8nGc1C4A4ApiJgc5HrVae1DfQ1aHXilIwOR1oAoWsq24MT8BW+VscdallnSSIxxkOWGDjoKV4gjdB+FIiByE2nLcdamwCfZmijSNAVJGRjrz3qgHuILwswnmlCfLJgfMfetSNmWVgeew/DigorS/MO3FEoqSsyozcXdEemCYtLPOwDPgBfSrkjMMd6YoULgYAoJbHBIA9KaVlZCbbd2IXwuNvTpUDMcE093Ayars2e1MReVVXk849ajL7mJ9KlfcVxioACBzxQAuMkg806JQr7h1FQFzn5QT/OpImbOTQA+KPliRziljAcg4+6MVJww4NMHC7RQAEjPTikznp096d8vWh+lAEEq55BxUByD2P1FWWwRjvTZI9y5U4I/WgCXefcUhbC9OvenOjoOBn9aULkAtzQBGqA9uaf5Tt3Ap4OBwKeDQBAVaM8kEelKCpHpTpMk8VHnbgnnNADyRjjGKYw3A/N0okdQpx3poOVHA5oAYWIHLZpVbI7UjjHUUDHWgD//Z",
"f_mgrey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDCQYqdP/1mqbXcEY+eVQB1AO7+VTJO3AS3kPpuwo/X/CgZeXp/KndTgd6oztfG2kMJhjk2koOW5/SpIkaWFGkmlbeoJAO3Jx6CgCxI6IMMyrn+8cZqJzziqepQxR6dOI40DsAA2Mnr61aLAjef4uRQBGwH3j0HSoWyTmpXPrULZPH50AMxuPt/OmscnA6Cnsf4V6d6YTQBJIgFtIqqFGw8AYxxUN9fPZwrNs/dscbvc0xL6OeEMivKGHREJ5789Kp3ttc6lHAiokLQIUYnJD85BOM89vTjrSYFqz1fzJgZXJDnARRyf/rVp2z/AOiRknooBP07VztvolxEDNLJ9zptQ4+uTj9BWvbWdv5a708zAwPMJb9DxQhElxPDMVhWVHYtkqpzgAGpYGL28beqL/KobkLC8U4CoisEbsNpPX8D/M0tqd1pEF6BME/pTGSMdx46UwnqB+NPbj5R+JphH5D86AIyOKT3PQU4jdS4wA5H+6P60AU7WWK2knhkkVAGJGT05wcfp+dSi8e3lEtrC0395cFRj6mrQjQN5hRdx745/GkbJf6etAENzqF9fKI1tktlP3md9xPsAKcLaU8PcPj0jAUf409m7D/9VSg/L6H+VADBaQL/AMswz/33+Y/maep2pgfTinfdHvTFGWPagAA/yaYx3cc+1PY7jgdP5008dByelACYHTsOTTSdxz07fQUvsOefzoPbB/z60ASAE0kmFwF60/hF460wjPXn+tAEYH5npUy/KP5ZpqjHzHk5/OlBy3r/AFoAdySBTWOG2jv2p2due5pp5+poAB09qax/M9falJA6fhTT+tACH86Tqc9+9B/P+dLjAx37kfyoAk5J5PNGc89u/wDhRweM4A6kUHjHGPQegoAQkk4/l2pcbR05NKBsHPWgDnPGe57UAJjvzn2oOB6H3H8qUnb6hjz/AJ96aM9f0NACH360h9OntTjwOOp7H+dMAGOchR2/pQADORgfMfu/40HA4B6dTS9AWPU/oKTHt36epoA//9k=",
"f_f401": "data:image/jpeg;base64,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",
"f_f402": "data:image/jpeg;base64,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",
"f_f403": "data:image/jpeg;base64,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",
"f_f404": "data:image/jpeg;base64,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",
"f_f405": "data:image/jpeg;base64,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",
"f_f406": "data:image/jpeg;base64,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",
"f_f407": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC98XruS11fS3jYqwgkYYPUh1qLRPEsdxpsbyzLHKqkNvJ5IpnxrDnUdK8tSW8mTGD/ALQrgbWUwgMG4PBA/l71nOXKQzq9T8RXl5cqn2iREAx8nBx7Y654rt/DE1zLpgNxA8QH3d5OW9+a4XwjZjVdWCyqyxxR7zgDbjPTPSvS4lSIKkcaoijChRgD8KmLvqOJmay5Xbg1yWuajJFBguVQY3sD0GcV02uvsCj8q4nX5N2nXZIz+7I6d+361V9S7FZ4ppGCqu3/AHjnNaWkW80N5KZMbGhXa3QFsnI/ICtGxhguoUZFEUoUb0PJB/rV4aXPs3KgI+tS5jsSWskfmorNjnvXSaC2dRVs5yrfyrh3mgW7ih3gTOSFXPXAycV0XhR5BriISdvlvx+FXGRLRifGQg6npSnccwydAT/EK89t4TNeLGA5KrlQB19a9Z+JWjR6pdWjSymNI4JMFQMg5B59q88jaKIpIUOQPlcdv84qJpsiRqaRq8+gxzRxQqD90o/TcPcV1Wm+JZLqxeaa1kjZCME8Bs9K4u20q9uLd9TMim0jYtK8DZlT1bafr/8Aq612GlWKw2Fs0N3FfWs0ilZfL2uccYOOuOevNRFNDhcqXrXE5NxOD83QkYH4VzmsputvLGf3s0Sce7iuz8RSRIoDOMg9Bya4bU7jzZYPKhZ9k6uSeBgA/wBcVV0bJNmorFH3KxBB4INUtL8SaheQ3IurvESS7EVQFwMd8detVJbm7cEltgx/DxVLT7ULao3A3jcSO+aXMrD5Xc1TrEUeu2LkGSOJZC20dMgDP869C8MTwT6vFLCwZXR8EfSvLVjB1UgAHZB0+rf/AFq7L4frPH4pjUsRG0UmV9TjrVRnqkJx0udZ4zYLcW2QD+7bhjgHmvILpL1Jn3WJgj3HADgrt+v416h8Q/8Aj8suv+qfp9RXDX4nuE2ohJ+o/nUVKjTshxpqS1NPTtZt7LTjaQW6FXGHZs5Of8//AFqlgn3QtEjFIWkMmwHADHrisezsvLUNM25vQdBWko7AVi22aKKWxaaJHHEjfn/jULWan+CN/qMGm7D3OKA/l9GzipsXcrXmnlraXyoJN/lttC4OTjio7fRJI7WJW2grGoK984rQF1L7Gplu1A/eL+VO7FoZa6f5ErSC3w7AAsB2Fb3gpGHiaIkf8spP5U1LmEjritfwyYn1yNl2kiN+R16VcG+ZXJktGJ8QATe2WB/yyf8AmK5LZ3Y/hXXePwTe2WP+eT/zFcqI+OTiqqfExQ2GKABwKlUtjikG0dBn3p4JNZ2KDaT1OKNoFOVc9TSkfjTsFyLk8YoCD/69PJAPqaYzDNAC9utbXhAj/hIo/wDrlJ/KsPk/Stvwfj/hI4/+uUn8qqHxImWxteMtM1C/urVrK1eYJGwYrjg5HrXOf8I1rXfTps/h/jXqC96dxXQ6abuZKbSseXr4a1n/AKB036f408eHNZH/ADDpv0/xr03ijip9kg9ozzP/AIR/Wf8AoGzf+O/400+HdaPXT5v0/wAa9O4o4p+yQc7PL/8AhHNaP/MOlA/D/Gk/4RrWB002bP4f416jxRxS9ih+0Z5d/wAI1rR66dN+n+NavhnRtSstcjnubKWKIRuC7YxkjjvXecUx/u01TSdxObZ//9k=",
"f_f408": "data:image/jpeg;base64,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",
"f_f409": "data:image/jpeg;base64,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",
"f_6801": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDptTtw2q3Zz1mb+dQNbSiCQwsN+07c+uKvX7Y1O54/5at/OobiTyrV2ThiMD2qSjK0dYLbTVjuIBJM0REhzwG5x+ncetd3polFjD55zLsG8j1rg1BBGOvau6tZm8hN3LbRmgRbkPHNZty3JwasyzFh6Cs+dxzTAqTcmqz9amkPoagY+tADMD0pCgPal3Y6c/SgMDSAm1DI1S65H+ub+dQPEZ1CE4AqTUmxql1/12b+dRocnIPNAD7bS1L5ZzjsK3Y22oF9BWVFIR1q2k3HWmBZkfiqczdae0uRUDtnrQBA5FQE4qZwD71EwPY0gGHBPpSgAnsf50exo2jqOaAH6l/yFLv/AK7N/OoV6/1qTUzjVbvH/PZv51CjfnQBajapg4+lVVNP3GmBOXxUbSA9aj8zj0NNznqQDQBIW+lNJz1pmSKA34/SkA4gGgLjp+tIrenP0p2ccDvQBHqn/IVu/Xzm/nVcHB5/OrGqYOq3fr5zfzqtx0NAEiuVqVXB9qgAx0NLz249qALGaYRxgflTBJg88U7PHFAACRxk0hJHXilJ9eKToaAF3ev508Nn6e9RfSlBx7UAO1M51a7/AOuz/wA6r/rWtqGj6hLqVzJHZyFWlYqwIwRn61XGian/AM+Un6f40wKY9qXPGOlXTompdfscn6f40f2LqR/5cpP0/wAaAKeeADz60oB7dDVwaJqf/PnJ+n+NSrot8ox9kf68f40AUNpHFJnFXzpGor0tHYenH+NH9jagRn7JJ+n+NAFDvTh71c/sbUf+fNz+X+NKNH1H/n0f9P8AGgD/2Q==",
"f_6802": "data:image/jpeg;base64,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",
"f_6803": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC6LUQyRysoJRsgMu5T9RVwahIB/qLT3/cf/XqQAMOeD+lTIi91X6gVwJvodJDHdSzyxxeVagOwBKRYIGe3NdDFsUsyqqsxySB1rOhHl8hR9QKsiYEc9fUVpF9yWTyzELyapTMJFOTmnSSZHYiqrEjJQjnsaJSBIhkjdfuNx6HkVAWAOJF2n9DVrfng/Kf0prIDnIrJlFZogPmU4HrTN2DywJqUwlf9W2M9Rjg0wpnIdM+47VNxjkbHBqeNwDwcexpPLUjGKTZj7vPtVIRcRwR6U9myP61USUg4YHFSB88ggiquIVm98VCzkHmpCQ3WmMoxikwA4cY601umM4phwO+DSq2e2fpUMoYZdpO8Ee4qRSeuMijgjsaYYsHdExQ+nY0gJAB1H5U9SCPpVcF4uHOR2NSCRW71dxErICP6ioijk46HsRxUgJFLnPHH0NAEIdgcN+PFSj25FIVVu2D9aZsbPyHt0JpAOeIOcjrUYgG7Iyp9BThIc4YDI7d6eHz3/OjQCEuQcE57ZIp6Hdz1pzqGPIwarmJ42GGwDSGSj7hVvmFRmMg5QnPvSI57nPvU6kN3Gae4ESSMp5H4VKrBuVP1HpQ8efQH9DUBzkhhg9jmlsBYzzil+9/hVcO44bGVqUcjIouIVl3c4pCSo+7kCpBkjpn+dNOQM9qAGB8jrx6GlKhhhhSOquM1H8yetIZWjcqfmHWpw205zkGtceD74EkXEGD2IbH8qevhK+U5E8GPTDf4Vp7OfYnniZSy4GOo9Kk3KQOv9RWp/wAIpdg8TQj6Bv8AClHhe8z/AK+L8m/wo9nPsLmiZDR7/m3An17035kXPb0rcHhi8znzoc/Ruf0oPhi7PPnRA/Rv8KPZT7BzIxRKD1/MU0ksc54rXPhe/L5863A9AG/wpw8L3g/5bQj8G/wo9nPsHNHuYueeePpRkdM4/lW2fC12ek0IP0b/AApv/CK3mOZofyb/AApeyn2HzRP/2Q==",
"f_6805": "data:image/jpeg;base64,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",
"d003": "data:image/jpeg;base64,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",
"d021": "data:image/jpeg;base64,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",
"d029": "data:image/jpeg;base64,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"
};

// ============================================================
// COLOR DATA
// ============================================================
const dSeriesColors = [
  { id:'d001', name:'Brick Red Sand', code:'D-001', color:'#C4614A' },
  { id:'d002', name:'Antique Wall Grey', code:'D-002', color:'#6B6B6B' },
  { id:'d003', name:'Angel White Wood Grain', code:'D-003', color:'#E8E0D0' },
  { id:'d004', name:'Wenge Wood', code:'D-004', color:'#7B4A2D' },
  { id:'d008', name:'Ivory White', code:'D-008', color:'#F0EBE0' },
  { id:'d010', name:'Orange Yellow', code:'D-010', color:'#E8760A' },
  { id:'d013', name:'Multi-Color Brick', code:'D-013', color:'#B5734A' },
  { id:'d015', name:'Light Brown Sand', code:'D-015', color:'#C4A882' },
  { id:'d016', name:'Grey Brick White Grout', code:'D-016', color:'#888880' },
  { id:'d018', name:'Copper Emboss', code:'D-018', color:'#A0674A' },
  { id:'d021', name:'Black Wenge', code:'D-021', color:'#3A3028' },
  { id:'d023', name:'Desert Yellow', code:'D-023', color:'#D4B870' },
  { id:'d025', name:'Golden Wenge Wood', code:'D-025', color:'#8B6A3A' },
  { id:'d026', name:'Silver Wave', code:'D-026', color:'#C0C0C0' },
  { id:'d028', name:'Vietnam Wood', code:'D-028', color:'#D4C4A8' },
  { id:'d029', name:'Yellow Wenge Wood', code:'D-029', color:'#C8A040' },
  { id:'d031', name:'Silver Grey Fine Wave', code:'D-031', color:'#A8A8A0' },
  { id:'d031b', name:'Jazz White Marble', code:'D-031 alt', color:'#F0EEE8' },
  { id:'d032', name:'Pine Knot', code:'D-032', color:'#B87840' },
  { id:'d033', name:'Antique Wall Grey', code:'D-033', color:'#787870' },
  { id:'d034', name:'Angel White', code:'D-034', color:'#EBEBEB' },
  { id:'d038', name:'High Gloss White', code:'D-038', color:'#F8F8F8' },
  { id:'d039', name:'Wide Grain Wood', code:'D-039', color:'#A0784A' },
];

const sSeriesColors = [
  { id:'s001', name:'Angel White + Antique Grey', code:'S-001', color:'linear-gradient(135deg,#EBEBEB 50%,#6B6B6B 50%)' },
  { id:'s002', name:'Light Brown + Orange Red', code:'S-002', color:'linear-gradient(135deg,#C4A882 50%,#C04030 50%)' },
  { id:'s005', name:'Light Brown Sand + Orange Red', code:'S-005', color:'linear-gradient(135deg,#C4A882 50%,#C85030 50%)' },
  { id:'s006', name:'Light Brown Sand + Angel White', code:'S-006', color:'linear-gradient(135deg,#C4A882 50%,#EBEBEB 50%)' },
  { id:'s010', name:'Antique Grey + Angel White', code:'S-010', color:'linear-gradient(135deg,#6B6B6B 50%,#EBEBEB 50%)' },
  { id:'s011', name:'Beige + Orange Red', code:'S-011', color:'linear-gradient(315deg,#D4C4A0 50%,#C85030 50%)' },
  { id:'s012', name:'Angel White + Orange Red', code:'S-012', color:'linear-gradient(315deg,#EBEBEB 50%,#C04030 50%)' },
];

const solidColors = [
  { id:'sc_black',  name:'Charcoal Black', code:'Flat Steel', color:'#3A3C41' },
  { id:'sc_white',  name:'Crisp White',    code:'Flat Steel', color:'#E6E6E4' },
  { id:'sc_fgreen', name:'Forest Green',   code:'Flat Steel', color:'#225930' },
  { id:'sc_sgrey',  name:'Steel Grey',     code:'Flat Steel', color:'#7A8281' },
  { id:'sc_blue',   name:'Sky Blue',       code:'Flat Steel', color:'#2C5790' },
  { id:'sc_red',    name:'Crimson Red',    code:'Flat Steel', color:'#CE4755' },
  { id:'sc_yellow', name:'Yellow',         code:'Flat Steel', color:'#FFD200' },
  { id:'sc_orange', name:'Orange',         code:'Flat Steel', color:'#FF6400' },
];

const woodGrainColors = [
  { id:'wg_cherry',  name:'Cherry Wood', code:'Wood Grain', color:'#9A3C28' },
  { id:'wg_pine',    name:'Pine Wood',   code:'Wood Grain', color:'#D4882A' },
  { id:'wg_russet',  name:'Russet Wood', code:'Wood Grain', color:'#A04828' },
  { id:'wg_teak',    name:'Teak Wood',   code:'Wood Grain', color:'#8B5E3C' },
  { id:'wg_rose',    name:'Rosewood',    code:'Wood Grain', color:'#7A3830' },
  { id:'wg_cedar',   name:'Cedar Wood',  code:'Wood Grain', color:'#B86840' },
];

const marbleFloors = [
  { id:'f_bmarble', name:'Black Marble',  code:'Black Marble', color:'#2A2A2A' },
  { id:'f_gmarble', name:'Grey Marble',   code:'Grey Marble',  color:'#808080' },
  { id:'f_mgrey',   name:'Modern Grey',   code:'Modern Grey',  color:'#686868' },
];

const spcFloors = [
  { id:'f_f401', name:'Concrete Grey',  code:'F401/F501/F601', color:'#A0A098' },
  { id:'f_f402', name:'Walnut Brown',   code:'F402/F502/F602', color:'#7A5030' },
  { id:'f_f403', name:'Sand Stone',     code:'F403/F503/F603', color:'#C8B890' },
  { id:'f_f404', name:'White Stone',    code:'F404/F504/F604', color:'#D8D4C8' },
  { id:'f_f405', name:'Natural Oak',    code:'F405/F505/F605', color:'#C8A860' },
  { id:'f_f406', name:'Bright White',   code:'F406/F506/F606', color:'#F0EEEA' },
  { id:'f_f407', name:'Warm Beige',     code:'F407/F507/F607', color:'#D4C090' },
  { id:'f_f408', name:'Light Cream',    code:'F408/F508/F608', color:'#E0D4A8' },
  { id:'f_f409', name:'Light Grey Plank',code:'F409/F509/F609',color:'#B8B8B0' },
];

const woodPlankFloors = [
  { id:'f_6801', name:'White Grey Plank', code:'6801', color:'#C8C8C0' },
  { id:'f_6802', name:'Golden Oak',       code:'6802', color:'#C89840' },
  { id:'f_6803', name:'Natural Tan',      code:'6803', color:'#D4B878' },
  { id:'f_6805', name:'Dark Walnut',      code:'6805', color:'#5A3020' },
];

// ============================================================
// INIT COLOR SWATCHES
// ============================================================
function buildSwatches(containerId, items, group) {
  const el = document.getElementById(containerId);
  items.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 'color-chip';
    chip.id = 'chip_' + item.id;
    const imgSrc = SWATCH_IMAGES[item.id];
    const isGradient = item.color && item.color.startsWith('linear');
    let swatchBg;
    if (imgSrc) {
      swatchBg = `background-image:url('${imgSrc}'); background-size:cover; background-position:center;`;
    } else if (isGradient) {
      swatchBg = `background:${item.color};`;
    } else {
      swatchBg = `background:${item.color || '#ccc'};`;
    }
    chip.innerHTML = `
      <div class="chip-swatch" style="${swatchBg}"></div>
      <div class="chip-label">${item.name}</div>
    `;
    chip.onclick = () => selectColor(group, item);
    el.appendChild(chip);
  });
}

buildSwatches('dSeriesScroll', dSeriesColors, 'exterior');
buildSwatches('sSeriesScroll', sSeriesColors, 'exterior');
buildSwatches('solidScroll', solidColors, 'exterior');
buildSwatches('woodScroll', woodGrainColors, 'exterior');
buildSwatches('marbleScroll', marbleFloors, 'floor');
buildSwatches('spcScroll', spcFloors, 'floor');
buildSwatches('woodPlankScroll', woodPlankFloors, 'floor');

// ============================================================
// ACTIONS
// ============================================================
function selectSize(sz) {
  state.size = sz;
  document.getElementById('card72').classList.toggle('active', sz === 72);
  document.getElementById('card152').classList.toggle('active', sz === 152);
  updateRender();
  updateSummary();
}

function selectBTU(btu) {
  state.hvacBTU = btu;
  const btn6 = document.getElementById('btu6000btn');
  const btn9 = document.getElementById('btu9000btn');
  const price = btu === 6000 ? '$941' : '$1,269';
  document.getElementById('hvacPriceLabel').textContent = '+' + price;
  if (btu === 6000) {
    btn6.style.background = 'var(--green-deep)';
    btn6.style.color = 'white';
    btn6.style.borderColor = 'var(--green-light)';
    btn9.style.background = 'white';
    btn9.style.color = 'var(--text-dark)';
    btn9.style.borderColor = 'var(--warm-grey)';
  } else {
    btn9.style.background = 'var(--green-deep)';
    btn9.style.color = 'white';
    btn9.style.borderColor = 'var(--green-light)';
    btn6.style.background = 'white';
    btn6.style.color = 'var(--text-dark)';
    btn6.style.borderColor = 'var(--warm-grey)';
  }
  updateSummary();
}

function updatePresetPriceLabel() {
  const price = calcPresetPrice();
  const el = document.getElementById('presetPriceLabel');
  if (el) el.textContent = '+$' + price.toLocaleString();
}

function toggleAddon(addon) {
  state[addon] = !state[addon];
  document.getElementById(addon === 'hvac' ? 'hvacToggle' : addon === 'solar' ? 'solarToggle' : 'batteryAddon').classList.toggle('active', state[addon]);
  if (addon === 'hvac') {
    const opts = document.getElementById('hvacOptions');
    if (opts) opts.style.display = state.hvac ? 'block' : 'none';
    if (!state.hvac) { state.hvacBTU = 6000; document.getElementById('hvacPriceLabel').textContent = '+$941'; }
    updatePresetPriceLabel();
  }
  if (addon === 'solar') {
    document.getElementById('solarSub').classList.toggle('visible', state.solar);
    if (!state.solar) { state.battery = false; document.getElementById('batteryAddon').classList.remove('active'); }
    updatePresetPriceLabel();
  }
  updateRenderTags();
  updateSummary();
}

function setSolarMount(mount) {
  state.solarMount = mount;
  document.getElementById('mountRoof').classList.toggle('active', mount === 'roof');
  document.getElementById('mountGround').classList.toggle('active', mount === 'ground');
  updateRenderTags();
}

function setFrame(color) {
  state.frame = color;
  document.getElementById('frameBlack').classList.toggle('active', color === 'black');
  document.getElementById('frameWhite').classList.toggle('active', color === 'white');
  document.getElementById('sumFrame').textContent = color === 'black' ? 'Black' : 'White';
  updateRender();
}

function selectColor(group, item) {
  // Deactivate all chips in all exterior or floor groups
  const allGroups = group === 'exterior'
    ? ['dSeriesScroll','sSeriesScroll','solidScroll','woodScroll']
    : ['marbleScroll','spcScroll','woodPlankScroll'];

  allGroups.forEach(gid => {
    document.getElementById(gid).querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
  });

  document.getElementById('chip_' + item.id).classList.add('active');

  if (group === 'exterior') {
    state.exterior = item.color;
    state.exteriorName = item.name;
    state.exteriorImg = SWATCH_IMAGES[item.id] || null;
    document.getElementById('sumExterior').textContent = item.name + ' (' + item.code + ')';
    updateRender();
  } else {
    state.floor = item.color;
    state.floorName = item.name;
    state.floorImg = SWATCH_IMAGES[item.id] || null;
    document.getElementById('sumFloor').textContent = item.name + ' (' + item.code + ')';
    applyMaterialColors();
  }
}

// Zip prefixes for NM, KS, IA, MO
const INSTALL_STATE_PREFIXES = [
  '870','871','872','873','874','875','876','877','878','879', // NM
  '660','661','662','664','665','666','667','668',             // KS
  '500','501','502','503','504','505','506','507','508',
  '510','511','512','513','514','515','516','520','521',
  '522','523','524','525','526','527','528',                   // IA
  '630','631','633','634','635','636','637','638','639',
  '640','641','644','645','646','647','648','649','650',
  '651','652','653','654','655','656','657','658',             // MO
];

function isInstallableZip(zip) {
  if (!zip || zip.length < 3) return true; // no zip yet — don't warn
  return INSTALL_STATE_PREFIXES.some(p => zip.startsWith(p));
}

function checkInstallWarn() {
  // install state warn removed — We Install option no longer exists
  document.getElementById('installStateWarn').style.display = 'none';
  const zip = document.getElementById('buyerZip').value.trim()
            || document.getElementById('zipInput').value.trim();
  const ok = isInstallableZip(zip);
  document.getElementById('installStateWarn').style.display = ok ? 'none' : 'block';
}

function selectInstall(type) {
  state.install = type;
  ['installSelf','installPreset'].forEach(id => { const el = document.getElementById(id); if(el) el.classList.remove('active'); });
  const activeEl = document.getElementById('install' + type.charAt(0).toUpperCase() + type.slice(1));
  if (activeEl) activeEl.classList.add('active');

  const presetPrice = calcPresetPrice();
  const installLabels = { self: 'Self Set Up', preset: `We Pre-Build (+$${presetPrice.toLocaleString()})` };
  document.getElementById('sumInstallSum').textContent = installLabels[type];

  // Reset pickup button — no install option restricts pickup anymore
  const pickupBtn = document.getElementById('shipPickup');
  const pickupNote = document.getElementById('pickupUnavailNote');
  if (pickupBtn) { pickupBtn.classList.remove('disabled'); pickupBtn.title = ''; }
  if (pickupNote) pickupNote.style.display = 'none';

  checkInstallWarn();
  updateSummary();
}

function selectShipping(type) {
  // Block local pickup if We Install is active
  if (type === 'pickup' && state.install === 'pro') {
    return;
  }
  state.shipping = type;
  document.getElementById('shipPickup').classList.toggle('active', type === 'pickup');
  document.getElementById('shipDeliver').classList.toggle('active', type === 'deliver');
  document.getElementById('zipSection').style.display = type === 'deliver' ? 'block' : 'none';
  if (type === 'pickup') {
    state.shipCustomer = 0;
    document.getElementById('sumDelivery').textContent = 'Local Pickup — Free';
  }
  updateSummary();
}

function calcShipping() {
  const zip = document.getElementById('zipInput').value.trim();
  if (zip.length !== 5) { alert('Please enter a valid 5-digit zip code.'); return; }

  const zipCoords = getZipCoords(zip);
  if (!zipCoords) { alert('Zip code not found. Please verify and try again.'); return; }

  const santaFe = [35.6870, -105.9378];
  const miles = haversine(santaFe[0], santaFe[1], zipCoords[0], zipCoords[1]);
  const rawCost = Math.round(miles * 4);

  // Apply tiered shipping rules:
  // < $250        → customer pays $250 minimum, BuildSwift covers nothing
  // $250–$1,000   → customer pays full, no discount
  // $1,001–$1,999 → customer pays $1,000, BuildSwift covers the rest
  // $2,000+       → customer pays 50%, BuildSwift covers 50%
  let fullCost, custCost, buildswiftCovers, savingsNote;

  if (rawCost < 250) {
    fullCost = rawCost;
    custCost = 250;
    buildswiftCovers = 0;
    savingsNote = '📦 $250 minimum shipping applies';
  } else if (rawCost <= 1000) {
    fullCost = rawCost;
    custCost = rawCost;
    buildswiftCovers = 0;
    savingsNote = '';
  } else if (rawCost <= 1999) {
    fullCost = rawCost;
    custCost = 1000;
    buildswiftCovers = rawCost - 1000;
    savingsNote = `💚 BuildSwift covers $${buildswiftCovers.toLocaleString()} — you pay a flat $1,000`;
  } else {
    fullCost = rawCost;
    custCost = Math.round(rawCost / 2);
    buildswiftCovers = rawCost - custCost;
    savingsNote = `💚 BuildSwift covers $${buildswiftCovers.toLocaleString()} (50% of shipping)`;
  }

  state.shipMiles = Math.round(miles);
  state.shipFull = fullCost;
  state.shipCustomer = custCost;
  state.shipBuildswift = buildswiftCovers;

  document.getElementById('shipFullAmt').textContent = '$' + fullCost.toLocaleString();
  document.getElementById('shipYouPay').textContent = '$' + custCost.toLocaleString();

  const savingsEl = document.getElementById('shipSavings');
  savingsEl.textContent = savingsNote;
  savingsEl.style.display = savingsNote ? 'block' : 'none';

  document.getElementById('shipResult').classList.add('visible');
  document.getElementById('sumDelivery').textContent = 'Ship to ' + zip + ' (' + Math.round(miles) + ' mi)';

  // Sync buyer zip
  document.getElementById('buyerZip').value = zip;
  checkInstallWarn();
  updateSummary();
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 3959;
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLon = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

// Zip code database (representative sample — expand as needed)
function getZipCoords(zip) {
  const db = {
    '10001':[40.7484,-73.9967],'10002':[40.7157,-73.9863],'10003':[40.7317,-73.9892],
    '20001':[38.9101,-77.0147],'20002':[38.9001,-76.9947],'20003':[38.8801,-77.0039],
    '30301':[33.7490,-84.3880],'30302':[33.7490,-84.3880],'30303':[33.7490,-84.3880],
    '33101':[25.7617,-80.1918],'33102':[25.7617,-80.1918],'33125':[25.7750,-80.2274],
    '60601':[41.8857,-87.6181],'60602':[41.8827,-87.6282],'60603':[41.8801,-87.6298],
    '77001':[29.7604,-95.3698],'77002':[29.7555,-95.3677],'77003':[29.7490,-95.3590],
    '85001':[33.4484,-112.0740],'85002':[33.4484,-112.0740],'85003':[33.4484,-112.0740],
    '90001':[33.9731,-118.2479],'90002':[33.9492,-118.2462],'90210':[34.0901,-118.4065],
    '94101':[37.7749,-122.4194],'94102':[37.7796,-122.4194],'94103':[37.7726,-122.4099],
    '97201':[45.5051,-122.6750],'97202':[45.4901,-122.6506],'97203':[45.5889,-122.7305],
    '98101':[47.6062,-122.3321],'98102':[47.6301,-122.3221],'98103':[47.6583,-122.3389],
    '80201':[39.7392,-104.9903],'80202':[39.7550,-104.9956],'80203':[39.7300,-104.9810],
    '84101':[40.7608,-111.8910],'84102':[40.7608,-111.8700],'84103':[40.7806,-111.8781],
    '78201':[29.4241,-98.4936],'78202':[29.4241,-98.4600],'78203':[29.4100,-98.4700],
    '87501':[35.6870,-105.9378],'87502':[35.6870,-105.9378],'87505':[35.6500,-105.9378],
    '87101':[35.0844,-106.6504],'87102':[35.0631,-106.6502],'87110':[35.1050,-106.5700],
    '66101':[39.1155,-94.6268],'66201':[38.9617,-94.6614],'66202':[38.9617,-94.6614],
    '50301':[41.5868,-93.6249],'50302':[41.5868,-93.6249],'50309':[41.5868,-93.6249],
    '64101':[39.0997,-94.5786],'64102':[39.1087,-94.5786],'64110':[39.0569,-94.5875],
    '70112':[29.9511,-90.0715],'70113':[29.9511,-90.0900],'70114':[29.9300,-90.0584],
    '89101':[36.1699,-115.1398],'89102':[36.1480,-115.1890],'89103':[36.1070,-115.1979],
    '32801':[28.5383,-81.3792],'32802':[28.5383,-81.3792],'32803':[28.5590,-81.3607],
    '55401':[44.9778,-93.2650],'55402':[44.9763,-93.2709],'55403':[44.9699,-93.2826],
    '02101':[42.3601,-71.0589],'02102':[42.3601,-71.0589],'02110':[42.3601,-71.0497],
    '19101':[39.9526,-75.1652],'19102':[39.9526,-75.1652],'19103':[39.9526,-75.1783],
    '48201':[42.3314,-83.0457],'48202':[42.3700,-83.0750],'48203':[42.4014,-83.0686],
    '44101':[41.4993,-81.6944],'44102':[41.4823,-81.7339],'44103':[41.5173,-81.6396],
    '96801':[21.3069,-157.8583],'96802':[21.3069,-157.8583],'96813':[21.3069,-157.8583],
  };

  // Exact match
  if (db[zip]) return db[zip];

  // Fuzzy match: try same first 3 digits
  const prefix3 = zip.substring(0,3);
  for (const [k,v] of Object.entries(db)) {
    if (k.startsWith(prefix3)) return v;
  }
  // Try first 2
  const prefix2 = zip.substring(0,2);
  for (const [k,v] of Object.entries(db)) {
    if (k.startsWith(prefix2)) return v;
  }
  return null;
}

// ============================================================
// RENDER UPDATE
// ============================================================
// Material indices per model
// 72:  [0]=walls(Material.002) [1]=frame(Material) [2]=glass [3]=roof [4]=floor(Material.001)
// 152: [0]=walls(Material.004) [1]=floor(Material.001) [2]=frame(Material) [3]=glass [4]=roof
const MAT_INDEX = {
  72:  { walls: 0, frame: 1, roof: 3, floor: 4 },
  152: { walls: 0, frame: 2, roof: 4, floor: 1 },
};

// Front wall node names (highest Z — faces camera by default)
const FRONT_WALL_NODE = {
  72:  'Plane.004',
  152: 'Plane.026',
};

// Interior wall material index (same as frame = Material)
const INTERIOR_MAT = {
  72:  1,  // Material (frame slot) — we'll tint white for interior
  152: 2,
};

function hexToLinear(hex) {
  // Convert hex color to linear RGB array [r,g,b,1] for model-viewer
  const c = hex.replace('#','');
  const r = parseInt(c.substring(0,2),16)/255;
  const g = parseInt(c.substring(2,4),16)/255;
  const b = parseInt(c.substring(4,6),16)/255;
  // sRGB to linear
  const toLinear = v => v <= 0.04045 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  return [toLinear(r), toLinear(g), toLinear(b), 1.0];
}

function updateRender() {
  const viewer = document.getElementById('modelViewer');
  if (!viewer) return;

  // Swap model src only when size changes
  const newSrc = GLB_MODELS[state.size];
  if (viewer.src !== newSrc) {
    viewer.src = newSrc;
    // Reset interior toggle on size change
    if (state.interiorVisible) {
      state.interiorVisible = false;
      const btn = document.getElementById('interiorToggle');
      if (btn) { btn.textContent = '🏠 Show Interior'; btn.style.background = 'rgba(27,67,50,0.85)'; btn.style.color = 'white'; }
    }
    viewer.addEventListener('load', applyMaterialColors, { once: true });
  } else {
    applyMaterialColors();
  }

  updateRenderTags();
}

function applyMaterialColors() {
  const viewer = document.getElementById('modelViewer');
  if (!viewer || !viewer.model) return;

  const idx = MAT_INDEX[state.size];
  const materials = viewer.model.materials;
  if (!materials || materials.length === 0) return;

  // Wall/exterior panel color — only override if user has selected one
  // If no selection, leave GLB native material colors intact
  if (state.exterior) {
    const extColor = state.exterior;
    const isGradient = extColor.startsWith('linear');
    if (!isGradient && materials[idx.walls]) {
      materials[idx.walls].pbrMetallicRoughness.setBaseColorFactor(hexToLinear(extColor));
    }
  }

  // Frame color
  // On 72, Material (frame slot) is shared with large structural surfaces
  // so we only apply frame toggle on 152 where it's properly isolated
  if (state.size === 152) {
    const frameHex = state.frame === 'white' ? '#EFEFEF' : '#404040';
    if (materials[idx.frame]) {
      materials[idx.frame].pbrMetallicRoughness.setBaseColorFactor(hexToLinear(frameHex));
    }
  }

  // Interior walls always white — add as separate material if needed
  // (Interior uses a tinted version of the frame material on inner faces)
  // When interior is visible, also re-apply transparency state
  if (state.interiorVisible) {
    applyInteriorToggle();
  }

  // Floor color — only apply on 152 which has an actual floor mesh
  if (state.size === 152) {
    const floorColor = state.floor || '#CCCCCC';
    const floorIsGradient = floorColor.startsWith('linear');
    if (!floorIsGradient && materials[idx.floor]) {
      materials[idx.floor].pbrMetallicRoughness.setBaseColorFactor(hexToLinear(floorColor));
    }
  }
}

function updateRenderTags() {
  const tags = [];
  if (state.hvac) tags.push('HVAC');
  if (state.solar) tags.push(state.solarMount === 'roof' ? 'Solar: Roof' : 'Solar: Ground');
  if (state.battery) tags.push('Battery+');
  const container = document.getElementById('renderTags');
  container.innerHTML = '';
  tags.forEach((t, i) => {
    const tag = document.createElement('div');
    tag.className = 'render-tag';
    tag.textContent = t;
    container.appendChild(tag);
    setTimeout(() => tag.classList.add('visible'), i * 80);
  });
}

// ============================================================
// SUMMARY UPDATE
// ============================================================
function updateSummary() {
  const base = PRICES[state.size];
  let total = base;

  document.getElementById('sumUnitLabel').textContent = 'BaseBox ' + state.size;
  document.getElementById('sumUnitPrice').textContent = '$' + base.toLocaleString();
  document.getElementById('sumSize').textContent = 'BaseBox ' + state.size;

  // Add-ons
  document.getElementById('sumHvacLine').style.display = state.hvac ? '' : 'none';
  if (state.hvac) {
    const hvacPrice = state.hvacBTU === 6000 ? PRICES.hvac6000 : PRICES.hvac9000;
    document.getElementById('sumHvacLabel').textContent = `HVAC Mini Split ${state.hvacBTU.toLocaleString()} BTU`;
    document.getElementById('sumHvacVal').textContent = '+$' + hvacPrice.toLocaleString();
  }
  document.getElementById('sumSolarLine').style.display = state.solar ? '' : 'none';
  document.getElementById('sumBatteryLine').style.display = state.battery ? '' : 'none';
  if (state.hvac) total += state.hvacBTU === 6000 ? PRICES.hvac6000 : PRICES.hvac9000;
  if (state.solar) total += PRICES.solar;
  if (state.battery) total += PRICES.battery;

  // Install
  let installCost = 0;
  if (state.install === 'preset') installCost = calcPresetPrice();
  document.getElementById('sumInstallLine').style.display = installCost > 0 ? '' : 'none';
  document.getElementById('sumInstallLabel').textContent = state.install === 'pro' ? 'On-Site Install' : 'Pre-Setup';
  document.getElementById('sumInstallPrice').textContent = '$' + installCost.toLocaleString();
  total += installCost;

  // Shipping
  const shipVal = document.getElementById('sumShipVal');
  if (state.shipping === 'pickup') {
    shipVal.textContent = 'Local Pickup — Free';
    shipVal.className = 'sum-val green';
  } else if (state.shipCustomer > 0) {
    const hasDiscount = state.shipBuildswift > 0;
    if (hasDiscount) {
      shipVal.innerHTML = `<span style="text-decoration:line-through;color:var(--text-light);font-size:12px;margin-right:6px;">$${state.shipFull.toLocaleString()}</span><span style="color:var(--green-deep)">$${state.shipCustomer.toLocaleString()}</span>`;
    } else {
      shipVal.innerHTML = `<span style="color:var(--green-deep)">$${state.shipCustomer.toLocaleString()}</span>`;
    }
    total += state.shipCustomer;
  } else {
    shipVal.textContent = 'Enter zip to calculate';
    shipVal.className = 'sum-val';
  }

  document.getElementById('sumSubtotal').textContent = '$' + total.toLocaleString();
  document.getElementById('sumTotal').textContent = '$' + total.toLocaleString();
}

// ============================================================
// SUBMIT
// ============================================================
// EmailJS init
emailjs.init('CzshW_6gUDUjvCuoT');

// Stripe config
const STRIPE_PK = 'pk_live_51TUvDZ2cW6USBJBAL84PGkbp9CkJPNRjDiA9Rl2tEERiOI9SMTQC3cs8hbJcelPnHKvcNgltevbP2EKOOLMS3Y1s00RyEYBoZK';
const CHECKOUT_FUNCTION_URL = 'https://euphonious-puffpuff-73e592.netlify.app/.netlify/functions/create-checkout';

function submitQuote() {
  const name     = document.getElementById('buyerName').value.trim();
  const email    = document.getElementById('buyerEmail').value.trim();
  const phone    = document.getElementById('buyerPhone').value.trim();
  const zip      = document.getElementById('buyerZip').value.trim();

  if (!name || !email) {
    alert('Please enter your name and email address before submitting.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const base = PRICES[state.size];
  let subtotal = base;
  if (state.hvac)    subtotal += state.hvacBTU === 6000 ? PRICES.hvac6000 : PRICES.hvac9000;
  if (state.solar)   subtotal += PRICES.solar;
  if (state.battery) subtotal += PRICES.battery;
  if (state.install === 'preset') { subtotal += calcPresetPrice(); }

  if (state.shipping === 'deliver' && state.shipCustomer > 0) subtotal += state.shipCustomer;

  // Build readable add-ons string
  const addOnsList = [];
  if (state.hvac)    addOnsList.push(`HVAC Mini Split ${state.hvacBTU.toLocaleString()} BTU (+$${state.hvacBTU === 6000 ? '941' : '1,269'})`);
  if (state.solar)   addOnsList.push(`Solar Package — ${state.solarMount === 'roof' ? 'Roof' : 'Ground'} Mount (+$2,175)`);
  if (state.battery) addOnsList.push('Battery Expansion Pack (+$899)');

  // Build readable install string
  const installLabels = {
    self:   'Self Install (Included)',
    pro:    'On-Site Install (+$3,200)',
    preset: 'Pre-Setup (+$2,100)'
  };

  // Build readable shipping string
  let shippingStr;
  if (state.shipping === 'pickup') {
    shippingStr = 'Local Pickup — Free';
  } else if (state.shipCustomer > 0) {
    const bs = state.shipBuildswift || 0;
    if (state.shipFull < 250) {
      shippingStr = `Ship to ${zip} (${state.shipMiles} mi) — $250 minimum applies | Customer pays: $250`;
    } else if (bs === 0) {
      shippingStr = `Ship to ${zip} (${state.shipMiles} mi) — Full cost: $${state.shipFull.toLocaleString()} | Customer pays: $${state.shipCustomer.toLocaleString()}`;
    } else if (state.shipFull <= 1999) {
      shippingStr = `Ship to ${zip} (${state.shipMiles} mi) — Full: $${state.shipFull.toLocaleString()} | Customer pays: $1,000 flat | BuildSwift covers: $${bs.toLocaleString()}`;
    } else {
      shippingStr = `Ship to ${zip} (${state.shipMiles} mi) — Full: $${state.shipFull.toLocaleString()} | Customer pays: $${state.shipCustomer.toLocaleString()} (50%) | BuildSwift covers: $${bs.toLocaleString()} (50%)`;
    }
  } else {
    shippingStr = `Ship to ${zip} — shipping TBD`;
  }

  const templateParams = {
    // Status
    order_status:   '📩 Quote Request',
    // Customer info
    customer_name:  name,
    customer_email: email,
    customer_phone: phone || 'Not provided',
    customer_zip:   zip   || 'Not provided',
    // Unit
    unit:           `BaseBox ${state.size} (${state.size === 72 ? 'Micro Unit' : 'Studio Unit'})`,
    base_price:     `$${base.toLocaleString()}`,
    // Selections
    exterior_panel: state.exteriorName || 'Not selected',
    frame_color:    state.frame === 'black' ? 'Black' : 'White',
    floor_option:   state.floorName   || 'Not selected',
    add_ons:        addOnsList.length > 0 ? addOnsList.join('\n') : 'None',
    hvac_btu:       state.hvac ? `${state.hvacBTU.toLocaleString()} BTU` : 'N/A',
    notes:          state.notes || 'None',
    installation:   installLabels[state.install],
    shipping:       shippingStr,
    // Swatch images (base64 data URIs)
    exterior_swatch: state.exteriorImg || '',
    floor_swatch:    state.floorImg    || '',
    // Total
    estimated_total: `$${subtotal.toLocaleString()} (before tax)`,
    submitted_at:    new Date().toLocaleString(),
    // Reply-to so Charles can reply directly to buyer
    reply_to:        email,
  };

  // Customer-facing params (template_33uevlt)
  const customerParams = {
    order_status:   'Your BaseBox Quote',
    message:        "Here\'s the full spec for the BaseBox you configured. No obligation — reply anytime with questions.",
    next_steps:     "We\'ll follow up within 1 business day. Lead time is approximately 2–3 months including shipping.",
    customer_name:  name,
    customer_email: email,
    unit:           `BaseBox ${state.size} (${state.size === 72 ? 'Micro Unit' : 'Studio Unit'})`,
    exterior_panel: state.exteriorName || 'Not selected',
    frame_color:    state.frame === 'black' ? 'Black' : 'White',
    floor_option:   state.floorName   || 'Not selected',
    add_ons:        addOnsList.length > 0 ? addOnsList.join('\n') : 'None',
    hvac_btu:       state.hvac ? `${state.hvacBTU.toLocaleString()} BTU` : 'N/A',
    notes:          state.notes || 'None',
    installation:   installLabels[state.install],
    shipping:       shippingStr,
    exterior_swatch: state.exteriorImg || '',
    floor_swatch:    state.floorImg    || '',
    estimated_total: `$${subtotal.toLocaleString()} (before tax)`,
    submitted_at:    new Date().toLocaleString(),
    reply_to:        'charles@buildswiftmodular.com',
  };

  // Disable button while sending
  const btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span>';

  // Send internal notification + customer confirmation in parallel
  Promise.all([
    emailjs.send('service_87pltoj', 'template_yukoo2f',  templateParams),
    emailjs.send('service_87pltoj', 'template_33uevlt', customerParams),
  ])
    .then(() => {
      document.getElementById('successOverlay').classList.add('visible');
      btn.disabled = false;
      btn.innerHTML = '<span>📩 Get My Quote</span>';
    })
    .catch((err) => {
      console.error('EmailJS error status:', err.status);
      console.error('EmailJS error text:', err.text);
      console.error('Full error:', JSON.stringify(err));
      alert(`Error ${err.status}: ${err.text}\n\nPlease contact us at charles@buildswiftmodular.com`);
      btn.disabled = false;
      btn.innerHTML = '<span>📩 Get My Quote</span>';
    });
}

// ============================================================
// STRIPE CHECKOUT
// ============================================================
async function buyNow() {
  const name  = document.getElementById('buyerName').value.trim();
  const email = document.getElementById('buyerEmail').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const zip   = document.getElementById('buyerZip').value.trim();

  if (!name || !email) {
    alert('Please enter your name and email before checking out.');
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (CHECKOUT_FUNCTION_URL === 'YOUR_NETLIFY_FUNCTION_URL_HERE') {
    alert('Checkout is not yet configured. Please use Get My Quote to request pricing.');
    return;
  }

  const btn = document.getElementById('buyNowBtn');
  btn.disabled = true;
  btn.innerHTML = '<span>Loading...</span>';

  const base = PRICES[state.size];
  let subtotal = base;
  if (state.hvac)    subtotal += state.hvacBTU === 6000 ? PRICES.hvac6000 : PRICES.hvac9000;
  if (state.solar)   subtotal += PRICES.solar;
  if (state.battery) subtotal += PRICES.battery;
  if (state.install === 'preset') { subtotal += calcPresetPrice(); }

  if (state.shipping === 'deliver' && state.shipCustomer > 0) subtotal += state.shipCustomer;

  const payload = {
    // Customer
    name, email, phone, zip,
    origin: 'https://buildswiftmodular.com',
    // Unit config
    size:         state.size,
    basePrice:    base,
    exteriorName: state.exteriorName || '',
    frameName:    state.frame === 'black' ? 'Black Frame' : 'White Frame',
    floorName:    state.floorName || '',
    // Add-ons
    hvac:         state.hvac,
    solar:        state.solar,
    solarMount:   state.solarMount,
    battery:      state.battery,
    install:      state.install,
    // Shipping
    shipping:     state.shipping,
    shipCustomer: state.shipCustomer,
    shipMiles:    state.shipMiles,
  };

  try {
    const res = await fetch(CHECKOUT_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.url) {
      window.open(data.url, '_blank');
    } else {
      throw new Error(data.error || 'No checkout URL returned');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Checkout is temporarily unavailable. Please use Get My Quote and we will follow up with a payment link.');
    btn.disabled = false;
    btn.innerHTML = '<span>💳 Buy Now</span>';
  }
}

// ============================================================
// TERMS & CONDITIONS
// ============================================================
const PURCHASE_AGREEMENT = `BASEBOX RETAIL PURCHASE AGREEMENT
BuildSwift Modular LLC

1. PARTIES

This Purchase Agreement ("Agreement") is entered into between BuildSwift Modular LLC, a New Mexico limited liability company with a principal place of business at 3237 Rodeo Rd, Santa Fe, NM ("Seller," "BuildSwift," "we," "us"), and the individual or entity completing checkout on Seller's website or point-of-sale system ("Buyer," "you"), collectively the "Parties."

By checking the acceptance box at checkout, Buyer agrees this Agreement is legally binding to the same extent as if physically signed, pursuant to the federal E-SIGN Act and the New Mexico Uniform Electronic Transactions Act.

2. PRODUCT DESCRIPTION

Seller agrees to sell, and Buyer agrees to purchase, one (1) or more BaseBox modular units ("Unit(s)") as identified in the order confirmation, including the specific model, dimensions, configuration, and any selected options or accessories itemized at checkout.

2.1 Nature of the Product. Each Unit is manufactured, prefabricated movable personal property (chattel). Units are not built with, and do not include, permanent water supply, sewer connection, permanent electrical service connection, built-in cooking facilities, or a permanent foundation. Units are not affixed to real property by Seller and are not sold, represented, or warranted as a permanent dwelling, accessory dwelling unit, or fixture.

2.2 Buyer's Responsibility for Classification and Use. Buyer is solely responsible for determining and complying with all applicable zoning, building code, permitting, land use, HOA, and utility connection requirements in the jurisdiction where the Unit will be sited or used. Buyer acknowledges that local classification of the Unit (e.g., as a dwelling unit, accessory structure, or temporary structure) is determined by the Buyer's siting, connections, and use — not by the Unit's manufacture — and Seller makes no representation as to how any authority having jurisdiction will classify the Unit once delivered.

3. PRICE AND PAYMENT

3.1 Purchase Price. The total purchase price, including any options, freight, and applicable taxes, is as stated in the order confirmation issued at checkout.

3.2 Payment Terms. Full payment (or the deposit specified at checkout, with balance due prior to shipment) is due via the payment method Buyer authorizes at checkout. Seller is under no obligation to fabricate, reserve, or ship a Unit until payment terms are satisfied.

3.3 Taxes. Buyer is responsible for all applicable sales, use, or excise taxes not separately collected by Seller at checkout.

4. DELIVERY, RISK OF LOSS, AND TITLE

4.1 Delivery. Estimated delivery/lead times provided at checkout or in order confirmation are good-faith estimates only and not guaranteed delivery dates, given that Units are manufactured and imported to order.

4.2 Risk of Loss. Risk of loss or damage to the Unit passes to Buyer upon tender of delivery to Buyer's designated carrier or delivery address (FOB origin), consistent with UCC § 2-509, unless otherwise stated in the order confirmation.

4.3 Title. Title to the Unit passes to Buyer upon Seller's receipt of payment in full, notwithstanding any earlier delivery.

4.4 Inspection. Buyer must inspect the Unit upon delivery and report any shipping damage or defect to Seller in writing within 5 business days of delivery. Failure to timely report constitutes acceptance of the Unit as delivered.

5. LIMITED WARRANTY; DISCLAIMER

5.1 Limited Warranty. Seller warrants the Unit against defects in materials and workmanship for a period of 12 months from the date of delivery, subject to the terms of Seller's published warranty policy. This warranty does not cover damage from misuse, unauthorized modification, improper siting or leveling, normal wear, or acts of nature.

5.2 Disclaimer. EXCEPT AS EXPRESSLY STATED IN SECTION 5.1, THE UNIT IS SOLD "AS IS." SELLER DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, TO THE MAXIMUM EXTENT PERMITTED BY LAW.

6. CANCELLATION AND RETURNS

6.1 Cancellation Window. Buyer may cancel an order for a full refund of the purchase price if written notice of cancellation is received by Seller within forty-eight (48) hours of the time payment is made.

6.2 No Refunds After 48 Hours. Because each Unit is manufactured to order based on Buyer's selected specifications, all sales become final and non-refundable once the 48-hour cancellation window in Section 6.1 has elapsed, regardless of whether fabrication has begun. No cancellations, refunds, or order changes will be accepted after this window, except for warranty claims under Section 5 or as required by applicable law.

6.3 Returns. Units are non-returnable once delivered, except for warranty claims under Section 5 or as required by applicable law.

7. LIMITATION OF LIABILITY

TO THE MAXIMUM EXTENT PERMITTED BY LAW, SELLER'S TOTAL LIABILITY ARISING OUT OF THIS AGREEMENT SHALL NOT EXCEED THE AMOUNT PAID BY BUYER FOR THE UNIT. SELLER SHALL NOT BE LIABLE FOR INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF USE, LOSS OF PROFITS, OR COSTS OF SUBSTITUTE HOUSING OR STRUCTURES.

8. INDEMNIFICATION

Buyer agrees to indemnify and hold Seller harmless from claims, fines, or penalties arising from Buyer's siting, installation, utility connection, permitting, or use of the Unit in violation of applicable law.

9. DISPUTE RESOLUTION; GOVERNING LAW

9.1 Governing Law. This Agreement is governed by the laws of the State of New Mexico, without regard to conflict-of-law principles.

9.2 Dispute Resolution. Any dispute shall be resolved by binding arbitration administered under the rules of the American Arbitration Association, seated in Santa Fe County, New Mexico.

10. ELECTRONIC ACCEPTANCE

Buyer acknowledges that: (a) Buyer had the opportunity to review this Agreement in full before completing checkout; (b) checking the acceptance box and completing payment constitutes Buyer's electronic signature and unambiguous assent to be bound by this Agreement; and (c) Buyer may request a PDF copy of this Agreement for their records by contacting BuildSwift at charles&#64;buildswiftmodular&#46;com.

11. MISCELLANEOUS

11.1 Entire Agreement. This Agreement, together with the order confirmation, constitutes the entire agreement between the Parties regarding the Unit and supersedes prior negotiations or representations.

11.2 Severability. If any provision is held unenforceable, the remaining provisions remain in full force.

11.3 Assignment. Buyer may not assign this Agreement without Seller's prior written consent.`;

let tncAccepted = false;

function toggleTandC() {
  tncAccepted = !tncAccepted;
  const chk = document.getElementById('tncCheck');
  chk.style.background = tncAccepted ? 'var(--green-deep)' : 'white';
  chk.style.borderColor = tncAccepted ? 'var(--green-deep)' : 'var(--warm-grey)';
  chk.textContent = tncAccepted ? '✓' : '';
  document.getElementById('tncError').style.display = 'none';
  const opacity = tncAccepted ? '1' : '0.5';
  const cursor = tncAccepted ? 'pointer' : 'not-allowed';
  document.getElementById('quoteBtn').style.opacity = opacity;
  document.getElementById('quoteBtn').style.cursor = cursor;
  document.getElementById('buyNowBtn').style.opacity = opacity;
  document.getElementById('buyNowBtn').style.cursor = cursor;
}

function openTandC() {
  document.getElementById('tncScroll').textContent = PURCHASE_AGREEMENT;
  document.getElementById('tncModal').style.display = 'flex';
}

function closeTandC() {
  document.getElementById('tncModal').style.display = 'none';
}

function acceptTandC() {
  tncAccepted = true;
  const chk = document.getElementById('tncCheck');
  chk.style.background = 'var(--green-deep)';
  chk.style.borderColor = 'var(--green-deep)';
  chk.textContent = '✓';
  document.getElementById('quoteBtn').style.opacity = '1';
  document.getElementById('quoteBtn').style.cursor = 'pointer';
  document.getElementById('buyNowBtn').style.opacity = '1';
  document.getElementById('buyNowBtn').style.cursor = 'pointer';
  document.getElementById('tncError').style.display = 'none';
  closeTandC();
}

function checkTandCThen(action) {
  if (!tncAccepted) {
    document.getElementById('tncError').style.display = 'block';
    return;
  }
  if (action === 'quote') submitQuote();
  else buyNow();
}

function closeSuccess() {
  document.getElementById('successOverlay').classList.remove('visible');
}

// ============================================================
// INTERIOR TOGGLE
// ============================================================
function toggleInterior() {
  state.interiorVisible = !state.interiorVisible;
  const btn = document.getElementById('interiorToggle');
  btn.textContent = state.interiorVisible ? '🏠 Hide Interior' : '🏠 Show Interior';
  btn.style.background = state.interiorVisible
    ? 'rgba(201,168,76,0.92)'
    : 'rgba(27,67,50,0.85)';
  btn.style.color = state.interiorVisible ? '#1B2A1F' : 'white';
  applyInteriorToggle();
  applyMaterialColors();
}

function applyInteriorToggle() {
  const viewer = document.getElementById('modelViewer');
  if (!viewer || !viewer.model) return;
  const nodeName = FRONT_WALL_NODE[state.size];
  // Find the scene node and toggle visibility
  const scene = viewer.model;
  if (scene.materials) {
    // Hide/show by making the front wall material fully transparent
    const matIdx = MAT_INDEX[state.size].walls;
    const mat = scene.materials[matIdx];
    if (!mat) return;
    if (state.interiorVisible) {
      // Make front wall transparent
      mat.setAlphaMode('BLEND');
      const currentColor = mat.pbrMetallicRoughness.baseColorFactor;
      mat.pbrMetallicRoughness.setBaseColorFactor([
        currentColor[0], currentColor[1], currentColor[2], 0.0
      ]);
    } else {
      // Restore front wall
      mat.setAlphaMode('OPAQUE');
      const extColor = state.exterior || (state.frame === 'black' ? '#3A3A3A' : '#C8C8C8');
      const isGradient = extColor && extColor.startsWith('linear');
      if (!isGradient) {
        const lin = hexToLinear(extColor);
        mat.pbrMetallicRoughness.setBaseColorFactor([lin[0], lin[1], lin[2], 1.0]);
      }
    }
  }
}

// ============================================================
// AR + QR FUNCTIONS
// ============================================================
function launchAR() {
  const viewer = document.getElementById('modelViewer');
  if (!viewer) return;

  const isDesktop = !/android|iphone|ipad|ipod/i.test(navigator.userAgent);

  if (isDesktop) {
    // Desktop — show QR so they can scan with phone
    showQR();
    return;
  }

  // Mobile — use model-viewer's built-in AR activation
  // ar-modes="scene-viewer quick-look webxr" handles iOS and Android automatically
  if (viewer.canActivateAR) {
    viewer.activateAR();
  } else {
    // AR not supported on this device — show QR fallback
    showQR();
  }
}

function showQR() {
  // Generate QR code for current page URL
  const popup = document.getElementById('qrPopup');
  popup.style.display = popup.style.display === 'none' ? 'flex' : 'none';
  if (popup.style.display === 'block') {
    generateQR();
  }
}

function generateQR() {
  const img = document.getElementById('qrImg');
  if (!img) return;
  img.src = `data:image/png;base64,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`;
}

// ============================================================
// INIT
// ============================================================
// Wait for model-viewer to be defined before setting src
function initModelViewer() {
  const viewer = document.getElementById('modelViewer');
  if (!viewer) { console.error('model-viewer element not found'); return; }
  const src = GLB_MODELS[state.size];
  console.log('Setting model-viewer src to blob URL:', src ? src.substring(0,40)+'...' : 'UNDEFINED');
  viewer.src = src;
  viewer.addEventListener('load', () => {
    console.log('model-viewer: model loaded successfully');
    viewer.dismissPoster();
    applyMaterialColors();
    if (state.interiorVisible) applyInteriorToggle();
  });
  viewer.addEventListener('error', (e) => {
    console.error('model-viewer load error:', JSON.stringify(e.detail));
  });
}

// Try immediately, then poll — works in both module and non-module environments
function tryInitModelViewer(attempts) {
  attempts = attempts || 0;
  const viewer = document.getElementById('modelViewer');
  if (viewer && typeof viewer.src !== 'undefined') {
    initModelViewer();
  } else if (attempts < 50) {
    setTimeout(() => tryInitModelViewer(attempts + 1), 100);
  } else {
    console.error('model-viewer failed to initialize after 5s');
  }
}
tryInitModelViewer();

updateRender();
updateSummary();
</script>
</body>
</html>
