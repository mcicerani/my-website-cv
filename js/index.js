/*--------------------------------------
#MENU
--------------------------------------*/

//Funzione comparsa/discomparsa del menu

var navBar = document.querySelector(".nav");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navBar.style.visibility = "visible";
        navBar.style.backgroundColor = "#fff";
        navBar.style.position = "fixed";
        navBar.style.transition = "all 0.5s ease-in-out";
    }        
    else{
        navBar.style.visibility = "collapse";
        navBar.style.backgroundColor = "transparent";
        navBar.style.position = "absolute";
        navBar.style.transition = "all 0s ease-in-out"
    } 
}





/*--------------------------------------
#HOME
--------------------------------------*/

//Funzione per inserire ogni lettera di .home h1 e h2 in un tag span

const h1 = document.querySelector('.home h1');
const h2 = document.querySelector('.home h2');
h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>");
h2.innerHTML = h2.textContent.replace(/\S/g, "<span>$&</span>");

/*Funzione per ridurre la dimensione delle lettere di .home h1 e h2 on mouseover
e mouseout */

const spans = document.querySelectorAll('.home h1 span, .home h2 span');
spans.forEach((span, idx) => {
    span.addEventListener('mouseover', (e) => {
        if (window.innerWidth > 990) {
            span.style.fontSize = '80%';
            span.style.color = '#ff0000';
            span.style.transition = 'all 0.1s';
        }
    });
    span.addEventListener('mouseout', (e) => {
        if (window.innerWidth > 990) {
            span.style.fontSize = '100%';
            span.style.color = '#EAEAEA';
            span.style.transition = 'all 1s';
        }
    });
});

//Funzione per andare su #about me on click su #arrow__down

const arrowDown = document.getElementById('arrow__down');
arrowDown.addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    const aboutSectionOffsetTop = aboutSection.offsetTop;
    window.scrollTo({
        top: aboutSectionOffsetTop,
        behavior: 'smooth'
    });
});





/*--------------------------------------
#FORM
--------------------------------------*/

// Funzione per il Form di contatto

document.getElementById("submit").addEventListener("click", function(event) {
    var x = document.forms["form"]["name"].value;
    var y = document.forms["form"]["email"].value;
    var z = document.forms["form"]["message"].value;
    if (x == "" || y == "" || z == "") {
        alert("I campi non possono essere vuoti");
        event.preventDefault(); // Prevent form submission
    }
    else {
        alert("Grazie per avermi contattato! Ti risponderò al più presto.");
    }
});





/*--------------------------------------
#FOOTER
--------------------------------------*/

//Funzione per tornare in cima alla pagina on click su #arrow__up

const arrowUp = document.getElementById('arrow__up');
arrowUp.addEventListener('click', function() {
    window.scrollTo(0, 0);
});
