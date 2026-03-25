document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selection ---
  const itemsInput = document.getElementById('items-input');
  const wrapCheckbox = document.getElementById('wrap-checkbox');
  const gapInput = document.getElementById('gap-input');
  const wrapColumnsInput = document.getElementById('wrap-columns-input');
  const wrapColumnsContainer = document.getElementById('wrap-columns-container');
  
  const previewArea = document.getElementById('preview-area');
  const codeOutput = document.getElementById('code-output');
  const copyBtn = document.getElementById('copy-btn');
  const tabs = document.querySelectorAll('.tab-btn');
  const contentPanes = document.querySelectorAll('.content-tab > div');

  // --- State Management ---
  const state = {
      items: parseInt(itemsInput.value),
      gap: parseInt(gapInput.value),
      wrap: wrapCheckbox.checked,
      wrapColumns: parseInt(wrapColumnsInput.value)
  };

  // --- Core Functions ---
  
  /**
   * Updates the preview area based on the current state.
   */
  function updatePreview() {
      previewArea.innerHTML = '';
      // The 'display: flex' is now controlled by Tailwind class in HTML.
      // We only control wrap and gap here.
      previewArea.style.flexWrap = state.wrap ? 'wrap' : 'nowrap';
      previewArea.style.gap = `${state.gap}px`;

      for (let i = 0; i < state.items; i++) {
          const item = document.createElement('div');
          item.className = 'preview-item bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-md transition-all duration-200';
          
          if (state.wrap) {
              const columnsPerRow = Math.max(1, state.wrapColumns);
              const itemBasis = `calc((100% - ${state.gap * (columnsPerRow - 1)}px) / ${columnsPerRow})`;
              item.style.flex = `0 0 ${itemBasis}`; // Don't grow, don't shrink, fixed basis
          } else {
              item.style.flex = '1 1 0px'; // Grow and shrink to fill space
          }
          
          item.textContent = i + 1;
          previewArea.appendChild(item);
      }
  }
  
  /**
   * Updates the code block based on the current state.
   */
  function updateCode() {
      let itemCss;
      if (state.wrap) {
          const columnsPerRow = Math.max(1, state.wrapColumns);
          const itemBasis = `calc((100% - ${state.gap * (columnsPerRow - 1)}px) / ${columnsPerRow})`;
          itemCss = `
.item {
  /* When wrapping, items have a calculated size */
  /* ${state.gap * (columnsPerRow - 1)}px = ${state.gap} (gap) * ${columnsPerRow - 1} */
  flex: 0 0 ${itemBasis};
}`;
      } else {
          itemCss = `
.item {
  /* When not wrapping, items share available space */
  flex: 1 1 0px;
}`;
      }

      const cssCode = `
.container {
  display: flex;
  gap: ${state.gap}px;
  flex-wrap: ${state.wrap ? 'wrap' : 'nowrap'};
}
${itemCss}
`.trim();

      codeOutput.textContent = cssCode;
      Prism.highlightElement(codeOutput);
  }

  /**
   * Main update function to refresh both preview and code.
   */
  function updateAll() {
      updatePreview();
      updateCode();
  }

  // --- Event Listeners ---
  
  itemsInput.addEventListener('input', (e) => {
      state.items = parseInt(e.target.value) || 0;
      updateAll();
  });

  gapInput.addEventListener('input', (e) => {
      state.gap = parseInt(e.target.value) || 0;
      updateAll();
  });

  wrapCheckbox.addEventListener('change', (e) => {
      state.wrap = e.target.checked;
      wrapColumnsContainer.classList.toggle('hidden', !state.wrap);
      updateAll();
  });
  
  wrapColumnsInput.addEventListener('input', (e) => {
      state.wrapColumns = parseInt(e.target.value) || 1;
      updateAll();
  });

  // Tab switching logic
  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          const targetId = tab.dataset.tab + '-area';
          contentPanes.forEach(pane => {
              pane.classList.toggle('active', pane.id === targetId);
          });
      });
  });

  // Copy button logic
  copyBtn.addEventListener('click', () => {
      const codeToCopy = codeOutput.textContent;
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = codeToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      
      try {
          document.execCommand('copy');
          copyBtn.textContent = 'Copied!';
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
      } catch (err) {
          console.error('Failed to copy: ', err);
          copyBtn.textContent = 'Error!';
      }
      
      document.body.removeChild(tempTextArea);
  });

  // --- Initial UI State & Load ---
  wrapColumnsContainer.classList.toggle('hidden', !state.wrap);
  updateAll();
});