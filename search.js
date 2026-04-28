let allData = [];
let currentRows = [];
let currentView = "card";

fetch("articles.json")
.then(r => r.json())
.then(data => {
  allData = data;
  currentRows = data;
  updateCount(data.length + " Articles Indexed");
  show(data);
});

document.getElementById("search").addEventListener("input", function(){
  const q = this.value.toLowerCase();

  currentRows = allData.filter(a =>
    (a.Title||"").toLowerCase().includes(q) ||
    (a.Authors||"").toLowerCase().includes(q) ||
    (a.Journal||"").toLowerCase().includes(q) ||
    (a.DOI||"").toLowerCase().includes(q)
  );

  updateCount(currentRows.length + " Results Found");
  show(currentRows);
});

function updateCount(txt){
  document.getElementById("count").innerText = txt;
}

function setView(v){
  currentView = v;
  show(currentRows);
}

function show(rows){
  let html = "";

  if(currentView === "card"){
    rows.slice(0,100).forEach((a,i)=>{
      html += `
      <div class="card">
        <h3><a href="article.html?id=${i}">${a.Title||""}</a></h3>
        <p><b>Authors:</b> ${a.Authors||""}</p>
        <p><b>Journal:</b> ${a.Journal||""}</p>
        <p><b>Year:</b> ${a.Year||""}</p>
        <p><a target="_blank" href="https://doi.org/${a.DOI||""}">${a.DOI||""}</a></p>
      </div>`;
    });
  } else {

    html = `<table class="tbl">
    <tr>
      <th>Year</th>
      <th>Title</th>
      <th>Journal</th>
      <th>Authors</th>
      <th>DOI</th>
    </tr>`;

    rows.slice(0,100).forEach((a,i)=>{
      html += `
      <tr>
        <td>${a.Year||""}</td>
        <td><a href="article.html?id=${i}">${a.Title||""}</a></td>
        <td>${a.Journal||""}</td>
        <td>${a.Authors||""}</td>
        <td><a target="_blank" href="https://doi.org/${a.DOI||""}">Open</a></td>
      </tr>`;
    });

    html += `</table>`;
  }

  document.getElementById("results").innerHTML = html;
}
