import { redirect } from "react-router-dom";
import { deleteUser } from "../services/users";

export async function action({ params }) {
    await deleteUser(params.contactId);
    return redirect("/");
}