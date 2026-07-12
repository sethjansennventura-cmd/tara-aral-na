// ======================================
// Tara Aral Na!
// app.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Protect all pages except login
    if (!window.location.pathname.endsWith("index.html")) {
        protectPage();
    }
    
  // Show Teacher Controls
const role = getRole();

if (role === "teacher") {
    
    document.querySelectorAll(".teacher-only").forEach(item => {
        
        item.style.display = "flex";
        
    });
    
}
    
    // Auto-load Assignment Dates
    if (typeof loadDates === "function") {
        loadDates();
    }
    
    // Auto-load Announcements
    if (typeof loadAnnouncements === "function") {
        loadAnnouncements();
    }
    
    if (typeof loadLatestAnnouncement === "function") {
        loadLatestAnnouncement();
    }
    
});

// ==========================
// FILE PICKER
// ==========================

document.addEventListener("change", function(e) {
    
    if (e.target.id === "fileInput") {
        
        const file = e.target.files[0];
        
        window.selectedAssignmentFile = file;
        window.selectedLectureFile = file;
        window.selectedReviewerFile = file;
        
    }
    
});