const fs = require('fs');
const { GeneradorXMLBPC } = require('../generador/generadorBPC');

var builder = require('xmlbuilder2');

const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')

const indices = require('../controllers/bpcExtractionValues.js');

//Leo archivo
const indicesValoresBPC = fs.readFileSync('configuration/bpcValues.json', 'utf-8')
const arrIndicesValoresBPC = JSON.parse(indicesValoresBPC);

exports.obtenerExtraccionValoresBPC = (req, res) => {
    try {
        const indicesValoresBPC = arrIndicesValoresBPC;
        res.json(indicesValoresBPC);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.obtenerExtraccionValorBPC = (req, res) => {
    try {
        let campoAModificar = req.params.campo;
        let origenDelCampo = req.params.origen;

        for (let i = 0; i < arrIndicesValoresBPC.length; i++) {
            let lenValores = Object.keys(arrIndicesValoresBPC[i].valores);
            if (arrIndicesValoresBPC[i].origen === origenDelCampo) {
                for (let j = 0; j < lenValores.length; j++) {
                    if (lenValores[j] === campoAModificar) {
                        const indicesValoresBPC = arrIndicesValoresBPC[i].valores[campoAModificar];
                        res.json(indicesValoresBPC);
                        break;
                    }
                }
            }
        }

        //const indicesValoresBPC = arrIndicesValoresBPC;
        //res.json(indicesValoresBPC);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
        
    }
}

exports.updateExtraccionValoresBPC = (req, res) => {
    try {
        let campoAModificar = req.params.campo;
        let origenDelCampo = req.params.origen;

        for (let i = 0; i < arrIndicesValoresBPC.length; i++) {
            let lenValores = Object.keys(arrIndicesValoresBPC[i].valores);
            if (arrIndicesValoresBPC[i].origen === origenDelCampo) {
                for (let j = 0; j < lenValores.length; j++) {
                if (lenValores[j] === campoAModificar) {
                    arrIndicesValoresBPC[i].valores[campoAModificar].inicio = req.body.inicio;
                    arrIndicesValoresBPC[i].valores[campoAModificar].fin = req.body.fin;
                    break;
                }
              }
            }
          }

        const jsonBPC = JSON.stringify(arrIndicesValoresBPC);
        fs.writeFileSync('configuration/bpcValues.json', jsonBPC, 'utf-8');

        res.send('OK!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.crearXMLBPC = (req, res) => {
    try {
        let formatoXML = req.body.formatoXML;
        let origen = req.body.origen;
        let fechaRendicion = req.body.fechaRendicion;
        let codBarras1Presencial = req.body.codBarras1Presencial;
        let codBarras2Presencial = req.body.codBarras2Presencial;
        let codBarras1Electronico = req.body.codBarras1Electronico;
        let codBarras2Electronico = req.body.codBarras2Electronico;

        const [indiceInicioNroImpuesto, indiceFinNroImpuesto, indiceInicioFechaVencimiento, indiceFinFechaVencimiento,
            indiceInicioObjImponible, indiceFinObjImponible, indiceInicioNroControl, indiceFinNroControl,
            indiceInicioNroLiquidacion, indiceFinNroLiquidacion, indiceInicioObligacion, indiceFinObligacion,
            indiceInicioImpDeterminadoYPagado, indiceFinImpDeterminadoYPagado, indiceInicioImpRecaudado,
            indiceFinImpRecaudado, indiceInicioImpDepositadoYADepositar, indiceFinImpDepositadoYADepositar,
            indiceInicioCodigoER, indiceFinCodigoER, indiceInicioSucursal, indiceFinSucursal, indiceInicioBoletas,
            indiceFinBoletas, indiceInicioNroControlElectronico,
            indiceFinNroControlElectronico, indiceInicioFechaEmision, indiceFinFechaEmision] = indices.definirValoresSegunOrigen(origen);

        let xmlBPC = new GeneradorXMLBPC();

        if (formatoXML === "Pago presencial") {
            const [banco, nroTransaccion, nroRendicion, fechaDeRendicionInput, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
                cantRegistros, totalImportes, impRecaudado, impDepositado, impADepositar, comision, iva,
                sucursal, codRegistro, caja, cajero, lote, codRegistroDP, arrayNroImpuestos, arrayFechasVencimiento,
                arrayObjImponibles, arrayNroControl, marcaMovimiento, tipoOperacion, tipoRendicion, moneda,
                arrayNroLiquidaciones, arrayObligaciones, arrayCodBarra1Pres, arrayCodBarra2Pres, arrayFechasPagos,
                importesPorCadaDetalle] = xmlBPC.generarXMLPresencial(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);
            console.log("Creando XML BPC desde crear XML");
            var xml = builder.create({ version: '1.0', encoding: 'UTF-8' })
                .ele('General', {
                    'banco': banco, 'nroTransaccion': nroTransaccion, 'nroRendicion': nroRendicion,
                    'fechaRendicion': fechaDeRendicionInput, 'cbuOrigen': cbuOrigen,
                    'cuitOrigen': cuitOrigen, 'cbuDestino': cbuDestino, 'cuitDestino': cuitDestino,
                    'registros': cantRegistros, 'totalImpDeterminado': totalImportes, 'totalImpPagado': totalImportes,
                    'totalImpRecaudado': impRecaudado, 'totalImpDepositado': impDepositado, 'totalImpADepositar': impADepositar,
                    'totalImpComision': comision, 'totalImpIVA': iva
                })
                .ele('Sucursal', {
                    'sucursal': sucursal, 'registros': cantRegistros, 'totalImpDeterminado': totalImportes,
                    'totalImpPagado': totalImportes, 'totalImpRecaudado': impRecaudado, 'totalImpDepositado': impDepositado,
                    'totalImpADepositar': impADepositar, 'totalImpComision': comision, 'totalImpIVA': iva
                })
                .ele('Pagos', {
                    'codigoRegistro': codRegistro, 'caja': caja, 'cajero': cajero, 'fechaAcreditacion': fechaDeRendicionInput,
                    'lote': lote, 'registros': cantRegistros, 'totalImpDeterminado': totalImportes,
                    'totalImpPagado': totalImportes, 'totalImpComision': comision, 'totalImpIVA': iva
                });

            for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
                var tagDP = xml.ele('DetallePago');
                tagDP.att('codigoRegistro', codRegistroDP);
                tagDP.att('nroRegistro', i + 1);
                tagDP.att('impuesto', arrayNroImpuestos[i]);
                tagDP.att('fechaVencimiento', arrayFechasVencimiento[i]);
                tagDP.att('idObjetoImponible', arrayObjImponibles[i]);
                tagDP.att('nroControl', arrayNroControl[i]);
                tagDP.att('marcaMovimiento', marcaMovimiento);
                tagDP.att('tipoOperacion', tipoOperacion);
                tagDP.att('tipoRendicion', tipoRendicion);
                tagDP.att('moneda', moneda);
                tagDP.att('nroLiquidacionOriginal', arrayNroLiquidaciones[i]);
                tagDP.att('nroLiquidacionActualizado', arrayNroLiquidaciones[i]);
                tagDP.att('obligacion', arrayObligaciones[i]);
                tagDP.att('barra1', arrayCodBarra1Pres[i]);
                tagDP.att('barra2', arrayCodBarra2Pres[i]);
                tagDP.att('fechaPago', arrayFechasPagos[i]);
                tagDP.att('impDeterminado', importesPorCadaDetalle[i]);
                tagDP.att('impPagado', importesPorCadaDetalle[i]);
                tagDP.att('impComision', comision);
                tagDP.att('impIVA', iva);
            }

            var xmlWithDP = xml.end({ prettyPrint: true });

            fs.writeFile("test.xml", xmlWithDP, function (err) {
                if (err) {
                    res.send('Hubo un error: ' + err);
                    return console.log(err);
                }

                console.log("Archivo guardado");

                res.send(xmlWithDP);
                res.download(xmlWithDP);

            });
        }

        else if (formatoXML === "Pago electronico") {
            const [banco, nroTransaccion, nroRendicion, fechaDeRendicionInput, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
                cantRegistros, impDeterminado, impPagado, totalImpRecaudado, totalImpDepositadoYADepositar, comision, iva,
                sucursal, codRegistro, caja, cajero, lote, codRegistroDD, codigoER, sucursalDD, boletaDeposito, fechaEmision,
                nroControlElectornico, impRecaudadoPorDetalle, impDepoYADepoPorDetalle, arrayCodBarra1Elec, fechaDeposito] =
                xmlBPC.generarXMLElectronico(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);

            console.log("Creando XML BPC desde crear XML");
            var xml = builder.create({ version: '1.0', encoding: 'UTF-8' })
                .ele('General', {
                    'banco': banco, 'nroTransaccion': nroTransaccion, 'nroRendicion': nroRendicion,
                    'fechaRendicion': fechaDeRendicionInput, 'cbuOrigen': cbuOrigen,
                    'cuitOrigen': cuitOrigen, 'cbuDestino': cbuDestino, 'cuitDestino': cuitDestino,
                    'registros': cantRegistros, 'totalImpDeterminado': impDeterminado, 'totalImpPagado': impPagado,
                    'totalImpRecaudado': totalImpRecaudado, 'totalImpDepositado': totalImpDepositadoYADepositar, 'totalImpADepositar': totalImpDepositadoYADepositar,
                    'totalImpComision': comision, 'totalImpIVA': iva
                })
                .ele('Sucursal', {
                    'sucursal': sucursal, 'registros': cantRegistros, 'totalImpDeterminado': impDeterminado,
                    'totalImpPagado': impPagado, 'totalImpRecaudado': totalImpRecaudado, 'totalImpDepositado': totalImpDepositadoYADepositar,
                    'totalImpADepositar': totalImpDepositadoYADepositar, 'totalImpComision': comision, 'totalImpIVA': iva
                })
                .ele('Deposito', {
                    'codigoRegistro': codRegistro, 'caja': caja, 'cajero': cajero, 'fechaAcreditacion': fechaDeRendicionInput,
                    'lote': lote, 'registros': cantRegistros, 'totalImpRecaudado': totalImpRecaudado,
                    'totalImpDepositado': totalImpDepositadoYADepositar, 'totalImpADepositar': totalImpDepositadoYADepositar,
                    'totalImpComision': comision, 'totalImpIVA': iva
                });

            for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
                var tagDP = xml.ele('DetalleDeposito');
                tagDP.att('codigoRegistro', codRegistroDD);
                tagDP.att('nroRegistro', i + 1);
                tagDP.att('codigoER', codigoER[i]);
                tagDP.att('sucursal', sucursalDD[i]);
                tagDP.att('boletaDeposito', boletaDeposito[i]);
                tagDP.att('fechaEmision', fechaEmision[i]);
                tagDP.att('nroControl', nroControlElectornico[i]);
                tagDP.att('fechaDeposito', fechaDeposito[i]);
                tagDP.att('impRecaudado', impRecaudadoPorDetalle[i]);
                tagDP.att('impDepositado', impDepoYADepoPorDetalle[i]);
                tagDP.att('impADepositar', impDepoYADepoPorDetalle[i]);
                tagDP.att('impComision', comision);
                tagDP.att('impIVA', iva);
            }

            var xmlWithDP = xml.end({ prettyPrint: true });

            fs.writeFile("test.xml", xmlWithDP, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("Archivo guardado");

                res.send(xmlWithDP);
                res.download(xmlWithDP);

            });
        }

        else {
            const [banco, nroTransaccion, nroRendicion, fechaDeRendicion, cbuOrigen, cuitOrigen, cbuDestino, cuitDestino,
                cantRegistros, cantRegistrosPresenciales, cantRegistrosElectronicos, totalImpDeterminadoPagado, totalImpRecaudado, totalImpDepositadoYADepositar, comision, iva,
                sucursal, codigoRegistroPagos, codigoRegistroDeposito, caja, cajero, lotePagos, loteDeposito, codRegistroDP, arrayNroImpuestos, arrayFechasVencimiento,
                arrayObjImponibles, arrayNroControl, marcaMovimiento, tipoOperacion, tipoRendicion, moneda, arrayNroLiquidaciones,
                arrayObligaciones, arrayCodBarra1Pres, arrayCodBarra2Pres, arrayFechasPagos, importesDeterminadoPagadoPorCadaDetalle,
                codRegistroDD, codigoER, sucursalDD, boletaDeposito, fechaEmision,
                nroControlElectornico, impRecaudadoPorDetalle, impDepoYADepoPorDetalle, arrayCodBarra1Elec, fechasDeposito] =
                xmlBPC.generarXMLAmbosPagos(origen, fechaRendicion, codBarras1Presencial, codBarras2Presencial, codBarras1Electronico, codBarras2Electronico);

            console.log("Creando XML BPC desde crear XML ambos");

            const source = `<?xml version="1.0" encoding="UTF-8"?>`


            const doc = new DOMParser().parseFromString(source, 'application/xml');
            var tagGeneral = doc.createElement("General");
            var tagSucursal = doc.createElement("Sucursal");
            var tagPagos = doc.createElement("Pagos");
            var tagDetallePagos = doc.createElement("DetallePago");
            var tagDeposito = doc.createElement("Deposito");
            var tagDetalleDeposito = doc.createElement("DetalleDeposito");


            tagGeneral.setAttribute("banco", banco);
            tagGeneral.setAttribute("nroTransaccion", nroTransaccion);
            tagGeneral.setAttribute("nroRendicion", nroRendicion);
            tagGeneral.setAttribute("fechaRendicion", fechaDeRendicion);
            tagGeneral.setAttribute("cbuOrigen", cbuOrigen);
            tagGeneral.setAttribute("cuitOrigen", cuitOrigen);
            tagGeneral.setAttribute("cbuDestino", cbuDestino);
            tagGeneral.setAttribute("cuitDestino", cuitDestino);
            tagGeneral.setAttribute("registros", cantRegistros);
            tagGeneral.setAttribute("totalImpDeterminado", totalImpDeterminadoPagado);
            tagGeneral.setAttribute("totalImpPagado", totalImpDeterminadoPagado);
            tagGeneral.setAttribute("totalImpRecaudado", totalImpRecaudado);
            tagGeneral.setAttribute("totalImpDepositado", totalImpDepositadoYADepositar);
            tagGeneral.setAttribute("totalImpADepositar", totalImpDepositadoYADepositar);
            tagGeneral.setAttribute("totalImpComision", comision);
            tagGeneral.setAttribute("totalImpIVA", iva);


            tagSucursal.setAttribute("sucursal", sucursal);
            tagSucursal.setAttribute("registros", cantRegistros);
            tagSucursal.setAttribute("totalImpDeterminado", totalImpDeterminadoPagado);
            tagSucursal.setAttribute("totalImpPagado", totalImpDeterminadoPagado);
            tagSucursal.setAttribute("totalImpRecaudado", totalImpRecaudado);
            tagSucursal.setAttribute("totalImpDepositado", totalImpDepositadoYADepositar);
            tagSucursal.setAttribute("totalImpADepositar", totalImpDepositadoYADepositar);
            tagSucursal.setAttribute("totalImpComision", comision);
            tagSucursal.setAttribute("totalImpIVA", iva);


            tagPagos.setAttribute("codigoRegistro", codigoRegistroPagos);
            tagPagos.setAttribute("caja", caja);
            tagPagos.setAttribute("cajero", cajero);
            tagPagos.setAttribute("fechaAcreditacion", fechaDeRendicion) //fechaAcreditacion = fechaDeRendicion, por eso uso la misma variable
            tagPagos.setAttribute("lote", lotePagos);
            tagPagos.setAttribute("registros", cantRegistrosPresenciales);
            tagPagos.setAttribute("totalImpDeterminado", totalImpDeterminadoPagado);
            tagPagos.setAttribute("totalImpPagado", totalImpDeterminadoPagado);
            tagPagos.setAttribute("totalImpComision", comision);
            tagPagos.setAttribute("totalImpIVA", iva);


            tagGeneral.appendChild(tagSucursal);
            tagSucursal.appendChild(tagPagos);

            for (let i = 0; i < arrayCodBarra1Pres.length; i++) {
                var tagDetallePagos = doc.createElement("DetallePago");
                tagDetallePagos.setAttribute("codigoRegistro", codRegistroDP);
                tagDetallePagos.setAttribute("nroRegistro", i + 1);
                tagDetallePagos.setAttribute("impuesto", arrayNroImpuestos[i]);
                tagDetallePagos.setAttribute("fechaVencimiento", arrayFechasVencimiento[i]);
                tagDetallePagos.setAttribute("idObjetoImponible", arrayObjImponibles[i]);
                tagDetallePagos.setAttribute("nroControl", arrayNroControl[i]);
                tagDetallePagos.setAttribute("marcaMovimiento", marcaMovimiento);
                tagDetallePagos.setAttribute("tipoOperacion", tipoOperacion);
                tagDetallePagos.setAttribute("tipoRendicion", tipoRendicion);
                tagDetallePagos.setAttribute("moneda", moneda);
                tagDetallePagos.setAttribute("nroLiquidacionOriginal", arrayNroLiquidaciones[i]);
                tagDetallePagos.setAttribute("nroLiquidacionActualizado", arrayNroLiquidaciones[i]);
                tagDetallePagos.setAttribute("obligacion", arrayObligaciones[i]);
                tagDetallePagos.setAttribute("barra1", arrayCodBarra1Pres[i]);
                tagDetallePagos.setAttribute("barra2", arrayCodBarra2Pres[i]);
                tagDetallePagos.setAttribute("fechaPago", arrayFechasPagos[i]);
                tagDetallePagos.setAttribute("impDeterminado", importesDeterminadoPagadoPorCadaDetalle[i]);
                tagDetallePagos.setAttribute("impPagado", importesDeterminadoPagadoPorCadaDetalle[i]);
                tagDetallePagos.setAttribute("impComision", comision);
                tagDetallePagos.setAttribute("impIVA", iva);
                tagPagos.appendChild(tagDetallePagos);

            }

            tagDeposito.setAttribute("codigoRegistro", codigoRegistroDeposito);
            tagDeposito.setAttribute("caja", caja);
            tagDeposito.setAttribute("cajero", cajero);
            tagDeposito.setAttribute("fechaAcreditacion", fechaDeRendicion) //fechaAcreditacion = fechaDeRendicion, por eso uso la misma variable
            tagDeposito.setAttribute("lote", loteDeposito);
            tagDeposito.setAttribute("registros", cantRegistrosElectronicos);
            tagDeposito.setAttribute("totalImpRecaudado", totalImpRecaudado);
            tagDeposito.setAttribute("totalImpDepositado", totalImpDepositadoYADepositar);
            tagDeposito.setAttribute("totalImpADepositar", totalImpDepositadoYADepositar);
            tagDeposito.setAttribute("totalImpComision", comision);
            tagDeposito.setAttribute("totalImpIVA", iva);

            tagSucursal.appendChild(tagDeposito);

            for (let i = 0; i < arrayCodBarra1Elec.length; i++) {
                var tagDetalleDeposito = doc.createElement("DetalleDeposito");
                tagDetalleDeposito.setAttribute("codigoRegistro", codRegistroDD);
                tagDetalleDeposito.setAttribute("nroRegistro", i + 1);
                tagDetalleDeposito.setAttribute("codigoER", codigoER[i]);
                tagDetalleDeposito.setAttribute("sucursal", sucursalDD[i]);
                tagDetalleDeposito.setAttribute("boletaDeposito", boletaDeposito[i]);
                tagDetalleDeposito.setAttribute("fechaEmision", fechaEmision[i]);
                tagDetalleDeposito.setAttribute("nroControl", nroControlElectornico[i]);
                tagDetalleDeposito.setAttribute("fechaDeposito", fechasDeposito[i]);
                tagDetalleDeposito.setAttribute("impRecaudado", impRecaudadoPorDetalle[i]);
                tagDetalleDeposito.setAttribute("impDepositado", impDepoYADepoPorDetalle[i]);
                tagDetalleDeposito.setAttribute("impADepositar", impDepoYADepoPorDetalle[i]);
                tagDetalleDeposito.setAttribute("impComision", comision);
                tagDetalleDeposito.setAttribute("impIVA", iva);
                tagDeposito.appendChild(tagDetalleDeposito);

            }

            doc.appendChild(tagGeneral);
            //console.log(doc);
            const serialized = new XMLSerializer().serializeToString(doc);
            //console.log(serialized);

            fs.writeFile("test.xml", serialized, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("Archivo guardado");

                res.send(serialized);
                res.download(serialized);

            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');

    }
}