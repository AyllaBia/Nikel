// Coletanto informações do formulário de registro de usuário
const myModal = new bootstrap.Modal("#register-modal");

//Logar no Sistema
document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();

    // Criar constantes e inserir os valores digitados pelo usuário
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const session = document.getElementById("session-check").checked;
    const account = getAccount(email);

    // Verifica se o login digitado está correto
    if (!account) {
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }

    // Verificar se a senha digitada está correta
    if (account) {
        if(account.password !== password) {
            alert("Opps! Verifique o usuário ou a senha.");
            return;
        }

        // Direciona o usuário para tela home
        window.location.href = "home.html";
    }
})

// Criar Conta
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    // Impede o usuário de colocar um email com menos que 5 caracteres
    if (email.length < 5) {
        alert("Preencha o campo com um e-mail válido!");
        return;
    }

    // Coloca como requisito uma senha de no minimo 4 digitos
    if (password.length < 4) {
        alert("Crie uma senha de no mínimo 4 digitos!");
        return;
    }

    // Chama a função saveAccount e como parametro passa usuário e senha para ser armazenados
    saveAccount({
        login: email,
        password: password,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com sucesso!");
})

// Criação da função que vai armazenar os usuários criados no localStorage
function saveAccount(data) {
    // Converte o que for digitado para uma String e armazena
    localStorage.setItem(data.login, JSON.stringify(data))
}

// Criação da função que vai buscar os usuários armazenados no localStorage
function getAccount(key) {
    const account = localStorage.getItem(key);

    // Faz uma verificação, se tiver a conta no localStorage ele converte novamente os dados informados e retorna as informações.
    if (account) {
        return JSON.parse(account);
    }
    // Caso contrário ele retorna apenas um campo vazio
    return "";
}