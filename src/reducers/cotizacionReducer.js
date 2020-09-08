import * as actionTypes from '../actions/actionTypes';

const initialState = {
    dropdownOptions: ['USD', 'CAD', 'GBP', 'EUR'],
    dropdownValue: 'USD',
    paginationPerPage: 4,
    cotizacionData: [
        { moneda: null, valor: null }
    ]
}

export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SAVE_COTIZACION:
            return {
                ...state,
                cotizacionData: action.cotizacion
            }
        case actionTypes.SET_MONEDA:
            return {
                ...state,
                dropdownValue: action.moneda
            }
        case actionTypes.SET_PAGINATIONPERPAGE:
            return {
                ...state,
                paginationPerPage: action.pagination
            }
    default:
        return state;
    }
};