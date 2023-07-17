import SortingDate from "@/functions/Sorting";
import { useState, useEffect } from "react";
import Loading from "../loading";
import NewsItem from "@/components/news-item";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

export default function NewsBlog() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading && loading) return <Loading />;
  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  if (!data) return <Loading />;
  
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Here comes the tea
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Keep in touch with the latest news.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {SortingDate(data).map((post) => (
            <NewsItem post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(News), { ssr: false });
