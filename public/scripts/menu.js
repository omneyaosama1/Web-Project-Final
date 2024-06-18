

// appears on opening the window
window.onload = function () {
    gettingDates(0);
    viewItemsByWeek('week1');
    SelectB('B1');
}

function printWarning(elementID, hintMSG) {
    document.getElementById(elementID).innerHTML = hintMSG;
}

// print modal
function Details(modalID, itemName, itemDescription) {

    var itemModal = document.getElementById(modalID);
    var name = itemModal.querySelector("#itemName");
    var description = itemModal.querySelector("#itemDescription");

    name.textContent = itemName;
    description.textContent = itemDescription;
    itemModal.style.display = "block";
}

function closeModal(modalID) {
    var modal = document.getElementById(modalID);
    modal.style.display = "none";
}



function SelectB(buttonID) {
    var Allbuttons = document.querySelectorAll('.buttons button');
    Allbuttons.forEach(button => {
        button.classList.remove('selectedB');
    });

    var selected = document.getElementById(buttonID);
    selected.classList.add('selectedB');
}


function viewItemsByWeek(weekNumber) {
    var Allitems = document.querySelectorAll('.items');
    Allitems.forEach(Dishes => {
        Dishes.style.display = 'none';
    });

    var itemsPerWeek = document.querySelectorAll('.' + weekNumber);
    itemsPerWeek.forEach(Dishes => {
        Dishes.style.display = "block";
    });
}


function gettingDates(sDay) {
    var currDate = new Date();
    var dateOfStarting = new Date(currDate);
    dateOfStarting.setDate(dateOfStarting.getDate() + sDay);


    var dateOfEnding = new Date(dateOfStarting);
    dateOfEnding.setDate(dateOfEnding.getDate() + 6);

    var start = dateFormat(dateOfStarting);
    var end = dateFormat(dateOfEnding);

    document.getElementById('titleM').textContent = "MENU FOR " + start + " - " + end;
}


function dateFormat(date) {
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'short' });
    return (day < 10 ? '0' : '') + day + '' + month;
}


// favourite
function changeFavouriteC(itemID, week) {
    var heart = document.getElementById('icon' + itemID + week);
    if (heart.style.color == "red") {
        heart.style.color = "grey";
   

    }
    else {
        heart.style.color = "red";


    }
}


// Search

function searchValidate(form) {
    var searchInput = form.querySelector('#SearchW').value.trim();
    var regex=/^[a-zA-Z\s]+$/;
    if (searchInput === "") {
        printWarning("errorMsg", "Please enter an item's name.");
        return false;
    }
    else if(!regex.test(searchInput)){
            printWarning("errorMsg", "Please enter a valid name.");
            return false;
        }
       else{
        printWarning("errorMsg","");
        return true;
       }
    }

function searchItem() {
    var searchInput = document.getElementById('SearchW').value.toLowerCase().trim();
    var weeks = ['week1', 'week2', 'week3', 'week4'];
    var currWeek = null;

    document.querySelectorAll('.buttons button').forEach((button, index) => {
        if (button.classList.contains('selectedB')) {
            currWeek = weeks[index];
        }
    });


    if (currWeek) {
        var Allitems = document.querySelectorAll('.items.' + currWeek);

        Allitems.forEach(item => {
            var itemName = item.textContent.toLowerCase().trim();
            if (itemName.includes(searchInput) || searchInput === '') {
                item.style.display = 'block';
                item.classList.remove('animation');
            } else {
                item.style.display = 'none';
            }
        });
    }
}


// Cart
function addToCart(itemID, week) {
    var itemModal = document.getElementById('detailsModal' + itemID + week);
    var allItems = document.querySelectorAll('.modal');
    var cart = document.getElementById('cartContent');
    var cList = document.getElementById('orderSumm');

    if (cList.children.length === 0) {
        cart.textContent = "";
    }

    allItems.forEach(item => {
        if (item === itemModal) {
            var itemName = item.querySelector('#itemName').textContent;
            var itemImgSrc = item.querySelector('img').getAttribute('src');

            var header = document.getElementById('headerC');
            header.style.display = "flex";



            var listItem = document.createElement('li');
            listItem.style.display = "flex";


            
            var minusIcon=document.createElement('i');
            minusIcon.className="fa-solid fa-minus fa-xl";
            minusIcon.style.color="#646973";
            minusIcon.style.marginTop="3%";
            minusIcon.style.marginLeft="10%";
            minusIcon.onclick=function()
            {
                removeFromCart(itemName);
            }

            var itemImg = document.createElement('img');
            itemImg.src = itemImgSrc;

            itemImg.style.width = "50px";
            itemImg.style.height = "50px";
            itemImg.style.marginRight = "40px";
            itemImg.style.marginLeft = "40px";
            listItem.appendChild(itemImg);




            // Append the item name text content, not the element itself
            listItem.appendChild(document.createTextNode(itemName));
            listItem.appendChild(minusIcon);

            cList.appendChild(listItem);
        }
    });
    showMessage();
}

