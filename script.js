// URL de l'API 
const api = 'http://localhost:3000/api/furniture/';

// Affichage des produits dans la page, récupération des valeurs souhaitées
const displayProducts = async () => {
    const products = await getAllFurniture(api);
    products.forEach((product) => {
        renderProduct(product.name, product._id, product.imageUrl, product.price);
    });
};

//appel de l'API par fetch pour récupérer les données
const getAllFurniture = async (api) => {
    const response = await fetch(api);
    return await response.json();
};

// fonction pour affichage du produit, insertion dans le DOM
function renderProduct(productName, productId, productImg, productPrice) {
    const products = document.getElementById("products"); // récupère la div qui contiendra les articles
    const article = document.createElement("article");

    article.innerHTML = `<img alt="${productName}" src="${productImg}">
    <button class="product-link" type="button"><a href="produit.html?id=${productId}">Voir le produit</a></button>
    <h3 class="productName"> ${productName}</h3>
    <p class ="productPrice"> ${productPrice / 100},00 €</p>
    `;
    products.appendChild(article); // insertion dans le noeud enfant de la div products
}
displayProducts();






