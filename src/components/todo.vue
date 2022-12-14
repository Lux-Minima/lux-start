<template>
  <div>
    <h1>Todo App</h1>
    <input class="text-black" type="text" v-model="newTodo" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos">
        {{ todo }}
        <span class = "cursor-pointer hover:text-red-500" @click="remTodo">[x]</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    remTodo() {
      this.todos.pop()
    },
    addTodo() {
      this.todos.push(this.newTodo)
      this.newTodo = ''
    }
  }
}
</script>