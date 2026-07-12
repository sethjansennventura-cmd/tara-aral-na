// ======================================
// Tara Aral Na!
// ui.js
// ======================================


// ==========================
// UPLOAD POPUP
// ==========================

function openPopup(){

    const popup =
    document.getElementById("uploadPopup");

    if(popup){

        popup.classList.add("active");

    }

}

function closePopup(){

    const popup =
    document.getElementById("uploadPopup");

    if(popup){

        popup.classList.remove("active");

    }

}

// ==========================
// ASSIGNMENT DATE POPUP
// ==========================

function openDatePopup() {

    const popup =
        document.getElementById("datePopup");

    if (popup) {

        popup.style.display = "flex";

    }

}

function closeDatePopup() {

    const popup =
        document.getElementById("datePopup");

    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================
// LECTURE DATE POPUP
// ==========================

function openLectureDatePopup() {

    const popup =
        document.getElementById("lectureDatePopup");

    if (popup) {

        popup.style.display = "flex";

    }

}

function closeLectureDatePopup() {

    const popup =
        document.getElementById("lectureDatePopup");

    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================
// REVIEWER DATE POPUP
// ==========================

function openReviewerDatePopup() {

    const popup =
        document.getElementById("reviewerDatePopup");

    if (popup) {

        popup.style.display = "flex";

    }

}

function closeReviewerDatePopup() {

    const popup =
        document.getElementById("reviewerDatePopup");

    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================
// CLICK OUTSIDE TO CLOSE
// ==========================

window.addEventListener("click", function(e) {

    const uploadPopup =
        document.getElementById("uploadPopup");

    const datePopup =
        document.getElementById("datePopup");

    const lecturePopup =
        document.getElementById("lectureDatePopup");

    const reviewerDatePopup =
        document.getElementById("reviewerDatePopup");

    if (uploadPopup && e.target === uploadPopup) {

        closePopup();

    }

    if (datePopup && e.target === datePopup) {

        closeDatePopup();

    }

    if (lecturePopup && e.target === lecturePopup) {

        closeLectureDatePopup();

    }

    if (reviewerDatePopup && e.target === reviewerDatePopup) {

        closeReviewerDatePopup();

    }

});


// ==========================
// ESC KEY SUPPORT
// ==========================

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        closePopup();

        closeDatePopup();

        closeLectureDatePopup();

        closeReviewerDatePopup();

    }

});


// ======================================
// END OF FILE
// ======================================