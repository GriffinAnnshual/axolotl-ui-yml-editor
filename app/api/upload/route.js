
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import yaml from 'js-yaml'
import fs from 'fs/promises'

const YMLtoJS = async(yamlFilePath, JSONFilePath)=>{
    try{
        // Read file
        const yamlContent = await fs.readFile(yamlFilePath, "utf8")
        // Convert Yaml to JSON
        const data = yaml.load(yamlContent)
        // Convert to Json string
		const jsonString = JSON.stringify(data, null, 2)
        // Write File
		await fs.writeFile(JSONFilePath, jsonString, "utf8")

    }catch(error){

    }
}


export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);

  try {
    await writeFile(
      path.join(process.cwd(), "/tmp/" + filename),
      buffer
    );
    
    const yamlContent = await fs.readFile(
			path.join(process.cwd(), "/tmp/" + filename),
			"utf8"
		)
    // Convert Yaml to JSON
    const data = yaml.load(yamlContent)
    // Convert to Json string
    const jsonString = JSON.stringify(data, null, 2)
    // Write File
    await fs.writeFile(
			path.join(process.cwd(), "/tmp/" + filename),
			jsonString,
			"utf8"
		)
    
    return NextResponse.json({ Message: "Success", status: 201 , json: jsonString, yaml:yamlContent});
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};