let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      //put listener here 
      
    } else {
      toyForm.style.display = "none";
    }
  });
  const form = document.querySelector("form")
  form.addEventListener("submit", addNewToy)
});

function addNewToy(event){

  let toy_obj = {
    "name": event.target.name.value,
    "image": event.target.image.value
  
  }
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json",
    Accept: "application/json"},
    body: JSON.stringify(toy_obj)

  })
  .then(response => response.json())
  .then(newToy => renderToys(newToy))
}
// we have to get a GET request to fetch all the toys
// with the response data make a div 
{/* <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div> */}
  //add each card to the tog div

  //we should add this event listener when the button is displayed

document.addEventListener('DOMContentLoaded', function(){
  getToys()
  
})
function snorLikes(){



}
function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toysArray => toysArray.forEach(toy => renderToys(toy)) )
}

function renderToys(toy_obj){
  console.log(toy_obj)
  let div = document.createElement("div")
  div.classList.add("card")
  // so when u render the page
  div.id = toy_obj.id 
  
  let h2 = document.createElement("h2")
  h2.innerText = toy_obj.name
  console.log(h2)

  let img = document.createElement("img")// here we have to put img 
  img.src = toy_obj.image 
  img.classList.add("toy-avatar")

  let p = document.createElement("p")
  p.innerText = `${toy_obj.likes} Likes`
  
  let btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.innerText = "Like <3"
  btn.addEventListener("click", snorLikes)
  
  div.append(h2, img, p, btn)
  
  getToyDiv().appendChild(div)// we have to append the new div to the parent div
  
}
function snorLikes(event){
//patch request
console.log(event.target)
let targetDiv = event.target.parentNode
let id = targetDiv.id 

var currentLikes = targetDiv.querySelector("p").textContent

currentLikes = parseInt(currentLikes.split(" ")[0])
currentLikes += 1


fetch(`http://localhost:3000/toys/${id}`, {
method: "PATCH",
headers:{
  "Content-Type": "application/json",
  Accept: "application/json"
},

body: JSON.stringify({
  "likes": currentLikes
})

})
var currentLikesNode = targetDiv.querySelector("p")
currentLikesNode.innerText = `${currentLikes} Likes`
event.preventDefault(currentLikes)
}

function getToyDiv(){
  return document.getElementById("toy-collection")
}