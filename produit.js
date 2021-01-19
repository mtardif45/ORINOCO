// URL de l'API 
const api = 'http://localhost:3000/api/furniture/';

// récupérer les paramètres de l'URL
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id"); // extrait le paramètre id de l'api

// création de mes blocs html
const article = document.createElement("article");
const cartIcon = document.querySelector('.fa-shopping-cart');

// définition et initialisation des variables qui seront récupérées dans le localstorage
let furnitureData = null;
let varnishSelected = null;

// récupérer le panier du localStorage 
let panier = JSON.parse(localStorage.getItem("panier"));
if (panier === null) {
    panier = {};
}

//récupérer un seul produit 
const getOneFurniture = async (productApi,productId) => {
    const response = await fetch(productApi + productId);
    return response.json();
};

// affichage d'un seul produit
const displayOneProduct = async () => {
    furnitureData = await getOneFurniture(api, id);
    renderFurniture(furnitureData);
    customiseYourFurniture(article, furnitureData.varnish);
    // Une fois les données de l'API chargées, on réactive le bouton addToCart
    document.getElementById("addToCartBtn").removeAttribute("disabled");

    // Afficher le nombre de produits dans le panier
    cartIcon.textContent = getCartLength();
};

// affichage du produit détaillé
const renderFurniture = (furniture) => {
    article.innerHTML = `<img alt="${furniture.name}" src="${furniture.imageUrl}">
    <p class ="productName"> ${furniture.name}</p>
    <p class="productDescription"> ${furniture.description}</p>
    <p class ="productPrice"> ${furniture.price/100},00 €</p>
    `;
    const product = document.getElementById("product");
    product.appendChild(article);
};

// choisir un vernis dans une liste déroulante
const customiseYourFurniture = async (parentElement, productVarnishes) => {
    // créer une liste déroulante 
    const label = document.createElement("label"); // créé une div avec choix vernis
    const select = document.createElement("select");
    label.setAttribute("for", "varnishes");
    select.id = "varnish-list";
    parentElement.appendChild(label).appendChild(select);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Sélectionnez un vernis";
    select.appendChild(defaultOption);
    select.setAttribute("selected", true);

    // créer une balise option pour chaque vernis
    productVarnishes.forEach((productVarnish) => {
        const option = document.createElement("option");
        option.value = productVarnish;
        option.textContent = productVarnish; // affiche le nom des différentes options de vernis
        select.appendChild(option);  // relier la balise option à select
    });

    // récupérer le vernis choisi dans l'event listener
    select.addEventListener("change", (e) => {
        varnishSelected = e.target.value;
    });
};
// ajouter le produit au panier
const addToCart = () => {
    // Vérifier si un vernis a bien été sélectionné
    if (varnishSelected === null || varnishSelected === "") {
        alert("Veuillez choisir un vernis");
        return;
    }

    // initialiser la valeur à envoyer à localStorage
    const furniture = {
        id: furnitureData._id,
        name: furnitureData.name,
        price: furnitureData.price,
        imageUrl: furnitureData.imageUrl,
        quantity: 1,
        varnish: varnishSelected,
    };
    
    // Créer une clé unique pour chaque vernis différent
    const key = furnitureData._id + "_" + varnishSelected.toLowerCase().replace(/ /g,"-"); // remplacer les espaces par un tiret

    // Si un produit similaire est déjà dans le panier
    if (panier[key] !== undefined) {
        // Même vernis
        if (panier[key].varnish === varnishSelected) {
            panier[key].quantity += 1;
        }
        // Vernis différent
        else {
            panier[key] = furniture;
        }
    }
    // Si le produit n'est pas dans le panier
    else {
        panier[key] = furniture;
    };
    
    // Mettre à jour le nombre de produits dans le panier
    cartIcon.textContent = getCartLength()

    // mettre à jour le panier local storage suite au click
    localStorage.setItem("panier",JSON.stringify(panier));
    alert("ajouté au panier");
};

// Fonction qui calcule le nb de produits dans le panier
const getCartLength = () => {
    let cartLength = 0;
    Object.values(panier).forEach(product => {
        cartLength += product.quantity;
    })
    return cartLength;
}

displayOneProduct();