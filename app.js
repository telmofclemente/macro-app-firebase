// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyALI2jHYOm-QZyTPH7Nf8yt0aH6mUiSbOs",
	authDomain: "macro-app-ed49c.firebaseapp.com",
	projectId: "macro-app-ed49c",
	storageBucket: "macro-app-ed49c.firebasestorage.app",
	messagingSenderId: "550062623928",
	appId: "1:550062623928:web:a80c1416c1379c6851384d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Mostrar formulários
function showRegister() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function showLogin() {
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Registo
function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Conta criada com sucesso!");
      showLogin();
    })
    .catch(error => {
      alert("Erro no registo: " + error.message);
    });
}

// Login
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login efetuado com sucesso!");
    })
    .catch(error => {
      alert("Erro no login: " + error.message);
    });
}
