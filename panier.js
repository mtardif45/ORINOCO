const totalCart = document.getElementById("total-cart");
const cartContainer = document.getElementById("cart-container");
let form = document.getElementById("form-control");

// variable stockant le prix total
let totalPrice = 0;
// création du tableau stockant l'objet contact + tableau product
let orderData = {
    contact: {},
    products: []
}

if (!localStorage.getItem("panier")) {
    // vérifie que la localstorage est vide, si il est vide on cache le formulaire et on insère le texte
    cartContainer.textContent = "Votre panier est vide.";
};

const getCartFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem("panier"));
}

// affichage du panier
const displayCart = () => {
    let panier = getCartFromLocalStorage(); // panier du localstorage
    // boucle FOR pour création des articles dans le panier
    for (let [key, product] of Object.entries(panier)) {
        const cartItem = document.createElement('article');
        const productId = product._id;
        cartItem.innerHTML = `<div class="product-info" id="${key}">
                <p><img class = "cartimg" src=${product.imageUrl}></p>
                <p> ${product.name}</p>
                <p> ${product.price / 100},00 €</p>
                <p> ${product.varnish}</p>
                <p> ${product.quantity}</p>
                <p> ${product.quantity * product.price / 100},00 € </p>
                <button class="deleteItemBtn" type="button" onclick="deleteCartItem('${key}')"> Supprimer </button>
            </div>`;
        // insertion du bloc article juste avant le bloc prix total
        cartContainer.insertBefore(cartItem, totalCart);
    }
    updateCartTotal();
};

const deleteCartItem = function (productId) {
    let panier = getCartFromLocalStorage(); // panier du localstorage
    delete panier[productId];
    // mettre à jour le localStorage avec le nouveau panier
    localStorage.setItem('panier', JSON.stringify(panier));
    // Supprime le HTML pour le produit sélectionné
    document.getElementById(productId).outerHTML = "";
    updateCartTotal();
};

const updateCartTotal = function () {
    // panier du localstorage
    let panier = getCartFromLocalStorage();
    // boucle FOR pour création des articles dans le panier
    for (let product of Object.values(panier)) {
        totalPrice += product.price * product.quantity;
    }
    totalCart.textContent = `Total: ${totalPrice / 100} € `;
};

displayCart();

// ------------- début du formulaire ------------------
const checkInputs = () => {
    // ciblage des parties du formulaire html
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    // définition des regex 
    const regexNumbers = /[0-9]/;
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    const specialCharacters = /[§!@#$%^&*().?":{}|<>]/;
    // variable contenant le message d'erreur 
    let errorMessage = "";
    let validForm = true;

    // test du prénom 
    if (regexNumbers.test(firstName) == true ||
        specialCharacters.test(firstName) == true) {
        validForm = false;
        errorMessage = "Champ prénom invalide";
    }
    // test du nom
    if (regexNumbers.test(lastName) == true ||
        specialCharacters.test(lastName) == true) {
        validForm = false;
        errorMessage = "Champ nom invalide";
    }
    //test de l'adresse
    if (specialCharacters.test(address) == true) {
        validForm = false;
        errorMessage = "Champ adresse invalide";
    }
    // test de la ville
    if (regexNumbers.test(city) == true ||
        specialCharacters.test(city) == true) {
        validForm = false;
        errorMessage = "Champ ville invalide";
    }
    // test de l'email 
    if (regexEmail.test(email) == false) {
        validForm = false;
        errorMessage = "champ Email invalide";
    }
    if (validForm) {
        return orderData.contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        };
    };
};

const placeOrder = async (e) => {
    e.preventDefault();
    if (checkInputs()) {

        let productsIds = [];
        let cartItems = getCartFromLocalStorage();
        Object.keys(cartItems).map((key) => {
            productsIds.push(cartItems[key].id)
        });
        orderData.products = productsIds;
        // route pour envoi des données à l'API
        const url = 'http://localhost:3000/api/furniture/order';

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(orderData)
        })

        const result = await response.json();

        // actualisation de la page dynamiquement et lien vers la page de confirmation
        window.location = `confirmation.html?id=${result.orderId}&price=${totalPrice}&user=${result.contact.firstName}`;
        sessionStorage.setItem('order', JSON.stringify(result));
        localStorage.removeItem('panier');

        return result;
    }
};

form.onsubmit = placeOrder;








