import styles from './login.less';
import { Link } from 'umi';

export default function LoginPage() {
  return (
    <div>
      <h1 className={styles.title}>Page login</h1>
      <Link to="/home">跳转index</Link>
    </div>
  );
}
