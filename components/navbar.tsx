"use client";

import React, { useState, useRef, useEffect } from "react";
import { AiFillForward } from "react-icons/ai";
import { usePathname } from "next/navigation";

const NavbarPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const dropdownRef1 = useRef<HTMLDivElement>(null);
  const dropdownRef2 = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target as Node)) {
        setDropdownOpen1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center w-full h-16 px-8 bg-gray-100 shadow-md">
      <div className="text-xl font-bold tracking-wider text-blue-900">
        NONGBERD SCHOOL
      </div>

      <div className="hidden md:flex items-center space-x-6">
        <a
          href="/"
          className={`text-lg font-medium ${
            pathname === "/" ? "text-black font-bold" : "text-blue-600"
          } hover:text-black transition`}
        >
          หน้าหลัก
        </a>

        {/* ข้อมูลโรงเรียน Dropdown */}
        <div ref={dropdownRef1} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-lg font-medium text-blue-600 hover:text-black flex items-center gap-2 transition"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            ข้อมูลโรงเรียน
            <svg
              className={`w-5 h-5 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50" role="menu">
              {["ตราสัญลักษณ์", "คำขวัญ", "วิสัยทัศน์"].map((item, index) => (
                <a key={index} href="#" className="text-lg px-4 py-2 font-medium text-blue-600 hover:text-black flex items-center gap-2 transition">
                  <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* สารสนเทศ Dropdown */}
        <div ref={dropdownRef2} className="relative">
          <button
            onClick={() => setDropdownOpen1(!dropdownOpen1)}
            className="text-lg font-medium text-blue-600 hover:text-black flex items-center gap-2 transition"
            aria-expanded={dropdownOpen1}
            aria-haspopup="true"
          >
            สารสนเทศ
            <svg
              className={`w-5 h-5 transform transition-transform ${dropdownOpen1 ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen1 && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50" role="menu">
              {["สารสนเทศ", "แบบฟอร์ม", "วารสาร"].map((item, index) => (
                <a key={index} href="#" className="text-lg px-4 py-2 font-medium text-blue-600 hover:text-black flex items-center gap-2 transition">
                  <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>

        <a
          href="/personal2"
          className={`text-lg font-medium ${
            pathname === "/personal2" ? "text-black font-bold" : "text-blue-600"
          } hover:text-black transition`}
        >
          บุคลากร
        </a>
        <a
          href="/about"
          className={`text-lg font-medium ${
            pathname === "/about" ? "text-black font-bold" : "text-blue-600"
          } hover:text-black transition`}
        >
          คลังข้อสอบ
        </a>
      </div>
    </nav>
  );
};

export default NavbarPage;
