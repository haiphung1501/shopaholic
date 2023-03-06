import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
function ReviewCard(props) {
    const { review } = props;
    const { user } = useSelector((state) => state.user);

    const avatarStyle = {
        backgroundColor: '#2196f3',
    };

    return (
        <Card style={{ maxWidth: 700 }}>
            <CardHeader
                avatar={<Avatar style={avatarStyle} src={user.user.avatar.url}></Avatar>}
                title={user.user.name}
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
