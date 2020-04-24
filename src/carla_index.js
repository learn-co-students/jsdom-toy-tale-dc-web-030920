let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  fetchToys();
  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", makePostReq)
});
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toyArray =>
      toyArray.forEach(toy => {
        renderToy(toy)
      })
    )
}
function renderToy(toy) {
  // create card
  let div = document.createElement("div")
  div.className = "card"
  //img
  let img = document.createElement("img")
  img.className = "toy-avatar"
  img.src = toy.image
  //btn
  let btn = document.createElement("button")
  btn.className = "like-btn"
  btn.innerText = "Like <3"
  btn.id = toy.id//created an ID for my toy "card"
  //h2 tag
  let h2 = document.createElement("h2")
  h2.innerText = toy.name
  //p tag
  let p = document.createElement("p")
  p.innerText = toy.likes
  // append card to toy-collection div
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(div)
  //append all attributes to card
  div.append(img, btn, h2, p)
  //needs page to render before addding listner. put in same function that renders button
  btn.addEventListener("click", addLike)
}
function makePostReq(event) {
  event.preventDefault()
  var inputName = document.querySelector("input[name = name]").value
  var inputImg = document.querySelector("input[name = image]").value
  let obj = {
    name: inputName,
    image: inputImg,
    likes: 2
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  }).then(response => response.json())
    .then(toyData => renderToy(toyData))
}
function addLike(event) {
  event.preventDefault() // this prevents the page from reloading
  let btnId = event.currentTarget.id
  var divCard = document.getElementById(btnId).parentElement
  var pLikes = divCard.querySelector("p").innerText
  var addOne = parseInt(pLikes) + 1
  fetch(`http://localhost:3000/toys/${btnId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": addOne
    })
  }).then(response => response.json())
  .then(toyData => renderToy(toyData))
}