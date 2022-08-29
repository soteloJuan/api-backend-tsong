import bcrypt from 'bcryptjs';


export const bcryptPassword = async(password: string) => {

    try{
        const salt = await bcrypt.genSaltSync();
        
        const newPassword: string = await bcrypt.hashSync(password, salt);
        
        return newPassword;

    }catch(error){
        
        return error;

    }
}