let addToy = false;



//  With the response data, make a <div class="card"> for each toy and add it 
//  to the toy-collection div.


// When the page loads, make a 'GET' request to fetch all the toy objects.
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
  form.addEventListener('submit', handleForm)

});


function handleForm(e){
e.preventDefault()
    let toyObj = {
      name: e.target.children[1].value,
      image: e.target.children[3].value,
      likes: "0"
    }
        fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(toyObj)
        })

        .then ((response) => {
          return response.json()
        })
        .then((toy) => {
          let form = document.querySelector(".add-toy-form")
          displayToy(toy)
          form.reset()
        })
      
};

function fetchToys(){
   fetch("http://localhost:3000/toys") 
    .then((response) => {
     return response.json()
    })
    .then((toysArray) => {
      toysArray.forEach( toy => displayToy(toy))
    })
}

function displayToy(toy){

  let div = document.createElement('div')
  div.className = "card"
  div.id = toy.id
  let toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(div)
  let h2 = document.createElement('h2')
  h2.innerText = toy.name 
  div.appendChild(h2)
  let img = document.createElement('img')
  img.className = "toy-avatar"
  img.src = toy.image
  div.appendChild(img)
  let p = document.createElement('p')
  let toyLikes = toy.likes
  p.innerText = `${toyLikes} likes`
  div.appendChild(p)
  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "like ♥️"
  div.appendChild(button)
  button.addEventListener('click', addLike)


  let deleteBtn = document.createElement('button')
  deleteBtn.className = "delete-btn"
  deleteBtn.innerText = "X"
  div.appendChild(deleteBtn)
  deleteBtn.addEventListener('click', deleteCard)


}

function deleteCard(e){
  let id = e.target.parentElement.id
  let card = e.target.parentElement
  fetch(`http://localhost:3000/toys/${id}` , {
  header: {"Content-Type":"application/json"},
  method: "DELETE",
  })
  .then(card.remove())
}




function addLike(e){
 let div = e.target.parentElement
 let likeNum = div.children[2].innerText.split(' ')[0] //  gives back a string "5", we must increment the string
likeToInt = Number(likeNum) + 1

      let id = event.target.parentElement.id
          fetch(`http://localhost:3000/toys/${id}`, {
          headers: {"Content-Type": "application/json"},
          method: "PATCH",      
          body: JSON.stringify({likes: likeToInt})
      })
      .then((response) => {
        return response.json()
      })
  
      .then((toy) => { 
        let divP = div.querySelector('p')
         divP.innerText = `${toy.likes} likes`
      })

};
