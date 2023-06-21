import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const options = {
      method: "POST",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list",
      params: { snippetCount: "28" },
      headers: {
        "content-type": "text/plain",
        "X-RapidAPI-Key": "93909041a2msh87572216c7286b8p1c54b7jsna41785edf865",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
      data: "",
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(400);
  }
}
