fetch('data.json')
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("journalContainer");

    // extract unique journals
    const journals = [...new Set(data.map(item => item.journal))];

    console.log("Total Journals Loaded:", journals.length);

    journals.forEach(journal => {

      const card = document.createElement("div");
      card.className = "journal-card";

      card.innerHTML = `
        <h3>${journal}</h3>
        <button onclick="openJournal('${journal}')">
          🔍 View Articles
        </button>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.error("Error loading data:", err));

function openJournal(journal) {
  localStorage.setItem("selectedJournal", journal);
  window.location.href = "article.html";
}
