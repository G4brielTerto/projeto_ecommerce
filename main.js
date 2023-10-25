let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


cartIcon.onclick = () =>{
    cart.classList.add("active")
}

closeCart.onclick = () =>{
    cart.classList.remove("active")
} 

const produtos = [
    {
        id: 0,
        nome: 'boné',
        img: 'bone1.avif',
        preco: 25,
    },
    {
        id: 1,
        nome: 'camisa',
        img: 'camisa1.avif',
        preco: 40,
    },
    {
        id: 2,
        nome: 'chinelo',
        img: 'chinelo.avif',
        preco: 35,
    },
    {
        id: 3,
        nome: 'meia',
        img: 'meia.avif',
        preco: 25,
    },
    {
        id: 4,
        nome: 'tenis1',
        img: 'tenis1.avif',
        preco: 25,
    },
    {
        id: 5,
        nome: 'shorts',
        img: 'shorts.avif',
        preco: 25,
    },
    {
        id: 6,
        nome: 'tenis2',
        img: 'tenis2.avif',
        preco: 25,
    },
    {
        id: 7,
        nome: 'viseira',
        img: 'viseira.avif',
        preco: 25,
    },
]


inicializarloja = () => {
    var containerLoja = document.getElementById("content-shop")
    produtos.map((val)=>{
        //console.log(val.nome)
        
        containerLoja.innerHTML+=`
        
        <div class="product-box">
          <img src="`+val.img+`" alt="" class="product-img">
          <h2 class="title-product">`+val.nome+`</h2>
          <span class="price">R$`+val.preco+`</span>
          <button class="button-add-cart"><i class='bx bx-shopping-bag' id="content-icon-cart"></i></button>
        </div>
        
        `
        
    })
}

inicializarloja()


var totalAmount = "0,00"

const removeCartItem = document.getElementsByClassName("cart-remove")
 for (let i = 0; i < removeCartItem.length; i++) {
    removeCartItem[i].addEventListener("click", removeProduct)
}

const inputQuantity = document.getElementsByClassName("cart-quantity")
for (var i = 0; i < inputQuantity.length; i++) {
    inputQuantity[i].addEventListener("change", checkIfInputIsNull)
}

const cartProducts = document.getElementsByClassName("cart-box")
for(let i = 0; i < cartProducts.length; i++){
    const prices = cartProducts[i].getElementsByClassName("cart-price")[0].innerText
    console.log(prices)
}

const addToCart = document.getElementsByClassName("button-add-cart")
for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", addProductCart)
}

function removeProduct(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
 }

 function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
      event.target.parentElement.parentElement.remove()
    }
  
    updateTotal()
  }

function addProductCart(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImg = productInfos.getElementsByClassName("product-img")[0].src
    const productTitle = productInfos.getElementsByClassName("title-product")[0].innerText
    const productPrice = productInfos.getElementsByClassName("price")[0].innerText
    // console.log(productPrice)



    const productsCartName = document.getElementsByClassName("cart-product-title")
    for(let i = 0; i < productsCartName.length; i++) {
        if(productsCartName[i].innerText === productTitle){
            productsCartName[i].parentElement.parentElement.getElementsByClassName("cart-quantity")[0].value++
            updateTotal()
            return
        }
    }

    let newProduct = document.createElement("div")
    newProduct.classList.add("cart-box")
    

    newProduct.innerHTML = `
    
    <img src="${productImg}" alt="" class="cart-icon">
    <div class="detail-box">
        <div class="cart-product-title">${productTitle}</div>
        <span class="cart-price">${productPrice}</span>
        <input type="number" value="1" min="0" class="cart-quantity">
    </div>
    <!--REMOVER-->
    <button type="button" class="cart-remove">
        <i class='bx bxs-trash-alt c-remove'></i>
    </button>
    `

    const cardCart = document.querySelector(".cart-content")
    cardCart.append(newProduct)
    updateTotal()

    console.log(newProduct)
    newProduct.getElementsByClassName("cart-remove")[0].addEventListener("click", removeProduct)
    newProduct.getElementsByClassName("cart-quantity")[0].addEventListener("change", checkIfInputIsNull)
}



 function updateTotal() {
    totalAmount = 0
    const cartProduct = document.getElementsByClassName("cart-box")

    for(let i = 0; i < cartProduct.length; i++){
        const productPrice = cartProduct[i].getElementsByClassName("cart-price")[0].innerText.replace("R$","")
        const productQuantity = cartProduct[i].getElementsByClassName("cart-quantity")[0].value

        totalAmount += productPrice * productQuantity
    }

    totalAmount = totalAmount.toFixed(2)
    document.querySelector(".total-price").innerText = "R$" + totalAmount
 }
 