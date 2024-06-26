
import ComponentNode from "./ComponentNode"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { IoInformation } from "react-icons/io5"
import data from '../utils/hover-info.json'


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
							<AccordionTrigger className="cursor-default">
								{key}
								<div className="w-full group cursor-pointer justify-end flex">
									<IoInformation />
									<div className="hidden group-hover:block absolute text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded mt-2">
										{data[key]}
									</div>
								</div>
							</AccordionTrigger>
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
