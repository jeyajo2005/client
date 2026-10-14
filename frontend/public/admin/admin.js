/**
 * Thirupathi ENGINEERING Admin Dashboard JavaScript
 * Complete Vanilla JS for Authentication, Navigation, Live Preview, and CRUD Operations
 */

// API Base URL
const API_BASE = '/api';

// Toast Notification Manager
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <button style="background:none; border:none; color:#94A3B8; cursor:pointer; margin-left:1rem;" onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// XSS Sanitizer Helper
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Image URL Normalizer (Ensures absolute path from root)
function normalizeImgUrl(url) {
  if (!url) return '/assets/images/drymix_packing.jpg';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
    return url;
  }
  return '/' + url;
}

// Global Auth Check
async function checkAuth(isLoginPage = false) {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });

    const data = await res.json();
    if (data.success && data.user) {
      if (isLoginPage) {
        window.location.href = '/admin/dashboard.html';
      } else {
        const userNameEl = document.getElementById('adminUserName');
        if (userNameEl) userNameEl.textContent = data.user.name || 'Managing Partner Admin';
      }
    } else {
      if (isLoginPage) {
        // stay on login
      }
    }
  } catch (err) {
    // In dev mode allow direct navigation
  }
}

// Logout handler
async function handleLogout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login.html';
  } catch (err) {
    window.location.href = '/admin/login.html';
  }
}

// Modal Handlers with Direct Inline Display
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Image File Upload Helper
async function uploadImageFile(file, previewImgEl, targetPathInput) {
  if (!file) return null;
  const formData = new FormData();
  formData.append('image', file);

  try {
    showToast('Uploading image...', 'info');
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    const data = await res.json();
    if (data.success) {
      showToast('Image uploaded successfully!', 'success');
      const finalUrl = normalizeImgUrl(data.relativePath || data.url);
      if (targetPathInput) targetPathInput.value = finalUrl;
      if (previewImgEl) previewImgEl.src = finalUrl;
      return finalUrl;
    } else {
      showToast(data.message || 'Image upload failed', 'error');
      return null;
    }
  } catch (err) {
    showToast('Upload network error: ' + err.message, 'error');
    return null;
  }
}

// Mobile Sidebar Toggle and Global Listeners
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  }

  // Add Milestone Button binding
  const addTimelineBtn = document.getElementById('addTimelineBtn');
  if (addTimelineBtn) {
    addTimelineBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openNewTimelineModal();
    });
  }

  // Close modals on clicking overlay outside container
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
});

/* ==========================================================================
   DASHBOARD OVERVIEW LOADER
   ========================================================================== */
async function loadDashboardStats() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const data = await res.json();
    if (data.success && data.stats) {
      const { totalProjects, totalTimeline, totalSkills, totalServices, totalInquiries, unreadInquiries } = data.stats;

      const pEl = document.getElementById('statTotalProjects');
      if (pEl) pEl.textContent = totalProjects || '0';

      const tEl = document.getElementById('statTotalTimeline');
      if (tEl) tEl.textContent = totalTimeline || '0';

      const sEl = document.getElementById('statTotalSkills');
      if (sEl) sEl.textContent = totalSkills || '0';

      const iEl = document.getElementById('statTotalInquiries');
      if (iEl) iEl.textContent = `${totalInquiries || 0} (${unreadInquiries || 0} New)`;
    }
  } catch (err) {
    console.error('Stats loading error:', err);
  }
}

/* ==========================================================================
   TIMELINE MANAGEMENT
   ========================================================================== */
let timelineList = [];

