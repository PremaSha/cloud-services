import React, { useCallback, useEffect, useState } from 'react';
import { TableProps, TableColumn } from 'react-data-table-component';
import { allResources, getApplications, getResources, getResoucesByApplicationName, getResourcesByGroupName } from "../services/cloudServices"
import { resources, resourceDetail, applicationName, resourcesName } from '../models/application'
import { selectOption } from "../models/common"
import Datatable from "../components/DataTable"
import { DEFAULT_CURRENCY } from "../constants"
import Select from 'react-select'
import { Chart } from "react-google-charts";

const Home = () => {
  const [data, setData] = useState<resources>([]);
  const [application, setApplication] = useState<applicationName>([]);
  const [resources, setResources] = useState<resourcesName>([])

  const columns: TableColumn<resourceDetail>[] = [ //her
    {
      name: 'Service Name',
      selector: row => row.ServiceName,
    },
    {
      name: 'Busines Unit',
      selector: row => row.Tags['business-unit'],
    },
    {
      name: "Resouce Group",
      selector: row => row.ResourceGroup
    },
    {
      name: "Environment",
      selector: row => row.Tags.environment
    },
    {
      name: "Cost",
      selector: row => DEFAULT_CURRENCY + " " + row.Cost,
      sortable: true
    },
    {
      name: "Consumed Quantity",
      selector: row => row.ConsumedQuantity,
      sortable: true
    },
    {
      name: "Unit Of Measure",
      selector: row => row.UnitOfMeasure
    },
    {
      name: "Location",
      selector: row => row.Location
    },
    {
      name: "Created On",
      selector: row => row.Date
    }
  ]
  const tableProps: TableProps<resourceDetail> = {
    columns,
    data,
    defaultSortFieldId: 5,
    defaultSortAsc: false
  }

  // Fetch All data
  const fetchData = useCallback(async () => {
    const result = await allResources()
      .catch(error => {
        console.error("failed to load resouces", error)
        return []
      })
    setData(result);
  }, []);

  // Fetch Application name
  const fetchApplication = useCallback(async () => {
    const result = await getApplications()
      .catch(error => {
        console.error("failed to load Application Names", error)
        return []
      })
    let res = [];
    for (let i = 0; i < result.length; i++) {
      let r = {
        option: result[i],
        label: result[i]
      }
      res.push(r)
    }
    setApplication(res);
  }, []);

  //Fetch Resources Name
  const fetchResources = useCallback(async () => {
    const result = await getResources()
      .catch(error => {
        console.error("failed to load Application Names", error)
        return []
      })
    let res = [];
    for (let i = 0; i < result.length; i++) {
      let r = {
        option: result[i],
        label: result[i]
      }
      res.push(r)
    }
    setResources(res);
  }, []);

  useEffect(() => {
    fetchData();
    fetchApplication();
    fetchResources()
  }, []);

  const changeApplication = async (name: selectOption) => {
    const result = await getResoucesByApplicationName(name.option)
      .catch(error => {
        console.error("failed to resurces", error)
        return []
      })
    setData(result)
  }

  const changeResources = async (name: selectOption) => {
    const result = await getResourcesByGroupName(name.option)
      .catch(error => {
        console.error("failed to resurces", error)
        return []
      })
    setData(result)
  }
const costData = [['Resource Group', 'Cost'], ...data.map(item => [item.ResourceGroup, item.Cost])];

const locationData = [
  ['Category', 'Value'],
  ['US East', 50],
  ['EU West', 30],
];

  return (
    <div>
      {/* add dropdowns here by getting application and resouces api */}
      <div className="section-block">
        <Select options={application} className='applications m-r25' placeholder="Select Application" onChange={changeApplication} />
        <Select options={resources} className='applications' placeholder="Select Resources" onChange={changeResources} />
      </div>
      <Datatable {...tableProps} className='shadow-blur'/>

      <div className="cost">
        <Chart
          chartType="PieChart"
          data={costData}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div className="loaction">
      <Chart
          chartType="PieChart"
          data={locationData}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default Home;

