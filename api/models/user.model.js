import mongoose from "mongoose";
import { transporter } from "../config/nodeMailer.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.zP1mlHnV1bpgODW8gvQSFQHaIP?rs=1&pid=ImgDetMain",
    },
  },
  { timestamps: true }
);
userSchema.post("save", async function (doc) {
  try {
    let info = await transporter.sendMail({
      from: "Dummy",
      to: doc.email,
      subject: "Account Created",
      html: `<h1>Welcome ${doc.username}</h1>`,
    });
    console.log(info);
  } catch (error) {
    console.log("error occured while sending the mail", error);
  }
});
const User = mongoose.model("User", userSchema);
export default User;
