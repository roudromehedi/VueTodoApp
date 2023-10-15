import { defineStore } from "pinia";
import { reactive } from "vue";

export interface Todo {
  id: number;
  text: string;
  created_at: string;
}

export const useTodos = defineStore("todos", {
  state: () => ({
    todos: reactive([] as Todo[]),
    backlog: reactive([] as Todo[]),
    completedTodos: reactive([] as Todo[]), // New array for completed todos
    searchTerm: "",
    sortField: "",
  }),

  actions: {
    sortBacklog() {
      if (this.sortField === "date") {
        this.backlog = this.backlog
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      } else if (this.sortField === "name") {
        this.backlog = this.backlog
          .slice()
          .sort((a, b) => a.text.localeCompare(b.text));
      }
    },
    setSearchTerm(term: string) {
      this.searchTerm = term;
    },
    setSortField(field: string) {
      this.sortField = field;
    },
    addTodo(todo: { text: string; created_at: string }) {
      const randomId = Math.floor(Math.random() * 1000000);
      this.todos.push({ id: randomId, ...todo });
    },
    removeTodo(id: number) {
      const index = this.todos.findIndex((todo) => todo.id == id);
      this.todos.splice(index, 1);
    },
    addToBacklog(todo: Todo) {
      this.backlog.push(todo);
      this.removeTodo(todo.id);
    },
    removeBacklog(id: number) {
      this.backlog = this.backlog.filter((todo) => todo.id !== id);
    },
    moveToTodos(todo: Todo) {
      this.todos.push(todo);
      this.removeBacklog(todo.id);
    },
    markAsCompleted(todo: Todo) {
      this.completedTodos.push(todo);
      this.removeTodo(todo.id);
    },

    markAsPending(todo: Todo) {
      this.todos.push(todo);
      const index = this.completedTodos.findIndex((item) => item.id == todo.id);
      this.completedTodos.splice(index, 1);
    },
  },
});
