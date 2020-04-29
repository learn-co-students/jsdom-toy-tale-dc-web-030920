let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const form = document.querySelector("form")
  fetchToys()
  
  form.addEventListener("submit", handleForm)
});

// When the page loads, make a 'GET' request to fetch all the toy objects. 
// With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

function fetchToys() {
  const divCol = document.getElementById("toy-collection")
  divCol.innerText = ""
  console.log("Toys Fetched")
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => renderToys(toy)))
}

function renderToys(toy) {
  const divCol = document.getElementById("toy-collection")
  const divCard = document.createElement("div")
  divCard.className = "card"
  divCard.id = `${toy.id}`
  const h2Toy = document.createElement("h2")
  h2Toy.innerText = toy.name
  const toyImg = document.createElement("img")
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"
  const toyP = document.createElement("p")
  toyP.innerText = `${toy.likes} Likes`
  const button = document.createElement("button")
  button.className = "like-btn"
  button.innerText = "Like <3"
  button.addEventListener("click", () => handleLikes(event, toy))
  const deleteButton = document.createElement("button")
  deleteButton.className = "delete-btn"
  deleteButton.innerText = "Delete"

  divCol.appendChild(divCard)
  divCard.append(h2Toy, toyImg, toyP, button, deleteButton)
  
  deleteButton.addEventListener("click", () => handleDelete(event))
}

// When a user clicks on the add new toy button, a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.

function handleForm(event) {
  event.preventDefault()
  console.log("Form Works")

  const form = document.querySelector("form")

  const nameInput = event.target.childNodes[3].value
  const imageInput = event.target.childNodes[7].value

  const obj = {
    name: nameInput,
    image: imageInput,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json"
    },
    body: JSON.stringify(obj)
  }).then(resp => resp.json())
  .then(fetchToys())
  form.reset()
}

function handleDelete(event){
  console.log("Delete Button Working")
  
  const deleteParent = event.target.parentElement
  const id = event.target.parentElement.id
  deleteParent.remove()
  
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE"
  })
  // debugger
}

// When a user clicks on a toy's like button, two things should happen:

function handleLikes(event, toy) {
  console.log("Likes Button Works")

  let p = event.target.previousElementSibling
  const id = event.target.parentElement.id

  const obj = {
    likes: ++toy.likes
  }
  //server 
    fetch(`http://localhost:3000/toys/${id}`, {
      // update the server
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
      body: JSON.stringify(obj)

    })
      .then( resp => resp.json())
      // show the increase in likes on the DOM
      .then (currentToy => p.innerText = `${toy.likes} likes`)
}