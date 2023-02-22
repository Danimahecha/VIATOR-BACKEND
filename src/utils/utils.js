function FligthRandom(vuelos){
    let arrFlights=[]
    let RecommendedFlights=[]
    for (const vuelo of vuelos) arrFlights.push(vuelo)
    while(RecommendedFlights.length<3) {
         RecommendedFlights.push(arrFlights[Math.ceil(Math.random()*arrFlights.length)])
        }
        let result =  RecommendedFlights.filter((item,index)=>{
            return RecommendedFlights.indexOf(item) === index;
          })
    return result
}
module.exports= FligthRandom
