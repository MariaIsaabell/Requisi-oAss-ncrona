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
        const response = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${serie}&embed=episodes`);
        /* q=${serie} - pega o valor que o usuário digitou | &embed=episodes - traz também os episódios junto */

        const dados = await response.json();
        resultado.innerHTML = `
        <div class="max-w-2xl bg-white shadow-lg p-6 mt-20">

            <div class="flex flex-col items-center mb-4">
                <h2 class="text-2xl font-bold mb-2 p-2 ">${dados.name}</h2>
                <img class="border-3 border-black" src="${dados.image?.medium}">
            </div>

            <div class="text-gray-700 text-sm text-center grid gap-2">

                <div class="text-base">
                    ${dados.summary}
                </div> 

                <p class="text-base"><strong>🎭 Gêneros:</strong> ${dados.genres.join(", ")}</p>

                <p class="text-base"><strong>📺 Episódios:</strong> ${dados._embedded.episodes.length}</p>

                <p class="text-base"><strong>⭐ Status:</strong> ${dados.status}</p>

                <p class="text-base"><strong>🍿 Nota:</strong> ${dados.rating.average}</p>

                <div class="flex justify-center items-center">
                    <a href="${dados.url}" target="_blank"class="mt-4 inline-block bg-red-900 text-white px-4 py-2 rounded ">
                        Ver série
                    </a>
                </div>

            </div>

        </div>
        `;

    } catch (error) {
        resultado.textContent = error;
    }
}