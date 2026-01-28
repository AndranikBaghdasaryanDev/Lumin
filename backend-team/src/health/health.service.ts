import Axios from "../lib/api.ts"

export async function checkCoreBackend(): Promise<boolean> {
    try {
        await Axios.get('/api/health')
        return true
    } catch (error) {
        return false        
    }
}