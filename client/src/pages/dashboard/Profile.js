import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    changeUserPassword,
  } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const [password, setPassword] = useState(user?.password);
  const [newPassword, setNewPassword] = useState(user?.newPassword);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(
    user?.newPasswordConfirm
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!password || !newPassword || !newPasswordConfirm) {
      displayAlert();
      return;
    }

    changeUserPassword({ password, newPassword, newPasswordConfirm });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>

      <form className="form">
        <h3>Change Password</h3>
        <div className="form-center">
          <FormRow
            labelText="current password"
            type="password"
            name="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormRow
            labelText="new password"
            type="password"
            name="newPassword"
            value={newPassword}
            handleChange={(e) => setNewPassword(e.target.value)}
          />
          <FormRow
            labelText="new password confirm"
            type="password"
            name="newPasswordConfirm"
            value={newPasswordConfirm}
            handleChange={(e) => setNewPasswordConfirm(e.target.value)}
          />
          <button
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
            onClick={handlePasswordChange}
          >
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
