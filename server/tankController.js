module.exports = {
    getTanks: async (req,res) => {
    const db = req.app.get('db')
       const tanks = await db.get_tanks()
    //    console.log(req.query)
       const {country_id} = req.params
       const {search, patriotic} = req.query
    //    console.log(!search, !patriotic)

    // If patriotic is true AND there is a search string, the endpoint should respond with: all the tanks where the tank name contains the search string.
    // If patriotic is false AND there is no search string, the endpoint should respond with: all the tanks that are NOT from the same country
    // If patriotic is false AND there is a search string, the endpoint should respond with: all the tanks that are NOT from the same country with a tank name that contains the search string.
    // If patriotic is true AND there is no search string, the endpoint should respond with all the tanks

       if(patriotic === 'true' && search){
           console.log('hit first')
            const result = tanks.filter(tank => tank.tank_name.toLowerCase().includes(search.toLowerCase()))
            if(result){
                return res.status(200).send(result)
            }
       } 

       if(patriotic === 'false' && !search){
           console.log('hit second')
           const result = tanks.filter(tank => tank.country_id !== +country_id)
           if(result){
            return res.status(200).send(result)
        }
       }

       if(patriotic === 'false' && search){
           console.log('hit third')
           const result = tanks.filter(tank => tank.country_id !== +country_id && tank.tank_name.toLowerCase().includes(search.toLowerCase()))
           return res.status(200).send(result)
       }
       
       res.status(200).send(tanks)
    }
}