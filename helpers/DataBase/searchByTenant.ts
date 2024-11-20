import { BuildErrorObject } from "../buildErrorObject";

export const searchByTenant = (tenant:any,  collection:any, populate = []) => {
     try {
          const foundData =  collection
            .byTenant(tenant)
            .findOne({}, 'tenantId logo name')
            .exec(); // Usar exec() para asegurar una promesa explícita
          if (!foundData) {
            throw BuildErrorObject(422, 'NOT_SETTINGS_FOR_TENANT');
          }
          return foundData;
        } catch (err) {
          throw err; // Propaga el error para que se maneje en otro lugar
        }

}