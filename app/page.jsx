"use client"
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
		<div className="w-full flex gap-[5%]  h-full  text-lg">
			<div className="dark:  w-[40%] m-10">
				{isLoaded && (
					<FileInput
						upperFile={setFile}
						setYaml={setYaml}
						setJson={setJson}
					/>
				)}

				{!isLoaded && (
					<RenderedComponents
						setJson={setJson}
						jsonContent={json}
					/>
				)}
			</div>
			<div className="flex justify-between w-[50%]">
				<div className="py-4 w-full px-16 flex justify-between">
					<p className="text-white font-bold  text-[1.5rem] mt-2">
						YAML CODE EDITOR
					</p>
					<div
						onClick={downloadFile}
						className="w-fit cursor-pointer bg-white text-black rounded-md p-2 h-fit font-bold ">
						Download File
					</div>
				</div>
				<Editor
					isLoaded={isLoaded}
					jsonContent={json}
				/>
			</div>
		</div>
	)
}
	