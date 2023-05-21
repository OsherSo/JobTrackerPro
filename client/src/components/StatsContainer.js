import { Link } from 'react-router-dom';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

import StatItem from './StatItem';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
  const { stats, setSearchStatus } = useAppContext();

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
      status: 'pending',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
      status: 'interview',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
      status: 'declined',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return (
          <Link
            to="/all-jobs"
            key={index}
            onClick={() => setSearchStatus(item.status)}
          >
            <StatItem {...item} />
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default StatsContainer;
