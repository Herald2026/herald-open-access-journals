fetch('journals.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("journalContainer");

    data.forEach(journal => {
      const card = document.createElement("div");
      card.className = "journal-card";

      card.innerHTML = `
        <h3>${journal.name}</h3>
        <button onclick="alert('Articles feature coming soon')">
          🔍 Search Articles
        </button>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading journals:", error);
  });
