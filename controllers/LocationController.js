const Location = require("../model/location");


const getLocation = async (req, res) => {
    try {
        const { search,userId } = req.query
        const regexQuery = { $regex: search, $options: "i" };
        
       let query={
        $or: [
            { locationname: regexQuery }
          ],
       }

       if(userId){
        query.userId=userId
       }
        if (search !== ""&&userId!==undefined||null){
            const result = await Location.find(query);
            return res.status(200).json({ message: result });
        } else if(userId!==undefined||null){
            const result = await Location.find({userId}); 
           
            return res.status(200).json({ message: result });
        }
        
    
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch location" });
    }
  };

const createLocation = async (req, res) => {
    try {
        const result = await Location.create({ ...req.body });
        return res.status(201).json({ message: "location created successfully", data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create location" });
    }
};

const deleteLocation = async (req, res) => {
    try {
        
        const { id } = req.params;
        const result = await Location.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ message: "location deleted successfully" });
        } else {
            return res.status(404).json({ error: "location not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete location" });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const  { locationname }  = req.body;
        const result = await Location.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (result) {
            return res.status(200).json({ message: "location updated successfully", data: result });
        } else {
            return res.status(404).json({ error: "location not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update location" });
    }
};

module.exports = {
    getLocation,
    createLocation,
    deleteLocation,
    updateLocation
};
