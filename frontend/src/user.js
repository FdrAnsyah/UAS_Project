// Initialize employees data in localStorage if not exist
if (!localStorage.getItem('employees')) {
  localStorage.setItem('employees', JSON.stringify([]));
}

// Function to add new employee
function addEmployee(e) {
  e.preventDefault();

  const employee = {
    id: Date.now(),
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    specialist: document.getElementById('specialist').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
  };

  // Get existing employees
  const employees = JSON.parse(localStorage.getItem('employees'));
  employees.push(employee);

  // Save back to localStorage
  localStorage.setItem('employees', JSON.stringify(employees));

  // Update table
  displayEmployees();

  // Close modal and reset form
  closeModal();
  document.getElementById('employeeForm').reset();
}

// Function to display employees in table
function displayEmployees() {
  const employees = JSON.parse(localStorage.getItem('employees'));
  const tbody = document.querySelector('tbody');

  tbody.innerHTML = '';

  employees.forEach((emp) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap fade-in">
        <div class="text-sm font-medium text-gray-900">${emp.name}</div>
        <div class="text-sm text-gray-500">${emp.email}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          ${emp.specialist}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${emp.phone}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${emp.address}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="deleteEmployee(${emp.id})" class="text-red-600 hover:text-red-900">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Function to delete employee
function deleteEmployee(id) {
  if (confirm('Rill kah ingin delete data nya?')) {
    let employees = JSON.parse(localStorage.getItem('employees'));
    employees = employees.filter((emp) => emp.id !== id);
    localStorage.setItem('employees', JSON.stringify(employees));
    displayEmployees();
  }

  // Function to display employees in table
  function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees'));
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    employees.forEach((emp) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50';
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap fade-in">
          <div class="text-sm font-medium text-gray-900">${emp.name}</div>
          <div class="text-sm text-gray-500">${emp.email}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            ${emp.specialist}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${emp.phone}</td>
        <td class="px-6 py-4 text-sm text-gray-500">${emp.address}</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button onclick="deleteEmployee(${emp.id})" class="text-red-600 hover:text-red-900">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      displayPasien();
    });
  }
}

// Modal functions
const openPasienModal = () => {
  document.getElementById('tambahModal').classList.remove('hidden');
};

