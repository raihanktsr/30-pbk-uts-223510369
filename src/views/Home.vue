<template>
  <div class="todo-app cyberpunk">
    <h1>To-Do List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add item..." />
      <button type="submit" class="primary">Add</button>
    </form>
    <div class="filter-section">
      <button @click="filterTodos('all')" class="filter-btn">All</button>
      <button @click="filterTodos('active')" class="filter-btn active-filter">Active</button>
      <button @click="filterTodos('completed')" class="filter-btn completed-filter">Completed</button>
    </div>
    <div class="todo-table">
      <div class="todo-table-header">
        <div class="header-checkbox">Keterangan</div>
        <div class="header-text">List</div>
        <div class="header-action">Pengaturan</div>
      </div>
      <div v-for="(todo, index) in filteredTodos" :key="index" class="todo-table-row">
        <div class="table-cell checkbox-cell">
          <input type="checkbox" v-model="todo.done" />
        </div>
        <div class="table-cell text-cell">
          <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
        </div>
        <div class="table-cell action-cell">
          <button @click="removeTodo(index)" class="danger">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos(filterType) {
      this.filter = filterType;
    },
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};
</script>

<style scoped>
.todo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #01012b; /* Dark Navy */
  border: 1px solid #05d9e8; /* Bright Cyan */
}

.todo-app h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #cfff04; /* Change to Bright Yellow */
}

.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 15px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #01012b; /* Dark Navy */
  color: #cfff04; /* Bright Cyan */
}

::placeholder {
  color: #cfff04;
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #05d9e8; /* Bright Cyan */
  color: #01012b; /* Dark Navy */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-section {
  text-align: center;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  border-radius: 5px;
  cursor: pointer;
  color: #005678; /* Bright Cyan */
}

.filter-btn.active-filter {
  background-color: #005678; /* Deep Cyan */
  color: #d1f7ff; /* Light Blue */
}

.filter-btn.completed-filter {
  background-color: #d1f7ff; /* Light Blue */
  color: #01012b; /* Dark Navy */
}

.filter-btn:hover {
  background-color: #ff2a6d; /* Pink */
  color: #01012b; /* Dark Navy */
}

.todo-table {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  background-color: #01012b;
}

.todo-table-header,
.todo-table-row {
  display: contents;
}

.todo-table-header {
  font-weight: bold;
  color: #d1f7ff; /* Light Blue */
  border: 1px solid #05d9e8;
}

.table-cell {
  padding: 10px;
  border: 1px solid #05d9e8;
}

.checkbox-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-cell {
  color: #cfff04; /* Change to Bright Yellow */
}

.action-cell {
  display: flex;
  justify-content: center;
}

.todo-list li {
  display: none; /* Hide the default list style */
}

.todo-list li .done {
  text-decoration: line-through;
  color: #666; /* Cyberpunk gray */
}

.primary {
  background-color: #05d9e8; /* Bright Cyan */
  color: #01012b; /* Dark Navy */
}

.danger {
  background-color: #ff2a6d; /* Pink */
  color: #01012b; /* Dark Navy */
}
</style>

