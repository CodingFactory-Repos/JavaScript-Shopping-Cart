// search bar 

document.querySelector('input').addEventListener('input', function (e) {
    
    var input, filter;
    input = e.target.value;
    filter = input.toUpperCase();

    document.querySelector("#courses-list .courses__container").innerHTML = "";

    if(input){
        for(let i = 0; i < COURSES.length; i++){
            if(COURSES[i].title.toUpperCase().includes(filter)){
                productItems('#courses-list .courses__container', COURSES[i]);

                document.querySelector('#no_course').classList.add('hidden');
            } else if(!document.querySelector("#courses-list .courses__container").innerHTML){
                document.querySelector('#no_course').classList.remove('hidden');
            }
        }  
    } else {
        showAllProducts('.courses__container', COURSES);
    }
});