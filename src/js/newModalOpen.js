

const refs = {
    closeBtn: document.querySelector('.modal__close-btn'),
    modalOverlay: document.querySelector('.lightbox'),
    eventEl: document.querySelector('.container-list'),
    modal: document.querySelector('.modal')
}

refs.eventEl.addEventListener('click', onEventClickModalOpen);

function onEventClickModalOpen(event) {
 if (event.target.className === 'container-list' || event.target.className === 'container-items') {
    return;
  }
  if (event.target.tagName === 'P') {
    return;
  }
    openModal();
    return;
}
function openModal() {
    refs.modalOverlay.classList.remove('is-close');
    refs.modalOverlay.classList.add('is-open');
    return;
}

refs.modalOverlay.addEventListener('click', closeModal);
refs.closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', onEscModalClose);

function onEscModalClose(event) {
    if (event.key === 'Escape') {
        closeModal()
    }
    return;
}
export function closeModal() {
    refs.modalOverlay.classList.remove('is-open');
    refs.modalOverlay.classList.add('is-close');
    removeModalEvent();
    return;
}
function removeModalEvent() {
    refs.modal.innerHTML = '';
    return;
}
