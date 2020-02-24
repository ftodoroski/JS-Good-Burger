document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = 'http://localhost:3000/burgers' 
  const burgerMenu = document.querySelector('#burger-menu')

  fetch(BASE_URL).then(response => response.json()).then(data => data.forEach(item => {
    const divBurger = document.createElement('div')
    divBurger.className = 'burger'
    divBurger.innerHTML = `
        <h3 class="burger_title">${item.name}</h3>
        <img src="${item.image}">
        <p class="burger_description">${item.description}</p>
        <button class="button">Add to Order</button>
    `  

    burgerMenu.append(divBurger)
  }))
  
  
  document.addEventListener('click', event => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const description = document.querySelector('input[name="description"]').value
    const image = document.querySelector('input[name="url"]').value
    const submit = document.querySelector('[data-type]').dataset.type  
    
    
    if (event.target.dataset.type === 'submit') {

      const customBurger = {
        name,
        description,
        image
      }
      
      const configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(customBurger)
      }
      
    return fetch(BASE_URL, configObj).then(response => response.json()).then(data => console.log(data))
    }
  })

  const order = document.querySelector('#order-list')
  
  document.addEventListener('click', event => {
    const li = document.createElement('li')
    
    
    if (event.target.className === 'button') {
      li.innerText = event.target.parentElement.childNodes[1].innerText    
      console.log(li);
      
      order.append(li)
    }
  })
})

