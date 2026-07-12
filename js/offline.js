// ======================================
// OFFLINE CACHE
// ======================================

const FILE_CACHE =
    "tara-aral-na-files-v1";

// ==========================
// SAVE FILE
// ==========================

async function cacheFile(url){

    try{

        const cache =
            await caches.open(FILE_CACHE);

        const existing =
            await cache.match(url);

        if(existing){

            return;

        }

        const response =
            await fetch(url);

        if(response.ok){

            await cache.put(
                url,
                response.clone()
            );

        }

    }

    catch(error){

        console.log(
            "Cache failed:",
            error
        );

    }

}

// ==========================
// GET FILE
// ==========================

async function getCachedFile(url){

    try{

        const cache =
            await caches.open(FILE_CACHE);

        const cached =
            await cache.match(url);

        if(cached){

            const blob =
                await cached.blob();

            return URL.createObjectURL(blob);

        }

    }

    catch(error){

        console.log(error);

    }

    return null;

}