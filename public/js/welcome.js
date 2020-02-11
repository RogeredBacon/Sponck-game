const contentDiv = document.querySelector("#contentDiv")
const welcomeDiv = document.querySelector("#welcomeDiv")
const signUpDiv = document.querySelector("#signUpDiv")
const loginDiv = document.querySelector("#loginDiv")
const gameContainer = document.querySelector("#gameContainer")

const signUpButton = document.querySelector("#signUpButton")
const loginButton = document.querySelector("#loginButton")

const getElement = (element) => document.querySelector(element)

// make item hidden
const hideItem = (item) => item.style.display = "none"
const unHideItem = (item) => item.style.display = "flex"

// first screen hide everything but buttons for login or signup
const firstScreen = () => {
    hideItem(signUpDiv)
    hideItem(loginDiv)
    hideItem(gameContainer)
    // signUpDiv.style.display = "none"
    // loginDiv.style.display = "none"
    // gameContainer.style.display = "none"
}

firstScreen()

signUpButton.addEventListener('click', (e) => {
    hideItem(welcomeDiv)
    unHideItem(signUpDiv)


})

loginButton.addEventListener('click', (e) => {
    hideItem(welcomeDiv)
    unHideItem(loginDiv)
    
    form = getElement("#loginForm")
    debugger
    console.log(form)
    // fetch(usersURL)
    //     .then( resp => resp.json() )
    //     .then()
})


const usersURL = "localhost:3000/users/"
