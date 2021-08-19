import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
    tokenId: String,
    userId: String,
});

mongoose.model('RefreshToken', RefreshTokenSchema);