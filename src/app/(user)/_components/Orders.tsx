import { callAPI } from "@/services";
import { Response } from "@/types/product.type";
import { TOrder } from "@/types/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getStatusMeaning } from "@/lib/statusMeaning";
import { format } from "date-fns";

const tableHeads = ["Id", "Date", "Invoice", "Status", "Amount", "Products"];
const Orders = async () => {
  const response = (await callAPI("/orders/users", "GET")) as Response<
    TOrder[]
  >;
  return (
    <Table>
      <TableHeader>
        <TableRow className="">
          {tableHeads.map((head, index) => (
            <TableHead key={index} className="text-lg font-bold">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {response?.data?.map((item, index) => {
          const status = Number(item?.status);
          return (
            <TableRow key={item?.order_id} className="text-base">
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {format(item?.order_placed_date, "dd-MM-yyyy 'at' hh:mm a")}
              </TableCell>
              <TableCell>{item?.invoice_code}</TableCell>
              <TableCell>{getStatusMeaning("orderStatus", status)}</TableCell>
              <TableCell>{item?.total_amount}</TableCell>
              <TableCell className="space-y-1">
                {item?.products?.map((product, index) => (
                  <p key={index}>
                    <Link
                      href={`/products/${product?.slug}`}
                      className="hover:text-primary"
                    >
                      {product?.name},
                    </Link>
                  </p>
                ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Orders;
