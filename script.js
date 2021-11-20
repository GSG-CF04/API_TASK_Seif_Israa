
const app=document.getElementById('app')
const heading = document.createElement('h1')
heading.textContent = 'Shopping Store'
app.appendChild(heading)
const cards=document.createElement('div')
cards.setAttribute('class','cards')
app.appendChild(cards)


fetch('https://fakestoreapi.com/products')
.then(res =>res.json())
.then(data => data.forEach(element => {
        cards.innerHTML +=`  <div class="product">
        <img src="${element.image}"/>
        <h2>${element.title}</h2>
        <p>${element.description}</p>
        <span class="price">${element.price}$</span>
        <button>Add to Card</button>
        </div>`
}))
.catch(err => alert(err))