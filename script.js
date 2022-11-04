/**Crea una clase de cartas */
class Carta {

    pintaCarta = ["corazones", "tréboles", "diamantes", "picas"];
    valorCarta = ["As", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "jota", "Quina", "Kaiser"];
    numeroCarta = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    constructor() { }

    /**Metodos */

    mostrarCarta(x, i) {

        let idCarta = this.numeroCarta[x];
        let idPinta = this.pintaCarta[i];

        if (idCarta == undefined || idPinta == undefined) {
            console.log("carta no definida");   
        }
        
        console.log("carta : " + this.valorCarta[x] + " de " + this.pintaCarta[i]);

    }

}

/**Instancia de clase Carta */
let miCarta = new Carta();
miCarta.mostrarCarta(2,3);


/**Genera baraja de cartas */
class Baraja extends Carta {
    miBaraja = []

    constructor() {
        super();
    }
    
    /**Metodos de clase baraja */
    masoCarta() {
        let arrayMasoCarta = [];
        let index = 0;
        let retornaCarta;
        for (let x = 0; x < this.pintaCarta.length; x++) {
            for (let i = 0; i < this.numeroCarta.length; i++) {

                retornaCarta = this.valorCarta[i] + " de " + this.pintaCarta[x];
                arrayMasoCarta[index] = retornaCarta;
                index++;
            }
        }
        this.miBaraja = arrayMasoCarta;
    }

    mezclaBaraja() {
        
        let arrayParcial = shuffle(this.miBaraja)

        this.miBaraja = arrayParcial;
        console.log(this.miBaraja);

    }

    restableBaraja() {
        this.masoCarta();

    }

    repartirCarta() {
        let indexCarta = Math.floor(Math.random() * this.miBaraja.length);

        let miCartaSel = this.miBaraja[indexCarta];

        let ultimaCarta = this.miBaraja[this.miBaraja.length - 1];

        this.miBaraja[indexCarta] = ultimaCarta
        this.miBaraja[this.miBaraja.length - 1] = miCartaSel
        this.miBaraja.pop();

        return miCartaSel;

    }

}
/**Instancia de clase baraja */
let generaBaraja = new Baraja();
generaBaraja.masoCarta();

generaBaraja.mezclaBaraja();

console.log(generaBaraja.repartirCarta());  

/** crea una clase para el jugador.*/
class Jugador extends Baraja {

    arrayJugador = [];
    nombreJugador = '';
    constructor(nameJugador, cantCartas) {
        super();
        this.restableBaraja();
        this.mezclaBaraja();
        this.arrayJugador = new Array;
        for (let j = 0; j < cantCartas; j++) {
           
            this.arrayJugador.push(this.repartirCarta());

        }
        console.log("carga 7 cartas para el jugador -> " + nameJugador)
        console.log(this.arrayJugador);
    }

   
    tomaCarta(nameJugador) {
        this.arrayJugador.push(this.repartirCarta());
        console.log("-> " + nameJugador + " pide 1 carta : ")
        console.log(this.arrayJugador);
        let indexCarta = Math.floor(Math.random() * 8);

        let miCartaSel = this.arrayJugador[indexCarta];
        console.log("El jugador " + nameJugador + " desecha carta " + miCartaSel)
        let ultimaCarta = this.arrayJugador[this.arrayJugador.length - 1];

        this.arrayJugador[indexCarta] = ultimaCarta
        this.arrayJugador[this.arrayJugador.length - 1] = miCartaSel
        this.arrayJugador.pop();
        
        return miCartaSel;
    }

}

let manoJujador = new Jugador("Cristian", 7);

manoJujador.tomaCarta("Cristian");
console.log(manoJujador.arrayJugador);





/**Funcion para mezclar baraja de cartas */
function shuffle(array) {
    let copy = [], n = array.length, i;

    // While there remain elements to shuffle…
    while (n) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * array.length);

        // If not already shuffled, move it to the new array.
        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }
    return copy;
}
