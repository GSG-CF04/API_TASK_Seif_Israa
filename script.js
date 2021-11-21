
const app=document.getElementById('app')
const heading = document.createElement('h1')
heading.textContent = 'Shopping Store'
app.appendChild(heading)
const categories=document.createElement('div')
categories.setAttribute('class','categories')
categories.innerHTML =`<button data-class="all" class="cat-type active">All</button>`
app.appendChild(categories)
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
fetch('https://fakestoreapi.com/products/categories')
.then(res =>res.json())
.then(data => data.forEach(element => {
  categories.innerHTML +=`<button data-class="${element}" class="cat-type">${element}</button>`
  let prodType=document.querySelectorAll('.categories button')
for (let i=0 ;i<prodType.length;i++){
  prodType[i].onclick = function(){                
    // remove class from sibling
    var el = prodType[0];
    while(el)
    {
        if(el.tagName === "BUTTON"){
            //remove class
            el.classList.remove("active");   
        }
        // pass to the new sibling
        el = el.nextSibling;
    }
  this.classList.add("active"); 
  let dataClass=prodType[i].getAttribute('data-class')
  let prod=document.querySelectorAll('.product')
  if (dataClass === 'all') {
          prod.forEach(ele => {ele.style.display='block'})
    } 
    else {
      prod.forEach(ele => { ele.style.display='none'})
      console.log(dataClass)
      if (dataClass =="men's clothing") {
        dataClass="men"
      }
      if (dataClass =="women's clothing") {
        dataClass="women"
      }
      let dataClassElement=document.querySelectorAll(`.${dataClass}`)
      dataClassElement.forEach(ele => { ele.style.display='block'})
    } 
};
}
}))
.catch(err => alert(err))
fetch('https://fakestoreapi.com/products')
.then(res =>res.json())
.then(data => data.forEach(element => {
  if (element.category =="men's clothing") {
    cards.innerHTML +=`  <div class="product men">
        <img src="${element.image}"/>
        <h2>${element.title}</h2>
        <span class="price">${element.price}$</span>
        <button class="add-to-card" onclick="addToProductShop(${element.price},${element.id})">Add to Card</button>
        </div>`
  }
  else if (element.category =="women's clothing") {
    cards.innerHTML +=`<div class="product women">
        <img src="${element.image}"/>
        <h2>${element.title}</h2>
        <span class="price">${element.price}$</span>
        <button class="add-to-card" onclick="addToProductShop(${element.price},${element.id})">Add to Card</button>
        </div>`
  }else {
        cards.innerHTML +=`<div class="product ${element.category}">
        <img src="${element.image}"/>
        <h2>${element.title}</h2>
        <span class="price">${element.price}$</span>
        <button class="add-to-card" onclick="addToProductShop(${element.price},${element.id})">Add to Card</button>
        </div>`
      }
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
const btn = document.createElement("button");
btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
btn.onclick = function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  };
btn.id = "myBtn";
document.body.appendChild(btn);
mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


