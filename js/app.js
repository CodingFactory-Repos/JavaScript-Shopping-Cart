// On document load, execute the following code
document.addEventListener('DOMContentLoaded', function() {
        showAllProducts('.courses__container', COURSES);


            for (var i = 0; i < COURSES.length; i++) { // Loop through all courses

            if (localStorage.getItem(`inCart-${COURSES[i].id}`)) {
                document.querySelector('#cart-table tbody').innerHTML += `
                <tr data-id="${COURSES[i].id}">
                    <td><img src="img/courses/${COURSES[i].img}" alt=""></td>
                    <td>${COURSES[i].title}</td>
                    <td>${COURSES[i].price}€</td>
                    <td class="${COURSES[i].slug}-inCart">${JSON.parse(localStorage.getItem(`inCart-${COURSES[i].id}`)).productsInCart}</td>
                    <td><i class="fa fa-trash" aria-hidden="true"></i></td>
                </tr>
            `;
        }
    }

    // On button click add product to cart
    document.querySelector('.courses__container').addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart')) { // If the target is the button
            addToCart(e.target.dataset.id); // Add to cart

            let parent = e.target.parentNode.parentNode;

            let stock = parent.getElementsByClassName( 'stock' );
        }
    });

    document.querySelector('.empty-cart').addEventListener('click', function (e) {
        localStorage.clear();
        document.querySelector('#cart-table tbody').remove();
    });
});

function addToCart(id) {
    console.log(`Tu as ajouté le produit ${id}`); // Console log the product id

    // Get the product
    for (var i = 0; i < COURSES.length; i++) { // Loop through all courses
        if (COURSES[i].id == id) { // If the id matches the id of the product
            var product = COURSES[i]; // Set the product to the current course
            break; // Stop the loop
        }
    }

    // Check if product is already in cart
    const productCartName = `inCart-${product.id}`; // Set the product cart name
    let cart = localStorage.getItem(productCartName); // Get the product cart
    if (cart) { // If the product cart exists
        // Add product to cart
        cart = JSON.parse(cart); // Parse the product cart
        cart.productsInCart++; // Add 1 to the product in cart
        localStorage.setItem(productCartName, JSON.stringify(cart)); // Set the product cart

        // Update the cart
        // console.log(product.slug + '-inCart');
        document.querySelector(`.${product.slug}-inCart`).innerHTML = cart.productsInCart; // Update the product in cart

    } else { // If the product cart doesn't exist
        // Add product to cart
        cart = { "productsInCart": 1 }; // Create the product cart
        localStorage.setItem(productCartName, JSON.stringify(cart)); // Set the product cart

        document.querySelector('#cart-table tbody').innerHTML += `
            <tr data-id="${product.id}">
                <td><img src="img/courses/${product.img}" alt="${product.title} image"></td>
                <td>${product.title}</td>
                <td>${product.price}€</td>
                <td class="${product.slug}-inCart">${cart.productsInCart}</td>
                <td><i class="fa fa-trash" aria-hidden="true"></i></td>
            </tr>
        `;
    }

    // Show product on cart page

    // Show notification
    notification(`Vous avez ajouté ${product.title} au panier`); // Run notification function

    // Update stock product
    COURSES[product.id].stock--;
    let stock = parent.getElementsByClassName( 'stock' );
    let changeStock = stock.stock = -1;
    

    // Update stock product in DOM

    // Recupere les stocks (dans courses.js) puis tu enleves 1 a chaque fois que tu clique sur le bouton. Donc en bref,
    // Tu vas juste recupere les données de stock et tu va les modifiers pour que stock perd 1. puis tu va le mettre a jour.

}
//Pop up notification

function notification(message) { // Function to show notification
    // Show notification
    document.querySelector('#notification_container').innerHTML += `
        <div class="content">
            <img src="https://img.icons8.com/color/48/000000/info.png" alt="">
            <p>${message}</p>
        </div>
        `;

    setTimeout(function () { // Hide notification after 3 seconds
        document.querySelector('#notification_container .content').remove(); // Remove notification
    }, 3000);
}

function productItems(querySelector, product) {
    document.querySelector(querySelector).innerHTML += `
            <div class="course__item">
            <figure class="course_img">
            <img src="img/courses/${product.img}">
            </figure>
            <div class="info__card">
            <h4>${product.title}</h4>
            <figure class="mark m_${product.mark}">
                <img src="img/rates.png">
            </figure>
            <p>
                <span class="price">${product.initial_price} €</span>
                <span class="discount">${product.price} €</span>
            </p>
            <p>
                Disponible: <span class="stock">${product.stock}</span>
            </p>
            <a href="#" class="add-to-cart" data-id="${product.id}"><i class="fa
                fa-cart-plus"></i>Ajouter au panier</a>
            </div>
        </div>
        `;
}

function showAllProducts(querySelector, products) {
    for (var i = 0; i < products.length; i++) {
        productItems(querySelector, products[i]);
    }
}










//vider le panier

document.querySelector('.empty-cart').addEventListener('click', function (e) {
    localStorage.clear();
    document.querySelector('#').remove();
});