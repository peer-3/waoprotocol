import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const baseURL = 'https://api.studio.thegraph.com/query/60911/gh-backup/version/latest';
    const gqlQuery = `{
  snapshotCreateds(first: 10) {
    		id
    		htmlUrl
            price
            isPrivate
        owner
        repoName
        commitHash
        timestamp
        transactionHash
  }
}`
    const {data} = await axios.post(baseURL, {query: gqlQuery});
    return NextResponse.json({
        data
    })
}