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

    // Chamando a função que salva as transações
    saveData(data);

    // Esconder a modal
    myModal.hide();

    // Resetar a modal
    e.target.reset();

    // Chamando a função das entradas
    getCashIn();

    // Chamando a função das saídas
    getCashOut();

    // Chamando a função que calcula e exibe o total
    getTotal();

    alert("Lançamento adicionado com sucesso!");
})

// Chamando a função que vai verificar se há um usuário logado ou não
checkLogged();

// Chamando a função que traz as transações
getCashIn();

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

    // Chamando a função das entradas
    getCashIn();

    // Chamando a função das saídas
    getCashOut();

    // Chamando a função que calcula e exibe o total
    getTotal();
}

// Função responsável por deslogar o usuário
function logout () {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    // Redirecioanando o usuário para página Index
    window.location.href = "index.html";
}

// Função para trazer as transações de entrada
function getCashIn() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type == "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Condição que verifica o número de transações. Se tiver mais do que cinco transações, cinco vai ser o limite, se tiver menos do que cinco o limite será a quantidade de transações armazenadas
        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                     <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>

                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter((item) => item.type == "2");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        // Condição que verifica o número de transações. Se tiver mais do que cinco transações, cinco vai ser o limite, se tiver menos do que cinco o limite será a quantidade de transações armazenadas
        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
                <div class="row mb-4">
                     <div class="col-12">
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>

                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${cashIn[index].date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}

function getTotal() {
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) => {
        if(item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}

// Função para salvar os dados das transações
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}