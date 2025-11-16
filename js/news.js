async function loadNews() {
  const timestamp = new Date().getTime(); // ⏱️ Generate a unique timestamp
  const indexURL = `https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/files.json?t=${timestamp}`;
  const baseURL = `https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/`;

  try {
    const res = await fetch(indexURL, { cache: "no-store" });
    const data = await res.json();

    renderNews(data, baseURL);
    setupLatestButton(data, baseURL);
  } catch (error) {
    console.error("Failed to load news:", error);
  }
}

function setupLatestButton(structure, baseURL) {
  const latestBtn = document.getElementById("readLatestBtn");
  if (!latestBtn) return;

  // Find the most recent article
  const sortedYears = Object.keys(structure).sort((a, b) => b - a);
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  let latestUrl = null;
  
  for (const year of sortedYears) {
    const months = structure[year];
    const sortedMonths = Object.keys(months).sort(
      (a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a)
    );
    
    for (const month of sortedMonths) {
      const days = months[month].sort((a, b) => b - a);
      if (days.length > 0) {
        const latestDay = String(days[0]).padStart(2, '0');
        latestUrl = `${baseURL}/${year}/${month}/${latestDay}.md`;
        
        // Update button text with date
        const dateText = document.createElement('span');
        dateText.className = 'text-sm opacity-90';
        dateText.innerHTML = `<br/>${month} ${latestDay}, ${year}`;
        latestBtn.querySelector('span').innerHTML = `Read Latest News${dateText.outerHTML}`;
        
        latestBtn.addEventListener('click', () => openNews(latestUrl));
        return;
      }
    }
  }
}

  
function renderNews(structure, baseURL) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  // Step 1: Sort years in descending order (e.g., 2025, 2024)
  const sortedYears = Object.keys(structure).sort((a, b) => b - a);

  // Step 2: Define correct month order
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthColors = {
    "Jan": "from-blue-500 to-blue-600",
    "Feb": "from-pink-500 to-pink-600",
    "Mar": "from-green-500 to-green-600",
    "Apr": "from-yellow-500 to-yellow-600",
    "May": "from-purple-500 to-purple-600",
    "Jun": "from-indigo-500 to-indigo-600",
    "Jul": "from-red-500 to-red-600",
    "Aug": "from-teal-500 to-teal-600",
    "Sep": "from-orange-500 to-orange-600",
    "Oct": "from-cyan-500 to-cyan-600",
    "Nov": "from-rose-500 to-rose-600",
    "Dec": "from-emerald-500 to-emerald-600"
  };

  const monthIcons = {
    "Jan": "fa-snowflake", "Feb": "fa-heart", "Mar": "fa-seedling",
    "Apr": "fa-cloud-sun", "May": "fa-flower", "Jun": "fa-sun",
    "Jul": "fa-umbrella-beach", "Aug": "fa-cloud-rain", "Sep": "fa-leaf",
    "Oct": "fa-wind", "Nov": "fa-cloud", "Dec": "fa-snowman"
  };

  for (const year of sortedYears) {
    // Year Header
    const yearHeader = document.createElement("div");
    yearHeader.className = "col-span-full mb-4";
    yearHeader.innerHTML = `
      <div class="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-2xl px-6 py-4 shadow-xl">
        <i class="fas fa-calendar-alt text-white text-2xl"></i>
        <h2 class="text-2xl font-bold text-white">${year}</h2>
        <div class="ml-auto text-white text-sm opacity-90">
          <i class="fas fa-newspaper mr-1"></i>${Object.values(structure[year]).reduce((sum, days) => sum + days.length, 0)} Articles
        </div>
      </div>
    `;
    container.appendChild(yearHeader);

    const months = structure[year];

    // Step 3: Sort months in reverse chronological order
    const sortedMonths = Object.keys(months).sort(
      (a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a)
    );

    for (const month of sortedMonths) {
      const monthCard = document.createElement("div");
      const gradient = monthColors[month] || "from-gray-500 to-gray-600";
      const icon = monthIcons[month] || "fa-calendar";
      
      monthCard.className = "group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:scale-105 cursor-pointer";
      
      // Count days
      const dayCount = months[month].length;
      
      monthCard.innerHTML = `
        <div class="bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div class="relative z-10">
            <i class="fas ${icon} text-4xl mb-3 opacity-90"></i>
            <h3 class="text-2xl font-bold">${month} ${year}</h3>
            <p class="text-sm opacity-90 mt-1">
              <i class="fas fa-file-alt mr-1"></i>${dayCount} article${dayCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">
              <i class="fas fa-list mr-2"></i>Available Dates
            </span>
            <button class="toggle-btn text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors">
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
          <div class="days-list hidden space-y-2 max-h-64 overflow-y-auto">
            ${months[month].sort((a, b) => b - a).map(day => {
              const paddedDay = String(day).padStart(2, '0');
              const mdUrl = `${baseURL}/${year}/${month}/${paddedDay}.md`;
              return `
                <button class="day-btn w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r ${gradient} bg-opacity-10 hover:bg-opacity-20 rounded-xl transition-all group/day" data-url="${mdUrl}">
                  <span class="flex items-center gap-3">
                    <span class="w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">${paddedDay}</span>
                    <span class="font-medium text-gray-700 dark:text-gray-300">${month} ${paddedDay}, ${year}</span>
                  </span>
                  <i class="fas fa-arrow-right text-amber-600 dark:text-amber-400 opacity-0 group-hover/day:opacity-100 transition-opacity"></i>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
      
      container.appendChild(monthCard);
    }
  }

  // Add click handlers after rendering
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.group');
      const daysList = card.querySelector('.days-list');
      const icon = btn.querySelector('i');
      
      daysList.classList.toggle('hidden');
      icon.classList.toggle('fa-chevron-down');
      icon.classList.toggle('fa-chevron-up');
    });
  });

  // Open article on card click (but not when clicking days)
  document.querySelectorAll('.group').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.days-list') && !e.target.closest('.toggle-btn')) {
        const toggleBtn = card.querySelector('.toggle-btn');
        toggleBtn.click();
      }
    });
  });

  // Add click handlers for day buttons
  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const url = btn.dataset.url;
      openNews(url);
    });
  });
}

  
  async function openNews(mdUrl) {
  console.log("URL Requested", mdUrl);
  // Navigate to rendernotes.html and pass mdUrl as a query parameter
  window.location.href = `rendernotesfinal.html?mdUrl=${encodeURIComponent(mdUrl)}`;
  }
  
  function closeModal() {
    document.getElementById("markdownModal").classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
  
  loadNews();
  
