// On document load, execute the following code
document.addEventListener('DOMContentLoaded', function () { // On document load, execute the following code
    console.image('https://avatars.githubusercontent.com/u/91029631') // Console log the image

    for (var i = 0; i < COURSES.length; i++) { // Loop through all courses
        if (localStorage.getItem(`inCart-${COURSES[i].id}`)) { // Check if product is already in cart
            COURSES[i].stock = COURSES[i].stock - JSON.parse(localStorage.getItem(`inCart-${COURSES[i].id}`)).productsInCart; // Update the stock quantity
            productItemsInCart(COURSES[i], JSON.parse(localStorage.getItem(`inCart-${COURSES[i].id}`))); // Set the product in cart
        }
    }

    showAllProducts('.courses__container', COURSES); // Show all products
});

function addToCart(id) { // Add product to cart function
    console.log(`Tu as ajouté le produit ${id}`); // Console log the product i

    let product = getProductDetails(Number(id)); // Get the product details

    if (product.stock <= 0) { // If stock is 0 or less
        notification(`Il n'y a plus de stock dispo`); // Alert the user with notification
        return; // Return
    } else { // Otherwise
        product.stock--; // Decrease 1 to the product in cart
        document.querySelector(`.stock-${product.id}`).innerHTML = product.stock; // Display the new stock
    }

    // Check if product is already in cart
    const productCartName = `inCart-${product.id}`; // Set the product cart name
    let cart = localStorage.getItem(productCartName); // Get the product cart
    if (cart) { // If the product cart exists

        cart = JSON.parse(cart); // Parse the product cart
        cart.productsInCart++; // Add 1 to the product in cart
        localStorage.setItem(productCartName, JSON.stringify(cart)); // Set the product cart

        // Update the cart
        console.log(product.slug + '-inCart'); // Console log the product slug
        document.querySelector(`.${product.slug}-inCart`).innerHTML = cart.productsInCart; // Update the product in cart

    } else { // If the product cart doesn't exist
        // Add product to cart
        cart = { "productsInCart": 1 }; // Create the product cart
        localStorage.setItem(productCartName, JSON.stringify(cart)); // Set the product cart

        productItemsInCart(product, cart); // Add the product in cart
    }
    // Show notification
    notification(`Vous avez ajouté ${product.title} au panier`); // Run notification function
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// All Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

function productItems(querySelector, product) { // Function allowing to display in HTML the products in home page
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
                Disponible: <span class="stock stock-${product.id}">${product.stock}</span>
            </p>
            <a href="#" class="add-to-cart" data-id="${product.id}"><i class="fa
                fa-cart-plus"></i>Ajouter au panier</a>
            </div>
        </div>
        `;
}

function showAllProducts(querySelector, products) { // Function allowing get All Products and Show them
    for (var i = 0; i < products.length; i++) { // Loop through all courses
        productItems(querySelector, products[i]); // Show all products
    }
}

function productItemsInCart(product, cart) { // Function allowing to display in HTML the products in the cart
    document.querySelector('#cart-table tbody').innerHTML += `
            <tr data-id="${product.id}" class="product-${product.id}">
                <td><img src="img/courses/${product.img}" alt="${product.title} image"></td>
                <td>${product.title}</td>
                <td>${product.price}€</td>
                <td class="${product.slug}-inCart">${cart.productsInCart}</td>
                <td class="trash"><i class="fa fa-trash" aria-hidden="true"></i></td>
            </tr>
        `;
}

function getProductDetails(id) { // Function allowing to have the information of a product
    for (var i = 0; i < COURSES.length; i++) { // Loop through all courses
        if (COURSES[i].id === id) { // Check if the product correspond to the id
            return COURSES[i]; // Return the product
        }
    }

    return null; // Or return null
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// All Buttons
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('click', function (e) { // On click, execute the following code
    if (e.target.classList.contains('add-to-cart')) { // If the user clicks on the add-to-cart button, execute the following code
        //----------------------------------------------------//
        // This button allows you to add an item to the cart //
        //--------------------------------------------------//

        addToCart(e.target.dataset.id); // Add to cart

    } else if (e.target.classList.contains('empty-cart')) { // If the user clicks on the empty-cart button, execute the following code
        //----------------------------------------------------//
        // This button allows you to delete all the items in //
        // the cart.                                        //
        //-------------------------------------------------//

        for (var i = 0; i < COURSES.length; i++) { // Loop through all courses
            const getItem = JSON.parse(localStorage.getItem(`inCart-${COURSES[i].id}`)); // Get the product in cart

            if (getItem !== null) { // Check if the product is already in the cart
                COURSES[i].stock += getItem.productsInCart; // Increment the quantity of the product in stock
                console.log("Stock " + COURSES[i].stock);

                document.querySelector(`.stock-${COURSES[i].id}`).innerHTML = COURSES[i].stock; // Display the new stock
            }
        }
        
        localStorage.clear(); // Clear the localStorage
        document.querySelector('#cart-table tbody').innerHTML = ""; // Clear cart

    } else if (e.target.classList.contains('fa-trash')) { // If the user clicks on the fr-trash button, execute the following code
        //----------------------------------------------------//
        // This button allows you to remove an item from     //
        // your cart                                        //
        //-------------------------------------------------//
        
        let idTrash = e.target.parentNode.parentNode.dataset.id; // Get the product id 
        let product = getProductDetails(Number(idTrash)); // Get the product details

        product.stock++; // Add 1 to the product stock
        document.querySelector(`.stock-${idTrash}`).innerHTML = product.stock; // Display the new stock

        let getItem = JSON.parse(localStorage.getItem(`inCart-${idTrash}`)); // See how many times the product is in the cart

        if (getItem.productsInCart <= 1) { // If only 1 product is in the cart
            localStorage.removeItem(`inCart-${idTrash}`); // Remove the product from the localStorage
            document.querySelector(`.${e.target.parentNode.parentNode.classList[0]}`).remove(); // Remove the product from the cart
        } else { // Otherwise
            getItem.productsInCart--; // Decrease 1 to the product in cart
            localStorage.setItem(`inCart-${idTrash}`, JSON.stringify(getItem)); // Remove the product from the localStorage
            document.querySelector(`.${product.slug}-inCart`).innerHTML = getItem.productsInCart; // Remove the product from the cart
        }
    } else if (e.target.classList.contains('noteOrdre')) { // If the user clicks on the noteOrdre button, execuse the following code
        filtre("noteCroissant");
    } else if (e.target.classList.contains('noteDesordre')) { // If the user clicks on the noteDesordre button, execuse the following code
        filtre("noteDecroissant");
    } else if (e.target.classList.contains('prixOrdre')) { // If the user clicks on the prixOrdre button, execuse the following code
        filtre("prixCroissant");
    } else if (e.target.classList.contains('prixDesordre')) { // If the user clicks on the prixDesordre button, execuse the following code
        filtre("prixDecroissant");
    }
});