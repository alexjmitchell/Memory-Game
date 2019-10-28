function shuffle(deck) {
  //   console.log("---> shuffle")
  let currentIndex = deck.length
  let temporaryValue
  let randomIndex
  const newArray = deck.slice()
  // While there remains elements to shuffle...
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    // Swap it with the current element.
    temporaryValue = newArray[currentIndex]
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }
  return newArray
}

// function handleGame() {
//   let arrCards = []

//   // Handling cards
//   $("#buttons").on("click", "button", function(e) {
//     e.preventDefault()

//     // putting values of clicked cards into the array
//     arrCards.push($(this))

//     //if 2 cards are active, disables you from selecting other cards
//     if (arrCards.length <= 2) {
//       $(this).toggleClass("face-up")
//     }

//     if (arrCards.length === 2) {
//       // if total cards in array are equal to 2 then compare win/lose scenario
//       if (arrCards[0].html() != arrCards[1].html()) {
//         setTimeout(function() {
//           arrCards[0].toggleClass("face-up")
//           arrCards[1].toggleClass("face-up")
//           arrCards = []
//         }, 1200)
//         // boo.play()
//       } else {
//         arrCards[0].addClass("stay")
//         arrCards[1].addClass("stay")

//         if (arrCards[0].hasClass("stay") && arrCards[1].hasClass("stay")) {
//           $(".stay").attr("disabled", true)
//           win.play()
//         }
//         arrCards = []
//       }
//     }
//   })
// }

function readyDeck(deck2) {
  let buttons = ""
  deck = shuffle(deck.split(""))

  deck.forEach(l => {
    buttons += `<button class="face-down">${l.toUpperCase()}</button>`
  })

  // deck2 = shuffle(deck2)

  // deck2.forEach(l => {
  //   buttons += `<button class="face-down">${l.toUpperCase()}</button>`
  // })

  $("#buttons").html(buttons)
}

function resetGame() {
  document.location.reload(true)
}

function getTimeStr(milliseconds) {
  var minutes = milliseconds / 60000
  var intMinutes = Math.floor(minutes)
  var seconds = Math.floor((minutes - intMinutes) * 60)
  return (
    intMinutes +
    ":" +
    (seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0))
  )
}

function timer() {
  timerRunning = true
  setInterval(function() {
    var elapsedTime = Date.now() - startTime
    var currentTime = getTimeStr(elapsedTime)
    $(".timer").html(`Time: ${currentTime}`)
    return currentTime
  }, 100)
}

function handleGame() {
  let arrCards = []
  // Handling cards
  $("#buttons").on("click", "button", function(e) {
    e.preventDefault()
    if (!timerRunning) {
      timer()
    }
    // putting values of clicked cards into the array
    //if 2 cards are active, disables you from selecting other cards
    if (!$(this).hasClass("stay")) {
      arrCards.push($(this))
    }
    if (
      arrCards.length <= 2 &&
      !$(this).hasClass("face-up") &&
      !$(this).hasClass("stay")
    ) {
      $(this)
        .not(".stay")
        .toggleClass("face-up")
    }
    if (arrCards.length === 2) {
      turn = turn + 1

      $(".turns").html(`Turns:${turn}`)

      // if total cards in array are equal to 2 then compare win/lose scenario
      if (arrCards[0].html() != arrCards[1].html()) {
        setTimeout(function() {
          arrCards[0].toggleClass("face-up")
          arrCards[1].toggleClass("face-up")
          arrCards = []
        }, 1200)
        // boo.play()
      } else {
        pairs = pairs + 1
        arrCards[0].addClass("stay")
        arrCards[1].addClass("stay")

        // if (arrCards[0].hasClass("stay") && arrCards[1].hasClass("stay")) {
        //   $(".stay").attr("disabled", true)
        // }
        arrCards = []

        if (pairs === 9) {
          //change to 9!
          clearInterval(counter) //to stop interval
          turnsScore()
          timerscore()

          //         if (pairs === 9) {
          //           //change to 9!
          //           clearInterval(counter) //to stop interval
          //           timerscore()
          //           turnsScore(turn)

          winnerScreen()
        }
      }
    }
  })
}

