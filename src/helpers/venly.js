import { VenlyConnect, WindowMode } from '@venly/connect'



class venlyHelpers {
    
    static async login(){
        const venlyConnect = new VenlyConnect('Testaccount',{ environment: 'staging'}); 
        const v = await venlyConnect.flows.authenticate()
        return v 
    }

    static async loadProfile(){
        const venlyConnect = new VenlyConnect('Testaccount',{ environment: 'staging'}); 
        const wallets = await venlyConnect.api.getProfile()
        return wallets
    }

    static async checkAuth() { 
        const venlyConnect = new VenlyConnect('Testaccount',{ environment: 'staging'}); 
        const z = await venlyConnect.checkAuthenticated()
        return z

    }
    static async logOut() { 
        const venlyConnect = new VenlyConnect('Testaccount',{ environment: 'staging'}); 
        const logout = await venlyConnect.logout()
        return logout

    }
}
// const auth = async () => {
    
//     console.log(venlyConnect)
    
    
//     console.log(z)
    

//     // const logout =  await venlyConnect.logout()

//     console.log(wallets)
//     return wallets
// }
export default venlyHelpers;