const socket = io('https://your-backend-url.com');
const API = 'https://your-backend-url.com/api';

const currentQueueEl = document.getElementById('currentQueue');
const pendingCountEl = document.getElementById('pendingCount');
const tableBody = document.getElementById('queueTableBody');

function fetchData() {
  fetch(`${API}/status`).then(res => res.json()).then(data => {
    currentQueueEl.textContent = data.currentQueue;
  });

  fetch(`${API}/history?query=pending`)
    .then(res => res.json())
    .then(data => {
      pendingCountEl.textContent = data.length;
      renderTable(data);
    });
}

function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${b.queueNumber}</td>
      <td>${b.name}</td>
      <td>${b.phone}</td>
      <td>${b.bookingTime}</td>
      <td>${b.status}</td>
      <td>
        <button onclick="callQueue(${b.queueNumber})">เรียก</button>
        <button onclick="markDone(${b.queueNumber})">เสร็จแล้ว</button>
        <button onclick="cancelQueue(${b.queueNumber})">ยกเลิก</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function nextQueue() {
  fetch(`${API}/advance-queue`, { method: 'POST' }).then(fetchData);
}

function callQueue(q) {
  fetch(`${API}/advance-queue`, { method: 'POST' }).then(fetchData);
}

function skipQueue() {
  alert('ข้ามคิวยังไม่ได้ implement (ทดสอบ)');
}

function cancelQueue(q = null) {
  alert('ยกเลิกคิวยังไม่ได้ implement (ทดสอบ)');
}

function markDone(q) {
  fetch(`${API}/done/${q}`, { method: 'POST' }).then(fetchData);
}

socket.on('queueUpdate', () => {
  fetchData();
});

fetchData();