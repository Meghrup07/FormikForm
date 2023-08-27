import axios from "axios"
import { userDetails } from "../types/types"


const apiUrl = "http://localhost:3001/userInfo"

export const getUser = async () => {
    return await axios.get<userDetails[]>(apiUrl)
}

export const getSingleUser = async (id: any) => {
    return await axios.get<userDetails[]>(`${apiUrl}/${id}`)
}

export const addUser = async (user: any) => {
    return await axios.post<userDetails[]>(apiUrl, user)
}

export const editUser = async (id: any, user: any) => {
    return await axios.put<userDetails[]>(`${apiUrl}/${id}`, user)
}

export const deleteUser = async (id: any) => {
    return await axios.delete(`${apiUrl}/${id}`)
}
// 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
