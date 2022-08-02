const { ValoresInputEntesVarios, ValoresFijosGeneral, ValoresFijosSucursal, ValoresFijosPagos, ValoresFijosDP, ValoresCalculablesEntesVarios, IVATagGeneral, IVATagSucursalYPagos, IVATagDetallePago } = require('../models/modelEntesVarios');
class GeneradorEntesVarios{
    //por el momento vamos a generarXML de Cordobesa solamente
    generarXMLEnte(origen, ente, comisionCred, comisionDeb, nroDeComercio, nroLote, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2){ 
        
        /*Instanciamos las clases: ValoresInputEntesVarios, ValoresFijosGeneral, ValoresFijosSucursal, ValoresFijosPagos,
        ValoresFijosDP. En cada clase se explica que función cumple cada una.*/

        //Valores que son los input de la interfaz, los cargamos en clase ValoresInputEntesVarios
        let valoresInputEntesVarios = new ValoresInputEntesVarios(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2)
        
        let nroBanco = valoresInputEntesVarios.getNroBanco();
        let arrayImportes = valoresInputEntesVarios.getArrayImportes();
        let arrayBoletas = valoresInputEntesVarios.getArrayBoletas();
        //let inputFechasPagos = valoresInputEntesVarios.getArrayFechasPagos();
        let arrayCantCuotas = valoresInputEntesVarios.getArrayCantCuotas();
        let arrayCuotasActuales = valoresInputEntesVarios.getArrayCuotasActuales();
        let arrayBarras1 = valoresInputEntesVarios.getArrayBarra1();
        let arrayBarras2 = valoresInputEntesVarios.getArrayBarra2();


        //Valores que son siempre fijos del tag General
        let valoresFijosTagGeneral = new ValoresFijosGeneral(ente);

        let nroTransaccion = valoresFijosTagGeneral.getNroTransaccion();
        let nroRendicion = valoresFijosTagGeneral.getNroRendicion();
        const [cbuOrigen, cuitOrigen, cbuDestino, cuitDestino] = valoresFijosTagGeneral.getCbusyCuits();
        let totalImpRecaudadoYDepositadoYADepositar = valoresFijosTagGeneral.getTotalImpRecaudadoYDepositadoYADepositar();
  

        //Valores que son siempre fijos del tag Sucursal
        let valoresFijosTagSucursal = new ValoresFijosSucursal(ente);
        let sucursal = valoresFijosTagSucursal.getSucursal();
        let totalImpRecaudadoYDepositadoYADepositarSuc = valoresFijosTagSucursal.getTotalImpRecaudadoYDepositadoYADepositar();

        //Valores que son siempre fijos del tag Pagos
        let valoresFijosTagPagos = new ValoresFijosPagos();
        let codigoRegistroPagos = valoresFijosTagPagos.getCodigoRegistro();
        let caja = valoresFijosTagPagos.getCaja();
        let cajero = valoresFijosTagPagos.getCajero();



        //Valores que son siempre fijos del tag DetallePago
        let valoresFijosTagDP = new ValoresFijosDP(ente);
        let codRegistroDP = valoresFijosTagDP.getCodigoRegistro();
        let marcaMovimiento = valoresFijosTagDP.getMarcaMovimiento();
        let tipoOperacion = valoresFijosTagDP.getTipoOperacion();
        let tipoRendicion = valoresFijosTagDP.getTipoRendicion();
        let moneda = valoresFijosTagDP.getMoneda();
        let obligacion = valoresFijosTagDP.getObligacion();
        let nroControl = valoresFijosTagDP.getNroControl();
        //let objImponible = valoresFijosTagDP.getObjImponible();





        /*Valores que necesitan ser calculados o transformados a partir de los datos ingresados. Para ello,
        instanciamos la clase ValoresCalculablesEntesVarios*/
        let valoresCalculablesEntesVarios = new ValoresCalculablesEntesVarios(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2, nroDeComercio, nroLote);
        let cantRegistros = valoresCalculablesEntesVarios.calcCantRegistros();
        let totalImpDeterminadoPagado = valoresCalculablesEntesVarios.calcTotalImportesDeterminadoYPagado();
        let nroComercio = valoresCalculablesEntesVarios.getNroComercio();
        let lote = valoresCalculablesEntesVarios.getLote();
        let arrFechasPagos = valoresCalculablesEntesVarios.transformarFechaPagos();
        let fechaDeRendicion = valoresCalculablesEntesVarios.transformarFechaRendicion();

        let arrNroImpuesto = valoresCalculablesEntesVarios.extraerNroImpuestos();
        let arrObligacion = valoresCalculablesEntesVarios.extraerObligacion();
        let arrObjImponible = valoresCalculablesEntesVarios.extraerObjImponible();
        let arrNroLiquidaciones = valoresCalculablesEntesVarios.extraerNroLiquidacion();
        let arrFechaVencimiento = valoresCalculablesEntesVarios.extraerFechaVencimiento();
        let [totalImportes, arrImpDeterminadoYPagado] = valoresCalculablesEntesVarios.calcImpDeterminadoYPagadoDeCodBarras();        


        /*Para la parte de los ivas, usamos la interfaz definida para trabajar con ello. En este caso,
        instanciamos la clase IVATAGGeneral e IVATagSucursalYPagos*/
        let calculosIVAYComisionTagGeneral = new IVATagGeneral(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2, nroDeComercio, nroLote);
        let calculosIVAYComisionTagSucursalYPagos = new IVATagSucursalYPagos(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2, nroDeComercio, nroLote);
        let calculosIVAYComisionTagDP = new IVATagDetallePago(origen, ente, comisionCred, comisionDeb, fechaRendicion, boletas, importes, fechasPagos, cantCuotas, cuotaActuales, codBarras1, codBarras2, nroDeComercio, nroLote);

        let comisionTagGeneral = calculosIVAYComisionTagGeneral.calcComision();
        let ivaTagGeneral = calculosIVAYComisionTagGeneral.calcIva();

        let comisionTagSucursalYPagos = calculosIVAYComisionTagSucursalYPagos.calcComision();
        let ivaTagSucursalYPagos = calculosIVAYComisionTagSucursalYPagos.calcIva()

        let arrayComisiones = calculosIVAYComisionTagDP.calcComision();
        let arrayIVAs = calculosIVAYComisionTagDP.calcIva();

        
        return [nroBanco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
                cantRegistros, totalImpDeterminadoPagado, totalImpRecaudadoYDepositadoYADepositar, totalImpRecaudadoYDepositadoYADepositarSuc, comisionTagGeneral,
                ivaTagGeneral, sucursal, comisionTagSucursalYPagos, ivaTagSucursalYPagos, codigoRegistroPagos, caja,
                cajero, lote, codRegistroDP, marcaMovimiento, tipoOperacion, tipoRendicion, moneda, arrayBoletas, arrFechasPagos,
                arrayImportes, arrayComisiones, arrayIVAs, nroComercio, arrayCantCuotas, arrayCuotasActuales, obligacion, arrayBarras1, arrayBarras2,
                arrNroImpuesto, arrObligacion, arrObjImponible, arrFechaVencimiento, arrNroLiquidaciones, totalImportes, arrImpDeterminadoYPagado, nroControl]
    }
}


module.exports = {
    GeneradorEntesVarios
}