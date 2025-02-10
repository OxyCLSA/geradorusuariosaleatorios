const botaoGerar = document.getElementById('gerarUsuario');
const botaoLimpar = document.getElementById('limparLista');
const userInfo = document.getElementById('userInfo');
const userList = document.getElementById('userList');


let usuariosSalvos = [];


function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}


function gerarEnderecoBrasileiro() {
    const cidades = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Curitiba'];
    const bairros = ['Centro', 'Jardim Paulista', 'Copacabana', 'Boa Viagem', 'Barra'];
    const ruas = ['Rua das Flores', 'Avenida Brasil', 'Rua São João', 'Rua XV de Novembro'];
    
    return {
        cidade: cidades[Math.floor(Math.random() * cidades.length)],
        bairro: bairros[Math.floor(Math.random() * bairros.length)],
        rua: ruas[Math.floor(Math.random() * ruas.length)],
        numero: Math.floor(Math.random() * 1000) + 1
    };
}


async function buscarUsuario() {
    try {
        const resposta = await fetch('https://randomuser.me/api/?nat=br');
        const dados = await resposta.json();
        const usuario = dados.results[0];
        

        const endereco = gerarEnderecoBrasileiro();
        

        const dadosUsuario = {
            nome: `${usuario.name.first} ${usuario.name.last}`,
            email: usuario.email,
            telefone: usuario.phone,
            genero: usuario.gender === 'female' ? 'Feminino' : 'Masculino',
            nascimento: formatarData(usuario.dob.date),
            idade: usuario.dob.age,
            foto: usuario.picture.large,
            endereco: endereco,
            id: Date.now()
        };
        
        exibirUsuario(dadosUsuario);
        salvarUsuario(dadosUsuario);
        
    } catch (erro) {
        userInfo.innerHTML = `<p>Erro ao carregar usuário. Tente novamente.</p>`;
        console.error(erro);
    }
}


function exibirUsuario(usuario) {
    userInfo.innerHTML = `
        <img src="${usuario.foto}" alt="Foto de ${usuario.nome}">
        <div class="user-info-item">
            <strong>Nome:</strong> ${usuario.nome}
        </div>
        <div class="user-info-item">
            <strong>Gênero:</strong> ${usuario.genero}
        </div>
        <div class="user-info-item">
            <strong>Idade:</strong> ${usuario.idade} anos
        </div>
        <div class="user-info-item">
            <strong>Data de Nascimento:</strong> ${usuario.nascimento}
        </div>
        <div class="user-info-item">
            <strong>Email:</strong> ${usuario.email}
        </div>
        <div class="user-info-item">
            <strong>Telefone:</strong> ${usuario.telefone}
        </div>
        <div class="user-info-item">
            <strong>Endereço:</strong><br>
            ${usuario.endereco.rua}, ${usuario.endereco.numero}<br>
            ${usuario.endereco.bairro}<br>
            ${usuario.endereco.cidade}
        </div>
    `;
}


function salvarUsuario(usuario) {
    usuariosSalvos.unshift(usuario);
    atualizarListaUsuarios();
}


function atualizarListaUsuarios() {
    userList.innerHTML = usuariosSalvos.map(usuario => `
        <div class="saved-user-card">
            <img src="${usuario.foto}" alt="Foto de ${usuario.nome}" style="width: 50px; height: 50px; border-radius: 50%;">
            <div class="user-info-item">
                <strong>${usuario.nome}</strong>
            </div>
            <div class="user-info-item">
                ${usuario.cidade}
            </div>
        </div>
    `).join('');
}


function limparLista() {
    usuariosSalvos = [];
    userList.innerHTML = '';
}


botaoGerar.addEventListener('click', buscarUsuario);
botaoLimpar.addEventListener('click', limparLista);


buscarUsuario();