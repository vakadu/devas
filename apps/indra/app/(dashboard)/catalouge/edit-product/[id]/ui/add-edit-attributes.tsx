import { useParams } from "next/navigation";

import { Accordion } from "@devas/ui";
import { useGetProductById } from "../api";
import Attributes from "./attribute";

export default function AddEditAttributes() {
    const params = useParams();
    const { data } = useGetProductById(params?.id as string);
    const productData = data?.data?.product || {} as ICatalougeTypes.IProduct;

    return (
        <div className='max-w-[720px]'>
            <Accordion type="single" collapsible>
                <Attributes key={productData?.aboutThisItem} />
            </Accordion>
        </div>
    )
}
