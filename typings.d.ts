declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

/**
 * 环境
 */
declare const APP_ENV: 'local' | 'cloud'
/**
 * 接口域名
 */
declare const API_HOST: string
