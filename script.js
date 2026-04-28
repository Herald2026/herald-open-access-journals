fetch('data.json')
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("journalContainer");

    // use correct field: "Journal"
    const journals = [...new Set(data.map(item => item.Journal))];

    console.log("Total Journals:", journals.length);

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

  });

function openJournal(journal) {
  localStorage.setItem("selectedJournal", journal);
  window.location.href = "article.html";
}
