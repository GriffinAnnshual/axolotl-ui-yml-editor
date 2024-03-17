
import ComponentNode from "./ComponentNode"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
function RenderedComponents({ jsonContent, setJson }) {
	const onChange = (newData) => {
		setJson(newData)
	}
	
	return (
		<div className="border-white border-2	">
			{Object.entries(jsonContent).map(([key, value]) => (
				<div key={key}>
					<Accordion
						type="single"
						collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>{key}</AccordionTrigger>
							<AccordionContent>
								<ComponentNode
									children={value}
									onChange={(newValue) =>
										onChange({ ...jsonContent, [key]: newValue })
									}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			))}
		</div>
	)
}

export default RenderedComponents
