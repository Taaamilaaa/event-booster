const refs = {
  container: document.querySelector('.container-list'),
  modalOverlay: document.querySelector('.lightbox'),
  closModal: document.querySelector('.close-modal'),
  lightbox: document.querySelector('.lightbox'),
  containerModal: document.querySelector('.modal'),
};

document.addEventListener('keydown', closeModalWindow);
refs.container.addEventListener('click', imageContainerClick);
refs.closModal.addEventListener('click', closeModalClick);
refs.lightbox.addEventListener('click', closelightboxClick);

function imageContainerClick() {
  if (event.target.className === 'container-list' || event.target.className === 'container-items') {
    return;
  }
  if (event.target.tagName === 'P') {
    return;
  }
  refs.modalOverlay.classList.add('is-open');
}

function closeModalWindow(event) {
  if (event.key === 'Escape') {
    closeModalClick();
  }
}

export default function closeModalClick() {
  refs.modalOverlay.classList.remove('is-open');
  removeEvents();
}

function closelightboxClick(event) {
  if (event.target.nodeName !== 'SECTION') {
    return;
  }
  closeModalClick();
}

function removeEvents() {
  refs.containerModal.innerHTML = '';
}
