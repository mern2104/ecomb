const express = require("express");
const _ = express.Router();
const User = require("../../models/user.js");
const Merchant = require("../../models/merchant.js");
var jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../../utils/emailSender.js");
const bcrypt = require("bcrypt");

// registration
_.post("/registration", async (req, res) => {
  let { email, phoneNumber, firstName, lastName, password } = req.body;

  if (!email) {
    return res.json({ error: "You must enter an email address" });
  }

  if (!firstName) {
    return res.json({ error: "You must enter an firstName" });
  }

  if (!lastName) {
    return res.json({ error: "You must enter an lastName" });
  }

  if (!password) {
    return res.json({ error: "You must enter an password" });
  }

  let duplicateEmail = await User.find({ email: email });
  console.log(duplicateEmail);

  if (duplicateEmail.length > 0) {
    return res.json({ error: "Already email exists" });
  }

  bcrypt.hash(password, 10, function (err, hash) {
    const user = new User({
      email,
      phoneNumber,
      firstName,
      lastName,
      password: hash,
    });

    user.save();

    let username = user.firstName + user.lastName;

    let token = jwt.sign({ email: user.email }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    sendVerificationEmail(user.email, username, token);

    res.json(token);
  });
});

_.post("/emailverification", (req, res) => {
  // let decoded = jwt.verify(req.headers.authorization, ">@H%rH@>MDW(N72");

  jwt.verify(
    req.headers.authorization,
    process.env.JWTSECRET,
    async function (err, decoded) {
      // console.log(decoded.email);
      let existingdUser = await User.find({ email: decoded.email });

      console.log(existingdUser);
      if (existingdUser[0].verified == "true") {
        return res.json({ error: "Email Already Verified" });
      }
      let updatedUser = await User.findOneAndUpdate(
        { email: decoded.email },
        { verified: true },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    }
  );
});

_.post("/login", async (req, res) => {
  let { email, password } = req.body;
  // console.log(email, password);
  let existingdUser = await User.find({ email: email });

  if (existingdUser.length == 0) {
    return res.json({ error: "Email Not Found" });
  }

  console.log(!existingdUser[0].verified);

  if (existingdUser[0].verified == "false") {
    return res.json({ error: "Please Verify Your Email FOr login" });
  }

  // console.log(existingdUser.password);

  bcrypt.compare(password, existingdUser[0].password, function (err, result) {
    if (result) {
      return res.json({ message: "Login Successful" });
    } else {
      return res.json({ error: "Password Not Matched" });
    }
  });
});

_.post("/forgotpassword", async (req, res) => {
  let { email } = req.body;

  let existingdUser = await User.find({ email: email });

  if (existingdUser.length == 0) {
    return res.json({ error: "Email Not Found" });
  }

  sendVerificationEmail(email, existingdUser[0].username, 123456);
  res.json({ message: "Check Your Email" });
});

_.post("/becomeamerchant", (req, res) => {

  const { name, email, phoneNumber } = req.body;

  let mernchant = new Merchant({
    name,
    email,
    phoneNumber,
  });

  mernchant.save();

  res.json(mernchant);
});

_.post("/merchantstatus",async (req,res)=>{
  let { email, status }=req.body
  let updatedMerchant = await Merchant.findOneAndUpdate(
    { email: email },
    { status: status },
    {
      new: true,
    }
  );
  res.json(updatedMerchant)
})

module.exports = _;
