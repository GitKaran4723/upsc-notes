async function loadSyllabus() {
  const res = await fetch("data/syllabus.json");

  console.log(res)
  const data = await res.json();
  renderUPSC(data);

  console.log(data)
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
  const res = await fetch(mdUrl);
  const mdText = await res.text();
  const container = document.getElementById("markdownContent");
  container.innerHTML = marked.parse(mdText);
  const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach(h => {
    h.style.fontSize = "revert";
    h.style.fontWeight = "revert";
  });
  if (window.MathJax) MathJax.typeset();
  document.getElementById("markdownModal").classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  document.getElementById("markdownModal").classList.remove("active");
  document.body.classList.remove("no-scroll");
}

loadSyllabus();