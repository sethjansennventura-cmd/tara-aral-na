// ======================================
// PULL TO REFRESH
// ======================================

let startY = 0;
let isRefreshing = false;

document.addEventListener("touchstart", function(e) {
    
    if (window.scrollY === 0) {
        
        startY = e.touches[0].clientY;
        
    }
    
});

document.addEventListener("touchend", function(e) {
    
    if (isRefreshing) return;
    
    const endY = e.changedTouches[0].clientY;
    
    if (window.scrollY === 0 && endY - startY > 180) {
        
        isRefreshing = true;
        
        showToast(
            "Refreshing...",
            "success"
        );
        
        setTimeout(function() {
            
            if (typeof loadRecentUploads === "function")
                loadRecentUploads();
            
            if (typeof loadLatestAnnouncement === "function")
                loadLatestAnnouncement();
            
            if (typeof loadAnnouncements === "function")
                loadAnnouncements();
            
            if (typeof loadDates === "function")
                loadDates();
            
            if (typeof loadLectureDates === "function")
                loadLectureDates();
            
            if (typeof loadReviewerDates === "function")
                loadReviewerDates();
            
            if (typeof loadAssignmentFiles === "function")
                loadAssignmentFiles();
            
            if (typeof loadLectureFiles === "function")
                loadLectureFiles();
            
            if (typeof loadReviewerFiles === "function")
                loadReviewerFiles();
            
            if (typeof loadFavoriteFiles === "function")
                loadFavoriteFiles();
            
            if (typeof loadRecentViewed === "function")
                loadRecentViewed();
            
            showToast(
                "Refresh complete!",
                "success"
            );
            
            isRefreshing = false;
            
        }, 300);
        
    }
    
});