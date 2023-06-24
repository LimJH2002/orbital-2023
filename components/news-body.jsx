import { React, useState, useEffect } from "react";
import Loading from "@/pages/loading";
import { Text } from "@nextui-org/react";

const NewsBody = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news-content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.post.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);


  if (isLoading) return <Loading />;
  if (!data) return <Loading />;
  // console.log(data);

  return (
    <div
      id="modal-description"
      dangerouslySetInnerHTML={{ __html: data.markup }}
    />
  );
};

export default NewsBody;
