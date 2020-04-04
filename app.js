/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var isGameGoing, finalScore, roundScore, activePlayer;
initialization();
function initialization() {
    //declaring game variables
    finalScore = [0, 0];
    isGameGoing = true;
    roundScore = 0;
    activePlayer = 0;
    //setting UI to reset
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function rollDice() {
    if (isGameGoing) {
        //generate random number
        var dice = Math.floor(Math.random() * 6) + 1;
        //display it on UI
        document.querySelector('#current-' + activePlayer).textContent = dice;
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        //update roundScore if generated number is !=1
        if (dice != 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer();
        }
    }
}
function endConfirm(){
    var r = confirm("Game Ended, want to start a new one?");
            if (r == true) {
                initialization();
            } else {
                window.close();
            } 
}
function hold() {
    if (isGameGoing) {
        //add current score to global score
        finalScore[activePlayer] += roundScore;
        //update UI
        document.querySelector('#score-' + activePlayer).textContent = finalScore[activePlayer];
        //check if person has won
        if (finalScore[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameGoing = false;
            setTimeout( function ( ) { endConfirm(); }, 5000 ); 
            /* var r = prompt("Game Ended, want to start a new one?");
            if (r == true) {
                initialization();
            } else {
                window.close();
            } */
        }
        else {
            nextPlayer();
        }
    }
}
function nextPlayer() {
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', initialization);