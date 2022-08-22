import useFetch from "../hooks/useFetch";

const Users = () => {
  const {
    data: users,
    isPending,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="content">
      <h1>Users</h1>
      <p className="description">
        Users page to display data.
        <br />
        10 users from JSON palcehoder API.
      </p>

      <div>{isPending && <h3>Loading users...</h3>}</div>

      <div>{error && <h3>Error: {error}</h3>}</div>

      <div className="cards">
        {users &&
          users.map((user) => (
            <div className="card" key={user.id}>
              <p>User #{user.id}</p>
              <h3>
                {user.name} - {user.username}
              </h3>
              <p>
                <span>email: </span>
                {user.email}
              </p>
              <p>
                <span>address: </span>
                {user.address.street} - {user.address.suite}
              </p>
              <p>
                <span>city: </span>
                {user.address.city} {user.address.zipcode}
              </p>
              <p>
                <span>phone: </span>
                {user.phone}
              </p>
              <p>
                <span>website: </span>
                {user.website}
              </p>
              <p>
                <span>company: </span>
                {user.company.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
