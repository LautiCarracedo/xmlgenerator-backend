const fs = require('fs');


const leerJSONEntesVarios = () => {
    let rawdata = fs.readFileSync('./configuration/entesUpdate.json');
    let rawdataRef = fs.readFileSync('./configuration/entesVariosRef.json');
    let arrayEntes = JSON.parse(rawdata);
    let camposRef = JSON.parse(rawdataRef);

    //console.log(arrayEntes);

    return [camposRef, arrayEntes];
}

const definirBancoInput = (ente) => {
    const [camposRef, arrayEntes] = leerJSONEntesVarios();

    let banco = "";
    let comisionCred = 0;
    let comisionDeb = 0;
    let nroComercio = "";
    let lote = 0;

    for(let i = 0; i < arrayEntes.length; i++){
        if (arrayEntes[i].nroEnte === ente){
            //console.log('ente', arrayEntes[i])
            banco = arrayEntes[i].nroEnte;
            comisionCred = arrayEntes[i].comisionCredito;
            comisionDeb = arrayEntes[i].comisionDebito;
            nroComercio = arrayEntes[i].nroComercio;
            lote = arrayEntes[i].lote;
            break;
        }
    }

    //console.log(banco, comisionCred, comisionDeb, nroComercio, lote);

    return [banco, comisionCred, comisionDeb, nroComercio, lote];
}

const definirFormatoXML = (origen, ente) => {
    const [camposRef, arrayEntes] = leerJSONEntesVarios();
    let arrayTagGeneralAGenerar = [];
    let arrayTagSucursalAGenerar = [];
    let arrayTagPagosAGenerar = [];
    let arrayTagDetallePagoAGenerar = [];

    let arrayTagGeneralEnte = [];
    let arrayTagSucursalEnte = [];
    let arrayTagPagosEnte = [];
    let arrayTagDetallePagoEnte = [];

    let arrayCamposRefTagGeneral = [];
    let arrayCamposRefTagSucursal = [];
    let arrayCamposRefTagPagos = [];
    let arrayCamposRefTagDetallePagos = [];

    let cantidadEntesCargados = 0;

    //Defino origen
    if (origen === "PSRM"){
        for(let i = 0; i < arrayEntes.length; i++){
            if (arrayEntes[i].origen === "PSRM"){
                cantidadEntesCargados += 1;
            }
        }

        arrayCamposRefTagGeneral = camposRef.origenPSRM.tagGeneral;
        arrayCamposRefTagSucursal = camposRef.origenPSRM.tagSucursal;
        arrayCamposRefTagPagos = camposRef.origenPSRM.tagPagos;
        arrayCamposRefTagDetallePagos = camposRef.origenPSRM.tagDetallePago;
    }
    else if (origen === "OTAX"){
        for(let i = 0; i < arrayEntes.length; i++){
            if (arrayEntes[i].origen === "OTAX"){
                cantidadEntesCargados += 1;
            }
        }

        arrayCamposRefTagGeneral = camposRef.origenOTAX.tagGeneral;
        arrayCamposRefTagSucursal = camposRef.origenOTAX.tagSucursal;
        arrayCamposRefTagPagos = camposRef.origenOTAX.tagPagos;
        arrayCamposRefTagDetallePagos = camposRef.origenOTAX.tagDetallePago;
    }
    else{
        for(let i = 0; i < arrayEntes.length; i++){
            if (arrayEntes[i].origen === "GANT"){
                cantidadEntesCargados += 1;
            }
        }

        arrayCamposRefTagGeneral = camposRef.origenGANT.tagGeneral;
        arrayCamposRefTagSucursal = camposRef.origenGANT.tagSucursal;
        arrayCamposRefTagPagos = camposRef.origenGANT.tagPagos;
        arrayCamposRefTagDetallePagos = camposRef.origenGANT.tagDetallePago;
    }

    //Defino ente
    for(let i = 0; i < cantidadEntesCargados; i++){
        let nroEnte = arrayEntes[i].nroEnte;
        if (nroEnte === ente) {
            arrayTagGeneralEnte = arrayEntes[i].tagGeneral;
            arrayTagSucursalEnte = arrayEntes[i].tagSucursal;
            arrayTagPagosEnte = arrayEntes[i].tagPagos;
            arrayTagDetallePagoEnte = arrayEntes[i].tagDetallePago;
            break;
        }
    }

    //Luego de definir el origen y el ente que se ingresaron, comparo los campos que deben tener cada tag de dicho ente con los de referencia.
    for (let i = 0; i < arrayCamposRefTagGeneral.length; i++) {
        if (i in arrayTagGeneralEnte) {
            arrayTagGeneralAGenerar.push(arrayTagGeneralEnte[i]);
        }
    }

    for (let i = 0; i < arrayCamposRefTagSucursal.length; i++) {
        if (i in arrayTagSucursalEnte) {
            arrayTagSucursalAGenerar.push(arrayTagSucursalEnte[i]);
        }
    }

    for (let i = 0; i < arrayCamposRefTagPagos.length; i++) {
        if (i in arrayTagPagosEnte) {
            arrayTagPagosAGenerar.push(arrayTagPagosEnte[i]);
        }
    }

    for (let i = 0; i < arrayCamposRefTagDetallePagos.length; i++) {
        if (i in arrayTagDetallePagoEnte) {
            arrayTagDetallePagoAGenerar.push(arrayTagDetallePagoEnte[i]);
        }
    }
    
    //console.log(arrayTagGeneralAGenerar);
    return [arrayTagGeneralAGenerar, arrayTagSucursalAGenerar, arrayTagPagosAGenerar, arrayTagDetallePagoAGenerar]

}

module.exports = {
    definirFormatoXML,
    definirBancoInput
}