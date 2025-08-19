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

async function uploadCabinImage(imageFile) {
	try {
		const imgName = `cabin-${crypto.randomUUID()}-${imageFile.name}`;
		const imgURL =
			supabaseUrl + "/storage/v1/object/public/cabin-images/" + imgName;

		const { error: storageError } = await supabase.storage
			.from("cabin-images")
			.upload(imgName, imageFile, {
				cacheControl: "3600",
				upsert: false,
			});

		if (storageError) {
			throw new Error("Failed to upload cabin image");
		}

		return {
			url: imgURL,
			imageName: imgName,
		};
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function createEditCabin(cabinData, id) {
	try {
		const hasImageFile = cabinData.image?.name;
		let imagePath = cabinData.image;
		// Track uploaded image for cleanup
		let uploadedImageName = null;

		// Upload new image if provided
		if (hasImageFile) {
			const uploadResult = await uploadCabinImage(cabinData.image);
			imagePath = uploadResult.url;
			// for cleanup purposes
			uploadedImageName = uploadResult.imageName;
		}

		const finalCabinData = { ...cabinData, image: imagePath };
		let query = supabase.from("cabins");

		// Create or update based on whether ID is provided
		if (id) {
			// Update existing cabin
			query = query.update(finalCabinData).eq("id", id);
		} else {
			// Create new cabin
			query = query.insert([finalCabinData]);
		}

		const { data, error } = await query.select();

		if (error) {
			if (uploadedImageName) {
				try {
					await supabase.storage
						.from("cabin-images")
						.remove([uploadedImageName]);
				} catch (cleanupError) {
					console.error("Failed to cleanup image:", cleanupError);
				}
			}

			throw new Error(
				id ? "Failed to update cabin" : "Failed to create cabin"
			);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
}

export async function createCabin(newCabin) {
	const result = await createEditCabin(newCabin);
	return result;
}

export async function updateCabin(id, updatedCabin) {
	const result = await createEditCabin(updatedCabin, id);
	return result;
}
