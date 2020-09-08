import { combineReducers } from 'redux';
import cotizacion from './cotizacionReducer';

export default combineReducers({
    cotizacion: cotizacion
});