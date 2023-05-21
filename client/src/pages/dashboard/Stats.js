import { useEffect } from 'react';

import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <h4>
        Find the app useful?&nbsp;
        <a href="https://www.paypal.com/donate/?hosted_button_id=EFQ3MHE9EE5HY">
          you can always buy me coffee ☕
        </a>
      </h4>

      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
