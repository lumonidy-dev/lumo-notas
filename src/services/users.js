import { db } from "../firebaseConfig.js";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

const usersCollection = collection(db, "users");

export async function getUsers(query) {
    let users = [];

    try {
        const snapshot = await getDocs(usersCollection);
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        if (query) {
            users = matchSorter(users, query, { keys: ["first", "last"] });
        }

        return users.sort(sortBy("last", "createdAt"));
    } catch (error) {
        console.error("Error getting users: ", error);
        return [];
    }
}

export async function createUser() {
    try {
        let id = Math.random().toString(36).substring(2, 9);
        let userData = { createdAt: Date.now() };

        // Agregar un nuevo documento a la colección 'users'
        await setDoc(doc(usersCollection, id), userData);

        // Crear la colección 'grades' dentro del documento del usuario recién creado
        const userDocRef = doc(usersCollection, id);
        const gradesCollectionRef = collection(userDocRef, 'grades');
        await setDoc(doc(gradesCollectionRef, "placeholder"), {}); // Crear un documento vacío dentro de 'grades'

        return { id, ...userData };
    } catch (error) {
        console.error("Error creating contact: ", error);
        return null;
    }
}


export async function getUser(id) {
    try {
        const contactDoc = doc(usersCollection, id);
        const contactSnapshot = await getDoc(contactDoc); // Using getDoc instead of getDocs to retrieve a single document
        if (contactSnapshot.exists()) { // Checking if the document exists
            const contactData = contactSnapshot.data(); // Retrieving the data from the snapshot
            return { id: contactSnapshot.id, ...contactData }; // Returning the contact data with the ID
        } else {
            return null; // Returning null if the contact does not exist
        }
    } catch (error) {
        console.error("Error getting contact: ", error);
        return null; // Returning null if an error occurs
    }
}


export async function updateUser(id, updates) {
    try {
        await updateDoc(doc(usersCollection, id), updates); // Updating an existing contact document
        return { id, ...updates };
    } catch (error) {
        console.error("Error updating contact: ", error);
        return null; // Returning null if an error occurs
    }
}

export async function deleteUser(id) {
    try {
        await deleteDoc(doc(usersCollection, id)); // Deleting a contact document
        return true;
    } catch (error) {
        console.error("Error deleting contact: ", error);
        return false; // Returning false if an error occurs
    }
}
