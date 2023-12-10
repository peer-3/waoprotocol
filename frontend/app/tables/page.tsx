import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";
import axios from "axios";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = async () => {
  const {data: brandD} = await axios.get('http://localhost:3001/api/gql')
  console.log(brandD)
  const { snapshotCreateds: data } = brandD.data;
  // // map data to brand
  // const brandData = data.map((brand: any) => ({
  //   name: brand.owner,
  //   logo: brand?.logo,
  //   visitors: brand.price,
  //   revenues: brand.revenues,
  //   sales: brand.isPrivate,
  //   conversion: brand.repoName,
  // }));
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {
          JSON.stringify(data)
        }
        {/* <TableOne brandData={brandD}/> */}
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
