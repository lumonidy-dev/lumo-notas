import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,

} from "react-router-dom";

import { updateUser } from "../../services/users-service";
import { deleteUser } from "firebase/auth";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
    return redirect(`/users/${params.userId}`);
}

export default function EditUser() {
    const { user } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="user-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={user?.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={user?.last}
                />
            </p>
            <label>
                <span>Rut</span>
                <input
                    type="text"
                    name="rut"
                    placeholder="19291044-7"
                    defaultValue={user?.rut}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={user?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={user?.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}