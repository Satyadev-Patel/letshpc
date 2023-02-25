import React from 'react'
import { Card, Typography, CardContent } from '@mui/material'

const ProblemCard = (props) => {
  return (
        <Card style={{margin:"20px", backgroundColor:"#A7ECE9"}}>
            <CardContent>
                <Typography variant='h4' fontFamily={"Poppins"}>
                    {props.head}
                </Typography>
                <Typography variant='body1' fontFamily={"Poppins"}>
                    {props.body}
                </Typography>
            </CardContent>
        </Card>
  )
}

export default ProblemCard