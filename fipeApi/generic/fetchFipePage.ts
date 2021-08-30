import axios from "axios";

async function fetchFipePage(url: string): Promise<string> {
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Fiplaca Crawler'
        }
    });
    if (response.status != 200) {
        throw new Error(`Got ${response.status} (${response.statusText})!`);
    }

    return response.data;
}

export { fetchFipePage }