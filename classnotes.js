// server.js;
// // get * manages everything
// // put post route above get *
// // express static prefix "/uploads" and in the (path.join(__dirname, "uploads"))

// app.post("/image", uploader.single("file"), (req, res) => {
//     // first 3 steps done by the multer
//     // validation
//     // get the file from req
//     // safe the file somewhere
//     // respond to client
//     if (req.file) {
//         res.json({
//             success: true,
//             message: "thank you",
//             path: `/uploads/${req.file.filename}`,
//         });
//     } else {
//         res.json({
//             success: false,
//             message: "Please try again",
//         });
//     }
// });

// // HTML in main form
// {
// //     <div class="status">{{message}}</div>
// //     <form @submit.prevent="upload" action="/image" method="post" enctype="multipart/form-data">
// //     <div class="form-row">
// //     <label for="file">Your File:</label>
// //     <input type="file" name="file" id="file"/>
// //     <input type="submit"// if you want server to be able to read add name
// // </div>
// // </form> // enctype only used in image upload 
// // div class="images"
// //     <img v-for="image in images" v-bind:src="image" alt="upload image" />
// }

// multer.js;

// const { Billingconductor } = require("aws-sdk");
// const multer = require("multer");
// const path = require("path");
// const uidSafe = require("uid-safe");

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "uploads"),
//     filename: (req, file, callback) => {
//         uidSafe(24).then((uid) => {
//             const randomFileName = uid + path.extname(file.originalname);
//             // sidviabvi.png
//             callback(null, randomFileName);
//         });
//     },
// });

// module.exports.uploader = multer({
//     storage,
//     limits: {
//         fileSize: 2097152, //20bites
//     },
// });

// // script the uploader file in html

// uploader.js;

// const app = Vue.createApp({
//     data() {
//         return {
//             message: "Please upload your file",
//             images: []
//         }
//     }
//     methods:{
//         upload(e){
//             console.log("about to upload");
//             const form = e.currentTarget;
//             // console.log(form);


//             const fileInput = form.querySelector(
//                 'input[type=file]'
//             ) console.log();


//             const formData = new FormData(form);

//             fetch(form.action, {
//                 method: form.method,
//                 body: formData
//             }).then(res => res.json())
//                 .then((data)=>{
//                     console.log(data)
//                     this.message = data.message;
//                     if(data.path){
//                         this.images.push(data.path) // if you want newest image first dont push
//                     }
//                 })
//         }
//     }
// });

// app.mount("main");



