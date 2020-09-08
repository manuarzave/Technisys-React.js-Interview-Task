import * as actionTypes from './actionTypes';

export const saveCotizacion = (cotizacion) => {
    return {
      type: actionTypes.SAVE_COTIZACION,
      cotizacion: cotizacion
    }
};

export const setMoneda = (moneda) => {
  return {
    type: actionTypes.SET_MONEDA,
    moneda: moneda
  }
};

export const setPaginationPerPage = (pagination) => {
  return {
    type: actionTypes.SET_PAGINATIONPERPAGE,
    pagination: pagination
  }
};

