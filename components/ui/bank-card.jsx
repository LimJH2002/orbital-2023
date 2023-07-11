import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function BankCard(props) {
  return (
    <Card className="flex-row mx-20 mb-5">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-1/4 shrink-0 m-0 rounded-r-none"
      >
        <img
          src={props.img}
          alt={props.name + " logo"}
          className="h-auto scale-75"
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
        <a href="#" className="inline-block">
          <button
            type="button"
            className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Link Bank
          </button>
        </a>
      </CardBody>
    </Card>
  );
}
