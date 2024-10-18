import axios from "axios"
import { generateToken } from "./generateToken.js"

export const getToken = async () => {
    //взять токен из того места, где храним
    const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjkyNDQwMzksImV4cCI6MTcyOTMzMDQzOSwic3ViIjoic2Vzc2lvbiIsImlzcyI6ImJhcm9uZyIsImF1ZCI6WyJwZWF0aW8iXSwianRpIjoiNjc2RUM5MThDMEQ3QUFGQzIzNjgwNzY5IiwidWlkIjoiSUQxNjVBRTdCNTE1IiwiZW1haWwiOiJrb3JvbGV2ZGlyZWN0QGdtYWlsLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJsZXZlbCI6Miwic3RhdGUiOiJhY3RpdmUiLCJhcGlfa2lkIjoiMDI0MDQ3OGUtOGQ1My00M2EwLTkyMmYtZTUxMmYwMDJmMWM5In0.XZD6Sm5oFhabBPUiJvu2m5HYZkhvDoh1-Jii18SWAnaSmrkDgbPvkFeCEPpA_SVev77iUV-nUlARov3sssJkLrKbVwjrjEOQcOb10TOx0BuhiFHWnz6-SQk_4W7K19BN2UvUB1ZPTynp7verWm9RuFiQsNQmcqWwiflypO58ytqnH2CAZsvRPiOgNKF2jO3IvtZ1H_j74co_VucHZnZYHkOxdKULF7h8XZzRg1esuPY1W9YSTY4Mv8P3sGNPhUYproH1DoC0_KhOD0fSUYUfyzt5hGXSZk7JQjZbeTW3dkbXdzdqnmn-id1R4IOsoc817DDcWTFeL0WJCkQjB5p8KQ'// взять из того места, где лежит
    const validToken = await testToken(token)

    console.log('validToken', validToken)

    if(validToken) {
        return token
    } else {
        //генерируем новый токен
        const newToken = await generateToken()
        console.log('newToken', newToken)
        return newToken
    }
}

const testToken = async (token) => {
    try {
        const { data } = await axios.get(`https://garantex.org/api/v2/markets`, {
            headers: {
                "Accept": '/',
                Referer: 'http://localhost:3000',
                "Origin": 'http://localhost:3000/',
                "Authorization": `Bearer ${token}`
            }
        })
        return data?.length ? true : false
    } catch (error) {
        console.log('error testToken', error)
        return false
    }
}