 // Função para salvar os dados no LocalStorage
 function saveExpense(event) {
  event.preventDefault(); // Impede o envio do formulário

  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;

  // Validar os campos do formulário
  if (descricao === '' || valor === '' || data === '') {
    alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  // Obter as despesas salvas no LocalStorage
  let expenses = localStorage.getItem('expenses');
  if (expenses) {
    expenses = JSON.parse(expenses);
  } else {
    expenses = [];
  }

  // Criar um novo objeto de despesa
  const newExpense = {
    descricao: descricao,
    valor: valor,
    data: data
  };

  // Adicionar a nova despesa à lista
  expenses.push(newExpense);

  // Salvar as despesas no LocalStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

        // Limpar o formulário
        document.getElementById('descricao').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('data').value = '';

  // Atualizar a tabela de consulta e a seção de análise de consumo
  updateExpenseTable();
  updateExpenseSummary();
}

// Função para atualizar a tabela de consulta
function updateExpenseTable() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filterSelect = document.getElementById('filterSelect').value;

  let expenses = localStorage.getItem('expenses');
  if (expenses) {
    expenses = JSON.parse(expenses);

    let filteredExpenses = expenses;
    if (searchInput) {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense[filterSelect].toLowerCase().includes(searchInput)
      );
    }

    const tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    filteredExpenses.forEach(expense => {
      const row = tableBody.insertRow();

      const descricaoCell = row.insertCell();
      descricaoCell.textContent = expense.descricao;

      const valorCell = row.insertCell();
      valorCell.textContent = 'R$ ' + expense.valor;

      const dataCell = row.insertCell();
      dataCell.textContent = expense.data;

      const actionsCell = row.insertCell();
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', function() {
        deleteExpense(expense);
      });
      actionsCell.appendChild(deleteButton);
    });
  }
}

// Função para atualizar a seção de análise de consumo
function updateExpenseSummary() {
  let expenses = localStorage.getItem('expenses');
  if (expenses) {
    expenses = JSON.parse(expenses);

    const totalExpenses = expenses.reduce((total, expense) =>
      total + parseFloat(expense.valor), 0).toFixed(2);
    document.getElementById('totalExpenses').textContent = 'R$ ' + totalExpenses;

    const averageExpense = (totalExpenses / expenses.length).toFixed(2);
    document.getElementById('averageExpense').textContent = 'R$ ' + averageExpense;

    const maxExpense = Math.max(...expenses.map(expense => parseFloat(expense.valor))).toFixed(2);
    document.getElementById('maxExpense').textContent = 'R$ ' + maxExpense;

    const minExpense = Math.min(...expenses.map(expense => parseFloat(expense.valor))).toFixed(2);
    document.getElementById('minExpense').textContent = 'R$ ' + minExpense;
  } else {
    document.getElementById('totalExpenses').textContent = 'R$ 0.00';
    document.getElementById('averageExpense').textContent = 'R$ 0.00';
    document.getElementById('maxExpense').textContent = 'R$ 0.00';
    document.getElementById('minExpense').textContent = 'R$ 0.00';
  }
}

// Função para excluir uma despesa
function deleteExpense(expense) {
  let expenses = localStorage.getItem('expenses');
  if (expenses) {
    expenses = JSON.parse(expenses);

    // Encontrar o índice da despesa a ser excluída
    const index = expenses.findIndex(item =>
      item.descricao === expense.descricao &&
      item.valor === expense.valor &&
      item.data === expense.data
    );

            // Remover a despesa do array
            if (index !== -1) {
      expenses.splice(index, 1);

      // Salvar as despesas atualizadas no LocalStorage
      localStorage.setItem('expenses', JSON.stringify(expenses));

      // Atualizar a tabela de consulta e a seção de análise de consumo
      updateExpenseTable();
      updateExpenseSummary();
    }
  }
}

// Evento para o envio do formulário
document.getElementById('expenseForm').addEventListener('submit', saveExpense);

// Evento para a busca e filtro
document.getElementById('searchInput').addEventListener('input', updateExpenseTable);
document.getElementById('filterSelect').addEventListener('change', updateExpenseTable);

// Carregar a tabela de consulta e a seção de análise de consumo ao carregar a página
updateExpenseTable();
updateExpenseSummary();