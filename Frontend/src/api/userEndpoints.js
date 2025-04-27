const API_BASE_URL = "http://localhost:3001"; // Replace with your backend's base URL if different

// Fetch all users
// export const getAllUsers = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// Fetch a single user by ID
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID: ${userId}`);
    }
    return await response.json(); // Parse the response as JSON
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

// Create a new user
// export const createUser = async (userData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to create user");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// Update a user by ID
// export const updateUser = async (userId, userData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to update user with ID: ${userId}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error updating user with ID ${userId}:`, error);
//     throw error;
//   }
// };

// Delete a user by ID
// export const deleteUser = async (userId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to delete user with ID: ${userId}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(`Error deleting user with ID ${userId}:`, error);
//     throw error;
//   }
// };