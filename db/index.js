const mongoose = require('mongoose')

const mongoConnect = async()=>{
try {
    await mongoose.connect(`mongodb+srv://lab0303:lab0303@cluster0.pqdbvwm.mongodb.net/coderhouse?retryWrites=true&w=majority`)
    console.log('db is connected');
    
} catch (error) {
    console.log(error);
    
}
}

module.exports = mongoConnect