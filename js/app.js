for (var i = 0; i < COURSES.length; i++) {
    console.log(COURSES[i]); // Console log all courses

    // Show all courses in HTML file
    document.querySelector('.courses__container').innerHTML += `
        <div class="course__item">
        <figure class="course_img">
        <img src="img/courses/${COURSES[i].img}">
        </figure>
        <div class="info__card">
        <h4>${COURSES[i].title}</h4>
        <figure class="mark m_4">
            <img src="img/rates.png">
        </figure>
        <p>
            <span class="price">${COURSES[i].initial_price} €</span>
            <span class="discount">${COURSES[i].price} €</span>
        </p>
        <p>
            Disponible: <span class="stock">${COURSES[i].stock}</span>
        </p>
        <a href="#" class="add-to-cart" data-id="${COURSES[i].id}"><i class="fa
            fa-cart-plus"></i>Ajouter au panier</a>
        </div>
    </div>
    `;
}

// On button click add product to cart
document.querySelector('.courses__container').addEventListener('click', function (e) {
    if(e.target.classList.contains('add-to-cart')) {
        console.log(`Tu as cliqué sur le produit ${e.target.dataset.id}`);
    }
});