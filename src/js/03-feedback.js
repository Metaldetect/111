import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";

const refs = {
  form: document.querySelector(".feedback-form"),
  textarea: document.querySelector(".feedback-form textarea"),
  input: document.querySelector("input"),
};

let formData = {
  email: "",
  message: "",
};

populateTextarea();

refs.form.addEventListener("input", throttle(onTextareaInput, 500));
refs.form.addEventListener("submit", handleSubmit);

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const stringifiedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, stringifiedData);
}

function handleSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  console.log(formData);
}

function populateTextarea() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData) {
    return;
  }

  const { email, message } = savedData;
  refs.textarea.value = message || "";
  refs.input.value = email || "";
  formData = { email: email || "", message: message || "" };
}
