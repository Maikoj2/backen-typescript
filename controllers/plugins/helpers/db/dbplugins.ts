import { BuildErrorObject } from "../../../../helpers"

export const findPluginsByName = async (names: any = [], collection: any) => {
    try {
      // Realiza la consulta sin callback, usando async/await
      const items = await collection.find({
        path: { $in: [...names] }
      }).exec(); // Usa exec() para que se ejecute como promesa
  
      // Devuelve los resultados
      return items;
    } catch (err) {
      // Si ocurre un error, lanza un error adecuado
      throw BuildErrorObject(422, 'ERROR_WITH_FILTER');
    }
  };