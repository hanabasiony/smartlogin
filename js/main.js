// sign in page
var signInEmail = document.getElementById('sign-in-email')
var signInPassword = document.getElementById('sign-in-pass')
var signInbtn = document.querySelector('.login-buttom')


// sign up page
var signUpName = document.getElementById('sign-up-name')
var signUpEmail = document.getElementById('sign-up-email')
var signUpPass = document.getElementById('sign-up-pass')
var signUpbtn = document.querySelector('.signup-buttom')

// home page
var userNameHtml = document.getElementById('user-name')

// validation msgs
var allrreg = document.querySelector('.already-msg')
var emptyInput = document.querySelector('.erorr-msg')
var succesMsg = document.querySelector('.succ-msg')

function dnoneAll() {
    allrreg.classList.add('d-none')
    emptyInput.classList.add('d-none')
    succesMsg.classList.add('d-none')

}

var allUsers = []

if (localStorage.getItem('allUsers') != null) {
    allUsers = JSON.parse(localStorage.getItem('allUsers'))

}

document.addEventListener('DOMContentLoaded', function () {
    var currentPageTitle = document.title;

    if (currentPageTitle === "login") {
        signInbtn.addEventListener('click', function () {
            // validation
            if (signInEmailValue === '' || signInPasswordValue === '') {
                var emptyInput = document.querySelector('.erorr-msg')
                emptyInput.classList.remove('d-none')
            } else {
                // to get the data to be checked and to be stored in local storage
                var signInEmailValue = signInEmail.value
                var signInPasswordValue = signInPassword.value

                // to check user data
                for (i = 0; i < allUsers.length; i++) {
                    if (signInEmailValue === allUsers[i].email && signInPasswordValue === allUsers[i].pass) {
                        console.log("succes")
                        var cartoona = [`welcome ${allUsers[i].name}`]
                        localStorage.setItem('userName', JSON.stringify(cartoona))
                        window.location.href = "home.html"

                    } else {
                        var notreg = document.querySelector('.notreg-msg')
                        notreg.classList.remove('d-none')
                    }
                }
            }
        }
        )

    } else if (currentPageTitle === "sign up") {
        signUpbtn.addEventListener('click', function () {

            signUpName.addEventListener('keyup', dnoneAll)
            signUpEmail.addEventListener('keyup', dnoneAll)
            signUpPass.addEventListener('keyup', dnoneAll)


            var signUpNameValue = signUpName.value
            var signUpEmailValue = signUpEmail.value
            var signUpPassValue = signUpPass.value

            function resetForm() {
                signUpNameValue = ""
                signUpEmailValue = ""
                signUpPassValue = ""
            }

            var User = {
                name: signUpNameValue,
                email: signUpEmailValue,
                pass: signUpPassValue,
            }

            var checkEmail
            if (signUpNameValue === '' || signUpEmailValue === '' || signUpPassValue === '') {
                emptyInput.classList.remove('d-none')
                allrreg.classList.add('d-none')
                succesMsg.classList.add('d-none')
            } else {
                for (i = 0; i < allUsers.length; i++) {

                    if (signUpEmailValue === allUsers[i].email) {
                        checkEmail = true
                    }
                    else {
                        checkEmail = false
                    }
                }

                if (checkEmail == true) {

                    allrreg.classList.remove('d-none')
                    emptyInput.classList.add('d-none')
                    succesMsg.classList.add('d-none')

                } else {
                    allUsers.push(User)
                    localStorage.setItem('allUsers', JSON.stringify(allUsers))
                    succesMsg.classList.remove('d-none')
                    allrreg.classList.add('d-none')
                    emptyInput.classList.add('d-none')
                }
            }
        })
    } else {
        console.log("User is on home");
        var nameSelection = []
        nameSelection = JSON.parse(localStorage.getItem('userName'))
        var x;
        for (var i = 0; i < nameSelection.length; i++) {
            x = i
        }
        userNameHtml.innerHTML = nameSelection[x]

    }
});