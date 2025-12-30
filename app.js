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

// Importar receita
document.getElementById("import-recipe-btn").addEventListener("click", () => {
  const fileInput = document.getElementById("recipe-file");
  if(fileInput.files.length === 0) return alert("Escolhe um ficheiro .txt");

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function(e){
    const text = e.target.result;
    parseAndSaveRecipe(text);
  };
  reader.readAsText(file);
});

// Parse do ficheiro
function parseAndSaveRecipe(text){
  const lines = text.split("\n").map(l => l.trim()).filter(l => l.length>0);
  let name = "", macros = {}, ingredients = [], steps = [];
  let modeSection = false, ingSection = false;

  lines.forEach(line=>{
    if(line.startsWith("Nome:")) name = line.replace("Nome:","").trim();
    else if(line.startsWith("Macros:")){
      line.replace("Macros:","").trim().split(" ").forEach(pair=>{
        const [key,value] = pair.split("=");
        macros[key] = Number(value);
      });
    }
    else if(line.startsWith("Ingredientes:")) ingSection = true;
    else if(line.startsWith("Modo de preparo:")) { ingSection=false; modeSection=true; }
    else if(ingSection) ingredients.push(line);
    else if(modeSection) steps.push(line);
  });

  if(!name) return alert("Ficheiro inválido: Nome não encontrado");
  const uid = auth.currentUser.uid;
  db.collection("users").doc(uid).collection("recipes").add({
    name, macros, ingredients, steps, createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(()=>{
    alert("Receita importada com sucesso!");
    loadRecipes();
  }).catch(err=>alert(err.message));
}

// Carregar receitas (ordenadas alfabeticamente)
function loadRecipes(){
  const uid = auth.currentUser.uid;
  const ul = document.getElementById("recipes-ul");
  ul.innerHTML="";

  db.collection("users").doc(uid).collection("recipes")
    .orderBy("name","asc")
    .get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = data.name + ` — ${data.macros.P}P / ${data.macros.C}C / ${data.macros.G}G / ${data.macros.K}K`;

        const viewBtn = document.createElement("button");
        viewBtn.textContent="Ver";
        viewBtn.addEventListener("click", ()=>showRecipeDetail(data));

        const delBtn = document.createElement("button");
        delBtn.textContent="Eliminar";
        delBtn.addEventListener("click", ()=>deleteRecipe(doc.id));

        li.appendChild(viewBtn);
        li.appendChild(delBtn);
        ul.appendChild(li);
      });
    });
}

// Mostrar detalhe
function showRecipeDetail(data){
  document.getElementById("recipe-detail").style.display="block";
  document.getElementById("detail-name").textContent = data.name;
  document.getElementById("detail-macros").textContent = `${data.macros.P}P / ${data.macros.C}C / ${data.macros.G}G / ${data.macros.K}K`;

  const ingUl = document.getElementById("detail-ingredients");
  ingUl.innerHTML="";
  data.ingredients.forEach(i=>{
    const li=document.createElement("li");
    li.textContent=i;
    ingUl.appendChild(li);
  });

  const stepsOl = document.getElementById("detail-steps");
  stepsOl.innerHTML="";
  data.steps.forEach(s=>{
    const li=document.createElement("li");
    li.textContent=s;
    stepsOl.appendChild(li);
  });
}

// Fechar detalhe
document.getElementById("close-detail-btn").addEventListener("click", ()=>{
  document.getElementById("recipe-detail").style.display="none";
});

// Eliminar receita
function deleteRecipe(id){
  const uid = auth.currentUser.uid;
  if(confirm("Desejas eliminar esta receita?")){
    db.collection("users").doc(uid).collection("recipes").doc(id).delete()
      .then(()=>loadRecipes())
      .catch(err=>alert(err.message));
  }
}

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
