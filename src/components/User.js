const User = ({ user, logoutFunc }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    logoutFunc();
  };

  return (
    <div>
      <p>{user.username} is currently logged in </p>
      <button onClick={handleLogout} data-button="logout-btn">Logout</button>
    </div>
  );
};
export default User;
