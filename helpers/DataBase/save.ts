export const saveRegister = (data:any) => {
    try {
        const result =  data.save();  
        // console.log(result);
        // Esto devuelve la promesa directamente
        return result;
    } catch (err:any) {
        throw new Error(`Error saving document: ${err.message}`);
    }
}