"use strict";

let comments = [
  {
    userImail: "@misssssiskras2",
    userName: "Анастасия Красильникова",
    comment:
      "Я молодая мама, но всё равно фотографии не набирали и близко такого количества лайков, как у популярных инстамамочек. В отчаянии, я накупила аксессуаров и игрушек в Мишке, и мои фотографии сразу стали более стильными, а также набирают больше лайков!",
  },
];

function toggleMenu() {
  document.querySelector(".page-nav__list").classList.toggle("hidden");
  document
    .querySelector(".page-nav__menu-image")
    .classList.toggle("page-nav__menu-image-active");
}

// (function addComments() {
//   for (const comment of comments) {
//     const commentEl = document.createElement("div");
//     commentEl.setAttribute("class", "reviews");
//     commentEl.innerHTML = `
//     <h1 class="main-header reviews__header">Отзывы</h1>
//         <button class="button reviews__button" type="button">Написать</button>
//         <p class="main__paragraph reviews__paragraph">
//          ${comment.comment}
//         </p>
//         <b class="reviews__user__name">${comment.userName}</b>
//         <p class="main__paragraph reviews__user__email">${comment.userImail}</p>
//         <div class="reviews__user__button-swiching__wrap">
//           <button
//             class="reviews__user__button-swiching reviews__user__button-swiching_border-right-size"
//           >
//             <svg
//               class="reviews__user__button-swiching__image"
//               width="50"
//               height="26"
//               viewBox="0 0 50 26"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M50 11H7.7L15.8 2.8L13 0L0 13L13 26L15.8 23.2L7.7 15H50V11Z"
//                 fill="black"
//               />
//             </svg>
//           </button>
//           <button
//             class="reviews__user__button-swiching reviews__user__button-swiching_border-left-size"
//           >
//             <svg
//               class="reviews__user__button-swiching__image reviews__user__button-swiching__image_reversed"
//               width="50"
//               height="26"
//               viewBox="0 0 50 26"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M50 11H7.7L15.8 2.8L13 0L0 13L13 26L15.8 23.2L7.7 15H50V11Z"
//                 fill="black"
//               />
//             </svg>
//           </button>
//         </div>
//     `;
//     document.querySelector(".reviews-section").appendChild(commentEl);
//   }
// })();

let swiper = new swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
