import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Widget1 from '../../dashboards/analytics/widgets/Widget1';

function SalesChartYearWise(props) {
  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    function groupDatesByYearAndMonth(orders) {
      if (!widgets?.widget1) return;
      if (!orders?.length > 0) {
        let finalData = JSON.parse(JSON.stringify(widgets?.widget1));
        finalData.datasets = { 2023: [{ label: "Sales", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], fill: "start" }] }
        setChartData(finalData);
        return
      }
      const yearMonthData = {};
      orders.forEach((order) => {
        const date = order?.orderDate.toDate();
        const year = date.getFullYear();
        const monthNum = date.getMonth();
        if (!yearMonthData[year]) {
          yearMonthData[year] = [
            {
              label: 'Sales',
              data: Array(12).fill(0),
              fill: 'start'
            }
          ];
        }
        let yearData = yearMonthData[year];
        yearData[0].data[monthNum]++;
      });
      return yearMonthData;
    }
    const result = groupDatesByYearAndMonth(props?.orders);
    let finalData = JSON.parse(JSON.stringify(widgets?.widget1));
    finalData.datasets = result
    if (finalData.datasets) {
      setChartData(finalData);
    }
  }, [props, widgets]);

  if (chartData) {
    return (
      <div className="w-full">
        <Widget1 title="Orders" desc="Orders Data Year Wise" data={chartData} />
      </div>
    );
  }

  return null;
}

export default SalesChartYearWise;
