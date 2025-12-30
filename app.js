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
const db = firebase.firestore();

// Elementos DOM
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
      loadRecipes();
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

// Adicionar receita
document.getElementById("save-recipe-btn").addEventListener("click", () => {
  const name = document.getElementById("recipe-name").value;
  const type = document.getElementById("recipe-type").value;
  const ingredientsText = document.getElementById("recipe-ingredients").value.trim();

  if(!name || !ingredientsText) return alert("Preenche todos os campos!");

  const ingredients = ingredientsText.split("\n").map(line => {
    const [name, protein, carbs, fat, kcal, quantity] = line.split(",").map(s => s.trim());
    return {name, protein: Number(protein), carbs: Number(carbs), fat: Number(fat), kcal: Number(kcal), quantity: Number(quantity)};
  });

  const uid = auth.currentUser.uid;
  db.collection("users").doc(uid).collection("recipes").add({name, type, ingredients})
    .then(() => {
      alert("Receita guardada!");
      loadRecipes();
    })
    .catch(err => alert(err.message));
});

// Carregar receitas
function loadRecipes() {
  const uid = auth.currentUser.uid;
  const ul = document.getElementById("recipes-ul");
  ul.innerHTML = "";

  db.collection("users").doc(uid).collection("recipes").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.name} (${data.type})`;
        ul.appendChild(li);
      });
    });
}

// Calcular macros
document.getElementById("calc-macros-btn").addEventListener("click", () => {
  const type = document.getElementById("meal-select").value;
  const uid = auth.currentUser.uid;
  let totalProtein = 0, totalCarbs = 0, totalFat = 0, totalKcal = 0;

  db.collection("users").doc(uid).collection("recipes").where("type","==",type).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const r = doc.data();
        r.ingredients.forEach(i => {
          totalProtein += i.protein * i.quantity;
          totalCarbs += i.carbs * i.quantity;
          totalFat += i.fat * i.quantity;
          totalKcal += i.kcal * i.quantity;
        });
      });
      document.getElementById("macros-result").textContent =
        `${type} - Proteína: ${totalProtein}g, Carbs: ${totalCarbs}g, Gordura: ${totalFat}g, Kcal: ${totalKcal}`;
    });
});

// Persistência de sessão
auth.onAuthStateChanged(user => {
  if(user){
    loginRegisterContainer.style.display = "none";
    dashboard.style.display = "block";
    loadRecipes();
  } else {
    dashboard.style.display = "none";
    loginRegisterContainer.style.display = "block";
  }
});
