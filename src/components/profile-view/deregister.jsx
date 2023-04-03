import { Row, Col, Button } from "react-bootstrap";

export const Deregister = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const handleDeregister = () => {
    const userWarning = confirm(
      "are you sure you want to delete your account?"
    );

    userWarning === false
      ? alert("thank you for staying with movie dash")
      : fetch(`https://myflixdb-0sx9.onrender.com/users/${user.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Account successfully deleted");
              localStorage.clear();
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          })
          .catch((error) => console.log(error));
  };

  return (
    <Button onClick={handleDeregister} variant="danger">
      Delete your account
    </Button>
  );
};
