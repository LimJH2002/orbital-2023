import axios from "axios";

export function Posts({ value }) {
  return <div>{console.log(value)}</div>;
}

const options = {
  method: "POST",
  url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list",
  params: { snippetCount: "27" },
  headers: {
    "content-type": "text/plain",
    "X-RapidAPI-Key": "93909041a2msh87572216c7286b8p1c54b7jsna41785edf865",
    "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
  data: "Pass in the value of uuids field returned right in this endpoint to load the next page, or leave empty to load first page",
};

let ActualPosts = undefined;

try {
  const response = await axios.request(options);
  console.log(response.data.data.main.stream);
  ActualPosts = response.data.data.main.stream;
} catch (error) {
  console.error(error);
}

export const Res = ActualPosts.map((news) => ({
  id: news.id,
  title: news.content.title,
  date: news.content.pubDate.substring(0, 10),
  datetime: news.content.pubDate,
  href: news.content.previewUrl,
  imageUrl: news.content.thumbnail.resolutions[0].url,
  author: {
    name: news.content.provider.displayName,
  },
}));
