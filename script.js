// ========================================
// IMAGE DATA
// ========================================

const images = [];


// ========================================
// 20 NATURE IMAGES
// ========================================

for (let i = 1; i <= 20; i++) {

    images.push({

        url: `https://loremflickr.com/800/600/nature?lock=${i}`,

        category: "nature"

    });

}


// ========================================
// 20 ANIMAL IMAGES
// ========================================

for (let i = 1; i <= 20; i++) {

    images.push({

        url: `https://loremflickr.com/800/600/animals?lock=${i}`,

        category: "animals"

    });

}


// ========================================
// 20 PLACE IMAGES
// ========================================

for (let i = 1; i <= 20; i++) {

    images.push({

        url: `https://loremflickr.com/800/600/places?lock=${i}`,

        category: "places"

    });

}


// ========================================
// VARIABLES
// ========================================

let currentIndex = 0;

let currentCategory = "all";


const gallery =
    document.getElementById("gallery");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");


// ========================================
// DISPLAY IMAGES
// ========================================

function displayImages(category = "all") {

    gallery.innerHTML = "";

    images.forEach((image, index) => {

        if (
            category === "all" ||
            image.category === category
        ) {

            const item =
                document.createElement("div");

            item.className =
                "gallery-item";


            item.innerHTML = `

                <img
                    src="${image.url}"
                    alt="${image.category}"
                    loading="lazy"
                    onclick="openLightbox(${index})"
                >

            `;


            gallery.appendChild(item);

        }

    });

}


// ========================================
// FILTER IMAGES
// ========================================

function filterImages(category) {

    currentCategory = category;

    displayImages(category);

}


// ========================================
// OPEN LIGHTBOX
// ========================================

function openLightbox(index) {

    currentIndex = index;

    lightboxImage.src =
        images[currentIndex].url;

    lightbox.style.display = "flex";

}


// ========================================
// CLOSE LIGHTBOX
// ========================================

function closeLightbox() {

    lightbox.style.display = "none";

}


// ========================================
// NEXT IMAGE
// ========================================

function nextImage() {

    let nextIndex =
        currentIndex + 1;


    if (nextIndex >= images.length) {

        nextIndex = 0;

    }


    // If category filter is selected,
    // find next image from same category

    if (currentCategory !== "all") {

        while (
            images[nextIndex].category !== currentCategory
        ) {

            nextIndex++;

            if (nextIndex >= images.length) {

                nextIndex = 0;

            }

        }

    }


    currentIndex = nextIndex;

    lightboxImage.src =
        images[currentIndex].url;

}


// ========================================
// PREVIOUS IMAGE
// ========================================

function previousImage() {

    let previousIndex =
        currentIndex - 1;


    if (previousIndex < 0) {

        previousIndex =
            images.length - 1;

    }


    if (currentCategory !== "all") {

        while (
            images[previousIndex].category !== currentCategory
        ) {

            previousIndex--;

            if (previousIndex < 0) {

                previousIndex =
                    images.length - 1;

            }

        }

    }


    currentIndex = previousIndex;

    lightboxImage.src =
        images[currentIndex].url;

}


// ========================================
// CLICK OUTSIDE LIGHTBOX
// ========================================

lightbox.addEventListener(
    "click",
    function(event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            lightbox.style.display === "flex"
        ) {

            if (event.key === "ArrowRight") {

                nextImage();

            }

            if (event.key === "ArrowLeft") {

                previousImage();

            }

            if (event.key === "Escape") {

                closeLightbox();

            }

        }

    }
);


// ========================================
// LOAD GALLERY
// ========================================

displayImages();
