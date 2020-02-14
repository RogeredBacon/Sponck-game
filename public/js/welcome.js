// helper functions
const getElement = element => document.querySelector(element);
// urls
const usersURL = "http://localhost:3000/users/"
const gamesURL = "http://localhost:3000/games/"

const players = [{ player: "Player 1" }, { player: "Player 2" }]
let currPlayer = players[0]

document.addEventListener("DOMContentLoaded", () => {

    // elements
    const headerBar = getElement("#headerBar")
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
    const newGamePage = getElement("#newGamePage")
    const addPlayer2Button = getElement("#addPlayer2Button")
    const playSelfButton = getElement("#playSelfButton")
    const leaderBoardDiv = getElement("#leaderBoardDiv")
    const gameDiv = getElement("#gameDiv")
    const sounds = getElement("#menu-audio")

    const playerNameHeaders = document.querySelectorAll(".playerNameHeader")
    let notFound
    let userTaken


    // make item hidden
    const hideItem = (item) => item.classList.add("hidden")
    const unHideItem = (item) => item.classList.remove("hidden")
    const hideAll = () => {for(const item of document.querySelectorAll(".div-item")) { hideItem(item)}}

    // first screen hide everything but buttons for login or signup
    const firstScreen = () => {
        hideAll()
        unHideItem(welcomeDiv)

        for(const playerNo of playerNameHeaders){
            playerNo.innerText = currPlayer.player
        }
    }
   
    // show sign up form
    signUpButton.addEventListener('click', (e) => {
        hideAll()
        if (getElement("#notFound")) { notFound.remove() }
        if (getElement("#userTaken")) { userTaken.remove() }
        unHideItem(signUpDiv)
    })

    // show log in form
    loginButton.addEventListener('click', (e) => {
        hideAll()
        if (getElement("#notFound")) { notFound.remove() }
        if (getElement("#userTaken")) { userTaken.remove() }
        unHideItem(loginDiv)
    })


    // find user when logging in
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let userForm = loginForm.querySelector(".username").value.toUpperCase()
        
        e.target.reset()

        fetch(usersURL)
            .then( resp => resp.json() )
            .then( users => { findUser(users, userForm)} )
    })
    // find a user
    const findUser = (users, userForm) => {
        for(const user of users){
            let userName = user.username.toUpperCase()
            if (userName == userForm) {
                currPlayer.username = userName
                currPlayer.id = user.id
                if (currPlayer == players[0] ) { 
                    return loggedIn()
                } else {
                    let player2header = document.querySelector("#player2header")
                    player2header.innerText = "Player 2 - " + currPlayer.username
                    return renderGameDiv()
                }
            }
        }
        userNotFound()
    }
    // not found
    const userNotFound = () => {
        // if (!getElement("#notFound")) {
            notFound = document.createElement("div")
            notFound.innerText = "Sorry, we couldn't find that user, try again!"
            notFound.style.color = "#00ff00"
            notFound.id = "notFound"
            notFound.classList = "center-item"
            welcomeDiv.append(notFound)
        // }
        hideAll()
        unHideItem(welcomeDiv)
    }

    // create user
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let userForm = signupForm.querySelector(".username").value.toUpperCase()
        
        e.target.reset()

        fetch(usersURL)
            .then( resp => resp.json() )
            .then( users => { createUser(users, userForm)} )
    })

    // check if user exists in db, if exists give error, if not create in db
    const createUser = (users, userForm) => {
        for(const user of users){
            let userName = user.username.toUpperCase()
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
                currPlayer.username = user.username
                currPlayer.id = user.id
                if ( currPlayer == players[0]) { 
                    return loggedIn() 
                } else {
                    let player2header = document.querySelector("#player2header")
                    player2header.innerText = "Player 2 - " + currPlayer.username
                    return renderGameDiv()
                }
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
        hideAll()
        unHideItem(welcomeDiv)
    }

    // take them to the logged in page
    const loggedIn = () => {
        hideAll()
        unHideItem(loggedInPage)
        getElement("#name").innerText = currPlayer.username
        if (currPlayer == players[0]) {
            createHeaderBar()
        }
    }


// after logging in pages:


    // create scoreboard table & display
    scoreBoardButton.addEventListener("click", (e) => {
        hideAll()
        showScoreBoard()
    })

    newGameButton.addEventListener("click", (e) => {
        hideAll()
        unHideItem(newGamePage)
    })


    // need to add elements for log out, new game, show scoreboard
    const createHeaderBar = () => {
        // hideAll()
        const headerItems = document.createElement("ul")
        
        const player1 = document.createElement("li")
        player1.innerText = "Player 1 - " + currPlayer.username

        const homeLink = document.createElement("li")
        homeLink.innerText = "NEW GAME"
        homeLink.style.color = "#00ff00"
        homeLink.addEventListener("click", () => {
            hideAll()
            leaderBoardDiv.innerHTML = ""
            gameDiv.innerHTML = ""
            sounds.muted = false
            currPlayer = players[0]
            unHideItem(newGamePage)
        })

        const scoreBoardLink = document.createElement("li")

        scoreBoardLink.innerText = "LEADER BOARD"
        scoreBoardLink.style.color = "#00ff00"
        scoreBoardLink.addEventListener("click", () => {
            hideAll()
            leaderBoardDiv.innerHTML = ""
            gameDiv.innerHTML = ""
            sounds.muted = false
            showScoreBoard()
        })
        
        const player2 = document.createElement("li")
        player2.id = "player2header"

        headerItems.append(player1, scoreBoardLink, homeLink, player2)
        headerBar.append(headerItems)
            //add elements for high scores? log out?
        
    }


    // show scoreboard
    const showScoreBoard = () => {
        hideAll()
        const leaderBoardHeader = document.createElement("h2")
        leaderBoardHeader.id = "leaderBoardHeader"
        leaderBoardHeader.innerText = "LEADER BOARD"
        leaderBoardHeader.classList = "header-item, secondary"

        const leaderBoard = document.createElement("table")
        const headers = document.createElement("tr")
        
        const positionHeader = document.createElement("th")
        positionHeader.innerText = "POSITION"
        const nameHeader = document.createElement("th")
        nameHeader.innerText = "USER"
        const scoreHeader = document.createElement("th")
        scoreHeader.innerText = "SCORE"
        
        createTableRows(leaderBoard)

        headers.append(positionHeader, nameHeader, scoreHeader)
        leaderBoard.append(headers)
        leaderBoardDiv.append(leaderBoardHeader, leaderBoard)
        unHideItem(leaderBoardDiv)
        
    }

    const createTableRows = (leaderBoard) => {
        fetch(gamesURL)
            .then( resp => resp.json())
            .then( games => {
                // sort games by highes score descending
                let sortedGames = games.sort((a,b) => b.score - a.score)
                // create each row element
                for (let i = 0; i < 10; i++) {
                    const game = sortedGames[i];
                    const row = document.createElement("tr")
                    const position = document.createElement("td")
                    position.innerText = (i + 1)
                    const playerName = document.createElement("td")
                    playerName.innerText = game.user.username
                    const gameScore = document.createElement("td")
                    gameScore.innerText = game.score

                    row.append(position, playerName, gameScore)
                    leaderBoard.append(row)
                }
            })

    }
// button to log in 2nd player
    addPlayer2Button.addEventListener("click", () => {
        currPlayer = players[1]
// log in second person then go to game!
        firstScreen()
    })

// button to go straight to gamne without saving 2nd player
    playSelfButton.addEventListener("click", () => {
        renderGameDiv()
    })

// add game div to page 
    const renderGameDiv = () => {
        hideAll()
        stopMusic()
        unHideItem(gameDiv)
        let gameContainer = document.createElement("iframe")
        gameContainer.id = "gameContainer"
        gameContainer.src = "/game.html"
        gameContainer.style.height = "100%"
        gameContainer.style.width = "100%"
        gameContainer.style.margin = "20px"
        gameContainer.style.padding = "none"
        gameContainer.style.border = "2px solid #ff1a75"
        gameContainer.style.boxSizing = "border-box"
        gameDiv.append(gameContainer)
    }

// change music for game
    const stopMusic = () => {
		sounds.muted = true;
	};

    
    headerBar.innerHTML=""
    firstScreen()

})


// to do:

// - create second player login -DONE
// - create top nav links (change header to navbar) -DONE
// - save game score to games table
// - add welcome & instructions before game start
// - add high score to top navbar
// - change colours and fonts of scores in game window
