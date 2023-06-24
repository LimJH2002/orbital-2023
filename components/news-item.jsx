import React, { Fragment } from "react";
import { useModal } from "@nextui-org/react";
import NewsModal from "@/components/ui/news-modal";

export const NewsItem = ({ post }) => {
  const { visible, setVisible, bindings } = useModal();

  return (
    <Fragment>
      <button
        onClick={() => setVisible(true)}
        className="flex flex-col items-start bg-gray-800 rounded-2xl"
      >
        <article>
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
            </div>
            <div className="group relative mx-2">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-300 group-hover:text-gray-500">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
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
      <NewsModal
        visible={visible}
        setVisible={setVisible}
        bindings={bindings}
        id={post.id}
      />
    </Fragment>
  );
};

export default NewsItem;
