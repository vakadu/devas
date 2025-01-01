import { AccordionContent, AccordionItem, AccordionTrigger } from "@devas/ui";

export default function Attributes({ key }: { key: string }) {
    return (
        <AccordionItem value={key}>
            <AccordionTrigger>{key}</AccordionTrigger>
            <AccordionContent>
                <div>

                </div>
                Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
    )
}
