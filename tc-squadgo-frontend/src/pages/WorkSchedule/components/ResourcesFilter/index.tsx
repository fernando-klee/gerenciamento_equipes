import { memo } from "react"
import { Avatar, Flex, Popover, PopoverTrigger, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ResourcesFilterProps } from "./interface"

function getFirstAndLastName(fullName: string) {
  const names = fullName.split(' ')
  const firstName = names[0]
  const lastName = names[names.length - 1]
  return `${firstName} ${lastName}`
}

function ResourcesFilter({ resources }: ResourcesFilterProps) {
  return (
    <Flex flexWrap="wrap" gap={8}>
      {resources.map((e) => (
        <Popover trigger="hover">
          <PopoverTrigger>
            <Link to={`/recursos/${e.id}`}>
              <Flex
                alignItems="center"
                flexDir="column"
                justifyContent="center"
                width="150px"
                minWidth="150px"
                gap={2}
              >
                <Avatar
                  cursor="pointer"
                  height="75px"
                  width="75px"
                  src={e.photo_url}
                  border="2px solid #fff"
                />
                <Text textAlign="center">{getFirstAndLastName(e.name)}</Text>
              </Flex>
            </Link>
          </PopoverTrigger>
        </Popover>
      ))}
    </Flex>
  )
}

export default memo(ResourcesFilter)