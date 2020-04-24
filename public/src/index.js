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
  fetchToys()
  let toyForms = document.querySelector(".add-toy-form")
  toyForms.onsubmit = handleForm;
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then( toyArray => renderToys(toyArray))
}

function renderToys(array){
  let toyColNode = document.getElementById('toy-collection')
  array.forEach( toy => {
    addNewToy(toy);
  })
}

function addNewToy(toy){
  let toyColNode = document.getElementById('toy-collection')
  let toyNode = document.createElement('div');
  let headerNode = document.createElement("h2")
  let paraNode = document.createElement("p")
  let imgNode = document.createElement('img');
  let buttonNode = document.createElement('button');
  let delButton = document.createElement('button')
  let dislikeButton = document.createElement('button')
  headerNode.id = "toy-name"
  buttonNode.id = "like-btn"
  buttonNode.innerText= "Like 💛"
  buttonNode.onclick = addLikes;
  dislikeButton.id = "dislike-btn"
  dislikeButton.innerText = "Dislike 💔"
  dislikeButton.onclick = decrementLikes;
  paraNode.innerText = `${toy.likes} Likes`
  toyNode.className = "card";
  toyNode.id = toy.id
  imgNode.src = toy.image
  imgNode.style = "width: 300px"
  imgNode.id = "toy-img"
  headerNode.innerText = toy.name;
  delButton.innerText = "delete 🚫"
  delButton.style = "background-color: blue"
  dislikeButton.style = "background-color: purple"
  delButton.onclick = handleDelete;
  toyColNode.appendChild(toyNode)
  toyNode.append(headerNode, imgNode, paraNode, buttonNode, delButton, dislikeButton)
}
function handleForm() {
    event.preventDefault()
    // debugger
    var toyBody = {
    name: this.children[1].value,
    image: this.children[3].value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(toyBody)
  })
  .then(response => response.json())
  .then(newToy => addNewToy(newToy))
}

function handleDelete() {
  
  let id = this.parentElement.classList[0]
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "DELETE"
  }).then(response => response.json())
  .then(this.parentElement.remove())
  // .then(toyDelete => document.getElementById(id).remove())
  .catch(addError)
}

function addError() {
  alert("Error in Toy Deletion")
}

function addLikes() {
  // debugger
  event.preventDefault()
  let numLikes = parseInt(this.previousElementSibling.innerText);
  ++numLikes;
  var id = this.parentElement.classList[0]
  var likes = {
    likes: numLikes
}

fetch(`http://localhost:3000/toys/${id}`, {
  method: "PATCH",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(likes)
})
.then(response => response.json())
// .then(x => {debugger})
.then(this.previousElementSibling.innerText = `${numLikes} Likes`)
}

function decrementLikes() {
  // debugger
  event.preventDefault()
  let numDislikes = parseInt(this.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
  --numDislikes;
  // debugger
  let id = this.parentElement.classList[0]
  let Dislikes = {
    likes: numDislikes
}

fetch(`http://localhost:3000/toys/${id}`, {
  method: "PATCH",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(Dislikes)
})
.then(response => response.json())
.then(this.previousElementSibling.previousElementSibling.previousElementSibling.innerText = `${numDislikes} Likes`)
}






















{/* <form class="add-toy-form"></form>

type="text"
name="name"
type="text"
name="image" */}
// class="input-text"
//class="submit"



{/* <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div> */}


// On the index.html page, there is a div with the id "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects.
//  With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

// <div id="toy-collection"></div>