document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  const modal = document.getElementById('modal');
  const modalOverlay = document.getElementById('modalOverlay');

  // Function to open modal
  function openModal() {
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  }

  // Function to close modal
  function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
  }

  // Event Listeners
  openModalBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', () => {
    alert('Confirmed!');
    closeModal();
  });

  // Close modal when clicking outside
  modalOverlay.addEventListener('click', closeModal);
});
