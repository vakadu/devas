'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@devas/ui";
import AddProduct from "./ui/add-product";

export default function Index() {
    return (
        <div className="m-16 bg-white p-16 rounded-8">
            <Tabs defaultValue="product" className="">
                <TabsList className="">
                    <TabsTrigger value="product">Add Product</TabsTrigger>
                    <TabsTrigger value="images">Product Images</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                </TabsList>
                <TabsContent value="product"><AddProduct /></TabsContent>
                <TabsContent value="images">Change your password here.</TabsContent>
                <TabsContent value="attributes">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}
