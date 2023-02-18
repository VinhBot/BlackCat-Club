import { database, arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "../asset/firebase/firebase-config"
import { useCallback, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// // Usage

// function App() {
//    const size = useWindowSize()
//    return (
//       <div>
//          {size.width}px / {size.height}px
//       </div>
//    )
// }

// Hook
function useWindowSize() {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   });
   useMemo(() => {
      function handleResize() {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
   }, [])
   return windowSize;
};
//==============================================================================
// function App() {
//
//    const [isTextChanged, setIsTextChanged] = useToggle()
//    return <button onClick={setIsTextChanged}>{isTextChanged ? "Toggled" : "Click to Toggle"}</button>
// }
// Hook
// Parameter is the boolean, with default "false" value

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
};
 
//==============================================================================
const useLikeHook = (item, type) => {
   const { id, activeUser } = useSelector((state) => state.users);
   const [isLike, setLike] = useState(false);
   const [docs, setDocs] = useState([]);
   useMemo(() => {
      if (activeUser) {
         const colRef = doc(database, "users", id);
         getDoc(colRef).then(async(doc) => {
            if (!doc) return
            let likeSelector
            if (type === 1) {
               likeSelector = doc.data().favouritePlaylist.find((e) => e?.encodeId === item?.encodeId)
            }
            if (type === 2) {
               likeSelector = doc.data().favouriteSongs.find((e) => e?.encodeId === item?.encodeId)
            }
            if (type === 3) {
               likeSelector = doc.data().favouriteArtist.find((e) => e?.id === item?.id)
            }
            setDocs(doc.data())
            let like = await likeSelector
            if (like) {
               setLike(() => true)
            } else {
               setLike(() => false)
            }
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [item])

   const handleLike = () => {
      if (!activeUser) {
         return toast("Bạn cần phải đăng nhập", {
            type: "info",
         })
      }

      if (activeUser) {
         // add
         if (!isLike) {
            const updateLike = async () => {
               const colRef = doc(database, "users", id);
               if (type === 1) {
                  updateDoc(colRef, {
                     favouritePlaylist: arrayUnion(item),
                  });
               };
               if (type === 2) {
                  updateDoc(colRef, {
                     favouriteSongs: arrayUnion(item),
                  });
               };
               if (type === 3) {
                  updateDoc(colRef, {
                     favouriteArtist: arrayUnion(item),
                  });
               };

               try {
                  toast("Thêm vào thư viện thành công", { type: "success" });
                  setLike(true)
               } catch (error) {
                  console.log(error)
                  toast("Lỗi thêm vào thư viện không thành công", { type: "error" });
               };
            };
            updateLike();
         };
         //  remove
         if (isLike) {
            const updateLike = async() => {
               setLike(true);
               const colRef = doc(database, "users", id);
               if (type === 1) {
                  updateDoc(colRef, {
                     favouritePlaylist: arrayRemove(item),
                  });
               };
               if (type === 2) {
                  updateDoc(colRef, {
                     favouriteSongs: arrayRemove(item),
                  });
               };
               if (type === 3) {
                  updateDoc(colRef, {
                    favouriteArtist: arrayRemove(docs.favouriteArtist.find((e) => {
                       return e.id === item.id;
                    })),
                  });
               };

               try {
                  toast("Xóa khỏi thư viện thành công", { type: "info" });
                  setLike(false);
               } catch (error) {
                  console.log(error);
                  toast("Lỗi xóa khỏi thư viện", { type: "error" });
               };
            };
            updateLike();
         }
      }
   }
   return { isLike, handleLike }
};
//==============================================================================
export { useToggle, useWindowSize, useLikeHook };