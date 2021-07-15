export default function({redirect}){
    if(!this.$auth.loggedIn){
        redirect('/auth?message=notLoggedIn')
    }
}