const { ValoresInputBPC, ValoresFijosGeneralBPC, ValoresFijosSucursalBPC, ValoresFijosDPBPC, ValoresCalculablesBPC, ImporteBPCPresencial, ImporteBPCElectronico, ValoresFijosPagosBPC, ImporteBPCPresencialYElectronico } = require('../models/modelBPC');
const indices = require('../controllers/bpcExtractionValues.js');
/**
 * Clase Generador para BPC. Contiene 3 métodos que permiten generar los archivos XML según se requiera,
 * (presencial, electronico, o ambos). Se separa en 3 métodos ya que cada uno tiene su particularidad.
 * Esto permite no contener sentencias if o case preguntando por el formato a generar.
 */

 class GeneradorXMLBPC{
    generarXMLPresencial(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico){
        const [indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
            indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
            indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
            indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
            indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
            indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas, 
            indiceFinBoletas, indiceInicioNroControlElectronico,
            indiceFinNroControlElectronico, indiceInicioFechaEmision, indiceFinFechaEmision] = indices.definirValoresSegunOrigen(origen);
        

        /*Instanciamos las clases: ValoresInputBPC, ValoresFijosGeneralBPC, ValoresFijosSucursalBPC, ValoresFijosPagosBPC,
        ValoresFijosDPBPC. En cada clase se explica que función cumple cada una.*/

        //Valores que son los input de la interfaz, los cargamos en clase ValoresInputBPC
        let valoresInputBPC = new ValoresInputBPC(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico)

        let origenInput = valoresInputBPC.getOrigen();
        let fechaDeRendicionInput = valoresInputBPC.getFechaRendicion();
        let codBarras1PresencialInput = valoresInputBPC.getCodBarras1Presencial();
        
        //Valores que son siempre fijos del tag General
        let valoresFijosGeneralBPC = new ValoresFijosGeneralBPC();
        let banco = valoresFijosGeneralBPC.getNroBanco();
        let nroTransaccion = valoresFijosGeneralBPC.getNroTransaccion();
        let nroRendicion = valoresFijosGeneralBPC.getNroRendicion();
        let [cbuOrigen, cuitOrigen, cbuDestino, cuitDestino] = valoresFijosGeneralBPC.getCbusyCuits();


        //Valores que son siempre fijos del tag Sucursal
        let valoresFijosSucursalBPC = new ValoresFijosSucursalBPC();
        let sucursal = valoresFijosSucursalBPC.getSucursal();

        //Valores que son siempre fijos del tag Pagos
        let valoresFijosPagosBPC = new ValoresFijosPagosBPC();
        let codRegistro = valoresFijosPagosBPC.getCodigoRegistro();
        let caja = valoresFijosPagosBPC.getCaja();
        let cajero = valoresFijosPagosBPC.getCajero();
        let lote = valoresFijosPagosBPC.getLote();

        //Valores que son siempre fijos del tag DetallePago
        let valoresFijosDPBPC = new ValoresFijosDPBPC();
        let codRegistroDP = valoresFijosDPBPC.getCodigoRegistro();
        let marcaMovimiento = valoresFijosDPBPC.getMarcaMovimiento();
        let tipoOperacion = valoresFijosDPBPC.getTipoOperacion();
        let tipoRendicion = valoresFijosDPBPC.getTipoRendicion();
        let moneda = valoresFijosDPBPC.getMoneda();

        /*Valores que necesitan ser calculados a partir de los codigos de barras ingresados. Para ello,
        instanciamos la clase ValoresCalculablesBPC, con los codigos de barras ingresados*/
        let valoresCalculablesBPC = new ValoresCalculablesBPC(fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);

        let cantRegistros = valoresCalculablesBPC.calcRegistros();
        let arrayNroImpuestos = valoresCalculablesBPC.extraerNroImpuestos(indiceInicioNroImpuesto, indiceFinNroImpuesto);
        let arrayCodBarra1Pres = valoresCalculablesBPC.getCodBarras1Presencial();
        let arrayCodBarra2Pres = valoresCalculablesBPC.getcodBarras2Presencial();
        let arrayFechasVencimiento = valoresCalculablesBPC.extraerFechaVencimiento();
        let arrayObjImponibles = valoresCalculablesBPC.extraerObjImponible(indiceInicioObjImponible, indiceFinObjImponible);
        let arrayNroControl = valoresCalculablesBPC.extraerNroControl(indiceInicioNroControl, indiceFinNroControl);
        let arrayNroLiquidaciones = valoresCalculablesBPC.extraerNroLiquidacion(indiceInicioNroLiquidacion, indiceFinNroLiquidacion);
        let arrayObligaciones = valoresCalculablesBPC.extraerObligacion(indiceInicioObligacion, indiceFinObligacion);
        let arrayFechasPagos = valoresCalculablesBPC.extraerFechaPago();


        /*Para la parte de los importes, usamos la interfaz definida para trabajar con los importes. En este caso,
        instanciamos la clase ImportesBPCPresencial ya que estamos por generar un XML con formato presencial y usamos sus metodos*/
        let importesBPCPresencial = new ImporteBPCPresencial(codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);
        
        let [totalImportes, importesPorCadaDetalle] = importesBPCPresencial.calcImpDeterminadoYPagado(indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado);
        let impRecaudado = importesBPCPresencial.calcImpRecaudado(indiceInicioImpRecaudado, indiceFinImpRecaudado);
        let [impDepositado, impADepositar] = importesBPCPresencial.calcImpDepositadoYADepositar(indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar);
        let iva = importesBPCPresencial.calcIva();
        let comision = importesBPCPresencial.calcComision();

        return [banco, nroTransaccion, nroRendicion, fechaDeRendicionInput, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
            cantRegistros, totalImportes, impRecaudado, impDepositado, impADepositar, comision, iva, 
            sucursal, codRegistro, caja, cajero, lote, codRegistroDP, arrayNroImpuestos, arrayFechasVencimiento, 
            arrayObjImponibles, arrayNroControl, marcaMovimiento, tipoOperacion, tipoRendicion, moneda,
            arrayNroLiquidaciones, arrayObligaciones, arrayCodBarra1Pres, arrayCodBarra2Pres, arrayFechasPagos,
            importesPorCadaDetalle];
        
    }


    generarXMLElectronico(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico){
        const [indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
            indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
            indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
            indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
            indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
            indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas, 
            indiceFinBoletas, indiceInicioNroControlElectronico,
            indiceFinNroControlElectronico, indiceInicioFechaEmision, indiceFinFechaEmision] = indices.definirValoresSegunOrigen(origen);
        
        /*Instanciamos las clases: ValoresInputBPC, ValoresFijosGeneralBPC, ValoresFijosSucursalBPC, ValoresFijosPagosBPC,
        ValoresFijosDPBPC. En cada clase se explica que función cumple cada una.*/

        //const [origen, fechaRendicion, codBarra1Presencial, codBarra2Presencial, codBarra1Electronico, codBarra2Electronico] = tomarValoresIngresados()
        
        //Valores que son los input de la interfaz, los cargamos en clase ValoresInputBPC
        let valoresInputBPC = new ValoresInputBPC(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico)
        let fechaDeRendicion = valoresInputBPC.getFechaRendicion();
        
        //Valores que son siempre fijos del tag General
        let valoresFijosGeneralBPC = new ValoresFijosGeneralBPC();
        let banco = valoresFijosGeneralBPC.getNroBanco();
        let nroTransaccion = valoresFijosGeneralBPC.getNroTransaccion();
        let nroRendicion = valoresFijosGeneralBPC.getNroRendicion();
        let [cbuOrigen, cuitOrigen, cbuDestino, cuitDestino] = valoresFijosGeneralBPC.getCbusyCuits();
        
        //Valores que son siempre fijos del tag Sucursal
        let valoresFijosSucursalBPC = new ValoresFijosSucursalBPC();
        let sucursal = valoresFijosSucursalBPC.getSucursal();
        
        //Valores que son siempre fijos del tag Pagos
        let valoresFijosPagosBPC = new ValoresFijosPagosBPC();
        let codRegistro = valoresFijosPagosBPC.getCodigoRegistroElectronico();
        let caja = valoresFijosPagosBPC.getCaja();
        let cajero = valoresFijosPagosBPC.getCajero();
        let lote = valoresFijosPagosBPC.getLote();
        
        //Valores que son siempre fijos del tag (en este caso para pagos electronicos se llama DetalleDeposito-no DetallePago-)
        let valoresFijosDPBPC = new ValoresFijosDPBPC();
        let codRegistroDD = valoresFijosDPBPC.getCodigoRegistroElectronico();
   
        
        
        /*Valores que necesitan ser calculados a partir de los codigos de barras ingresados. Para ello,
        instanciamos la clase ValoresCalculablesBPC, con los codigos de barras ingresados*/
        let valoresCalculablesBPC = new ValoresCalculablesBPC(fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);
        
        let cantRegistros = valoresCalculablesBPC.calcRegistrosElectronicos();
        let codigoER = valoresCalculablesBPC.extraerCodigoER(indiceInicioCodigoER, indiceFinCodigoER);
        let sucursalDD = valoresCalculablesBPC.extraerSucursal(indiceInicioSucursal, indiceFinSucursal);
        let boletaDeposito = valoresCalculablesBPC.extraerBoleta(indiceInicioBoletas, indiceFinBoletas);
        let fechaEmision = valoresCalculablesBPC.extraerFechaEmision(indiceInicioFechaEmision, indiceFinFechaEmision);
        let nroControlElectornico = valoresCalculablesBPC.extraerNroControlElectronico(indiceInicioNroControlElectronico, indiceFinNroControlElectronico);
        let arrayCodBarra1Elec = valoresCalculablesBPC.getCodBarras1Electronico();
        let arrayfechasDeposito = valoresCalculablesBPC.getFechaDeposito();


        /*Para la parte de los importes, usamos la interfaz definida para trabajar con los importes. En este caso,
        instanciamos la clase ImporteBPCElectronico ya que estamos por generar un XML con formato electronico y usamos sus metodos*/
        let importesBPCElectronico = new ImporteBPCElectronico(codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);

        let [impDeterminado, impPagado] = importesBPCElectronico.calcImpDeterminadoYPagado(indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado);
        let [totalImpRecaudado, impRecaudadoPorDetalle] = importesBPCElectronico.calcImpRecaudado(indiceInicioImpRecaudado, indiceFinImpRecaudado);
        let [totalImpDepositadoYADepositar, impDepoYADepoPorDetalle] = importesBPCElectronico.calcImpDepositadoYADepositar(indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar);
        let iva = importesBPCElectronico.calcIva();
        let comision = importesBPCElectronico.calcComision();

        return [banco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
            cantRegistros, impDeterminado, impPagado, totalImpRecaudado, totalImpDepositadoYADepositar, comision, iva, 
            sucursal, codRegistro, caja, cajero, lote, codRegistroDD, codigoER, sucursalDD, boletaDeposito, fechaEmision, 
            nroControlElectornico, impRecaudadoPorDetalle, impDepoYADepoPorDetalle, arrayCodBarra1Elec, arrayfechasDeposito];

        
    }

    generarXMLAmbosPagos(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico){
        
        const [indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
            indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
            indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
            indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
            indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
            indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas, 
            indiceFinBoletas, indiceInicioNroControlElectronico,
            indiceFinNroControlElectronico, indiceInicioFechaEmision, indiceFinFechaEmision] = indices.definirValoresSegunOrigen(origen);


        let valoresInputBPC = new ValoresInputBPC(origen,fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico)
        let fechaDeRendicion = valoresInputBPC.getFechaRendicion();
        
        
        let valoresFijosGeneralBPC = new ValoresFijosGeneralBPC();
        let banco = valoresFijosGeneralBPC.getNroBanco();
        let nroTransaccion = valoresFijosGeneralBPC.getNroTransaccion();
        let nroRendicion = valoresFijosGeneralBPC.getNroRendicion();
        let [cbuOrigen, cuitOrigen, cbuDestino, cuitDestino] = valoresFijosGeneralBPC.getCbusyCuits();
        
        let valoresFijosSucursalBPC = new ValoresFijosSucursalBPC();
        let sucursal = valoresFijosSucursalBPC.getSucursal();
        
        let valoresFijosPagosBPC = new ValoresFijosPagosBPC();
        let codigoRegistroPagos = valoresFijosPagosBPC.getCodigoRegistro();
        let codigoRegistroDeposito = valoresFijosPagosBPC.getCodigoRegistroElectronico();
        let caja = valoresFijosPagosBPC.getCaja();
        let cajero = valoresFijosPagosBPC.getCajero();
        let lotePagos = valoresFijosPagosBPC.getLote();
        let loteDeposito = valoresFijosPagosBPC.getLoteDeposito();
        
        let valoresFijosDPBPC = new ValoresFijosDPBPC();
        let codRegistroDP = valoresFijosDPBPC.getCodigoRegistro();
        let codRegistroDD = valoresFijosDPBPC.getCodigoRegistroElectronico();
        let marcaMovimiento = valoresFijosDPBPC.getMarcaMovimiento();
        let tipoOperacion = valoresFijosDPBPC.getTipoOperacion();
        let tipoRendicion = valoresFijosDPBPC.getTipoRendicion();
        let moneda = valoresFijosDPBPC.getMoneda();  
        
        
        //valores calculables
        let valoresCalculablesBPC = new ValoresCalculablesBPC(fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);
        let importesBPCAmbosPagos = new ImporteBPCPresencialYElectronico(codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);
        
        let cantRegistrosElectronicos = valoresCalculablesBPC.calcRegistrosElectronicos();
        let cantRegistrosPresenciales = valoresCalculablesBPC.calcRegistros();
        let cantRegistros = cantRegistrosElectronicos + cantRegistrosPresenciales;
        let codigoER = valoresCalculablesBPC.extraerCodigoER(indiceInicioCodigoER, indiceFinCodigoER);
        let sucursalDD = valoresCalculablesBPC.extraerSucursal(indiceInicioSucursal, indiceFinSucursal);
        let boletaDeposito = valoresCalculablesBPC.extraerBoleta(indiceInicioBoletas, indiceFinBoletas);
        let fechaEmision = valoresCalculablesBPC.extraerFechaEmision(indiceInicioFechaEmision, indiceFinFechaEmision);
        let nroControlElectornico = valoresCalculablesBPC.extraerNroControlElectronico(indiceInicioNroControlElectronico, indiceFinNroControlElectronico);
        let arrayCodBarra1Elec = valoresCalculablesBPC.getCodBarras1Electronico();
        let arrayCodBarra1Pres = valoresCalculablesBPC.getCodBarras1Presencial();
        let arrayCodBarra2Pres = valoresCalculablesBPC.getcodBarras2Presencial();
        let arrayNroImpuestos = valoresCalculablesBPC.extraerNroImpuestos(indiceInicioNroImpuesto, indiceFinNroImpuesto);
        let arrayFechasVencimiento = valoresCalculablesBPC.extraerFechaVencimiento();
        let arrayObjImponibles = valoresCalculablesBPC.extraerObjImponible(indiceInicioObjImponible, indiceFinObjImponible);
        let arrayNroControl = valoresCalculablesBPC.extraerNroControl(indiceInicioNroControl, indiceFinNroControl);
        let arrayNroLiquidaciones = valoresCalculablesBPC.extraerNroLiquidacion(indiceInicioNroLiquidacion, indiceFinNroLiquidacion);
        let arrayObligaciones = valoresCalculablesBPC.extraerObligacion(indiceInicioObligacion, indiceFinObligacion);
        let arrayFechasPagos = valoresCalculablesBPC.extraerFechaPago();
        let arrayFechasDeposito = valoresCalculablesBPC.getFechaDeposito();

        let [totalImpDeterminadoPagado, importesDeterminadoPagadoPorCadaDetalle] = importesBPCAmbosPagos.calcImpDeterminadoYPagado(indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado);
        let [totalImpRecaudado, impRecaudadoPorDetalle] = importesBPCAmbosPagos.calcImpRecaudado(indiceInicioImpRecaudado, indiceFinImpRecaudado);
        let [totalImpDepositadoYADepositar, impDepoYADepoPorDetalle] = importesBPCAmbosPagos.calcImpDepositadoYADepositar(indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar);
        let iva = importesBPCAmbosPagos.calcIva();
        let comision = importesBPCAmbosPagos.calcComision();

        return [banco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
            cantRegistros, cantRegistrosPresenciales, cantRegistrosElectronicos, totalImpDeterminadoPagado, totalImpRecaudado, totalImpDepositadoYADepositar, comision, iva, 
            sucursal, codigoRegistroPagos, codigoRegistroDeposito, caja, cajero, lotePagos, loteDeposito, codRegistroDP, arrayNroImpuestos, arrayFechasVencimiento,
            arrayObjImponibles, arrayNroControl, marcaMovimiento, tipoOperacion, tipoRendicion, moneda, arrayNroLiquidaciones,
            arrayObligaciones, arrayCodBarra1Pres, arrayCodBarra2Pres, arrayFechasPagos, importesDeterminadoPagadoPorCadaDetalle,
            codRegistroDD, codigoER, sucursalDD, boletaDeposito, fechaEmision, 
            nroControlElectornico, impRecaudadoPorDetalle, impDepoYADepoPorDetalle, arrayCodBarra1Elec, arrayFechasDeposito];
        
    }
}

module.exports = {
    GeneradorXMLBPC
}