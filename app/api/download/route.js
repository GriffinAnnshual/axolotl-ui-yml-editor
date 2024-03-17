// pages/api/download.js
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
import yaml from "js-yaml"


async function deleteFilesInFolder(folderPath) {
	try {
		const files = await fs.readdir(folderPath)
		for (const file of files) {
			const filePath = path.join(folderPath, file)
			await fs.unlink(filePath)
			console.log(`File ${filePath} deleted successfully`)
		}
		console.log("All files in folder deleted successfully")
	} catch (error) {
		console.error("Error deleting files:", error)
	}
}


function streamFile(
	path
) {
	const downloadStream = fs.createReadStream(path)

	return new ReadableStream({
		start(controller) {
			downloadStream.on("data", (chunk) =>
				controller.enqueue(new Uint8Array(chunk))
			)
			downloadStream.on("end", () => controller.close())
			downloadStream.on("error", (error) =>
				controller.error(error)
			)
		},
		cancel() {
			downloadStream.destroy()
		},
	})
}




export const POST = async (req, res) => {
	try {
		const { json, file_name } = await req.json()
		const old_file = file_name.replaceAll(" ", "_") 
		const filename ="new_" + file_name.replaceAll(" ", "_") 
		const yamlContent = yaml.dump(json)
		const filePath = path.join(process.cwd(), "/tmp/",filename)
		await fs.promises.writeFile(filePath, yamlContent, "utf8")

		const stats= await fs.promises.stat(filePath)    
		const data = streamFile(filePath)
		const res = new NextResponse(data, {
			status: 200,
			headers: new Headers({
				"content-disposition": `attachment; filename=${filename}`,
				"content-type": "application/x-yaml", 
				"content-length": stats.size + "",
			}),
		})
		return res

	} catch (error) {
		console.error("Error occurred:", error)
		// Return error response
		return NextResponse.json({ Message: "Failed", status: 500 })
	}
}
