export async function getAllUsers(){
    const response = await fetch('http://localhost:3005/users')
    const data = await response.json()
    return data
}