const btn = document.querySelector("#btn");
const resultado = document.querySelector("#resultado");
const nomeInput = document.querySelector("#nome"); 
const generoInput = document.querySelector("#genero");

btn.addEventListener("click", (e) => {
    e.preventDefault(); // Esse método faz, que quando vc clicar no botão ee "fala" que não carregar o site
    const busca = nomeInput.value;
    buscarSerie(busca);
});

async function buscarSerie(serie) {
    try {
        const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${serie}`);

        const dados = await response.json();
        resultado.innerHTML = `
        <img src="${dados.image.medium}" class="mx-auto rounded-lg mb-4">
        Nome: ${dados.name}
        Nota: ${dados.rating.average}
        Gêneros: ${dados.genres.join(", ")} 
        Status: ${dados.status}
        Link: <a href="${dados.url}" target="_blank">Ver série</a>
        `;

    } catch (error) {
        resultado.textContent = error;
    }
}