import { ResponsiveLine } from '@nivo/line'

interface LineChartsProps {
  id: string
  data: {
    x: string
    y: number
  }[]
}

interface PiChartProps {
  data: LineChartsProps[]
  showLegend?: boolean
}

const myColors = [ "#162B78" ]

const LineChart: React.FC<PiChartProps> = ({ data, showLegend = false }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      axisLeft={{
        format: e => Math.floor(e) === e && e
      }}
      yFormat=" >-.0f"
      axisTop={null}
      axisRight={null}
      enableGridX={false}
      lineWidth={3}
      enablePoints={true}
      pointSize={15}
      enablePointLabel={true}
      colors={d => {
        const segmentoIndex = data.findIndex(segmento => segmento.id === d.id);
        return myColors[segmentoIndex % myColors.length];
      }}
      pointColor="#8BBFEA"
      pointBorderWidth={10}
      pointBorderColor="#F7F7F7"
      pointLabelYOffset={-4}
      areaOpacity={0.1}
      useMesh={true}
      legends={showLegend ? [
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 8,
          itemDirection: 'left-to-right',
          itemWidth: 70,
          itemHeight: 36,
          itemOpacity: 0.75,
          symbolSize: 9,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ] : []}
    />
  )
}

export default LineChart