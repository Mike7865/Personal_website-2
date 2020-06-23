const myForm = document.querySelector("#form");
const form__btn = document.querySelector("#form-container__btn");

form__btn.addEventListener("click", function (event) {
  event.preventDefault();

  if (validateForm(myForm)) {
    let data = new FormData();
    data.append("name", myForm.elements.name.value);
    data.append("phone", myForm.elements.name.value);
    data.append("comment", myForm.elements.name.value);
    data.append("to", "mshar50055@gmail.com");
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
    form__btn.disabled = true;
    xhr.addEventListener("load", () => {
      form__btn.disabled = false;
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

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  if (!validateField(form.elements.comment)) {
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