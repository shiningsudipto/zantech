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

const tableHeads = ["Id", "Date", "Invoice", "Status", "Amount", "Products"];

const page = async () => {
  const response = (await callAPI("/orders/users", "GET")) as Response<
    TOrder[]
  >;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
      </div>
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
                <TableCell>{item?.order_placed_date}</TableCell>
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
    </div>
  );
};

export default page;
