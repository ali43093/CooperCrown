import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

const CCFrameChart = (props) => {

  const { orders, widget2 } = props;
  const [ccFrameData, setCcFrameData] = useState(false);


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'CC Frame'

    orders.forEach((order) => {
      const month = order?.orderDate.toDate().getMonth();
      order.eyeglasses.map((pair) => {
        if (pair?.frameId) newData.datasets[0].data[month] += 1;
        return null
      })
    });

    const currentMonthValue = newData.datasets[0].data[new Date().getMonth()]
    const prevMonthValue = newData.datasets[0].data[new Date().getMonth() - 1]
    newData.conversion.value = currentMonthValue
    newData.conversion.ofTarget = (currentMonthValue && prevMonthValue) ?
      Math.floor(((currentMonthValue - prevMonthValue) / prevMonthValue) * 100) : 0
    setCcFrameData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (!widget2 || !ccFrameData) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget2 title="CC Frame" data={ccFrameData} />
    </div>
  );
};
export default CCFrameChart;