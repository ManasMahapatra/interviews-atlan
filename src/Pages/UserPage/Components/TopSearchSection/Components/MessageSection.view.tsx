import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface MessageSectionViewProps {
    messageType: "error" | "warning" | "info";
    message: string
}

const BG_COLOR_MAP = {
    error: "#755058",
    info: "#4e7f80",
    warning: "#b47e54"
}

export const MessageSectionView: React.FC<MessageSectionViewProps> = ({ messageType, message }) => {
    return (
       <Box width="100%" borderRadius={"8px"} padding="6px" backgroundColor={BG_COLOR_MAP[messageType]} color={"white"} marginTop={"8px"} opacity={0.8}>
            <Text fontSize={"13px"} lineHeight={"17px"} letterSpacing={"0.5px"} fontWeight={"bold"} fontFamily={"Helvetica"}>
                {message}
            </Text>
       </Box> 
    )
}