'use client';

import { AddCatalougeProduct } from "../../../../core/ui";

export default function Page() {
    return (
        <div className="m-16 bg-white p-16 rounded-8">
            <h2 className='text-24 font-medium'>Add a Product</h2>
            <AddCatalougeProduct type="ADD" />
        </div>
    );
}