function removeFromCart(itemName)
{
   var cartList=document.querySelectorAll('#orderSumm li');

   cartList.forEach(item=>{
var name=item.querySelector('img').nextSibling.textContent;
if(name===itemName)
    {
        item.remove();
    }
   });
}

function viewCart() {

    var selectedItem = document.querySelectorAll('#itemName');
    selectedItem.forEach(item => {
        item.style.display = "block";
    });

}


// after adding to cart message
function showMessage() {
    var msg = document.querySelectorAll('.message');
    msg.forEach(messg => {
        messg.style.display = "block";
    });
    setTimeout(closeMessage, 6000);

}

function closeMessage() {
    var message = document.querySelector('.message');
    message.style.display = "none";
    setTimeout(closeMessage, 3000);
}


// feedback
function showBox() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    const feedbackContent = document.getElementById("feedbackContent");
    feedbackContent.style.display = "block";
    feedbackContent.style.zIndex = "1000";
}

function showTextArea() {
    const feedbackForm = document.getElementById("feedback");
    feedbackForm.style.display = "block";
}

function showFeedbackForm() {
    const feedbackForm = document.getElementById("feedback");
    feedbackForm.style.display =
        feedbackForm.style.display === "none" ? "block" : "none";
}

function exitFeedback() {
    const feedbackContent = document.getElementById("feedbackContent");
    feedbackContent.style.display = "none";

    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

function feedbackInput(form) {
    var review = form.review.value.trim();
    var reviewErr = document.getElementById("reviewErr");

    if (review === "") {
        printWarning("reviewErr", "Please enter your opinion before submitting");
        return false;
    } else {
        var regEx = /^[a-zA-Z0-9\s]+$/;
        if (!regEx.test(review)) {
            printWarning("reviewErr", "Please enter a valid review (letters, numbers, and spaces only)");
            return false;
        } else {
            printWarning("reviewErr", "");
            return true;
        }
    }
}




// cart window
function openWindow(iconToOpen) {
    document.getElementById(iconToOpen).style.display = "flex";
    if (iconToOpen === 'overlayFav') {
        viewFavs();

    }
    else {
        viewCart();
    }
}

function closeWindow(iconToClose) {
    document.getElementById(iconToClose).style.display = "none";
}


document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
  
    accordionHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const accordionContent = header.nextElementSibling;
        const icon = header.querySelector("i");
  

        header.classList.toggle('active');
  
        if (header.classList.contains('active')) {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          icon.classList.replace("fa-plus", "fa-minus");
        } else {
          accordionContent.style.maxHeight = '0';
          icon.classList.replace("fa-minus", "fa-plus");
        }
  
        accordionHeaders.forEach(otherHeader => {
          if (otherHeader !== header) {
            otherHeader.classList.remove('active');
            otherHeader.nextElementSibling.style.maxHeight = '0';
            otherHeader.querySelector("i").classList.replace("fa-minus", "fa-plus");
          }
        });
      });
    });
  });
  

//   Table indicator
document.addEventListener('DOMContentLoaded', function() {
    const nutritionTable = document.querySelector('.nutritionTable');
    const rows = nutritionTable.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const nutrient = row.querySelector('td:first-child').textContent.trim();
      const amountString = row.querySelector('td:nth-child(2)').textContent.trim();

      const amountMatch = amountString.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?/);
      let amount = 0;
      if (amountMatch) {
        amount = parseFloat(amountMatch[1]);
      }

      const dailyIntake = {
        'Calories': 2000,
        'Protein': 50,
        'Fat': 70,
        'Carbohydrates': 310,
        'Cholesterol': 300,
        'Sodium': 2300
      };

      // Calculate percentage
      const dvPercentage = calculateDV(amount, dailyIntake[nutrient]);

       const indicatorDiv = row.querySelector('td:nth-child(3) .indicator');
      const indicatorText = row.querySelector('td:nth-child(3) .indicator-text');
      setIndicator(indicatorDiv, indicatorText, dvPercentage);
    });

    function calculateDV(amount, dailyIntake) {
      if (dailyIntake === 0) return 0; 
      return Math.round((amount / dailyIntake) * 100);
    }

    function setIndicator(indicator, indicatorText, percentage) {
      if (percentage <= 25) {
        indicator.style.backgroundColor = 'lawngreen';
        indicatorText.textContent = 'Low';
      } else if (percentage <= 75) {
        indicator.style.backgroundColor = 'orange';
        indicatorText.textContent = 'Moderate';
      } else {
        indicator.style.backgroundColor = 'red';
        indicatorText.textContent = 'High';
      }
    }
  });