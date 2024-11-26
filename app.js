const gameArea = document.getElementById("game-area")
const player = document.querySelector('#player')
const beyonce = document.querySelectorAll(`#beyonce`)[0]

const thankScr = document.querySelector('#thanks-screen')

const losingScr = document.querySelector('#losing-screen')

const gamePauseBtn = document.querySelector('#game-pause-btn')

				let paused = false

				const playerSpeed = 35
				const beyonceSpeed =  0.5//1.5

				let isPlaying = true
				let playerPosition = { x: 0, y: 0 }
				let beyoncePosition = { x: 300, y: 300 }

				const recordImg = document.createElement("img")
				recordImg.style.width = "50px"
				recordImg.style.position = "relative"

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
						} else {
						thankScr.style.display = "none"
						losingScr.style.display = "block";
						alert('Perdiste :(')
							isPlaying = false
							audio.pause()
					}
					}
				}

				function gameLoop () {
					if (!paused) {
						moveBeyonce()
						requestAnimationFrame(gameLoop)
					}
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
			gamePauseBtn.addEventListener('click', pause)
			gameArea.addEventListener('click', breakRecord)
	gameLoop()
})

function pause() {
	if (!paused) {
		paused = true
	} else {
		paused = false
		gameLoop()
	}
	console.log(paused)
}

function breakRecord(event) {
	let dif = 100
	let clickPosX = event.clientX;
	let clickPosY = event.clientY;
	if (beyoncePosition.x-dif <= clickPosX && clickPosX <= beyoncePosition.x+dif && beyoncePosition.y-dif <= clickPosY && clickPosY <= beyoncePosition.y+dif) {
		console.log(beyoncePosition.x, beyoncePosition.y) 
		recordImg.style.left = `${beyoncePosition.x}px`
		recordImg.style.top = `${beyoncePosition.y}px`
		gameArea.appendChild(recordImg)
		playRecordAnim()
		setTimeout(() => {
		window.location.href="win_page.html"
		},2000)
	}
}

function playRecordAnim() {
	for (i=0;i<3;i++){
		setTimeout(() => {
		recordImg.setAttribute("src", `record_${i}.png`)
		}, 400)
	}
}
