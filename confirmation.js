const orderConfirmation = () => {
    let order = JSON.parse(sessionStorage.getItem('order'));
    // remplissage des éléments dans la page confirmation
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;

    const searchParams = new URLSearchParams(window.location.search);
    const totalPrice = searchParams.get("price"); // extrait le paramètre id de l'api

    document.getElementById("totalPrice").innerHTML = `${totalPrice / 100} € `;
};

orderConfirmation();

