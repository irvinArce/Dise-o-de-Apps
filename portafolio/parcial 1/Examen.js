/*
Examen Teorico primer parcial
Profesor: Ray Brunett Parra Galaviz
Alumno: Arce Llamas Irvin de Jesus
Grupo: 4A
Cuatrimestre: 4
Fecha: 06/02/2024
*/

function fetchTodos() {
    return fetch('http://jsonplaceholder.typicode.com/todos')
      .then(response => response.json());
  }
  
  function showTodoIDs(todos) {
    const todoIDs = todos.map(todo => todo.id);
    console.log('Lista de todos los pendientes (solo IDs):', todoIDs);
  }
  
  function showTodoIDSTitles(todos) {
    const todoIDSTitles = todos.map(todo => ({ id: todo.id, title: todo.title }));
    console.log('Lista de todos los pendientes (IDs y Títulos):', todoIDSTitles);
  }
  
  function showUnresolvedTodos(todos) {
    const unresolvedTodos = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
    console.log('Lista de todos los pendientes sin resolver (IDs y Título):', unresolvedTodos);
  }
  
  function showResolvedTodos(todos) {
    const resolvedTodos = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, title: todo.title }));
    console.log('Lista de todos los pendientes resueltos (IDs y Título):', resolvedTodos);
  }
  
  function showTodosUserID(todos) {
    const todosUserID = todos.map(todo => ({ id: todo.id, userId: todo.userId }));
    console.log('Lista de todos los pendientes (IDs y userlD):', todosUserID);
  }
  
  function showResolvedTodosUserID(todos) {
    const resolvedTodosUserID = todos.filter(todo => todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
    console.log('Lista de todos los pendientes resueltos (IDs y userId):', resolvedTodosUserID);
  }
  
  function showUnresolvedTodosUserID(todos) {
    const unresolvedTodosUserID = todos.filter(todo => !todo.completed).map(todo => ({ id: todo.id, userId: todo.userId }));
    console.log('Lista de todos los pendientes sin resolver (IDs y userId):', unresolvedTodosUserID);
  }
  
  function showMenu() {
    console.log('--- Menú de la Aplicación ---');
    console.log('1. Lista de todos los pendientes (solo IDs)');
    console.log('2. Lista de todos los pendientes (IDs y Títulos)');
    console.log('3. Lista de todos los pendientes sin resolver (IDs y Título)');
    console.log('4. Lista de todos los pendientes resueltos (IDs y Título)');
    console.log('5. Lista de todos los pendientes (IDs y userlD)');
    console.log('6. Lista de todos los pendientes resueltos (IDs y userId)');
    console.log('7. Lista de todos los pendientes sin resolver (IDs y userId)');
    console.log('8. Salir');
  }
  
  function handleMenuChoice(choice, todos) {
    switch (choice) {
      case '1':
        showTodoIDs(todos);
        break;
      case '2':
        showTodoIDSTitles(todos);
        break;
      case '3':
        showUnresolvedTodos(todos);
        break;
      case '4':
        showResolvedTodos(todos);
        break;
      case '5':
        showTodosUserID(todos);
        break;
      case '6':
        showResolvedTodosUserID(todos);
        break;
      case '7':
        showUnresolvedTodosUserID(todos);
        break;
      case '8':
        console.log('Saliendo...');
        process.exit(0);
        break;
      default:
        console.log('Opción no válida. Por favor, elige un número del 1 al 8.');
    }
  }
  
  function runMenu() {
    fetchTodos()
      .then(todos => {
        showMenu();
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        readline.question('Elige una opción: ', choice => {
          handleMenuChoice(choice, todos);
          readline.close();
          runMenu();
        });
      })
      .catch(error => console.error('Error al obtener la lista de pendientes:', error));
  }
  
  runMenu();
  
