import { useAppSelector } from '@/hooks';
import { selectExample } from '@/store';
import clsx from 'clsx';
import styles from './example.module.scss';

interface IExampleProps {
  title: string;
  isHidden?: boolean;
}
const Example: React.FC<IExampleProps> = ({ title, isHidden }) => {
  const exampleText = useAppSelector(selectExample);
  return (
    <div className={clsx(styles.container, isHidden && styles.hidden)}>
      <h2 className={styles.title}>{title}</h2>
      <span>{exampleText}</span>
    </div>
  );
};

export default Example;
