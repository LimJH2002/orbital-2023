import axios from "axios";

export default async function handler(req, res) {
  const options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details",
    params: {
      uuid: "cced11ee-ce3d-3e5b-b1c3-084aba40f97e",
    },
    headers: {
      "X-RapidAPI-Key": "e57eff008cmshd63308d6a50126fp1f93dfjsnbc0c625a6908",
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  let actual = undefined;

  try {
    const response = await axios.request(options);
    console.log(response.data.data.contents[0].content.body.markup);
    actual = response.data.data.contents[0].content.body.markup;
  } catch (error) {
    console.error(error);
  }

  res.json({ markup: actual });
}
