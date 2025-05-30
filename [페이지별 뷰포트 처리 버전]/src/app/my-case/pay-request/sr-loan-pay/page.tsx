"use client";

import React from "react";
import { Size } from "@components/Constants";
import { DOCUMENTS_LIST } from "@constants/documents";
import { Button, Typography } from "@components";
import { caseDetailAtom } from "@stores";
import { useAtomValue } from "jotai";

/**
 * @name slmnLndProc
 * @description 모집인(SR) 대출 프로세스 종류
 * @summary 01. 조건부 취급대상 아님
 *          02. 소유권이전
 *          03. 소유권이전 & 후순위설정
 *          04. 선순위말소/감액
 *          05. 신탁등기 말소
 *          06. 임차인 퇴거
 */

export default function SrLoanPay() {
  let prevPath: string | null;

  if (typeof window !== "undefined") {
    prevPath = sessionStorage.getItem("prevPath");
  }

  const {
    loanNo,
    regType,
    slmnLndProc,
    slmnLndProcNm,
    sellerNm1,
    sellerBirthDt1,
    sellerNm2,
    sellerBirthDt2,
    trstNm,
    cnsgnNm,
    bnfrNm,
  } = useAtomValue(caseDetailAtom);

  const handleSrLoanPay = () => {
    const isReSrLoanPay = prevPath === "/my-case/pay-request/sr-loan-info";

    // @ts-ignore
    window.flutter_inappwebview.callHandler("flutterFunc", {
      mode: "IMAGE",
      data: {
        wkCd: "IMAGE_BIZ",
        attcFilCd: "1",
        loanNo: loanNo,
        regType: regType,
        lndHndgSlfDsc: "2",
        ...(isReSrLoanPay && { returnYn: "Y" }),
      },
    });
  };

  return (
    <div className="flex flex-col justify-between grow w-full h-full">
      <div>
        <Typography
          type={Typography.TypographyType.H1}
          color="text-kos-gray-800"
          className="pb-3"
        >
          대출금 요청을 위해 해당하는
          <br />
          서류를 제출해 주세요.
        </Typography>

        <section className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-800"
            >
              지급정보
            </Typography>
          </div>

          <div className="flex flex-col gap-2">
            <ul className="rounded-2xl bg-kos-gray-100 p-5 flex flex-col gap-y-2">
              <li className="flex items-center justify-between">
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-600"
                >
                  조건부 취급
                </Typography>
                <Typography
                  type={Typography.TypographyType.B2}
                  color="text-kos-gray-800"
                >
                  {slmnLndProcNm}
                </Typography>
              </li>

              {/* 02. 소유권이전, 03. 소유권이전 & 후순위설정 */}
              {(slmnLndProc === "02" ||
                slmnLndProc === "03") && (
                <>
                  <li className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      매도인
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {sellerNm1}
                      {sellerNm2 && `/${sellerNm2}`}
                    </Typography>
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      매도인 생년월일
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {sellerBirthDt1}
                      {sellerBirthDt2 && `/${sellerBirthDt2}`}
                    </Typography>
                  </li>
                </>
              )}

              {/* 05. 신탁등기 말소 */}
              {slmnLndProc === "05" && (
                <>
                  <li className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      수탁자명(신탁사)
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {trstNm}
                    </Typography>
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      위탁자명(부동산소유자)
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {cnsgnNm}
                    </Typography>
                  </li>
                  <li className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      우선수익자
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {bnfrNm}
                    </Typography>
                  </li>
                </>
              )}
            </ul>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <Typography
              type={Typography.TypographyType.H3}
              color="text-kos-gray-800"
            >
              제출서류
            </Typography>
          </div>

          <ul className="flex flex-col gap-y-2">
            {DOCUMENTS_LIST.map((document) => {
              const { id, category, name } = document;
              return (
                <li key={id} className="p-5 rounded-2xl bg-kos-gray-100">
                  <div className="flex items-center justify-between">
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-600"
                    >
                      {category}
                    </Typography>
                    <Typography
                      type={Typography.TypographyType.B2}
                      color="text-kos-gray-800"
                    >
                      {name}
                    </Typography>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <footer className="flex flex-col gap-y-6 mt-6">
        <Button.CtaButton
          size={Size.XLarge}
          state="On"
          onClick={handleSrLoanPay}
        >
          대출금 요청하기
        </Button.CtaButton>
      </footer>
    </div>
  );
}
