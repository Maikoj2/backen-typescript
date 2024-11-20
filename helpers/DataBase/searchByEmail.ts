import { BuildErrorObject } from "../buildErrorObject";

export const searchByEmail = (email: any, collection: any, tenant: any) => {
  try {
    const foundData = collection
      .byTenant(tenant)
      .findOne({ email })
      .exec(); // Usar exec() para asegurar una promesa explícita
    if (!foundData) {
      throw BuildErrorObject(422, 'NOT_SETTINGS_FOR_TENANT');
    }
    return foundData;
  } catch (err) {
    throw err; // Propaga el error para que se maneje en otro lugar
  }

}