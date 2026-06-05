// localStorage 進度追蹤
(function() {
  const STORAGE_KEY = 'hydraulics_progress_v1';

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveProgress(p) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  // 首頁：標記已讀的 level card
  document.querySelectorAll('.level-card[data-level]').forEach(card => {
    const lv = card.getAttribute('data-level');
    const progress = getProgress();
    if (progress['L' + lv]) card.classList.add('read');
  });

  // 課程頁：標記已讀按鈕
  const readBtn = document.querySelector('.read-btn[data-level]');
  if (readBtn) {
    const lv = readBtn.getAttribute('data-level');
    const progress = getProgress();
    if (progress['L' + lv]) {
      readBtn.classList.add('done');
      readBtn.textContent = '✓ 已標記為已讀';
    }
    readBtn.addEventListener('click', () => {
      const p = getProgress();
      if (p['L' + lv]) {
        delete p['L' + lv];
        readBtn.classList.remove('done');
        readBtn.textContent = '標記為已讀';
      } else {
        p['L' + lv] = new Date().toISOString();
        readBtn.classList.add('done');
        readBtn.textContent = '✓ 已標記為已讀';
      }
      saveProgress(p);
    });
  }
})();
