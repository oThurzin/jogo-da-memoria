const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const teams = [
    'ajax',
    'barca',
    'bayer',
    'chelsea',
    'city',
    'juventus',
    'liverpool',
    'milan',
    'real',
    'united',
    'fcsb',
    'inter',
    'olympique',
    'porto',
    'vila',
    'hamburgo',
    'forest',
    'feyenoord',
    'celtic',
    'borussia'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card')

    if (disableCards.length === 40) {
        setTimeout(() => {
            clearInterval(this.loop)
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`)
        }, 600);
    }
}

const checkCards = () => {
    const firstTeam = firstCard.getAttribute('data-team')
    const secondTeam = secondCard.getAttribute('data-team')

    if (firstTeam === secondTeam) {

        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

        firstCard = ''
        secondCard = ''

        checkEndGame()

    } else {

        setTimeout(() => {

        firstCard.classList.remove('reveal-card')
        secondCard.classList.remove('reveal-card') 

        firstCard = ''
        secondCard = ''

        }, 600)


    }
}

const revealCard = ({ target }) => {

    if( target.parentNode.className.includes('reveal-card')) {
        return
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }

}

const createCard = (team) => {

    const card = createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    front.style.backgroundImage = `url('../images/${team}.jpg')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-team', team)
    
    return card
}

const loadGame = () => {

    const duplicateTeams = [ ...teams, ...teams ]
    
    const shuffledArray = duplicateTeams.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((team) => {
        const card = createCard(team)
        grid.appendChild(card)
    })
}

const starTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1

    }, 1000)

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player')
    starTimer()
    loadGame()
}