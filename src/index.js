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
  const form = document.querySelector("form")
  form.addEventListener("submit", createToy)
  fetchToys()
});

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {renderToys(data)
    }).catch(error)
}

const renderToys = (toyObj) => {
  const toyCollection = document.querySelector("#toy-collection")
  toyObj.forEach(toy => {
    let divEle = document.createElement("div")
    divEle.className = "card"
    divEle.id = toy.id
    let header = document.createElement("h2")
    header.innerText = toy.name
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    let likes = document.createElement("p")
    likes.innerText = `${toy.likes} Likes`
    let button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "Like <3"
    button.addEventListener("click", likeToy)
  
    divEle.append(header, img, likes, button)
    toyCollection.appendChild(divEle)
  })
}


const createToy = (event) => {
  let toyName = event.target[0].value
  let toyImage = event.target[1].value
  let toyObj = {

    "name": toyName,
    "image": toyImage,
    "likes": 0
  }
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  }).catch(error)
  
}

const likeToy = (event) => {
  let objID = event.target.parentNode.id
  let likeString = event.target.parentNode.querySelector("p").textContent
  let likeValue = parseInt(likeString) + 1
  fetch(`http://localhost:3000/toys/${objID}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
  
    body: JSON.stringify({
    "likes": likeValue
    })
  }).catch(error)
  let likes = event.target.parentNode.querySelector("p")
  likes.innerText = `${likeValue} Likes`
  event.preventDefault()
}

const error = () => {
  alert("ERROR: SERVER IS DOWN")
}