<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos="todos" :updateTodo="updateTodo"/>
      <Footer :todos="todos"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent , reactive, toRefs } from 'vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import { Todo } from './types/todo'


export default defineComponent({
  name: 'App',
  components: {
    Header, List, Footer
  },
  setup() {
    const state = reactive<{todos: Todo[] }>({
      todos: [
        { id: 1, title: '今天天气好晴朗', isCompleted: false },
        { id: 2, title: '今天天气好晴朗2', isCompleted: false },
        { id: 3, title: '今天天气好晴朗3', isCompleted: false }
      ]
    })

    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo)
    }

    const updateTodo = (todo: Todo, isCompleted: boolean) => {
      todo.isCompleted = isCompleted;
    }

    return {
      ...toRefs(state),
      addTodo,
      updateTodo
    }
  }
})
</script>

<style>
.todo-container {
  width: 600px;
  padding: 10px;
  margin: auto;
  text-align: center;
  border: 1px solid #ededed;
  font-size: 14px;
}

.todo-wrap {
  width: 100%;
}
</style>
