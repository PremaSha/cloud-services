import React from 'react'
import {AiOutlineArrowDown} from 'react-icons/ai'
import DataTable, {TableProps} from 'react-data-table-component';


const sortIcon = <AiOutlineArrowDown />;
const selectProps = { indeterminate: (isIndeterminate: boolean) => isIndeterminate };

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
    return (
        <DataTable
            pagination            
            selectableRowsComponentProps={selectProps}
            sortIcon={sortIcon}
            dense
            {...props}
        />
    );
}

export default DataTableBase;