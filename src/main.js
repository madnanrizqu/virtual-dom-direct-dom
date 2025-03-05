class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.form = document.getElementById("todo-form");
    this.input = document.getElementById("todo-input");
    this.list = document.getElementById("todo-list");
    this.emptyState = document.getElementById("empty-state");

    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.addTodo(e));
    this.render();
  }

  addTodo(e) {
    e.preventDefault();
    const text = this.input.value.trim();
    if (text) {
      this.todos.push({ id: Date.now(), text, completed: false });
      this.input.value = "";
      this.saveAndRender();
    }
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.saveAndRender();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveAndRender();
  }

  saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.render();
  }

  render() {
    // Clear existing list
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    // Create and append todo elements
    this.todos.forEach((todo) => {
      // Create main container
      const todoDiv = document.createElement("div");
      todoDiv.className = `flex items-center justify-between p-4 rounded-lg ${
        todo.completed ? "bg-gray-50" : "bg-white"
      } border border-gray-200 shadow-sm transition-all duration-200`;

      // Create left section container
      const leftSection = document.createElement("div");
      leftSection.className = "flex items-center gap-3 flex-1";

      // Create toggle button
      const toggleButton = document.createElement("button");
      toggleButton.className = `focus:outline-none transition-colors duration-200 ${
        todo.completed ? "text-green-500" : "text-gray-400 hover:text-gray-500"
      }`;
      toggleButton.addEventListener("click", () => this.toggleTodo(todo.id));

      // Create SVG for toggle button
      const toggleSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      toggleSvg.setAttribute("width", "24");
      toggleSvg.setAttribute("height", "24");
      toggleSvg.setAttribute("viewBox", "0 0 24 24");
      toggleSvg.setAttribute("fill", "none");
      toggleSvg.setAttribute("stroke", "currentColor");
      toggleSvg.setAttribute("stroke-width", "2");

      if (todo.completed) {
        // Checkmark icon
        toggleSvg.innerHTML = `
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l3 3 5-5"/>
        `;
      } else {
        // X icon
        toggleSvg.innerHTML = `
          <circle cx="12" cy="12" r="10"/>
          <path d="M15 9l-6 6"/>
          <path d="M9 9l6 6"/>
        `;
      }
      toggleButton.appendChild(toggleSvg);

      // Create text span
      const textSpan = document.createElement("span");
      textSpan.className = `flex-1 text-gray-800 ${
        todo.completed ? "line-through text-gray-500" : ""
      }`;
      textSpan.textContent = todo.text;

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.className =
        "text-red-500 hover:text-red-600 focus:outline-none transition-colors duration-200";
      deleteButton.addEventListener("click", () => this.deleteTodo(todo.id));

      // Create SVG for delete button
      const deleteSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      deleteSvg.setAttribute("width", "20");
      deleteSvg.setAttribute("height", "20");
      deleteSvg.setAttribute("viewBox", "0 0 24 24");
      deleteSvg.setAttribute("fill", "none");
      deleteSvg.setAttribute("stroke", "currentColor");
      deleteSvg.setAttribute("stroke-width", "2");
      deleteSvg.innerHTML = `
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      `;
      deleteButton.appendChild(deleteSvg);

      // Assemble the components
      leftSection.appendChild(toggleButton);
      leftSection.appendChild(textSpan);
      todoDiv.appendChild(leftSection);
      todoDiv.appendChild(deleteButton);

      // Add to the list
      this.list.appendChild(todoDiv);
    });

    // Toggle empty state visibility
    this.emptyState.style.display = this.todos.length ? "none" : "block";
  }
}

// Initialize the app
window.todoList = new TodoList();
