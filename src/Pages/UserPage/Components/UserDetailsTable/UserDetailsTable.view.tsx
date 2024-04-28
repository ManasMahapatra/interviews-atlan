import { Row, Table, flexRender } from "@tanstack/react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { UserDetailType } from "../../UserTypes";
import { Table as ChakraTable,  Flex,  TableContainer, Tbody, Td, Th, Thead, Tr, useMediaQuery } from "@chakra-ui/react";
import { Virtualizer } from "@tanstack/react-virtual";

interface UserDetailsTableViewProps {
    table: Table<UserDetailType>;
    rows: Row<UserDetailType>[];
    rowVirtualizer: Virtualizer<HTMLDivElement, Element>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tableContainerRef: any;
    fetchMoreOnBottomReached: (containerRef: HTMLDivElement | null) => void;
}

export const UserDetailsTableView: React.FC<UserDetailsTableViewProps> = ({
    table,
    rows,
    rowVirtualizer,
    tableContainerRef,
    fetchMoreOnBottomReached
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [tableHeight, setTableHeight] = useState<number>(0);
    const [isMobileView] = useMediaQuery("(max-width: 768px)");

    const containerRefHeight: number = useMemo(() => {
        if (containerRef.current) {
            const parentElement = containerRef.current.parentElement;
            const firstChild = parentElement?.firstElementChild;
            return parentElement?.scrollHeight as number - (firstChild as Element)?.scrollHeight - (isMobileView ? 390 : 248) as number
        }
        return 600;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef.current, isMobileView])

    useEffect(() => {
        setTableHeight(containerRefHeight)
    }, [containerRefHeight])
    return (
        <Flex
            justifyContent={"center"}
            position={"relative"}
            height="inherit"
            margin={"0 5px"}
            ref={containerRef}
        >
            <TableContainer>
                <ChakraTable>
                    <Thead
                        display={"grid"}
                        position={"sticky"}
                        top="0"
                        zIndex={"1"}
                    >
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr
                                key={headerGroup.id}
                                display={"flex"}
                                width="100%"
                                backgroundColor={"#175C44"}
                                height="45px"
                                borderRadius={"6px"}
                            >
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        width={header.getSize()}
                                        color={"white"}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody
                        display="grid"
                        position={"sticky"}
                        height={`${tableHeight}px`}
                        overflow={"scroll"}
                        ref={tableContainerRef}
                        onScroll={(event) => fetchMoreOnBottomReached(event.target as HTMLDivElement)}
                    >
                        <Tr>
                            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                                const rowElement = rows[virtualRow.index] as Row<UserDetailType>;
                                return (
                                    <Tr
                                        backgroundColor={virtualRow.index % 2 !== 0 ? "#175A43" : "transparent"}
                                        data-index={virtualRow.index}
                                        ref={(node) => rowVirtualizer.measureElement(node)}
                                        key={rowElement.id}
                                        display={"flex"}
                                        alignItems={"center"}
                                        borderRadius={"6px"}
                                        height="45px"
                                        position={"absolute"}
                                        transform={`translateY(${virtualRow.start}px)`}
                                        width="100%"
                                    >
                                        {rowElement.getVisibleCells().map((cellDetails) => (
                                            <Td
                                                key={cellDetails.id}
                                                display={"flex"}
                                                width={cellDetails.column.getSize()}
                                                color={"white"}
                                                justifyContent={"center"}
                                            >
                                                {flexRender(
                                                    cellDetails.column.columnDef.cell,
                                                    cellDetails.getContext()
                                                )}
                                            </Td>
                                        ))}
                                    </Tr>
                                )
                            })}
                        </Tr>
                    </Tbody>
                </ChakraTable>
            </TableContainer>
        </Flex>
    )
}