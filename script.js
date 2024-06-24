const form = document.querySelector(".form");
const bill = document.getElementById("bill");
const tipOptions = document.querySelector(".form-tip-options");
const customTip = tipOptions.children[tipOptions.children.length - 1];
const people = document.getElementById("people");
const resultTip = document.querySelector(".result-amount.tip");
const resultTotal = document.querySelector(".result-amount.total");
const resetBtn = document.querySelector(".reset-btn");
const labelError = document.querySelector(".label-error");

const state = {
  bill: 0,
  tip: 0,
  people: 1,
};

const updateState = () => {
  if (!isNaN(state.tip) && state.people !== 0) {
    resultTip.textContent = `$${(
      ((state.tip / 100) * state.bill) /
      state.people
    ).toFixed(2)}`;
    resultTotal.textContent = `$${(
      (state.bill + (state.tip / 100) * state.bill) /
      state.people
    ).toFixed(2)}`;
  }

  resetBtn.classList.remove("completed");
};

bill.addEventListener("input", (e) => {
  state.bill = +e.target.value;

  updateState();
});

tipOptions.addEventListener("click", (e) => {
  for (const child of tipOptions.children) {
    if (child !== e.target) child.classList.remove("completed");
    if (child === e.target && child !== customTip)
      child.classList.add("completed");
  }

  state.tip = Number(e.target.value.slice(0, -1));

  updateState();
});

customTip.addEventListener("input", (e) => {
  state.tip = +e.target.value;

  updateState();
});

people.addEventListener("input", (e) => {
  state.people = +e.target.value;

  if (state.people === 0) {
    people.parentElement.classList.add("error");
    labelError.classList.remove("hidden");
    return;
  }

  labelError.classList.add("hidden");
  people.parentElement.classList.remove("error");

  updateState();
});

resetBtn.addEventListener("click", () => {
  state.bill = 0;
  state.tip = 0;
  state.people = 1;

  updateState();

  resetBtn.classList.add("completed");
  bill.value = "";
  people.value = "";
  customTip.value = "";
  for (const child of tipOptions.children) child.classList.remove("completed");
});
