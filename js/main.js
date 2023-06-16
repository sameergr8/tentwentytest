function initializeSlider() {
  var images = document.querySelectorAll(".slider img");
  var thumbnailsContainer = document.querySelector(".thumbnails");
  var currentIndex = 0;
  var autoplayTimer;
  var totalSlides = images.length;
  var currentSlideElement = document.getElementById("currentSlide");
  var totalSlidesElement = document.getElementById("totalSlides");

  function showImage(index) {
    if (index >= 0 && index < images.length) {
      for (var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
      }
      images[index].style.display = "block";
      currentIndex = index;

      // Show thumbnail of the next image
      var nextIndex = (index + 1) % images.length;
      var thumbnails = document.querySelectorAll(".thumbnail");
      for (var i = 0; i < thumbnails.length; i++) {
        if (i === nextIndex) {
          thumbnails[i].classList.remove("hide");
        } else {
          thumbnails[i].classList.add("hide");
        }
      }

      // Update slide number
      currentSlideElement.textContent = index + 1;
    }
  }

  function nextImage() {
    var newIndex = currentIndex + 1;
    if (newIndex >= images.length) {
      newIndex = 0;
    }
    showImage(newIndex);
  }

  function generateThumbnails() {
    for (var i = 0; i < images.length; i++) {
      var thumbnail = document.createElement("div");
      thumbnail.classList.add("thumbnail");
      if (i !== 1) {
        thumbnail.classList.add("hide");
      }
      var thumbnailImage = document.createElement("img");
      thumbnailImage.src = images[i].src;
      thumbnailImage.alt = "Thumbnail " + (i + 1);
      thumbnailImage.addEventListener("click", showImage.bind(null, i));
      thumbnail.appendChild(thumbnailImage);
      thumbnailsContainer.appendChild(thumbnail);
    }
  }

  function startAutoplay() {
    autoplayTimer = setInterval(nextImage, 10000); // Change slide every 2 seconds
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  // Show the first image initially
  showImage(0);

  // Generate thumbnails
  generateThumbnails();

  // Set total slides
  totalSlidesElement.textContent = totalSlides;

  // Start autoplay when the page loads
  startAutoplay();

  // Pause autoplay when hovering over the slider
  document.querySelector(".slider").addEventListener("mouseover", stopAutoplay);
  document.querySelector(".slider").addEventListener("mouseout", startAutoplay);
}

// Wait for the DOM to load before initializing the slider
document.addEventListener("DOMContentLoaded", initializeSlider);
