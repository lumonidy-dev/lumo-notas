import { redirect } from "react-router-dom";
import { deleteUser } from "../../services/users-service";

export async function action({ params }) {
    await deleteUser(params.userId);
    return redirect("/");
}