import { FC } from "react"
import React, { useState } from 'react'

//import styles from '@/assets/scss/Home.module.scss'
import Layout from "@components/layout/Layout"
import LogInForm from "./forms/log-in-form"

//import {login} from '@/services/auth.service'
//import { AxiosError } from "axios"

type Props = {}

const Login: FC = (props: Props) => {

    const onSubmit = async (data:any) => {
        //const response = await login(data)   
        //console.log(response)
        //console.log(response?.toJSON())
        console.log(data)
    }

    return (
        <Layout>
            <div className="container mx-auto mt-8 p-4 flex flex-col items-center font-display">  
                <LogInForm onSubmit={onSubmit} />
            </div>               
        </Layout>
  )
}

export default Login