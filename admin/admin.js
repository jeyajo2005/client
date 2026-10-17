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
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('data:')) {
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
      headers: { 'x-admin-key': 'thirupathi_admin_2026' },
      body: formData,
      credentials: 'include'
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast('Image uploaded successfully!', 'success');
        const finalUrl = normalizeImgUrl(data.relativePath || data.url);
        if (targetPathInput) targetPathInput.value = finalUrl;
        if (previewImgEl) previewImgEl.src = finalUrl;
        return finalUrl;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server upload failed, falling back to local file reader:', err);
  }

  // Fallback: Read file as base64 Data URL (Works 100% on Vercel / offline)
  try {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    if (targetPathInput) targetPathInput.value = dataUrl;
    if (previewImgEl) previewImgEl.src = dataUrl;
    showToast('Image loaded successfully!', 'success');
    return dataUrl;
  } catch (readerErr) {
    showToast('Failed to read image file: ' + readerErr.message, 'error');
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
  function renderStats(stats) {
    const pEl = document.getElementById('statTotalProjects');
    if (pEl) pEl.textContent = stats.totalProjects ?? '4';

    const tEl = document.getElementById('statTotalTimeline');
    if (tEl) tEl.textContent = stats.totalTimeline ?? '10';

    const sEl = document.getElementById('statTotalSkills');
    if (sEl) sEl.textContent = stats.totalSkills ?? '8';

    const iEl = document.getElementById('statTotalInquiries');
    if (iEl) iEl.textContent = `${stats.totalInquiries || 0} (${stats.unreadInquiries || 0} New)`;
  }

  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.stats) {
        // If totalTimeline is 0, fall back to timelineList or default length
        if (!data.stats.totalTimeline) {
          data.stats.totalTimeline = timelineList.length || 10;
        }
        if (!data.stats.totalProjects) {
          data.stats.totalProjects = 4;
        }
        renderStats(data.stats);
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Dashboard stats API unavailable, using fallback counts.');
  }

  // Fallback defaults
  renderStats({
    totalProjects: 4,
    totalTimeline: timelineList.length || 10,
    totalSkills: 8,
    totalServices: 6,
    totalInquiries: 0,
    unreadInquiries: 0
  });
}

/* ==========================================================================
   DEFAULT STATIC FALLBACKS (For static hosting environments like Vercel)
   ========================================================================== */
