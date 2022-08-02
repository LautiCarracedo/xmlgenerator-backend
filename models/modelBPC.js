/*La clase ValoresFijosGeneralBPC sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosGeneralBPC{
    getNroBanco(){
        this.banco = '00001';
        return this.banco;
    }

    getNroTransaccion(){
        this.nroTransaccion = 0;
        return this.nroTransaccion;
    }

    getNroRendicion(){
        this.nroRendicion = Math.floor(Math.random() * (999999 - 0)) + 0;

        return this.nroRendicion;
    }

    getCbusyCuits(){
        this.cbuOrigen = '0000000000000000000000';
        this.cuitOrigen = '00000000000';
        this.cbuDestino = '0000000000000000000000';
        this.cuitDestino = '00000000000';

        return [this.cbuOrigen, this.cuitOrigen, this.cbuDestino, this.cuitDestino];
    }

}


/*La clase ValoresFijosSucursalBPC sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosSucursalBPC{
    getSucursal(){
        this.sucursal = "1";

        return this.sucursal;
    }
}

/*La clase ValoresFijosPagosBPC sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosPagosBPC{

    getCodigoRegistro(){
        this.codRegistro = '021';
        return this.codRegistro;
    }

    getCaja(){
        this.caja = '0000';
        return this.caja;
    }

    getCajero(){
        this.cajero = '000000';
        return this.cajero;
    }

    getLote(){
        this.lote = 1;

        return this.lote;
    }

    getLoteDeposito(){
        this.loteDeposito = 2;

        return this.loteDeposito;
    }


    getIvaYComision(){
        this.iva = "0.0";
        this.comision = "0.0";

        return [comision, iva];
    }

    getCodigoRegistroElectronico(){
        this.codRegistro = '031';
        return this.codRegistro;
    }

}


/*La clase ValoresFijosDPBPC (o DD -DetalleDeposito-) sólo obtiene el valor de cada uno de los valores que siempre son fijos en dicho tag*/
class ValoresFijosDPBPC{

    getCodigoRegistro(){
        this.codRegistro = '022';
        return this.codRegistro;
    }

    getMarcaMovimiento(){
        this.marcaMovimiento = "P";
        return this.marcaMovimiento;
    }

    getTipoOperacion(){
        this.tipoOperacion = "01";
        return this.tipoOperacion;
    }

    getTipoRendicion(){
        this.tipoRendicion = "01";
        return this.tipoRendicion;
    }

    getMoneda(){
        this.moneda = "01";
        return this.moneda;
    }

    getCodigoRegistroElectronico(){
        this.codRegistro = '032';
        return this.codRegistro;
    }

}

/*La clase ValoresInputBPC se encarga de obtener el valor de aquellso valores que se ingresan*/
class ValoresInputBPC{
    constructor(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico){
        this.origen = origen;
        this.fechaRendicion = fechaRendicion;
        this.codBarras1Presencial = codBarras1Presencial;
        this.codBarras2Presencial = codBarras2Presencial;
        this.codBarras1Electronico = codBarras1Electronico;
        this.codBarras2Electronico = codBarras2Electronico;
    }

    getOrigen(){
        return this.origen;
    }

    getFechaRendicion(){
        let fechaRendicionFormat = this.fechaRendicion.substr(6, 4) + '-' + this.fechaRendicion.substr(3, 2) + '-' + this.fechaRendicion.substr(0,2);
        return fechaRendicionFormat;
    }

    getCodBarras1Presencial(){
        return this.codBarras1Presencial;
    }

    getcodBarras2Presencial(){
        return this.codBarras2Presencial;
    }

    getCodBarras1Electronico(){
        return this.codBarras1Electronico;
    }

    getCodBarras2Electronico(){
        return this.codBarras2Electronico;
    }


}


/*La clase ValoresCalculablesBPC se encarga de extraer y/o hacer transformaciones, de cualquier valor, de cualquier atributo, y de cualquier tag.*/
class ValoresCalculablesBPC{
    constructor(fechaRendicion, codBarra1Presencial, codBarra2Presencial, codBarra1Electronico, codBarra2Electronico){
        this.fechaRendicion = fechaRendicion;
        this.codBarra1Presencial = codBarra1Presencial;
        this.codBarra2Presencial = codBarra2Presencial;
        this.codBarra1Electronico = codBarra1Electronico;
        this.codBarra2Electronico = codBarra2Electronico;
    };

    

    splitCodBarrasIngresadosPresenciales(){
        let arrayCodBarra1Presencial = this.codBarra1Presencial.split('\n');
        let arrayCodBarra2Presencial = this.codBarra2Presencial.split('\n');

        return [arrayCodBarra1Presencial, arrayCodBarra2Presencial];
    }

