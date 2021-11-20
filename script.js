
const app=document.getElementById('app')
const heading = document.createElement('h1')
heading.textContent = 'Shopping Store'
app.appendChild(heading)
const shopping=document.createElement('div')
shopping.setAttribute('class','shopping')
app.appendChild(shopping)
shopping.innerHTML = `  <button type="button" id="shopping" class="btn-shop"><i class="fas fa-shopping-cart"></i></button>
<div class="product-shop">
    <table>
        <thead>
            <tr>
                <th>Quantity</th>
                <th>price</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <hr>
    <div class="total">
        <span>Total</span>
        <span id="total">0$</span>
    </div>
</div>`

let shoppingIcon=document.getElementById('shopping')
let procutShop=document.querySelector('.product-shop')
shoppingIcon.addEventListener('click',()=>{     
   procutShop.classList.toggle('blocked')
})
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