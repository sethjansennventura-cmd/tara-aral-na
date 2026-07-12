// ======================================
// Tara Aral Na!
// dates.js (Supabase Cloud)
// ======================================

// ==========================
// LOAD DATES
// ==========================

async function loadDates() {
    
    const list = document.getElementById("dateList");
    
    if (!list) return;
    
    const dates = await getData("assignment_dates");
    
    const files = await getData("assignments");
    
    list.innerHTML = "";
    
   if (dates.length === 0) {
    
    list.innerHTML = `

<div class="empty-state">

<div class="empty-icon">🗓️</div>

<h3>No assignment dates yet</h3>

<p>Your teacher hasn't created any assignment dates yet.</p>

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

onclick="openDate('${item.date}')"

onmousedown="startDateHold('${item.id}')"

ontouchstart="startDateHold('${item.id}')"

onmouseup="cancelDateHold()"

ontouchend="cancelDateHold()">

<div class="date-left">

<div class="date-title">

📅 ${item.date}

</div>

<div class="date-count">

📄 ${count} Assignment${count !== 1 ? "s" : ""}

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
// CREATE DATE
// ==========================

async function createDate() {
    
    const input =
        document.getElementById("newDate");
    
    if (!input) return;
    
    const date =
        input.value.trim();
    
    if (date === "") {
        
        showToast("Please enter a date.","warning");
        
        return;
        
    }
    
    const success =
        await insertData(
            
            "assignment_dates",
            
            {
                
                date: date
                
            }
            
        );
    
    if (success) {
        
        input.value = "";
        
        closeDatePopup();
        
        await loadDates();
        
    } else {
        
        showToast("Failed to create date.","error");
        
    }
    
}


// ==========================
// OPEN DATE
// ==========================

function openDate(date) {
    
    setCurrentDate(date);
    
    window.location.href =
        "assignment-date.html";
    
}


// ==========================
// DELETE DATE
// ==========================

async function deleteDate(id) {
    
    const success =
        await deleteData(
            
            "assignment_dates",
            
            id
            
        );
    
    if (success) {
        
        await loadDates();
        
    } else {
        
        showToast("Delete failed.","error");
        
    }
    
}


// ==========================
// LONG PRESS
// ==========================

let dateHoldTimer;

function startDateHold(id) {
    
    if (getRole() !== "teacher")
        return;
    
    dateHoldTimer =
        setTimeout(() => {
            
            if (confirm("Delete this date?")) {
                
                deleteDate(id);
                
            }
            
        }, 1000);
    
}

function cancelDateHold() {
    
    clearTimeout(dateHoldTimer);
    
}