<template>
  <div class="todo-header">
    <input type="text" placeholder="输入任务" v-model="title" @keyup.enter="add">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Header',
  props: {
    addTodo: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const title = ref('')
    const add = () => {
      const text = title.value
      if(!text) return

      const todo = {
        id: Date.now(),
        title: title.value,
        isCompleted: false
      }
      props.addTodo(todo);
      title.value = ''
    }
    return {
      title,
      add
    }
  }
})
</script>

<style  scoped>
.todo-header {
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 8px;
}
.todo-header input {
  width: 100%;
  border: none;
  padding-left: 10;
}
.todo-header input:focus {
  border: none;
  outline: none;
}
</style>
