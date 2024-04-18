import {
    Form,
    useLoaderData,
    useFetcher,
} from "react-router-dom";
import { getUser, updateUser } from "../services/users";
import { getStudentGrades } from "../services/grades";
import GradesDashboard from "../components/Dashboard/GradesDashboard";


export async function loader({ params }) {
    const contact = await getUser(params.contactId);
    if (!contact) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    // Obtener las notas del estudiante
    const grades = await getStudentGrades(params.contactId);
    return { contact, grades };
}

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateUser(params.contactId, {
        favorite: formData.get("favorite") === "true",
    })
}
export default function User() {
    const { contact } = useLoaderData();
    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
            <GradesDashboard grades={grades} />
        </div>
    );
}

function Favorite({ contact }) {
    const fetcher = useFetcher();
    let favorite = contact.favorite;

    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }
    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
