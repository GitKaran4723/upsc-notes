const recentsList = document.getElementById('recents-list');
const showMoreBtn = document.getElementById('show-more-btn');

let recents = [];
let showingAll = false;

async function loadRecents() {
  try {
    const res = await fetch('data/recents.json', { cache: "no-store" });
    recents = await res.json();
    renderRecents();
  } catch (err) {
    console.error("Failed to load recents:", err);
  }
}

function renderRecents() {
  recentsList.innerHTML = '';

  const items = showingAll ? recents : recents.slice(0, 3);

  items.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry.activity;
    recentsList.appendChild(li);
  });

  showMoreBtn.textContent = showingAll ? 'Show Less' : 'Show More';
}

showMoreBtn.addEventListener('click', () => {
  showingAll = !showingAll;
  renderRecents();
});

loadRecents(); // Initial load

// ✅ Refresh every 30 seconds
setInterval(loadRecents, 30000);
