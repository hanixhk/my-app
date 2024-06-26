/* eslint-disable @next/next/no-img-element */
'use client';

import Image from "next/image";
import Link from "next/link";
import { signIn ,useSession,signOut} from "next-auth/react";
import Modal from 'react-modal';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";
import { HiCamera } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { app } from '../firebase';
import { useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
export default function Header() {
  const {data:session} = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [imagefileurl,setimagefileurl] = useState(null);
  const [selectedfile,setselectedfile] = useState(null);
  const [imageFileUploading,setimageFileUploading] = useState(false)
  const filePickerRef = useRef(null);
  

  function addImageToPost(e) {
    const file = e.target.files[0];
    if (file){
      setimagefileurl(URL.createObjectURL(file));
      setselectedfile(file);
      console.log(imagefileurl)
    }
  }
  async function UploadImageToStorage(){
    setimageFileUploading(true);
    const storage =getStorage(app)
    const fileName = new Date().getTime() + selectedfile.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        
      },
    (error)=>{
      console.log(error)
      setimageFileUploading(false);
      setimagefileurl(null);
      setselectedfile(null);

    }
    ,
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        // console.log("File available at", downloadURL);
        setimagefileurl(downloadURL);
        setimageFileUploading(false);
      });
    }
    )
    }
  useEffect(() => {
    if (selectedfile){
      UploadImageToStorage()
    } }, [selectedfile])
    
  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
        <div className=" flex justify-between items-center max-w-6xl mx-auto">
       {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <Image 
          className="cursor-pointer"
          src="/ig_logo.webp"
          width={96}
          height={96}
          alt="logo"
          />
        </Link>         

        <Link href="/" className="lg:hidden ">
          <Image 
          className="cursor-pointer"
          src="/ig.webp"
          width={40} 
          height={40}
          alt="logo"

          />
        </Link>  

        {/* search box */}
        <input type="text" placeholder="Search" className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]" />

            {/* menu items*/}
            {session ? (
              // eslint-disable-next-line react/jsx-no-comment-textnodes
              <div className="flex gap-2 items-center">
            <IoMdAddCircleOutline 
              className="text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:bg-red-600"
              onClick={() => setIsOpen(true)}
              />
              
              <img src={session.user.image} 
              alt={session.user.name} 
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
              />
              </div>
            ) : (
            <button 
            onClick={signIn} className="text-sm font-semibold text-blue-500">
              Log in 
              </button>
          )}
         </div>
         {
          isOpen && (
            <Modal 
            isOpen={isOpen} 
            className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md'
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
            >
              <div className='flex flex-col justify-center items-center h-[100%]'>
              {selectedfile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imagefileurl}
                alt='selected file'
                className={`w-full max-h-[250px] object-over cursor-pointer ${
                  imageFileUploading ? 'animate-pulse' : ''
                }`}
              />
            ) : (
              <HiCamera
                onClick={() => filePickerRef.current.click()}
                className='text-5xl text-gray-400 cursor-pointer'
              />
            )}
              <input hidden ref={filePickerRef} type="file" accept="image/*" onChange={addImageToPost} />
              </div>
              <input 
              type="text" 
              maxLength="150"
              placeholder="please enter your caption"
              className="m-4 border-none text-center w-full focuse:ring-0 outline-none"
              />
              <button disabled className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100">Upload Post</button>
              <AiOutlineClose 
              className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300 "
              onClick={()=> isOpen(false)}
              />
              
              </Modal>
      )}
    </div>
  );
}