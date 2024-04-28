import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import MessageSection from "./Components";
import { QueryConfigType } from "../../BeerPage.container";

interface TopSearchSectionViewProps {
    onNameChange: (nameQuery: string) => void;
    onLimitChange: (limit: number) => void;
    onSearchUserClick: () => void;
    onSelectedColumnChange: (selectedColumns: string) => void;
    queryConfig: QueryConfigType;
}

export const TopSearchSectionView : React.FC<TopSearchSectionViewProps> = ({
    onNameChange,
    onLimitChange,
    onSearchUserClick,
    onSelectedColumnChange,
    queryConfig
}) => {
    const [tempMessageConfig, setTempMessageConfig] = useState<{
        messageType: string | null,
        message: string | null
    }>({
        messageType: null,
        message: null
    })

    const onDisabledClick = () => {
        setTempMessageConfig({
            messageType: "error",
            message: "You either need to provide * as SELECT, or a combination of supported columns. For example: userName,userEmail [Comma Separated]."
        });
        setTimeout(() => {
            setTempMessageConfig({
                message: null,
                messageType: null
            })
        }, 5000)
    }

    const onCTAClick = () => {
        /**
         * Check if columnSelected are valid
         */
        const separatedValues = queryConfig.selectedColumns.split(",");
        const hasDuplicates = new Set(separatedValues).size !== separatedValues.length;
        const unsupportedValues = separatedValues.filter(value => !['*', 'userName', 'userEmail'].includes(value.trim()));
        const asteriskIndex = separatedValues.indexOf('*');
        const asteriskRuleViolated = asteriskIndex !== -1 && separatedValues.length > 1;

        let message = '';
        if (hasDuplicates) {
            message += 'Duplicate values found. ';
        }

        if (unsupportedValues.length > 0) {
            const unsupportedString = unsupportedValues.join(', ');
            message += `Provided ${unsupportedString} are not supported as of now. Please update the selection as per supported values.`;
        }


        if (asteriskRuleViolated) {
            message += 'If "*" is provided, no other parameters should be provided.';
        }

        if (typeof queryConfig.limit === "number" && queryConfig.limit < 20) {
            message += "The minimum limit should be 20. Please update the limit and try again."
        }

        if (message.length) {
            setTempMessageConfig({
                message,
                messageType: "error"
            });
            setTimeout(() => {
                setTempMessageConfig({
                    message: null,
                    messageType: null
                })
            }, 5000)
        } else {
            if (queryConfig.limit > 1000) {
                setTempMessageConfig({
                    messageType: "warning",
                    message: "The provided limit is high. The limit that you provide is the number that will be used to determine the size of page fetched which will increase fetch time. We can handle huge datasets upto 100000, however if you want better performance you can set the limit lower, and can keep scrolling the list and fetch will automatically happen."
                });
                setTimeout(() => {
                    setTempMessageConfig({
                        message: null,
                        messageType: null
                    })
                }, 10000)
            }
            onSearchUserClick()
        }
    };

    const handleKeyPress = (event: { key: string; }) => {
        // Check if the pressed key is Enter
        if (event.key === 'Enter') {
          // Call your function here
          onCTAClick();
        }
      };

    return (
        <Box padding="16px">
            <Box
                backgroundColor="#081C15"
                borderRadius={"6px"}
                alignItems={"center"}
                padding={"6px"}
                fontWeight={"bold"}
            >
                <Text color={"#52B788"} display="inline">
                    SELECT
                </Text>
                <Input
                    backgroundColor={"transparent"}
                    color={"#52B788"}
                    borderBottom={"1px solid #1b4332"}
                    margin={"0 10px"}
                    width={"170px"}
                    textAlign={"center"}
                    onChange={(event) => {
                        onSelectedColumnChange(event.target.value as string)
                    }}
                    spellCheck={false}
                    value={queryConfig.selectedColumns}
                    onKeyDown={handleKeyPress}
                />
                <Text color={"#52B788"} display="inline">
                    FROM people WHERE person_name is
                </Text>
                <Input
                    backgroundColor={"transparent"}
                    color={"#52B788"}
                    borderBottom={"1px solid #1b4332"}
                    margin={"0 10px"}
                    width={"170px"}
                    textAlign={"center"}
                    onChange={(event) => {
                        onNameChange(event.target.value as string)
                    }}
                    onKeyDown={handleKeyPress}
                />
                <Text color={"#52B788"} display="inline" paddingRight={"5px"}>
                    AND LIMIT
                </Text>
                <Input
                    backgroundColor={"transparent"}
                    color={"#52B788"}
                    type="number"
                    borderBottom={"1px solid #1b4332"}
                    width={"100px"}
                    textAlign={"center"}
                    onChange={(event) => {
                        onLimitChange(parseInt(event.target.value))
                    }}
                    onKeyDown={handleKeyPress}
                />
            </Box>
            <MessageSection
                messageType={tempMessageConfig.messageType as "error" | "info" | "warning" || "info"}
                message={tempMessageConfig.message || "In the select input you can choose any column of your choice. In people DB we have userName, userEmail, userJobTitle, userGender, etc. Support for filtering more WHERE parameters are coming soon. You can comma separated value now to select columns of your choice. As of now you can provide * | userName | userEmail or comma separated values like userName,userEmail to see only these two columns. The field is mandatory."}
            />
            <Button
                width="100%"
                variant='solid'
                backgroundColor={"#52B788"}
                opacity={!queryConfig.selectedColumns.length ? 0.5 : 1}
                padding={"8px 0"}
                margin={"10px 0"}
                borderRadius={"6px"}
                fontWeight={"bold"}
                onClick={queryConfig.selectedColumns.length ? onCTAClick : onDisabledClick}
            >
                Search people
            </Button>
        </Box>
    )
}