// Handle the sliding cuisine tabs
const cuisineTabBox = document.querySelector(".cuisines .tabs-bar");
const cuisineArrowIcons = document.querySelectorAll(".cuisines .icon i");

const handleCuisineIcon = () => {
  let scrollVal = Math.round(cuisineTabBox.scrollLeft);
  let maxScrollWidth = cuisineTabBox.scrollWidth - cuisineTabBox.clientWidth;
  cuisineArrowIcons[0].parentElement.style.display =
    scrollVal > 0 ? "flex" : "none";
  cuisineArrowIcons[1].parentElement.style.display =
    maxScrollWidth > scrollVal ? "flex" : "none";
};

cuisineArrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    cuisineTabBox.scrollLeft += icon.id === "left-cuisine" ? -350 : 350;
    setTimeout(() => handleCuisineIcon(), 50);
  });
});
// Handle the sliding dishes tabs
const dishesTabBox = document.querySelector(".dishes .tabs-bar");
const dishesArrowIcons = document.querySelectorAll(".dishes .icon i");

const handleDishIcon = () => {
  let scrollVal = Math.round(dishesTabBox.scrollLeft);
  let maxScrollWidth = dishesTabBox.scrollWidth - dishesTabBox.clientWidth;
  dishesArrowIcons[0].parentElement.style.display =
    scrollVal > 0 ? "flex" : "none";
  dishesArrowIcons[1].parentElement.style.display =
    maxScrollWidth > scrollVal ? "flex" : "none";
};

dishesArrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    dishesTabBox.scrollLeft += icon.id === "left-dishes" ? -350 : 350;
    setTimeout(() => handleDishIcon(), 50);
  });
});


// Handling cuisine tabs
const cuisineTabs = document.querySelectorAll(".cuisines .tab");

cuisineTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const isActive = tab.classList.contains("active");
    cuisineTabs.forEach((otherTab) => {
      otherTab.classList.remove("active");
    });
    if (!isActive) {
      tab.classList.add("active");
    }
  });
});

// Handling dishes tabs
const dishesTabs = document.querySelectorAll(".dishes .tab");

dishesTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const isActive = tab.classList.contains("active");
    dishesTabs.forEach((otherTab) => {
      otherTab.classList.remove("active");
    });
    if (!isActive) {
      tab.classList.add("active");
    }
  });
});