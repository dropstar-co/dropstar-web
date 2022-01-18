import { VenlyConnect, WindowMode } from '@venly/connect'


const auth = async () => {
    const venlyConnect = new VenlyConnect('Testaccount',{ environment: 'staging'}); 
    console.log(venlyConnect)
    const v = await venlyConnect.flows.authenticate()
    const z = await venlyConnect.checkAuthenticated()
    console.log(v)
    console.log(z)
    const wallets = await venlyConnect.api.getProfile()

    const logout =  await venlyConnect.logout()

    console.log(logout)
    return wallets
}
export default auth