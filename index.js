import { createClient } from 'https://cdn.skypack.dev/@sanity/client'

// Configura il client di Sanity con il projectId, dataset e API version
const client = createClient({
  projectId: '50cvvnf6', // Sostituisci con il tuo project ID di Sanity
  dataset: 'production',
  apiVersion: '2022-03-25', // Usa la versione dell'API più recente
  useCdn: false, // `false` se vuoi dati sempre freschi
})

// Funzione per ottenere i dati della sezione "About" da Sanity
async function fetchAbout() {
  const query = `*[_type == "about"][0]{
    title,
    description1,
    description2,
    skills,
    "cvUrl": cv.asset->url
  }`;
  return await client.fetch(query);
}

// Funzione per ottenere gli elementi del portfolio da Sanity
async function fetchPortfolioItems() {
  const query = '*[_type == "portfolioItem"]{title, description, url, "imageUrl": image.asset->url}';
  return await client.fetch(query);
}

// Funzione per visualizzare la sezione "About" nel frontend
async function displayAbout() {
  const about = await fetchAbout();
  const aboutContainer = document.querySelector('.about__container');

  if (aboutContainer) {
    // Inserisce i dati della sezione "About" nell'HTML
    aboutContainer.innerHTML = `
      <h1>${about.title}</h1>
      <div class="about__container__text">
        <h2>${about.description1}</h2>
      </div>
      <div class="skills__container">
        <ul class="skills">
          ${about.skills.map(skill => `<li class="skills__item">${skill}</li>`).join('')}
        </ul>
      </div>
      <div class="about__container__text">
        <p>${about.description2}</p>
      </div>
      <a class="cv" href="${about.cvUrl}" target="_blank">Curriculum Vitae</a>
    `;
  } else {
    console.error('Elemento .about__container non trovato.');
  }
}

// Funzione per visualizzare gli elementi del portfolio nel frontend
async function displayPortfolioItems() {
  const items = await fetchPortfolioItems()
  const portfolioContainer = document.querySelector('.portfolio__items')

  if (portfolioContainer) {
    portfolioContainer.innerHTML = '' // Pulisce il contenuto esistente

    // Inserisce gli elementi del portfolio nell'HTML
    items.forEach(item => {
      const itemDiv = document.createElement('div')
      itemDiv.classList.add('portfolio__item')
      itemDiv.innerHTML = `
        <h2><a href="${item.url}">${item.title}</a></h2>
        <img src="${item.imageUrl}" alt="${item.title}" />
        <p>${item.description}</p>
      `
      portfolioContainer.appendChild(itemDiv)
    })

    // Ora che gli elementi del portfolio sono stati aggiunti, possiamo gestire il loro scorrimento
    handlePortfolioScrolling(items.length)
  } else {
    console.error('Elemento .portfolio__items non trovato.')
  }
}

