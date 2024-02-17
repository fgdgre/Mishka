"use strict";

function toggleMenu() {
  if (document.querySelector(".page-nav__list").classList.contains("hidden")) {
    document.querySelector(".page-nav__list").classList.remove("hidden");
  } else {
    document.querySelector(".page-nav__list").classList.add("hidden");
  }
}
