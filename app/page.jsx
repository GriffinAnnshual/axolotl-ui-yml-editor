"use client"
import {SelectFiles} from './components/SelectFiles'
import Editor from "./components/Editor";
import FileInput from "./components/FileInput";
import {useState} from 'react'
import RenderedComponents from './components/RenderedComponents'
import { isEqual } from "lodash"
import axios from 'axios'

export default function Home() {
	const [yaml, setYaml] = useState("")
	const [json, setJson] = useState({})
	const [file, setFile] = useState("")
	async function downloadFile() {
		try {
			console.log(file)
			const response = await axios.post(
				"/api/download",
				{
					json: json,
					file_name: file.name,
				},
				{
					responseType: "blob",
				}
			)

			const url = window.URL.createObjectURL(response.data)

			const link = document.createElement("a")
			link.href = url
			link.download = file.name
			document.body.appendChild(link)
			link.click()

			window.URL.revokeObjectURL(url)
			document.body.removeChild(link)
		} catch (error) {
			console.error("Error downloading file:", error)
		}
	}
	const isLoaded = isEqual(json, {});
  return (
		<div className="w-full h-[100vh] flex gap-[5%]  text-lg">
			<div className=" w-[50%] mt-10 ml-5  ">
				{isLoaded && (
					<div className="text-white text-sm">
						<div className="pl-10 text-lg">Choose a Yml file to Load</div>
						<SelectFiles isLoaded={isLoaded} setJson={setJson} />
					</div>
				)}

				<div className="w-[90%] mx-auto relative  top-[40%]">
					{isLoaded && (
						<FileInput
							upperFile={setFile}
							setYaml={setYaml}
							setJson={setJson}
						/>
					)}
				</div>

				{!isLoaded && (
					<RenderedComponents
						setJson={setJson}
						jsonContent={json}
					/>
				)}
			</div>
			<div className="flex justify-between w-[50%]">
				<div className="py-4 w-full px-16 flex justify-between">
					<p className="text-white font-bold  text-lg mt-2">YAML CODE EDITOR</p>
					<div
						onClick={downloadFile}
						className="w-fit cursor-pointer bg-white text-black rounded-md p-2 mr-[5%] h-fit font-bold ">
						Download File
					</div>
				</div>
				<Editor
					setJson={setJson}
					isLoaded={isLoaded}
					jsonContent={json}
				/>
			</div>
		</div>
	)
}
	