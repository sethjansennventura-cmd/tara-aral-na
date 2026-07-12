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

