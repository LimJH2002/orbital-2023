import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function BankCard(props) {
  const [Link, setLink] = useState(false);

  return (
    <Card className="flex-row mx-20 mb-5 rounded-2xl">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 shrink-0 m-0 rounded-r-none"
      >
        <img
          src={props.img}
          alt={props.name + " logo"}
          className="scale-75 pt-10"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {props.name}
        </Typography>
        <Typography color="gray" className="font-normal mb-8">
          Supported Functionality:
          <br />
          View Transactions, Label Transactions.
        </Typography>
        <a href={props.redirect} target="_blank" className="inline-block">
          <button
            type="button"
            onClick={()=>setLink(prev => !prev)}
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {Link ? "Unlink" : "Link Bank"}
          </button>
        </a>
      </CardBody>
    </Card>
  );
}
