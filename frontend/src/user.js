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
      address: document.getElementById('address').value
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
  
    employees.forEach(emp => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50';
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
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
      employees = employees.filter(emp => emp.id !== id);
      localStorage.setItem('employees', JSON.stringify(employees));
      displayEmployees();
    }
  }
  
  // Modal functions
  function openModal() {
    document.getElementById('addModal').classList.remove('hidden');
    document.getElementById('addModal').classList.add('flex');
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