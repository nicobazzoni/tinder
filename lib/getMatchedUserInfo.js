const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUsers = { ...users }
    delete newUsers[userLoggedIn]

    const [id, user] = Object.entries(newUsers).flat()

    return { id, ...user }  
}
 
export default getMatchedUserInfo;

//utility function that creates...
//an object out of the given profiles and deletes the user
//return just the matched profile to the user and the profile info