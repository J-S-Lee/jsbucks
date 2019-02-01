const openModalBtn = document.querySelector('.openModalBtn');
const modal = document.querySelector('.modal');
const overlay = modal.querySelector('.modal__overlay');
const modalContent = modal.querySelector('.modal__content');

const openModal = () => {
  modal.classList.remove('hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
};

function modalAlert(text) {
  const span = document.createElement('span');
  span.innerText = text;
  modalContent.appendChild(span);
  openModal();
  setTimeout(function() {
    closeModal();
    modalContent.removeChild(modalContent.childNodes[0]);
  }, 5000);
}

overlay.addEventListener('click', closeModal);
openModalBtn.addEventListener('click', openModal);
