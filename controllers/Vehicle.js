const Vehicle = require("../model/vehicle");


const getVehicle = async (req, res) => {
    try {
        const { search,userId } = req.query
        const regexQuery = new RegExp(search, "i");
        
        const query={
            $or: [
                { drivername: regexQuery },
                { vehicleno: !isNaN(search) ? Number(search) : null },
                { driverphone: !isNaN(search) ? Number(search) : null },
               
              ],
        }

        if(userId){
            query.userId=userId
        }

        let result;
       
        if (search !== ""&&userId!==undefined||null){
            result = await Vehicle.find(query);
        } else if(userId!==undefined||null){
            result = await Vehicle.find({userId}); 
            
        }
        return res.status(200).json({ message: result });
    
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  };

const createVehicle = async (req, res) => {
    try {
       
        const result = await Vehicle.create({ ...req.body });
        return res.status(201).send({ message: "Vehicle created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create vehicle" });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Vehicle.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ message: "Vehicle deleted successfully" });
        } else {
            return res.status(404).json({ error: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete vehicle" });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const { docentry, vehicleno, drivername, driverphone, whatsappno, pan, accno, ifsccode } = req.body;
        const result = await Vehicle.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (result) {
            return res.status(200).json({ message: "Vehicle updated successfully", data: result });
        } else {
            return res.status(404).json({ error: "Vehicle not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update vehicle" });
    }
};

module.exports = {
    getVehicle,
    createVehicle,
    deleteVehicle,
    updateVehicle
};
