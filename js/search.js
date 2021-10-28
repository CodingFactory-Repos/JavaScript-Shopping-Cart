// search bar 

document.querySelector('form.search-form input').addEventListener('input', function(e) { // If a change in the search bar is detected, run the function
    search(e.target.value);
});

function search(e) {
    var input, filter; // Inizialize variables
    filter = e.toUpperCase(); // Convert the value to uppercase

    document.querySelector("#courses-list .courses__container").innerHTML = ""; // Clear results

    if (e) { // If the input is not empty
        for (let i = 0; i < COURSES.length; i++) { // Loop through all courses
            if (COURSES[i].title.toUpperCase().includes(filter)) { // If the course title includes the value of the search bar
                productItems('#courses-list .courses__container', COURSES[i]); // Show the product

                document.querySelector('#no_course').classList.add('hidden'); // Hide the no results message
            } else if (!document.querySelector("#courses-list .courses__container").innerHTML) { // Otherwise, if there are no results
                document.querySelector('#no_course').classList.remove('hidden'); // Show the no results message
            }
        }
    } else { // Otherwise, if the input is empty
        showAllProducts('.courses__container', COURSES); // Show all products
    }
}

function filtre(type) { // Search filter function
    if (type === "noteCroissant") { // If the filter is note croissant
        COURSES.sort((a, b) => a.mark - b.mark) // Sort the courses by note
    } else if (type === "noteDecroissant") { // If the filter is note decroissant
        COURSES.sort((a, b) => b.mark - a.mark) // Sort the courses by note
    } else if (type === "prixCroissant") { // If the filter is prix croissant
        COURSES.sort((a, b) => a.price - b.price) // Sort the courses by price
    } else if (type === "prixDecroissant") { // If the filter is prix decroissant
        COURSES.sort((a, b) => b.price - a.price) // Sort the courses by price
    }

    if (document.querySelector('form.search-form input').value) {
        search(document.querySelector('form.search-form input').value);
    } else {
        document.querySelector('.courses__container').innerHTML = ""; // Clear products
        showAllProducts('.courses__container', COURSES); // Show all products
    }
}