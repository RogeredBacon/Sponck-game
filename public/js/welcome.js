// helper functions
const getElement = (element) => document.querySelector(element)
// urls
const usersURL = "http://localhost:3000/users/"

document.addEventListener("DOMContentLoaded", () => {

    // elements
    const gameHeader = getElement("#gameHeader")
    const contentDiv = getElement("#contentDiv")
    const welcomeDiv = getElement("#welcomeDiv")
    const signUpDiv = getElement("#signUpDiv")
    const loginDiv = getElement("#loginDiv")
    // const gameContainer = getElement("#gameContainer")
    const signUpButton = getElement("#signUpButton")
    const loginButton = getElement("#loginButton")
    const loginForm = getElement("#loginForm")
    const signupForm = getElement("#signupForm")
    const loggedInPage = getElement("#loggedInPage")
    const newGameButton = getElement("#newGameButton")
    const scoreBoardButton = getElement("#scoreBoardButton")


    const userDetails = {}


    // make item hidden
    const hideItem = (item) => item.classList.add("hidden")
    const unHideItem = (item) => item.classList.remove("hidden")

    // first screen hide everything but buttons for login or signup
    const firstScreen = () => {
        hideItem(signUpDiv)
        hideItem(loginDiv)
        // hideItem(gameContainer)
        hideItem(loggedInPage)

        alien = document.createElement("img")
        alien.src = "/assets/alien.png"
        alien.style.height = "200px"
        alien.style.float = "right"
        welcomeDiv.append(alien)

    }
   


    // show sign up form
    signUpButton.addEventListener('click', (e) => {
        hideItem(welcomeDiv)
        unHideItem(signUpDiv)
    })

    // show log in form
    loginButton.addEventListener('click', (e) => {
        hideItem(welcomeDiv)
        unHideItem(loginDiv)
    })


    // find user when logging in
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        userForm = loginForm.querySelector(".username").value.toUpperCase()
        
        e.target.reset()

        fetch(usersURL)
            .then( resp => resp.json() )
            .then( users => { findUser(users, userForm)} )
    })
    // find a user
    const findUser = (users, userForm) => {
        for(const user of users){
            userName = user.username.toUpperCase()
            if (userName == userForm) {
                userDetails.username = userName
                userDetails.id = user.id
                return loggedIn()
            }
        }
        userNotFound()
    }
    // not found
    const userNotFound = () => {
        if (!getElement("#notFound")) {
            notFound = document.createElement("div")
            notFound.innerText = "Sorry, we couldn't find that user, try again!"
            notFound.style.color = "#00ff00"
            notFound.id = "notFound"
            notFound.classList = "center-item"
            welcomeDiv.append(notFound)
        }
        hideItem(loginDiv)
        unHideItem(welcomeDiv)
    }

    // create user
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
        userForm = signupForm.querySelector(".username").value.toUpperCase()
        
        e.target.reset()

        fetch(usersURL)
            .then( resp => resp.json() )
            .then( users => { createUser(users, userForm)} )
    })

    // check if user exists in db, if exists give error, if not create in db
    const createUser = (users, userForm) => {
        for(const user of users){
            userName = user.username.toUpperCase()
            if (userName == userForm) {
                return userExists()
            }
        }
        
        const configObj = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                username: userForm
            })
        }

        fetch(usersURL, configObj)
            .then( resp => resp.json())
            .then( user => {
                userDetails.username = user.username
                userDetails.id = user.id
                return loggedIn()
            } ) 
    }

    // user already exists
    const userExists = () => {
        if (!getElement("#userTaken")) {
            userTaken = document.createElement("div")
            userTaken.innerText = "Sorry, that username is already taken! Please choose a new one or log in!"
            userTaken.id = "userTaken"
            userTaken.style.color = "#00ff00"
            userTaken.classList = "center-item"
            welcomeDiv.append(userTaken)
        }
        hideItem(signUpDiv)
        unHideItem(welcomeDiv)
    }

    // take them to the logged in page
    const loggedIn = () => {
        hideItem(signUpDiv)
        hideItem(loginDiv)
        unHideItem(loggedInPage)
        getElement("#name").innerText = userDetails.username
    }

    // create scoreboard table & display
    scoreBoardButton.addEventListener("click", (e) => {
        createHeaderBar()
        showScoreBoard()
    })

    newGameButton.addEventListener("click", (e) => {
        createHeaderBar()
        renderGameDiv()
    })


    // need to add elements for log out, new game, show scoreboard
    const createHeaderBar = () => {
        hideItem(loggedInPage)
        headerBar = document.createElement("header")
        headerBar.innerText = userDetails.username
        getElement("body").prepend(headerBar)
    }

    const showScoreBoard = () => {
        // create scoreboard table
    }

    const renderGameDiv = () => {
        console.log("unhidden")
        gameContainer = document.createElement("iframe")
        gameContainer.id = "gameContainer"
        gameContainer.src = "/game.html"
        gameContainer.style.height = "100%"
        gameContainer.style.width = "100%"
        gameContainer.style.margin = "20px"
        gameContainer.style.padding = "none"
        gameContainer.style.border = "2px solid #ff1a75"
        gameContainer.style.boxSizing = "border-box"
        contentDiv.append(gameContainer)
        console.log(gameContainer.childNodes)
    }
















    firstScreen()

})