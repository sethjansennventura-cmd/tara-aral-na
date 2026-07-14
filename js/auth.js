// ======================================
// Tara Aral Na!
// auth.js
// ======================================

// ----------------------
// AUTO LOGIN
// ----------------------

if (
    window.location.pathname.endsWith("index.html") &&
    getRole()
) {
    
    window.location.href = "dashboard.html";
    
}

// ----------------------
// LOGIN
// ----------------------

async function login() {
    
    const code =
        document.getElementById("accessCode").value.trim();
    
    const message =
        document.getElementById("message");
    
    message.innerHTML = "";
    
    // ----------------------
    // TEACHER
    // ----------------------
    
    if (code === "1122") {
    
    alert("Teacher login started");
    
    setRole("teacher");
    
    alert("Role saved");
    
   // await registerForPush();
    
    alert("Push registration finished");
    
    showToast("Welcome!", "success");
    
    setTimeout(function() {
        
        window.location.href = "dashboard.html";
        
    }, 800);
    
    return;
}
    
    // ----------------------
    // STUDENT
    // ----------------------
    
    if (code === "0000") {
        
        setRole("student");
        
       // await registerForPush();
        
        showToast(
            "Welcome, Student!",
            "success"
        );
        
        setTimeout(function() {
            
            window.location.href = "dashboard.html";
            
        }, 800);
        
        return;
        
    }
    
    message.innerHTML = "Invalid Access Code.";
    
    showToast(
        "Invalid Access Code.",
        "error"
    );
    
}

// ----------------------
// LOGOUT
// ----------------------

function logout() {
    
    showToast(
        "Tap Logout again to confirm.",
        "warning"
    );
    
    if (window.logoutConfirm) {
        
        removeRole();
        
        window.location.href = "index.html";
        
    }
    
    window.logoutConfirm = true;
    
    setTimeout(function() {
        
        window.logoutConfirm = false;
        
    }, 3000);
    
}

// ----------------------
// PAGE PROTECTION
// ----------------------

function protectPage() {
    
    if (!getRole()) {
        
        window.location.href = "index.html";
        
    }
    
}