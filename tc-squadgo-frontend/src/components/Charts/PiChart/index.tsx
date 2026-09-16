import { Flex, Text } from '@chakra-ui/react'
import { ResponsivePie } from '@nivo/pie'
interface ChartProps {
  id: string
  value: number,
  label: string
}

interface PiChartProps {
  data: ChartProps[]
  showLegend?: boolean
  showLabels?: boolean
  showArcLink?: boolean
  isMobile?: boolean
}

const myColors = ["#8BBFEA","#496A93","#142644", "#43628B", "#74879F", "#162B78", "#2F72B2"]

const PiChart: React.FC<PiChartProps> = ({ data, showLegend = false, showArcLink = false, showLabels = false, isMobile = false }) => {
  return (
    <>
      {!isMobile ? (
        <ResponsivePie
          data={data}
          colors={d => {
            const segmentoIndex = data.findIndex(segmento => segmento.id === d.id);
            return myColors[segmentoIndex % myColors.length];
          }}
          innerRadius={0.5}
          margin={{ top: 40, right: 170, bottom: 80, left: 170 }}
          padAngle={0}
          cornerRadius={0}
          activeOuterRadiusOffset={8}
          enableArcLinkLabels={showArcLink}
          arcLinkLabel={function (e) { return e.id + ": " + e.value }}
          arcLinkLabelsDiagonalLength={20}
          borderColor={{from: 'color'}}
          borderWidth={1}
          arcLinkLabelsStraightLength={10}
          arcLinkLabelsTextOffset={0}
          arcLinkLabelsOffset={0}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#8E8E8E"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={'white'}
          theme={{ legends: { text: { fontSize: 12, fontWeight: 600 } } }}
          legends={showLegend ? [
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 130,
              translateY: 135,
              itemWidth: 130,
              itemHeight: 20,
              itemsSpacing: 0,
              symbolSize: 10,
              symbolShape: 'circle',
              itemDirection: 'left-to-right',
              itemTextColor: '#000000',
            }
          ] : []}
        />
      ) : (
        <ResponsivePie
          data={data}
          margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
          padAngle={0}
          cornerRadius={0}
          activeOuterRadiusOffset={8}
          enableArcLinkLabels={false}
          arcLinkLabelsDiagonalLength={5}
          arcLinkLabelsStraightLength={1}
          enableArcLabels={showLabels}
          tooltip={(e) => {
            const t = e.datum
            const name = t.id.toString().split(' ')

            let breakedName = []
            let newLineName = ''

            for (let i = 0; i <= name.length; i++) {
              if (name[i] !== undefined) {
                if (i === 0) {
                  newLineName = name[i]
                  breakedName.push(newLineName)
                }
                else {
                  if (i % 2 === 0) {
                    newLineName = name[i]
                    breakedName.push(newLineName)
                  } else {
                    newLineName = `${newLineName} ${name[i]}`
                    breakedName.pop()
                    breakedName.push(newLineName)
                  }
                }
              }

            }

            return (
              <Flex flexDirection={'column'} bgColor='#fff' borderRadius={5} p='1'>
                {breakedName.map((b, i) => <Text key={i}>{b}</Text>)}
              </Flex>
            )
          }
          }

          arcLinkLabelsTextOffset={0}
          arcLinkLabelsOffset={0}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#8E8E8E"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'brighter',
                3
              ]
            ]
          }}
          legends={showLegend ? [
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 60,
              itemWidth: 130,
              itemHeight: 20,
              itemsSpacing: 0,
              symbolSize: 10,
              itemDirection: 'left-to-right'
            }
          ] : []}
        />
      )}
    </>

  )
}

export default PiChart