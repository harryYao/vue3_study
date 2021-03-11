<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox">
      <span>全选</span>
    </label>
    <span><span>已完成{{ todos.filter(m => m.isCompleted).length }}</span><span> / 全部{{todos.length}}</span></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Todo } from '../types/todo';
export default defineComponent({
  name: 'Footer',
  props: {
    todos: {
      type: Array as () => Todo[],
      required: true
    }
  },
  setup () {
    const state = reactive({
      name: ''
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.todo-footer {
  display: block;
  text-align: left;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  label {
    margin-right: 20px;
  }
}
</style>
