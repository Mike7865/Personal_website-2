//Scroll
const sections = $(".section");
const display = $(".wrapper");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
  elems
    .eq(elemNdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
};

const unBlockScroll = () => {
  setTimeout(() => {
    inscroll = false;
  }, 1300); // подождать пока завершится инерция на тачпадах
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";
    scrollViewport(direction);
  },
  keydown: e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;

      case 38:
        scrollViewport("prev");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
  e.preventDefault();
  performTransition(parseInt($(e.currentTarget).attr("data-scroll-to")));
});

// Hamburger-menu
var hamburgerButton = document.querySelector(".hamburger");
var hamburgerMenu = document.querySelector(".nav");

function closeHamburgerMenu() {
  hamburgerMenu.classList.remove("active");
  hamburgerButton.classList.remove("is-active");
}

function openHamburgerMenu() {
  hamburgerMenu.classList.add("active");
  hamburgerButton.classList.add("is-active");
}

hamburgerButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (hamburgerMenu.classList.contains("active")) {
    closeHamburgerMenu();
  } else {
    openHamburgerMenu();
  }
});

hamburgerMenu.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains(".nav_link")) {
    closeHamburgerMenu();
  }
});


// Слайдер
const left = document.querySelector("#left");
const right = document.querySelector("#right");
const feedback = document.querySelector(".feedback");
let feedbackItems = document.querySelectorAll(".feedback_item");

var currentRight = 0;
var minRight = 0;
var step = 100;
var maxRight = (feedbackItems.length - 1) * step;

feedback.style.right = currentRight + "%";

right.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentRight < maxRight) {
    currentRight += step;
    feedback.style.right = currentRight + "%";
  } else {
    currentRight = minRight;
    feedback.style.right = currentRight + "%";
  }
});

left.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentRight > minRight) {
    currentRight -= step;
    feedback.style.right = currentRight + "%";
  } else {
    currentRight = maxRight;
    feedback.style.right = currentRight + "%";
  }
});


// Оверлей
function createOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#overlayTemplate");
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector(".close");
  closeElement.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.removeChild(overlayElement);
  });

  const contentElement = overlayElement.querySelector(".overlay__content");
  contentElement.innerHTML = content;

  return overlayElement;
}


const myForm = document.querySelector("#form");
const formBtn = document.querySelector("#form-container__btn");

formBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm(myForm)) {
    let data = new FormData();
    data.append("name", myForm.elements.name.value);
    data.append("email", myForm.elements.name.value);
    data.append("message", myForm.elements.name.value);
    data.append("to", "mshar50055@gmail.com");
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://mishasharow@mail.ru");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
    formBtn.disabled = true;
    xhr.addEventListener("load", () => {
      formBtn.disabled = false;
      if (xhr.response.status) {
        console.log(xhr);
        const reviewsSuccessOverlay = createOverlay(xhr.response.message);
        document.body.appendChild(reviewsSuccessOverlay);
      }
    });
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.email)) {
    valid = false;
  }

  if (!validateField(form.elements.message)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return false;
  } else {
    field.nextElementSibling.textContent = "";
    return true;
  }
}