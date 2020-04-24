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
  let submit = document.querySelector(".submit")
  submit.addEventListener("click", toyform )
  
  
});

  function fetchToys(){
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toyArr => renderToys(toyArr) )
  }

  function renderToys(array){
    array.forEach( toy => toyElements(toy))
  }



    function likeClick(event){
      event.preventdefault

      let id = this.parentNode.id
      // debugger
      let number = event.target.previousElementSibling.innerText
      ++number
      var likes = {
        likes: number
       
      }

      // create an { list: thing} to send to JSON.stringify
      fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(likes)
    })
    .then(response => response.json())
    .then(event.target.previousElementSibling.innerText = number )
  }
  function toyElements(toy){
    let toyColNode = document.getElementById("toy-collection")
    let toyDivNode = document.createElement("div")
    let headNode = document.createElement("h2")
    let imgNode = document.createElement("img")
    let pNode = document.createElement("p")
    let buttonNode = document.createElement("button")
    toyColNode.append(toyDivNode)
    toyDivNode.append(headNode, imgNode, pNode, buttonNode)
    
    headNode.innerText = toy.name
    imgNode.src = toy.image
    pNode.innerText = toy.likes
    buttonNode.innerText = "like"
    toyDivNode.className = "card"
    toyDivNode.id = toy.id
    buttonNode.className="like-btn"
    buttonNode.addEventListener("click", likeClick)
    imgNode.style = "width: 300px"

    // *actual
    // <div class="card" id="1">
    // <h2>Woody</h2>
    // <img src="reallylong.url" >
    // <p>13</p>
    // <button class="like-btn">like</button>
    // </div>
    
    // * expected
    //   <div class="card">
    //   <h2>Woody</h2>
    //   <img src=toy_image_url class="toy-avatar" />
    //   <p>4 Likes </p>
    //   <button class="like-btn">Like <3</button>
    //   </div>

    


    // toyColNode.appendChild(child)
  }

  function toyform(){
    var toy = {
      name: document.querySelector(".input-text").value,
      image: document.querySelectorAll(".input-text")[1].value,
      likes: 0
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    .then(newToy => {
      toyElements(newToy)
    })
  }





  // <input
  //         type="text"
  //         name="name"
  //         value=""
  //         placeholder="Enter a toy's name..."
  //         class="input-text"
  //       />
  //       <br />
  //       <input
  //         type="text"
  //         name="image"
  //         value=""
  //         placeholder="Enter a toy's image URL..."
  //         class="input-text"
  //       />