import React from 'react';

export default function UserManagement(props) {
	let formattedUsers = props.users.map( u => {
			return <li style={{textAlign: "left"}} key={u.userID}>{u.userName}  - ID: {u.userID}</li>
		})
		
	return(
			<>
					<h2>All users</h2>
					<ul style={{paddingLeft: "40%"}}>{formattedUsers}</ul>
			</>
	)

}