import { memo } from "react";
import { UserDetailsTableContainer as UserDetailsTable } from "./UserDetailsTable.container";

const MemoizedTable = memo(UserDetailsTable)

export default MemoizedTable;