document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const addTodoButton = document.getElementById("submitForm");
  const fileInput = document.getElementById("attachments");
  const fileList = document.getElementById("fileList");
  let selectedFiles = [];

  // Handle file selection (accumulate files)
  fileInput.addEventListener("change", () => {
    const newFiles = Array.from(fileInput.files);

    newFiles.forEach((file) => {
      if (!selectedFiles.find((f) => f.name === file.name)) {
        selectedFiles.push(file);
      }
    });

    renderFileList();
    fileInput.value = "";
  });

  // Render file list in the UI
  function renderFileList() {
    fileList.innerHTML = "";
    selectedFiles.forEach((file) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = file.name;
      fileList.appendChild(li);
    });
  }

  // Clear all attachments
  document.getElementById("clearAttachment").addEventListener("click", () => {
    fileInput.value = "";
    fileList.innerHTML = "";
    selectedFiles = [];
  });

  // Add todo
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("date").value;
    const assignee = document.getElementById("assignee").value;
    const createdDate = new Date().toISOString().split("T")[0];

    const card = document.createElement("div");
    card.className = "border rounded p-2 mb-3";
    card.id = "todo-item";

    card.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-6">
          <h5 class="card-title mb-0">${title}</h5>
        </div>
        <div class="col-md-6 text-end">
          <div class="d-inline-block me-3 text-muted">
            <small>Created: ${createdDate}</small>
          </div>
          <div class="btn-group">
            <button class="mark-as-done btn btn-sm btn-outline-secondary" title="Mark as done">
              <i class="bi bi-check-circle"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="delete-btn btn btn-sm btn-outline-secondary" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <p class="card-text mb-1">${description}</p>

      <div class="row gx-2 gy-0">
        <div class="col-12 col-sm-auto">
          <small class="text-muted">
            <i class="bi bi-calendar-event"></i> Due: ${dueDate}
          </small>
        </div>
        ${
          assignee
            ? `<div class="col-12 col-sm-auto">
                <span class="badge bg-info text-dark">${assignee}</span>
              </div>`
            : ""
        }
        ${
          selectedFiles.length > 0
            ? `<div class="col-12 col-sm-auto">
                <span class="badge bg-secondary">
                  ${selectedFiles.length} attachment${
                selectedFiles.length > 1 ? "s" : ""
              }
                </span>
              </div>`
            : ""
        }
      </div>
    `;

    const cardBody = document.getElementById("card-body");
    cardBody.appendChild(card);

    // Reset form and state
    form.reset();
    form.classList.remove("was-validated");
    selectedFiles = [];
    renderFileList();
  });

  //remove todo
  document.getElementById("card-body").addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn")) {
      const card = e.target.closest("#todo-item");
      if (card) card.remove();
    }
  });

  //mark as done
  document.getElementById("card-body").addEventListener("click", (e) => {
  const markBtn = e.target.closest(".mark-as-done");
  if (markBtn) {
      markBtn.classList.toggle("bg-success");
    markBtn.classList.toggle("text-white");

      
  }

  
});

});
