// Coletanto informações da modal de transações
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

// Adicionar Lançamento
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    myModal.hide();
    e.target.reset();
    alert("Lançamento adicionado com sucesso!");
})

// Chamando a função que vai verificar se há um usuário logado ou não
checkLogged();

// Função que verifica se já tem um usuário logado, caso não tenha irá redirecionar o usuário para página de login
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    // Const para pegar as transações do usuário caso houver
    const dataUser = localStorage.getItem(logged);

    // Condição que verifica se o usuário já tem transações armazenadas
    if (dataUser) {
        data = JSON.parse(dataUser);
    }
}

// Função responsável por deslogar o usuário
function logout () {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}