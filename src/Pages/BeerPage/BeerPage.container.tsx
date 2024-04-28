import React, { useCallback, useState } from "react";
import { BeerPageView } from "./BeerPage.view";
import { fetchNews } from "./Fetchers/NewsFetcher";
import { UserDetailType } from "./NewsPageTypes";

export type QueryConfigType = {
    nameFilter?: string;
    selectedColumns: string;
    limit: number;    
}

export const BeerPageContainer : React.FC = () => {
    const [areResultsLoading, setAreResultsLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Array<UserDetailType>>([]);
    const [queryConfig, setQueryConfig] = useState<QueryConfigType>({
        limit: 20,
        selectedColumns: "*"
    })

    const onNameChange = useCallback((nameQuery: string) => {
        setQueryConfig((prevConfig) => ({
            ...prevConfig,
            nameFilter: nameQuery
        }))
    }, [setQueryConfig])

    const onLimitChange = useCallback((limit: number) => {
        setQueryConfig((prevConfig) => ({
            ...prevConfig,
            limit
        }))
    }, [setQueryConfig])

    const onSelectedColumnChange = useCallback((selectedColumns: string) => {
        setSearchResults([]);
        setQueryConfig((prevConfig) => ({
            ...prevConfig,
            selectedColumns
        }))
    }, [setQueryConfig])

    const fetchResults = useCallback(async () => {
        setAreResultsLoading(true)
        const newSearchResults = await fetchNews(queryConfig, true);
        /**
         * Once we get the new results we need to append it to existing results.
         */
        setSearchResults((previousSearchResults) => ([
            ...previousSearchResults,
            ...newSearchResults
        ]))
        setAreResultsLoading(false)
    }, [queryConfig])

    const fetchMoreOnBottomReached = useCallback(async (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
            const { scrollHeight, scrollTop, clientHeight, lastElementChild } = containerRefElement;
            const lastVisibleChildELement = parseInt(lastElementChild?.lastElementChild?.getAttribute("data-index") as string);
            /**
             * We will only request for more results, when the last element of the virtualised list is the last
             * element of the search result.
             */
            if (
                scrollHeight - scrollTop - clientHeight < 100
                && !areResultsLoading
                && lastVisibleChildELement === searchResults.length - 1
            ) {
                setAreResultsLoading(true)
                const newSearchResults = await fetchNews(queryConfig, false);
                setSearchResults((prevSearchResults) => [
                    ...prevSearchResults,
                    ...newSearchResults
                ])
                setAreResultsLoading(false)
            }
        }
    }, [areResultsLoading, queryConfig, searchResults.length])

    const onSearchUserClick = useCallback(() => {
        setSearchResults([]);
        fetchResults()
    }, [fetchResults])

    return (
        <BeerPageView
            onNameChange={onNameChange}
            onLimitChange={onLimitChange}
            onSearchUserClick={onSearchUserClick}
            searchResults={searchResults}
            fetchMoreOnBottomReached={fetchMoreOnBottomReached}
            areResultsLoading={areResultsLoading}
            queryConfig={queryConfig}
            onSelectedColumnChange={onSelectedColumnChange}
        />
    )
}