// const cardContainer = document.getElementById("container");
// const cardCountElem = document.getElementById("card-count");
// const cardTotalElem = document.getElementById("card-total");
// const loader = document.getElementById("loader");

// const cardLimit = 99;
// const cardIncrease = 3;
// const pageCount = Math.ceil(cardLimit / cardIncrease);
// let currentPage = 1;
// console.log("cardlimit", cardLimit);

// cardTotalElem.innerHTML = cardLimit;

// var throttleTimer;
// const throttle = (callback, time) => {
//     if (throttleTimer) return;

//     throttleTimer = true;

//     setTimeout(() => {
//         callback();
//         throttleTimer = false;
//     }, time);
// };

// const createCard = (index) => {
//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = index;
//     cardContainer.appendChild(card);
// };

// const addCards = (pageIndex) => {
//     currentPage = pageIndex;

//     const startRange = (pageIndex - 1) * cardIncrease;
//     const endRange =
//         currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

//     cardCountElem.innerHTML = endRange;

//     for (let i = startRange + 1; i <= endRange; i++) {
//         createCard(i);
//     }
// };

// const handleInfiniteScroll = () => {
//     console.log("triggering");
//     throttle(() => {
//         const endOfPage =
//             window.innerHeight + window.pageYOffset >=
//             document.body.offsetHeight;

//         if (endOfPage) {
//             addCards(currentPage + 1);
//         }

//         if (currentPage === pageCount) {
//             removeInfiniteScroll();
//         }
//     }, 1000);
// };

// const removeInfiniteScroll = () => {
//     loader.remove();
//     window.removeEventListener("scroll", handleInfiniteScroll);
// };

// window.onload = function () {
//     addCards(currentPage);
// };

// window.addEventListener("scroll", handleInfiniteScroll);
