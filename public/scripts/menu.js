// appears on opening the window
window.onload = function () {
    gettingDates(0);
    viewItemsByWeek("week1");
    SelectB("B1");
};

function printWarning(elementID, hintMSG) {
    document.getElementById(elementID).innerHTML = hintMSG;
}

// print modal
function Details(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Add event listener to close the modal when clicking outside of it
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};


function toggleAdd(button) {
    const icon = button.querySelector("i");
    const itemId = button.getAttribute("data-id");

    // If currently plus → add to cart
    if (icon.classList.contains("fa-plus")) {
        addToCart(button); // your existing function for adding
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
    } 
    // If currently minus → remove from cart
    else {
        removeFromCart(itemId); // you'll need a remove function
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
    }
}

// Example removeFromCart
function removeFromCart(itemId) {
    // Send request to backend to remove from cart
    fetch('/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemID: itemId })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}


function SelectB(buttonID) {
    let Allbuttons = document.querySelectorAll(".buttons button");
    Allbuttons.forEach((button) => {
        button.classList.remove("selectedB");
    });

    let selected = document.getElementById(buttonID);
    selected.classList.add("selectedB");
}

function viewItemsByWeek(weekNumber) {
    let Allitems = document.querySelectorAll(".items");
    Allitems.forEach((Dishes) => {
        Dishes.style.display = "none";
    });

    let itemsPerWeek = document.querySelectorAll("." + weekNumber);
    itemsPerWeek.forEach((Dishes) => {
        Dishes.style.display = "block";
    });
}

function gettingDates(sDay) {
    let currDate = new Date();
    let dateOfStarting = new Date(currDate);
    dateOfStarting.setDate(dateOfStarting.getDate() + sDay);

    let dateOfEnding = new Date(dateOfStarting);
    dateOfEnding.setDate(dateOfEnding.getDate() + 6);

    let start = dateFormat(dateOfStarting);
    let end = dateFormat(dateOfEnding);

    document.getElementById("titleM").textContent =
        "MENU FOR " + start + " - " + end;
}

function dateFormat(date) {
    let day = date.getDate();
    let month = date.toLocaleString("default", { month: "short" });
    return (day < 10 ? "0" : "") + day + "" + month;
}

// favourite
function changeFavouriteC(itemID, week) {
    let heart = document.getElementById("icon" + itemID + week);
    if (heart.style.color === "red") {
        heart.style.color = "grey";
    } else {
        heart.style.color = "red";
    }
}
// after adding to cart message
function showMessage(message) {
    let msg = document.querySelectorAll(".message");
    msg.forEach((messg) => {
        messg.textContent = message;
        messg.style.display = "block";
    });
    setTimeout(closeMessage, 3000);
}

function closeMessage() {
    let message = document.querySelector(".message");
    message.style.display = "none";
}

// cart window
function openWindow(iconToOpen) {
    document.getElementById(iconToOpen).style.display = "flex";
    if (iconToOpen === "overlayFav") {
        viewCart();
    }
}

function addToCart(button) {
    let mealID = button.getAttribute("data-id");
    let mealName = button.getAttribute("data-name");

    let itemModal = document.getElementById("detailsModal" + mealName);
    let allItems = $(".modal");
    let cart = $("#cartContent");
    let cList = $("#orderSumm");

    if (cList.children().length === 0) {
        cart.text("");
    }

    console.log(mealID);

    $.ajax({
        type: "POST",
        url: "/menu/validate-cart",
        contentType: "application/json",
        data: JSON.stringify({ itemID: mealID, operation: "validate-cart" }),
        success: function (response) {
            allItems.each(function () {
                if ($(this).is(itemModal)) {
                    let itemName = $(this).find("#itemName").text();
                    let itemImgSrc = $(this).find("img").attr("src");

                    $("#headerC").css("display", "flex");

                    let listItem = $("<div>").addClass("list-of-items");

                    let removeIcon = $("<i>")
                        .addClass("fa-solid fa-circle-xmark fa-lg remove-icon")
                        .click(function () {
                            removeFromCart(itemName);
                        });

                    let itemImg = $("<img>")
                        .attr("src", itemImgSrc)
                        .addClass("cart-item-img");

                    let itemNameElement = $("<span>")
                        .text(itemName)
                        .addClass("item-name");

                    let quantityDiv = $("<div>").addClass("quantity-cart");

                    let plusButton = $("<button>")
                        .addClass("cart-plusButton")
                        .html('<i class="fa-solid fa-plus fa-lg"></i>')
                        .click(function () {
                            incrementQuantity(quantityInput);
                        });

                    let quantityInput = $("<input>")
                        .addClass("input")
                        .attr("type", "text")
                        .attr("name", "name")
                        .val("1");

                    let minusButton = $("<button>")
                        .addClass("cart-minusButton")
                        .html('<i class="fa-solid fa-minus fa-lg"></i>')
                        .click(function () {
                            decrementQuantity(quantityInput);
                        });

                    quantityDiv.append(minusButton, quantityInput, plusButton);
                    listItem.append(
                        removeIcon,
                        itemImg,
                        document.createTextNode(itemName),
                        quantityDiv
                    );

                    cList.append(listItem);
                }
            });
            showMessage("Added to cart succesfully");
        },
        error: function (xhr) {
            showMessage("You have reached the limit of items for your plan. Orders have been created.");
        },
    });
}

function toggleFavorite(button) {
    let mealID = button.getAttribute("data-id");
    let mealName = button.getAttribute("data-name");
    let iconElement = document.getElementById("icon" + mealID);

    $.ajax({
        type: "POST",
        url: "/menu/toggle-favorite",
        contentType: "application/json",
        data: JSON.stringify({ itemID: mealID, operation: "toggle-favorite" }),
        success: function(response) {
            if (response.isFavorite) {
                iconElement.style.color = "#ff0000"; // Change color to red
            } else {
                iconElement.style.color = "#7c7e82"; // Change color to grey
            }
            showMessage(response.message);
        },
        error: function(xhr) {
            showMessage("Error: " + xhr.responseText);
        }
    });
}

function incrementQuantity(input) {
    let currValue = parseInt(input.value);
    input.value = currValue + 1;
}

function decrementQuantity(input) {
    let currValue = parseInt(input.value);
    if (currValue > 1) {
        input.value = currValue - 1;
    }
}

function removeFromCart(itemName) {
    let cartList = document.querySelectorAll("#orderSumm .list-of-items");

    cartList.forEach((item) => {
        let name = item.querySelector("img").nextSibling.textContent;
        if (name === itemName) {
            item.remove();
        }
    });
    let cList = document.getElementById("orderSumm");
    if (cList.children.length === 0) {
        let cart = document.getElementById("cartContent");
        cart.innerHTML =
            '<i class="fa-solid fa-cart-shopping fa-xl" style="color: #147186;"></i> Your Cart Is Empty,<br> Please Add Items.';

        let header = document.getElementById("headerC");
        header.style.display = "none";
    }
}

function viewCart() {
    let selectedItem = document.querySelectorAll("#itemName");
    selectedItem.forEach((item) => {
        item.style.display = "block";
    });
}

function closeWindow(iconToClose) {
    document.getElementById(iconToClose).style.display = "none";
}

/*Nutrition accordion */
document.addEventListener("DOMContentLoaded", function () {
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
            const accordionContent = header.nextElementSibling;
            const icon = header.querySelector("i");

            header.classList.toggle("active");

            if (header.classList.contains("active")) {
                accordionContent.style.maxHeight =
                    accordionContent.scrollHeight + "px";
                icon.classList.replace("fa-plus", "fa-minus");
            } else {
                accordionContent.style.maxHeight = "0";
                icon.classList.replace("fa-minus", "fa-plus");
            }

            accordionHeaders.forEach((otherHeader) => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove("active");
                    otherHeader.nextElementSibling.style.maxHeight = "0";
                    otherHeader
                        .querySelector("i")
                        .classList.replace("fa-minus", "fa-plus");
                }
            });
        });
    });
});

