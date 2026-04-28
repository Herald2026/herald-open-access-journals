fetch('journals.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("journalContainer");

    data.forEach(journal => {
      const card = document.createElement("div");
      card.className = "journal-card";

      card.innerHTML = `
        <h3>${journal.name}</h3>
        <button onclick="openJournal('${journal.name}')">
          🔍 View Articles
        </button>
      `;

      container.appendChild(card);
    });
  });

function openJournal(name) {
  localStorage.setItem("selectedJournal", name);
  window.location.href = "articles.html";
}
