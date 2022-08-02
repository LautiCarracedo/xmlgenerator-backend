/*La clase ValoresInput se encarga de obtener el valor de aquellso valores que se ingresan*/
class ValoresInputEntesVarios {
    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual, codBarras1, codBarras2) {
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
        this.codBarras1 = codBarras1;
        this.codBarras2 = codBarras2;
    }

    getNroBanco() {
        return this.banco;
    }

    getArrayBoletas() {
        let arrayBoletas = this.boletas.split('\n')
        return arrayBoletas
    }


    getArrayImportes() {
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }

    getArrayFechasPagos() {
        let arrayPagos = this.fechasPagos.split('\n')
        return arrayPagos
    }

    getArrayCantCuotas() {
        let arrayCantCuotas = this.cantCuotas.split('\n');
        let arrayCantCuotasOK = [];
        if (this.banco != "00935") {
            for (let i = 0; i < arrayCantCuotas.length; i++) {
                arrayCantCuotasOK.push('1');
            }
        }
        else {
            arrayCantCuotasOK = arrayCantCuotas;
        }
        return arrayCantCuotasOK;
    }

    getArrayCuotasActuales() {
        let arrayCuotasActuales = this.cuotaActual.split('\n');
        let arrayBoletas = this.boletas.split('\n');

        for (let i = 0; i < arrayCuotasActuales.length; i++) {
            if (typeof (arrayCuotasActuales[i]) === 'undefined' || arrayCuotasActuales[i] === '') {
                arrayCuotasActuales.pop();
                for (let i = 0; i < arrayBoletas.length; i++){
                    arrayCuotasActuales.push(0);
                }
                    break;
            } 

            
        }

        return arrayCuotasActuales;
    }

    getArrayBarra1() {
        let arrayBarra1 = this.codBarras1.split('\n')
        return arrayBarra1
    }

    getArrayBarra2() {
        let arrayBarra2 = this.codBarras2.split('\n')
        return arrayBarra2
    }

}
//
/*La clase ValoresFijosGeneral sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosGeneral {
    constructor(banco) {
        this.banco = banco;
    }
    getNroBanco() {
        return this.banco;
    }

    getNroTransaccion() {
        let banco = this.getNroBanco();
        if (banco === '00082' || banco === '00079'){
            this.nroTransaccion = "0000000000000000"
        }
        else{
            this.nroTransaccion = 0;
        }

        return this.nroTransaccion;
    }
    getNroRendicion() {
        this.nroRendicion = Math.floor(Math.random() * (999999 - 0)) + 0;
        return this.nroRendicion;
    }
    getCbusyCuits() {
        this.cbuOrigen = '0200925801000040012697';
        this.cuitOrigen = '30999256712';
        this.cbuDestino = '0200900501000000402265';
        this.cuitDestino = '34999230573';
        return [this.cbuOrigen, this.cuitOrigen, this.cbuDestino, this.cuitDestino];
    }

    getTotalImpRecaudadoYDepositadoYADepositar() {
        let banco = this.getNroBanco();
        if (banco === '00082' || banco === '00079'){
            this.totalRecDep = "000000000000"
        }
        else{
            this.totalRecDep = '0.00';
        }

        return this.totalRecDep;
    }
}

/*La clase ValoresFijosSucursal sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosSucursal {
    constructor(banco) {
        this.banco = banco;
    }

    getNroBanco() {
        return this.banco;
    }

    getSucursal() {
        this.sucursal = "001";
        return this.sucursal;
    }

    getTotalImpRecaudadoYDepositadoYADepositar() {
        let banco = this.getNroBanco();
        if (banco === '00082'){
            this.totalRecDep = "0";
        }
        else if(banco === '00079'){
            this.totalRecDep = "000000000000";
        }
        else{
            this.totalRecDep = '0.00';
        }
        return this.totalRecDep;
    }
}

/*La clase ValoresFijosPagos sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosPagos {
    getCodigoRegistro() {
        this.codRegistro = '021';
        return this.codRegistro;
    }
    getCaja() {
        this.caja = '0000';
        return this.caja;
    }
    getCajero() {
        this.cajero = '000000';
        return this.cajero;
    }
    getLote() {
        this.lote = 2;
        return this.lote;
    }

    getTotalImpRecaudadoYDepositadoYADepositar() {
        this.totalRecDep = '0.00';
        return this.totalRecDep;
    }
}

/*La clase ValoresFijosDP   sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosDP {
    constructor(banco){
        this.banco = banco;
    }

    getCodigoRegistro() {
        this.codRegistro = '022';
        return this.codRegistro;
    }
    getMarcaMovimiento() {
        this.marcaMovimiento = "P";
        return this.marcaMovimiento;
    }
    getTipoOperacion() {
        this.tipoOperacion = "01";
        return this.tipoOperacion;
    }
    getTipoRendicion() {
        this.tipoRendicion = "01";
        return this.tipoRendicion;
    }
    getMoneda() {
        this.moneda = "01";
        return this.moneda;
    }

    getNroComercio() {
        //Hardcode. Tomar valores con el que se da de alta el ente.
        this.nroComercio = "27426748";
        return this.nroComercio;
    }

    getObligacion() {
        this.obligacion = "0";
        return this.obligacion;
    }

    getNroBanco(){
        return this.banco;
    }

    //El siguiente método esta harcodeado, hay que tomar los valores con los que se da el alta del ente.
    //Solo para 082 y 079. Los demas entes tienen nroControl incremental x cada detalle de pago.
    getNroControl(){
        let banco = this.getNroBanco();
        if (banco === "00082"){
            this.nroControl = "E09949A1";
        }
        else if (banco === "00079"){
            this.nroControl = "000003809947327";
        }

        return this.nroControl;
    }


}

class ValoresCalculablesEntesVarios {
    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual, codBarras1, codBarras2, nroComercio, lote) {
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
        this.codBarras1 = codBarras1;
        this.codBarras2 = codBarras2;
        this.nroComercio = nroComercio;
        this.lote = lote;
    }

    /////Métodos para extraer datos de los codigos de barras (esto sirve para los entes 082 y 079)
    splitCodBarras() {
        let arrayBarra1 = this.codBarras1.split('\n');
        let arrayBarra2 = this.codBarras2.split('\n');

        return [arrayBarra1, arrayBarra2];
    }

    extraerNroImpuestos() {
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrNroImpuestos = [];
        for (let i = 0; i < arrayCodBarras1.length; i++) {
            arrNroImpuestos.push(arrayCodBarras1[i].substr(3, 3)); //substr recibe 2 param (donde empieza, cantCaracteres), como recibimos indexInicio e indexFin, para el param cantCaracteres hacemos indexFin-indexInicio
        }

        return arrNroImpuestos;
    }

    extraerObligacion() {
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrObligacion = [];
        for (let i = 0; i < arrayCodBarras1.length; i++) {
            arrObligacion.push(arrayCodBarras1[i].substr(22, 20)); //substr recibe 2 param (donde empieza, cantCaracteres), como recibimos indexInicio e indexFin, para el param cantCaracteres hacemos indexFin-indexInicio
        }

        return arrObligacion;
    }

    extraerObjImponible() {
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrObjImponible = [];
        for (let i = 0; i < arrayCodBarras2.length; i++) {
            arrObjImponible.push(arrayCodBarras2[i].substr(18, 12)); //substr recibe 2 param (donde empieza, cantCaracteres), como recibimos indexInicio e indexFin, para el param cantCaracteres hacemos indexFin-indexInicio
        }

        return arrObjImponible;
    }


    extraerFechaVencimiento() {
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrFechaVenc = [];
        for (let i = 0; i < arrayCodBarras2.length; i++) {
            let fechasOrdenadas = arrayCodBarras2[i].substr(14, 4) + '-' + arrayCodBarras2[i].substr(12, 2) + '-' + arrayCodBarras2[i].substr(10, 2);
            arrFechaVenc.push(fechasOrdenadas);
        }

        return arrFechaVenc;
    }

    extraerNroLiquidacion() { //nroBoletas
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrNroLiquidaciones = [];
        for (let i = 0; i < arrayCodBarras1.length; i++) {
            arrNroLiquidaciones.push(arrayCodBarras1[i].substr(3, 16)); //substr recibe 2 param (donde empieza, cantCaracteres), como recibimos indexInicio e indexFin, para el param cantCaracteres hacemos indexFin-indexInicio
        }

        return arrNroLiquidaciones;
    }

    calcImpDeterminadoYPagadoDeCodBarras() {
        const [arrayCodBarras1, arrayCodBarras2] = this.splitCodBarras();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarras2.length; i++) {
            let importes = (((parseFloat(arrayCodBarras2[i].substr(30, 10)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += (parseFloat(importes)).toFixed(2);
        }

        return [Number(sumatoriaImportes).toFixed(2), arrImportes];
    }


    ///////////////////////////////


    obtenerArrayImportes() {
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }

    obtenerArrayFechasPagos() {
        let arrayFecPagos = this.fechasPagos.split('\n')
        return arrayFecPagos
    }

    calcTotalImportesDeterminadoYPagado() {
        let arrayImportes = this.obtenerArrayImportes();

        let totalImportesDeterminadoYPagado = 0
        for (let i = 0; i < arrayImportes.length; i++) {
            totalImportesDeterminadoYPagado += Number(arrayImportes[i])
        }
        return totalImportesDeterminadoYPagado.toFixed(2);
    }

    calcCantRegistros() {
        let arrayFecPagos = this.obtenerArrayFechasPagos();

        let cantidadBoletas = arrayFecPagos.length
        //let cantidadImportes = arrayImportes.length
        //let cantidadPagos = arrayPagos.length

        return cantidadBoletas;
    }

    transformarFechaPagos(){
        let arrayPagos = this.fechasPagos.split('\n');
        let arrayFecPagosTransformacion = [];
        for (let i = 0; i < arrayPagos.length; i++){
            let fechasOrdenadas = arrayPagos[i].substr(6, 4) + "-" + arrayPagos[i].substr(3, 2) + "-" + arrayPagos[i].substr(0, 2);
            arrayFecPagosTransformacion.push(fechasOrdenadas);
        
        }
        return arrayFecPagosTransformacion;
    }

    transformarFechaRendicion() {
        let fechasRendicionTransf = this.fechaRendicion.substr(6, 4) + "-" + this.fechaRendicion.substr(3, 2) + "-" + this.fechaRendicion.substr(0, 2);
  
        return fechasRendicionTransf;
    }

    getNroComercio() {
        return this.nroComercio;
    }

    getLote() {
        return this.lote;
    }
}

class InterfazIVAEntesVarios {
    /*Esta clase no hace nada, es una interfaz (aunque en JavaScript no se pueden usar interfaces).
   Revisar principios de diseño, como el principio de Segregacion de Interfaces para entender como funciona.*/

    constructor(origen, banco, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActual, codBarras1, codBarras2, nroComercio, lote) {
        this.origen = origen;
        this.banco = banco;
        this.fechaRendicion = fechaRendicion;
        this.comisionCred = comisionCred;
        this.comisionDeb = comisionDeb;
        this.boletas = boletas;
        this.importes = importes;
        this.fechasPagos = fechasPagos;
        this.cantCuotas = cantCuotas;
        this.cuotaActual = cuotaActual;
        this.codBarras1 = codBarras1
        this.codBarras2 = codBarras2;
        this.nroComercio = nroComercio;
        this.lote = lote
    }

    splitImportes() {
        let arrayImportes = this.importes.split('\n')
        return arrayImportes
    }

    splitCantCuotas() {
        let arrayCantCuotas = this.cantCuotas.split('\n');
        let arrayCantCuotasOK = [];
        if (this.banco != "00935") {
            for (let i = 0; i < arrayCantCuotas.length; i++) {
                arrayCantCuotasOK.push('1');
            }
        }
        else {
            arrayCantCuotasOK = arrayCantCuotas;
        }
        return arrayCantCuotasOK;
    }

    determinarBancoParaCalculoComisionEIVA() {
        let arrayImportes = 0;
        let sumatoriaImportes = 0;
        if (this.banco == '00082' || this.banco == '00079') {
            //MODIFICAR la siguiente linea! Estamos accediendo a los atributos que son privados! Mal!.
            let valoresCalculables = new ValoresCalculablesEntesVarios(this.origen, this.banco, this.comisionCred, this.comisionDeb, this.fechaRendicion, this.boletas, this.importes, this.fechasPagos, this.cantCuotas, this.cuotaActual, this.codBarras1, this.codBarras2, this.nroComercio, this.lote);
            [sumatoriaImportes, arrayImportes] = valoresCalculables.calcImpDeterminadoYPagadoDeCodBarras();
        }
        else {
            arrayImportes = this.splitImportes();
        }

        return arrayImportes;
    }

    calcIva() {
        throw UnsupportedOperationException();
    }

    calcComision() {
        throw UnsupportedOperationException();
    }
}


