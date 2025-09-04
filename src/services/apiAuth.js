import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password, avatar }) {
	let avatarUrl = null;

	if (avatar) {
		const fileName = `avatar-${crypto.randomUUID()}-${Math.random()}`;
		const { error: storageError } = await supabase.storage
			.from("avatars")
			.upload(fileName, avatar);

		if (storageError) throw new Error(storageError.message);
		avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
	}

	// Sign up with avatar in metadata
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: avatarUrl,
			},
		},
	});

	if (error) {
		if (
			error.message.includes("already registered") ||
			error.message.includes("already exists")
		) {
			throw new Error("A user with this email already exists");
		}
		throw new Error(error.message);
	}

	if (!data.user && !error) {
		throw new Error("A user with this email already exists");
	}

	return data;
}
export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw new Error(error.message);
	return data;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
	// 1. update the fullName or password

	let updateData = {};
	if (password) updateData.password = password;
	if (fullName) updateData.data = { ...(updateData.data || {}), fullName };

	const { data, error: updateError } = await supabase.auth.updateUser(
		updateData
	);
	if (updateError) throw new Error(updateError.message);
	if (!avatar) return data;

	// 2. upload the avatar
	const fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	// 3. update the avatar in the user
	const { data: updatedUser, error: userError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});
	if (userError) throw new Error(userError.message);

	return updatedUser;
}

export async function getCurrentUser() {
	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession();
	if (sessionError) throw new Error(sessionError.message);
	if (!session) return null;

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) throw new Error(error.message);
	return user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
