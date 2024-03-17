import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"


function 	ComponentNode({ children, onChange }) {
	const handleChangeData = (event) => {
		let newValue = event.target.value

		// Convert the value to the appropriate type
		if (newValue === "true") {
			newValue = true
		} else if (newValue === "false") {
			newValue = false
		} else if (newValue === "0") {
			newValue = 0
		} else if (newValue === "" || newValue === "null") {
			newValue = null
		} else if (!isNaN(newValue)) {
			newValue = parseFloat(newValue)
		}

		onChange(newValue)
		 
	}
	if (
		typeof children === "string" ||
		typeof children === "number" ||
		typeof children === "boolean" ||
		children === null
	) {
		return (
			<input
			className="bg-slate-300 w-fit mt-3 border-black border-2 rounded-md p-2"
				type="text"
				value={children || ""}
				onChange={handleChangeData}
			/>
		)
	} else if (Array.isArray(children)) {
		return (
			<div>
				{children.map((value, index) => (
					<div key={index}>
						<Accordion
							type="single"
							collapsible
						
						>
							<AccordionItem value="item-1">
								<AccordionTrigger>[{index}]</AccordionTrigger>
								<AccordionContent>
									<ComponentNode
										children={value}
										onChange={(newValue) => {
											const newData = [...children];
											newData[index] = newValue;
											onChange(newData);
										}}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				))}
			</div>
		);
	} else if (typeof children === "object") {
		return (
			<div>
				{Object.entries(children).map(([key, value]) => (
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
											onChange({ ...children, [key]: newValue })
										}
									/>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				))}
			</div>
		)
	} else {
		return null
	}
}

export default ComponentNode
