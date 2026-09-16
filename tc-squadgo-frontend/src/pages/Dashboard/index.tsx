import { Center, Divider, Flex } from "@chakra-ui/react"
import Header from "../../components/Header"
import ComparativeHoursCharts from "./ComparativeHoursCharts"

import CustomersCharts from "./CustomersCharts"
import ProjectsByMonths from "./ProjectsByMonths"
import ProjectsCharts from "./ProjectsCharts"

import * as S from './styles'
import ProjectsToStart from "./ProjectsToStart"

const Dashboard: React.FC = () => {
  return (
    <>
      <Header buttons={[]}></Header>
      <Flex gap='50px' direction='column' mt='25px' padding={'0px 20px'}>
        <CustomersCharts />
        <S.ChartLine>
          <ProjectsCharts />
          <Center>
            <Divider orientation="vertical" height='85%' />
          </Center>
          <ComparativeHoursCharts />
        </S.ChartLine>
        <Flex justifyContent='space-between'>
          <S.GraphsLine>
            <ProjectsByMonths />
          </S.GraphsLine>
          <S.GraphsLine>
            <ProjectsToStart />
          </S.GraphsLine>
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard