/*================== npm package ==========================*/
import { auth, database, setDoc, doc, serverTimestamp,  /*onAuthStateChanged,*/ signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "../asset/firebase/firebase-config";
import { setUser } from "../features/User/userFeatures";
import React, { useState, memo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
/*========================================================*/
const SignUpStyles = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   width: 100vw;
   height: 100vh;
   background-color: var(--layout-bg);
   z-index: 8888;
   transition: all 0.3s;
   overflow-y: auto;
   .sider {
      margin-bottom: 2rem;
      .sider_brand-item {
         font-size: 4rem;
         display: flex;
         align-items: center;
         justify-content: center;
         font-family: "Patrick Hand SC", cursive;
         transition: 0.2s ease-in;
         p {
            font-size: 4rem;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            font-family: "Patrick Hand SC", cursive;
            transition: 0.2s ease-in;
         }
         &:hover {
            opacity: 0.8;
            cursor: pointer;
         }
         span {
            font-size: 3rem;
            margin-left: 6px;
            font-family: "Patrick Hand SC", cursive;
         }
         .sider_brand-item-img {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
               max-height: 42px;
               filter: grayscale(100%);
               margin-right: 10px;
            }
         }
      }
   }
   .authForm {
      position: relative;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      align-items: stretch;
      -webkit-box-shadow: 0px 2px 6px 0px #1d2030;
      box-shadow: 0px 2px 6px 0px #1d2030;
      .left {
         background-color: rgb(12 14 33 / 92%);
         color: #ffffff;
         border-top-left-radius: 4px;
         border-bottom-left-radius: 4px;
         padding-top: 30px;
         padding-bottom: 40px;
         padding-right: 30px;
         padding-left: 30px;
      }

      .right {
         padding-top: 30px;
         padding-bottom: 40px;
         padding-right: 30px;
         padding-left: 30px;
         background-color: #ffffff;
         border-top-right-radius: 4px;
         border-bottom-right-radius: 4px;
         color: #2d385e;
         .text-header {
            font-size: 20px;
            font-weight: 500;
            &.active {
               font-size: 30px;
               font-weight: 700;
            }
         }
      }

      .btnAuth {
         padding: 8px 8px;
         width: 100%;
         border: 1px solid transparent;
         border-radius: 4px;
         transition: all 0.2s;
         &:hover {
            opacity: 0.8;
         }
      }
   }
   .form-control {
      background-color: #fff;
      width: 100%;
      color: #333333;
      font-size: 18px;
      height: 50px;
      margin-top: 16px;
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
   @media (max-width: 719px) {
      .left,
      .right {
         padding-top: 2rem !important;
         padding-bottom: 2rem !important;
      }

      .left {
         flex-direction: column !important;
      }
      .sider {
         margin-bottom: 1rem;
      }
   }
`
/*========================================================
# Biểu mẫu đăng nhập
========================================================*/
const SignInForm = memo(({ setSign }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit, reset, setFocus, formState: { errors }} = useForm({ 
     resolver: yupResolver(yup.object({
       email: yup.string().required("Vui lòng nhập tài khoản vào ô này").max(40, "Email bạn nhập quá dài").email("Biểu mẫu email được cung cấp không dúng định dạng"),
       password: yup.string().required("Vui lòng nhập mật khẩu vào ô này").max(30, "Độ dài mật khẩu không quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
     })), 
     mode: "onChange"
   });
   useEffect(() => {
      setFocus("email");
   }, [setFocus]);
   // useEffect(() => {
   //    onAuthStateChanged(auth, (user) => {
   //       console.log(user)
   //    });
   // }, []);
   const onSubmitLogin = (data) => {
      signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
        setTimeout(() => reset({ 
          email: "",
          password: "" 
        }), 1000);
        dispatch(setUser({
          displayName: userCredential.user.displayName,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
        toast("Đăng Nhập Thành Công, Chúc bạn có giây phút nghe nhạc vui vẻ 😍", {
          type: "success",
        });
        setTimeout(() => navigate("/"), 700);
      }).catch((error) => {
        console.log(error);
        toast("Đăng Nhập không thành công, Tài Khoản hoặc Mật Khẩu không chính xác 🥲", {
          type: "error",
        });
        setTimeout(() => reset({ 
          password: ""
        }), 1000);
      });
   };
   return (
      <div>
         <form onSubmit={handleSubmit(onSubmitLogin)} name="loginForm" className="loginForm w-full">
            {/* Tài Khoản */}
            <div className="form-group">
               <input {...register("email")} type="email" className="form-control email" name="email" placeholder="Email " />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.email?.message}</div>
           {/* Mật Khẩu */}
            <div className="form-group">
               <input {...register("password")} type="password" className="form-control password" name="password" placeholder="Password" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.password?.message}</div>
            <button className="btn-login " type="submit">
               Đăng Nhập
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn chưa có tài khoản?</div>
            <button onClick={() => setSign(false)} className="underline text-blue-600">
              Đăng ký{" "}
            </button>
         </div>
      </div>
   );
});
/*========================================================
# Biểu mẫu đăng ký
========================================================*/
const SignUpForm = ({ setSign }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { register, handleSubmit, reset, setFocus, formState: { errors, isSubmitting }} = useForm({
     resolver: yupResolver(yup.object({
       email: yup.string().required("Vui lòng nhập email vào ô này").max(40, "Email bạn nhập quá 40 kí tự").email("Biểu mẫu email được cung cấp không dúng định dạng"),
       password: yup.string().required("Vui lòng nhập mật khẩu vào ô này").max(30, "Độ dài mật khẩu không quá 30 kí tự").min(6, "Độ dài tối thiểu 6 ký tự"),
       passwordCheck: yup.string().required("Vui lòng nhập lại mật khẩu vào ô này").oneOf([yup.ref("password"), null], "Mật khẩu bạn nhập lại không khớp với mật khẩu trước đó"),
       name: yup.string().required("Vui lòng nhập tên vào ô này").max(30, "Tên của bạn quá dài").min(5, "Tên không thể ngắn quá 5 kí tự"),
     })),
     mode: "onChange",
   });
   const onSubmit = async(data) => {
      createUserWithEmailAndPassword(auth, data.email, data.password).then(async(userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: data.name,
        });
        await setDoc(doc(database, "users", userCredential.user.uid), {
          email: data.email,
          password: data.password,
          name: data.name,
          id: userCredential.user.uid,
          favouriteSongs: [],
          favouritePlaylist: [],
          favouriteArtist: [],
          timestamp: serverTimestamp(),
        });
        dispatch(setUser({
          displayName: data.name,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        }));
        setTimeout(() => {
          reset({ 
            email: "",
            password: "",
            passwordCheck: "",
            name: ""
          });
        }, 1000);
        toast("Đăng ký Thành Công", {
          type: "success",
        });
        setTimeout(() => navigate("/"), 1000);
      }).catch((error) => {
        console.log(error);
        return toast("Đăng ký Không Thành Công ", {
          type: "error",
        });
      });
   };
   useEffect(() => {
      setFocus("email");
   }, [setFocus]);

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)} name="loginForm" className="loginForm w-full">
            <div className="form-group">
               <input {...register("email")} type="email" className="form-control email" name="email" placeholder="Email " />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.email?.message}</div>

            <div className="form-group">
               <input {...register("password")} type="password" className="form-control password" name="password" placeholder="Mật khẩu"/>
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.password?.message}</div>

            <div className="form-group">
               <input {...register("passwordCheck")} type="password" className="form-control password" name="passwordCheck" placeholder="Nhập lại mật khẩu"/>
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.passwordCheck?.message}</div>

            <div className="form-group">
               <input {...register("name")} type="text" className="form-control " name="name" placeholder="Tên hiển thị" />
               <span className="fa fa-eye-slash pwd-toggle" />
            </div>
            <div className="mt-[6px]  px-[1rem] text-red-500">{errors?.name?.message}</div>

            <button disabled={isSubmitting} className="btn-login " type="submit">
               {isSubmitting ? "Loading..." : "Đăng Ký"}
            </button>
         </form>
         <div className="flex items-center justify-between mt-[20px]">
            <div>Bạn đã có tài khoản?</div>
            <button onClick={() => setSign(true)} className="underline text-blue-600">
               Đăng Nhập{" "}
            </button>
         </div>
      </div>
   );
};
/*========================================================
# AuthenticationPage
========================================================*/
const AuthenticationPage = () => {
   const [sign, setSign] = useState(true);
   const clickerErr = () => toast("Xin lỗi hiện tại phương thức đăng nhập này đang được phát triển", {          
     type: "error",        
   });
   return (
      <SignUpStyles>
         <div className="gird wide">
            <div className="flex w-full h-[100vh] items-center justify-center">
               <div className=" mb-[5rem] l-8 m-10 c-12">
                  <div className="row !flex-wrap authForm">
                     <div className="col l-5 m-5 c-12   left flex items-center justify-center ">
                        <div className="sider">
                           <div className="sider_brand-item">
                              <div className="sider_brand-item-img">
                                 <img src="/avatarMain.png" alt="logo" />
                              </div>
                              <p className="sider_brand-item-text">
                                 BlackCat-Club
                              </p>
                           </div>
                        </div>

                        <div className="text-center mb-[2rem]  font-semibold">Đăng nhập bằng mạng xã hội để truy cập nhanh</div>
                        <div className="flex flex-col justify-start items-center gap-[16px]">
                           <button onClick={clickerErr} className="btnAuth bg-[#3b5998]">Tiếp tục với Facebook</button>
                        </div>
                       
                     </div>
                     <div className="col l-7 m-7 c-12 right">
                        <div className="flex  items-baseline justify-center ">
                           <div className="text-header active">{sign ? "Đăng Nhập" : "Đăng Ký"}</div>
                        </div>
                        {sign ? <SignInForm setSign={setSign}/> : <SignUpForm setSign={setSign}/>}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </SignUpStyles>
   );
};

export default AuthenticationPage;