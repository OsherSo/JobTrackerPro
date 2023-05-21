import { useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

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
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
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
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Change Password</h3>
        {showAlert && <Alert />}
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
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
