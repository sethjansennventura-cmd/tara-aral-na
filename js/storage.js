// ======================================
// Tara Aral Na!
// storage.js
// ======================================

// ---------- ROLE ----------

function getRole() {
    return localStorage.getItem("role");
}

function setRole(role) {
    localStorage.setItem("role", role);
}

function removeRole() {
    localStorage.removeItem("role");
}

// ---------- CURRENT DATE ----------

function getCurrentDate(){

    const page = window.location.pathname;

    if(page.includes("reviewer")){

        return localStorage.getItem("selectedReviewerDate");

    }

    if(page.includes("lecture")){

        return localStorage.getItem("selectedLectureDate");

    }

    return localStorage.getItem("selectedDate");

}

function setCurrentDate(date){

    const page = window.location.pathname;

    if(page.includes("reviewer")){

        localStorage.setItem("selectedReviewerDate", date);

        return;

    }

    if(page.includes("lecture")){

        localStorage.setItem("selectedLectureDate", date);

        return;

    }

    localStorage.setItem("selectedDate", date);

}
// ---------- MAIN STORAGE ----------

function getStorage() {

    return JSON.parse(
        localStorage.getItem("portalData")
    ) || {};

}

function saveStorage(data) {

    localStorage.setItem(
        "portalData",
        JSON.stringify(data)
    );

}

// ---------- DATES ----------

function getDates() {

    return JSON.parse(
        localStorage.getItem("dates")
    ) || [];

}

function saveDates(dates) {

    localStorage.setItem(
        "dates",
        JSON.stringify(dates)
    );

}