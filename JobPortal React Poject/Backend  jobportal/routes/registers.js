const router = require ("express").Router();
let register = require ("../models/register");
const nodemailer=require('nodemailer');

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Insert Route

router.post('/add', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
        } = req.body;


        //Check if email already exist

        const existingUser =await register.findOne ({email: email});
        if (existingUser){
          return res.status (400).send ('Email already exists');
        }
             // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password and confirmPassword
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, salt); 

      const newRegister = new register({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        confirmPassword:hashedConfirmedPassword
       
      });
  
      await newRegister.save();
      await sendApprovalEmail(email);
  
      res.json("User added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to add User");
    }
  });





        //fetch

    
    router.route ("/").get ((req,res)=>{

        register.find().then ((registers) => {

                res.json(registers)

        }).catch((err)=>{

            console.log(err)
        })

    })


router.route ("/update/:id").put(async(req,res)=>{
    let registerId = req.params.id;
    const { 
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } =req.body;    //D structure method 
 
    const updateRegister ={
        firstName,
        lastName,
        email,
        password,
        confirmPassword
       

    }

    const update = await register.findByIdAndUpdate(registerId, updateRegister)
    .then (() => {
    res.status (200).send ({status: "User updated" })
    }).catch ((err)=>{

    console.log(err);
    res.status(500).send ({status: "Error with updating user" , error: err.message})




    })

})

router.route ("/delete/:id") .delete (async (req ,res) => {
    let registerId =req.params.id;

    await register.findByIdAndDelete (registerId)
    .then (() =>{
        res.status(200).send ({status:"User deleted"});
    }).catch ((err)=>{

        console.log(err.message);
        res.status(500).send ({status: "Error with delete User" , error :err.message});


    })
    
})


// fetch data from one userid

router.route("/get/:id").get(async (req,res) => {

    let registerId =req.params.id;
    const Register = await register.findById(registerId) 
    .then ((register) =>{
        res.status(200).send({status: "user fetched",register })
    }).catch (() => {
            console.log(err.message);
            res.status(500).send ({status: "Error with get register" , error : err.message});

    })
})


    // Route to login 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await register.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ status: false, message: 'User is not registered' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ status: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ email: user.email }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Function to send approval email
async function sendApprovalEmail(email) {
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // false for other ports
      auth: {
        user: 'jobnestlanka@gmail.com', // your email
        pass: 'setk uqql cczt jvee ' // your password
      }
    });

    // send mail with defined transport object and capture the result
    let info = await transporter.sendMail({
      from: 'jobnestlanka@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Approval Email', // Subject line
      text: `Your JOBNEST account has been approved ✅! . 
            your email : ${email} 
            Hurry Up...🥳🥳🥳 Log in to your account and access the world of jobs with us...Thanks-JOBNEST Team`
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending approval email:', error);
    }
  }
module.exports =router;