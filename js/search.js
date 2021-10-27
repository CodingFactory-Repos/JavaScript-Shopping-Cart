// search bar 

document.querySelector('form.search-form input').addEventListener('input', function (e) { // If a change in the search bar is detected, run the function
    
    var input, filter; // Inizialize variables
    input = e.target.value; // Get the value of the search bar
    filter = input.toUpperCase(); // Convert the value to uppercase

    document.querySelector("#courses-list .courses__container").innerHTML = ""; // Clear results

    if(input){ // If the input is not empty
        for(let i = 0; i < COURSES.length; i++){ // Loop through all courses
            if(COURSES[i].title.toUpperCase().includes(filter)){ // If the course title includes the value of the search bar
                productItems('#courses-list .courses__container', COURSES[i]); // Show the product

                document.querySelector('#no_course').classList.add('hidden'); // Hide the no results message
            } else if(!document.querySelector("#courses-list .courses__container").innerHTML){ // Otherwise, if there are no results
                document.querySelector('#no_course').classList.remove('hidden'); // Show the no results message
            }
        }  
    } else { // Otherwise, if the input is empty
        showAllProducts('.courses__container', COURSES); // Show all products
    }
});

function filtre(type) {
    if(type === "noteCroissant"){
        COURSES.sort((a, b) => a.mark - b.mark)
    } else if(type === "noteDecroissant"){
        COURSES.sort((a, b) => b.mark - a.mark)
    } else if(type === "prixCroissant"){
        COURSES.sort((a, b) => a.price - b.price)
    } else if(type === "prixDecroissant"){
        COURSES.sort((a, b) => b.price - a.price)
    }

    document.querySelector('.courses__container').innerHTML = "";
    showAllProducts('.courses__container', COURSES); // Show all products
}
