import { findPluginsByName } from "./helpers";
import pluginsModel from '../../models/mongoose/plugins/plugins';
import mongoose from "mongoose";

export const activePlugins = (plugin: any, tenant: any) => ActivePlugins(plugin, tenant);

const ActivePlugins = async (plugin: any, tenant: any) => {
  try {
    // Espera el resultado de la función asíncrona
    const list = await findPluginsByName([...plugin], pluginsModel);

    // Verifica si la lista es válida
    if (!Array.isArray(list)) {
      throw new Error('Expected an array, but received ' + typeof list);
    }

    // Itera sobre los elementos de la lista
    for (const dataPlugin of list) {
      await pluginSetting(dataPlugin, tenant); // Procesa uno por uno
    }

    console.log('--->', list);
  } catch (error) {
    console.error('Error in ActivePlugins:', error);
  }
};

const findPluginSetting = async (id: any, mode = 'id', tenant = null) => {
  let query = {};

  if (mode === 'id') {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ObjectId');
    }
    query = { 'plugin._id': new mongoose.Types.ObjectId(id) };
  } else {
    query = { 'plugin.path': id };
  }

  // Ejecutar consulta
  const item = await pluginsModel.byTenant(tenant).findOne(query, 'plugin');
  return item;
};

const pluginSetting = async (plugin: any = null, tenant = null) => {
  if (!plugin || !plugin._id) {
    throw new Error('Invalid plugin data');
  }

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  try {
    const result = await pluginsModel.byTenant(tenant).findOneAndUpdate(
      { 'plugin._id': new mongoose.Types.ObjectId(plugin._id) },
      { plugin },
      options
    );
    return result;
  } catch (err: any) {
    throw new Error(`Error updating plugin settings: ${err.message}`);
  }
};
