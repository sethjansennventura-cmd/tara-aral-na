// ======================================
// RECENTLY VIEWED
// ======================================

// Load all viewed files
async function getRecentViewed() {
  
  return await getData("recent");
  
}

// Save viewed file
async function saveRecentViewed(file){

    const recent =
    await getRecentViewed();

    const existing =
    recent.find(item =>
        item.file_name === file.file_name
    );

    if(existing){

        await deleteData(
            "recent",
            existing.id
        );

    }

    await insertData(
        "recent",
        {
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

// Load Recent Viewed Page
async function loadRecentViewed() {
  
  const list =
    document.getElementById("recentViewedList");
  
  if (!list) return;
  
  const recent =
    await getRecentViewed();
  
  list.innerHTML = "";
  
  if (recent.length === 0) {
    
    list.innerHTML = `

<div class="empty-state">

<div class="empty-icon">
<i class="fa-solid fa-clock-rotate-left"></i>
</div>

<h3>No recently viewed files</h3>

<p>Open a file to see it here.</p>

</div>

`;
    
    return;
    
  }
  
  recent.reverse().forEach(file => {
    
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