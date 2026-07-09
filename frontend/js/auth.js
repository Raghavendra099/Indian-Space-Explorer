/**
 * auth.js — Auth helper for Indian Space Explorer
 * Centralizes auth link behavior and user session helpers.
 */

const getAuthLink = () => document.querySelector('.auth-link');
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null;
  } catch {
    return null;
  }
};

const isLoggedIn = () => Boolean(localStorage.getItem('token'));

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const clearAuthLinkListeners = (link) => {
  const clone = link.cloneNode(true);
  link.parentNode.replaceChild(clone, link);
  return clone;
};

const updateAuthNav = () => {
  const authLink = getAuthLink();
  if (!authLink) return;

  const link = clearAuthLinkListeners(authLink);

  if (isLoggedIn()) {
    const user = getUser();
    link.textContent = 'Logout';
    link.href = '#';
    link.addEventListener('click', (event) => {
      event.preventDefault();
      logout();
      if (window.SpaceAPI && typeof window.SpaceAPI.logout === 'function') {
        window.SpaceAPI.logout();
      }
      if (window.showToast) {
        window.showToast('Logged out successfully', 'success');
      } else {
        window.location.reload();
      }
    });

    const navList = document.getElementById('navLinks');
    if (navList && user && user.role === 'admin') {
      const existingAdminItem = navList.querySelector('.admin-link');
      if (!existingAdminItem) {
        const adminItem = document.createElement('li');
        adminItem.className = 'admin-link';
        adminItem.innerHTML = '<a href="pages/admin.html" class="nav-link">Admin</a>';
        navList.insertBefore(adminItem, link.parentElement || link.closest('li'));
      }
    }
  } else {
    link.textContent = 'Login';
    link.href = 'login.html';
    const navList = document.getElementById('navLinks');
    const existingAdminItem = navList?.querySelector('.admin-link');
    if (existingAdminItem) {
      existingAdminItem.remove();
    }
  }
};

window.AuthHelper = {
  getAuthLink,
  getUser,
  isLoggedIn,
  logout,
  updateAuthNav,
};
