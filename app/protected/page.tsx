// import { createClient } from "@/utils/supabase/server";
// import { redirect } from "next/navigation";
// import ControlPanalPage from "./Ccontolpanal";

// export default async function ProtectedPage() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect("/sign-in");
//   }

//   return (
//     <div className="flex-1 w-full flex flex-col gap-12">
//       {/* {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />} */}
//       <h1 className="text-5xl text-bold text-center">ระบบจัดการข้อมูล</h1>
//       <ControlPanalPage />
//     </div>
//   );
// }

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ControlPanalPage from "./Ccontolpanal";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

// export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-2 px-2 w-full">
        <div className="flex h-screen">
          {/* ด้านซ้าย 1 ส่วน */}
          <div className="hidden md:flex flex-1 w-64 p-4">
            {/* <h1 className="text-lg font-bold">ด้านซ้าย</h1>
            <p>เนื้อหาในส่วนซ้าย</p> */}
          </div>
          {/* ด้านขวา 3 ส่วน */}
          <div className="flex-3 w-3/4">
            {/* <h1 className="text-lg font-bold">ด้านขวา</h1>
            <p>เนื้อหาในส่วนขวา</p> */}
            <h1 className="text-5xl text-bold text-center">ระบบจัดการข้อมูล</h1>
            <ControlPanalPage />
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            {/* <h1>ระบบจัดการข้อมูล</h1> */}
          </div>
        </div>
      </main>
    </>
  );
}
