const orderValidation = () => {
    let order = JSON.parse(sessionStorage.getItem("order"));
    // remplissage des éléments dans la page confirmation
    document.getElementById("firstname").innerHTML = order.contact.firstName;
    document.getElementById("totalPrice").innerHTML = order.totalPrice;
    document.getElementById("orderId").innerHTML = order.orderId;

    window.location = "index.html";
};

