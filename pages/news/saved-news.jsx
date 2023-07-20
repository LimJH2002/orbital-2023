import SortingDate from "@/functions/Sorting";
import { useState, useEffect } from "react";
import Loading from "../loading";
import NewsItem from "@/components/news-item";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Notification from "@/components/ui/notification";
import { useAuth } from "@/context/AuthContext";
import { TbNewsOff } from "react-icons/tb";

export default function SavedNews(props) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const auth = getAuth();
  const { currentUser } = useAuth();
  // const uid = currentUser.uid;

  const [user, loading] = useAuthState(auth);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUid(currentUser.uid);
      console.log(uid);
    }
  }, [currentUser]);

  useEffect(() => {
    if (uid) {
      console.log(uid);
      fetch("/api/savedNews?userId=" + uid)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [uid]);

  if (isLoading && loading) return <Loading />;
  if (!user) {
    router.push("/login");
    return <div>Please sign in to continue</div>;
  }

  if (!data) return <Loading />;

  return (
    <div className="pb-20 px-20">
      <Notification show={show} setShow={setShow} />
      {data.length === 0 ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => props.setFunc("1")}
            className="w-full text-white border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <TbNewsOff className="mx-auto h-12 w-12" />
            <span className="mt-2 block text-sm font-medium">
              Go save some news!
            </span>
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Here comes your saved teas
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-300">
              Keep track of what you're interested in!
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {SortingDate(data).map((post) => (
              <NewsItem
                post={post}
                key={post.id}
                show={show}
                setShow={setShow}
                save={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// export default dynamic(() => Promise.resolve(News), { ssr: false });
