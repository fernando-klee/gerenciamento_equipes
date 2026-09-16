import { Button, Flex, Image } from '@chakra-ui/react'
import { DifferentMonthLeader } from '../DifferentMonthLeader'
import { DifferentMonthRoom } from '../DifferentMonthRoom'
import { WeekendDays } from '../WeekendDays'
import { useEffect, useState } from 'react'
import { DifferentMonthProps } from './interface'
import TrashCan from '../../../../assets/TrashCan.svg'

export function DifferentMonth({ selectedOption, checkbox }: DifferentMonthProps) {
  const [showHomeOffice, setShowHomeOffice] = useState(false)

  useEffect(() => {
    setShowHomeOffice(checkbox)
  }, [checkbox])

  return (
    <Flex flexDir='row' width='100%' gap='40px' bgColor='red'>
      <Flex flex={1}>
        {selectedOption === '' ? (
          <Flex flexDirection='column' width='100%'>
            <Flex justifyContent='space-between' gap='50px'>
              <WeekendDays checkbox={showHomeOffice} />
            </Flex>
            <Flex width='100%' flexDir='row-reverse' mt='50px' gap='13px'>
              <Button
                borderRadius='30px'
                bgColor='#239B28'
                fontSize='16px'
                color='#FFFFFF'
                width='133px'
                height='52px'
                fontWeight={400}
              >
                Enviar escala
              </Button>
              <Button
                borderRadius='30px'
                bgColor='#E3E3E3'
                fontSize='16px'
                color='#1B1464'
                width='133px'
                height='52px'
                fontWeight={400}
              >
                Salvar rascunho
              </Button>
              <Button
                borderRadius='30px'
                bgColor='#F7F7F7'
                fontSize='16px'
                color='#FFFFFF'
                width='52px'
                height='52px'
                fontWeight={400}
              >
                <Image src={TrashCan} w='100%' h='100%' />
              </Button>
            </Flex>
          </Flex>
        ) : selectedOption === 'Sala' ? (
          <DifferentMonthRoom rooms={[]} />
        ) : selectedOption === 'Líder' && (
          <DifferentMonthLeader rooms={[]} />
        )}
      </Flex>
    </Flex>
  )
}