const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 4

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel(), 1000)
      
    }

    inicializar() {
        this.siguienteNivel =  this.siguienteNivel.bind(this)
        // .bind(this) se usa para no perder la referencia a this
        this.elegirColor = this.elegirColor.bind(this)
        // .bind(this) se usa para no perder la referencia a this
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }
    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(4).fill(0).map(n => Math.floor(Math.random() * 4))
        //   crea un array de 10 numeros, se inicializa en 0, toma un numero random y lo redondea hacia abajo
    }
    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAcolor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAcolor(this.secuencia[i])
            setTimeout(() =>  this.iluminarColor(color), 1500 * i)
            console.log(color)
        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        // .bind(this) se usa para no perder la referencia a this
    }
    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor.bind(this))
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor  === this.secuencia[this.subnivel]) {
            this.subnivel++
            if(this.subnivel === this.nivel) {
                this.nivel++
                 this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL )) {
                    this.ganoElJuego()
                } else {
                   setTimeout ( this.siguienteNivel.bind(this), 1500)
                //    el this vuelve a ser el juego 
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        this.eliminarEventosClick()
        swal({
            icon: 'success',
            title: 'Ganaste!',
            text: 'Felicidades'
        }).then(this.inicializar)
    }
    perdioElJuego() {
        swal({
            icon:'error',
            title: 'Perdiste!',
            text: 'Intentalo denuevo'
        }).then (() =>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego() {
    window.juego = new Juego()


}