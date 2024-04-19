import { RawGame } from "../Types";

const loadGame = async (slug: string): Promise<RawGame | undefined> => {
    const res = await fetch(`/api/games/${slug}`)
    if(res.ok){
        return res.json()
    }
}

export default loadGame