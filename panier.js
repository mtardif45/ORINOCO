// affichage du panier
const displayCart = () => {
    let panier = JSON.parse(localStorage.getItem("panier")); // panier du localstorage
    const cartContainer = document.getElementById("cart-container");
    const totalCart = document.getElementById("total-cart");
    // variable stockant le prix total
    let totalPrice = 0;

    for (let product of Object.values(panier)) {
        const cartItem = document.createElement('article');
        cartItem.innerHTML= `<div class="product-info">
            <img class = "cartimg" src=${product.imageUrl}>
            <p class ="product-name"> ${product.name}</p>
            <p class ="product-price"> ${product.price / 100},00 €</p>
            <p class="product-varnish"> ${product.varnish}</p>
            <p class="product-quantity"> ${product.quantity}</p>
            <p class="remove"> Supprimer </p>
            </div>`;
        cartContainer.insertBefore(cartItem, totalCart);
        totalPrice += product.price * product.quantity; // calcul du prix total
    }
    
    totalCart.textContent = `Total: ${totalPrice /100},00 € `; // affichage du prix total
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
    const regexNumbers = /^[0-9]+$/;
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const specialCharacters = /[§!@#$%^&*().?":{}|<>]/;

//  critère de validité
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

});

