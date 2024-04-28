import { QueryConfigType } from "../BeerPage.container";
import { generateFakeUsers } from "../Utils/NewsDetailParser";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchNews = async (queryConfig: QueryConfigType, isNewSetRequest: boolean) => {
    /**
     * This delay has been added to replicate a API call response time for huge data sets.
     * The delay can be adjusted from here if required.
     */
    await sleep(1500)
    const searchResults = await generateFakeUsers(queryConfig.limit, isNewSetRequest, queryConfig.nameFilter)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return searchResults;
}