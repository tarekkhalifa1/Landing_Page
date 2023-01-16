/**
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */
// to create Navigation Sections
let navigationUlMenu = document.querySelector("#navbar__list");
let allSections = document.querySelectorAll("section");
for (let sec of allSections) {
  // to create li tag for every sec
  let linkSec = document.createElement("li");
  // insert a link tag to every li
  linkSec.innerHTML = `<a href="#${sec.id}" data-link="${sec.dataset.nav}" class="menu__link">${sec.dataset.nav}</a>`;
  // to add li to ul
  navigationUlMenu.appendChild(linkSec);
}
// to go to select section when click on it
let linkSecs = document.querySelectorAll("#navbar__list a");
linkSecs.forEach(function (linkSec) {
  linkSec.addEventListener("click", function (ev) {
    ev.preventDefault();
    let linkId = linkSec.getAttribute("href");
    // to get target id for sec
    let targetSec = document.querySelector(linkId);
    // to scoll smooth when click
    targetSec.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// to show active class
let evActive = new Event("active");
window.onscroll = function () {
  setTimeout(() => {
    for (let sec of allSections) {
      sec.dispatchEvent(evActive);
    }
  });
};

// to add or remove active class to sections
for (let sec of allSections) {
  sec.addEventListener("active", function () {
    let secActive = isOnScreen(this, -250);
    let linkSec = document.querySelector(`[data-link="${this.dataset.nav}"]`);
    if (!secActive) {
      this.classList.remove("active");
      linkSec.classList.remove("link__active");
    } else {
      this.classList.add("active");
      linkSec.classList.add("link__active");
    }
  });
}

// to check if section in the viewport
function isOnScreen(element, offset) {
  offset = typeof offset === "undefined" ? 0 : offset;
  let bounding = element.getBoundingClientRect();
  if (
    bounding.top >= offset &&
    bounding.left >= offset &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth) - offset &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
  ) {
    return true;
  } else {
    return false;
  }
}
// to create scroll up button
let scrollToTop = document.createElement("button");
// to show or hide button
function scrollUp() {
  scrollToTop.textContent = "up";
  scrollToTop.setAttribute("id", "top");
  scrollToTop.style.cssText = `
  display: none;
  position:fixed;
  background-color: blueviolet;
  color: white;
  bottom: 0;
  right: 5px;
  padding: 10px;
  border-radius: 50%; 
  `;
  document.body.appendChild(scrollToTop);
  // check if the user sroll up more than 300px
  if (window.scrollY >= 300) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }

  // to scroll to top when click
  function scrollToTopClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

// to invoke function
  scrollToTop.addEventListener("click", scrollToTopClick);
}
// Show or hide Up button when scrolling
document.addEventListener("scroll", scrollUp);