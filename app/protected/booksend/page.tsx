import BookReListPage from "./BookReListPage";
import RealtimeStatisticsPage from "./BookSendChart";
import PostsFormNews from "./PostPage";

export default function HomePage() {    
    return (
        <div>
            <PostsFormNews />
            <BookReListPage />
            <RealtimeStatisticsPage />
        </div>
    )
}