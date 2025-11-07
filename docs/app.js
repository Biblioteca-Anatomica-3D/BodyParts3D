// app.js

// Base URL para los archivos STL
const BASE_URL = "https://github.com/Biblioteca-Anatomica-3D/BodyParts3D/blob/main/assets/BodyParts3D_data/stl/";

// Carga los archivos de texto y genera la tabla
async function loadData() {
  const partsResponse = await fetch("parts_list_e.txt");
  const partsText = await partsResponse.text();

  const filesResponse = await fetch("file_list.txt");
  const filesText = await filesResponse.text();
  const availableFiles = new Set(filesText.split("\n").map(line => line.trim()).filter(line => line));

  // Parsear parts_list_e.txt
  const rows = partsText.split("\n").slice(1).filter(line => line.trim());
  const parts = rows.map(line => {
    const [id, term] = line.split(/\t/);
    const fileName = `${id}.stl`;
    const hasFile = availableFiles.has(fileName);
    const url = hasFile ? `${BASE_URL}${fileName}` : "";
    return { id, term, url };
  });

  renderTable(parts);

  // Buscar por ID o término
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = parts.filter(p =>
      p.id.toLowerCase().includes(query) || p.term.toLowerCase().includes(query)
    );
    renderTable(filtered);
  });
}

// Función para renderizar la tabla
function renderTable(data) {
  const tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  data.forEach(part => {
    const tr = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = part.id;
    tr.appendChild(idCell);

    const termCell = document.createElement("td");
    termCell.textContent = part.term;
    tr.appendChild(termCell);

    const linkCell = document.createElement("td");
    if (part.url) {
      const a = document.createElement("a");
      a.href = part.url;
      a.textContent = "View STL";
      a.target = "_blank";
      linkCell.appendChild(a);
    } else {
      linkCell.textContent = "";
    }
    tr.appendChild(linkCell);

    tbody.appendChild(tr);
  });
}

loadData();
