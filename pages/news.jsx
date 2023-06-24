import { Res } from "@/data/news-posts";
import SortingDate from "@/functions/Sorting";
import dynamic from "next/dynamic";
import { Posts } from "@/data/news-posts";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import NewsModal from "@/components/ui/news-modal";

function News() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Here comes the tea
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">
            Keep in touch with the latest news.
          </p>
        </div>

        {/* <Posts /> */}
        {/* {console.log(Res)} */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {SortingDate(Posts).map((post) => {
            const { setVisible, bindings } = useModal();

            return (
              <button onClick={() => setVisible(true)}>
                <NewsModal
                  setVisible={setVisible}
                  bindings={bindings}
                  id={post.id}
                />
                <article
                  key={post.id}
                  className="flex flex-col items-start bg-gray-800 rounded-2xl"
                >
                  <div className="relative w-full">
                    <img
                      src={post.imageUrl}
                      alt="Thumbnail"
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-300 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs mx-2">
                      <time dateTime={post.datetime} className="text-gray-300">
                        {post.date}
                      </time>
                      {/* <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
                    </div>
                    <div className="group relative mx-2">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-300 group-hover:text-gray-500">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      {/* <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">
                    {post.description}
                  </p> */}
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4 mx-2 my-2">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-white">
                          <a>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(News), { ssr: false });
