const API = 'http://localhost:3000';
let token = '';
const $ = (id) => document.getElementById(id);

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
function message(text, good = true) {
  $('notice').innerHTML = `<div class="alert alert-${good ? 'success' : 'danger'}">${text}</div>`;
}
function rows(items, columns, actionPath) {
  return items.map(item => `<tr>${columns.map(c => `<td>${String(c(item) ?? '').replaceAll('<','&lt;')}</td>`).join('')}
    <td><button class="btn btn-sm btn-outline-danger" data-delete="${actionPath}/${item.id}">Delete</button></td></tr>`).join('');
}
async function loadAll() {
  try {
    const [patients, doctors, appointments] = await Promise.all([
      request('/patients'), request('/doctors'), request('/appointments')
    ]);
    $('patientCount').textContent = patients.length;
    $('doctorCount').textContent = doctors.length;
    $('appointmentCount').textContent = appointments.length;
    $('patientsTable').innerHTML = rows(patients, [x=>x.id,x=>x.name,x=>x.email,x=>x.phone,x=>x.age], '/patients');
    $('doctorsTable').innerHTML = rows(doctors, [x=>x.id,x=>x.name,x=>x.specialization,x=>x.email,x=>x.phone], '/doctors');
    $('appointmentsTable').innerHTML = rows(appointments, [x=>x.id,x=>x.patient?.name,x=>x.doctor?.name,x=>new Date(x.appointmentDate).toLocaleString(),x=>x.status], '/appointments');
  } catch (e) { message(e.message, false); }
}
$('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const result = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email: $('email').value, password: $('password').value }) });
    token = result.access_token;
    $('loginCard').classList.add('d-none'); $('dashboard').classList.remove('d-none'); $('logoutBtn').classList.remove('d-none');
    await loadAll();
  } catch (e) { $('loginMsg').textContent = e.message; }
});
async function submitForm(formId, path, convert = x => x) {
  $(formId).addEventListener('submit', async event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    try {
      await request(path, { method: 'POST', body: JSON.stringify(convert(data)) });
      event.target.reset(); message('Record saved successfully.'); await loadAll();
    } catch (e) { message(e.message, false); }
  });
}
submitForm('patientForm', '/patients', d => ({...d, age: Number(d.age)}));
submitForm('doctorForm', '/doctors');
submitForm('appointmentForm', '/appointments', d => ({...d, patientId: Number(d.patientId), doctorId: Number(d.doctorId), appointmentDate: new Date(d.appointmentDate).toISOString()}));
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-delete]');
  if (!button) return;
  if (!confirm('Delete this record?')) return;
  try { await request(button.dataset.delete, {method:'DELETE'}); message('Record deleted.'); await loadAll(); }
  catch (e) { message(e.message, false); }
});
$('logoutBtn').addEventListener('click', () => {
  token = ''; $('dashboard').classList.add('d-none'); $('loginCard').classList.remove('d-none'); $('logoutBtn').classList.add('d-none');
});
