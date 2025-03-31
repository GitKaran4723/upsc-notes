async function loadNews() {
  const timestamp = new Date().getTime(); // ⏱️ Generate a unique timestamp
  const indexURL = `https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/files.json?t=${timestamp}`;
  const baseURL = "";

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
  
    for (const year in structure) {
      const yearBlock = document.createElement("div");
      yearBlock.className = "bg-red-100 border border-red-300 rounded-lg p-4";
  
      const yearTitle = document.createElement("h2");
      yearTitle.className = "text-red-700 text-lg font-bold mb-2";
      yearTitle.textContent = `📅 ${year}`;
      yearBlock.appendChild(yearTitle);
  
      const months = structure[year];
      for (const month in months) {
        const monthTitle = document.createElement("h3");
        monthTitle.className = "text-red-600 text-base font-semibold mt-2";
        monthTitle.textContent = `📁 ${month}`;
        yearBlock.appendChild(monthTitle);
  
        const daysList = document.createElement("div");
        daysList.className = "flex flex-wrap gap-2 mt-2";
  
        months[month].forEach(day => {
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
  
