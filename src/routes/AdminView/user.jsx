import {
    Form,
    useLoaderData,
    useFetcher,
} from "react-router-dom";
import { getUser, updateUser } from "../../services/users-service";
import GradesDashboard from '../../components/Dashboard/GradesDashboard';


export async function loader({ params }) {
    const user = await getUser(params.userId);
    if (!user) {
        throw new Response("", {
            status: 404,
            statusText: "NO hay usuario disponible",
        });
    }
    return { user };
}

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateUser(params.userId, {
        favorite: formData.get("favorite") === "true",
    })
}
export default function User() {
    const { user } = useLoaderData();
    return (
        <>
            <div id="user">
                <div>
                    <img
                        key={user.avatar}
                        src={user.avatar || null}
                    />
                </div>

                <div>
                    <h1>
                        {user.first || user.last ? (
                            <>
                                {user.first} {user.last}
                            </>
                        ) : (
                            <i>No Name</i>
                        )}{" "}
                        <Favorite user={user} />
                    </h1>

                    {user.rut && (
                        <p>
                            {user.rut}

                        </p>
                    )}

                    {user.notes && <p>{user.notes}</p>}

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
            </div>
            <GradesDashboard studentId={user.id} />
        </>
    );
}

function Favorite({ user }) {
    const fetcher = useFetcher();
    let favorite = user.favorite;

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
