<<<<<<< HEAD
// app.js - lógica Firebase + login / registo

// --- Inicialização Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyDRs9kbVFZSb77ybEA_eNAhsJQ8bxFFnz8",
  authDomain: "nutricao-app-33f3a.firebaseapp.com",
  projectId: "nutricao-app-33f3a",
  storageBucket: "nutricao-app-33f3a.firebasestorage.app",
  messagingSenderId: "392228060096",
  appId: "1:392228060096:web:509a69b2e7b99d5eb2e625",
  measurementId: "G-HEERKYXEG3"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Login ---
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Login bem-sucedido → redireciona para dashboard
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        alert("Erro no login: " + error.message);
    });
}

// --- Registo ---
function register() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Cria documento Firestore para o novo utilizador
        db.collection("users").doc(userCredential.user.uid).set({
            e
=======
// app.js - lógica Firebase + login / registo

// --- Inicialização Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyDRs9kbVFZSb77ybEA_eNAhsJQ8bxFFnz8",
  authDomain: "nutricao-app-33f3a.firebaseapp.com",
  projectId: "nutricao-app-33f3a",
  storageBucket: "nutricao-app-33f3a.firebasestorage.app",
  messagingSenderId: "392228060096",
  appId: "1:392228060096:web:509a69b2e7b99d5eb2e625",
  measurementId: "G-HEERKYXEG3"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- Login ---
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Login bem-sucedido → redireciona para dashboard
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        alert("Erro no login: " + error.message);
    });
}

// --- Registo ---
function register() {
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Cria documento Firestore para o novo utilizador
        db.collection("users").doc(userCredential.user.uid).set({
            e
>>>>>>> ff7a0e188d85ad509aa9fb1551d5fcc6e08f9722
