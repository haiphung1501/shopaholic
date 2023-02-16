import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from '@mui/material';

function ReviewCard(props) {
    const { review } = props;

    const avatarStyle = {
        backgroundColor: '#2196f3',
    };

    return (
        <Card style={{ maxWidth: 700 }}>
            <CardHeader
                avatar={<Avatar style={avatarStyle} src='https://www.pngitem.com/pimgs/m/404-4042686_my-profile-person-icon-png-free-transparent-png.png'></Avatar>}
                title={review.name}
                subheader={review.date}
            />
            <CardContent>
                <Rating size='small' value={review.rating} precision={0.5} readOnly />
                <Typography variant="body1" style={{ marginTop: 10 }}>
                    {review.comment}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ReviewCard;
