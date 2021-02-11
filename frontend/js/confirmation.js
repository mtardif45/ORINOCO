// récupération des données et affichage de la page confirmation: orderId + firstname et totalprice 
const orderConfirmation = () => {
    // récupération de l'objet order dans sessionStorage
    let order = JSON.parse(sessionStorage.getItem('order'));
    // remplissage des éléments dans la page confirmation
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;

    const searchParams = new URLSearchParams(window.location.search);
    const totalPrice = searchParams.get("price"); // extrait le paramètre price de l'URL

    document.getElementById("totalPrice").innerHTML = `${totalPrice / 100} € `;
};
// appel de la fonction
orderConfirmation();