// function getTimeStr(sec) {
//   var minutes = sec / 60
//   var seconds = Math.floor((minutes - Math.floor(minutes)) * 60)
//   return (
//     "0" +
//     Math.floor(minutes) +
//     ":" +
//     (seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0))
//   )
// }

function finalscreen() {
  if (result === 9 || result === 10) {
    outcome = "Amazing"
  } else if (result === 7 || result === 8) {
    outcome = "Great Job"
  } else if (result === 5 || result === 6) {
    outcome = "Not Bad"
  } else if (result === 3 || result === 4) {
    outcome = "Pretty Bad"
  } else if (result < 3) {
    outcome = "You Suck!"
  }
}

function winnerScreen() {
  result = turnbonus + timerbonus
  console.log(outcome)
  if (result === 9 || result === 10) {
    outcome = "Amazing"
  } else if (result === 7 || result === 8) {
    outcome = "Great Job"
  } else if (result === 5 || result === 6) {
    outcome = "Not Bad"
  } else if (result === 3 || result === 4) {
    outcome = "Pretty Bad"
  } else if (result < 3) {
    outcome = "You Suck!"
  }

  finalscreen()

  var finalpage = `<p class="finalpage">
                   <p> It took you ${secs} seconds.</p>
                   <p> It to you ${turn} turns </p>
                   <p> Your outcome is: ${outcome}</p>
  `
  $(".winnerScreen").html(finalpage)

  $("#fireworks").show()

  $(".winnerScreen").show()

  win.play()
}

function getTimeStr(milliseconds) {
  var minutes = milliseconds / 60000
  var sec = milliseconds / 1000
  var intMinutes = Math.floor(minutes)
  var seconds = Math.floor((minutes - intMinutes) * 60)
  return (
    intMinutes +
    ":" +
    (seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0))
  )
}

function turnsScore() {
  if (turn >= 0 && turn <= 15) {
    return (turnbonus = 10)
  } else if (turn >= 25) {
    return (turnbonus = 0)
  }

  // switch (turn) {
  //   case 16:
  //     turnbonus = 9
  //     break
  //   case 17:
  //     turnbonus = 8
  //     break
  //   case 18:
  //     turnbonus = 7
  //     break
  //   case 19:
  //     turnbonus = 6
  //     break
  //   case 20:
  //     turnbonus = 5
  //     break
  //   case 21:
  //     turnbonus = 4
  //     break
  //   case 22:
  //     turnbonus = 3
  //     break
  //   case 23:
  //     turnbonus = 2
  //     break
  //   case 24:
  //     turnbonus = 1
  //     break
  // }

  console.log(turnbonus)
}

function timerscore() {
  let howmanysecs = secs

  if (howmanysecs < 60) {
    return (timerbonus = 3)
  } else if (howmanysecs >= 60 && howmanysecs < 120) {
    return (timerbonus = 2)
  } else if (howmanysecs >= 120 && howmanysecs < 180) {
    return (timerbonus = 1)
  } else {
    return (timerbonus = 0)
  }
}

// function turnsScore(tu) {
//   switch (tu) {
//     case 15:
//       turnbonus = 10
//       break
//     case 15:
//       turnbonus = 10
//       break
//     case 16:
//       turnbonus = 9
//       break
//     case 17:
//       turnbonus = 8
//       break
//     case 18:
//       turnbonus = 7
//       break
//     case 19:
//       turnbonus = 6
//       break
//     case 20:
//       turnbonus = 5
//       break
//     case 21:
//       turnbonus = 4
//       break
//     case 22:
//       turnbonus = 3
//       break
//     case 23:
//       turnbonus = 2
//       break
//     case 24:
//       turnbonus = 1
//       break
//     default:
//       turnbonus = 0
//       break
//   }
// }

// function timerscore() {
//   let howmanysecs = sec

// if (howmanysecs < 60) {
//   timerbonus = 3
// } else if (howmanysecs >= 60 && howmanysecs < 120) {
//   timerbonus = 2
// } else if (howmanysecs >= 120 && howmanysecs < 180) {
//   timerbonus = 1
// } else {
//   timerbonus = 0
// }

$(document).ready(function() {
  readyDeck(deck)
  handleGame()
  setInterval(() => {
    turnsScore()
  }, 1000)
})