    splitCodBarrasIngresadosElectronicos(){

        let arrayCodBarra1Electronico = this.codBarra1Electronico.split('\n');
        let arrayCodBarra2Electronico = this.codBarra2Electronico.split('\n');

        return [arrayCodBarra1Electronico, arrayCodBarra2Electronico];
    }

    calcRegistros(){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let contadorCodBarra1Pres = 0;
        for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
            contadorCodBarra1Pres += 1;
        }

        return contadorCodBarra1Pres;
    }

    calcRegistrosElectronicos(){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let contadorCodBarra1Elec = 0;
        for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
            contadorCodBarra1Elec += 1;
        }

        return contadorCodBarra1Elec;
    }

    getCodBarras1Presencial(){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        return arrayCodBarra1Pres;
    }

    getcodBarras2Presencial(){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        return arrayCodBarra2Pres;
    }

    getCodBarras1Electronico(){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        return arrayCodBarra1Elec;
    }

    getCodBarras2Electronico(){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        return arrayCodBarra2Elec;
    }


    getFechaDeposito(){ //el formato es <fechaRendicion>T14:31:11
        let arrayFechasDeposito = [];
        let cantRegistros = this.calcRegistrosElectronicos();
        let fechaRendicionFormat = this.fechaRendicion.substr(6, 4) + '-' + this.fechaRendicion.substr(3, 2) + '-' + this.fechaRendicion.substr(0,2);

        for (let i = 0; i < cantRegistros; i++){
            arrayFechasDeposito.push(fechaRendicionFormat + "T14:31:11")
        }

        return arrayFechasDeposito;
    }

    extraerNroImpuestos(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrNroImpuestos = [];
        for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
            arrNroImpuestos.push(arrayCodBarra1Pres[i].substr(indexInicio, indexFin - indexInicio)); //substr recibe 2 param (donde empieza, cantCaracteres), como recibimos indexInicio e indexFin, para el param cantCaracteres hacemos indexFin-indexInicio
        }

        return arrNroImpuestos;
    }

    extraerFechaVencimiento(){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrFechasVencimiento = [];
        for (let i = 0; i < arrayCodBarra2Pres.length; i++) {
            let fechasVencOrdenadas = arrayCodBarra2Pres[i].substr(14,4) + "-" + arrayCodBarra2Pres[i].substr(12,2)+ "-" + arrayCodBarra2Pres[i].substr(10,2);
            arrFechasVencimiento.push(fechasVencOrdenadas);
        }

        return arrFechasVencimiento;
    }

    extraerObjImponible(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrObjImponibles = [];
        for (let i = 0; i < arrayCodBarra2Pres.length; i++) {
            arrObjImponibles.push(arrayCodBarra2Pres[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrObjImponibles;
    }

    extraerNroControl(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrNroControl = [];
        for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
            arrNroControl.push(arrayCodBarra1Pres[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrNroControl;
    }

    extraerNroLiquidacion(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrNroLiquidaciones = [];
        for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
            arrNroLiquidaciones.push(arrayCodBarra1Pres[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrNroLiquidaciones;
    }

    extraerObligacion(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrObligaciones = [];
        for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
            arrObligaciones.push(arrayCodBarra1Pres[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrObligaciones;
    }

    extraerFechaPago(){
        let arrFechasPagos = this.extraerFechaVencimiento();
        let arrFechasPagosFormat = [];
        for (let i = 0; i < arrFechasPagos.length; i++) {
            let fechasPagosOrdenadas = arrFechasPagos[i] + "T00:00:00";
            arrFechasPagosFormat.push(fechasPagosOrdenadas);
        }

        return arrFechasPagosFormat;
    }

    calcImpDeterminadoYPagado(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Pres.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Pres[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += (parseFloat(importes)).toFixed(2);
        }

        return [sumatoriaImportes, arrImportes];
    }

    //a partir de aca son campos de detalle deposito. Ver si agregar una clase para esto.
    extraerCodigoER(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrCodigosER = [];
        for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
            arrCodigosER.push(arrayCodBarra1Elec[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrCodigosER;
    }

    extraerSucursal(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrSucursal = [];
        for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
            arrSucursal.push(arrayCodBarra1Elec[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrSucursal;
    }

    extraerBoleta(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrBoletas = [];
        for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
            arrBoletas.push(arrayCodBarra1Elec[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrBoletas;
    }

    extraerNroControlElectronico(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrNroControles = [];
        for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
            arrNroControles.push(arrayCodBarra1Elec[i].substr(indexInicio, indexFin - indexInicio));
        }

        return arrNroControles;
    }

    extraerFechaEmision(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrFechaEmision = [];

        for (let i = 0; i < arrayCodBarra2Elec.length; i++) {
            let fechaEmisionFormat = arrayCodBarra2Elec[i].substr(indexInicio, 4) + '-' + arrayCodBarra2Elec[i].substr(parseInt(indexInicio) + 4, 2) + '-' + arrayCodBarra2Elec[i].substr(parseInt(indexInicio) + 6, 2); 
            arrFechaEmision.push(fechaEmisionFormat);
        }

        return arrFechaEmision;
    }

}


/*La clase InterfazImportesBPC funciona como una interfaz que se encarga de resolver aspectos definidos a los importes, iva y comisiones,
ya que según si es presencial, electronico, o ambos pagos, se utilizan distintos importes o formas de calcularlo.
Las clases que realizan dicha interfaz, son las encargadas realmente de hacer el trabajo*/
class InterfazImportesBPC{
    constructor(codBarra1Presencial, codBarra2Presencial, codBarra1Electronico, codBarra2Electronico){
        this.codBarra1Presencial = codBarra1Presencial;
        this.codBarra2Presencial = codBarra2Presencial;
        this.codBarra1Electronico = codBarra1Electronico;
        this.codBarra2Electronico = codBarra2Electronico;
    }

    splitCodBarrasIngresadosPresenciales(){
        let arrayCodBarra1Presencial = this.codBarra1Presencial.split('\n');
        let arrayCodBarra2Presencial = this.codBarra2Presencial.split('\n');

        return [arrayCodBarra1Presencial, arrayCodBarra2Presencial];
    }

    splitCodBarrasIngresadosElectronicos(){
        let arrayCodBarra1Electronico = this.codBarra1Electronico.split('\n');
        let arrayCodBarra2Electronico = this.codBarra2Electronico.split('\n');

        return [arrayCodBarra1Electronico, arrayCodBarra2Electronico];
    }



    calcImpDeterminadoYPagado(){
        throw UnsupportedOperationException();
    }

    calcImpRecaudado(){
        throw UnsupportedOperationException();
    }

    calcImpDepositadoYADepositar(){
        throw UnsupportedOperationException();
    }
}

class ImporteBPCPresencialYElectronico extends InterfazImportesBPC{
    calcImpDeterminadoYPagado(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Pres.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Pres[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
    }

    calcImpRecaudado(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Elec.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Elec[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
        
    }

    calcImpDepositadoYADepositar(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Elec.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Elec[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
      
    }

    calcIva(){
        let iva = "0.0";
        return iva;
    }

    calcComision(){
        let comision = "0.0";
        return comision;
    }
}



class ImporteBPCPresencial extends InterfazImportesBPC{
    calcImpDeterminadoYPagado(indexInicio, indexFin){
        const [arrayCodBarra1Pres, arrayCodBarra2Pres] = this.splitCodBarrasIngresadosPresenciales();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Pres.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Pres[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
       
    }

    calcImpRecaudado(indexInicio, indexFin){
        let impRecaudado = "0.0";
        return impRecaudado;
        
    }

    calcImpDepositadoYADepositar(indexInicio, indexFin){
        let impDepositado = "0.0";
        let impADepositar = "0.0";
        return [impDepositado, impADepositar];
      
    }

    calcIva(){
        let iva = "0.0";
        return iva;
    }

    calcComision(){
        let comision = "0.0";
        return comision;
    }
}

class ImporteBPCElectronico extends InterfazImportesBPC{
    calcImpDeterminadoYPagado(indexInicio, indexFin){
        let impDeterminado = "0.0";
        let impPagado = "0.0";
        return [impDeterminado, impPagado];
    }

    calcImpRecaudado(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Elec.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Elec[i].substr(indexInicio, indexFin - indexInicio,16)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
    }

    calcImpDepositadoYADepositar(indexInicio, indexFin){
        const [arrayCodBarra1Elec, arrayCodBarra2Elec] = this.splitCodBarrasIngresadosElectronicos();

        let arrImportes = [];
        let sumatoriaImportes = 0;
        for (let i = 0; i < arrayCodBarra2Elec.length; i++) {
            let importes = (((parseFloat(arrayCodBarra2Elec[i].substr(indexInicio, indexFin - indexInicio)) / 100))).toFixed(2); //formula de Excel
            arrImportes.push(importes);
            sumatoriaImportes += parseFloat(importes);
        }

        return [sumatoriaImportes.toFixed(2), arrImportes];
    }

    calcIva(){
        let iva = "0.0";
        return iva;
    }

    calcComision(){
        let comision = "0.0";
        return comision;
    }
}


module.exports = {
    ValoresInputBPC,
    ValoresCalculablesBPC,
    ValoresFijosDPBPC,
    ValoresFijosGeneralBPC,
    ValoresFijosPagosBPC,
    ValoresFijosSucursalBPC,
    ImporteBPCPresencial,
    ImporteBPCElectronico,
    ImporteBPCPresencialYElectronico
}
