<template>
  <li>
    <label>
      <input type="checkbox" v-model="isComplete">
      <span>{{ todo.title }}</span>
    </label>
    <button @click="del">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { Todo } from '../types/todo';

export default defineComponent({
  name: 'List',
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    },
    updateTodo: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const state = reactive({
      name: ''
    })
    //计算属性 来控制复选框

    const isComplete = computed({
      get() {
        return props.todo.isCompleted
      },
      set(val) {
        props.updateTodo(props.todo, val)
      }
    })

    return {
      ...toRefs(state),
      isComplete
    }
  }
})
</script>

<style lang="scss" scoped>
li {
  font-size: 14px;
  display: block;
  list-style: none;
  text-align: left;
  padding: 6px 4px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  label {
    input{
      margin-right: 10px;
    }
    span {
      transition: all 0.2s;
    }
  }
  button, button:focus {
    display: none;
    background: none;
    border:  none;
    outline: none;
    color: #448eee;
    cursor: pointer;
    border-radius: 2px;
    font-size: 12px;
  }
 
  &:hover {
    background: lighten($color: #448eee, $amount: 30%) ;
    label span {
      color: #256ece;
    }
    button {
      color: #FFF;
      background: rgb(221, 113, 113);
      display: block;
      &:active {
        background: #ce4725;
      }
    }
  }
}
</style>
