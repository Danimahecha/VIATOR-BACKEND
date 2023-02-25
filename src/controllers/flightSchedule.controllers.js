const { Op } = require('sequelize');
const {Flight, Airline} = require('../db.js');

function fechaConversion(date) {
    let fechaDivide = date.split('-')
    let año = fechaDivide[0]
    let mes = fechaDivide[1]
    let dia = fechaDivide[2]

    let fechaNew = new Date(año,mes-1,dia)

    return fechaNew.toISOString();
}

function sumarUnDiaAFechaISO(fechaISO) {
    var fecha = new Date(fechaISO);
    fecha.setDate(fecha.getDate() + 1);
    var fechaISOSiguienteDia = fecha.toISOString();
    return fechaISOSiguienteDia;
    }

const flightSchedule =async(req,res) =>{
    // el tipo de formato que deben tener las 2 propiedades en req.body es asi YY/MM/DD >> 2023/02/22
    // que incluyan un 0 antes los numeros del 1 al 9
    const {ida,vuelta,origen,destino} = req.body;
    let timeIda = fechaConversion(ida)
    let timeVuelta="";
    if (vuelta === "") {
        timeVuelta = ""
    }else{
        timeVuelta = fechaConversion(vuelta)
    }
    try {
        const vuelosOfDayIda = await Flight.findAll({
            where:{
                origin:origen,
                destiny:destino,
                dateTimeDeparture:{
                    [Op.gte] : timeIda,
                    [Op.lt] : sumarUnDiaAFechaISO(timeIda)
                }
            }
        })

        if (timeIda && timeVuelta) {
            const vuelosOfDayVuelta = await Flight.findAll({
                where:{
                    origin:destino,
                    destiny:origen,
                    dateTimeDeparture:{
                        [Op.gte] : timeVuelta,
                        [Op.lt] : sumarUnDiaAFechaISO(timeVuelta)
                    }
                }
            })

            let fligth = []
            for (let i = 0; i < vuelosOfDayIda.length; i++) {
                for (let j = 0; j < vuelosOfDayVuelta.length; j++) {
                    const llegada = new Date(vuelosOfDayIda[i].dateTimeArrival)
                    const salida = new Date(vuelosOfDayVuelta[j].dateTimeDeparture)
                    const llegadaIntervalo = llegada.setHours(llegada.getHours() + 3)
                    if (llegada < salida && llegadaIntervalo < salida) {
                        fligth = [...fligth,{ida:vuelosOfDayIda[i],vuelta:vuelosOfDayVuelta[j]}]
                    }                    
                }
            }
            res.json(fligth)
        }else if (timeIda && timeVuelta === "") {
            res.json({ida:vuelosOfDayIda})
        }else if (!timeIda && timeVuelta === "") {
        }
        

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    flightSchedule
};