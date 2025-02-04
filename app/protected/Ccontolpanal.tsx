import React from "react";
import { AiFillForward } from "react-icons/ai";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const ControlPanalPage = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-6">
      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/newslists">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข่าวประชาสัมพันธ์
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการข่าวประชาสัมพันธ์
        </p>
        <a
          href="/protected/newslists"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อข่าว
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/Cpanal/gallerys">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ภาพกิจกรรม
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการภาพกิจกรรม
        </p>
        <a
          href="/protected/gallerys"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มภาพกิจกรรม
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/news">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข่าวสาร
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการข่าวสาร
        </p>
        <a
          href="/protected/news"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข่าวสาร
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/enews">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ข่าวการศึกษา
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการการศึกษา
        </p>
        <a
          href="/protected/enews"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข่าวการศึกษา
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/commands">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            บุคลากร
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการบุคลากร
        </p>
        <a
          href="/protected/commands"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มบุคลากร
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/posts">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            โพสต์
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการโพสต์
        </p>
        <a
          href="/protected/posts"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มโพสต์
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/bookbidding">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ทะเบียนคำสั่ง
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการทะเบียนคำสั่ง
        </p>
        <a
          href="/protected/bookbidding"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มคำสั่ง
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/bookre">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ทะเบียนหนังสือรับ
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการทะเบียนหนังสือรับ
        </p>
        <a
          href="/protected/bookre"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มหนังสือรับ
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>

      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/booksend">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ทะเบียนหนังสือส่ง
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการหนังสือส่ง
        </p>
        <a
          href="/protected/booksend"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มหนังสือส่ง
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      <div className="w-[300px] max-w-sm h-4/12 w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="/protected/students">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ข้อมูลนักเรียน
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          จัดการข้อมูลนักเรียน
        </p>
        <a
          href="/protected/students"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          เพิ่มข้อมูลนักเรียน
          <AiFillForward className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
        </a>
      </div>


      {/* <div className="items-center">
      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div> */}
    </div>
  );
};

export default ControlPanalPage;
