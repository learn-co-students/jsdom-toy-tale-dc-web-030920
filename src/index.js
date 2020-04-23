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
});
// we have to get a GET request to fetch all the toys
// with the response data make a div 
{/* <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div> */}
  //add each card to the tog div

document.addEventListener('DOMContentLoaded', function(){
  getToys()
  
})

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toysArray => toysArray.forEach(toy => renderToys(toy)) )
}

function renderToys(toy_obj){
  console.log(toy_obj)
  let div = document.createElement("div")
  div.classList.add("card")
  
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
  
  div.append(h2, img, p, btn)
  
  getToyDiv().appendChild(div)// we have to append the new div to the parent div
  
}

function getToyDiv(){
  return document.getElementById("toy-collection")
}