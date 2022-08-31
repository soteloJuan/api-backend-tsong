import mongoose from 'mongoose';

export const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos');
    }

};
