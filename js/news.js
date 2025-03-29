async function loadNews() {
 
    const indexURL = "https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/files.json";
    const baseURL = "https://raw.githubusercontent.com/GitKaran4723/dailynews/refs/heads/main/";

    const res = await fetch(indexURL);
    const data = await res.json();
    renderNews(data, baseURL);
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
    const res = await fetch(mdUrl);
    const mdText = await res.text();
  
    const contentBox = document.getElementById("markdownContent");
    contentBox.innerHTML = marked.parse(mdText);
  
    document.getElementById("markdownModal").classList.add("active");
    document.body.classList.add("no-scroll");
  }
  
  function closeModal() {
    document.getElementById("markdownModal").classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
  
  loadNews();
  