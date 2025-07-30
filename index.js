document.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.getElementById("submitForm");
  const fileInput = document.getElementById("attachments");
  const fileList = document.getElementById("fileList");
  let selectedFiles = [];

  // Handle file selection (accumulate files)
  fileInput.addEventListener("change", () => {
    const newFiles = Array.from(fileInput.files);

    newFiles.forEach((file) => {
      // Prevent duplicate files (by name)
      if (!selectedFiles.find(f => f.name === file.name)) {
        selectedFiles.push(file);
      }
    });

    renderFileList();
    fileInput.value = ""; // allow same file to be selected again
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
  addTodoButton.addEventListener("click", () => {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("date").value;
    const assignee = document.getElementById("assignee").value;

    if (!title || !description || !dueDate) {
      alert("Please fill in Title, Description, and Due Date.");
      return;
    }

    const createdDate = new Date().toISOString().split("T")[0];

    const card = document.createElement("div");
    card.className = "border rounded p-2 mb-3";

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
            <button class="btn btn-sm btn-outline-secondary" title="Mark as done">
              <i class="bi bi-check-circle"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary" title="Delete">
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
                <span class="badge bg-secondary">${selectedFiles.length} attachment${selectedFiles.length > 1 ? "s" : ""}</span>
              </div>`
            : ""
        }
      </div>
    `;

    const cardBody = document.getElementById("card-body");
    cardBody.appendChild(card);

    // Reset the form
    document.getElementById("form").reset();
    selectedFiles = [];
    renderFileList(); // clears list
  });
});
