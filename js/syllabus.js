async function loadSyllabus() {
  const res = await fetch("data/syllabus.json");
  const data = await res.json();
  renderSyllabus(data.papers);
}

function renderSyllabus(papers) {
  const container = document.getElementById("syllabus-root");
  container.innerHTML = "";

  papers.forEach((paper) => {
    const paperDetails = document.createElement("details");
    paperDetails.innerHTML = `<summary>${paper.name}</summary>`;
    const unitList = document.createElement("div");

    paper.units.forEach((unit) => {
      const unitDetails = document.createElement("details");
      unitDetails.innerHTML = `<summary>${unit.name}</summary>`;
      const chapterList = document.createElement("div");

      unit.chapters.forEach((chap) => {
        const chapDetails = document.createElement("details");
        chapDetails.innerHTML = `<summary>${chap.name}</summary>`;
        const conceptList = document.createElement("ul");

        chap.concepts.forEach((con) => {
          const li = document.createElement("li");
          li.className = "ml-6 mb-1";
          const a = document.createElement("a");
          a.href = "#";
          a.textContent = "🔹 " + con.name;
          a.className = "text-blue-700 hover:underline";
          a.addEventListener('click', (e) => {
            e.preventDefault(); // 👈 Prevent scrolling to top
            openConcept(con.markdown_url);
          });
          
          li.appendChild(a);
          conceptList.appendChild(li);
        });

        chapDetails.appendChild(conceptList);
        chapterList.appendChild(chapDetails);
      });

      unitDetails.appendChild(chapterList);
      unitList.appendChild(unitDetails);
    });

    paperDetails.appendChild(unitList);
    container.appendChild(paperDetails);
  });
}

async function openConcept(mdUrl) {

  console.log("URL Requested", mdUrl);

  const res = await fetch(mdUrl);
  const mdText = await res.text();

  const container = document.getElementById("markdownContent");
  container.innerHTML = marked.parse(mdText); // Markdown to HTML

  // Fix font overrides
  const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach(h => {
    h.style.fontSize = "revert";
    h.style.fontWeight = "revert";
  });

  // Render Math
  if (window.MathJax) MathJax.typeset();

  // Show modal and lock background
  document.getElementById("markdownModal").classList.add("active");
  document.body.classList.add("no-scroll");
}



function closeModal() {
  document.getElementById("markdownModal").classList.remove("active");
  document.body.classList.remove("no-scroll");
}

loadSyllabus();
