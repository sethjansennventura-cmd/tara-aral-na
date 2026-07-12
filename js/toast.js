// ======================================
// Tara Aral Na!
// toast.js
// ======================================

function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    if (!container) return;

    const toast =
        document.createElement("div");

    toast.className =
        "toast " + type;

    let icon = "✔";

    if (type === "error") {

        icon = "✖";

    }

    else if (type === "warning") {

        icon = "⚠";

    }

    else if (type === "info") {

        icon = "ℹ";

    }

    toast.innerHTML = `

<span class="toast-icon">

${icon}

</span>

<span class="toast-message">

${message}

</span>

`;

    container.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 10);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}