import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "POST",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list",
    params: { snippetCount: "27" },
    headers: {
      "content-type": "text/plain",
      "X-RapidAPI-Key": "93909041a2msh87572216c7286b8p1c54b7jsna41785edf865",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
    data: "",
  };

  let ActualPosts = undefined;

  try {
    const response = await axios.request(options);
    // console.log(response.data.data.main.stream);
    ActualPosts = response.data.data.main.stream;
  } catch (error) {
    console.error(error);
  }

  const Res = ActualPosts.map((news) => ({
    id: news.id,
    title: news.content.title,
    date: news.content.pubDate.substring(0, 10),
    datetime: news.content.pubDate,
    href:
      news.content.previewUrl !== null
        ? news.content.previewUrl
        : news.content.clickThroughUrl.url,
    imageUrl:
      news.content.thumbnail == undefined
        ? "https://s.yimg.com/ny/api/res/1.2/WZPUwNQc9NaXkNltlrghSQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtjZj13ZWJw/https://s.yimg.com/uc/fin/img/non-sub-report-thumb.png"
        : news.content.thumbnail.resolutions[0].url,
    author: {
      name: news.content.provider.displayName,
    },
  }));

  res.json(Res);
}
