import React, { useEffect, useState } from "react";
import { Box, Flex, GlobalStyle, Image, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import topLetter from '../../../assets/top-letter.svg';
import { api } from "../../../services/api";

interface Leader {
    id: number;
    name: string;
    photo_url: string;
    leader: boolean;
    status: string;
}

interface Project {
    id: number;
    project_id: number;
    resource_id: number;
    hours_amount: number;
    project_name: string;
    customer_name: string;
}

interface Resource {
    id: number;
    name: string;
    photo_url: string;
    leader: boolean;
    status: string;
    leader_id: number;
    projects: Project[];
}

interface OrganogramData {
    leader: Leader;
    resources: Resource[];
}

const Organogram = () => {
    const [organogramData, setOrganogramData] = useState<OrganogramData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/resources/organogram");
                setOrganogramData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching organogram data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <GlobalStyle />
            <Box bg="white" minH="100vh" h="100%" display="flex" justifyContent="center" alignItems="center">
                <Flex direction="column">
                    <Image src={topLetter} />
                    <Flex justify="center" pb="60px"> {/* Add margin top here */}
                        <Image
                            onClick={handlePrint}
                            src="https://i.imgur.com/UdJdqE6.png"
                            alt="Logo da Testing Company"
                            className="bottom-center-image"
                            width="10%"
                            pos="relative"
                        />
                    </Flex>

                    <Flex flexDir="column" mt="-40px">
                        <Flex flexDir="column" alignItems="center">
                            <Table border={1} style={{ width: "80%" }}>
                                <Tbody>
                                    {organogramData.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Tr style={{ background: "#f5f5f5" }}>
                                                <Td colSpan={2}><strong>{item.leader.name}</strong></Td>
                                            </Tr>
                                            {item.resources.map((resource, resourceIndex) => {
                                                const uniqueCustomers = new Set();
                                                return (
                                                    <Tr key={resourceIndex}>
                                                        <Td><strong>{resource.name}</strong></Td>
                                                        <Td>
                                                            {resource.projects.map((project, projectIndex) => {
                                                                if (!uniqueCustomers.has(project.customer_name)) {
                                                                    uniqueCustomers.add(project.customer_name);
                                                                    return (
                                                                        <React.Fragment key={projectIndex}>
                                                                            {projectIndex > 0 && ", "}
                                                                            {project.customer_name}
                                                                        </React.Fragment>
                                                                    );
                                                                }
                                                                return null;
                                                            })}
                                                        </Td>
                                                    </Tr>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </Tbody>
                            </Table>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Organogram;
