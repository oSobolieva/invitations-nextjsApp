//import avatarRandomizer from "./helpers/avatarRandomizer"

export default function UsersItem({ name, email }) {
    
    return(
        <li className='usersItem'>
            <div className = 'usersItem-block'>     
                <div className = 'usersItem-texts'>
                    <p className = 'userItem-name'>{name}</p>
                    <p className = 'userItem-email'>@ {email}</p>
                </div>
            </div>
            <button className = 'addUserButton'>+</button>
        </li>
    )
} 

//<img src={avatarRandomizer()} className = 'usersItem-img' alt = 'u_lg'/>