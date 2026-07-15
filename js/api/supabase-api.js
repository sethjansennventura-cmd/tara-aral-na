// ======================================
// Tara Aral Na!
// Supabase API v2.2
// ======================================


// ======================================
// CONFIGURATION
// ======================================

const SUPABASE_URL =
"https://fdgmdelmombrbprvoflq.supabase.co";

const SUPABASE_KEY =
"sb_publishable_eTtRykqptEmsUR9iBXJiwA_PYs4Nkqc";

const HEADERS = {

    apikey: SUPABASE_KEY,

    Authorization:
    "Bearer " + SUPABASE_KEY,

    "Content-Type":
    "application/json"

};


// ======================================
// TEST CONNECTION
// ======================================

async function testSupabase(){

    try{

        const response = await fetch(

            SUPABASE_URL +
            "/rest/v1/assignment_dates?select=id&limit=1",

            {

                method:"GET",

                headers:HEADERS

            }

        );


        return response.ok;

    }catch(error){

        showToast(
    "You're offline. Showing saved data.",
    "info"
);

        return false;

    }

}


// ======================================
// GENERIC DATABASE FUNCTIONS
// ======================================

async function getData(table) {
    
    const cacheKey = "cache_" + table;
    
    try {
        
        const response = await fetch(
            
            SUPABASE_URL +
            "/rest/v1/" +
            table +
            "?select=*",
            
            {
                
                method: "GET",
                
                headers: HEADERS
                
            }
            
        );
        
        if (!response.ok) {
            
            throw new Error("Supabase request failed");
            
        }
        
        const data = await response.json();
        
        // Save latest data for offline use
        localStorage.setItem(
            cacheKey,
            JSON.stringify(data)
        );
        
        return data;
        
    } catch (error) {
        
        console.log(
            "Offline mode: Loading cached " + table
        );
        
        const cached =
            localStorage.getItem(cacheKey);
        
        if (cached) {
            
            return JSON.parse(cached);
            
        }
        
        return [];
        
    }
    
}


async function insertData(table, data) {
    
    try {
        
        const response = await fetch(
            
            SUPABASE_URL +
            "/rest/v1/" +
            table,
            
            {
                method: "POST",
                
                headers: {
                    ...HEADERS,
                    Prefer: "return=representation"
                },
                
                body: JSON.stringify(data)
                
            }
            
        );
        
        const result = await response.text();
        
        alert(
            "Status: " + response.status +
            "\n\n" + result
        );
        
        return response.ok;
        
    } catch (error) {
        
        alert(error.message);
        
        return false;
        
    }
    
}


async function deleteData(table,id){

    try{

        const response = await fetch(

            SUPABASE_URL +
            "/rest/v1/" +
            table +
            "?id=eq." +
            id,

            {

                method:"DELETE",

                headers:HEADERS

            }

        );

        return response.ok;

    }catch(error){

        console.error(error);

        return false;

    }

}

// ======================================
// GET FILTERED DATA
// ======================================

async function getFilteredData(table, date, subject) {
    
    const cacheKey = "cache_" + table;
    
    try {
        
        const response = await fetch(
            
            SUPABASE_URL +
            "/rest/v1/" +
            table +
            "?date=eq." +
            encodeURIComponent(date) +
            "&subject=eq." +
            encodeURIComponent(subject) +
            "&select=*",
            
            {
                
                method: "GET",
                
                headers: HEADERS
                
            }
            
        );
        
        if (!response.ok) {
            
            throw new Error();
            
        }
        
        const data = await response.json();
        
        localStorage.setItem(
            cacheKey,
            JSON.stringify(data)
        );
        
        return data;
        
    } catch (error) {
        
        const cached =
            JSON.parse(
                localStorage.getItem(cacheKey) || "[]"
            );
        
        return cached.filter(item =>
            item.date === date &&
            item.subject === subject
        );
        
    }
    
}


// ======================================
// ASSIGNMENT FUNCTIONS
// ======================================

