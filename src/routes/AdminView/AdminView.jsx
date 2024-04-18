import {
    NavLink,
    Outlet,
    useLoaderData,
    Form,
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import { getUsers, createUser } from "../../services/users-service";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const users = await getUsers(q);
    return { users, q };
}

export async function action() {
    const user = await createUser();
    return redirect(`/users/${user.id}/edit`);
}

export default function AdminView() {
    const { users, q } = useLoaderData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);
    return (
        <div className="d-flex w-100">
            <div id="sidebar">
                <h1>Lumo Notas</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search users"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'New'}
                        </button>
                    </Form>
                </div>
                <nav>
                    {users.length ? (
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>
                                    <NavLink
                                        to={`users/${user.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >                                        {user.first || user.last ? (
                                        <>
                                            {user.first} {user.last}
                                        </>
                                    ) : (
                                        <i>No Name</i>
                                    )}{" "}
                                        {user.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No users</i>
                        </p>
                    )}
                </nav>
            </div>
            <div
                id="detail"
                className={`${navigation.state === "loading" ? "loading" : ""} `}
            >
                <Outlet />
            </div>
        </div>
    );
}