let allData = [];

fetch("articles.json")
.then(r => r.json())
.then(data => {
  allData = data;
  document.getElementById("count").innerText =
    data.length + " Articles Indexed";
  show(data);
});

document.getElementById("search").addEventListener("input", function(){
  const q = this.value.toLowerCase();

  const filtered = allData.filter((a,i)=>
    (a.Title||"").toLowerCase().includes(q) ||
    (a.Authors||"").toLowerCase().includes(q) ||
    (a.Journal||"").toLowerCase().includes(q) ||
    (a.DOI||"").toLowerCase().includes(q)
  );

  document.getElementById("count").innerText =
    filtered.length + " Results Found";

  show(filtered);
});

function show(rows){
  let html = "";

  rows.slice(0,100).forEach((a,i)=>{
    html += `
    <div class="card">
      <h3>${a.Title||""}</h3>
      <p><b>Authors:</b> ${a.Authors||""}</p>
      <p><b>Journal:</b> ${a.Journal||""}</p>
      <p><b>Year:</b> ${a.Year||""}</p>
      <a class="btn" href="article.html?id=${i}">Open Record</a>
    </div>`;
  });

  document.getElementById("results").innerHTML = html;
}
