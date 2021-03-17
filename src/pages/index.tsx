import { Link } from 'umi';

const IndxPage = (props: any) => {
  return (
    <section>
      <ul>
        {props.routes.map((item: any) => (
          <li>
            <Link to={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IndxPage;
