<template>
  <div class="container">
    <Item v-for="(todo, index) in todos" :key="index" :todo="todo" :updateTodo="updateTodo"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Item from './Item.vue'
export default defineComponent({
  name: 'List',
  components: { Item },
  props: ['todos', 'updateTodo'],
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

<style scoped>
.container {
  display: block;
  padding: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
