// ======================================
// FILE UTILITIES
// Shared functions for Assignments,
// Lectures, and Reviewers
// ======================================



// ==========================
// OPEN FILE
// ==========================

async function openFile(url, type, file = null) {
  
  if (file) {
    
    await saveRecentViewed(file);
    
  }
  
  let viewerUrl =
    "file-viewer.html?url=" +
    encodeURIComponent(url) +
    "&type=" +
    encodeURIComponent(type);
  
  if (file && file.file_name) {
    
    viewerUrl +=
      "&name=" +
      encodeURIComponent(file.file_name);
    
  }
  
  window.location.href = viewerUrl;
  
}



// ==========================
// DOWNLOAD FILE
// ==========================

async function downloadFile(url, fileName) {
  
  const a = document.createElement("a");
  
  a.href = url;
  
  a.download = fileName;
  
  a.target = "_blank";
  
  document.body.appendChild(a);
  
  a.click();
  
  document.body.removeChild(a);
  
}



// ==========================
// SEARCH FILES
// ==========================

function searchFiles() {
  
  const input =
    document.getElementById("searchInput");
  
  if (!input) return;
  
  const keyword =
    input.value.toLowerCase();
  
  const files =
    document.querySelectorAll(".file-card");
  
  files.forEach(function(card) {
    
    const text =
      card.textContent.toLowerCase();
    
    card.style.display =
      text.includes(keyword) ?
      "" :
      "none";
    
  });
  
}



// ==========================
// FILE TYPE ICON
// ==========================

function getFileIcon(type) {
  
  switch (type) {
    
    case "Image":
      return "fa-solid fa-image";
      
    case "Video":
      return "fa-solid fa-video";
      
    case "PDF":
      return "fa-solid fa-file-pdf";
      
    case "Word":
      return "fa-solid fa-file-word";
      
    case "Excel":
      return "fa-solid fa-file-excel";
      
    case "PowerPoint":
      return "fa-solid fa-file-powerpoint";
      
    case "Audio":
      return "fa-solid fa-file-audio";
      
    case "ZIP":
      return "fa-solid fa-file-zipper";
      
    case "TXT":
    case "Text":
      return "fa-solid fa-file-lines";
      
    case "HTML":
      return "fa-brands fa-html5";
      
    case "JavaScript":
      return "fa-brands fa-js";
      
    case "CSS":
      return "fa-brands fa-css3-alt";
      
    default:
      return "fa-solid fa-file";
      
  }
  
}



// ==========================
// TIME AGO
// ==========================

function timeAgo(date) {
  
  const fileDate =
    new Date(date);
  
  const seconds =
    Math.floor(
      (Date.now() - fileDate) / 1000
    );
  
  const minutes =
    Math.floor(seconds / 60);
  
  const hours =
    Math.floor(minutes / 60);
  
  const days =
    Math.floor(hours / 24);
  
  if (seconds < 60) {
    
    return "Just now";
    
  }
  
  if (minutes < 60) {
    
    return minutes +
      " minute" +
      (minutes > 1 ? "s" : "") +
      " ago";
    
  }
  
  if (hours < 24) {
    
    return hours +
      " hour" +
      (hours > 1 ? "s" : "") +
      " ago";
    
  }
  
  if (days === 1) {
    
    return "Yesterday";
    
  }
  
  if (days < 7) {
    
    return days +
      " days ago";
    
  }
  
  return fileDate.toLocaleDateString();
  
}