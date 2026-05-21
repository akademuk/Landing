/* ============================================================
   Reels Booster — небольшой ванильный JS
   ============================================================ */
(function () {
  'use strict';

  // -------- Год в футере ----------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // -------- Табы программы практикума ----------
  document.querySelectorAll('[data-tabs]').forEach(function (root) {
    var tabs   = root.querySelectorAll('[data-tab]');
    var panels = root.querySelectorAll('[data-panel]');

    function activate(name) {
      tabs.forEach(function (t) {
        var on = t.dataset.tab === name;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        if (p.dataset.panel === name) p.removeAttribute('hidden');
        else p.setAttribute('hidden', '');
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab.dataset.tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        var arr = Array.prototype.slice.call(tabs);
        var i = arr.indexOf(document.activeElement);
        var next = e.key === 'ArrowRight' ? (i + 1) % arr.length : (i - 1 + arr.length) % arr.length;
        arr[next].focus();
        activate(arr[next].dataset.tab);
      });
    });
  });

  // -------- Кнопки покупки (data-product) ----------
  // Разработчик заменит этот обработчик на реальную интеграцию (WayForPay / Stripe / др.)
  document.querySelectorAll('[data-product]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var product = link.dataset.product;
      var price   = link.dataset.price;

      // Если href пустой или "#" — перехватываем и показываем подсказку.
      var href = link.getAttribute('href') || '';
      if (href === '' || href === '#') {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.info('[buy]', { product: product, price: price });
        // Якорь tariffs — для CTA, ведущих к таблице тарифов
        if (product === 'hero-cta' || product === 'guarantee-cta') {
          var t = document.getElementById('tariffs');
          if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          alert('Платёжная ссылка для тарифа "' + product + '" ещё не подключена.\n\n' +
                'Замените href этой кнопки на реальный URL оплаты.');
        }
      }
    });
  });

  // -------- Lazy-show floating video greeting (через 5 сек) ----------
  var floating = document.querySelector('[data-video-greeting]');
  if (floating) {
    setTimeout(function () { floating.removeAttribute('hidden'); }, 5000);
  }

  // -------- USDT Modal ----------
  var usdtModal = document.getElementById('usdtModal');

  function openUsdtModal() {
    if (!usdtModal) return;
    usdtModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    usdtModal.querySelector('.usdt-modal__close').focus();
  }

  function closeUsdtModal() {
    if (!usdtModal) return;
    usdtModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-usdt]').forEach(function (btn) {
    btn.addEventListener('click', openUsdtModal);
  });

  document.querySelectorAll('[data-usdt-close]').forEach(function (el) {
    el.addEventListener('click', closeUsdtModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeUsdtModal();
  });
})();
