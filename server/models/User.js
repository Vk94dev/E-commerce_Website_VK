import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
    {
        googleId:{ 
            type:String
          },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
             required: function () {
        return this.provider !== "google";
          }
            // required: [true, "Password is required"],
            // minlength: 6
            
        },

        phone: {
            type: String,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },
        otp:{
            type:String
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        isVerified: {
            type: Boolean,
            default: false
        },
        provider:{
            type:String,
            default:"google"
        }
    },
    {
        timestamps: true
    }
);

// Hash Password Before Saving
userSchema.pre("save", async function() {

    // Skip hashing if password wasn't changed
    if (!this.isModified("password")) {
        return  ;
    }

    // Generate Salt
    const salt = await bcrypt.genSalt(10);

    // Hash Password
    this.password = await bcrypt.hash(this.password, salt);

});

// Compare Password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;