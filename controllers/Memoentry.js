const Memo = require("../model/memoentry");



const getMemo = async (req, res) => {
    try {
        // const { search } = req.query
        // const regexQuery = { $regex: search, $options: "i" };
        // if (search !== ""){
        //     const result = await Memo.find({
        //         $or: [
        //           { vehicleno: regexQuery },
                
                 
        //         ],
        //     });
        //     return res.status(200).json({ message: result });
        // } else {
            const result = await Memo.find()    
            return res.status(200).json({ message: result });
        // }
        
    
    } catch (err) {
     
      return res.status(500).json({ error: "Failed to fetch memoentry" });
    }
  };

const createMemo = async (req, res) => {
    try {
        
        const result = await Memo.create({ ...req.body });
        return res.status(201).json({ message: "Memo  created successfully", data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create memo" });
    }
};

const deleteMemo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Memo.findByIdAndDelete(id);
        if (result) {
            return res.status(200).json({ message: "Memo deleted successfully" });
        } else {
            return res.status(404).json({ error: "Memo not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to delete memo" });
    }
};

const updateMemo = async (req, res) => {
    try {
        const { id } = req.params;
        const { gcno, date, vehicleno, drivername, driverphone, driverwhatsappno } = req.body;
        const result = await Memo.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (result) {
            return res.status(200).json({ message: "Memo updated successfully", data: result });
        } else {
            return res.status(404).json({ error: "Memo not found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update Memo" });
    }
};

module.exports = {
    getMemo,
    createMemo,
    deleteMemo,
    updateMemo
};