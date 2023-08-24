let urldestarwars = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try{
       await loadpersonagens(urldestarwars);
    } catch (error){
        console.log(error);
        alert('[ERRO] problemas ao carregar cards')
    }

    const nextbutton = document.getElementById("next-button")
    const backbutton = document.getElementById("back-button")

    nextbutton.addEventListener('click', loadnovapagina)
    backbutton.addEventListener('click', loadpaginaanterior)

};
    
async function loadpersonagens(url){
    const conteudoCentro = document.getElementById('conteudo-centro');
    conteudoCentro.innerHTML = ''; //limpar os resultados anteriores
    
    try{
        const response = await fetch(url)
        const responseJson = await response.json()
        
        //criando os cards 
        responseJson.results.forEach((personagem) =>{
            const card = document.createElement("div")
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${personagem.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
            
            const nomeCards = document.createElement("div")
            nomeCards.className = "nome-cards"
            
            const nomePersonagem = document.createElement("span")
            nomePersonagem.className = "nome-personagem"
            nomePersonagem.innerText = `${personagem.name}`
            
            nomeCards.appendChild(nomePersonagem)
            card.appendChild(nomeCards)
            
            //informações dentro do card atravez do click 
            card.onclick = () => {
                
                
                const modal = document.getElementById('modal')
                modal.style.visibility ="visible"

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = '' // limpar o modal content


                // colocando dados em modal content
                const imagemPersonagem = document.createElement("div")
                imagemPersonagem.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${personagem.url.replace(/\D/g, "")}.jpg')`
                imagemPersonagem.className = "imagem-personagem"

                const nome = document.createElement("span")
                nome.className = "detalhes-personagens"
                nome.innerText = `Nome: ${personagem.name}`
                

                const altura = document.createElement("span")
                altura.className = "detalhes-personagens"
                altura.innerText = `Altura: ${convertAltura(personagem.height)}m`
                

                const peso = document.createElement("span")
                peso.className = "detalhes-personagens"
                peso.innerText = `Peso: ${convertPeso(personagem.mass)}`
                

                const corOlhos = document.createElement("span")
                corOlhos.className = "detalhes-personagens"
                corOlhos.innerText = `Cor dos olhos: ${traduzCor(personagem.eye_color)}`
                

                const ano = document.createElement("span")
                ano.className = "detalhes-personagens"
                ano.innerText = `Nascimento: ${convertAno(personagem.birth_year)}`
                
                modalContent.appendChild(imagemPersonagem)
                modalContent.appendChild(nome)
                modalContent.appendChild(altura)
                modalContent.appendChild(peso)
                modalContent.appendChild(corOlhos)
                modalContent.appendChild(ano)
            }


    

            conteudoCentro.appendChild(card) 
        });

        const nextbutton = document.getElementById("next-button")
        const backbutton = document.getElementById("back-button")

        nextbutton.disabled = !responseJson.next
        backbutton.disabled = !responseJson.previous

        backbutton.style.visibility = responseJson.previous ? "visible" : "hidden"
        nextbutton.style.visibility = responseJson.next ? "visible" : "hidden"

        urldestarwars = url

    } catch(error){
        alert('erro ao carregar personagens')
        console.log(error)
    }
}

async function loadnovapagina(){
    if(!urldestarwars) return;

    try{
        const response = await fetch(urldestarwars)
        const responseJson = await response.json()

        await loadpersonagens(responseJson.next)

    }catch(error){
        console.log(error)
        alert("[ERROR] problema no carregamento da proxima pagina!")
    };
}

async function loadpaginaanterior(){
    if(!urldestarwars) return;

    try{
        const response = await fetch(urldestarwars)
        const responseJson = await response.json()

        await loadpersonagens(responseJson.previous)

    }catch(error){
        console.log(error)
        alert("[ERROR] problema no carregamento da pagina anterior")
    };

}

function hideModal(){
    const modal = document.getElementById('modal')
    modal.style.visibility = "hidden"
}

function traduzCor(corOlhos){
    const cores = {
        blue : "azul",
        brown : "castanho",
        green : "verde",
        yellow : "amarelo",
        black : "preto",
        pink : "rosa",
        red : "vermelho",
        orange : "laranja",
        hazel : "avela",
        unknown : "desconhecida"
    }
    return cores[corOlhos.toLowerCase()] || corOlhos;
}

function convertAltura(altura){
    if(altura==="unknown"){
        return "desconhecida"
    }

    return (altura / 100).toFixed(2);
}

function convertPeso(peso){
    if(peso==="unknown"){
        return "desconhecido"
    }
    return `${peso} Kg`
}

function convertAno(ano){
    if(ano==="unknown"){
        return "desconhecido"   }
    return ano
}
