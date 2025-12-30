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

// Elementos do DOM
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const dashboard = document.getElementById("dashboard");
const loginRegisterContainer = document.getElementById("login-register-container");

// Mostrar formulários
document.getElementById("show-register-btn").addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

document.getElementById("show-login-btn").addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// Registo
document.getElementById("register-btn").addEventListener("click", () => {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Conta criada com sucesso!"))
    .catch(err => alert("Erro no registo: " + err.message));
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      loginRegisterContainer.style.display = "none";
      dashboard.style.display = "block";
    })
    .catch(err => alert("Erro no login: " + err.message));
});

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  auth.signOut().then(() => {
    dashboard.style.display = "none";
    loginRegisterContainer.style.display = "block";
  });
});

// Detectar estado de autenticação (persistência)
auth.onAuthStateChanged(user => {
  if(user) {
    loginRegisterContainer.style.display = "none";
    dashboard.style.display = "block";
  } else {
    loginRegisterContainer.style.display = "block";
    dashboard.style.display = "none";
  }
});
