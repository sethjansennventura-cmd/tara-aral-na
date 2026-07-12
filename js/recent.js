// ======================================
// Tara Aral Na!
// recent.js
// ======================================

// Time Ago
function timeAgo(date){

    const seconds =
    Math.floor((Date.now()-new Date(date))/1000);

    const minutes =
    Math.floor(seconds/60);

    const hours =
    Math.floor(minutes/60);

    const days =
    Math.floor(hours/24);

    if(seconds<60)
        return "Just now";

    if(minutes<60)
        return minutes + " minute" +
        (minutes>1?"s":"") + " ago";

    if(hours<24)
        return hours + " hour" +
        (hours>1?"s":"") + " ago";

    if(days===1)
        return "Yesterday";

    if(days<7)
        return days + " days ago";

    return new Date(date).toLocaleDateString();

}



// Open Recent File
function openRecentFile(url,type){

    window.location.href =
    "file-viewer.html?url=" +
    encodeURIComponent(url) +
    "&type=" +
    encodeURIComponent(type);

}



// Load Recently Added
async function loadRecentUploads(){

    const list =
    document.getElementById("recentUploads");

    if(!list) return;

    list.innerHTML =
    "<p>Loading...</p>";

    try{

        const assignments =
        await getData("assignments");

        const lectures =
        await getData("lectures");

        const reviewers =
        await getData("reviewers");

        let uploads = [];

        assignments.forEach(item=>{

            uploads.push({
                ...item,
                category:"Assignment",
                icon:"fa-solid fa-file-lines",
                color:"assignment"
            });

        });

        lectures.forEach(item=>{

            uploads.push({
                ...item,
                category:"Lecture",
                icon:"fa-solid fa-chalkboard",
                color:"lecture"
            });

        });

        reviewers.forEach(item=>{

            uploads.push({
                ...item,
                category:"Reviewer",
                icon:"fa-solid fa-book-open",
                color:"reviewer"
            });

        });

        uploads.sort(function(a,b){

            return new Date(b.created_at) -
            new Date(a.created_at);

        });

        uploads =
        uploads.slice(0,5);

        list.innerHTML = "";

        if(uploads.length===0){

            list.innerHTML =
            "<p>No recent uploads.</p>";

            return;

        }

        uploads.forEach(item=>{

            list.innerHTML += `

<div class="recent-card ${item.color}"

onclick="openRecentFile('${item.file_url}','${item.type}')">

<div class="recent-left">

<div class="recent-icon">

<i class="${item.icon}"></i>

</div>

<div class="recent-content">

<div class="recent-title">

${item.title}

</div>

<div class="recent-sub">

${item.category} • ${item.subject}

</div>

<div class="recent-time">

🕒 ${timeAgo(item.created_at)}

</div>

</div>

</div>

<div class="recent-arrow">

<i class="fa-solid fa-chevron-right"></i>

</div>

</div>

`;

        });

    }catch(error){

        console.error(error);

        list.innerHTML =
        "<p>Failed to load recent uploads.</p>";

    }

}