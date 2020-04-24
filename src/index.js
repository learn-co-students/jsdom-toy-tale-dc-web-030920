let addToy = false;
//-----------------------------------DOCUMENT LOAD -----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded")
  fecthAllToys();

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

  // get createNewToy upon submiting  form
  const addForm = document.querySelector("form")
  addForm.addEventListener("submit", handelAddToy)

});
//-----------------------------------HANDLE TOY -----------------------------------------------------

  // when adding a toy, server => updates the data to have new toy 
  //                 DOM => should show the new toy
function handelAddToy(event){
  event.preventDefault();

  var toyObj = {
    name: document.querySelector("#name").value,
    image: document.querySelector("#image").value,
    likes: 0 
  }
  fetch ("http://localhost:3000/toys", {
   
    //add the to the server with medthod =Post 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then( resp => resp.json())
  // show the new toy on the DOM
  .then( toy => renderToys(toy) 
  )
  
}
//-----------------------------------FEATCH ALL TOYS -----------------------------------------------------

// When I load the page, I want to Get all the toys fro mthe server and 
// manuplate my DOM to display the toys in  this <div class="card">
function fecthAllToys() {
  return fetch("http://localhost:3000/toys") // fetech the data from http://localhost:3000/toys
  .then( resp => resp.json()) // change it to JSON and call a method that rendeds toys in the DOM
  .then( toys => { toys.forEach((toy) => { renderToys(toy) })
  })
  
}
//-----------------------------------RENDER TOYS -----------------------------------------------------

function renderToys(toy){

  let divNode = document.getElementById("toy-collection") // get div with this id id="toy-collection"
    
    //create a div with class= "card" that is a child of divNode
    let divCard = document.createElement("div")
    divCard.className = "card"
    divNode.appendChild(divCard)
    
    //create h2 that is a child of divCard and has the name
    let h2Node = document.createElement("h2")
    h2Node.innerText = toy.name

    //img tag with the src of the toy's image attribute and the class name "toy-avatar"
    let imgNode = document.createElement("img")
    imgNode.className = "toy-avatar"
    imgNode.src = toy.image

    //creates p tage with how many likes that toy has 
    let pNode = document.createElement("p")
    pNode.innerText = `${toy.likes} likes`
    
    // create a button tag with class like-btn inside divcard
    let likeButton = document.createElement("button")
    likeButton.innerText = "Like <3"
    likeButton.className = "like-btn"

      // update number of likes upon clickin like 
    likeButton.addEventListener( "click", likeToy)

    divCard.append(h2Node, imgNode, pNode, likeButton)

    let formNode = document.querySelector(".add-toy-form")
    formNode.reset()


    let id = toy.id 

    //-----------------------------------Likes Toys-----------------------------------------------------

    // when like is clicked  server => update number of likes for that specfic toy 
    //                       DOM => shows the the increase in numbe of likes

    function likeToy(event){

      console.log("This clicked")
    //server 
      fetch(`http://localhost:3000/toys/${id}`, {
        // update the server
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          },
        body: JSON.stringify({likes: ++toy.likes})

      })
        .then( resp => resp.json())
        // show the increase in likes on the DOM
        .then (currentToy => pNode.innerText = `${toy.likes} likes`)
    }

    // --------------------------------Delete Toys-----------------------------------

    //create a delete button a child of div (card)  

    let deleteButton = document.createElement("button")
    deleteButton.class = "like-btn"
    deleteButton.innerText = "Delete Toy"
    divCard.appendChild(deleteButton)

    deleteButton.addEventListener("click", deleteToy)

    // when Delete is clicked  server => Deletes that specfic toy from the server 
    //                       DOM => doesn't show that specfic toy
    function deleteToy(event){

      fetch(`http://localhost:3000/toys/${id}`, {
        method: "DELETE"
      })
      .then( resp => resp.json())
      .then( toy => divCard.remove())
      
    }
}






