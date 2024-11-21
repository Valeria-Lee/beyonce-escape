const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]

const thankScr = document.querySelector('#thanks-screen')

const losingScr = document.querySelector('#losing-screen')

const playerSpeed = 35
const beyonceSpeed =  0.5//1.5

let isPlaying = true
let playerPosition = { x: 0, y: 0 }
let beyoncePosition = { x: 300, y: 300 }

const recordImg = document.createElement("img")
recordImg.style.width = "50px"
recordImg.style.position = "absolute"

/**
 * Esta función detecta cuando Beyonce ya te alcanzó
 */
function detectCollision () {
    const deltaX = Math.abs(playerPosition.x - beyoncePosition.x)
    const deltaY = Math.abs(playerPosition.y - beyoncePosition.y)

    if (deltaX <= 60 && deltaY <= 60) {
		thankScr.style.display = "block"
		if(confirm('Beyonce te atrapó! Rápido, dale las gracias para salvar tu vida')) {
            playerPosition.x = Math.floor(Math.random() * (gameArea.clientWidth - 70))
            playerPosition.y = Math.floor(Math.random() * (gameArea.clientHeight - 70))
		thankScr.style.display = "none"
		} else {
	    losingScr.style.display = "block";
	    alert('Perdiste :(')
            isPlaying = false
            audio.pause()
	}
    }
}

function gameLoop () {
    moveBeyonce()
    requestAnimationFrame(gameLoop)
}

function moveBeyonce () {
    if (beyoncePosition.x < playerPosition.x) 
        beyoncePosition.x += beyonceSpeed
    else if (beyoncePosition.x > playerPosition.x)
        beyoncePosition.x -= beyonceSpeed

    if (beyoncePosition.y < playerPosition.y) 
        beyoncePosition.y += beyonceSpeed
    else if (beyoncePosition.y > playerPosition.y)
        beyoncePosition.y -= beyonceSpeed

    updatePosition()
    if (isPlaying)
        detectCollision()
}

function movePlayer (event) {
    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y >= 50) 
                playerPosition.y -= playerSpeed
            break
        case 'ArrowDown':
            if(playerPosition.y < gameArea.clientHeight - 70)
                playerPosition.y += playerSpeed
            break
        case 'ArrowLeft':
            if (playerPosition.x >= 50) 
                playerPosition.x -= playerSpeed
            break
        case 'ArrowRight':
            if(playerPosition.x < gameArea.clientWidth - 70)
                playerPosition.x += playerSpeed
            break
    }

    updatePosition()
}

function updatePosition () {
    player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`
    beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`
}

window.addEventListener('keydown', movePlayer)
window.addEventListener('load', () => {
	gameArea.addEventListener('click', breakRecord)
	gameLoop()
})

function breakRecord(event) {
	let dif = 100
	let clickPosX = event.clientX;
	let clickPosY = event.clientY;
	console.log(`CORD: ${clickPosX}, ${clickPosY}`)

	console.log(beyoncePosition.x, beyoncePosition.y)
	// perdon profe por esto.
	if (beyoncePosition.x-dif <= clickPosX && clickPosX <= beyoncePosition.x+dif && beyoncePosition.y-dif <= clickPosY && clickPosY <= beyoncePosition.y+dif) {
		gameArea.appendChild(recordImg)
		recordImg.style.left = `${beyoncePosition.X-10}px`;
		recordImg.style.top = `${beyoncePosition.Y-10}px`; 
		playRecordAnim()
		// ganaste :)
	}
}

function playRecordAnim() {
	for (i=0;i<4;i++){
		recordImg.setAttribute("src", `record_${i}.png`)
	}
}
