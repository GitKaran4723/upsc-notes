async function loadNews() {
  const timestamp = new Date().getTime(); // ⏱️ Generate a unique timestamp
  const indexURL = `https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/files.json?t=${timestamp}`;
  const baseURL = `https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/`;

  try {
    const res = await fetch(indexURL, { cache: "no-store" });
    const data = await res.json();

    renderNews(data, baseURL);
  } catch (error) {
    console.error("Failed to load news:", error);
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

  for (const year of sortedYears) {
    const yearBlock = document.createElement("div");
    yearBlock.className = "bg-red-100 border border-red-300 rounded-lg p-4 mb-4";

    const yearTitle = document.createElement("h2");
    yearTitle.className = "text-red-700 text-lg font-bold mb-2";
    yearTitle.textContent = `📅 ${year}`;
    yearBlock.appendChild(yearTitle);

    const months = structure[year];

    // Step 3: Sort months in reverse chronological order (e.g., Apr, Mar, Feb...)
    const sortedMonths = Object.keys(months).sort(
      (a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a)
    );

    for (const month of sortedMonths) {
      const monthTitle = document.createElement("h3");
      monthTitle.className = "text-red-600 text-base font-semibold mt-2";
      monthTitle.textContent = `📁 ${month}`;
      yearBlock.appendChild(monthTitle);

      const daysList = document.createElement("div");
      daysList.className = "flex flex-wrap gap-2 mt-2";

      // Step 4: Sort days in reverse (latest day first)
      months[month].sort((a, b) => b - a).forEach(day => {
        day = String(day).padStart(2, '0');

        const button = document.createElement("button");
        button.textContent = `🗓️ ${day}`;
        button.className = "bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm";
        const mdUrl = `${baseURL}/${year}/${month}/${day}.md`;

        button.addEventListener('click', () => openNews(mdUrl));
        daysList.appendChild(button);
      });

      yearBlock.appendChild(daysList);
    }

    container.appendChild(yearBlock);
  }
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
  
