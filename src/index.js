let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });
  fetchToys()
  toyForm.addEventListener("submit", handleForm)
});

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyArray => toyArray.forEach(toy =>{renderToy(toy)}))
}

function renderToy(toy){
  const div = document.createElement("div")
  div.classList.add("card")

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const image = document.createElement("img")
  image.src = toy.image
  image.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  const btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.innerText = "Like ❤️"
  btn.addEventListener("click", () => likeToy(toy.id, p))

  div.append(h2, image, p, btn)
  
  const container = document.getElementById("toy-collection")
  container.append(div)
}

function handleForm(event){
  event.preventDefault()

  const bodyInfo = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(bodyInfo)
  })
  .then(response => response.json())
  .then(toy => {
    console.log(toy)
    renderToy(toy)
  })
}

function likeToy(toyId, pTag){
  const likes = pTag.innerText
  const likeValue = parseInt(likes) + 1
  pTag.innerText = `${likeValue} Likes`
  
  const like = {
    likes: likeValue
  }
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(like)
  })
}

const error = () => {
  alert("ERROR: SERVER IS DOWN")
}