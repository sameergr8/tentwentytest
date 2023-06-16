const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

const setActiveImage = () => {
  const carouselImages = carousel.querySelectorAll("img");
  const carouselWidth = carousel.clientWidth;
  const carouselScrollLeft = carousel.scrollLeft;
  const carouselCenter = carouselScrollLeft + carouselWidth / 2;

  carouselImages.forEach((image) => {
    const imageOffsetLeft = image.offsetLeft;
    const imageWidth = image.offsetWidth;
    const imageCenter = imageOffsetLeft + imageWidth / 2;

    if (
      imageCenter >= carouselCenter - imageWidth / 2 &&
      imageCenter <= carouselCenter + imageWidth / 2
    ) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => {
      showHideIcons();
      setActiveImage(); // Call the setActiveImage function after scrolling
    }, 60);
  });
});

const autoSlide = () => {
  if (
    carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
    carousel.scrollLeft <= 0
  )
    return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }

  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  setActiveImage(); // Update the active image during dragging
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

// Set active image on initial load
setActiveImage();