const closePasienModal = () => {
  document.getElementById('tambahModal').classList.add('hidden');
  document.getElementById('formData').reset();
  document.getElementById('formData').onsubmit = addPasien;
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initPasien();
  displayPasien();
  setupSearchAndFilter();

  // Show patient content
  document.getElementById('pasien-content').classList.remove('hidden');

  // Set up form submission
  const form = document.getElementById('formData');
  if (form) {
    form.addEventListener('submit', addPasien);
  }

  function closeModal() {
    document.getElementById('addModal').classList.remove('flex');
    document.getElementById('addModal').classList.add('hidden');
  }

  // Initialize display when page loads
  document.addEventListener('DOMContentLoaded', () => {
    displayEmployees();
    document.getElementById('employeeForm').addEventListener('submit', addEmployee);
  });

  // Initialize patient data
  const initPasien = () => {
    if (!localStorage.getItem('datapasien')) {
      localStorage.setItem('datapasien', JSON.stringify([]));
    }
  };

  // Calculate age from birthdate
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  // Format date to Indonesian format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Add new patient
  const addPasien = (e) => {
    e.preventDefault();

    const pasien = {
      id: Date.now(),
      // Informasi Pribadi
      nama: document.getElementById('nama').value,
      nik: document.getElementById('nik').value,
      tanggalLahir: document.getElementById('tanggalLahir').value,
      jenisKelamin: document.getElementById('jenisKelamin').value,

      // Informasi Kontak
      telepon: document.getElementById('telepon').value,
      email: document.getElementById('email').value,
      alamat: document.getElementById('alamat').value,

      // Data Medis
      goldarah: document.getElementById('goldarah').value,
      rhesus: document.getElementById('rhesus').value,
      alergi: document
        .getElementById('alergi')
        .value.split(',')
        .map((item) => item.trim()),
      penyakitBawaan: document
        .getElementById('penyakitBawaan')
        .value.split(',')
        .map((item) => item.trim()),

      // Status Pasien
      statusPerawatan: document.getElementById('statusPerawatan').value,
      asuransi: document.getElementById('asuransi').value,

      // Metadata
      tanggalDaftar: new Date().toISOString(),
      riwayatKunjungan: [],
    };

    let datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');
    datapasien.push(pasien);
    localStorage.setItem('datapasien', JSON.stringify(datapasien));

    document.getElementById('formData').reset();
    closePasienModal();
    displayPasien();
  };

  // Display patients
  const displayPasien = () => {
    const tbody = document.getElementById('tablebody');
    const searchTerm = document.getElementById('searchPasien')?.value.toLowerCase() || '';
    const filterStatus = document.getElementById('filterStatus')?.value || '';

    let datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');

    // Apply filters
    datapasien = datapasien.filter((pasien) => {
      const matchSearch = pasien.nama.toLowerCase().includes(searchTerm) || pasien.nik.includes(searchTerm);
      const matchStatus = !filterStatus || pasien.statusPerawatan === filterStatus;
      return matchSearch && matchStatus;
    });

    tbody.innerHTML = '';

    datapasien.forEach((pasien) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50';

      // Continue from previous getStatusColor function
      const getStatusColor = (status) => {
        switch (status) {
          case 'Rawat Inap':
            return 'bg-yellow-100 text-yellow-800';
          case 'Rawat Jalan':
            return 'bg-green-100 text-green-800';
          case 'IGD':
            return 'bg-red-100 text-red-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };

      tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap fade-in">
        <div class="text-sm font-medium text-gray-900">${pasien.nama}</div>
        <div class="text-sm text-gray-500">NIK: ${pasien.nik}</div>
        <div class="text-xs text-gray-500">
          ${calculateAge(pasien.tanggalLahir)} tahun (${pasien.jenisKelamin})
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex flex-col gap-1">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            ${pasien.goldarah} ${pasien.rhesus}
          </span>
          ${
            pasien.alergi.length
              ? `
            <div class="text-xs text-gray-500">
              Alergi: ${pasien.alergi.join(', ')}
            </div>
          `
              : ''
          }
          ${
            pasien.penyakitBawaan.length
              ? `
            <div class="text-xs text-gray-500">
              Penyakit: ${pasien.penyakitBawaan.join(', ')}
            </div>
          `
              : ''
          }
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pasien.statusPerawatan)}">
          ${pasien.statusPerawatan}
        </span>
        ${
          pasien.asuransi
            ? `
          <div class="text-xs text-gray-500 mt-1">
            BPJS/Asuransi: ${pasien.asuransi}
          </div>
        `
            : ''
        }
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-xs text-gray-500">
          Terdaftar: ${formatDate(pasien.tanggalDaftar)}
        </div>
        <button onclick="showRiwayat(${pasien.id})" class="text-xs text-blue-600 hover:text-blue-900">
          Lihat Riwayat
        </button>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onclick="editPasien(${pasien.id})" class="text-blue-600 hover:text-blue-900 mr-3">
          Edit
        </button>
        <button onclick="deletePasien(${pasien.id})" class="text-red-600 hover:text-red-900">
          Delete
        </button>
      </td>
    `;
      tbody.appendChild(tr);
    });
  };

  // Delete patient
  const deletePasien = (id) => {
    if (confirm('Apakah anda yakin ingin menghapus data pasien ini?')) {
      let datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');
      datapasien = datapasien.filter((pasien) => pasien.id !== id);
      localStorage.setItem('datapasien', JSON.stringify(datapasien));
      displayPasien();
    }
  };

  // Edit patient
  const editPasien = (id) => {
    const datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');
    const pasien = datapasien.find((p) => p.id === id);

    if (pasien) {
      // Fill form with patient data
      document.getElementById('nama').value = pasien.nama;
      document.getElementById('nik').value = pasien.nik;
      document.getElementById('tanggalLahir').value = pasien.tanggalLahir;
      document.getElementById('jenisKelamin').value = pasien.jenisKelamin;
      document.getElementById('telepon').value = pasien.telepon;
      document.getElementById('email').value = pasien.email;
      document.getElementById('alamat').value = pasien.alamat;
      document.getElementById('goldarah').value = pasien.goldarah;
      document.getElementById('rhesus').value = pasien.rhesus;
      document.getElementById('alergi').value = pasien.alergi.join(', ');
      document.getElementById('penyakitBawaan').value = pasien.penyakitBawaan.join(', ');
      document.getElementById('statusPerawatan').value = pasien.statusPerawatan;
      document.getElementById('asuransi').value = pasien.asuransi;

      // Change form submission to update
      const form = document.getElementById('formData');
      form.onsubmit = (e) => updatePasien(e, id);

      openPasienModal();
    }
  };

  // Update patient
  const updatePasien = (e, id) => {
    e.preventDefault();

    let datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');
    const index = datapasien.findIndex((p) => p.id === id);

    if (index !== -1) {
      const updatedPasien = {
        ...datapasien[index],
        nama: document.getElementById('nama').value,
        nik: document.getElementById('nik').value,
        tanggalLahir: document.getElementById('tanggalLahir').value,
        jenisKelamin: document.getElementById('jenisKelamin').value,
        telepon: document.getElementById('telepon').value,
        email: document.getElementById('email').value,
        alamat: document.getElementById('alamat').value,
        goldarah: document.getElementById('goldarah').value,
        rhesus: document.getElementById('rhesus').value,
        alergi: document
          .getElementById('alergi')
          .value.split(',')
          .map((item) => item.trim()),
        penyakitBawaan: document
          .getElementById('penyakitBawaan')
          .value.split(',')
          .map((item) => item.trim()),
        statusPerawatan: document.getElementById('statusPerawatan').value,
        asuransi: document.getElementById('asuransi').value,
      };

      datapasien[index] = updatedPasien;
      localStorage.setItem('datapasien', JSON.stringify(datapasien));

      // Reset form and display
      document.getElementById('formData').reset();
      document.getElementById('formData').onsubmit = addPasien;
      closePasienModal();
      displayPasien();
    }
  };

  // Show patient history
  const showRiwayat = (id) => {
    const datapasien = JSON.parse(localStorage.getItem('datapasien') || '[]');
    const pasien = datapasien.find((p) => p.id === id);

    if (pasien && pasien.riwayatKunjungan.length > 0) {
      alert(`Riwayat kunjungan ${pasien.nama}:\n\n${pasien.riwayatKunjungan.map((r) => `${formatDate(r.tanggal)}: ${r.keterangan}`).join('\n')}`);
    } else {
      alert('Belum ada riwayat kunjungan');
    }
  };

  // Search and filter
  const setupSearchAndFilter = () => {
    const searchInput = document.getElementById('searchPasien');
    const filterSelect = document.getElementById('filterStatus');

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        displayPasien();
      });
    }

    if (filterSelect) {
      filterSelect.addEventListener('change', () => {
        displayPasien();
      });
    }
  };

  // Modal functions
  const openPasienModal = () => {
    document.getElementById('tambahModal').classList.remove('hidden');
  };

  const closePasienModal = () => {
    document.getElementById('tambahModal').classList.add('hidden');
    document.getElementById('formData').reset();
    document.getElementById('formData').onsubmit = addPasien;
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    initPasien();
    displayPasien();
    setupSearchAndFilter();

    // Show patient content
    document.getElementById('pasien-content').classList.remove('hidden');

    // Set up form submission
    const form = document.getElementById('formData');
    if (form) {
      form.addEventListener('submit', addPasien);
    }
  });
});
