import React, { memo, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import { 
   // cusstom
   auth, database,
   // auth
   updatePassword, updateProfile,
   // storage 
   getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject,
   // firestore
   doc, getDoc, updateDoc
 } from "../../asset/firebase/firebase-config";
import PlayListSelector from "../Selection/PlayListSelector";
import { setImgUrl, updateUser } from "../../features/User/userFeatures";

const UpdateProfileStyled = styled.div`
   max-width: 500px;
   margin-left: auto;
   margin-right: auto;
   .form-control {
      background-color: #fff;
      width: 100%;
      color: #333333;
      font-size: 18px;
      height: 50px;
      margin-top: 6px;
      padding: 12px 22px;
      border-radius: 4px;
      border: solid 1px #bcc2ce;
      outline: none;
      -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 10%), 0 0 2px 0 rgba(0, 0, 0, 10%);
   }
   .btn-login {
      color: white;
      width: 100%;
      padding: 12px;
      margin-top: 2rem;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      background-color: #486ff2;
      border-color: #486ff2;
      box-shadow: 0px 2px 3px #9c9c9c;

      &:hover {
         opacity: 0.8;
         cursor: pointer;
      }
   }
   label {
      font-size: 16px;
      font-weight: 500;
   }
`
/*========================================================
========================================================*/
const ImageUpload = (props) => {
   const { name, className = "", progress = 0, image = "", handleDeleteImage = () => {}, ...rest } = props
   return (
      <label className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}>
         <input type="file" name={name} className="hidden-input" onChange={() => {}} {...rest} />
         {progress !== 0 && !image && (
            <div className="absolute z-10 w-16 h-16 border-8 border-green-500 rounded-full loading border-t-transparent animate-spin"></div>
         )}
         {!image && progress === 0 && (
            <div className="flex flex-col items-center text-center pointer-events-none">
               <img src="/img-upload.png" alt="upload-img" className="max-w-[80px] mb-5" />
               <p className="font-semibold">Thay đổi ảnh</p>
            </div>
         )}
         {image && (
            <Fragment>
               <img src={image} className="object-cover w-full h-full" alt="" />
               <button type="button" className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible" onClick={handleDeleteImage}>                 
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
               </button>
            </Fragment>
         )}
         {!image && (
            <div className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-green-400 image-upload-progress" style={{ width: `${Math.ceil(progress)}%` }}></div>
         )}
      </label>
   );
};
/*========================================================
========================================================*/
const MyInfoPage = memo(() => {
   const users = useSelector((state) => state.users);
   const dispatch = useDispatch();
   const storage = getStorage();

   const [changePasswordPage, setChangePasswordPage] = useState(false);
   const [nameImg, setNameImg] = useState("");
   const [image, setImage] = useState("");
  
   const { register, handleSubmit, reset, setValue, formState: { errors, isValid, isSubmitting }} = useForm({ 
     resolver: yupResolver(yup.object({
       email: yup.string().required("Vui lòng nhập email vào ô này").max(40, "Email dài quá 40 kí tự").email("Email bạn cung cấp không dúng với định dạng"),
       name: yup.string().required("Vui lòng nhập tên vào ô này").max(30, "Tên không dài quá 30 kí tự").min(5, "Tên không ngắn quá 5 kí tự"),
     })), 
     mode: "onChange",
   });
   const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: error2, isValid: isValid2, isSubmitting: isSubmitting2 }} = useForm({ 
     resolver: yupResolver(yup.object({
       password: yup.string().required("Vui lòng nhập mật khẩu cũ vào ô này").max(30, "Mật khẩu không dài quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
       passwordNew: yup.string().required("Vui lòng nhập mật khẩu mới vào ô này").max(30, "Mật khẩu không dài quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
       passwordNewCheck: yup.string().required("Vui lòng nhập lại mật khẩu vào ô này").oneOf([yup.ref("passwordNew"), null], "nhập lại mật khẩu không khớp với mật khẩu đã cung cấp"),
     })), 
     mode: "onChange",
   });

   useEffect(() => {
      if(!users?.email) return;
      if(users.imgUrl) {
         setImage(users.imgUrl);
         const img_name = /%2F(\S+)\?/gm.exec(users.imgUrl)[1];
         setNameImg("images/" + img_name);
         reset({ fileImg: users.imgUrl });
      };
      reset({ 
        email: users?.email,
        name: users?.name 
      });
   }, []);

   const onUpdateProfile = async(data) => {
      if(!isValid) return;
      if(data.fileImg) {
         try {
            updateProfile(auth.currentUser, {
               photoURL: data.fileImg,
            });
            updateDoc(doc(database, "users", users.id), {
               photoURL: data.fileImg,
            });
            dispatch(setImgUrl({                  
              photoURL: data.fileImg,
            }));
         } catch(err) {
            console.log(err);
         };
      };

      if (!data.fileImg && !image) {
         try {
            updateProfile(auth.currentUser, {
               photoURL: "",
            });
            updateDoc(doc(database, "users", users.id), {
               photoURL: "",
            });
            dispatch(setImgUrl({
              photoURL: "",
            }));
         } catch(err) {
            console.log(err)
         };
      };

      try {
         // update auth
         await updateProfile(auth.currentUser, {
            displayName: data.name.trim(),
         });
         await updateDoc(doc(database, "users", users.id), {
            name: data.name.trim(),
         });
         //  update state
         dispatch(updateUser({
            displayName: data.name.trim(),
         }));
         toast("Cập Nhật Thành Công", {
            type: "success",
         });
      } catch (err) {
         toast("Có lỗi đã sảy ra, vui lòng quay lại sau", { type: "error" });
         console.log(err);
      };
   };

   const onChangePasswords = async (data) => {
      const docRef = doc(database, "users", users.id);
      const docSnap = await getDoc(docRef);
      if (!isValid2) return;
      if (data.password !== docSnap.data().password) {
         toast("Mật Khẩu Không Chích Xác", {
            type: "error",
         });
         setTimeout(() => {
            reset2({ password: "" });
         }, 1000);
         return;
      };

      const user = auth.currentUser;
      const newPassword = data.passwordNew;
      const colRef = doc(database, "users", users.id);
      try {
         updatePassword(user, newPassword)
         await updateDoc(colRef, {
            password: data.passwordNew,
         });
         toast("Cập Nhật Thành Công", {
            type: "success",
         });
         reset2({
            password: "",
            passwordNew: "",
            passwordNewCheck: "",
         });
      } catch(error) {
         toast("Cập Nhật Thất Bại", {
            type: "error",
         });
      };
   };

   const onSelectImage = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      console.log();

      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed",
         (snapshot) => {
            // const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // eslint-disable-next-line default-case
            switch (snapshot.state) {
               case "paused":
                  console.log("Tải lên bị tạm dừng");
                  break
               case "running":
                  console.log("Tải lên đang chạy");
                  break
            };
         },
         (error) => {
            toast("Lỗi khi", {
               type: "error",
            });
            console.log(error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               console.log("Tập tin có sẵn tại", downloadURL);
               setImage(downloadURL);
               setValue("fileImg", downloadURL);
               setNameImg("images/" + file.name);
            });
         }
      );
   };

   const handleDeleteImage = async() => {
      if (!nameImg) return;
      const storage = getStorage();
      const desertRef = ref(storage, nameImg);
      // Xóa tệp
      deleteObject(desertRef).then(() => {
        // Đã xóa tệp thành công
        setImage("");
        setNameImg("");
        setValue("fileImg", "");
      }).catch((error) => {
        console.log("Lỗi: " + error);
      });
   };

   return (
      <>
         <PlayListSelector
            isMyPage={
               <button onClick={() => setChangePasswordPage((value) => !value)} className="font-medium text-[16px] flex justify-center items-center hover:opacity-70" type="button">
                  {changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
                  <span className="material-icons-outlined"> chevron_right </span>
               </button>
            }
            title={!changePasswordPage ? "Chỉnh Sửa Thông Tin" : "Đổi Mật Khẩu"}
         />
         <UpdateProfileStyled>
            {!changePasswordPage && (
               <div>
                  <form onSubmit={handleSubmit(onUpdateProfile)} name="UpdateProfile" className="w-full">
                     <label htmlFor="">Ảnh Đại Diện</label>
                     <div className="text-center mb-10">
                        <ImageUpload image={image} onChange={onSelectImage} handleDeleteImage={handleDeleteImage} className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"/>
                     </div>

                     <div className="form-group mb-[16px]">
                        <label htmlFor="email">Email</label>
                        <input disabled {...register("email")} type="email" className="form-control email" name="email" placeholder="Email" />
                     </div>

                     <div className="form-group">
                        <label htmlFor="email">Tên Hiển Thị</label>
                        <input {...register("name")} type="name" className="form-control name" name="name" placeholder="Name" />
                     </div>
                    
                     <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.name?.message}</div>

                     <button className="btn-login " type="submit">
                        {isSubmitting && "Loading"}
                        {!isSubmitting && "Cập Nhật"}
                     </button>
                  </form>
               </div>
            )}
            {changePasswordPage && (
               <div>
                  <form onSubmit={handleSubmit2(onChangePasswords)} name="UpdateProfile" className="w-full">
                     <div className="form-group mt-[10px] ">
                        <label htmlFor="password">Mật khẩu cũ</label>
                        <input
                           {...register2("password")}
                           type="password"
                           className="form-control password"
                           name="password"
                           placeholder="Mật khẩu cũ"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px]  px-[1rem] text-red-500">{error2?.password?.message}</div>

                     <div className="form-group mt-[16px]">
                        <label htmlFor="password">Mật khẩu Mới</label>
                        <input
                           {...register2("passwordNew")}
                           type="password"
                           className="form-control password"
                           name="passwordNew"
                           placeholder="Mật khẩu Mới"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px] px-[1rem] text-red-500">{error2?.passwordNew?.message}</div>

                     <div className="form-group mt-[16px]">
                        <label htmlFor="password">Nhập lại mật khẩu mới</label>
                        <input
                           {...register2("passwordNewCheck")}
                           type="password"
                           className="form-control password"
                           name="passwordNewCheck"
                           placeholder="Nhập lại mật khẩu mới"
                        />
                        <span className="fa fa-eye-slash pwd-toggle" />
                     </div>
                     <div className="mt-[6px] px-[1rem] text-red-500">{error2?.passwordNewCheck?.message}</div>

                     <button className="btn-login " type="submit">
                        {isSubmitting2 && "Loading"}
                        {!isSubmitting2 && "Cập Nhật"}
                     </button>
                  </form>
               </div>
            )}
         </UpdateProfileStyled>
      </>
   )
})

export default MyInfoPage;