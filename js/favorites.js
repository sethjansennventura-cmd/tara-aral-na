// ======================================
// FAVORITES CACHE
// ======================================

window.favoriteCache = [];

// ======================================
// FAVORITES
// ======================================

// Get all favorites
async function loadFavorites() {
    
    window.favoriteCache =
        await getData("favorites");
    
    return window.favoriteCache;
    
}

// Check if a file is favorited
function isFavorite(fileName){

    return window.favoriteCache.some(
        item => item.file_name === fileName
    );

}

// Add favorite
async function addFavorite(file){

    return await insertData(
        "favorites",
        {
            user_role:getRole(),
            category:file.category,
            date:file.date,
            subject:file.subject,
            title:file.title,
            type:file.type,
            file_url:file.file_url,
            file_name:file.file_name
        }
    );

}

// Remove favorite
async function removeFavorite(id){

    return await deleteData(
        "favorites",
        id
    );

}
// ==========================
// TOGGLE FAVORITE
// ==========================

async function toggleFavorite(category, file) {
    
    const favorites =
        await loadFavorites();
    
    const existing =
        favorites.find(item =>
            item.file_name === file.file_name
        );
    
    if (existing) {
        
        await removeFavorite(existing.id);
        
        showToast(
            "Removed from favorites.",
            "success"
        );
        
    } else {
        
        file.category = category;
        
        await addFavorite(file);
        
        showToast(
            "Added to favorites.",
            "success"
        );
        
    }
    
    await loadFavorites();
    
    // Refresh current page
    if (category === "assignments") {
        
        loadAssignmentFiles();
        
    }
    else if (category === "lectures") {
        
        loadLectureFiles();
        
    }
    else if (category === "reviewers") {
        
        loadReviewerFiles();
        
    }
    
}
// ==========================
// LOAD FAVORITES PAGE
// ==========================

async function loadFavoriteFiles(){

    const list =
    document.getElementById("favoriteList");

    if(!list) return;

    const favorites =
    await loadFavorites();

    list.innerHTML = "";

    if(favorites.length===0){

     list.innerHTML = `
<div class="empty-state">

    <div class="empty-icon">⭐</div>

    <h3>No favorites yet</h3>

    <p>Tap 🤍 on any file to add it to your favorites.</p>

</div>
`;

        return;

    }

    favorites.forEach(file=>{

        list.innerHTML += `

<div class="file-card"

onclick="openFile('${file.file_url}','${file.type}')">

<div class="file-header">

<div class="file-icon">

<i class="${getFileIcon(file.type)}"></i>

</div>

<div class="file-info">

<div class="file-title">

${file.title}

</div>

<div class="file-sub">

${file.subject}

</div>

</div>

</div>

</div>

`;

    });

}