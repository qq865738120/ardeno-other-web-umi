import styles from './test.less';
import { Link } from 'umi';

export default function TestPage() {
  return (
    <div>
      <h1 className={styles.title}>Page test</h1>
      <Link to="/home">跳转index</Link>
    </div>
  );
}