//   Table indicator
document.addEventListener("DOMContentLoaded", function () {
    const nutritionTables = document.querySelectorAll(".nutritionTable"); // Changed to querySelectorAll with class

    nutritionTables.forEach((nutritionTable) => {
        const rows = nutritionTable.querySelectorAll("tbody tr");

        rows.forEach((row) => {
            const nutrient = row
                .querySelector("td:first-child")
                .textContent.trim();
            const amountString = row
                .querySelector("td:nth-child(2)")
                .textContent.trim();

            const amountMatch = amountString.match(
                /(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?/
            );
            let amount = 0;
            if (amountMatch) {
                amount = parseFloat(amountMatch[1]);
            }

            const dailyIntake = {
                Calories: 2000,
                Protein: 50,
                Fat: 70,
                Carbohydrates: 310,
                Cholesterol: 300,
                Sodium: 2300,
            };

            // Calculate percenatge
            const dvPercentage = calculateDV(amount, dailyIntake[nutrient]);

            const indicatorDiv = row.querySelector(
                "td:nth-child(3) .indicator"
            );
            const indicatorText = row.querySelector(
                "td:nth-child(3) .indicator-text"
            );
            setIndicator(indicatorDiv, indicatorText, dvPercentage);
        });
    });

    function calculateDV(amount, dailyIntake) {
        if (dailyIntake === 0) return 0;
        return Math.round((amount / dailyIntake) * 100);
    }

    function setIndicator(indicator, indicatorText, percentage) {
        if (percentage <= 25) {
            indicator.style.backgroundColor = "rgb(111, 213, 8)";
            indicatorText.textContent = "Low";
        } else if (percentage <= 75) {
            indicator.style.backgroundColor = "orange";
            indicatorText.textContent = "Moderate";
        } else {
            indicator.style.backgroundColor = "rgb(233, 45, 45)";
            indicatorText.textContent = "High";
        }
    }
});
