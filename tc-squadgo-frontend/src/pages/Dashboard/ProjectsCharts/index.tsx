import { useEffect, useState } from "react"
import { Flex, Text } from "@chakra-ui/react"

import { api } from "../../../services/api"

import PiChart from "../../../components/Charts/PiChart"
import { MdPieChart } from "react-icons/md"

import * as S from './styles'

interface ProjectProps {
  id: number
  name: string
  type: string
}

interface CustomerChartsProps {
  id: string
  value: number,
  label: string
}

const ProjectsCharts: React.FC = () => {
  const [projectTypes, setProjectTypes] = useState<CustomerChartsProps[]>([])

  useEffect(() => {
    async function loadCustomers() {
      const response = await api.get('/dashboard/projects')
      const customerResponse: ProjectProps[] = response.data

      const projectByPF = customerResponse.filter(cr => cr.type === 'PF')
      const projectByPR = customerResponse.filter(cr => cr.type === 'PR')

      const projectsFormattedByPF = { id: 'Fechados', label: 'Projetos fechados (PF)', value: projectByPF.length }
      const projectsFormattedByPR = { id: 'Recorrentes', label: 'Projetos recorrentes (PR)', value: projectByPR.length }

      setProjectTypes([projectsFormattedByPF, projectsFormattedByPR])
    }
    loadCustomers()
  }, [])

  return (
    <>
    <Flex
      position='relative'
      borderRadius='10px'
      alignContent='center'
      justifyContent='center'
      direction='row'
      width='100%'
      bg='transparent'
      minW={0}>
      <Flex position='absolute' top='-20px' left='20px' gap='20px' alignSelf='flex-start'>
        <Flex justifyContent='flex-end' direction='column' mt='30px'>
          <Text color='#000000' mt='40px' ml='17px' fontSize='18px' fontWeight={700}>Projetos por tipo</Text>
        </Flex>
      </Flex>
      <S.LargeChartContainer>
        <PiChart data={projectTypes} showLegend={true}  showLabels={true} />
      </S.LargeChartContainer>
      <S.SmallChartContainer>
        <PiChart data={projectTypes} isMobile={true} />
      </S.SmallChartContainer>
    </Flex>
    </>
  )
}

export default ProjectsCharts