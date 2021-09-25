const refs = {
    closeBtn: document.querySelector('.modal__close-btn'),
    modalOverlay: document.querySelector('.lightbox'),
    eventEl: document.querySelector('.container-list'),
}
console.log(refs.modalOverlay);
console.log(refs.eventEl);

refs.eventEl.addEventListener('click', onEventClickModalOpen);

function onEventClickModalOpen(event) {
    console.log('i am hear');
    if (event.target.className === 'container-list') {

        return
    }
    refs.modalOverlay.classList.add('is-open')
}