import { useState, useEffect } from "react"
import Chart from "react-apexcharts"
import { api } from "../../../services/api"

import { format, addMonths, subMonths } from 'date-fns'
import * as S from './styles'
import { Flex } from "@chakra-ui/react"

interface ProjectProps {
  month: string
  numberOfProjects: number
}

interface CustomerChartsProps {
  id: string
  data: {
    x: string
    y: number
  }[]
}

const ProjectsByMonths: React.FC = () => {
  const [lastProjectTypes, setLastProjectTypes] = useState<CustomerChartsProps[]>([])
  const [futureProjectTypes, setFutureProjectTypes] = useState<CustomerChartsProps[]>([])

  useEffect(() => {
    async function loadLastProjects() {
      const currentDate = format(subMonths(new Date(), 4), 'yyyy-MM-dd hh:mm')
      const lastDate = format(new Date(), 'yyyy-MM-dd hh:mm')

      const response = await api.get(`/dashboard/projects-by-month?first_date=${currentDate}&last_date=${lastDate}&showFinished=true`)
      const customerResponse: ProjectProps[] = response.data

      const data = customerResponse.map(pbm => {
        return {
          x: pbm.month,
          y: pbm.numberOfProjects
        }
      })

      const chartData = {
        id: 'Projetos',
        color: '#4287f5',
        data
      }
      setLastProjectTypes([chartData])
    }

    async function loadFutureProjects() {
      const currentDate = format(new Date(), 'yyyy-MM-dd hh:mm')
      const lastDate = format(addMonths(new Date(), 4), 'yyyy-MM-dd hh:mm')

      const response = await api.get(`/dashboard/projects-by-month?first_date=${currentDate}&last_date=${lastDate}&showFinished=false`)
      const customerResponse: ProjectProps[] = response.data

      const data = customerResponse.map(pbm => {
        return {
          x: pbm.month,
          y: pbm.numberOfProjects
        }
      })

      const chartData = {
        id: 'Projetos',
        color: '#4287f5',
        data
      }
      setFutureProjectTypes([chartData])
    }

    loadLastProjects()
    loadFutureProjects()
  }, [])

  return (
    <Flex justifyContent='space-between' flexDir='row' alignItems='flex-start' width='100%'>
      <Flex flexDir='column' width='100%'>
        <S.StyledTitle>
          Projetos iniciados por mês
        </S.StyledTitle>
        <Chart
          height={300}
          options={{
            chart: {
              id: "area-chart",
              toolbar: {
                show: false
              },
              foreColor: '#A3A3A3',
            },
            legend: {
              show: false
            },
            dataLabels: {
              enabled: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.64,
                opacityTo: 0,
                stops: [0, 100]
              },
              colors: ['#8BBFEA']
            },
            grid: {
              show: true,
              position: 'back',
              row: {
                colors: ['#fff'],
                opacity: 0.4
              },
              column: {
                colors: ['#fff'],
                opacity: 0.4
              },
              xaxis: {
                lines: {
                  show: true
                }
              },
              yaxis: {
                lines: {
                  show: true
                }
              },
            },
            xaxis: {
              categories: lastProjectTypes
            },
            yaxis: {
              tickAmount: 1,
              labels: {
                formatter: (val) => {
                  return Math.floor(val).toString()
                }
              }
            },
            stroke: {
              show: true,
              width: 3,
              colors: ['#162b78']
            },
            markers: {
              size: 6,
              colors: ['#8BBFEA'],
              strokeColors: '#F7F7F7',
              strokeWidth: 6,
              // offsetY: 0
            },
            tooltip: {
              enabled: true,
              theme: "dark",
              y: {
                formatter: (val) => `${val} projetos`
              },
              custom: ({ series, seriesIndex, dataPointIndex }) => {
                return `<div style="padding: 5px; background: #333; color: #fff; border-radius: 4px;">
                          ${series[seriesIndex][dataPointIndex]} Projetos
                        </div>`;
              }
            }
          }}
          series={lastProjectTypes}
          type="area"
        />
      </Flex>
    </Flex>
  )
}

export default ProjectsByMonths
