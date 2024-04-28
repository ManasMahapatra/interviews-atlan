import { Box, Flex, Spinner, useBreakpointValue, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo } from "react";
import TopSearchSection from "./Components/TopSearchSection";
import { UserDetailType } from "./UserTypes";
import UserDetailsTable from "./Components/UserDetailsTable";
import { QueryConfigType } from "./UserSearchPage.container";

interface UserSearchPageViewProps {
    onNameChange: (nameQuery: string) => void;
    onLimitChange: (limit: number) => void;
    onSearchUserClick: () => void;
    searchResults: UserDetailType[];
    fetchMoreOnBottomReached: (containerRef: HTMLDivElement | null) => void;
    areResultsLoading: boolean;
    queryConfig: QueryConfigType;
    onSelectedColumnChange: (selectedColumns: string) => void;
}

export const UserSearchPageView : React.FC<UserSearchPageViewProps> = ({
    onNameChange,
    onLimitChange,
    onSearchUserClick,
    searchResults,
    fetchMoreOnBottomReached,
    areResultsLoading,
    queryConfig,
    onSelectedColumnChange
}) => {
    const containerWidth = useBreakpointValue({ base: "100%", md: "90vw" })
    const containerHeight = useBreakpointValue({ base: "100%", md: "87vh" })
    const flexHeight = useBreakpointValue({base: "70%", md: "80%" })
    const [isMobileView] = useMediaQuery("(max-width: 768px)");
    const shouldShowSearchTable = useMemo(() => !!searchResults?.length, [searchResults])
    
    return (
        <Flex width={"100vw"} height={"100vh"} overflow="hidden" justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
            <Box
                width={containerWidth}
                height={containerHeight}
                backgroundColor="#040C09"
                borderRadius={"8px"}
            >
                <TopSearchSection
                    onNameChange={onNameChange}
                    onLimitChange={onLimitChange}
                    onSearchUserClick={onSearchUserClick}
                    onSelectedColumnChange={onSelectedColumnChange}
                    queryConfig={queryConfig}
                />
                {shouldShowSearchTable && areResultsLoading && isMobileView && (
                    <Flex width="100%" justifyContent={"center"} alignItems={"center"} gap="3" marginTop={"-20px"} marginBottom={"10px"}>
                        <Spinner height={"10px"} width={"10px"} color="#52B788"/>
                        <Text color="white" fontSize={"14px"}>
                            Getting more people...
                        </Text>
                    </Flex>
                )}
                {areResultsLoading && !shouldShowSearchTable && (
                    <Flex height={flexHeight} width="100%" justifyContent={"center"} alignItems={"center"} gap="3">
                        <Spinner height={"30px"} width={"30px"} color="#52B788"/>
                        <Text color="white" fontSize={"14px"}>
                            Fetching people DB...
                        </Text>
                    </Flex>
                )}
                {shouldShowSearchTable && queryConfig.selectedColumns.length && (
                    <UserDetailsTable
                        searchResults={searchResults}
                        fetchMoreOnBottomReached={fetchMoreOnBottomReached}
                        queryConfig={queryConfig}
                    />
                )}
            </Box>
            {shouldShowSearchTable && areResultsLoading && !isMobileView && (
                <Flex width="100%" justifyContent={"center"} alignItems={"center"} gap="3" marginTop={"8px"}>
                    <Spinner height={"10px"} width={"10px"} color="#52B788"/>
                    <Text color="white" fontSize={"14px"}>
                        Getting more people...
                    </Text>
                </Flex>
            )}
        </Flex>
    )
}