// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("auth", "true");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("error").innerText = "Invalid Login";
  }
}

// CHECK LOGIN
function checkAuth() {
  if (localStorage.getItem("auth") !== "true") {
    window.location.href = "login.html";
  }
}

// LOGOUT
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}

// GET LEADS
function getLeads() {
  return JSON.parse(localStorage.getItem("leads")) || [];
}

// SAVE LEADS
function saveLeads(leads) {
  localStorage.setItem("leads", JSON.stringify(leads));
}

// ADD LEAD
function addLead() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let status = document.getElementById("status").value;
  let notes = document.getElementById("notes").value;

  let leads = getLeads();
  leads.push({ name, email, status, notes });

  saveLeads(leads);
  loadLeads();
  updateStats();
}

// LOAD LEADS
function loadLeads() {
  let leads = getLeads();
  let table = document.getElementById("leadTable");
  table.innerHTML = "";

  leads.forEach((lead, index) => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
        <td>${lead.notes}</td>
        <td>
          <button onclick="editLead(${index})">Edit</button>
          <button onclick="deleteLead(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// DELETE
function deleteLead(index) {
  let leads = getLeads();
  leads.splice(index, 1);
  saveLeads(leads);
  loadLeads();
  updateStats();
}

// EDIT
function editLead(index) {
  let leads = getLeads();
  let lead = leads[index];

  document.getElementById("name").value = lead.name;
  document.getElementById("email").value = lead.email;
  document.getElementById("status").value = lead.status;
  document.getElementById("notes").value = lead.notes;

  deleteLead(index);
}

// SEARCH
function searchLeads() {
  let query = document.getElementById("search").value.toLowerCase();
  let leads = getLeads();

  let filtered = leads.filter(l =>
    l.name.toLowerCase().includes(query) ||
    l.email.toLowerCase().includes(query)
  );

  let table = document.getElementById("leadTable");
  table.innerHTML = "";

  filtered.forEach((lead, index) => {
    table.innerHTML += `
      <tr>
        <td>${lead.name}</td>
        <td>${lead.email}</td>
        <td>${lead.status}</td>
        <td>${lead.notes}</td>
      </tr>
    `;
  });
}

// STATS
function updateStats() {
  let leads = getLeads();

  document.getElementById("total").innerText = leads.length;
  document.getElementById("new").innerText = leads.filter(l => l.status === "New").length;
  document.getElementById("contacted").innerText = leads.filter(l => l.status === "Contacted").length;
  document.getElementById("converted").innerText = leads.filter(l => l.status === "Converted").length;
}
