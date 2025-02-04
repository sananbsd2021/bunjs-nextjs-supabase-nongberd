import Hero from "@/components/hero";
// import MenuListPage from "@/components/leftMenulist";
import NewsListsPage from "./news/NewsListPage";
// import GalleriesListPage from "./gallerys/page";
import EnewsShowListPage from "./enews/EnewsShowListPage";
import GalleriesListCardPage from "./gallerys/GalleryCard";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-2 px-2 w-[800]">
        {/* <div className="flex h-screen"> */}
          {/* ด้านซ้าย 1 ส่วน */}
          {/* <div className="hidden md:flex flex-1 p-4"> */}
            {/* <h1 className="text-lg font-bold">ด้านซ้าย</h1>
            <p>เนื้อหาในส่วนซ้าย</p> */}
            {/* <MenuListPage />
          </div> */}
          {/* ด้านขวา 3 ส่วน */}
          {/* <div className="flex-3 w-3/4"> */}
            {/* <h1 className="text-lg font-bold">ด้านขวา</h1>
            <p>เนื้อหาในส่วนขวา</p> */}
            {/* <GalleriesListPage /> */}
            <GalleriesListCardPage />
            <NewsListsPage />
            <EnewsShowListPage />
          {/* </div> */}
        {/* </div> */}
      </main>
    </>
  );
}
