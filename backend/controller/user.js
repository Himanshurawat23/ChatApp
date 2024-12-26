const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SignUp = async (req, res) => {
    try {
        console.log(req.body)
        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "You have already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/8.x/adventurer/svg?seed=${username}`,
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "You have not registered. Please register first.",
            });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            )

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login success",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure. Please try again.",
        });
    }
};

let logout = async (req, res) => {
    try {
        console.log(" Backend logout")
        res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out Successfully",
            success:true
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {SignUp,login,logout}
