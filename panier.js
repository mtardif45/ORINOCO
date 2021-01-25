const totalCart = document.getElementById("total-cart");

const getCartFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem("panier"));
}

// affichage du panier
const displayCart = () => {
    let panier = getCartFromLocalStorage(); // panier du localstorage
    const cartContainer = document.getElementById("cart-container");
    
    // boucle FOR pour création des articles dans le panier
    for (let [key, product] of Object.entries(panier)) {
        const cartItem = document.createElement('article');
        cartItem.innerHTML= `<div class="product-info" id="${key}">
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
}

const updateCartTotal = function () {
    // variable stockant le prix total
    let totalPrice = 0;

    // panier du localstorage
    let panier = getCartFromLocalStorage(); 

    // boucle FOR pour création des articles dans le panier
    for (let product of Object.values(panier)) {
        totalPrice += product.price * product.quantity;
    }

    totalCart.textContent = `Total: ${totalPrice / 100} € `;
}

displayCart();

// ------------- début du formulaire ------------------
window.addEventListener("DOMContentLoaded", (event) => {
    // ciblage des parties du formulaire html
    const form = document.getElementById("form-control");
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const validation = document.getElementById("button");

    const firstnameError = document.getElementById("firstname-error");     
    const lastnameError = document.getElementById("lastname-error");
    const addressError = document.getElementById("address-error");
    const cityError = document.getElementById("city-error");
    const emailError = document.getElementById("email-error");
    const telError = document.getElementById("tel-error");

// définition des regex 
    const regexNumbers = /[0-9]/;
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
    const specialCharacters = /[§!@#$%^&*().?":{}|<>]/;

//  critères de validité
    const noSpecialCharacters = (value) => !value.match(specialCharacters);
    const longEnough = (value) => value.length >= 2;
    const numbersOnly = (value) => value.match(regexNumbers) && longEnough(value);
    const validTextInput = (value) => !value.match(regexNumbers) && noSpecialCharacters(value) && longEnough(value);
    const validEmailInput = (value) => value.match(regexEmail) && longEnough(value);

    validation.addEventListener("click", (e) => {
        e.preventDefault();
    // vérifie les saisies de l'utilisateur
        checkInputs = () => {
            // test du prénom 
            if (validTextInput(firstname.value)) {
                firstnameError.innerHTML = "";
            }
            else {
                firstnameError.innerHTML = "Saisie invalide";
            }
            // test du nom
            if (validTextInput(lastname.value)) {
                lastnameError.innerHTML = "";
            }
            else {
                lastnameError.innerHTML = "Saisie invalide"; 
            }
            //test de l'adresse
            if (noSpecialCharacters(address.value) && longEnough(address.value)) {
                addressError.innerHTML ="";
            }
            else {
                addressError.innerHTML = "adresse invalide";
            }
            // test de la ville
            if (noSpecialCharacters(city.value) && longEnough(city.value)) {
                cityError.innerHTML ="";
            }
            else {
                cityError.innerHTML = "Saisie invalide";
            }
            // test de l'email 
            if (validEmailInput(email.value)) {
                emailError.innerHTML = "";
            }
            else {
                emailError.innerHTML = "email invalide";
            }
            // test du téléphone
            if (numbersOnly(tel.value)) {
                telError.innerHTML = "";
            }
            else {
                telError.innerHTML = "veuillez saisir des chiffres uniquement"
            }
       };      
       checkInputs();
    });

    // construction du tableau pour envoi des données à l'API
   let orderDetails = {
       contact,
       products,
    };

    let contact ={
     firstname,
     lastname,
     address,
     city,
     tel,
     email,
    }

    const api = 'http://localhost:3000/api/furniture/';

    const postData = async () => {
        const response = await fetch (api);
    }

});


