// ======================================
// ASSIGNMENT FILE SYSTEM
// ======================================

// ==========================
// LOAD FILES
// ==========================

async function loadAssignmentFiles() {
    
    await displayFiles("assignments");
    
}

// ==========================
// UPLOAD
// ==========================

function uploadAssignment() {
    
    uploadFile({
        
        table: "assignments",
        
        upload: uploadAssignmentFile,
        
        getFile: () => document.getElementById("fileInput").files[0],
        
        refresh: loadAssignmentFiles
        
    });
    
}

// ==========================
// DELETE
// ==========================

let assignmentHoldTimer = null;

function startAssignmentHold(id, fileName) {
    
    if (getRole() !== "teacher") return;
    
    assignmentHoldTimer =
        setTimeout(function() {
            
            if (confirm("Delete this assignment?")) {
                
                deleteAssignmentFile(id, fileName);
                
            }
            
        }, 1000);
    
}

function cancelAssignmentHold() {
    
    clearTimeout(assignmentHoldTimer);
    
}

async function deleteAssignmentFile(id, fileName) {
    
    const storageDeleted =
        await deleteStorageFile(
            "assignments",
            fileName
        );
    
    if (!storageDeleted) {
        
        showToast("Failed to delete Storage.", "error");
        
        return;
        
    }
    
    const dbDeleted =
        await deleteAssignment(id);
    
    if (!dbDeleted) {
        
        showToast("Failed to delete database.", "error");
        
        return;
        
    }
    
    showToast("Assignment deleted.", "success");
    
    await loadAssignmentFiles();
    
}



// ======================================
// LECTURE FILE SYSTEM
// ======================================

// ==========================
// LOAD FILES
// ==========================

async function loadLectureFiles() {
    
    await displayFiles("lectures");
    
}

// ==========================
// UPLOAD
// ==========================

function uploadLecture() {
    
    uploadFile({
        
        table: "lectures",
        
        upload: uploadLectureStorageFile,
        
        getFile: () => window.selectedLectureFile,
        
        refresh: loadLectureFiles
        
    });
    
}

// ==========================
// DELETE
// ==========================

let lectureHoldTimer = null;

function startLectureHold(id, fileName) {
    
    if (getRole() !== "teacher") return;
    
    lectureHoldTimer =
        setTimeout(function() {
            
            if (confirm("Delete this lecture?")) {
                
                deleteLectureFile(id, fileName);
                
            }
            
        }, 1000);
    
}

function cancelLectureHold() {
    
    clearTimeout(lectureHoldTimer);
    
}

async function deleteLectureFile(id, fileName) {
    
    const storageDeleted =
        await deleteStorageFile(
            "lectures",
            fileName
        );
    
    if (!storageDeleted) {
        
        showToast("Failed to delete Storage.", "error");
        
        return;
        
    }
    
    const dbDeleted =
        await deleteLecture(id);
    
    if (!dbDeleted) {
        
        showToast("Failed to delete database.", "error");
        
        return;
        
    }
    
    showToast("Lecture deleted.", "success");
    
    await loadLectureFiles();
    
}



// ======================================
// REVIEWER FILE SYSTEM
// ======================================

// ==========================
// LOAD FILES
// ==========================

async function loadReviewerFiles() {
    
    await displayFiles("reviewers");
    
}

// ==========================
// UPLOAD
// ==========================

function uploadReviewer() {
    
    uploadFile({
        
        table: "reviewers",
        
        upload: uploadReviewerStorageFile,
        
        getFile: () => window.selectedReviewerFile,
        
        refresh: loadReviewerFiles
        
    });
    
}

// ==========================
// DELETE
// ==========================

let reviewerHoldTimer = null;

function startReviewerHold(id, fileName) {
    
    if (getRole() !== "teacher") return;
    
    reviewerHoldTimer =
        setTimeout(function() {
            
            if (confirm("Delete this reviewer?")) {
                
                deleteReviewerFile(id, fileName);
                
            }
            
        }, 1000);
    
}

function cancelReviewerHold() {
    
    clearTimeout(reviewerHoldTimer);
    
}

async function deleteReviewerFile(id, fileName) {
    
    const storageDeleted =
        await deleteStorageFile(
            "reviewers",
            fileName
        );
    
    if (!storageDeleted) {
        
        showToast("Failed to delete Storage.", "error");
        
        return;
        
    }
    
    const dbDeleted =
        await deleteReviewer(id);
    
    if (!dbDeleted) {
        
        showToast("Failed to delete database.", "error");
        
        return;
        
    }
    
    showToast("Reviewer deleted.", "success");
    
    await loadReviewerFiles();
    
}