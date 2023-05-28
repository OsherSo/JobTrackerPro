import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdQueryStats } from 'react-icons/md';
import { VscChecklist } from 'react-icons/vsc';
import { IoBarChartSharp } from 'react-icons/io5';

const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: 'task manager',
    path: 'task-manager',
    icon: <VscChecklist />,
  },
];

export default links;