async function uploadAssignmentFile(file){

    return new Promise((resolve)=>{

        const fileName =
        Date.now() + "_" + file.name;

        const xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            SUPABASE_URL +
            "/storage/v1/object/assignments/" +
            encodeURIComponent(fileName)
        );

        xhr.setRequestHeader(
            "apikey",
            SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Authorization",
            "Bearer " + SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Content-Type",
            file.type
        );

        const progressBox =
        document.getElementById("uploadProgressBox");

        const progress =
        document.getElementById("uploadProgress");

        const percent =
        document.getElementById("uploadPercent");

        if(progressBox){

            progressBox.style.display = "block";

            progress.value = 0;

            percent.innerHTML = "0%";

        }

        xhr.upload.onprogress = function(e){

            if(e.lengthComputable){

                const value =
                Math.round(
                    (e.loaded / e.total) * 100
                );

                if(progress){

                    progress.value = value;

                }

                if(percent){

                    percent.innerHTML =
                    value + "%";

                }

            }

        };

        xhr.onload = function(){

            if(progressBox){

                progress.value = 100;

                percent.innerHTML = "100%";

                setTimeout(function(){

                    progressBox.style.display = "none";

                },800);

            }

            if(xhr.status >= 200 &&
               xhr.status < 300){

                resolve({

                    url:
                    SUPABASE_URL +
                    "/storage/v1/object/public/assignments/" +
                    fileName,

                    fileName:fileName

                });

            }else{

                showToast(xhr.responseText, "error");

                resolve(null);

            }

        };

        xhr.onerror = function(){

            if(progressBox){

                progressBox.style.display = "none";

            }

            showToast("Upload failed.", "error");

            resolve(null);

        };

        xhr.send(file);

    });

}

// ======================================
// LECTURE FUNCTIONS
// ======================================

async function uploadLectureStorageFile(file){

    return new Promise((resolve)=>{

        const fileName =
        Date.now() + "_" + file.name;

        const xhr =
        new XMLHttpRequest();

        xhr.open(

            "POST",

            SUPABASE_URL +
            "/storage/v1/object/lectures/" +
            encodeURIComponent(fileName)

        );

        xhr.setRequestHeader(
            "apikey",
            SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Authorization",
            "Bearer " + SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Content-Type",
            file.type
        );

        const progressBox =
        document.getElementById(
            "uploadProgressBox"
        );

        const progress =
        document.getElementById(
            "uploadProgress"
        );

        const percent =
        document.getElementById(
            "uploadPercent"
        );

        if(progressBox){

            progressBox.style.display =
            "block";

            progress.value = 0;

            percent.innerHTML = "0%";

        }

        xhr.upload.onprogress =
        function(e){

            if(e.lengthComputable){

                const value =
                Math.round(

                    (e.loaded / e.total) * 100

                );

                progress.value = value;

                percent.innerHTML =
                value + "%";

            }

        };

        xhr.onload =
        function(){

            if(progressBox){

                progress.value = 100;

                percent.innerHTML =
                "100%";

                setTimeout(function(){

                    progressBox.style.display =
                    "none";

                },800);

            }

            if(xhr.status >= 200 &&
               xhr.status < 300){

                resolve({

                    url:
                    SUPABASE_URL +
                    "/storage/v1/object/public/lectures/" +
                    fileName,

                    fileName:fileName

                });

            }else{

                showToast(xhr.responseText, "error");

                resolve(null);

            }

        };

        xhr.onerror =
        function(){

            if(progressBox){

                progressBox.style.display =
                "none";

            }

            showToast("Upload failed.", "error");

            resolve(null);

        };

        xhr.send(file);

    });

}
// ======================================
// REVIEWER FUNCTIONS
// ======================================

