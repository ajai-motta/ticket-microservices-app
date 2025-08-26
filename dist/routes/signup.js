"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUserRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.signupUserRouter = router;
router.post('api/users/:signup', [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please provide valid email'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("password must be in beetwen 4 and 20")
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    console.log("creating user...");
    res.send({});
});
