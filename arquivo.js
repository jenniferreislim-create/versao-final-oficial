/* Conteúdo do arquivo arquivoo.js */
function mouseOver()
{
document.imagem.src ="book.gif";
}
function mouseOut()
{
document.imagem.src ="livros.gif";
}
// =========================================================
// FUNÇÕES JAVASCRIPT PARA INTEGRAÇÃO COM A API DO GOOGLE LIVROS
// =========================================================

/**
 * Função principal que realiza a busca na API do Google Livros
 * e exibe os resultados no elemento com id="resultado".
 * * @param {string} termoBusca - O termo digitado pelo usuário (Título, Autor, ISBN).
 */
function buscarLivrosGoogle(termoBusca) {
    // Usa 'resultado' como o ID do container onde os resultados serão exibidos
    const resultadosDiv = document.getElementById('resultado');
    
    // 1. Validação
    if (!termoBusca || termoBusca.trim() === "") {
        resultadosDiv.innerHTML = "<p style='color: #dc3545; font-weight: bold;'>⚠️ Por favor, digite um termo de busca válido.</p>";
        return;
    }

    // Exibe mensagem de busca
    resultadosDiv.innerHTML = "<p>⏳ Buscando no Acervo Online (Google Livros)...</p>";

    // API do Google Livros (URL)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(termoBusca)}&maxResults=10`;

    // 2. Realiza a requisição Fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Lança um erro se a resposta HTTP não for 200 OK
                throw new Error('Erro na rede ou na API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // 3. Processa e exibe os resultados
            if (data.items && data.items.length > 0) {
                let htmlResultado = '<h3 style="margin-bottom: 15px;">Livros Encontrados (' + data.items.length + '):</h3>';
                
                data.items.forEach(item => {
                    const info = item.volumeInfo;
                    const titulo = info.title || "Título Indisponível";
                    const autores = info.authors ? info.authors.join(', ') : "Autor Desconhecido";
                    const link = info.infoLink || "#";
                    
                    // Obtém a URL da capa (usa smallThumbnail como prioridade)
                    const capa = info.imageLinks ? (info.imageLinks.smallThumbnail || info.imageLinks.thumbnail) : 'https://via.placeholder.com/80x120?text=Sem+Capa';
                    
                    // Obtém a descrição (limita o tamanho)
                    const descricao = info.description ? info.description.substring(0, 150) + '...' : 'Sem descrição disponível.';
                    
                    // Constrói o HTML para cada livro
                    htmlResultado += `
                        <div style="display: flex; margin-bottom: 20px; padding: 10px; border: 1px solid #eee; border-radius: 5px; background-color: #fff;">
                            <img src="${capa}" alt="Capa do livro" style="width: 80px; height: 120px; margin-right: 15px; object-fit: cover; flex-shrink: 0;">
                            <div>
                                <h4 style="margin-top: 0;"><a href="${link}" target="_blank" style="color: #007bff; text-decoration: none;">${titulo}</a></h4>
                                <p style="font-size: 0.9em; margin: 5px 0;">Autor(es): <strong>${autores}</strong></p>
                                <p style="font-size: 0.8em; color: #555;">${descricao}</p>
                            </div>
                        </div>
                    `;
                });
                
                resultadosDiv.innerHTML = htmlResultado;
            } else {
                resultadosDiv.innerHTML = "<p style='color: #888;'>Nenhum livro encontrado para o termo pesquisado. Tente termos diferentes.</p>";
            }
        })
        .catch(error => {
            // 4. Trata erros na requisição
            console.error('Erro ao buscar a API do Google Livros:', error);
            resultadosDiv.innerHTML = "<p style='color: #dc3545;'>❌ Ocorreu um erro ao conectar com o acervo. Detalhes: " + error.message + "</p>";
        });
}

// =========================================================
// OUTRAS FUNÇÕES (Se houverem)
// =========================================================

// Exemplo de função para animação do GIF (baseada no seu HTML anterior)
function mouseOver() {
    document.images.imagem.src = "livros.gif";
}

function mouseOut() {
    document.images.imagem.src = "livros.gif"; // Assumindo que o estado "out" volta para o GIF ou outra imagem estática
}

// **Observação:** Funções como validaCampo() e validarFormulario() mencionadas no seu HTML
// devem ser implementadas neste arquivo.js para que o código HTML funcione corretamente.

/* --- Funções imagem hover --- */
function mouseOver() {
  document.imagem.src = "book.gif";
}
function mouseOut() {
  document.imagem.src = "livros.gif";
}

/* --- Validação Login --- */
function validar() {
  const nome = document.getElementById("nome");

  if (nome.value.trim() === "") {
    alert("Por favor, preencha o campo Nome!");
    nome.focus();
    return false; // impede envio
  }

  alert("Login realizado com sucesso!");
  document.forms["formLogin"].reset(); // limpa o formulário
  return false; // impede recarregar a página
}

/* --- Validação Reserva --- */
function validarReserva() {
  const livro = document.getElementById("livro");
  const dataReserva = document.getElementById("dataReserva");

  if (livro.value.trim() === "") {
    alert("Por favor, preencha o campo Título do Livro!");
    livro.focus();
    return false;
  }

  if (dataReserva.value === "") {
    alert("Por favor, selecione a Data da Reserva!");
    dataReserva.focus();
    return false;
  }

/* --- Se tudo estiver correto... --- */
  alert("Reserva realizada com sucesso!");
  document.forms["formReserva"].reset();
  return false; // impede recarregar a página
}

let usuarioLogado = false;

// Cadastro simples (apenas simulação)
function cadastrarUsuario(event) {
    event.preventDefault();
    const nome = document.getElementById("cadNome").value;
    const email = document.getElementById("cadEmail").value;
    const senha = document.getElementById("cadSenha").value;

    if (nome && email && senha) {
        alert("Usuário cadastrado com sucesso!");
        // Aqui você poderia salvar no localStorage ou em um backend futuramente
    }
    return false;
}

// Login simples (apenas simulação)
function realizarLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    if (email && senha) {
        usuarioLogado = true;
        document.getElementById("menu-reserva").style.display = "block";
        document.getElementById("reserva").style.display = "block";
        document.getElementById("formReserva").style.display = "block";
        alert("Login realizado com sucesso!");
    } else {
        alert("Preencha os campos corretamente.");
    }
    return false;
}

// Reserva (apenas logado)
function validarReserva(event) {
    event.preventDefault();
    if (!usuarioLogado) {
        alert("Você precisa estar logado para reservar um livro.");
        return false;
    }
    const livro = document.getElementById("livroReserva").value;
    const data = document.getElementById("dataReserva").value;

    if (livro && data) {
        alert(Livro "${livro}" reservado para a data ${data}.);
    } else {
        alert("Preencha todos os campos da reserva.");
    }
    return false;
}

/* --- Validação Catálogo --- */
function validarCatalogo() {
  const genero = document.getElementById("genero");
  const ano = document.getElementById("ano");

  if (genero.value === "") {
    alert("Por favor, selecione um gênero!");
    genero.focus();
    return false;
  }

  if (ano.value.trim() === "" || isNaN(ano.value) || ano.value < 1900) {
    alert("Por favor, informe um ano válido!");
    ano.focus();
    return false;
  }

  alert("Busca no catálogo realizada com sucesso!");
  document.forms["formCatalogo"].reset();
  return false; // impede recarregar a página
}