// Upload Reviewer File
async function uploadReviewerStorageFile(file){

    return new Promise((resolve)=>{

        const fileName =
        Date.now() + "_" + file.name;

        const xhr =
        new XMLHttpRequest();

        xhr.open(

            "POST",

            SUPABASE_URL +
            "/storage/v1/object/reviewers/" +
            encodeURIComponent(fileName)

        );

        xhr.setRequestHeader(
            "apikey",
            SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Authorization",
            "Bearer " + SUPABASE_KEY
        );

        xhr.setRequestHeader(
            "Content-Type",
            file.type
        );

        const progressBox =
        document.getElementById(
            "uploadProgressBox"
        );

        const progress =
        document.getElementById(
            "uploadProgress"
        );

        const percent =
        document.getElementById(
            "uploadPercent"
        );

        if(progressBox){

            progressBox.style.display =
            "block";

            progress.value = 0;

            percent.innerHTML = "0%";

        }

        xhr.upload.onprogress =
        function(e){

            if(e.lengthComputable){

                const value =
                Math.round(
                    (e.loaded / e.total) * 100
                );

                progress.value = value;

                percent.innerHTML =
                value + "%";

            }

        };

        xhr.onload =
        function(){

            if(progressBox){

                progress.value = 100;

                percent.innerHTML =
                "100%";

                setTimeout(function(){

                    progressBox.style.display =
                    "none";

                },800);

            }

            if(xhr.status >= 200 &&
               xhr.status < 300){

                resolve({

                    url:
                    SUPABASE_URL +
                    "/storage/v1/object/public/reviewers/" +
                    fileName,

                    fileName:fileName

                });

               }else{

    showToast(xhr.responseText, "error");

    resolve(null);

}
        };

        xhr.onerror =
        function(){

            if(progressBox){

                progressBox.style.display =
                "none";

            }

            showToast("Upload failed.", "error");

            resolve(null);

        };

        xhr.send(file);

    });

}


// Delete Reviewer
async function deleteReviewer(id){

    try{

        const response =
        await fetch(

            SUPABASE_URL +
            "/rest/v1/reviewers?id=eq." +
            id,

            {

                method:"DELETE",

                headers:HEADERS

            }

        );

        return response.ok;

    }catch(error){

        showToast(error.message, "error");

        return false;

    }

}
// Delete Assignment
async function deleteAssignment(id) {

    try {

        const response =
            await fetch(

                SUPABASE_URL +
                "/rest/v1/assignments?id=eq." +
                id,

                {

                    method: "DELETE",

                    headers: {
                        ...HEADERS,
                        Prefer: "return=representation"
                    }

                }

            );

        return response.ok;

    } catch (error) {

        showToast(error.message, "error");

        return false;

    }

}
// Delete Lecture
async function deleteLecture(id){

    try{

        const response =
        await fetch(

            SUPABASE_URL +
            "/rest/v1/lectures?id=eq." +
            id,

            {

                method:"DELETE",

                headers:HEADERS

            }

        );

        return response.ok;

    }catch(error){

        showToast(error.message,"error");

        return false;

    }

}
// ======================================
// UPDATE DATA
// ======================================

async function updateData(table, id, data){

    try{

        const response = await fetch(

            SUPABASE_URL +
            "/rest/v1/" +
            table +
            "?id=eq." +
            id,

            {

                method:"PATCH",

                headers:HEADERS,

                body:JSON.stringify(data)

            }

        );

        return response.ok;

    }catch(error){

        showToast(error.message, "error");

        return false;

    }

}
// ======================================
// DELETE STORAGE FILE
// ======================================

async function deleteStorageFile(bucket,fileName){

    try{

        const response =
        await fetch(

            SUPABASE_URL +
            "/storage/v1/object/" +
            bucket +
            "/" +
            encodeURIComponent(fileName),

            {

                method:"DELETE",

                headers:{

                    apikey:SUPABASE_KEY,
                    Authorization:"Bearer " + SUPABASE_KEY

                }

            }

        );

        return response.ok;

    }catch(error){

        showToast(error.message, "error");

        return false;

    }

}
// ==========================
// ANNOUNCEMENTS
// ==========================

async function getAnnouncements(){

    return await getData(
        "announcements"
    );

}

async function createAnnouncement(title,message){

    return await insertData(
        "announcements",
        {
            title:title,
            message:message
        }
    );

}

async function updateAnnouncement(id,title,message){

    return await updateData(
        "announcements",
        id,
        {
            title:title,
            message:message
        }
    );

}

async function removeAnnouncement(id){

    return await deleteData(
        "announcements",
        id
    );

}