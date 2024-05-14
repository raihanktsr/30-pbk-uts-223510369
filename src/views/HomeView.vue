<template>
  <div class="todo-app">
    <h1>To-Do List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add item..." />
      <button type="submit" class="primary">Add</button>
    </form>
    <h2>List</h2>
    <div class="filter-section">
      <button @click="filterTodos('all')" class="filter-btn">All</button>
      <button @click="filterTodos('active')" class="filter-btn">Active</button>
      <button @click="filterTodos('completed')" class="filter-btn">Completed</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="danger">Remove</button>
      </li>
    </ul>
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
/* General Styles */
body {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  background-color: #121212; /* Dark background color */
  color: #fff; /* White text color */
}

/* Todo List Container */
.todo-app {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #333; /* Dark container background color */
}

/* Heading */
.todo-app h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Input Form */
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
  background-color: #555; /* Dark input background color */
  color: #fff; /* White text color */
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #00bcd4; /* Cyan button color */
  color: #121212; /* Dark text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Filter Buttons */
.filter-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  color: #4cbde2;
}

.filter-btn.all {
  background-color: #00bcd4;
}

.filter-btn.completed {
  background-color: #4caf50; /* Green background for "Completed" filter */
}

.filter-btn.active {
  background-color: #ff9800; /* Orange background for "Active" filter */
}

.filter-btn:hover {
  background-color: #999; /* Darker background color on hover */
}

/* Todo List */
.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #666;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li input[type=checkbox] {
  margin-right: 10px;
}

.todo-list li .done {
  text-decoration: line-through;
}

/* Button Styles */
.primary {
  background-color: #00bcd4;
}

.danger {
  background-color: #ff5722; /* Red button color */
}

/* Filter Section */
.filter-section {
  text-align: center;
  margin-bottom: 20px;
}

</style>
