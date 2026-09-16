import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { AiFillEdit } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { FaLockOpen, FaLock } from "react-icons/fa";
import { HistoricProps, HistoricTypeProps } from "../../interfaces";

interface ProjectHistoricProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  historic: HistoricProps[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function ProjectHistoric({
  isOpen,
  onClose,
  projectName,
  historic,
  isLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
}: ProjectHistoricProps) {
  const typeHistoricIcon = (type: HistoricTypeProps) => {
    if (type === "NEW_PROJECT") return <FaLockOpen size={20} color="red" />;
    else if (type === "CLOSING_PROJECT")
      return <FaLock size={20} color="red" />;
    else if (type === "ADD_RESOURCE") {
      return (
        <Flex borderRadius="50%" position={"relative"} left="-2px">
          <IoIosAddCircle size={25} color="red" />
        </Flex>
      );
    } else if (
      type === "NAME" ||
      type === "HOURS" ||
      type === "TYPE" ||
      type === "STATUS" ||
      type === "INCREASE_RESOURCE_HOURS" ||
      type === "DECREASE_RESOURCE_HOURS" ||
      type === "START_ESTIMATE" ||
      type === "RESPONSIBLE_ID" ||
      type === "CUSTOMER_ID"
    ) {
      return <AiFillEdit size={23} color="red" />;
    } else {
      return (
        <Flex borderRadius="50%" position={"relative"} left="-4px">
          <TiDelete size={30} color="red" />
        </Flex>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <Box>
          <ModalHeader>{projectName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <>
                {historic.length > 0 ? (
                  <Flex flexDirection={"column"}>
                    {historic.map((h) => (
                      <Flex key={h.uuid} minHeight="100px">
                        <Flex
                          position="relative"
                          minWidth="60px"
                          alignItems={"center"}
                          marginLeft="10px"
                        >
                          <Box
                            position="absolute"
                            zIndex="1"
                            left="-14px"
                            borderRadius={"50%"}
                            bgColor="white"
                            padding="5px"
                          >
                            {typeHistoricIcon(h.type)}
                          </Box>
                          <Divider
                            opacity="1"
                            borderLeftWidth={"2px"}
                            orientation="vertical"
                          />
                        </Flex>
                        <Flex
                          flexDirection={"column"}
                          justifyContent="center"
                        >
                          <Text
                            dangerouslySetInnerHTML={{
                              __html: `${h.description}`,
                            }}
                          />
                          <Text color="gray">{h.created_at.toString()}</Text>
                        </Flex>
                      </Flex>
                    ))}
                    {hasMore && (
                      <Button
                        disabled={isLoadingMore}
                        marginTop={"10px"}
                        width={"max-content"}
                        onClick={onLoadMore}
                      >
                        {isLoadingMore && <Spinner mr={"5px"} />}
                        Carregar mais
                      </Button>
                    )}
                  </Flex>
                ) : (
                  <Text>Não há histórico</Text>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
} 