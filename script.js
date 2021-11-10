"use strict";

/******************  Variables  ******************/
const btnAdd = document.getElementById("btnAdd");
const btnHistory = document.getElementById("btnHistory");
const btnBack = document.getElementById("btnBack");
const content = document.getElementById("content");
const secMain = document.getElementById("section-main");
const secAdd = document.getElementById("section-add");
const secHistory = document.getElementById("section-history");
const form = document.getElementById("adding-form");
const list = document.getElementById("subject-list");

let state = "main";

/******************  Functions  ******************/
const btnAddFunc = () => {
  btnBack.classList.remove("hidden");
  secMain.style.transform = "translate(100vw)";
  secAdd.style.transform = "translate(0)";
  state = "add";
};

const btnHistoryFunc = () => {
  btnBack.classList.remove("hidden");
  secMain.style.transform = "translate(-100vw)";
  secHistory.style.transform = "translate(0)";
  state = "history";

  fetch("http://192.168.1.188:3000/read/")
    .then((res) => res.json())
    .then((r) => loadHistory(r));
};

const btnBackFunc = () => {
  btnBack.classList.add("hidden");
  secMain.style.transform = "translate(0)";

  switch (state) {
    case "add":
      secAdd.style.transform = "translate(-100vw)";
      break;
    case "history":
      secHistory.style.transform = "translate(100vw)";
      break;
  }
};

const loadHistory = (response) => {
  const items = response.split("--").map((r) => r.split("&&"));
  items.shift();
  list.innerHTML = "";
  items.forEach((item) =>
    list.insertAdjacentHTML("beforeend", template(item[0], item[2]))
  );
};

const template = (heading, url = "") => {
  return `<li id="subject-item" class="center">
    <h3 class="history-name">${heading}</h3>
    ${url && '<a class="history-url btn center" href="' + url + '">Link</a>'}
  </li>`;
};
/******************  Events ******************/
btnAdd.addEventListener("click", btnAddFunc);
btnHistory.addEventListener("click", btnHistoryFunc);
btnBack.addEventListener("click", btnBackFunc);
