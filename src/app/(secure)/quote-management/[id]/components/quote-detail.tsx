"use client";
import React, { useEffect, useState } from "react";
import { Card, Steps } from "antd";
import { useTranslations } from "next-intl";

import QuoteInformation from "./quote-information";
import DistributorInformation from "./distributor-information";
import { QuoteStatus, StatusStep } from "@/types";
import HistoryNote from "./history-note";
import useQueryApi from "@/hooks/useQueryApi";
import { AxiosResponse } from "axios";
import { QuoteDetailType } from "@/types/quote";
import Loading from "@/components/loading";
import { isEmpty } from "@/utilities";

type Props = {
  quoteId: string;
};

const QUOTE_STATUS_STEP_STATUS_MAPPING = {
  [QuoteStatus.NEW]: StatusStep.NEW,
  [QuoteStatus.DRAFT]: StatusStep.NEW,
  [QuoteStatus.PENDING_REVIEW]: StatusStep.PENDING_REVIEW,
  [QuoteStatus.APPROVED]: StatusStep.APPROVED_REJECTED,
  [QuoteStatus.REJECTED]: StatusStep.APPROVED_REJECTED,
  [QuoteStatus.CANCELLED]: StatusStep.CANCELLED,
};

const QuoteDetail: React.FC<Props> = ({ quoteId }) => {
  const t = useTranslations();
  const isReviewer = false;
  const isEditing = quoteId !== "create";
  const [currentStep, setCurrentStep] = useState<StatusStep>(0);
  const stepItems = [
    {
      title: t("new"),
    },
    {
      title: t("pending_review"),
    },
    {
      title: t("approved_rejected"),
    },
    {
      title: t("cancelled"),
    },
  ];

  const { data: quoteDetailResponse } = useQueryApi<
    AxiosResponse<QuoteDetailType>
  >("quote-detail/get", {
    pathVariables: { id: quoteId },
    enabled: isEditing,
  });
  const quoteDetail = quoteDetailResponse?.data ?? ({} as QuoteDetailType);

  // MARK: get user info
  const { data: userInfoResponse } = useQueryApi("user-info/get", {
    enabled: !isEditing,
  });
  const userInfo = userInfoResponse?.data ?? {};

  useEffect(() => {
    if (isEmpty(quoteDetail)) return;

    setCurrentStep(QUOTE_STATUS_STEP_STATUS_MAPPING[quoteDetail.status]);
  }, [quoteDetail]);

  if (isEditing && isEmpty(quoteDetail)) {
    return <Loading />;
  }

  return (
    <>
      <Steps current={currentStep} items={stepItems} />
      <Card>
        <QuoteInformation
          updateStatus={setCurrentStep}
          isReviewer={isReviewer}
          quoteDetail={quoteDetail}
        />
      </Card>
      <Card>
        {(!isEmpty(userInfo) || isEditing) && (
          <DistributorInformation
            userInfo={userInfo}
            quoteDetail={quoteDetail}
          />
        )}
      </Card>
      {/* <Card>
        <HistoryNote />
      </Card> */}
    </>
  );
};

export default QuoteDetail;
