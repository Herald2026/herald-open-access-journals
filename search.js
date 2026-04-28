let allData = [];
let currentRows = [];
let currentView = "card";

/* =========================
   LOAD DATA
========================= */
fetch("articles.json")
  .then(r => r.json())
  .then(data => {
    allData = data || [];
    currentRows = allData;

    updateCount(`${allData.length} Articles Indexed`);
    show(allData);
  })
  .catch(err => {
    console.error("Error loading JSON:", err);
    updateCount("Error loading data");
  });

/* =========================
   SEARCH
========================= */
document.getElementById("search").addEventListener("input", function () {
  const q = (this.value || "").toLowerCase().trim();

  currentRows = allData.filter(a => {
    const title = (a.Title || "").toLowerCase();
    const authors = (a.Authors || "").toLowerCase();
    const journal = (a.Journal || "").toLowerCase();
    const doi = (a.DOI || "").toLowerCase();
    const year = String(a.Year || "");

    return (
      title.includes(q) ||
      authors.includes(q) ||
      journal.includes(q) ||
      doi.includes(q) ||
      year.includes(q)
    );
  });

  updateCount(`${currentRows.length} Results Found`);
  show(currentRows);
});

/* =========================
   COUNT DISPLAY
========================= */
function updateCount(txt) {
  document.getElementById("count").innerText = txt;
}

/* =========================
   VIEW SWITCH
========================= */
function setView(v) {
  currentView = v;
  show(currentRows);
}

/* =========================
   MAIN RENDER FUNCTION
========================= */
function show(rows) {
  if (!rows) rows = [];

  let html = "";

  const limit = 100;
  const data = rows.slice(0, limit);

  if (currentView === "card") {
    data.forEach((a) => {
      const id = a.id || a.DOI || "";

      html += `
        <div class="card">
          <h3>
            <a href="article.html?id=${encodeURIComponent(id)}">
              ${a.Title || "No Title"}
            </a>
          </h3>

          <p><b>Authors:</b> ${a.Authors || "N/A"}</p>
          <p><b>Journal:</b> ${a.Journal || "N/A"}</p>
          <p><b>Year:</b> ${a.Year || "N/A"}</p>

          ${
            a.DOI
              ? `<p>
                  <a target="_blank" href="https://doi.org/${a.DOI}">
                    ${a.DOI}
                  </a>
                </p>`
              : ""
          }
        </div>
      `;
    });
  } else {
    html = `
      <table class="tbl">
        <tr>
          <th>Year</th>
          <th>Title</th>
          <th>Journal</th>
          <th>Authors</th>
          <th>DOI</th>
        </tr>
    `;

    data.forEach((a) => {
      const id = a.id || a.DOI || "";

      html += `
        <tr>
          <td>${a.Year || ""}</td>
          <td>
            <a href="article.html?id=${encodeURIComponent(id)}">
              ${a.Title || ""}
            </a>
          </td>
          <td>${a.Journal || ""}</td>
          <td>${a.Authors || ""}</td>
          <td>
            ${
              a.DOI
                ? `<a target="_blank" href="https://doi.org/${a.DOI}">
                    Open
                  </a>`
                : ""
            }
          </td>
        </tr>
      `;
    });

    html += `</table>`;
  }

  document.getElementById("results").innerHTML = html;
}
