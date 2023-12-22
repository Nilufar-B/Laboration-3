import mongoose from "mongoose";
import { User } from "@/utils/types/user";

const {Schema} = mongoose

const userSchema = new Schema<User> ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{timestamps: true}
)

/*userSchema.methods.fullName = function() {
    return `${this.name.first} ${this.name.last}`
}*/

export const UserModel =
 mongoose.models.UserModel ||
 mongoose.model<User>("UserModel", userSchema, "users")
