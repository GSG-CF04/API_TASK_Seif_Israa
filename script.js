
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
        <button class="add-to-card" onclick="addToProductShop(${element.price},${element.id})">Add to Card</button>
        </div>`
}))
.catch(err => alert(err))

 let tbody=document.querySelector('tbody')
const  addToProductShop = (price,id) => {
        console.log(5)
        let rows= document.querySelectorAll('table tbody tr')
        let quantity=document.getElementsByClassName('quantity') 
        if (rows.length == 0 ) {
                tbody.innerHTML += `<tr id ="${id}">
                <td class="quantity">1</td>
                <td class="price-shop">${price}$</td>
                <td> <button type="button" class="btn-remove" onclick="removeProduct(${id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`
        }else {
                 if(document.getElementById(`${id}`)) {
                        let quntityELment = document.getElementById(`${id}`).childNodes[1]
                        let quentityValue=quntityELment.innerText 
                        quentityValue = parseInt(quentityValue) + 1
                        quntityELment.innerText =quentityValue 
                }else {
                        tbody.innerHTML += `<tr id ="${id}">
                        <td class="quantity">1</td>
                        <td class="price-shop">${price}$</td>
                        <td> <button type="button" class="btn-remove" onclick="removeProduct(${id})"><i class="fas fa-trash-alt"></i></button></td>
                        </tr>`
                }
        }
    sumTotal();
}
const sumTotal = () => {
        let rows= document.querySelectorAll('table tbody tr')
        let total= document.getElementById('total')
        var sum=0
        for(var i=0; i < (rows.length) ; i++) {
            var row=rows[i]
            var priceElement=row.querySelector(`.price-shop`)
            var quantity=row.querySelector(`.quantity`).innerText
            var m = priceElement.innerText;
            var price=parseFloat(m.replace('$',''))
                sum = sum+(price*quantity)                 
        }
       total.innerText=sum.toFixed(2) +"$"
}

const removeProduct = (id) => {
        let deletedELment = document.getElementById(`${id}`);
        deletedELment.remove()
       sumTotal();
}