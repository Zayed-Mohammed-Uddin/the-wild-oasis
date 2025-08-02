import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	try {
		const { data: cabins, error } = await supabase
			.from("cabins")
			.select("*");
		if (error) throw new Error("Failed to fetch cabins");
		return cabins;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function deleteCabin(id) {
	try {
		const { error } = await supabase.from("cabins").delete().eq("id", id);
		if (error) throw new Error("Failed to delete cabin");
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function createCabin(newCabin) {
	try {
		const imgName = `cabin-${crypto.randomUUID()}-${newCabin.image.name}`;
		const imgURL =
			supabaseUrl + "/storage/v1/object/public/cabin-images/" + imgName;

		const { data, error: cabinError } = await supabase
			.from("cabins")
			.insert([{ ...newCabin, image: imgURL }])
			.select();
		if (cabinError) throw new Error("Failed to create cabin");

		// Upload the image to Supabase storage

		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imgName, newCabin.image, {
				cacheControl: "3600",
				upsert: false,
			});

		if (storageError) {
			await supabase.from("cabins").delete().eq("id", data.id);
			throw new Error(
				"Cabin image could not be uploaded and cabin was not created!"
			);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}
