// Função para salvar os dados do cliente no LocalStorage
function saveCustomer(event) {
    event.preventDefault(); // Impede o envio do formulário
  
    const sexo = document.getElementById('sexo').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;
  
    // Validar os campos do formulário
    if (sexo === '' || nome === '' || email === '' || endereco === '') {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }
  
    // Obter os clientes salvos no LocalStorage
    let customers = localStorage.getItem('customers');
    if (customers) {
      customers = JSON.parse(customers);
    } else {
      customers = [];
    }
  
    // Criar um novo objeto de cliente
    const newCustomer = {
      sexo: sexo,
      nome: nome,
      email: email,
      endereco: endereco
    };
  
    // Adicionar o novo cliente à lista
    customers.push(newCustomer);
  
    // Salvar os clientes no LocalStorage
    localStorage.setItem('customers', JSON.stringify(customers));
  
    // Exibir mensagem de cadastrado com sucesso
    alert('Cadastrado com sucesso!');
  
    // Limpar o formulário
    document.getElementById('sexo').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('endereco').value = '';
  }
  
  // Evento para o envio do formulário
  document.getElementById('customerForm').addEventListener('submit', saveCustomer);
  