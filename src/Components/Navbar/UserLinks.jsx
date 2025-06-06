import { Avatar } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLinks = () => {
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Ẩn modal nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        <div className="mx-4 flex items-center">
          <>
            <Avatar
              src={userLogin?.profilepic || "/images/avatar/avatar-0.png"}
              alt={"avatar " + userLogin?.name}
                className="border-2"
            />
            <span className="ml-2 capitalize">{userLogin?.name}</span>
          </>
        </div>
      </div>

      {showModal && (
        <div
          ref={modalRef}
          className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-50"
        >
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