class IVATagGeneral extends InterfazIVAEntesVarios {
    calcComision() {
        //Suma de importes de comisión de cada detalle de pago..
        let arrayImportes = this.determinarBancoParaCalculoComisionEIVA();
        let arrayCantCuotas = this.splitCantCuotas();
        let totalComision = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C") {
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else if (arrayCantCuotas[i] === "P") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else {
                if (this.comisionCred != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            totalComision += comisionPorImportes;
        }
        return totalComision.toFixed(2);

    }

    calcIva() {
        //Total importe comisión (del tag general) * 0.21
        let totalComisionTagGeneral = this.calcComision();
        let ivaTagGeneral = totalComisionTagGeneral * 0.21;

        return ivaTagGeneral.toFixed(2);

    }
}

class IVATagSucursalYPagos extends InterfazIVAEntesVarios {
    calcComision() {
        //Suma de importes de comisión de cada detalle de pago. En este caso solo hacemos para cordobesa (comision = 0.01 o 1%)
        let arrayImportes = this.determinarBancoParaCalculoComisionEIVA();
        let arrayCantCuotas = this.splitCantCuotas();
        let totalComision = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C") {
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else if (arrayCantCuotas[i] === "P") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else {
                if (this.comisionCred != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            totalComision += comisionPorImportes;
        }

        return totalComision.toFixed(2);
    }

    calcIva() {
        //Suma de importes IVA de cada detalle de pago.
        let arrayImportes = this.determinarBancoParaCalculoComisionEIVA();
        let arrayCantCuotas = this.splitCantCuotas();
        let ivaTagSucursalYPagos = 0;
        let comisionPorImportes = 0;
        let ivaPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C") {
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else if (arrayCantCuotas[i] === "P") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else {
                if (this.comisionCred != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            ivaPorImportes += comisionPorImportes * 0.21;
            ivaTagSucursalYPagos = ivaPorImportes;
        }
        return ivaTagSucursalYPagos.toFixed(2);
    }
}

class IVATagDetallePago extends InterfazIVAEntesVarios {
    calcComision() {
        //console.log(this.comisionCred, this.comisionDeb);
        //Suma de importes de comisión de cada detalle de pago.
        let arrayImportes = this.determinarBancoParaCalculoComisionEIVA();
        let arrayCantCuotas = this.splitCantCuotas();
        let arrayComisiones = [];
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C") {
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else if (arrayCantCuotas[i] === "P") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else {
                if (this.comisionCred != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            arrayComisiones.push(comisionPorImportes.toFixed(2));

        }
        return arrayComisiones;
    }

    calcIva() {
        //Suma de importes IVA de cada detalle de pago.
        let arrayImportes = this.determinarBancoParaCalculoComisionEIVA();
        let arrayCantCuotas = this.splitCantCuotas();
        let arrayIVAs = [];
        let ivaPorImportes = 0;
        let comisionPorImportes = 0;
        for (let i = 0; i < arrayImportes.length; i++) {
            if (arrayCantCuotas[i] === "C") {
                comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
            }
            else if (arrayCantCuotas[i] === "D") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else if (arrayCantCuotas[i] === "P") {
                comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
            }
            else {
                if (this.comisionCred != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionCred / 100);
                }
                else if (this.comisionDeb != "") {
                    comisionPorImportes = arrayImportes[i] * (this.comisionDeb / 100);
                }
            }
            ivaPorImportes = comisionPorImportes * 0.21;
            arrayIVAs.push(ivaPorImportes.toFixed(2));
        }
        return arrayIVAs;
    }
}


module.exports = {
    ValoresInputEntesVarios,
    ValoresCalculablesEntesVarios,
    ValoresFijosDP,
    ValoresFijosGeneral,
    ValoresFijosPagos,
    ValoresFijosSucursal,
    IVATagGeneral,
    IVATagSucursalYPagos,
    IVATagDetallePago
}