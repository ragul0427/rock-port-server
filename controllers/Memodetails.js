const MemoDetails = require("../model/memodetails");


const getMemoDetails = async (req, res) => {
    try {
        const { search,userId } = req.query
        const regexQuery = { $regex: search, $options: "i" };
        
       let query={ $or: [
        { gcno: !isNaN(search) ? Number(search) : null },
      { vehicleno: !isNaN(search) ? Number(search) : null },
      { phoneno: !isNaN(search) ? Number(search) : null },         
    ]}

    if(userId){
        query.userId=userId
    }

    let result;
        if (search !== ""&&userId!==undefined||null){
        result = await MemoDetails.find(query);
            
        } else if(userId!==undefined||null){
            await MemoDetails.find({userId}); 
            return res.status(200).json({ message: result });
        }
        
        return res.status(200).json({ message: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch memoentry" });
    }
  };

const createMemoDeatils = async (req, res) => {
    try {
        const result = await MemoDetails.create({ ...req.body });
        return res.status(201).json({ message: "Memo  created successfully", data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create memo" });
    }
};

const deleteMemoDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await MemoDetails.findByIdAndDelete(id);
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

const updateMemoDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { gcno, date, vehicleno, drivername, driverphone, driverwhatsappno } = req.body;
        const result = await MemoDetails.findByIdAndUpdate(id, { ...req.body }, { new: true });
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
    getMemoDetails,
    createMemoDeatils,
    deleteMemoDetails,
    updateMemoDetails,
};