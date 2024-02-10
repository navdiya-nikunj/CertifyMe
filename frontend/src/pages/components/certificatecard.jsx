import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

export default function CertificateCard({
    name, description, image, id
}) {

    

    const downloadCertificate = async () => {
        axios({
            url: image,
            method: 'GET',
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL
                    .createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'certificate.jpg');
                document.body.appendChild(link);
                link.click();
            })
        }


    return (
        <>
            <Card sx={{ maxWidth: 400,  minWidth:300, maxHeight:400, minHeight:300 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{fontSize:"0.5rem"}} >
                            {`Certificate Id: 0x23d6E35159Cc6979667577d50F1148f30bb8E01/${id}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={downloadCertificate}>
                        Download
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}