const fs = require('fs');

//Leo archivo
//const jsonBPCValues = fs.readFileSync('configuration/bpcValues.json','utf-8')
//const arrayValoresBPC = JSON.parse(jsonBPCValues);


const leerJSONBPCExtractionValues = () => {
    let rawdata = fs.readFileSync('./configuration/bpcValues.json','utf-8');
    let arrayValoresBPC = JSON.parse(rawdata);

    return arrayValoresBPC;
}


const definirValoresSegunOrigen = (origen) =>{
    let rawdata = fs.readFileSync('./configuration/bpcValues.json','utf-8');
    let arrayValoresBPC = JSON.parse(rawdata);

    let indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
        indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
        indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
        indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
        indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
        indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas, 
        indiceFinBoletas, indiceInicioNroControlElectronico, indiceFinNroControlElectronico, indiceInicioFechaEmision, 
        indiceFinFechaEmision = 0;

    for(let i = 0; i < arrayValoresBPC.length; i++){

        if (arrayValoresBPC[i].origen === origen){
            indiceInicioNroImpuesto = arrayValoresBPC[i].valores.nroImpuesto.inicio;
            indiceFinNroImpuesto = arrayValoresBPC[i].valores.nroImpuesto.fin;
            indiceInicioFechaVencimiento = arrayValoresBPC[i].valores.fechaVencimiento.inicio;
            indiceFinFechaVencimiento = arrayValoresBPC[i].valores.fechaVencimiento.fin;
            indiceInicioObjImponible = arrayValoresBPC[i].valores.objImponible.inicio;
            indiceFinObjImponible = arrayValoresBPC[i].valores.objImponible.fin;
            indiceInicioNroControl = arrayValoresBPC[i].valores.nroControl.inicio;
            indiceFinNroControl = arrayValoresBPC[i].valores.nroControl.fin;
            indiceInicioNroLiquidacion = arrayValoresBPC[i].valores.nroLiquidacion.inicio;
            indiceFinNroLiquidacion = arrayValoresBPC[i].valores.nroLiquidacion.fin;
            indiceInicioObligacion = arrayValoresBPC[i].valores.obligacion.inicio;
            indiceFinObligacion = arrayValoresBPC[i].valores.obligacion.fin;
            indiceInicioImpDeterminadoYPagado = arrayValoresBPC[i].valores.impDeterminadoYPagado.inicio;
            indiceFinImpDeterminadoYPagado = arrayValoresBPC[i].valores.impDeterminadoYPagado.fin;
            indiceInicioImpRecaudado = arrayValoresBPC[i].valores.impRecaudado.inicio;
            indiceFinImpRecaudado = arrayValoresBPC[i].valores.impRecaudado.fin;
            indiceInicioImpDepositadoYADepositar = arrayValoresBPC[i].valores.impDepositadoYADepositar.inicio;
            indiceFinImpDepositadoYADepositar = arrayValoresBPC[i].valores.impDepositadoYADepositar.fin;
            indiceInicioCodigoER = arrayValoresBPC[i].valores.codigoER.inicio;
            indiceFinCodigoER = arrayValoresBPC[i].valores.codigoER.fin;
            indiceInicioSucursal = arrayValoresBPC[i].valores.sucursal.inicio;
            indiceFinSucursal = arrayValoresBPC[i].valores.sucursal.fin;
            indiceInicioBoletas = arrayValoresBPC[i].valores.boletas.inicio;
            indiceFinBoletas = arrayValoresBPC[i].valores.boletas.fin;
            indiceInicioNroControlElectronico = arrayValoresBPC[i].valores.nroControlElectronico.inicio;
            indiceFinNroControlElectronico = arrayValoresBPC[i].valores.nroControlElectronico.fin;
            indiceInicioFechaEmision = arrayValoresBPC[i].valores.fechaEmision.inicio;
            indiceFinFechaEmision = arrayValoresBPC[i].valores.fechaEmision.fin;
            break;
        }
    }

    return [indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
            indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
            indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
            indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
            indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
            indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas, 
            indiceFinBoletas, indiceInicioNroControlElectronico,
            indiceFinNroControlElectronico, indiceInicioFechaEmision, indiceFinFechaEmision];
}



module.exports = {
    definirValoresSegunOrigen
}