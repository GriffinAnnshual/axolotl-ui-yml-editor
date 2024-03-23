import React from 'react'
import YamlEditor from "@focus-reactive/react-yaml"
import {useRef, useEffect} from 'react'
function Editor({ jsonContent, isLoaded , setJson}) {
	const handleChange = ({ json, text }) => {
		setJson(json)
	}
	if (isLoaded) {
		return (
			<div className="w-[45%]   mx-auto mt-[100px] pb-[3rem] h-[100vh] overflow-auto rounded-xl m-12  fixed bg-white border-2 border-black  ">
				<YamlEditor
					onChange={handleChange}
					text="# Yaml code editor
					 Please Upload Your File to Edit"
				/>
			</div>
		)
	}
	const actions = useRef(null)
	useEffect(() => {
		actions.current.replaceValue({ json: jsonContent })
	}, [jsonContent])
	if(isLoaded)
	return (
		<>
		Loading...
		</>
	)
	return (
		<div className="w-[45%] mx-auto mt-[100px] pb-[3rem] h-[100vh] overflow-auto rounded-xl m-12  fixed bg-white border-2 border-black  ">
			<YamlEditor
				onChange={handleChange}
				ref={actions}
				json={jsonContent}
			/>
		</div>
	)
}

export default Editor