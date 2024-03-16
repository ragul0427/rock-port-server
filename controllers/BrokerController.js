const Broker = require("../model/broker");


const getBroker = async (req, res) => {
    try {
      const { search, userId } = req.query;
      const regexQuery = new RegExp(search, "i");

      const query = {
        $or: [{ brokername: regexQuery }],
      };

      if (userId) {
        query.userId = userId;
      }
  
      let result;
  
      if (search !== ""&&userId!==undefined||null) {
        result = await Broker.find(query);
      } else if(userId!==undefined||null) {
        result = await Broker.find({ userId });
      }
  
      return res.status(200).json({ message: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch brokers" });
    }
  };
  

const createBroker = async (req, res) => {
    try {
        const result = await Broker.create({ ...req.body });
        return res.status(201).json({ message: "Broker created successfully", data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create Broker" });
    }
};

const deleteBroker = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Broker.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ message: "Broker deleted successfully" });
        } else {
            return res.status(404).json({ error: "Broker not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete Broker" });
    }
};

const updateBroker = async (req, res) => {
    try {
        const { id } = req.params;
        const  { brokername }  = req.body;
        const result = await Broker.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (result) {
            return res.status(200).json({ message: "Broker updated successfully", data: result });
        } else {
            return res.status(404).json({ error: "Broker not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update broker" });
    }
};

module.exports = {
    getBroker,
    createBroker,
    deleteBroker,
    updateBroker
};
