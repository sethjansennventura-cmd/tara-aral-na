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