// Funzione per gestire lo scorrimento degli elementi del portfolio
function handlePortfolioScrolling(itemCount) {
  const counter = document.querySelector('.counter')
  const next = document.getElementById('next')
  const prev = document.getElementById('prev')
  const items = document.querySelectorAll('.portfolio__item')

  if (counter && next && prev && items.length > 0) {
    let index = 0

    for (let i = 0; i < itemCount; i++) {
      const span = document.createElement('span')
      span.classList.add('counter__item')
      counter.appendChild(span)
    }

    const counter_items = document.querySelectorAll('.counter__item')

    next.addEventListener('click', function() {
      items[index].style.display = 'none'
      counter_items[index].style.backgroundColor = 'black'
      counter_items[index].style.width = '1rem'
      counter_items[index].style.opacity = '0.5'
      index = (index + 1) % items.length
      items[index].style.display = 'block'
      counter_items[index].style.backgroundColor = '#ff0000'
      counter_items[index].style.width = '1rem'
      counter_items[index].style.opacity = '1'
    })

    prev.addEventListener('click', function() {
      items[index].style.display = 'none'
      counter_items[index].style.backgroundColor = 'black'
      counter_items[index].style.width = '1rem'
      counter_items[index].style.opacity = '0.5'
      index = (index - 1 + items.length) % items.length
      items[index].style.display = 'block'
      counter_items[index].style.backgroundColor = '#ff0000'
      counter_items[index].style.width = '1rem'
      counter_items[index].style.opacity = '1'
    })
  } else {
    console.error('Elementi del portfolio per il scrolling non trovati.')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayAbout() // Visualizza la sezione "About"
  displayPortfolioItems() // Visualizza gli elementi del portfolio

  /*--------------------------------------
  #MENU
  --------------------------------------*/
  
  const navBar = document.querySelector(".nav")
  if (navBar) {
    window.onscroll = function() {scrollFunction()}
    
    function scrollFunction() {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navBar.style.visibility = "visible"
        navBar.style.backgroundColor = "#fff"
        navBar.style.position = "fixed"
        navBar.style.transition = "all 0.5s ease-in-out"
      } else {
        navBar.style.visibility = "collapse"
        navBar.style.backgroundColor = "transparent"
        navBar.style.position = "absolute"
        navBar.style.transition = "all 0s ease-in-out"
      }
    }
  } else {
    console.error('Elemento .nav non trovato.')
  }

  /*--------------------------------------
  #HOME
  --------------------------------------*/
  
  const h1 = document.querySelector('.home h1')
  const h2 = document.querySelector('.home h2')
  if (h1 && h2) {
    h1.innerHTML = h1.textContent.replace(/\S/g, "<span>$&</span>")
    h2.innerHTML = h2.textContent.replace(/\S/g, "<span>$&</span>")
  
    const spans = document.querySelectorAll('.home h1 span, .home h2 span')
    spans.forEach((span, idx) => {
      span.addEventListener('mouseover', (e) => {
        if (window.innerWidth > 990) {
          span.style.fontSize = '80%'
          span.style.color = '#ff0000'
          span.style.transition = 'all 0.1s'
        }
      })
      span.addEventListener('mouseout', (e) => {
        if (window.innerWidth > 990) {
          span.style.fontSize = '100%'
          span.style.color = '#EAEAEA'
          span.style.transition = 'all 1s'
        }
      })
    })
  } else {
    console.error('Elementi .home h1 e/o .home h2 non trovati.')
  }
  
  const arrowDown = document.getElementById('arrow__down')
  if (arrowDown) {
    arrowDown.addEventListener('click', function() {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const aboutSectionOffsetTop = aboutSection.offsetTop
        window.scrollTo({
          top: aboutSectionOffsetTop,
          behavior: 'smooth'
        })
      } else {
        console.error('Elemento #about non trovato.')
      }
    })
  } else {
    console.error('Elemento #arrow__down non trovato.')
  }
  
  /*--------------------------------------
  #FORM
  --------------------------------------*/
  
  const submitButton = document.getElementById("submit")
  if (submitButton) {
    submitButton.addEventListener("click", function(event) {
      const form = document.forms["form"]
      if (form) {
        const name = form["name"].value
        const email = form["email"].value
        const message = form["message"].value
        if (name === "" || email === "" || message === "") {
          alert("I campi non possono essere vuoti")
          event.preventDefault() // Prevent form submission
        } else {
          alert("Grazie per avermi contattato! Ti risponderò al più presto.")
        }
      } else {
        console.error('Form non trovato.')
      }
    })
  } else {
    console.error('Elemento #submit non trovato.')
  }
  
  /*--------------------------------------
  #FOOTER
  --------------------------------------*/
  
  const arrowUp = document.getElementById('arrow__up')
  if (arrowUp) {
    arrowUp.addEventListener('click', function() {
      window.scrollTo(0, 0)
    })
  } else {
    console.error('Elemento #arrow__up non trovato.')
  }
})
