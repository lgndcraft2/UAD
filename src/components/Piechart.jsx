const PieChart = ({ data, colors, title }) => {
    let cumulativePercent = 0;

    const createSlice = (percent, color, offset) => {
      const [startX, startY] = getCoordinatesForPercent(offset);
      const [endX, endY] = getCoordinatesForPercent(offset + percent);
      const largeArcFlag = percent > 0.5 ? 1 : 0;

      return `M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
    };

    const getCoordinatesForPercent = (percent) => {
      const x = 50 + 50 * Math.cos(2 * Math.PI * percent - Math.PI / 2);
      const y = 50 + 50 * Math.sin(2 * Math.PI * percent - Math.PI / 2);
      return [x, y];
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-64 h-64">
            {data.map((item, index) => {
              const percent = item.value / 100;
              const slice = createSlice(percent, colors[index], cumulativePercent);
              cumulativePercent += percent;
              
              return (
                <path
                  key={index}
                  d={slice}
                  fill={colors[index]}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.count} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default PieChart;