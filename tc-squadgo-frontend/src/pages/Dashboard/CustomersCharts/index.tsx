import { useEffect, useState } from "react"
import { Center, Divider, Flex, Text } from "@chakra-ui/react"

import { api } from "../../../services/api"

import PiChart from "../../../components/Charts/PiChart"

import * as S from './styles'
import { MdPieChart } from "react-icons/md"

interface CustomerProps {
  id: number
  name: string
  status: string
  hired_hours: number
  resources: any[]
}

interface CustomerChartsProps {
  id: string
  value: number,
  label: string
}

const CustomersCharts: React.FC = () => {
  const [customersByHiredHours, setCustomersByHiredHours] = useState<CustomerChartsProps[]>([])
  const [customersByResources, setCustomersByResources] = useState<CustomerChartsProps[]>([])

  useEffect(() => {
    async function loadCustomers() {
      const response = await api.get('/dashboard/customers')
      const customerResponse: CustomerProps[] = response.data

      const dataByHiredHours =
        customerResponse.filter(cr => cr.status !== 'INATIVO')
          .map(cr => {
            return { id: cr.name, value: cr.hired_hours, label: cr.name }
          })
      setCustomersByHiredHours(dataByHiredHours)

      const dataByResources =
        customerResponse.filter(cr => cr.status !== 'INATIVO')
          .map(cr => { return { id: cr.name, value: cr.resources.length, label: cr.name } })
      setCustomersByResources(dataByResources)
    }
    loadCustomers()
  }, [])

  return (
    <S.ChartLine>
      <Flex
        position='relative'
        borderRadius='10px'
        alignContent='center'
        justifyContent='center'
        direction='row'
        bgColor='#FFFFFF'
        boxShadow={'0px 0px 51.358px rgba(221, 221, 221, 0.49)'}
        width='100%'
        minW={0}>
        <Flex position='absolute' top='-20px' left='40px' gap='20px' alignSelf='flex-start'>
          <Flex justifyContent='flex-end' direction='column' mt='30px'>
            <Text color='#000000' fontSize='18px' marginTop='40px' fontWeight={700}>Clientes por hora contratada</Text>
          </Flex>
        </Flex>
        <S.LargeChartContainer>
          <PiChart data={customersByHiredHours} showArcLink={true} />
        </S.LargeChartContainer>
        <S.SmallChartContainer>
          <PiChart data={customersByHiredHours} isMobile={true} />
        </S.SmallChartContainer>
        <Center>
          <Divider orientation="vertical" height='85%' />
        </Center>
        <Flex
          position='relative'
          borderRadius='10px'
          alignContent='center'
          justifyContent='center'
          direction='column'
          width='100%'
          minW={0}>
          <Flex position='absolute' top='-20px' left='20px' gap='20px' alignSelf='flex-start'>
            <Flex justifyContent='flex-end' direction='column' mt='30px'>
              <Text color='#000000' fontSize='18px' ml='12px' marginTop='40px' fontWeight={700}>Clientes por quantidade de colaborador</Text>
            </Flex>
          </Flex>
          <S.LargeChartContainer>
            <PiChart data={customersByResources} showArcLink={true} />
          </S.LargeChartContainer>
          <S.SmallChartContainer>
            <PiChart data={customersByResources} isMobile={true} />
          </S.SmallChartContainer>
        </Flex>
      </Flex>
    </S.ChartLine>
  )
}

export default CustomersCharts