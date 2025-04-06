async function loadSyllabus() {
  const res = await fetch("data/syllabus.json");
  const data = await res.json();
  renderUPSC(data);

}

function renderUPSC(data) {
  const container = document.getElementById("syllabus-root");
  container.innerHTML = "";

  Object.entries(data).forEach(([section, content]) => {
    const sectionDetails = document.createElement("details");
    sectionDetails.innerHTML = `<summary class="font-bold text-lg">${section.toUpperCase()}</summary>`;
    const sectionDiv = document.createElement("div");

    Object.entries(content).forEach(([paperName, paperContent]) => {
      const paperDetails = document.createElement("details");
      paperDetails.innerHTML = `<summary>${paperName}</summary>`;
      const unitList = document.createElement("div");

      if (Array.isArray(paperContent)) {
        // Simple list
        const ul = document.createElement("ul");
        paperContent.forEach(name => {
          const li = document.createElement("li");
          li.textContent = name;
          li.className = "ml-6 mb-1";
          ul.appendChild(li);
        });
        unitList.appendChild(ul);

      } else if (Array.isArray(paperContent.topics)) {
        const ul = document.createElement("ul");
        paperContent.topics.forEach(topic => {
          const li = document.createElement("li");
          li.className = "ml-6 mb-1";
          const a = document.createElement("a");
          a.href = "#";
          a.textContent = "🔹 " + topic.name;
          a.className = "text-blue-700 hover:underline";
          a.addEventListener('click', (e) => {
            e.preventDefault();
            openConcept(topic.markdown_url);
          });
          li.appendChild(a);
          ul.appendChild(li);
        });
        unitList.appendChild(ul);

      } else if (Array.isArray(paperContent.units)) {
        paperContent.units.forEach(unit => {
          const unitDetails = document.createElement("details");
          unitDetails.innerHTML = `<summary>${unit.name}</summary>`;
          const topicList = document.createElement("ul");
          (unit.topics || []).forEach(topic => {
            const li = document.createElement("li");
            li.className = "ml-6 mb-1";
            const a = document.createElement("a");
            a.href = "#";
            a.textContent = "🔹 " + topic.name;
            a.className = "text-blue-700 hover:underline";
            a.addEventListener('click', (e) => {
              e.preventDefault();
              openConcept(topic.markdown_url);
            });
            li.appendChild(a);
            topicList.appendChild(li);
          });
          unitDetails.appendChild(topicList);
          unitList.appendChild(unitDetails);
        });
      }

      paperDetails.appendChild(unitList);
      sectionDiv.appendChild(paperDetails);
    });

    sectionDetails.appendChild(sectionDiv);
    container.appendChild(sectionDetails);
  });
}

async function openConcept(mdUrl) {
  console.log("URL Requested", mdUrl);

  // Navigate to rendernotes.html and pass mdUrl as a query parameter
  window.location.href = `rendernotesfinal.html?mdUrl=${encodeURIComponent(mdUrl)}`;
}

loadSyllabus();
