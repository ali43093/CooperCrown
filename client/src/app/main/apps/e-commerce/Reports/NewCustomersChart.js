import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

const NewCustomersChart = (props) => {

  const { customers, widget2 } = props;
  const [data, setData] = useState(false);


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'New Customers'

    customers.forEach((customer) => {
      const month = customer?.creationDate && customer?.creationDate.toDate().getMonth();
      if (month) newData.datasets[0].data[month] += 1;
    });

    const currentMonthValue = newData.datasets[0].data[new Date().getMonth()]
    const prevMonthValue = newData.datasets[0].data[new Date().getMonth() - 1]
    newData.conversion.value = currentMonthValue
    newData.conversion.ofTarget = (currentMonthValue && prevMonthValue) ?
      Math.floor(((currentMonthValue - prevMonthValue) / prevMonthValue) * 100) : 0

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers]);

  if (!widget2 || !data) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget2 title="New Customer" data={data} />
    </div>
  );
};
export default NewCustomersChart;
