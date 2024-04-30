// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// const navbarMenu = document.getElementById("shopping__cart__menu");
// const cartSidebar = document.getElementById("shopping__cart");

// // Close Navbar Menu on Click Outside
// window.addEventListener('click', function(e) {
// 	if (!document.querySelector('#shopping__cart__menu').contains(e.target) && !document.querySelector('#shopping__cart').contains(e.target) && !document.querySelector('.shp__pro__incr__decr').contains(e.target) && !document.querySelector('.shp__single__product').contains(e.target)
    
// ) {
		
// 		cartSidebar.classList.remove("open__shopping__cart");
// 	}
// })
