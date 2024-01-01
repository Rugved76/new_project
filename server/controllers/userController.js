import {UserModel} from '../models/users.js';
// import { UserModel } from '../models/Users';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const secret = 'yetanothersecretkey';

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword });

        await user.save();

        res.json({ message: 'User registered successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existinguser = await UserModel.findOne({ email });

        if (!existinguser) {
            return res.status(400).json({ message: "User doesn't exist!" });
        }

        const hashedPassword = existinguser.password;
        const ismatch = await bcrypt.compare(password, hashedPassword);

        if (!ismatch) {
            return res.status(400).json({ message: 'Incorrect password!' });
        }

        const token = jwt.sign({ id: existinguser._id, email: existinguser.email }, secret, { expiresIn: '1h' });

        res.json({ token, userID: existinguser._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error!' });
    }
}

export const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            jwt.verify(authHeader, secret, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Token is invalid' });
                }
                res.status(200).json({ message: 'Token is valid', decoded });
            });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error during token verification' });
    }
};