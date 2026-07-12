// ======================================
// Tara Aral Na!
// reviewers.js (Supabase)
// ======================================


// ======================================
// LOAD REVIEWER DATES
// ======================================

async function loadReviewerDates() {

    const list =
    document.getElementById("reviewerDateList");

    if (!list) return;

    const dates =
    await getData("reviewer_dates");

    const files =
    await getData("reviewers");

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

onclick="openReviewerDate('${item.date}')"

onmousedown="startReviewerDateHold('${item.id}')"

ontouchstart="startReviewerDateHold('${item.id}')"

onmouseup="cancelReviewerDateHold()"

ontouchend="cancelReviewerDateHold()">

<div class="date-left">

<div class="date-title">

📅 ${item.date}

</div>

<div class="date-count">

📚 ${count} Reviewer${count!==1?"s":""}

</div>

</div>

<div class="date-arrow">

<i class="fa-solid fa-chevron-right"></i>

</div>

</div>

`;

    });

}


// ======================================
// CREATE REVIEWER DATE
// ======================================

async function createReviewerDate(){

    const input =
    document.getElementById("newReviewerDate");

    if(!input) return;

    const date =
    input.value.trim();

    if(date===""){

        showToast("Please enter a date.","warning");

        return;

    }

    const success =
    await insertData(
        "reviewer_dates",
        {
            date:date
        }
    );

    if(!success){

        showToast("Failed to create reviewer date.","error");

        return;

    }

    input.value = "";

    closeReviewerDatePopup();

    await loadReviewerDates();

}


// ======================================
// OPEN REVIEWER DATE
// ======================================

function openReviewerDate(date){

    localStorage.setItem(
        "selectedReviewerDate",
        date
    );

    window.location.href =
    "reviewer-date.html";

}


// ======================================
// DELETE REVIEWER DATE
// ======================================

async function deleteReviewerDate(id){

    const success =
    await deleteData(
        "reviewer_dates",
        id
    );

    if(success){

        await loadReviewerDates();

    }else{

        showToast("Delete failed.","error");

    }

}


// ======================================
// LONG PRESS DELETE
// ======================================

let reviewerDateHoldTimer;

function startReviewerDateHold(id){

    if(getRole()!=="teacher") return;

    reviewerDateHoldTimer =
    setTimeout(function(){

        if(confirm("Delete this reviewer date?")){

            deleteReviewerDate(id);

        }

    },1000);

}

function cancelReviewerDateHold(){

    clearTimeout(reviewerDateHoldTimer);
}