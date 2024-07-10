"use client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignUpPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleClickSignup = async () => {
    if (!email || !password) return alert("전자우편, 비밀번호 모두를 기입해 주세요.");

    const data = { email, password };

    const response = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      alert("맴바등록이 완료되었습니다.");
      router.push("/login");
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me").then(async (response) => {
      if (response.status === 200) {
        const {
          data: { user }
        } = await response.json();
        setUser(user);
        console.log(user);
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="rounded-3xl w-full max-w-lg h-[550px] border-4 border-dark-red shadow-2xl flex flex-col gap-5 items-center justify-center">
        <h2 className="text-4xl font-bold mb-8 text-center ">멤 바 등 록</h2>
        <div className="mb-6 space-y-6">
          <div className="flex items-center space-x-6 w-[380px]">
            <label className="bg-coral text-white px-4 py-2 rounded-full whitespace-nowrap">접 속 이 름</label>
            <input
              type="text"
              className="bg-beige text-center flex-grow border-b-2 border-black focus:outline-none"
              placeholder="전 자 우 편 주 소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-6">
            <label className="bg-coral text-white px-4 py-2 rounded-full whitespace-nowrap">비 밀 번 호</label>
            <input
              type="password"
              className="bg-beige text-center flex-grow border-b-2 border-black focus:outline-none"
              placeholder="비 밀 번 호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleClickSignup}
            className="w-[380px] text-lg bg-green text-white py-2 rounded-full hover:bg-hover-green transition duration-300"
          >
            멤 바 등 록 하 기
          </button>
          <button className="flex justify-center gap-2 w-[380px] text-lg bg-yellow py-2 rounded-full hover:bg-hover-green transition duration-300">
            <Image src="/images/kakaologo.png" alt="카카로 로고" width={36} height={36} />
            <span>까 까 오 대 화 로ㅤ 등 록 하 기</span>
          </button>
          <Link
            href={"/login"}
            className="w-[380px] text-center text-lg bg-green text-white py-2 rounded-full hover:bg-hover-green transition duration-300"
          >
            뒤 로 가 기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
