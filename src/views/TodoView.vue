<template>
  <div class="max-w-4xl mx-auto border-b border-gray-200 dark:border-gray-700">
    <ul class="flex" id="myTab" data-tabs-toggle="#TodoAppTab" role="tablist">
      <li class="mr-2" role="presentation">
        <button
          class="text-[28px] inline-block p-4 border-b-4 rounded-t-lg text-black font-bold"
          id="todo-tab"
          data-tabs-target="#todo"
          type="button"
          role="tab"
          aria-controls="todo"
          aria-selected="false"
        >
          To Do List
        </button>
      </li>
      <li class="mr-2" role="presentation">
        <button
          class="text-[28px] text-black inline-block p-4 border-b-4 font-bold rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          id="backlog-tab"
          data-tabs-target="#backlog"
          type="button"
          role="tab"
          aria-controls="backlog"
          aria-selected="false"
        >
          Backlog
        </button>
      </li>
    </ul>
  </div>
  <!-- </div> -->

  <div id="TodoAppTab" class="max-w-4xl" style="margin: 0 auto">
    <div
      class="hidden p-4 rounded-lg dark:bg-gray-800"
      id="todo"
      role="tabpanel"
      aria-labelledby="todo-tab"
    >
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white bg-opacity-25 dark:bg-gray-900 text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
      >
        <h2 id="accordion-flush-heading-1">
          <button
            type="button"
            class="flex items-center justify-between w-full px-5 py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
            data-accordion-target="#accordion-flush-body-1"
            aria-expanded="true"
            aria-controls="accordion-flush-body-1"
          >
            <span>{{ completedTodos.length }} Done</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-flush-body-1"
          class="hidden"
          aria-labelledby="accordion-flush-heading-1"
        >
          <transition-group name="list" tag="ul">
            <div v-for="todo in completedTodos" :key="todo.id" class="mb-2">
              <label
                @click="handleMarkAsPending(todo)"
                class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 text-blue-600"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span>
                  <span class="ml-4 text-[#AAAAAA] text-[15px] line-through">{{
                    todo.text
                  }}</span>
                  <p class="text-[10px] text-gray-500 px-4">
                    {{ formatDate(todo.created_at) }}
                  </p>
                </span>
              </label>
            </div>
          </transition-group>
          <hr class="my-4" />
        </div>
      </div>
      <!-- / Accordion -->
      <transition-group name="list" tag="ul">
        <div
          v-for="(todo, index) in todos"
          :key="index"
          class="mb-2 flex justify-between"
        >
          <span
            @click="handleMarkAsCompleted(todo)"
            class="flex items-center rounded cursor-pointer hover:bg-gray-100 pl-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="w-5 h-5 text-[#AAAAAA]"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
            </svg>

            <span>
              <span class="ml-4 text-[15px]">{{ todo.text }}</span>
              <p class="text-[10px] text-gray-500 px-4">
                {{ formatDate(todo.created_at) }}
              </p>
            </span>
          </span>

          <span class="flex flex-col">
            <button
              @click="toggleDropdown(index)"
              :id="`dropDownMenuBtn-${index}`"
              :data-dropdown-toggle="`dropdownDotsHorizontal-${index}`"
              class="inline-flex items-end p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-[50%] hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                class="w-8 h-8 text-[#AAAAAA] hover:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3"
              >
                <path
                  d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                />
              </svg>
            </button>

            <div
              :id="`dropdownDotsHorizontal-${index}`"
              v-show="showDropdown == index"
              class="absolute right-0 md:right-80 mt-10 bg-white"
            >
              <ul
                class="py-2 text-sm text-[#0080FF]"
                :aria-labelledby="`dropDownMenuBtn-${index}`"
              >
                <li class="border-2">
                  <a
                    @click.prevent="handleRemoveTodo(todo.id)"
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Delete</a
                  >
                </li>
                <li class="border-2 border-t-0">
                  <a
                    @click.prevent="handleSetBacklog(todo)"
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Move to Backlog</a
                  >
                </li>
              </ul>
            </div>
          </span>
        </div>
      </transition-group>

      <AddForm></AddForm>
    </div>

    <div
      class="hidden p-4 rounded-lg dark:bg-gray-800"
      id="backlog"
      role="tabpanel"
      aria-labelledby="backlog-tab"
    >
      <BacklogView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useTodos, type Todo } from "@/stores/todos";
import BacklogView from "./BacklogView.vue";
import AddForm from "@/components/AddForm.vue";

const {
  todos,
  completedTodos,
  removeTodo,
  addToBacklog,
  markAsCompleted,
  markAsPending,
} = useTodos();

const handleRemoveTodo = (id: number) => {
  removeTodo(id);
  showDropdown.value = null;
};

const handleSetBacklog = (todo: Todo) => {
  addToBacklog(todo);
  showDropdown.value = null;
};

const handleMarkAsCompleted = (todo: Todo) => {
  markAsCompleted(todo);
};

const handleMarkAsPending = (todo: Todo) => {
  markAsPending(todo);
};

const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const showDropdown = ref<number | null>(null);

const toggleDropdown = (index: number) => {
  if (showDropdown.value === index) {
    showDropdown.value = null;
  } else {
    showDropdown.value = index;
  }
};
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
