// ======================================
// FILE CACHE
// ======================================

window.fileCache = {};


// ======================================
// FILE MANAGER
// ======================================

async function displayFiles(table) {
    
    const list =
        document.getElementById("fileList");
    
    if (!list) return;
    
    const subject =
        new URLSearchParams(window.location.search)
        .get("subject");
    
    const date =
        getCurrentDate();
    
    const files =
        await getFilteredData(
            table,
            date,
            subject
        );
    
    window.fileCache = {};
    
    if (files.length === 0) {
        
        list.innerHTML =
            "<p>No files yet.</p>";
        
        return;
        
    }
    
    let html = "";
    
    files.forEach(file => {
        
        window.fileCache[file.id] = file;
        
        html += createFileCard(file, table);
        
    });
    
    list.innerHTML = "";
    
    setTimeout(() => {
        
        list.innerHTML = html;
        
    }, 0);
    
}


// ======================================
// CREATE FILE CARD
// ======================================

function createFileCard(file, table) {
    
    const icon =
        getFileIcon(file.type);
    
    let startHold = "";
    let cancelHold = "";
    
    if (table === "assignments") {
        
        startHold =
            `startAssignmentHold('${file.id}','${file.file_name}')`;
        
        cancelHold =
            "cancelAssignmentHold()";
        
    }
    
    else if (table === "lectures") {
        
        startHold =
            `startLectureHold('${file.id}','${file.file_name}')`;
        
        cancelHold =
            "cancelLectureHold()";
        
    }
    
    else if (table === "reviewers") {
        
        startHold =
            `startReviewerHold('${file.id}','${file.file_name}')`;
        
        cancelHold =
            "cancelReviewerHold()";
        
    }
    
    return `
<div class="file-card"
onclick="openFileById('${file.id}')"
onmousedown="${startHold}"
ontouchstart="${startHold}"
onmouseup="${cancelHold}"
ontouchend="${cancelHold}">

    <div class="file-header">

        <div class="file-icon">
            <i class="${icon}"></i>
        </div>

        <div class="file-info">

            <div class="file-title">
                ${file.title}
            </div>

            <div class="file-sub">
                ${file.subject} • ${file.type}
            </div>

            ${
                file.created_at
                ? `
                <div class="file-time">
                    🕒 ${timeAgo(file.created_at)}
                </div>
                `
                : ""
            }

        </div>

        <button
        class="favorite-btn"
        onclick="event.stopPropagation();
        toggleFavorite('${table}', window.fileCache['${file.id}'])">

            ${isFavorite(file.file_name) ? "❤️" : "🤍"}

        </button>

    </div>

    <div class="file-actions">

        <button
        class="open-btn"
        onclick="event.stopPropagation();openFileById('${file.id}')">

            <i class="fa-solid fa-eye"></i>

            Open

        </button>

        <button
        class="download-btn"
        onclick="event.stopPropagation();downloadFile('${file.file_url}','${file.file_name}')">

            <i class="fa-solid fa-download"></i>

            Download

        </button>

    </div>

</div>
`;
    
}


// ======================================
// OPEN FILE USING CACHE
// ======================================

function openFileById(id) {
    
    const file = window.fileCache[id];
    
    openFile(
        file.file_url,
        file.type,
        file
    );
    
}

function sortFiles() {
    
    const page =
        window.location.pathname;
    
    if (page.includes("subject")) {
        
        if (typeof loadAssignmentFiles === "function")
            loadAssignmentFiles();
        
        if (typeof loadLectureFiles === "function")
            loadLectureFiles();
        
        if (typeof loadReviewerFiles === "function")
            loadReviewerFiles();
        
    }
    
}