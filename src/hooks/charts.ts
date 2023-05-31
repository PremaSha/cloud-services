import { useState } from 'react';
import { resources } from '@models/application';
import { PieChart } from '@models/chart';

const useChartData = (resources: resources) => {
  // const [chartData, setChartData] = useState(resources);
  // const [costChart, setCostChart] = useState<PieChart[]>([]);
  // const [locationChart, setLocationhart] = useState<PieChart[]>([]);

  type chartDataType = {costChart: PieChart[],locationChart: PieChart[]}

  const getChartData = (resources:resources): chartDataType =>{
    let locations: { [key: string]: number } = {}
      let costByService: { [key: string]: number } = {}
  
      resources.forEach(c => {
        //caluclate location counts
        if (locations.hasOwnProperty(c.Location)) locations[c.Location] += 1
        else locations[c.Location] = 1
  
        //calculate cost based on Service Name
        if (costByService.hasOwnProperty(c.ServiceName)) costByService[c.ServiceName] += parseFloat(c.Cost)
        else costByService[c.ServiceName] = parseFloat(c.Cost)
      })
  
      //now we have location and cost data. Convert to chartData
      let costChartData: PieChart[] = []
      let locationChartData: PieChart[] = []
  
      //location chart
      for (const data in locations) {
        let d: PieChart = [data, locations[data]]
        locationChartData = [...locationChartData, d]
      }
  
      //cost chart
      for (const data in costByService) {
        let d: PieChart = [data, costByService[data]]
        costChartData = [...costChartData, d]
      }
  
      return {
        locationChart: locationChartData,
        costChart: costChartData
      }
  }

  
  return getChartData(resources);
};

export default useChartData;
