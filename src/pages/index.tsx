import React from 'react';
import { Link } from 'umi';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const IndxPage = (props: any) => {
  return (
    <section
      style={{
        padding: '0 20px',
      }}
    >
      <div />
      <Typography>
        <Title>目录</Title>
        <Paragraph>
          <ul>
            {props.routes.map((item: any) => (
              <li>
                <Link to={item.path}>
                  <Typography.Link>{item.title}</Typography.Link>
                </Link>
              </li>
            ))}
          </ul>
        </Paragraph>
      </Typography>
      <div
        style={{
          padding: '20px 30px',
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderTop: '1px solid #f5f5f9',
          position: 'fixed',
          width: '100vw',
          left: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography.Link href="http://beian.miit.gov.cn/">鄂ICP备17003728号-3</Typography.Link>
      </div>
    </section>
  );
};

export default IndxPage;
