import React, { useMemo, useRef } from "react";
import { UserDetailType } from "../../UserTypes";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UserDetailsTableView } from "./UserDetailsTable.view";
import { useVirtualizer } from "@tanstack/react-virtual";
import { QueryConfigType } from "../../UserSearchPage.container";

interface UserDetailsTableContainerProps {
    searchResults: UserDetailType[];
    fetchMoreOnBottomReached: (containerRef: HTMLDivElement | null) => void;
    queryConfig: QueryConfigType
}

export const UserDetailsTableContainer: React.FC<UserDetailsTableContainerProps> = ({
    searchResults,
    fetchMoreOnBottomReached,
    queryConfig
}) => {
    const tableContainerRef = useRef<HTMLDivElement>();
    const supportedColumn = queryConfig.selectedColumns;
    const columns = useMemo(() => {
        // Define a base set of columns with the Serial number always included
        const baseColumns = [
          {
            accessorKey: "indexNumber",
            header: "Serial",
            size: 20
          }
        ];
      
        // Check if the supportedColumn value is '*', which means all columns should be included
        if (supportedColumn === '*') {
            return [
                ...baseColumns,
                {
                    accessorKey: "userName",
                    header: "Name",
                    size: 280
                },
                {
                    accessorKey: "userEmail",
                    header: "Email",
                    size: 400
                },
                {
                    accessorKey: "userGender",
                    header: "Gender",
                    size: 350
                },
                {
                    accessorKey: "userJobDescription",
                    header: "Job Description",
                    size: 60
                },
                {
                    accessorKey: "userJobTitle",
                    header: "Job Title",
                    size: 400
                },
                {
                    accessorKey: "userMobileNumber",
                    header: "Phone Number",
                    size: 60
                },
                {
                    accessorKey: "userAge",
                    header: "Age"
                }
            ];
        }
      
        // If userName or userEmail is provided, include them in the columns
        const dynamicColumns = [];
        if (supportedColumn.includes('userName')) {
            dynamicColumns.push({
                accessorKey: "userName",
                header: "Name",
                size: 280
            });
        }
        if (supportedColumn.includes('userEmail')) {
            dynamicColumns.push({
                accessorKey: "userEmail",
                header: "Email",
                size: 400
            });
        }
      
        // Return the base columns along with any dynamic columns determined based on supportedColumn
        return [
            ...baseColumns,
            ...dynamicColumns
        ];
      }, [supportedColumn]);
      

    const table = useReactTable({
        data: searchResults,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: () => 33, 
        getScrollElement: () => tableContainerRef?.current as HTMLDivElement,
        measureElement: typeof window !== 'undefined' &&
            navigator.userAgent.indexOf('Firefox') === -1
                ? element => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5
    })

    return (
        <UserDetailsTableView
            table={table}
            rowVirtualizer={rowVirtualizer}
            rows={rows}
            tableContainerRef={tableContainerRef}
            fetchMoreOnBottomReached={fetchMoreOnBottomReached}
        />
    )
}