// Coletanto informações da modal de transações
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

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