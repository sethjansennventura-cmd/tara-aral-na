// ======================================
// Tara Aral Na!
// announcement.js (Supabase Cloud)
// ======================================


// ==========================
// LOAD ANNOUNCEMENTS
// ==========================

async function loadAnnouncements() {
    
    const list =
        document.getElementById("announcementList");
    
    if (!list) return;
    
    const announcements =
        await getData("announcements");
    
    list.innerHTML = "";
    
    if (announcements.length === 0) {
        
        list.innerHTML = `

<div class="empty-state">

<i class="fa-solid fa-bullhorn"></i>

<h3>No announcements yet</h3>

<p>The teacher hasn't posted anything yet.</p>

</div>

`;
        
        return;
        
    }
    
    announcements.reverse().forEach(item => {
        
        const date =
            new Date(item.created_at);
        
        list.innerHTML += `

<div class="announcement-card">

<h3>

📢 ${item.title}

</h3>

<p>

${item.message}

</p>

<div class="announcement-time">

🕒 ${date.toLocaleString()}

</div>

</div>

`;
        
    });
    
}


// ==========================
// LATEST ANNOUNCEMENT
// ==========================

async function loadLatestAnnouncement(){

    const box =
    document.getElementById("latestAnnouncement");

    if(!box) return;

    const announcements =
    await getAnnouncements();

    if(announcements.length===0){

        box.innerHTML = `
        <div class="empty-state">

            <i class="fa-regular fa-bell"></i>

            <h4>No announcements</h4>

            <p>Teachers haven't posted any announcements yet.</p>

        </div>
        `;

        return;

    }

    announcements.sort((a,b)=>
        new Date(b.created_at) -
        new Date(a.created_at)
    );

    const latest =
    announcements[0];

    box.innerHTML = `

<h4>📌 ${latest.title}</h4>

<p>${latest.message}</p>

<small>

${new Date(latest.created_at).toLocaleString()}

</small>

`;

}


// ==========================
// POST ANNOUNCEMENT
// ==========================

async function postAnnouncement(){

    const title =
    document
    .getElementById("announcementTitle")
    .value
    .trim();

    const message =
    document
    .getElementById("announcementMessage")
    .value
    .trim();

    if(title==="" || message===""){

        showToast(
            "Please complete all fields.",
            "warning"
        );

        return;

    }

    const success =
    await createAnnouncement(
        title,
        message
    );

    if(success){

        document.getElementById(
            "announcementTitle"
        ).value = "";

        document.getElementById(
            "announcementMessage"
        ).value = "";

        showToast(
            "Announcement posted.",
            "success"
        );

        loadAnnouncements();

        loadLatestAnnouncement();

    }else{

        showToast(
            "Failed to post announcement.",
            "error"
        );

    }

}


// ==========================
// DELETE
// ==========================

async function deleteAnnouncement(id){

    if(!confirm(
        "Delete this announcement?"
    )) return;

    const success =
    await removeAnnouncement(id);

    if(success){

        showToast(
            "Announcement deleted.",
            "success"
        );

        loadAnnouncements();

        loadLatestAnnouncement();

    }else{

        showToast(
            "Delete failed.",
            "error"
        );

    }

}


// ==========================
// EDIT
// ==========================

async function editAnnouncement(id){

    const announcements =
    await getAnnouncements();

    const item =
    announcements.find(a=>a.id===id);

    if(!item) return;

    const title =
    prompt(
        "Edit title:",
        item.title
    );

    if(title===null) return;

    const message =
    prompt(
        "Edit message:",
        item.message
    );

    if(message===null) return;

    const success =
    await updateAnnouncement(
        id,
        title.trim(),
        message.trim()
    );

    if(success){

        showToast(
            "Announcement updated.",
            "success"
        );

        loadAnnouncements();

        loadLatestAnnouncement();

    }else{

        showToast(
            "Update failed.",
            "error"
        );

    }

}
// ==========================
// OPEN POPUP
// ==========================

function openAnnouncementPopup(){

    document.getElementById(
        "announcementPopup"
    ).style.display = "flex";

}

// ==========================
// CLOSE POPUP
// ==========================

function closeAnnouncementPopup(){

    document.getElementById(
        "announcementPopup"
    ).style.display = "none";

}
// ==========================
// CREATE ANNOUNCEMENT
// ==========================

async function createAnnouncement(){

    const title =
    document.getElementById(
        "announcementTitle"
    ).value.trim();

    const message =
    document.getElementById(
        "announcementMessage"
    ).value.trim();

    if(title === "" || message === ""){

        showToast(
            "Please complete all fields.",
            "warning"
        );

        return;

    }

    const success =
    await insertData(
        "announcements",
        {
            title: title,
            message: message
        }
    );

    if(success){

        showToast(
            "Announcement published!",
            "success"
        );

        document.getElementById(
            "announcementTitle"
        ).value = "";

        document.getElementById(
            "announcementMessage"
        ).value = "";

        closeAnnouncementPopup();

        loadAnnouncements();

    }else{

        showToast(
            "Failed to publish announcement.",
            "error"
        );

    }

}