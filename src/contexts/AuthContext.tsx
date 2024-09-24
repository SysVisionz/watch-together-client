import {FC, ReactNode, createContext, useState} from 'react'

export type PrivLevel = {
    [Priv in 'scan' | 'pause' | 'skip' | 'location' | 'group' | 'delete' | 'members' | 'ban' ]: boolean
}

type AuthContext = {
    username: string,
    firstName: string,
    lastName: string,
    bio: string
}

export const authContext = createContext<AuthContext>({
    username: "",
    firstName: "",
    lastName: "",
    bio: ""
})

export const AuthProvider: FC<{children: ReactNode, className?: string}> = ({children, className}) => {
    const [username, setUserName] = useState<AuthContext["username"]>("")
    const [firstName, setFirstName] = useState<AuthContext["firstName"]>("")
    const [lastName, setLastName] = useState<AuthContext["lastName"]>("")
    const [bio, setBio] = useState<AuthContext["bio"]>("")
    const setUserContext = (user: Partial<AuthContext>) => {
        fetch(new URL(`${process.env.HOST}/socket`), {
            'credentials': 'include'
        }).then((val) => {
            val.json().then(body => {
                for (const i in body){
                    let funct;
                    switch(i){
                        case 'user':
                            funct = setUserName
                            break;
                        case 'firstName':
                            funct = setFirstName
                            break;
                        case 'lastName':
                            funct = setLastName
                            break;
                        case 'bio':
                            funct = setBio
                            break;
                        default:
                            throw "Invalid user key"
                    }
                    funct(body[i])
                }
            })
        })
    }
    return <authContext.Provider value={{username, firstName, lastName, bio }} >
        {children}
    </authContext.Provider>
}
