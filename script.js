fetch('data.json?nocache=' + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("journalContainer");

    // STEP 1: count articles per journal
    const journalCount = {};

    data.forEach(item => {
      const j = item.Journal;
      journalCount[j] = (journalCount[j] || 0) + 1;
    });

    // STEP 2: convert to array for sorting
    const sortedJournals = Object.entries(journalCount)
      .sort((a, b) => b[1] - a[1]); // DESC order

    console.log("Ranked Journals:", sortedJournals);

    // STEP 3: display
    sortedJournals.forEach(([journal, count]) => {

      const card = document.createElement("div");
      card.className = "journal-card";

      card.innerHTML = `
        <h3>${journal}</h3>
        <p><b>Articles:</b> ${count}</p>
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
