import { useEffect, useState } from "react"
import { Flex, Text } from "@chakra-ui/react"

import { api } from "../../../services/api"

import PiChart from "../../../components/Charts/PiChart"
import { MdPieChart } from "react-icons/md"

import * as S from './styles'

interface HoursProps {
  totalHoursHappening: number
  totalAvailableHours: number
  totalMissingHours: number
}

interface HoursChartsProps {
  id: string
  value: number,
  label: string
}

const ComparativeHoursCharts: React.FC = () => {
  const [comparativeHours, setComparativeHours] = useState<HoursChartsProps[]>([])

  useEffect(() => {
    async function loadCustomers() {
      const response = await api.get('/dashboard/compare-hours')
      const customerResponse: HoursProps = response.data

      const totalAvailableHours = { id: 'Horas Disponíveis', label: 'Horas Disponíveis', value: customerResponse.totalAvailableHours }
      const totalMissingHours = { id: 'Horas Faltantes', label: 'Horas Faltantes', value: customerResponse.totalMissingHours }
      const totalHoursHappening = { id: 'Horas em Andamento', label: 'Horas em Andamento', value: customerResponse.totalHoursHappening }

      setComparativeHours([totalAvailableHours, totalMissingHours, totalHoursHappening])
    }
    loadCustomers()
  }, [])

  return (
    <Flex
      position='relative'
      borderRadius='10px'
      alignContent='center'
      justifyContent='center'
      direction='column'
      bg='transparent'
      width='100%'
      minW={0}>
      <Flex position='absolute' top='-20px' left='20px' gap='20px' alignSelf='flex-start'>
        <Flex justifyContent='flex-end' direction='column' mt='30px'>
          <Text color='#000000' mt='40px' fontSize='18px' fontWeight={700} >Comparativo de horas</Text>
        </Flex>
      </Flex>
      <S.LargeChartContainer>
        <PiChart data={comparativeHours} showLegend={true} showLabels={true} isMobile={false} />
      </S.LargeChartContainer>
      <S.SmallChartContainer>
        <PiChart data={comparativeHours} isMobile={true} />
      </S.SmallChartContainer>
    </Flex>
  )
}

export default ComparativeHoursCharts