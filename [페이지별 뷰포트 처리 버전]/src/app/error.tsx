"use client";

import { useGoHome } from "@hooks";

function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const goHome = useGoHome();

  return (
    <main className="min-h-screen _flex-center flex-col text-center">
      <section className="flex flex-col w-full px-[10%]">
        <h1 className="text-[22px]">
          서버통신 장애가 발생하였습니다.
          <br /> 관리자에게 문의하세요.
        </h1>
        <p className="mt-9 mb-[60px] text-base">{error.message}</p>
        {/* <Link href="" onClick={reset}
                className="block w-full py-4 rounded-xl bg-kos-orange-500 text-kos-white text-base no-underline">새로고침</Link> */}
        <button
          type="button"
          onClick={goHome}
          className="block w-full py-4 rounded-xl bg-kos-orange-500 text-kos-white text-base no-underline"
        >
          홈으로
        </button>
      </section>
    </main>
  );
}

export default ErrorBoundary;
