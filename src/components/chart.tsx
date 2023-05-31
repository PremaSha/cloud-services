import { Chart } from "react-google-charts";
import useChartData from "hooks/charts";
import { ChartProps } from "@models/chart";

export default function ChartComponent(props:ChartProps) {
    const charData = useChartData(props.resouces)
    const locationData = [
        ['Category', 'Value'],
        ...charData.locationChart
    ];

    const costData = [['Resource Group', 'Cost'], ...charData.costChart];
    return (
        <>
            <div className="cost">
                <Chart
                    chartType="Bar"
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
        </>
    )
}