import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // 진입점 파일 지정
  format: ['esm'], // 출력 형식 (ECMAScript Module)
  target: 'node16', // 대상 Node.js 버전 (tsconfig.json과 일치)
  splitting: false, // 코드 분할 비활성화 (CLI는 단일 파일이 유리)
  sourcemap: true, // 소스맵 생성 활성화
  clean: true, // 빌드 전 출력 디렉토리 정리
  dts: true, // 타입 선언 파일(.d.ts) 생성
  treeshake: true, // 사용하지 않는 코드 제거 (Tree-shaking)
  outDir: 'dist', // 출력 디렉토리 지정
  shims: true, // ESM 환경에서 __dirname, __filename 등 사용 가능하도록 shim 추가
  minify: false, // 코드 압축 비활성화 (Node.js CLI에서는 필수는 아님)
  publicDir: 'src/prompts', // src/prompts 내용을 dist로 복사
});
