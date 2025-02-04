import BookBidListPage from "../bookbidding/BookReListPage";
import BookReListPage from "../bookre/BookReListPage";
import BookSendListPage from "../booksend/BookReListPage";

export default function Home() {
  return (
    <div>
      <BookReListPage />
      <BookSendListPage />
      <BookBidListPage />
    </div>
  );
}
