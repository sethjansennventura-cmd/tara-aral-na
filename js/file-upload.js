// ======================================
// FILE UPLOADER
// ======================================

async function uploadFile(config){

    const title =
    document.getElementById("fileTitle")
    .value.trim();

    const type =
    document.getElementById("fileType")
    .value;

    const file =
    config.getFile();

    if(title===""){

    showToast("Please enter a title.","warning");

    return;

}

    if(!file){

    showToast("Please select a file.","warning");

    return;

}

    const subject =
    new URLSearchParams(window.location.search)
    .get("subject");

    const date =
    getCurrentDate();

    const upload =
    await config.upload(file);

    if(!upload){

    showToast("Upload failed.","error");

    return;

}

    const success =
    await insertData(

        config.table,

        {

            date,

            subject,

            title,

            type,

            file_url:upload.url,

            file_name:upload.fileName

        }

    );

    if(!success){

        showToast("Database save failed.","error");

        return;

    }
    

    document.getElementById("fileTitle").value="";

    document.getElementById("fileInput").value="";

    closePopup();

    showToast("Upload Complete!","success");

    config.refresh();

}