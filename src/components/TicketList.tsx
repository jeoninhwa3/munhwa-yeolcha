"use client";
import useAuthStore from "@/zustand/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TicketList = () => {
  const router = useRouter();
  const { provider } = useAuthStore();
  const [flagProvider, setFlagProvider] = useState<string>(provider);

  useEffect(() => {
    if (!provider) {
      fetch("http://localhost:3000/api/auth/me").then(async (response) => {
        if (response.status === 200) {
          const {
            data: { user }
          } = await response.json();
          // console.log("유저정보", user);
          setFlagProvider(user.app_metadata.provider);
        }
      });
    }
  }, []);

  const handleDeleteAccount = async () => {
    if (!confirm("정말 회원탈퇴를 하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        alert("회원탈퇴 되었습니다.");
        router.push("/");
      } else {
        const { message } = await response.json();
        alert(`회원탈퇴 실패: ${message}`);
      }
    } catch (error) {
      alert("회원탈퇴 도중 에러가 생겼습니다.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[600px] w-[100%]">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-center">
            <Link
              href={"/mypage/ticket"}
              className=" bg-[white] p-3 rounded-lg w-40 mb-1 font-bold text-green text-center"
            >
              예약 내역
            </Link>
            {flagProvider !== "" && flagProvider !== "kakao" ? (
              <Link
                href={"/mypage/edit"}
                className="border bg-green p-3 rounded-lg w-40 mb-1 font-bold text-[white] text-center"
              >
                회원정보 수정
              </Link>
            ) : null}
            <button
              onClick={handleDeleteAccount}
              className="border bg-green p-3 rounded-lg w-40 font-bold text-[white]"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketList;
