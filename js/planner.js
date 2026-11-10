// planner.js - Academic Planner: add, complete, delete and filter tasks.
// Tasks live in an array of objects and are saved to localStorage.
(function () {
  "use strict";

  var STORAGE_KEY = "academicPlannerTasks";

  var form = document.getElementById("task-form");
  var taskList = document.getElementById("task-list");
  if (!form || !taskList) {
    return; // Not the planner page
  }

  var titleInput = document.getElementById("task-title");
  var descriptionInput = document.getElementById("task-description");
  var dueInput = document.getElementById("task-due");
  var priorityInput = document.getElementById("task-priority");
  var titleError = document.getElementById("task-title-error");
  var emptyState = document.getElementById("empty-state");
  var emptyTitle = document.getElementById("empty-title");
  var emptyText = document.getElementById("empty-text");
  var filterButtons = document.querySelectorAll(".filter-btn");

  var tasks = loadTasks(); // array of task objects
  var currentFilter = "all";

  // ---------- Storage ----------

  function loadTasks() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      console.warn("Could not read saved tasks:", error);
      return [];
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Could not save tasks:", error);
    }
  }

  // ---------- Task operations ----------

  function addTask(title, description, dueDate, priority) {
    var task = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    tasks.unshift(task); // newest first
    saveTasks();
    render();
  }

  function toggleTask(id) {
    tasks.forEach(function (task) {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
    saveTasks();
    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });
    saveTasks();
    render();
  }

  function getVisibleTasks() {
    return tasks.filter(function (task) {
      if (currentFilter === "pending") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    });
  }

  // ---------- Rendering ----------

  function formatDate(isoDate) {
    // Parse as local date parts to avoid timezone shifts
    var parts = isoDate.split("-");
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
  }

  function todayIso() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function createTaskElement(task) {
    // Built with createElement/textContent so user text is never parsed as HTML
    var item = document.createElement("li");
    item.className = "task" + (task.completed ? " is-completed" : "");
    item.dataset.id = task.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.id = "check-" + task.id;
    checkbox.dataset.action = "toggle";

    var main = document.createElement("div");
    main.className = "task-main";

    var title = document.createElement("label");
    title.className = "task-title";
    title.htmlFor = checkbox.id;
    title.style.display = "block";
    title.textContent = task.title;
    main.appendChild(title);

    if (task.description) {
      var description = document.createElement("p");
      description.className = "task-desc";
      description.textContent = task.description;
      main.appendChild(description);
    }

    var meta = document.createElement("div");
    meta.className = "task-meta";

    var priority = document.createElement("span");
    priority.className = "priority priority--" + task.priority;
    priority.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + " priority";
    meta.appendChild(priority);

    if (task.dueDate) {
      var due = document.createElement("span");
      due.className = "task-due";
      if (!task.completed && task.dueDate < todayIso()) {
        due.classList.add("is-overdue");
        due.textContent = "Overdue: " + formatDate(task.dueDate);
      } else {
        due.textContent = "Due " + formatDate(task.dueDate);
      }
      meta.appendChild(due);
    }
    main.appendChild(meta);

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn--small btn--ghost btn--danger task-actions";
    deleteButton.dataset.action = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete task: " + task.title);

    item.append(checkbox, main, deleteButton);
    return item;
  }

  function updateStats() {
    var completed = tasks.filter(function (task) { return task.completed; }).length;
    document.getElementById("stat-total").textContent = tasks.length;
    document.getElementById("stat-completed").textContent = completed;
    document.getElementById("stat-pending").textContent = tasks.length - completed;
  }

  function render() {
    var visible = getVisibleTasks();
    taskList.replaceChildren();
    visible.forEach(function (task) {
      taskList.appendChild(createTaskElement(task));
    });

    // Empty state messages differ depending on why the list is empty
    emptyState.hidden = visible.length > 0;
    if (visible.length === 0) {
      if (tasks.length === 0) {
        emptyTitle.textContent = "No tasks yet";
        emptyText.textContent = "Add your first academic task using the form to start planning your work.";
      } else {
        emptyTitle.textContent = "Nothing to show";
        emptyText.textContent = "No " + currentFilter + " tasks right now.";
      }
    }
    updateStats();
  }

  // ---------- Events ----------

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var title = titleInput.value.trim();

    if (title === "") {
      titleError.textContent = "Please enter a task title.";
      titleInput.classList.add("is-invalid");
      titleInput.setAttribute("aria-invalid", "true");
      titleInput.focus();
      return;
    }

    addTask(title, descriptionInput.value.trim(), dueInput.value, priorityInput.value);
    form.reset();
    priorityInput.value = "medium";
    titleError.textContent = "";
    titleInput.classList.remove("is-invalid");
    titleInput.removeAttribute("aria-invalid");
    titleInput.focus();
  });

  titleInput.addEventListener("input", function () {
    if (titleInput.value.trim() !== "") {
      titleError.textContent = "";
      titleInput.classList.remove("is-invalid");
      titleInput.removeAttribute("aria-invalid");
    }
  });

  // One listener on the list handles every task's checkbox and delete button
  taskList.addEventListener("click", function (event) {
    var control = event.target.closest("[data-action]");
    var item = event.target.closest(".task");
    if (!control || !item) return;

    if (control.dataset.action === "delete") {
      deleteTask(item.dataset.id);
    }
  });

  taskList.addEventListener("change", function (event) {
    var item = event.target.closest(".task");
    if (item && event.target.dataset.action === "toggle") {
      toggleTask(item.dataset.id);
    }
  });

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentFilter = button.dataset.filter;
      filterButtons.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === button));
      });
      render();
    });
  });

  // Show today's date in the header
  var todayEl = document.getElementById("today-date");
  if (todayEl) {
    todayEl.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  render();
})();
