// import { UserModel } from "../../model/userModel.js";
// import { PostModel } from "../../model/postModel.js";
// import asyncHandler from "express-async-handler";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";

// const addPost = asyncHandler(async (req, res) => {
//   const { title, text } = req.body;
//   const user = await UserModel.findById(req.user._id);
//   if (req.files) {
//     let fileName = Date.now().toString() + req.files.imgUrl.name; //формеруем імя картінкі которая пріходіт с фронтенда
//     const _dirname = dirname(fileURLToPath(import.meta.url)); //папка в которой ми находімся (controllers/post)
//     req.files.imgUrl.mv(path.join(_dirname, "..", "..", "uploads", fileName)); //переносім файл в папку uploads
//     const postWithImage = await PostModel.create({
//       username: user.name,
//       title,
//       text,
//       imgUrl: fileName,
//       author: req.user._id,
//     });
//     //пушім в модель Юзера
//     await UserModel.findByIdAndUpdate(req.user._id, {
//       $push: { posts: postWithImage },
//     });
//     return res
//       .status(201)
//       .json({ status: "ok", code: 201, data: postWithImage });
//   }
//   const postNoImage = await PostModel.create({
//     username: user.name,
//     title,
//     text,
//     imgUrl: "",
//     author: req.user._id,
//   });
//   //пушім в модель Юзера
//   await UserModel.findByIdAndUpdate(req.user._id, {
//     $push: { posts: postNoImage },
//   });
//   res.status(201).json({ status: "ok", code: 201, data: postNoImage });
// });

// export default addPost;
