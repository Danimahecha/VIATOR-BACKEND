function FligthRandom(vuelos){
    let arrFlights=[]
    let recomend=[]
    let i= 0
    for (const vuelo of vuelos) arrFlights.push(vuelo)
    arrFlights.sort(() => Math.random() - 0.5);
    while (i<3) {
        recomend.push(arrFlights[i])
        i++
    }
    
  return recomend; 
    
}
module.exports= FligthRandom