async function loadTimeline() {
  const tbody = document.getElementById('timelineTableBody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">Loading timeline milestones...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/timeline?admin=true`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const data = await res.json();
    if (data.success) {
      timelineList = data.data || [];
      renderTimelineTable(timelineList);
    } else {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#EF4444;">${data.message}</td></tr>`;
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#EF4444;">Error loading timeline</td></tr>`;
  }
}

function renderTimelineTable(items) {
  const tbody = document.getElementById('timelineTableBody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">No milestones found. Click "+ Add Milestone Step" above to create one.</td></tr>';
    return;
  }

  tbody.innerHTML = items.map((item, index) => {
    const step = item.stepNumber || (index + 1);
    const alignClass = item.alignment === 'right' ? 'right' : 'left';
    const imgSrc = normalizeImgUrl(item.imageUrl);
    return `
      <tr data-id="${item._id}">
        <td style="font-family:var(--font-mono); font-weight:700;">#${step}</td>
        <td>
          <img src="${imgSrc}" class="table-thumb" alt="${escapeHtml(item.title)}">
        </td>
        <td>
          <strong style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(item.title)}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(item.client || '')}</div>
        </td>
        <td>
          <span style="font-family:var(--font-mono); font-weight:700; color:${item.themeColor || '#0D9488'};">
            ${escapeHtml(item.year)}
          </span>
        </td>
        <td>
          <span class="badge-pill-align ${alignClass}">${alignClass.toUpperCase()}</span>
          <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${item.themeColor || '#0D9488'}; vertical-align:middle; margin-left:6px;" title="${item.themeClass}"></span>
        </td>
        <td>
          <span class="badge-tag ${item.status ? item.status.toLowerCase() : 'completed'}">
            ${item.isPublished ? 'PUBLISHED' : 'DRAFT'}
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button class="btn btn-secondary btn-sm" onclick="editTimelineModal('${item._id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteTimelineModal('${item._id}')">Delete</button>
            <button class="btn btn-secondary btn-sm" onclick="moveTimelineStep('${item._id}', -1)" ${index === 0 ? 'disabled' : ''}>▲</button>
            <button class="btn btn-secondary btn-sm" onclick="moveTimelineStep('${item._id}', 1)" ${index === items.length - 1 ? 'disabled' : ''}>▼</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Edit Timeline Entry Modal
function editTimelineModal(id) {
  const item = timelineList.find(t => t._id === id);
  if (!item) return;

  const modalTitle = document.getElementById('timelineModalTitle');
  if (modalTitle) modalTitle.textContent = 'Edit Milestone';

  const idEl = document.getElementById('timelineId');
  if (idEl) idEl.value = item._id;

  const stepEl = document.getElementById('timelineStepNumber');
  if (stepEl) stepEl.value = item.stepNumber || 1;

  const yearEl = document.getElementById('timelineYear');
  if (yearEl) yearEl.value = item.year || '';

  const titleEl = document.getElementById('timelineTitle');
  if (titleEl) titleEl.value = item.title || '';

  const clientEl = document.getElementById('timelineClient');
  if (clientEl) clientEl.value = item.client || '';

  const descEl = document.getElementById('timelineDesc');
  if (descEl) descEl.value = item.description || '';

  const imgPath = normalizeImgUrl(item.imageUrl);
  const imgUrlEl = document.getElementById('timelineImageUrl');
  if (imgUrlEl) imgUrlEl.value = imgPath;

  const imgPrevEl = document.getElementById('timelineImagePreview');
  if (imgPrevEl) imgPrevEl.src = imgPath;

  const alignEl = document.getElementById('timelineAlignment');
  if (alignEl) alignEl.value = item.alignment || 'left';

  const themeEl = document.getElementById('timelineThemeClass');
  if (themeEl) themeEl.value = item.themeClass || 'theme-teal';

  const colorEl = document.getElementById('timelineThemeColor');
  if (colorEl) colorEl.value = item.themeColor || '#0D9488';

  const hexEl = document.getElementById('colorHexText');
  if (hexEl) hexEl.textContent = item.themeColor || '#0D9488';

  const statusEl = document.getElementById('timelineStatus');
  if (statusEl) statusEl.value = item.status || 'COMPLETED';

  const pubEl = document.getElementById('timelinePublished');
  if (pubEl) pubEl.checked = item.isPublished !== false;

  try {
    updateSerpentinePreview();
  } catch (err) {
    console.warn(err);
  }

  openModal('timelineModal');
}

// Create New Timeline Entry Modal
function openNewTimelineModal() {
  const modalTitle = document.getElementById('timelineModalTitle');
  if (modalTitle) modalTitle.textContent = 'Add Milestone Step';

  const form = document.getElementById('timelineForm');
  if (form) form.reset();

  const idEl = document.getElementById('timelineId');
  if (idEl) idEl.value = '';

  const count = timelineList ? timelineList.length : 0;
  const nextStep = count + 1;

  const stepEl = document.getElementById('timelineStepNumber');
  if (stepEl) stepEl.value = nextStep;

  const alignEl = document.getElementById('timelineAlignment');
  if (alignEl) alignEl.value = nextStep % 2 === 1 ? 'left' : 'right';

  const colorEl = document.getElementById('timelineThemeColor');
  if (colorEl) colorEl.value = '#0D9488';

  const hexEl = document.getElementById('colorHexText');
  if (hexEl) hexEl.textContent = '#0D9488';

  const imgPath = '/assets/images/drymix_packing.jpg';
  const imgUrlEl = document.getElementById('timelineImageUrl');
  if (imgUrlEl) imgUrlEl.value = imgPath;

  const imgPrevEl = document.getElementById('timelineImagePreview');
  if (imgPrevEl) imgPrevEl.src = imgPath;

  const pubEl = document.getElementById('timelinePublished');
  if (pubEl) pubEl.checked = true;

  try {
    updateSerpentinePreview();
  } catch (err) {
    console.warn(err);
  }

  openModal('timelineModal');
}

// Update Serpentine Preview in Modal
function updateSerpentinePreview() {
  const preview = document.getElementById('timelineSerpentinePreview');
  if (!preview) return;

  const titleEl = document.getElementById('timelineTitle');
  const clientEl = document.getElementById('timelineClient');
  const yearEl = document.getElementById('timelineYear');
  const colorEl = document.getElementById('timelineThemeColor');
  const alignEl = document.getElementById('timelineAlignment');
  const imgEl = document.getElementById('timelineImageUrl');

  const title = (titleEl && titleEl.value) ? titleEl.value : 'Milestone Title';
  const client = (clientEl && clientEl.value) ? clientEl.value : 'The Ramco Cements Ltd.';
  const year = (yearEl && yearEl.value) ? yearEl.value : '2026';
  const color = (colorEl && colorEl.value) ? colorEl.value : '#0D9488';
  const align = (alignEl && alignEl.value) ? alignEl.value : 'left';
  const imgUrl = (imgEl && imgEl.value) ? normalizeImgUrl(imgEl.value) : '/assets/images/drymix_packing.jpg';

  preview.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:${align === 'left' ? 'flex-start' : 'flex-end'}; width:100%;">
      <div class="timeline-pill-preview" style="border-color:${color};">
        <img src="${imgUrl}" class="preview-thumb" alt="Preview">
        <div class="preview-text">
          <h5 style="color:#FFF;">${escapeHtml(title)}</h5>
          <span style="color:${color}; font-weight:600;">${escapeHtml(year)} · ${escapeHtml(client)}</span>
        </div>
      </div>
    </div>
  `;
}

// Save Timeline Entry (Add or Update)
async function saveTimeline(e) {
  if (e) e.preventDefault();

  const idEl = document.getElementById('timelineId');
  const id = idEl ? idEl.value : '';

  const stepNumber = parseInt(document.getElementById('timelineStepNumber').value, 10) || 1;
  const year = document.getElementById('timelineYear').value.trim() || '2026';
  const title = document.getElementById('timelineTitle').value.trim();
  const client = document.getElementById('timelineClient').value.trim() || 'The Ramco Cements Ltd.';
  const description = document.getElementById('timelineDesc').value.trim();
  const imageUrl = document.getElementById('timelineImageUrl').value.trim() || '/assets/images/drymix_packing.jpg';
  const alignment = document.getElementById('timelineAlignment').value || 'left';
  const themeClass = document.getElementById('timelineThemeClass').value || 'theme-teal';
  const themeColor = document.getElementById('timelineThemeColor').value || '#0D9488';
  const status = document.getElementById('timelineStatus').value || 'COMPLETED';
  const isPublished = document.getElementById('timelinePublished').checked;

  if (!title) {
    showToast('Please enter the project milestone title.', 'error');
    return;
  }
  if (!description) {
    showToast('Please enter the narrative description.', 'error');
    return;
  }

  const payload = {
    stepNumber,
    year,
    title,
    client,
    description,
    imageUrl: normalizeImgUrl(imageUrl),
    alignment,
    themeClass,
    themeColor,
    status,
    isPublished
  };

  const url = id ? `${API_BASE}/timeline/${id}` : `${API_BASE}/timeline`;
  const method = id ? 'PUT' : 'POST';

  try {
    showToast('Saving milestone...', 'info');
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Milestone saved successfully!', 'success');
      closeModal('timelineModal');
      await loadTimeline();
    } else {
      showToast(data.message || 'Error saving milestone', 'error');
    }
  } catch (err) {
    showToast('Network error: ' + err.message, 'error');
  }
}

// Delete Timeline Entry
async function deleteTimelineModal(id) {
  if (!confirm('Are you sure you want to delete this timeline milestone?')) return;

  try {
    const res = await fetch(`${API_BASE}/timeline/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
      showToast('Milestone deleted successfully', 'success');
      loadTimeline();
    } else {
      showToast(data.message || 'Failed to delete', 'error');
    }
  } catch (err) {
    showToast('Network error: ' + err.message, 'error');
  }
}

// Move Timeline Step (Reorder)
async function moveTimelineStep(id, direction) {
  const index = timelineList.findIndex(t => t._id === id);
  if (index < 0) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= timelineList.length) return;

  const itemA = timelineList[index];
  const itemB = timelineList[targetIndex];

  const newItems = [...timelineList];
  newItems[index] = itemB;
  newItems[targetIndex] = itemA;

  const payload = newItems.map((item, idx) => ({
    id: item._id,
    order: idx + 1,
    stepNumber: idx + 1,
    alignment: (idx + 1) % 2 === 1 ? 'left' : 'right'
  }));

  try {
    const res = await fetch(`${API_BASE}/timeline/reorder`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ items: payload })
    });
    const data = await res.json();
    if (data.success) {
      showToast('Timeline reordered', 'success');
      loadTimeline();
    }
  } catch (err) {
    showToast('Failed to reorder: ' + err.message, 'error');
  }
}

/* ==========================================================================
   PROJECTS MANAGEMENT
   ========================================================================== */
let projectList = [];

async function loadProjects() {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem;">Loading projects...</td></tr>';

  try {
    const res = await fetch(`${API_BASE}/projects?admin=true`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    const data = await res.json();
    if (data.success) {
      projectList = data.data || [];
      renderProjectsTable(projectList);
    } else {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#EF4444;">${data.message}</td></tr>`;
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#EF4444;">Error loading projects</td></tr>`;
  }
}

function renderProjectsTable(items) {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem;">No projects found. Click "Add Project" to create one.</td></tr>';
    return;
  }

  tbody.innerHTML = items.map((p) => {
    const imgSrc = normalizeImgUrl(p.mainImage);
    return `
      <tr>
        <td>
          <img src="${imgSrc}" class="table-thumb" alt="${escapeHtml(p.title)}">
        </td>
        <td>
          <strong style="color:var(--text-main); font-size:0.92rem;">${escapeHtml(p.title)}</strong>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(p.client || '')} · ${escapeHtml(p.location || '')}</div>
        </td>
        <td>
          <span class="badge-tag" style="background:rgba(255,255,255,0.08);">${escapeHtml(p.category)}</span>
        </td>
        <td style="font-family:var(--font-mono);">${escapeHtml(p.year || '2025')}</td>
        <td>
          <span class="badge-tag ${p.status ? p.status.toLowerCase() : 'completed'}">${p.status || 'COMPLETED'}</span>
        </td>
        <td>
          <div class="action-btns">
            <button class="btn btn-secondary btn-sm" onclick="editProjectModal('${p._id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProject('${p._id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openNewProjectModal() {
  document.getElementById('projectModalTitle').textContent = 'Add Showcase Project';
  document.getElementById('projectForm').reset();
  document.getElementById('projectId').value = '';
  document.getElementById('projectMainImage').value = '/assets/images/drymix_packing.jpg';
  document.getElementById('projectImagePreview').src = '/assets/images/drymix_packing.jpg';
  document.getElementById('projectPublished').checked = true;
  openModal('projectModal');
}

function editProjectModal(id) {
  const p = projectList.find(x => x._id === id);
  if (!p) return;

  document.getElementById('projectModalTitle').textContent = 'Edit Project';
  document.getElementById('projectId').value = p._id;
  document.getElementById('projectTitle').value = p.title || '';
  document.getElementById('projectCategory').value = p.category || '';
  document.getElementById('projectClient').value = p.client || '';
  document.getElementById('projectLocation').value = p.location || '';
  document.getElementById('projectYear').value = p.year || '';
  document.getElementById('projectCapacity').value = p.capacity || '';
  document.getElementById('projectDesc').value = p.description || '';
  document.getElementById('projectScope').value = Array.isArray(p.scope) ? p.scope.join('\n') : '';
  const imgSrc = normalizeImgUrl(p.mainImage);
  document.getElementById('projectMainImage').value = imgSrc;
  document.getElementById('projectImagePreview').src = imgSrc;
  document.getElementById('projectStatus').value = p.status || 'COMPLETED';
  document.getElementById('projectPublished').checked = p.isPublished !== false;
  openModal('projectModal');
}

async function saveProject(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('projectId').value;
  const scopeRaw = document.getElementById('projectScope').value;
  const scopeArray = scopeRaw.split('\n').map(s => s.trim()).filter(Boolean);

  const payload = {
    title: document.getElementById('projectTitle').value.trim(),
    category: document.getElementById('projectCategory').value.trim(),
    client: document.getElementById('projectClient').value.trim(),
    location: document.getElementById('projectLocation').value.trim(),
    year: document.getElementById('projectYear').value.trim(),
    capacity: document.getElementById('projectCapacity').value.trim(),
    description: document.getElementById('projectDesc').value.trim(),
    scope: scopeArray,
    mainImage: normalizeImgUrl(document.getElementById('projectMainImage').value.trim()),
    status: document.getElementById('projectStatus').value,
    isPublished: document.getElementById('projectPublished').checked
  };

  const url = id ? `${API_BASE}/projects/${id}` : `${API_BASE}/projects`;
  const method = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      showToast(data.message || 'Project saved', 'success');
      closeModal('projectModal');
      loadProjects();
    } else {
      showToast(data.message || 'Error saving project', 'error');
    }
  } catch (err) {
    showToast('Network error: ' + err.message, 'error');
  }
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    if (data.success) {
      showToast('Project deleted', 'success');
      loadProjects();
    } else {
      showToast(data.message || 'Failed to delete', 'error');
    }
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}
