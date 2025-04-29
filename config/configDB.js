const mongoose = require('mongoose');
module.exports = async () => {
   console.log("CONNECTING TO DATABASE...");
    try {
        await mongoose.connect('mongodb+srv://quest:12345@cluster0.nz28lxk.mongodb.net/Quest?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};