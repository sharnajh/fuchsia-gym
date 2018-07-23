class Pokemon {
    constructor(name, pokeId, hp, attack, defense, frontURL) {
        this.name = name;
        this.pokeId = pokeId;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.frontURL = frontURL;
        this.ability = [];
        this.types = [];
    }
}

class Trainer {
    constructor(trainerName) {
        this.trainerName = trainerName;
        this.trainerPokemon = {};
        // this.pokemonArray = [];
    }
    all() {
        return Object.values(this.trainerPokemon)
    }
    get(name) {
        return this.trainerPokemon[name]
    }
    add(id) {
        // toggle between two APIs based on availability
        //      pokeapi request (works with name or id of pokemon)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
            //      NYCDA-specific api (works with id only)
            // axios.get(`https://pokeapi-nycda.firebaseio.com/pokemon/${id}.json`).then((response) => {
            let pokedata = response.data
            let pokeName = pokedata.name;
            let pokeId = pokedata.id;
            let pokeHp = pokedata.stats[5].base_stat;
            let pokeAtt = pokedata.stats[4].base_stat;
            let pokeDef = pokedata.stats[3].base_stat;
            let pokeFrontURL = pokedata.sprites.front_default
            let pokeTypesArray = pokedata.types;

            let pokemonObject = new Pokemon(pokeName, pokeId, pokeHp, pokeAtt, pokeDef, pokeFrontURL)
            // pushes abilities to pokemonObject
            pokedata.abilities.forEach(element => {
                pokemonObject.ability.push((element.ability.name))
            });

            pokeTypesArray.forEach(element => {
                pokemonObject.types.push((element.type.name))
            });

            this.trainerPokemon[pokemonObject.name] = pokemonObject;

        })
        

    }
    display(){
        //shows trainer on page
    }
}

class Gym {
    constructor(name) {
        this.name = name;
        this.trainerContainer = {};
    }
    add(trainerObject) {
         this.trainerContainer[trainerObject.trainerName] = trainerObject;
    }
    show(trainer){
        // function that takes the trainer and displays it on the page
        console.log(this.trainerContainer[`${trainer}`])
        let trainerPokemonArray = Object.values(this.trainerContainer[`${trainer}`].trainerPokemon)
// first pokemon
        let trainerDivOne = document.getElementById(`${trainer}-pokemon-0`)
        let pokeImage0 = document.createElement("img")
        pokeImage0.setAttribute("src",trainerPokemonArray[0].frontURL)
        trainerDivOne.appendChild(pokeImage0)
        let pokeStatList0 = document.createElement("ul")
        trainerDivOne.appendChild(pokeStatList0)
        pokeStatList0.innerHTML= `<li>HP: ${trainerPokemonArray[0].hp}</li><li>Attack: ${trainerPokemonArray[0].attack}</li><li>Defense: ${trainerPokemonArray[0].defense}</li><li>Abilities:${trainerPokemonArray[0].ability[0]} </li><li>Type: ${trainerPokemonArray[0].types[0]}</li>`
        // console.log(this.trainerPokemonArray[1])

        // second pokemon
        let trainerDivTwo = document.getElementById(`${trainer}-pokemon-1`)
        let pokeImage1 = document.createElement("img")
        pokeImage1.setAttribute("src",trainerPokemonArray[1].frontURL)
        trainerDivOne.appendChild(pokeImage1)
        let pokeStatList1 = document.createElement("ul")
        trainerDivOne.appendChild(pokeStatList1)
        pokeStatList1.innerHTML= `<li>HP: ${trainerPokemonArray[1].hp}</li><li>Attack: ${trainerPokemonArray[1].attack}</li><li>Defense: ${trainerPokemonArray[1].defense}</li><li>Abilities:${trainerPokemonArray[1].ability[0]} </li><li>Type: ${trainerPokemonArray[1].types[0]}</li>`

        //third pokemon
        let trainerDivThree = document.getElementById(`${trainer}-pokemon-2`)
        let pokeImage2 = document.createElement("img")
        pokeImage2.setAttribute("src",trainerPokemonArray[2].frontURL)
        trainerDivOne.appendChild(pokeImage2)
        let pokeStatList2 = document.createElement("ul")
        trainerDivOne.appendChild(pokeStatList2)
        pokeStatList2.innerHTML= `<li>HP: ${trainerPokemonArray[2].hp}</li><li>Attack: ${trainerPokemonArray[2].attack}</li><li>Defense: ${trainerPokemonArray[2].defense}</li><li>Abilities:${trainerPokemonArray[2].ability[0]} </li><li>Type: ${trainerPokemonArray[2].types[0]}</li>`



    }



}



let shahid = new Trainer("shahid")
shahid.add(150)
shahid.add(129)
shahid.add(126)

let mary = new Trainer("mary")
mary.add("combee")
mary.add("magneton")
mary.add("exeggutor")

let sharna = new Trainer("sharna")
sharna.add(94)
sharna.add(151)
sharna.add(35)

let noly = new Trainer("noly")
noly.add("bellsprout")
noly.add("charmander")
noly.add("pidgeotto")


let fuchsia = new Gym("fuchsia")
fuchsia.add(shahid)
fuchsia.add(mary)
fuchsia.add(sharna)
fuchsia.add(noly)


fuchsia.show("shahid")
fuchsia.show("noly")
fuchsia.show("sharna")
fuchsia.show("mary")