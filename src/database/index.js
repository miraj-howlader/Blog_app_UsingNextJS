import mongoose from "mongoose";

const ConnectToDB = async () => {
    const connectionUrl = 'mongodb+srv://miraj:12345@cluster0.ueomp.mongodb.net/'
    mongoose.connect((connectionUrl))
        .then(() => console.log('Blog data connection is successfull'))
        .then((error) => console.log(error))
}

export default ConnectToDB;