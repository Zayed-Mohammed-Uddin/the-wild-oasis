import supabase from "./supabase";

let query = supabase.from("settings");

export async function getSettings() {
	const { data, error } = await query.select("*").single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}
	return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSettings(newSetting) {
	const { data, error } = await query
		.update(newSetting)
		// There is only ONE row of settings, and it has the ID=1, and so this is the updated one
		.eq("id", 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be updated");
	}
	return data;
}
