// ======================================
// Tara Aral Na!
// lectures.js (Supabase Cloud)
// ======================================


// ==========================
// LOAD LECTURE DATES
// ==========================

async function loadLectureDates() {

    const list =
    document.getElementById("lectureDateList");

    if (!list) return;

    const dates =
    await getData("lecture_dates");

    const files =
    await getData("lectures");

    list.innerHTML = "";

    if (dates.length === 0) {

    list.innerHTML = `
<div class="empty-state">

<div class="empty-icon">📂</div>

<h3>No files yet</h3>

<p>Files will appear here once uploaded.</p>

</div>
`;

    return;

}

    dates.forEach(item => {

        const count = files.filter(file =>
            file.date === item.date
        ).length;

        list.innerHTML += `

<div class="date-card"

onclick="openLectureDate('${item.date}')"

onmousedown="startLectureDateHold('${item.id}')"

ontouchstart="startLectureDateHold('${item.id}')"

onmouseup="cancelLectureDateHold()"

ontouchend="cancelLectureDateHold()">

<div class="date-left">

<div class="date-title">

📅 ${item.date}

</div>

<div class="date-count">

🎥 ${count} Lecture${count!==1?"s":""}

</div>

</div>

<div class="date-arrow">

<i class="fa-solid fa-chevron-right"></i>

</div>

</div>

`;

    });

}


// ==========================
// CREATE LECTURE DATE
// ==========================

async function createLectureDate(){

    const input =
    document.getElementById("newLectureDate");

    if(!input) return;

    const date =
    input.value.trim();

    if(date===""){

        showToast("Please enter a date.","warning");

        return;

    }

    const success =
    await insertData(

        "lecture_dates",

        {

            date:date

        }

    );

    if(success){

        input.value="";

        closeLectureDatePopup();

        loadLectureDates();

    }else{

        showToast("Failed to create lecture date.","error");

    }

}


// ==========================
// OPEN LECTURE DATE
// ==========================

function openLectureDate(date){

    localStorage.setItem(
        "selectedLectureDate",
        date
    );

    window.location.href =
    "lecture-date.html";

}


// ==========================
// DELETE LECTURE DATE
// ==========================

async function deleteLectureDate(id){

    const success =
    await deleteData(

        "lecture_dates",

        id

    );

    if(success){

        loadLectureDates();

    }else{

        showToast("Delete failed.","error");

    }

}


// ==========================
// LONG PRESS DELETE
// ==========================

let lectureDateHoldTimer;

function startLectureDateHold(id) {
    
    if (getRole() !== "teacher") return;
    
    lectureDateHoldTimer =
        setTimeout(function() {
            
            if (confirm("Delete this lecture date?")) {
                
                deleteLectureDate(id);
                
            }
            
        }, 1000);
    
}

function cancelLectureDateHold() {
    
    clearTimeout(lectureDateHoldTimer);
    
}