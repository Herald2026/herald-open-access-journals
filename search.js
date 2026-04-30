let allData = [];
let currentRows = [];
let currentView = "card";

fetch("articles.json")
  .then(r => r.json())
  .then(data => {
    allData = data || [];
    currentRows = allData;
    updateCount(allData.length + " Articles");
    show(allData);
  });

document.getElementById("search").addEventListener("input", function () {

  const q = this.value.toLowerCase();

  currentRows = allData.filter(a =>
    (a.Title || "").toLowerCase().includes(q) ||
    (a.Authors || "").toLowerCase().includes(q) ||
    (a.Journal || "").toLowerCase().includes(q) ||
    (a.DOI || "").toLowerCase().includes(q) ||
    String(a.Year || "").includes(q)
  );

  updateCount(currentRows.length + " Results");
  show(currentRows);
});

function updateCount(t){
  const el = document.getElementById("count");
  if(el) el.innerText = t;
}

function getId(a){
  return (a.DOI || "").split("/").pop();
}

function show(rows){

  const data = rows.slice(0, 100);
  let html = "";

  data.forEach(a => {

    const id = getId(a);

    html += `
      <div class="card">
        <h3>
          <a href="article.html?id=${id}">
            ${a.Title}
          </a>
        </h3>

        <p>${a.Authors}</p>
        <p>${a.Journal}</p>
        <p>${a.Year}</p>
      </div>
    `;
  });

  document.getElementById("results").innerHTML = html;
}