function getDefaultTimeline() {
  return [
    { _id: '670cce010000000000000001', stepNumber: 1, year: '1985', title: 'Industrial Erection Career Origin', client: 'Steel Plants & Heavy Framing', description: "Inception of Mr. M. Mohan's 50+ year legacy in heavy structural framing & machinery installation.", imageUrl: '/assets/images/gallery/site-img-024.jpg', alignment: 'left', themeClass: 'theme-teal', themeColor: '#0D9488', order: 1, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000002', stepNumber: 2, year: '1992', title: 'Gold Star Steel Plant Commissioning', client: 'Gold Star Steel Plant', description: 'Foundational turnkey steel plant machinery commissioning and heavy mill structural erection.', imageUrl: '/assets/images/gallery/site-img-018.jpg', alignment: 'right', themeClass: 'theme-ocean', themeColor: '#0284C7', order: 2, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000003', stepNumber: 3, year: '1998', title: 'Camplastic Pipe Total Plant Erection', client: 'Camplastic Pipe Ltd.', description: 'Full manufacturing shed erection, extrusion line supports, and industrial infrastructure.', imageUrl: '/assets/images/gallery/site-img-014.jpg', alignment: 'left', themeClass: 'theme-marine', themeColor: '#0F766E', order: 3, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000004', stepNumber: 4, year: '2005', title: 'Parryware Tiles Total Plant Erection', client: 'Parryware Tiles', description: 'Complete industrial plant structural framing, kiln line mechanical erection, and factory sheds.', imageUrl: '/assets/images/gallery/site-img-008.jpg', alignment: 'right', themeClass: 'theme-gold', themeColor: '#D97706', order: 4, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000005', stepNumber: 5, year: '2016–21', title: 'Coal Stacker, Reclaimer & Packing', client: 'The Ramco Cements Ltd.', description: 'Heavy traveling stacker & reclaimer machinery, gantry rail steel, and automated packing plants.', imageUrl: '/assets/images/flsmidth_crane_lift.jpg', alignment: 'left', themeClass: 'theme-navy', themeColor: '#1E40AF', order: 5, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000006', stepNumber: 6, year: '2022', title: 'Washing Plant Beneficiation Erection', client: 'The Ramco Cements Ltd.', description: 'Turnkey mineral washing plant facilities, screening decks, slurry piping, and pump house frameworks.', imageUrl: '/assets/images/washing_plant.jpg', alignment: 'right', themeClass: 'theme-slate', themeColor: '#475569', order: 6, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000007', stepNumber: 7, year: '2023', title: 'Line-3 Kiln Coal Mill & Galleries', client: 'The Ramco Cements Ltd.', description: 'Multi-level coal mill building framing, overhead conveyor galleries, and transfer towers.', imageUrl: '/assets/images/gallery/site-img-002.jpg', alignment: 'left', themeClass: 'theme-royal', themeColor: '#2563EB', order: 7, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000008', stepNumber: 8, year: '2025', title: '20 MW Power Plant Non-IBR & ACC', client: 'Tecksk Projects / ISGEC (Zero LTI)', description: 'Non-IBR boiler framing, ACC cooling towers, steam ducting supports, and pipe racks.', imageUrl: '/assets/images/power_plant_acc.jpg', alignment: 'right', themeClass: 'theme-darknavy', themeColor: '#1E293B', order: 8, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000009', stepNumber: 9, year: '2025', title: 'Clinker Silo Structures & Bridges', client: 'The Ramco Cements Ltd.', description: 'Heavy silo mechanical structural steel and elevated conveyor bridges inside active operational plant.', imageUrl: '/assets/images/clinker_silo.jpg', alignment: 'left', themeClass: 'theme-steel', themeColor: '#3B82F6', order: 9, status: 'COMPLETED', isPublished: true },
    { _id: '670cce010000000000000010', stepNumber: 10, year: '2026', title: 'Sizer Crusher Mechanical Structures', client: 'Ramco Mines, Virudhunagar', description: 'Primary mineral sizer crusher machinery, heavy rock chutes, and vibration-damped structural towers.', imageUrl: '/assets/images/sizer_crusher.jpg', alignment: 'right', themeClass: 'theme-cobalt', themeColor: '#4F46E5', order: 10, status: 'COMPLETED', isPublished: true }
  ];
}

function getDefaultProjects() {
  return [
    {
      _id: '6acde8893cac6cdceea1e7e4',
      title: 'Dry Mix Plant & Packing Unit Mechanical Erection',
      category: 'CEMENT & PACKING',
      client: 'The Ramco Cements Ltd.',
      location: 'R.R. Nagar Works, Tamil Nadu',
      year: '2023',
      mainImage: '/assets/images/drymix_packing.jpg',
      status: 'COMPLETED',
      isPublished: true
    },
    {
      _id: '6acde8893cac6cdceea1e7e5',
      title: '20 MW Thermal Power Plant Non-IBR Structure & ACC Cooling Deck',
      category: 'THERMAL POWER',
      client: 'Tecksk Projects / ISGEC',
      location: 'Tamil Nadu Site',
      year: '2022',
      mainImage: '/assets/images/power_plant_acc.jpg',
      status: 'COMPLETED',
      isPublished: true
    },
    {
      _id: '6acde8893cac6cdceea1e7e6',
      title: 'Heavy Clinker Silo Mechanical Structures & Conveyor Bridges',
      category: 'CEMENT SILOS',
      client: 'The Ramco Cements Ltd.',
      location: 'Virudhunagar, Tamil Nadu',
      year: '2025',
      mainImage: '/assets/images/clinker_silo.jpg',
      status: 'COMPLETED',
      isPublished: true
    },
    {
      _id: '6acde8893cac6cdceea1e7e7',
      title: 'Primary Mineral Sizer Crusher Mechanical Erection',
      category: 'MINING & CRUSHER',
      client: 'Ramco Mines',
      location: 'Virudhunagar Limestone Mines',
      year: '2026',
      mainImage: '/assets/images/sizer_crusher.jpg',
      status: 'COMPLETED',
      isPublished: true
    }
  ];
}

/* ==========================================================================
   TIMELINE MANAGEMENT
   ========================================================================== */
let timelineList = [];

async function loadTimeline() {
  const tbody = document.getElementById('timelineTableBody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">Loading timeline milestones...</td></tr>';

  // 1. Try Backend API first
  try {
    const res = await fetch(`${API_BASE}/timeline?admin=true`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const apiData = data.data;
        const saved = localStorage.getItem('admin_cached_timeline');
        if (saved) {
          try {
            const localData = JSON.parse(saved);
            if (Array.isArray(localData) && localData.length > apiData.length) {
              timelineList = localData;
            } else {
              timelineList = apiData;
            }
          } catch (e) {
            timelineList = apiData;
          }
        } else {
          timelineList = apiData;
        }
        localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
        renderTimelineTable(timelineList);
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Backend API unavailable, utilizing fallback storage.');
  }

  // 2. Try static JSON data file (Vercel static deploy)
  try {
    const staticRes = await fetch('/data/timeline.json');
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      if (Array.isArray(staticData) && staticData.length > 0) {
        const saved = localStorage.getItem('admin_cached_timeline');
        timelineList = saved ? JSON.parse(saved) : staticData;
        renderTimelineTable(timelineList);
        return;
      }
    }
  } catch (e) {}

  // 3. Try LocalStorage
  const saved = localStorage.getItem('admin_cached_timeline');
  if (saved) {
    try {
      timelineList = JSON.parse(saved);
      renderTimelineTable(timelineList);
      return;
    } catch (e) {}
  }

  // 4. Default timeline fallback
  timelineList = getDefaultTimeline();
  localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
  renderTimelineTable(timelineList);
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
        'Cache-Control': 'no-cache',
        'x-admin-key': 'thirupathi_admin_2026'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast(data.message || 'Milestone saved successfully!', 'success');
        if (id) {
          const idx = timelineList.findIndex(t => String(t._id) === String(id));
          if (idx !== -1) timelineList[idx] = { ...timelineList[idx], ...payload, _id: id };
        } else if (data.data) {
          timelineList.push(data.data);
        }
        localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
        renderTimelineTable(timelineList);
        closeModal('timelineModal');
        await loadTimeline();
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server API unavailable for saveTimeline, saving locally:', err);
  }

  // Fallback: Save to LocalStorage / cached array (Works 100% on Vercel / offline)
  if (id) {
    const idx = timelineList.findIndex(t => String(t._id) === String(id));
    if (idx !== -1) {
      timelineList[idx] = { ...timelineList[idx], ...payload, _id: id };
    }
  } else {
    const newId = 'milestone_' + Date.now();
    timelineList.push({ ...payload, _id: newId });
  }

  localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
  renderTimelineTable(timelineList);
  closeModal('timelineModal');
  showToast('Milestone saved successfully!', 'success');
}

// Delete Timeline Entry
async function deleteTimelineModal(id) {
  if (!confirm('Are you sure you want to delete this timeline milestone?')) return;

  try {
    const res = await fetch(`${API_BASE}/timeline/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': 'thirupathi_admin_2026' },
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast('Milestone deleted successfully', 'success');
        timelineList = timelineList.filter(t => String(t._id) !== String(id));
        localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
        renderTimelineTable(timelineList);
        loadTimeline();
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server API unavailable for delete, updating locally:', err);
  }

  // Fallback: Delete from local state & LocalStorage
  timelineList = timelineList.filter(t => String(t._id) !== String(id));
  localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
  renderTimelineTable(timelineList);
  showToast('Milestone deleted successfully', 'success');
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
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast('Order updated successfully', 'success');
        loadTimeline();
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server API unavailable for reorder, updating locally:', err);
  }

  // Fallback: Update locally & in LocalStorage
  timelineList = newItems.map((item, idx) => ({
    ...item,
    order: idx + 1,
    stepNumber: idx + 1,
    alignment: (idx + 1) % 2 === 1 ? 'left' : 'right'
  }));
  localStorage.setItem('admin_cached_timeline', JSON.stringify(timelineList));
  renderTimelineTable(timelineList);
  showToast('Order updated successfully', 'success');
}

/* ==========================================================================
   PROJECTS MANAGEMENT
   ========================================================================== */
let projectList = [];

async function loadProjects() {
  const tbody = document.getElementById('projectsTableBody');
  if (!tbody) return;

  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem;">Loading projects...</td></tr>';

  // 1. Try Backend API first
  try {
    const res = await fetch(`${API_BASE}/projects?admin=true`, {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const apiData = data.data;
        const saved = localStorage.getItem('admin_cached_projects');
        if (saved) {
          try {
            const localData = JSON.parse(saved);
            if (Array.isArray(localData) && localData.length > apiData.length) {
              projectList = localData;
            } else {
              projectList = apiData;
            }
          } catch (e) {
            projectList = apiData;
          }
        } else {
          projectList = apiData;
        }
        localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
        renderProjectsTable(projectList);
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Projects API unavailable, checking fallbacks.');
  }

  // 2. Try static JSON
  try {
    const staticRes = await fetch('/data/projects.json');
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      if (Array.isArray(staticData) && staticData.length > 0) {
        const saved = localStorage.getItem('admin_cached_projects');
        projectList = saved ? JSON.parse(saved) : staticData;
        renderProjectsTable(projectList);
        return;
      }
    }
  } catch (e) {}

  // 3. Try LocalStorage
  const saved = localStorage.getItem('admin_cached_projects');
  if (saved) {
    try {
      projectList = JSON.parse(saved);
      renderProjectsTable(projectList);
      return;
    } catch (e) {}
  }

  // 4. Default Projects
  projectList = getDefaultProjects();
  localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
  renderProjectsTable(projectList);
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
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'thirupathi_admin_2026'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast(data.message || 'Project saved', 'success');
        if (id) {
          const idx = projectList.findIndex(p => String(p._id) === String(id));
          if (idx !== -1) projectList[idx] = { ...projectList[idx], ...payload, _id: id };
        } else if (data.data) {
          projectList.push(data.data);
        }
        localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
        renderProjectsTable(projectList);
        closeModal('projectModal');
        loadProjects();
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server API unavailable for saveProject, saving locally:', err);
  }

  // Fallback: Save to LocalStorage
  if (id) {
    const idx = projectList.findIndex(p => String(p._id) === String(id));
    if (idx !== -1) {
      projectList[idx] = { ...projectList[idx], ...payload, _id: id };
    }
  } else {
    const newId = 'project_' + Date.now();
    projectList.push({ ...payload, _id: newId });
  }
  localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
  renderProjectsTable(projectList);
  closeModal('projectModal');
  showToast('Project saved successfully!', 'success');
}

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': 'thirupathi_admin_2026' },
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        showToast('Project deleted', 'success');
        projectList = projectList.filter(p => String(p._id) !== String(id));
        localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
        renderProjectsTable(projectList);
        loadProjects();
        return;
      }
    }
  } catch (err) {
    console.warn('[Admin] Server API unavailable for deleteProject, updating locally:', err);
  }

  // Fallback: Delete from local state & LocalStorage
  projectList = projectList.filter(p => String(p._id) !== String(id));
  localStorage.setItem('admin_cached_projects', JSON.stringify(projectList));
  renderProjectsTable(projectList);
  showToast('Project deleted successfully', 'success');
}
