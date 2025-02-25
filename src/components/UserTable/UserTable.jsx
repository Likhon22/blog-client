/* eslint-disable react/prop-types */
const UserTable = ({ user }) => {
  return (
    <tr className="border  bg-gray-50">
      <td className="p-2 border">{user.name}</td>
      <td className="p-2 border">{user.email}</td>
      <td className="p-2 border">{user.role}</td>
      <td className="p-2 border">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
    </tr>
  );
};

export default UserTable;
