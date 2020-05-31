//Check If There Is Local Storage Color Option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  //Remove Active Class From All Colors List Items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      //Add Class Active
      element.classList.add("active");
    }
  });
}
// Random Background Option
let backgroundOption = true;
//Variable To Control The background Interval
let backgroundInterval;

//Check If There Is Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //Remove Active Class From All Span
  document.querySelectorAll(".reandom-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".reandom-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".reandom-backgrounds .no").classList.add("active");
  }
}

//seting box
var gear = document.querySelector(".toggle-settings i"),
  sittings = document.querySelector(".settings-box");
gear.onclick = function () {
  this.classList.toggle("fa-spin");
  sittings.classList.toggle("open");
};

//Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
//Loop on all list items
colorsLi.forEach((li) => {
  //Click on every list items
  li.addEventListener("click", (e) => {
    //Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //Set Color In Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    handelActive(e);
  });
});

//Switch Random Background option
const randomBackgroundElement = document.querySelectorAll(
  ".reandom-backgrounds span"
);
//Loop on all Spans
randomBackgroundElement.forEach((span) => {
  //Click on every Span
  span.addEventListener("click", (e) => {
    handelActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

//select landing page element
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgsArray = ["Study1.jpg", "Study2.jpg", "Study3.jpg", "Study4.jpg"];

//Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //Change Background Image url
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}
randomizeImgs();

/*Select Skills Selector*/
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skil Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  //Windo Height
  let windowHeight = this.innerHeight;

  //Window ScrollTop
  let windowScrollTop = this.pageYOffset;
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
  if (
    windowScrollTop >=
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  ) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
      skill.innerHTML = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "0px";
      skill.innerHTML = "";
    });
  }
};

//Creat Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Creat Overlay Element
    let overlay = document.createElement("div");
    //Add Class To Overlay
    overlay.className = "popup-overlay";
    //Append Overlay To Body
    document.body.appendChild(overlay);
    //Creat The Popup Box
    let popupBox = document.createElement("div");
    //Add Class To The Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      //Creat Heading
      let imgHeading = document.createElement("h3");
      //Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      //Append The Text To The Heading
      imgHeading.appendChild(imgText);
      //Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }
    //Create The Image
    let popupImage = document.createElement("img");
    //Set Image Source
    popupImage.src = img.src;

    //Add Image To Popup Box
    popupBox.appendChild(popupImage);
    //Append The Popup Box To Body
    document.body.appendChild(popupBox);

    //Create The close Span
    let closeButton = document.createElement("span");
    //Create The Close Button Text
    let closeButtonText = document.createTextNode("X");
    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    //Add Class To Close Button
    closeButton.className = "close-button";
    //Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);
  });
});
//Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //Remove The Curent Popup
    e.target.parentNode.remove();
    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All links
const allLinks = document.querySelectorAll(".links a");

function scroolToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scroolToSomeWhere(allBullets);
scroolToSomeWhere(allLinks);

//Handel Active State
function handelActive(ev) {
  //Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Active Class On Target
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handelActive(e);
  });
});

//Reset Button

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");

  //For reset The Local Storage There are two way :
  // 1- localStorage.clear(); Remove all data from localstorage
  //localStorage.clear();
  //2 - Remove way in the above

  //Reload Window
  window.location.reload();
};

//Toggle Menue

let toggleBtn = document.querySelector(".fa-bars");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function () {
  //Add Class menu-active
  this.classList.toggle("menu-active");
  //Add Class Open To Links
  tLinks.classList.toggle("open");
};

//Click AnyWhere Outside Menu And Toogle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    //Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      //Toggle Class menu-active
      toggleBtn.classList.toggle("menu-active");
      //Toggle Class Open To Links
      tLinks.classList.toggle("open");
    }
  }
});

//Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
