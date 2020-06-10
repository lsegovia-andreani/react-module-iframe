import * as React from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent, Edit, EditSettingsModel, Inject, Toolbar, ToolbarItems, Page } from '@syncfusion/ej2-react-grids';
import { data } from './gridDataSource'
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('es-AR');

L10n.load({
    'es-AR': {
        'grid': {
            EmptyDataSourceError: 'Ocurrió un error al intentar obtener los datos',
            EmptyRecord: 'No hay registros para mostrar',
            Search: 'Buscar',
            pagerDropDown: 'Items por página',
            Pdfexport: 'Exportar a PDF',
            Excelexport: 'Exportar a Excel',
            Csvexport: 'Exportar a CSV',
            Edit: 'Editar',
            Add: 'Agregar',
            Delete: 'Borrar',
            Update: 'Gardar',
            Cancel: 'Cancelar',
            EditOperationAlert: 'Desea guardar los cambios?',
            CancelEdit: 'Desea descartar los cambios?',
            SaveButton: 'Aceptar',
            EditFormTitle: 'Editar - ',
            BatchSaveConfirm: 'Desea guardar los cambios?',
            BatchSaveLostChanges: 'Desea descartar los cambios?',
            OKButton: 'Aceptar',
            CancelButton: 'Cancelar'

        },
        'pager': {
            FirstPage: 'Primera página',
            LastPage: 'Última página',
            PreviousPage: 'Página anterior',
            NextPage: 'Página siguiente',
            currentPageInfo: '{0} de {1} registros',
            firstPageTooltip: 'Primera página',
            lastPageTooltip: 'Última página',
            nextPageTooltip: 'Página siguiente',
            previousPageTooltip: 'Página anterior',
            totalItemsInfo: '({0} registros)',
            pagerDropDown: 'Items por página',
        },
    }
});


export default class GridDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            planningShipments: [],
            selectedDate: new Date().setDate(new Date().getDate() + 1),
            selectedBranch: JSON.parse(sessionStorage.getItem('selectedBranch')),
            loadingSearch: false,
            loadingPlanningShipmentsGrid: true,
            postalCodes: null,
            defaultExpanded: true,
            loading: {
                products: true,
                postalCodes: true,
                zones: true
            },
            selectedValues: {
                postalCodeFrom: null,
                postalCodeTo: null,
                singlePostalCode: null
            }
        };

        this.editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch', allowNextRowEdit: true }
        this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
        this.pageOptions = { pageSize: 6 };

        // this.search = this.search.bind(this);

        this.shipmentColumns = [
            { field: 'shipmentNumber', header: 'Número de envío', width: '80', textAlign: 'Right', isPrimaryKey: true },
            { field: 'distributorCode', header: 'Repartidor Preasignado', width: '80', textAlign: 'Right' },
            { field: 'senderName', header: 'Remitente', width: '140', textAlign: 'Left', isPrimaryKey: true },
            { field: 'recipientName', header: 'Consignatario', width: '140', textAlign: 'Left', isPrimaryKey: true },
            { field: 'recipientAddress', header: 'Domicilio Consignatario', width: '140', textAlign: 'Left', isPrimaryKey: true },
            { field: 'postalCode', header: 'Código postal', width: '60', textAlign: 'Right', isPrimaryKey: true },
            { field: 'agreedDeliveryDate', header: 'Fecha pactada', width: '70', textAlign: 'Left', isPrimaryKey: true },
            { field: 'product.description', header: 'Producto', width: '120', textAlign: 'Left', isPrimaryKey: true },
            { field: 'packages', header: 'Bultos', width: '60', textAlign: 'Right', isPrimaryKey: true },
            { field: 'pallets', header: 'Pallets', width: '60', textAlign: 'Right' },
            { field: 'weightInKilograms', header: 'Peso (Kg)', width: '50', textAlign: 'Right', isPrimaryKey: true },
            { field: 'declaredValue', header: 'Valor declarado', width: '90', textAlign: 'Right', format: 'C2', isPrimaryKey: true },
            { field: 'arrivalDate', header: 'Fecha de llegada', width: '70', textAlign: 'Right', isPrimaryKey: true },
            { field: 'refundValue', header: 'Valor de GGCC', width: '90', textAlign: 'Right', format: 'C2', isPrimaryKey: true },
            { field: 'originSystem', header: 'Origen', width: '30', textAlign: 'Right', isPrimaryKey: true }
        ];
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='row centerAlign'>
                <div className='gridContainer'>
                    <GridComponent dataSource={data} editSettings={this.editOptions} toolbar={this.toolbarOptions} height={300} allowPaging={true} pageSettings={this.pageOptions} selectionSettings={{ type: 'Multiple' }} searching={true}>
                    <ColumnsDirective>
                            {this.shipmentColumns.map((column, i) => {
                                return <ColumnDirective
                                    key={i}
                                    field={column.field}
                                    headerText={column.header}
                                    width={column.width}
                                    textAlign={column.textAlign}
                                    format={column.format}
                                    isPrimaryKey={column.isPrimaryKey}
                                    editType={column.editType}
                                    editTemplate={column.editTemplate}
                                />
                            })}
                        </ColumnsDirective>
                        <Inject services={[Page, Edit, Toolbar]} />
                    </GridComponent>
                </div>
            </div>
        )
    }
}