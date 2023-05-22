import { useEffect, useState } from 'react';

import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, Alert } from '../../components';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    getLocationPrediction,
    locationPredictions,
  } = useAppContext();

  const [predictionSelected, setPredictionSelected] = useState(true);

  useEffect(() => {
    getLocationPrediction();
    // eslint-disable-next-line
  }, [jobLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
    } else {
      createJob();
    }
  };

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });

    if (e.target.name === 'jobLocation') {
      setPredictionSelected(false);
    }
  };

  const handlePredictionSelection = (prediction) => {
    handleChange({ name: 'jobLocation', value: prediction });
    setPredictionSelected(true);
  };

  const renderLocationPredictions = () => {
    if (locationPredictions.length === 0 || predictionSelected) {
      return null;
    }

    return (
      <ul className="location-predictions">
        {locationPredictions.map((prediction, index) => (
          <li key={index} onClick={() => handlePredictionSelection(prediction)}>
            {prediction}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'} </h3>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {renderLocationPredictions()}
          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
