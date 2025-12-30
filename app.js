// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRs9kbVFZSb77ybEA_eNAhsJQ8bxFFnz8",
    authDomain: "nutricao-app-33f3a.firebaseapp.com",
    projectId: "nutricao-app-33f3a",
    storageBucket: "nutricao-app-33f3a.appspot.com",
    messagingSenderId: "392228060096",
    appId: "1:392228060096:web:509a69b2e7b99d5eb2e625"
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
