var gamePage = './game/game.html'
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    init();
  }
}

//try to use for event add
function init() {
  debugger
  if (loggedInUser()) {
    window.location.href = gamePage;
  }
  else {
    if (document.querySelector('#registrationform') !== null)
      document.querySelector('#registrationform')
        .addEventListener('submit', login)
    if (document.querySelector('#signupform') !== null)
      document.querySelector('#signupform')
        .addEventListener('submit', signup)
  }
}

async function login(e) {
  e.preventDefault()
  var username = document.getElementsByName('username')[0].value
  var password = document.getElementsByName('password')[0].value
  if (inputValidate('login', username, password)) {
    var user = {
      username: username,
      password: password
    }
    var loginState = await axios.post('/login', user)
    console.log(loginState)
    if (loginState.data) {
      window.localStorage.setItem('user', JSON.stringify(user))
      window.location.href = gamePage
    }
  }

}

async function signup(e) {
  e.preventDefault()
  var username = document.getElementsByName('username')[0].value
  var email = document.getElementsByName('email')[0].value
  var password = document.getElementsByName('password')[0].value
  if (!inputValidate('signup', username, email, password)) {
    var user = {
      username: username,
      password: password
    }
    var signupState = axios.post('/signup', user)
    console.log(signupState.data)
    if (signupState) {
      window.localStorage.setItem('user', JSON.stringify(user))
      window.location.href = gamePage
    }
  }
}

function loggedInUser() {
  var user = window.localStorage.getItem('user')
  user = JSON.parse(user)
  if (user !== null && user.username !== undefined && user.username !== null)
    return true
  else
    return false
}

function inputValidate() {
  return true
}


