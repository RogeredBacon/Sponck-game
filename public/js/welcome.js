// helper functions
const getElement = (element) => document.querySelector(element)
// urls
const usersURL = "localhost:3000/users/"

// elements
const gameHeader = getElement("#gameHeader")
const contentDiv = getElement("#contentDiv")
const welcomeDiv = getElement("#welcomeDiv")
const signUpDiv = getElement("#signUpDiv")
const loginDiv = getElement("#loginDiv")
const gameContainer = getElement("#gameContainer")
const signUpButton = getElement("#signUpButton")
const loginButton = getElement("#loginButton")



// make item hidden
const hideItem = (item) => item.style.display = "none"
const unHideItem = (item) => item.style.display = "flex"

// first screen hide everything but buttons for login or signup
const firstScreen = () => {
    hideItem(signUpDiv)
    hideItem(loginDiv)
    hideItem(gameContainer)

    alien = document.createElement("img")
    alien.src = "/assets/alien.png"
    alien.style.height = "200px"
    alien.style.float = "right"
    welcomeDiv.append(alien)

}

firstScreen()

signUpButton.addEventListener('click', (e) => {
    hideItem(welcomeDiv)
    unHideItem(signUpDiv)


})

loginButton.addEventListener('click', (e) => {
    hideItem(welcomeDiv)
    unHideItem(loginDiv)
})

const loginForm = getElement("#loginForm")

loginForm.addEventListener("submit", (e) => {
    newUsername = loginForm.querySelector(".username")
    

    const configObj = {
        method: "GET",
        headers: { "content-type": "application/json"},
        body: {
            
        }
    }
    fetch(usersURL)
        .then( resp => resp.json() )
        .then()

    e.target.reset
})


