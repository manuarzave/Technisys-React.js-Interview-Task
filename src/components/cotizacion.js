//Core
import React, { Component } from 'react';
import { connect } from 'react-redux'

//Components imports
import Dropdown from 'react-dropdown';
import DatePicker from "react-datepicker";
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button'

//Styles imports
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';
import './cotizacion.css';

//Actions imports
import * as cotizacionesAction from '../actions/cotizacionesAction';

class Cotizacion extends Component {

    state = { 
        searchDate: new Date(),
        columns: [ 
            { name: 'Moneda', selector: 'moneda', sortable: true },
            { name: 'Cotizacion', selector: 'valor', sortable: true }
        ]
     };
     
    componentDidMount() {
        fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(res => res.json())
        .then((data) => {
            this.mapServiceResult(data);
        })
        .catch(console.log)
    }

    serchCotizaciones = (searchDate, dropdownValue) => {
        fetch('https://api.exchangeratesapi.io/'+ searchDate.toISOString().slice(0,10) + '?base=' + dropdownValue)
        .then(res => res.json())
        .then((data) => {
            this.mapServiceResult(data);
        })
        .catch(console.log)
    }

    mapServiceResult = (data) => {
        let values = [];
        for (let prop in data.rates) {
            if (Object.prototype.hasOwnProperty.call(data.rates, prop)) {
                values = [...values, {moneda: prop, valor: data.rates[prop]}]
            }
        }
        this.props.saveContizaciones(values);
    }

    seeMoreCotizaciones = (paginationPerPage) => {
        this.props.setPaginationPerPage(paginationPerPage+4);
    };

    handleDateChange = (date) => {
        this.setState({ searchDate: date });
    };

    handleDropdownChange = (elem) => {
        this.props.setMoneda(elem.value);
    };
      
    render() {
        const {dropdownOptions, dropdownValue, cotizacionData, paginationPerPage} = this.props.cotizacion;
        return ( 
            <div className="container">
                <h1 className="title">Historico de cotizaciones</h1>
                <div className="selectors">
                    <p>Selecciona la moneda de referencia</p>
                    <Dropdown options={dropdownOptions} onChange={this.handleDropdownChange} value={dropdownValue} placeholder="Moneda" />
                    <p>Ingresa la fecha de cotizacion</p>
                    <DatePicker className="date-picker" selected={this.state.searchDate} onChange={this.handleDateChange} maxDate={new Date()} />
                </div>
                <Button className="button" onClick={() => {this.serchCotizaciones(this.state.searchDate, dropdownValue)}} > Buscar Cotizaciones </Button>
                <DataTable columns={this.state.columns} data={cotizacionData} pagination={true} paginationPerPage={paginationPerPage} center={true} />
                <Button className="button" onClick={() => {this.seeMoreCotizaciones(paginationPerPage)}} > Ver mas Cotizaciones </Button>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      cotizacion: state.cotizacion
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      saveContizaciones: cotizacion => dispatch(cotizacionesAction.saveCotizacion(cotizacion)),
      setMoneda: moneda => dispatch(cotizacionesAction.setMoneda(moneda)),
      setPaginationPerPage: pagination => dispatch(cotizacionesAction.setPaginationPerPage(pagination)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cotizacion);